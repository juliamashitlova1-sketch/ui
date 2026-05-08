'use client'

import { useMemo } from 'react'

/**
 * In-browser React preview using Babel standalone to compile TSX to JS.
 * Renders the generated code inside a sandboxed iframe.
 */
export function CodePreview({ files, projectName }: { files: { filename: string; content: string }[]; projectName?: string }) {
  const previewHtml = useMemo(() => buildPreviewHtml(files, projectName), [files, projectName])

  if (!files.length) return null

  return (
    <div className="h-full w-full bg-white rounded-xl overflow-hidden border border-border">
      <iframe
        srcDoc={previewHtml}
        className="h-full w-full"
        sandbox="allow-scripts allow-same-origin"
        title="Preview"
      />
    </div>
  )
}

function buildPreviewHtml(files: { filename: string; content: string }[], projectName?: string): string {
  // Find the main App component
  const appFile = files.find(f => f.filename === 'App.tsx' || f.filename === 'App.jsx')
  const appCode = appFile?.content || 'export default function App() { return <div>No App component found</div> }'

  // Collect all component code (minus App.tsx)
  const components: { path: string; code: string }[] = []
  for (const f of files) {
    if (f.filename !== 'App.tsx' && f.filename.endsWith('.tsx')) {
      components.push({ path: f.filename, code: f.content })
    }
  }

  const componentImports = components
    .map(c => {
      const name = c.path.split('/').pop()?.replace('.tsx', '') || 'Unknown'
      return `      <script data-component="${c.path}">
// === ${c.path} ===
${c.code}
      </script>`
    })
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName || 'PixelForge Preview'}</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: { colors: { border: '#333', background: '#111', foreground: '#f5f5f5', muted: '#666', primary: '#f59e0b' } } }
    }
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script>window.process = { env: {} }</script>

  <script>
    // Simple module cache
    window.__modules = {}
    function __define(name, fn) {
      window.__modules[name] = fn()
    }
    function __require(name) {
      const mods = window.__modules
      // Resolve aliases
      const resolved = name
        .replace(/^@\//, './')
        .replace(/^lucide-react$/, 'lucide')
        .replace(/^clsx$/, 'clsx')
        .replace(/^tailwind-merge$/, 'tailwind-merge')
        .replace(/^class-variance-authority$/, 'class-variance-authority')
      return mods[resolved] || mods['./' + resolved] || {}
    }
  </script>

  <!-- Shims for common imports -->
  <script>
    __define('clsx', () => function clsx(...args) { return args.filter(Boolean).join(' ') })
    __define('tailwind-merge', () => function twMerge(...args) { return args.filter(Boolean).join(' ') })
    __define('class-variance-authority', () => ({ cva: () => () => '' }))
    __define('lucide', () => ({ X: () => '', Check: () => '', ArrowRight: () => '', Loader2: () => '', Sparkles: () => '', Download: () => '' }))
    __define('./lib/utils', () => { const cn = (...args) => args.filter(Boolean).join(' '); return { cn } })
  </script>

  <!-- Components -->
  <script>
    // shim for @/components/ui/*
    __define('./components/ui/button', () => {
      function Button({ children, className, ...props }) {
        return React.createElement('button', { className: 'px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition ' + (className || ''), ...props }, children)
      }
      return { Button, default: Button }
    })
    __define('./components/ui/input', () => {
      function Input({ className, ...props }) {
        return React.createElement('input', { className: 'px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white ' + (className || ''), ...props })
      }
      return { Input, default: Input }
    })
    __define('./components/ui/label', () => {
      function Label({ children, className, ...props }) {
        return React.createElement('label', { className: 'text-sm text-gray-400 ' + (className || ''), ...props }, children)
      }
      return { Label, default: Label }
    })
  </script>

${componentImports}

  <!-- App -->
  <script data-app>
${appCode}
  </script>

  <script>
    Babel.transformScriptTags()
  </script>

  <script type="text/babel" data-type="module">
    // Collect exports from App
    const appModule = window.__modules['./App']
    const App = appModule?.default || appModule?.App || (() => React.createElement('div', null, 'No App component'))
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(React.createElement(App))
  </script>
</body>
</html>`
}
