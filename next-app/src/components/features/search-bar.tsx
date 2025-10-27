'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar() {
  const router = useRouter()
  const [repoUrl, setRepoUrl] = React.useState('')
  const [error, setError] = React.useState('')

  const validateGithubUrl = (url: string): { owner: string; repo: string } | null => {
    // Match GitHub URLs like: https://github.com/owner/repo
    const githubRegex = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/
    const match = url.trim().match(githubRegex)
    
    if (match) {
      return { owner: match[1], repo: match[2] }
    }

    // Also match owner/repo format
    const shortFormatRegex = /^([^\/]+)\/([^\/]+)$/
    const shortMatch = url.trim().match(shortFormatRegex)
    
    if (shortMatch) {
      return { owner: shortMatch[1], repo: shortMatch[2] }
    }

    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!repoUrl.trim()) {
      setError('Please enter a repository URL')
      return
    }

    const parsed = validateGithubUrl(repoUrl)
    if (!parsed) {
      setError('Invalid GitHub repository URL. Use format: https://github.com/owner/repo or owner/repo')
      return
    }

    // Navigate to the repository wiki page
    router.push(`/${parsed.owner}/${parsed.repo}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter GitHub repository URL (e.g., https://github.com/facebook/react)"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <p className="text-xs text-muted-foreground text-center">
        Example: https://github.com/vercel/next.js or vercel/next.js
      </p>
    </form>
  )
}
