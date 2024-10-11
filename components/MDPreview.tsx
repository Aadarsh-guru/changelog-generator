"use client";
import MarkdownPreview from '@uiw/react-markdown-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const MDPreview = ({ changelog }: { changelog: string }) => {

    return (
        <Tabs defaultValue="preview">
            <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <MarkdownPreview
                    className="markdownPreview"
                    source={changelog}
                    style={{
                        padding: 20,
                        borderRadius: 10,
                    }}
                    wrapperElement={{
                        "data-color-mode": "dark",
                    }}
                />
            </TabsContent>
            <TabsContent value="raw">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                    {changelog}
                </pre>
            </TabsContent>
        </Tabs>
    );
};