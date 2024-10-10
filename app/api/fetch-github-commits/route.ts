import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function POST(req: Request) {
    const { url, branch } = await req.json()
    try {
        const [owner, repo] = url.replace('https://github.com/', '').split('/')
        const { data: commits } = await octokit.repos.listCommits({
            owner,
            repo,
            sha: branch,
            per_page: 100,
        })
        const formattedCommits = commits.map(commit => commit.commit.message).join('\n')
        return NextResponse.json({ commits: formattedCommits })
    } catch (error) {
        console.error('Error fetching GitHub commits:', error)
        return NextResponse.json({ error: 'Failed to fetch GitHub commits' }, { status: 500 })
    }
}