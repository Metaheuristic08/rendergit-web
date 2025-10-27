import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, GitFork, Calendar } from 'lucide-react'
import Link from 'next/link'

// Mock data - in real app, this would come from API/database
const repositories = [
  {
    id: 1,
    owner: 'facebook',
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    stars: 223000,
    forks: 45000,
    lastProcessed: '2025-10-20',
    status: 'processed',
  },
  {
    id: 2,
    owner: 'vercel',
    name: 'next.js',
    description: 'The React Framework for the Web',
    stars: 123000,
    forks: 25000,
    lastProcessed: '2025-10-19',
    status: 'processed',
  },
]

export default function RepositoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Repositories</h1>
          <p className="text-muted-foreground">
            Browse all repositories with generated documentation
          </p>
        </div>

        <Separator className="mb-8" />

        <div className="grid gap-6">
          {repositories.map((repo) => (
            <Link key={repo.id} href={`/${repo.owner}/${repo.name}`}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {repo.owner}/{repo.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {repo.description}
                      </CardDescription>
                    </div>
                    <Badge variant={repo.status === 'processed' ? 'default' : 'secondary'}>
                      {repo.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Processed: {repo.lastProcessed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
