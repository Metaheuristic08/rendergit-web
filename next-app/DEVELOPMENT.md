# DirHub Development Documentation

## Architecture Overview

DirHub follows a modern Next.js 15 architecture with the App Router, leveraging both Server and Client Components for optimal performance.

### Architecture Layers

```
┌─────────────────────────────────────────┐
│         Browser (Client)                │
├─────────────────────────────────────────┤
│   React Client Components               │
│   - Interactive UI (NavBar, Search)     │
│   - State Management (useState)         │
│   - Event Handlers                      │
├─────────────────────────────────────────┤
│   Next.js App Router                    │
│   - File-based Routing                  │
│   - Server Components (default)         │
│   - Dynamic Routes ([owner]/[repo])     │
├─────────────────────────────────────────┤
│   Component Libraries                   │
│   - Radix UI (Primitives)              │
│   - Lucide React (Icons)               │
│   - Tailwind CSS (Styling)             │
├─────────────────────────────────────────┤
│   API Layer (Future)                    │
│   - GitHub API Integration              │
│   - Database Queries                    │
│   - AI Processing Service               │
└─────────────────────────────────────────┘
```

## Component Architecture

### UI Component Hierarchy

```
RootLayout
├── NavBar (Client Component)
│   ├── Desktop Navigation
│   └── Mobile Menu (Sheet)
│
└── Page Content (Server Component by default)
    ├── HomePage
    │   ├── SearchBar (Client)
    │   └── Feature Cards
    │
    ├── RepositoriesPage
    │   └── RepoCard[]
    │
    ├── AddRepositoryPage (Client)
    │   └── Form with validation
    │
    ├── QueuePage
    │   └── QueueItems with progress
    │
    └── WikiPage [owner]/[repo]
        └── WikiContent (Client)
            └── CollapsibleSection[]
```

## Routing Structure

### File-Based Routing

```
app/
├── layout.tsx              → / (all routes)
├── page.tsx               → /
├── repositories/
│   └── page.tsx          → /repositories
├── add/
│   └── page.tsx          → /add
├── queue/
│   └── page.tsx          → /queue
└── [owner]/
    └── [repo]/
        └── page.tsx      → /owner/repo (dynamic)
```

### Route Types

- **Static Routes**: `/`, `/repositories`, `/add`, `/queue`
- **Dynamic Routes**: `/[owner]/[repo]` - Wiki pages for specific repositories

## Data Flow

### Client-Side Search Flow

```
User Input → SearchBar Component
    ↓
Validation (GitHub URL format)
    ↓
Extract owner/repo
    ↓
Next.js Router.push(`/${owner}/${repo}`)
    ↓
Server Component renders WikiPage
    ↓
Fetch repository data (mock for now)
    ↓
Render WikiContent with markdown
```

### Add Repository Flow

```
User fills form → AddRepositoryPage
    ↓
Form submission → Validation
    ↓
API call (POST /api/repositories) - Future
    ↓
Add to processing queue
    ↓
Redirect to /queue
    ↓
Monitor processing status
```

## State Management

### Current Approach
- **Server Components**: Default, no client-side state
- **Client Components**: `useState` for local UI state
- **URL State**: Search params for filters and selections

### Future Considerations
- **React Context**: For theme and global UI state
- **Zustand**: For complex client state if needed
- **Server State**: React Query or SWR for API caching

