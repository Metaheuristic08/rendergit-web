import type { Metadata } from 'next'
import '@/styles/globals.css'
import { NavBar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'DirHub - Automatic GitHub Wiki Documentation',
  description: 'Generate automatic wiki documentation for GitHub repositories using AI analysis',
  keywords: ['github', 'documentation', 'wiki', 'ai', 'repository', 'code analysis'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
