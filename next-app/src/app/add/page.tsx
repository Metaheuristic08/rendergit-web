'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function AddRepositoryPage() {
  const [repoUrl, setRepoUrl] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Simulate success
      setStatus('success')
      setMessage('Repository added to processing queue successfully!')
      setRepoUrl('')
    } catch (error) {
      setStatus('error')
      setMessage('Failed to add repository. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add Repository</h1>
          <p className="text-muted-foreground">
            Add a new GitHub repository to generate wiki documentation
          </p>
        </div>

        <Separator className="mb-8" />

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Repository Information</CardTitle>
              <CardDescription>
                Enter the GitHub repository URL you want to process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="repoUrl" className="text-sm font-medium">
                  Repository URL
                </label>
                <Input
                  id="repoUrl"
                  type="text"
                  placeholder="https://github.com/owner/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: https://github.com/owner/repo or owner/repo
                </p>
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <p className="text-sm">{message}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{message}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRepoUrl('')}
                disabled={status === 'submitting'}
              >
                Clear
              </Button>
              <Button type="submit" disabled={status === 'submitting' || !repoUrl}>
                {status === 'submitting' ? 'Adding...' : 'Add to Queue'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Your repository is added to the processing queue</li>
            <li>Our AI analyzes the codebase structure and contents</li>
            <li>Wiki documentation is automatically generated</li>
            <li>You&apos;ll be able to view the documentation once processing is complete</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
