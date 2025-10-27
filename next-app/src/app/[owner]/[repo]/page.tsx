import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { WikiContent } from '@/components/features/wiki-content'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface WikiPageProps {
  params: Promise<{
    owner: string
    repo: string
  }>
}

// Mock wiki content - in real app, this would come from API/database
const mockWikiContent = `# Repository Overview

## Project Structure

### /src
The main source code directory containing all application logic.

#### /src/components
React components organized by feature.

##### /src/components/ui
- **Button.tsx** - Reusable button component with variants
- **Card.tsx** - Card component for content containers
- **Input.tsx** - Form input component

##### /src/components/features
- **SearchBar.tsx** - Repository search functionality
- **WikiContent.tsx** - Wiki documentation renderer

#### /src/app
Next.js App Router pages and layouts.

- **layout.tsx** - Root layout with navigation
- **page.tsx** - Home page
- **/repositories/page.tsx** - Repository listing
- **/add/page.tsx** - Add new repository

### /public
Static assets and public files.

## Architecture

The application follows a modern Next.js architecture with:
- Server Components for optimal performance
- Client Components for interactivity
- TypeScript for type safety
- Tailwind CSS for styling

## Key Features

1. **Repository Search** - Find and add GitHub repositories
2. **AI Documentation** - Automatically generated wiki from code analysis
3. **Interactive Navigation** - Collapsible sections for easy browsing
4. **Responsive Design** - Works on all devices
`

export default async function WikiPage({ params }: WikiPageProps) {
  const { owner, repo } = await params

  // In a real app, fetch repository data and wiki content from API
  const repoData = {
    owner,
    repo,
    description: 'A sample repository with auto-generated wiki documentation',
    stars: 12500,
    forks: 2300,
    githubUrl: `https://github.com/${owner}/${repo}`,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Repository Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {owner}/{repo}
              </h1>
              <p className="text-muted-foreground">{repoData.description}</p>
            </div>
            <Badge>Processed</Badge>
          </div>

          <div className="flex items-center gap-6 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{repoData.stars.toLocaleString()} stars</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{repoData.forks.toLocaleString()} forks</span>
            </div>
          </div>

          <Link href={repoData.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </Link>
        </div>

        <Separator className="mb-8" />

        {/* Wiki Content */}
        <WikiContent content={mockWikiContent} />
      </div>
    </div>
  )
}
