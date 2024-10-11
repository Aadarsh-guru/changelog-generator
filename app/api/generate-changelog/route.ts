import { NextResponse } from 'next/server'
import { generateChangelog } from '@/lib/gemini'
import { sql } from '@/lib/db'

// Create the table if it doesn't exist
async function ensureTableExists() {
    await sql`
    CREATE TABLE IF NOT EXISTS changelogs (
        id UUID DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        content TEXT,
        PRIMARY KEY (id)
    );
    `
}

export async function POST(req: Request) {
    const { commits, version } = await req.json()
    try {
        // Ensure the table exists before inserting data
        await ensureTableExists()

        const changelog = await generateChangelog(commits, version)

        // Insert the generated changelog into the database
        const result = await sql`
            INSERT INTO changelogs (content)
            VALUES (${changelog})
            RETURNING id, created_at;
        `
        return NextResponse.json({
            changelog,
            id: result[0].id,
            created_at: result[0].created_at
        })
    } catch (error) {
        console.error('Error generating or saving changelog:', error)
        return NextResponse.json({ error: 'Failed to generate or save changelog' }, { status: 500 })
    }
}
