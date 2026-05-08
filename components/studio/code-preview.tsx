"use client";

import { useMemo } from "react";

/**
 * In-browser React preview using Babel standalone.
 * Renders generated code in a sandboxed iframe.
 */
export function CodePreview({
  files,
  projectName,
}: {
  files: { filename: string; content: string }[];
  projectName?: string;
}) {
  const previewHtml = useMemo(
    () => buildPreviewHtml(files, projectName),
    [files, projectName],
  );

  if (!files.length) return null;

  return (
    <div
      className="h-full w-full rounded-xl overflow-hidden border border-border bg-white"
      style={{ minHeight: 400 }}
    >
      <iframe
        srcDoc={previewHtml}
        className="h-full w-full"
        sandbox="allow-scripts"
        title="Live Preview"
        style={{ border: 0 }}
      />
    </div>
  );
}

function buildPreviewHtml(
  files: { filename: string; content: string }[],
  projectName?: string,
): string {
  const appFile = files.find((f) => f.filename === "App.tsx");
  const appCode =
    appFile?.content ||
    "export default function App() { return <div>Hello</div> }";

  const componentFiles = files.filter(
    (f) => f.filename !== "App.tsx" && f.filename.endsWith(".tsx"),
  );

  const componentScripts = componentFiles
    .map(
      (f) =>
        `<!-- ${f.filename} -->
<script>
try { ${f.content} } catch(e) { console.error("${f.filename}", e) }
</script>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName || "Preview"}</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0a0a0a;color:#f5f5f5}
  </style>
</head>
<body><div id="root"></div>

<script>
// Minimal module polyfill for generated code
window.__mod = {}
function __def(name, init) { window.__mod[name] = init() }
function __req(name) {
  var m = window.__mod
  var key = name.replace(/^@\\//, './').replace(/^lucide-react$/, 'lucide')
  return m[key] || m['./'+key] || {}
}
</script>

<script>
// shims for imports the generated code uses
__def('clsx', function(){ return function(){ return Array.prototype.filter.call(arguments, Boolean).join(' ') } })
__def('tailwind-merge', function(){ return function(){ return Array.prototype.filter.call(arguments, Boolean).join(' ') } })
__def('class-variance-authority', function(){ return { cva: function(){ return function(){ return '' } } } })
__def('lucide', function(){ return { X: 'X', Check: 'Check', ArrowRight: 'ArrowRight' } })
__def('./lib/utils', function(){ return { cn: function(){ return Array.prototype.filter.call(arguments, Boolean).join(' ') } } })
// shim for shadcn ui components
__def('./components/ui/button', function(){
  var React = window.React
  return { Button: function(props){ return React.createElement('button', Object.assign({}, props, { className: 'px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition '+ (props.className||'') }), props.children), default: this.Button } }
})
__def('./components/ui/input', function(){
  var React = window.React
  return { Input: function(props){ return React.createElement('input', Object.assign({}, props, { className: 'px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white '+ (props.className||'') })), default: this.Input } }
})
__def('./components/ui/label', function(){
  var React = window.React
  return { Label: function(props){ return React.createElement('label', Object.assign({}, props, { className: 'text-sm text-gray-400 '+ (props.className||'') }), props.children), default: this.Label } }
})
__def('./components/ui/card', function(){
  var React = window.React
  return { Card: function(props){ return React.createElement('div', Object.assign({}, props, { className: 'rounded-xl border border-gray-700 bg-gray-900 p-4 '+ (props.className||'') }), props.children), default: this.Card } }
})
</script>

${componentScripts}

<script type="text/babel">
${appCode}
</script>

<script>
// Wait for Babel & Tailwind, then render
setTimeout(function(){
  Babel.transformScriptTags()
  var App = window.__mod['./App']?.default || function(){ return React.createElement('div', null, 'App loaded') }
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App))
}, 100)
</script>

</body></html>`;
}
