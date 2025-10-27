# DirHub - Automatic GitHub Wiki Documentation Generator

DirHub is a modern SaaS platform that automatically generates wiki documentation for GitHub repositories using AI analysis. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Automatic Documentation Generation**: AI-powered analysis of GitHub repositories to create comprehensive wiki documentation
- **Interactive Wiki Navigation**: Collapsible sections for easy browsing of repository structure
- **Repository Management**: Add, queue, and monitor repository processing
- **Modern UI**: Built with Next.js 15 App Router, Radix UI, and Tailwind CSS
- **Responsive Design**: Optimized for all devices
- **Type-Safe**: Full TypeScript implementation

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
next-app/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with navigation
│   │   ├── page.tsx             # Home page
│   │   ├── repositories/        # Repository list page
│   │   ├── add/                 # Add repository page
│   │   ├── queue/               # Processing queue page
│   │   └── [owner]/[repo]/      # Dynamic wiki page
│   │
│   ├── components/              # React components
│   │   ├── layout/             # Layout components
│   │   │   └── navbar.tsx      # Main navigation
│   │   ├── ui/                 # UI primitives (Radix UI based)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   └── separator.tsx
│   │   └── features/           # Feature components
│   │       ├── search-bar.tsx
│   │       └── wiki-content.tsx
│   │
│   ├── lib/                    # Utilities
│   │   └── utils.ts           # Helper functions
│   │
│   └── styles/                # Global styles
│       └── globals.css        # Tailwind + CSS variables
│
├── public/                    # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Tech Stack

### Core Framework
- **Next.js 15.x** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5.7** - Type safety

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional classes

### UI Components
- **Lucide React** - Icon library
- **Radix UI Primitives** - Navigation Menu, Dialog, Separator, Tooltip

## 📖 Pages

### Home (`/`)
- Hero section with search functionality
- Feature highlights
- Call-to-action sections

### Repositories (`/repositories`)
- List all processed repositories
- Repository metadata (stars, forks, last processed)
- Links to wiki pages

### Add Repository (`/add`)
- Form to submit new repositories
- Validation for GitHub URLs
- Queue submission

### Processing Queue (`/queue`)
- Monitor repository processing status
- Progress indicators
- Processing history

### Wiki Page (`/[owner]/[repo]`)
- Auto-generated repository documentation
- Collapsible section navigation
- Repository metadata
- Link to GitHub source

## 🎯 Key Components

### NavBar
- Responsive navigation with mobile menu
- Scroll-aware styling
- Active route highlighting

### SearchBar
- GitHub URL validation
- Support for multiple URL formats
- Client-side routing

### WikiContent
- Markdown-based section parser
- Collapsible hierarchical sections
- Auto-expand top-level sections

### UI Components
- **Button**: Multiple variants (default, outline, ghost, link)
- **Card**: Container with header, content, footer
- **Input**: Form input with validation states
- **Badge**: Status indicators
- **Separator**: Visual dividers

## 🎨 Theming

The app supports dark/light mode through CSS variables defined in `globals.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  /* ... more variables */
}

.dark {
  --background: ...;
  --foreground: ...;
  /* ... dark mode overrides */
}
```

## 🚀 Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# API endpoints (future implementation)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🔄 Migration from Vite

This Next.js app is a migration from the original Vite-based `rendergit-web`. Key changes:

1. **App Router**: Using Next.js 15 App Router instead of React Router
2. **Server Components**: Leveraging RSC for better performance
3. **File-based Routing**: Pages defined by file structure
4. **Radix UI**: Replacing custom components with accessible primitives
5. **Tailwind CSS**: Utility-first styling system

## 🎯 Future Enhancements

- [ ] GitHub OAuth integration
- [ ] Real API implementation for repository processing
- [ ] Advanced search and filtering
- [ ] User accounts and saved repositories
- [ ] Syntax highlighting for code blocks
- [ ] Export documentation as PDF/Markdown
- [ ] Dark mode toggle UI
- [ ] Internationalization (i18n)

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Next.js Team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for the styling system
- Lucide for beautiful icons

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
