import { ChangelogGenerator } from '@/components/ChangelogGenerator'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Changelog Generator</h1>
      <ChangelogGenerator />
    </div>
  )
}