import { SearchBar } from '@/components/features/search-bar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Github, FileText, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          DirHub
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Generate automatic wiki documentation for any GitHub repository using AI analysis
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why DirHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Github className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>
                Connect any public GitHub repository and let AI analyze the codebase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simply paste a repository URL and we&apos;ll handle the rest. Support for public and private repositories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Auto Documentation</CardTitle>
              <CardDescription>
                AI-powered analysis generates comprehensive wiki documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get structured documentation covering architecture, components, and code organization automatically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Fast & Interactive</CardTitle>
              <CardDescription>
                Browse documentation with collapsible sections and quick navigation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Navigate through folders and files easily with expandable sections and direct links to source code.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
        <p className="text-muted-foreground mb-8">
          Enter a GitHub repository URL above or explore our example repositories
        </p>
      </div>
    </div>
  )
}
