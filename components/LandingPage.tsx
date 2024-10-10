"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function LandingPage() {
    const [commits, setCommits] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [branch, setBranch] = useState('');
    const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
    const [changelog, setChangelog] = useState('');

    const generateChangelog = async () => {
        // TODO: Implement AI-powered changelog generation
        setChangelog('Generated changelog will appear here.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <header className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold">AI Changelog Generator</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle>Generate Changelog</CardTitle>
                        <CardDescription>Enter your commits or import from GitHub to generate a changelog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="manual">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="manual">Manual Input</TabsTrigger>
                                <TabsTrigger value="github">GitHub Import</TabsTrigger>
                            </TabsList>
                            <TabsContent value="manual">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="commits">Commits</Label>
                                        <Textarea
                                            id="commits"
                                            placeholder="Enter your commits here..."
                                            value={commits}
                                            onChange={(e) => setCommits(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="github">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="githubUrl">GitHub URL</Label>
                                        <Input
                                            id="githubUrl"
                                            placeholder="https://github.com/user/repo"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="branch">Branch</Label>
                                        <Input
                                            id="branch"
                                            placeholder="main"
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Label>Date Range</Label>
                                        <div className="flex space-x-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !dateRange.from && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {dateRange.from ? format(dateRange.from, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={dateRange.from}
                                                        onSelect={(date) => setDateRange({ ...dateRange, from: date || new Date() })}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] justify-start text-left font-normal",
                                                            !dateRange.to && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {dateRange.to ? format(dateRange.to, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={dateRange.to}
                                                        onSelect={(date) => setDateRange({ ...dateRange, to: date || new Date() })}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={generateChangelog}>Generate Changelog</Button>
                    </CardFooter>
                </Card>

                {changelog && (
                    <Card className="mt-8 bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle>Generated Changelog</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <pre className="whitespace-pre-wrap">{changelog}</pre>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => navigator.clipboard.writeText(changelog)}>
                                Copy to Clipboard
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </main>
        </div>
    );
}