## Styling System

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'], // Manual dark mode toggle
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        // ... more semantic colors
      },
    },
  },
}
```

### Design Tokens

CSS variables in `globals.css` define semantic colors that adapt to dark/light mode:

```css
:root {
  --background: 0 0% 100%;        /* white */
  --foreground: 222.2 84% 4.9%;   /* near black */
  --primary: 222.2 47.4% 11.2%;   /* dark blue */
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;   /* dark blue */
  --foreground: 210 40% 98%;      /* near white */
  --primary: 210 40% 98%;         /* light */
  /* ... */
}
```

## Component Patterns

### Button Component with Variants (CVA)

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input",
        // ...
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        // ...
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### CollapsibleSection Pattern

```typescript
function CollapsibleSection({ section, depth }) {
  const [isOpen, setIsOpen] = useState(depth < 2) // Auto-expand top levels
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
        {section.title}
      </button>
      {isOpen && (
        <div>
          {section.content}
          {section.children.map(child => 
            <CollapsibleSection section={child} depth={depth + 1} />
          )}
        </div>
      )}
    </div>
  )
}
```

## Performance Optimizations

### Next.js Built-in Optimizations

1. **Server Components**: Default rendering on server
2. **Static Generation**: Pre-render static pages at build time
3. **Dynamic Routes**: On-demand rendering for `[owner]/[repo]`
4. **Code Splitting**: Automatic per-route splitting
5. **Image Optimization**: Next.js Image component (not used yet)

### Custom Optimizations

1. **Memoization**: `useMemo` for expensive markdown parsing
2. **Lazy Expansion**: Collapsible sections load children on demand
3. **Debouncing**: Search input debounced (future enhancement)

## Accessibility (a11y)

### Radix UI Integration

All UI primitives use Radix UI which provides:
- ARIA attributes automatically
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Best Practices Applied

- Semantic HTML (`<header>`, `<nav>`, `<main>`)
- Alt text for images (when added)
- Focus indicators on interactive elements
- Color contrast ratios meet WCAG AA
- Keyboard navigation (Tab, Enter, Escape)

## Testing Strategy

### Unit Tests (Future)

```typescript
// Example: Button component test
describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="outline">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
```

### Integration Tests (Future)

```typescript
// Example: SearchBar test
describe('SearchBar', () => {
  it('validates and navigates on submit', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText(/Enter GitHub/)
    await userEvent.type(input, 'facebook/react')
    await userEvent.click(screen.getByText('Search'))
    expect(mockRouter.push).toHaveBeenCalledWith('/facebook/react')
  })
})
```

## API Integration (Future)

### Planned Endpoints

```typescript
// GET /api/repositories - List all repositories
// POST /api/repositories - Add new repository
// GET /api/repositories/:owner/:repo - Get repository wiki
// GET /api/queue - Get processing queue
```

### API Client Pattern

```typescript
// lib/api.ts
export async function fetchWiki(owner: string, repo: string) {
  const response = await fetch(`/api/repositories/${owner}/${repo}`)
  if (!response.ok) throw new Error('Failed to fetch wiki')
  return response.json()
}

// app/[owner]/[repo]/page.tsx
export default async function WikiPage({ params }) {
  const { owner, repo } = await params
  const wikiData = await fetchWiki(owner, repo)
  
  return <WikiContent content={wikiData.content} />
}
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Docker

```dockerfile
# Dockerfile (future)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Environment Setup

### Development

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
GITHUB_TOKEN=ghp_...
```

### Production

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.dirhub.com
DATABASE_URL=postgresql://prod...
GITHUB_TOKEN=ghp_prod...
```

## Migration Notes

### From Vite to Next.js

1. **Routing**: React Router → Next.js App Router
2. **Components**: Custom → Radix UI primitives
3. **Styling**: CSS Modules → Tailwind CSS
4. **State**: Context API → Server Components + minimal client state
5. **Build**: Vite → Next.js compiler

### Preserved Functionality

- Repository search and validation
- Wiki content display with collapsible sections
- Queue monitoring UI
- Repository listing

### Enhanced Features

- Server-side rendering for better SEO
- Built-in API routes (future)
- Optimized performance with RSC
- Better TypeScript integration
- Improved accessibility with Radix UI

## Contributing Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use Tailwind classes, avoid custom CSS
- Prefer Server Components unless interactivity needed
- Use Radix UI primitives for new components

### Component Creation

```typescript
// components/ui/new-component.tsx
import { cn } from "@/lib/utils"

export interface NewComponentProps {
  // ... props
}

export function NewComponent({ className, ...props }: NewComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  )
}
```

### File Naming

- Components: PascalCase (Button.tsx)
- Utilities: camelCase (utils.ts)
- Pages: lowercase (page.tsx)
- Directories: lowercase with hyphens (search-bar/)

## Troubleshooting

### Build Errors

**Error**: "Cannot find module"
- Check import paths use `@/` alias
- Verify tsconfig.json paths are correct

**Error**: "params is not a Promise"
- In Next.js 15, params must be awaited
- Use: `const { owner } = await params`

### Runtime Issues

**Issue**: Styles not applying
- Check Tailwind config includes correct content paths
- Verify CSS variables are defined in globals.css

**Issue**: Component not updating
- Check if component should be Client Component ('use client')
- Verify state management is correct

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
