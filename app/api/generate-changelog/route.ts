import { NextResponse } from 'next/server';
import { generateChangelog } from '@/lib/gemini';

export async function POST(req: Request) {
    const { commits } = await req.json();

    try {
        const changelog = await generateChangelog(commits);
        return NextResponse.json({ changelog });
    } catch (error) {
        console.error('Error generating changelog:', error);
        return NextResponse.json({ error: 'Failed to generate changelog' }, { status: 500 });
    }
};