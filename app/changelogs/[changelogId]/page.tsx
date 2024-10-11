import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import { Card, CardContent } from '@/components/ui/card'
import { MDPreview } from "@/components/MDPreview";

interface PageProps {
    params: {
        changelogId: string;
    }
}

export default async function Page({ params: { changelogId } }: PageProps) {

    const result = await sql`
    SELECT content FROM changelogs
    WHERE id = ${changelogId}::uuid
`

    if (result.length === 0) {
        return notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardContent className="pt-4">
                    <MDPreview changelog={result[0].content} />
                </CardContent>
            </Card>
        </div>
    );
}