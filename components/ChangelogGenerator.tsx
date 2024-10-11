'use client'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Loader2, Copy, LinkIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MDPreview } from './MDPreview'


export function ChangelogGenerator() {

    const [commits, setCommits] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [branch, setBranch] = useState('main')
    const [changelog, setChangelog] = useState('')
    const [changelogId, setChangelogId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [version, setVersion] = useState('1.0.0')
    const { toast } = useToast()
    const urlInputRef = useRef<HTMLInputElement>(null)

    const generateChangelog = async (inputType: 'manual' | 'github') => {
        setIsLoading(true)
        try {
            let commitsToUse = commits

            if (inputType === 'github') {
                const fetchedCommits = await fetchGithubCommits(githubUrl, branch)
                if (!fetchedCommits) {
                    setIsLoading(false);
                    return
                }
                commitsToUse = fetchedCommits
            }

            const response = await fetch('/api/generate-changelog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commits: commitsToUse, version }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate changelog')
            }

            const data = await response.json()
            setChangelog(data.changelog)
            setChangelogId(data.id)
        } catch (error) {
            console.error('Error generating changelog:', error)
            toast({
                title: "Error",
                description: "Failed to generate changelog. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const fetchGithubCommits = async (url: string, branch: string) => {
        try {
            const response = await fetch('/api/fetch-github-commits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, branch }),
            })

            if (!response.ok) {
                throw new Error('Failed to fetch GitHub commits')
            }

            const data = await response.json()
            return data.commits
        } catch (error) {
            console.error('Error fetching GitHub commits:', error)
            toast({
                title: "Error",
                description: "Failed to fetch GitHub commits. Please check the URL and try again.",
                variant: "destructive",
            })
            return null
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(changelog)
        toast({
            title: "Copied",
            description: "Changelog copied to clipboard",
        })
    }

    const exportChangelog = (format: 'md') => {
        let content = changelog
        let filename = `changelog-${version}.${format}`
        let mimeType = 'text/plain'
        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const changelogUrl = `${window.location.origin}/changelogs/${changelogId}`

    const handleCopyClick = () => {
        if (urlInputRef.current) {
            urlInputRef.current.select()
            navigator.clipboard.writeText(changelogUrl)
            toast({
                title: "Copied",
                description: "Changelog copied to clipboard",
            })
        }
    }

    return (
        <Card>
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
                        </div>
                    </TabsContent>
                </Tabs>
                <div className="mt-4">
                    <Label htmlFor="version">Version</Label>
                    <Input
                        id="version"
                        placeholder="e.g., 1.0.0"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="mt-1"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 justify-between">
                <Button
                    onClick={() => generateChangelog(githubUrl ? 'github' : 'manual')}
                    disabled={isLoading || (!commits && !githubUrl)}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate Changelog'
                    )}
                </Button>
                {changelog && (
                    <div className="flex space-x-2">
                        <Button onClick={copyToClipboard} variant="outline">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                        </Button>
                        <Select onValueChange={(value) => exportChangelog(value as 'md')}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Export as..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="md">Export as Markdown</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </CardFooter>
            {changelog && (
                <CardContent>
                    <h3 className="text-lg font-semibold mb-2">Generated Changelog</h3>
                    {changelogId && (
                        <div className="w-full mb-2">
                            <div className="flex items-center space-x-2">
                                <div className="relative flex-grow">
                                    <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="changelogUrl"
                                        ref={urlInputRef}
                                        value={changelogUrl}
                                        readOnly
                                        className="pl-10 pr-20"
                                    />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="absolute right-1 top-1/2 -translate-y-1/2"
                                        onClick={handleCopyClick}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button onClick={() => window.open(changelogUrl, '_blank')}>
                                    View
                                </Button>
                            </div>
                        </div>
                    )}
                    <MDPreview changelog={changelog} />
                </CardContent>
            )}
        </Card>
    );
};