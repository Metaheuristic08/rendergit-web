'use client'

import * as React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WikiContentProps {
  content: string
}

interface Section {
  level: number
  title: string
  content: string
  children: Section[]
  id: string
}

function parseMarkdownToSections(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  const stack: Section[] = []

  let currentContent: string[] = []
  let lineIndex = 0

  while (lineIndex < lines.length) {
    const line = lines[lineIndex]
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)

    if (headerMatch) {
      // Save previous content
      if (stack.length > 0) {
        stack[stack.length - 1].content = currentContent.join('\n').trim()
        currentContent = []
      }

      const level = headerMatch[1].length
      const title = headerMatch[2]
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

      const section: Section = {
        level,
        title,
        content: '',
        children: [],
        id,
      }

      // Pop stack until we find the parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        const completed = stack.pop()!
        if (stack.length > 0) {
          stack[stack.length - 1].children.push(completed)
        } else {
          sections.push(completed)
        }
      }

      stack.push(section)
    } else {
      currentContent.push(line)
    }

    lineIndex++
  }

  // Clean up remaining stack
  while (stack.length > 0) {
    const completed = stack.pop()!
    completed.content = currentContent.join('\n').trim()
    currentContent = []

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(completed)
    } else {
      sections.push(completed)
    }
  }

  return sections
}

function CollapsibleSection({ section, depth = 0 }: { section: Section; depth?: number }) {
  const [isOpen, setIsOpen] = React.useState(depth < 2)

  const hasChildren = section.children.length > 0
  const paddingLeft = depth * 1.5

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 w-full text-left py-2 px-3 rounded-lg hover:bg-accent transition-colors",
          `text-${Math.min(4 - section.level + 20, 24)}xl font-semibold`
        )}
        style={{ paddingLeft: `${paddingLeft}rem` }}
      >
        {hasChildren && (
          isOpen ? (
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          )
        )}
        <span className={cn(
          section.level === 1 && "text-2xl",
          section.level === 2 && "text-xl",
          section.level === 3 && "text-lg",
          section.level === 4 && "text-base",
          section.level >= 5 && "text-sm"
        )}>
          {section.title}
        </span>
      </button>

      {isOpen && (
        <div style={{ paddingLeft: `${paddingLeft + 1.5}rem` }}>
          {section.content && (
            <div className="prose dark:prose-invert max-w-none mb-4 text-sm text-muted-foreground whitespace-pre-wrap">
              {section.content}
            </div>
          )}

          {section.children.map((child, index) => (
            <CollapsibleSection key={index} section={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function WikiContent({ content }: WikiContentProps) {
  const sections = React.useMemo(() => parseMarkdownToSections(content), [content])

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <CollapsibleSection key={index} section={section} />
      ))}
    </div>
  )
}
