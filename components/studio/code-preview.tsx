"use client";

import { useMemo } from "react";

/**
 * In-browser React preview.
 * Uses srcdoc iframe with CDN deps + Babel standalone for JSX.
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
        sandbox="allow-scripts allow-same-origin"
        title="Live Preview"
        style={{ border: 0 }}
      />
    </div>
  );
}

/**
 * Escape </script> tags inside code content so they don't break
 * the HTML parser when embedded in <script> blocks.
 */
function esc(str: string): string {
  return str.replace(/<\/script>/gi, "<\\/script>");
}

function buildPreviewHtml(
  files: { filename: string; content: string }[],
  projectName?: string,
): string {
  const appFile = files.find((f) => f.filename === "App.tsx");
  const appCode = esc(
    appFile?.content ||
      "export default function App() { return <div>Hello</div> }",
  );

  // All other .tsx files as components
  const otherFiles = files.filter(
    (f) => f.filename !== "App.tsx" && f.filename.endsWith(".tsx"),
  );

  // Encode all code as JSON so it survives HTML parsing intact
  const codeJson = JSON.stringify({
    app: appFile?.content || "",
    components: otherFiles.map((f) => ({ path: f.filename, code: f.content })),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(projectName || "Preview")}</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh}
  </style>
</head>
<body>
  <div id="root"></div>

  <script>
  // Code bundle (JSON-encoded to survive HTML parsing)
  window.__CODE = ${codeJson};
  </script>

  <script>
  // Module system
  window.__mod = {};
  function __def(n,f){ window.__mod[n]=f(); }
  function __req(n){
    var k=n.replace(/^@\\//,'./').replace(/^lucide-react$/,'lucide');
    return window.__mod[k]||window.__mod['./'+k]||{};
  }
  </script>

  <script>
  // Utility shims
  __def('clsx',function(){return function(){return Array.prototype.filter.call(arguments,Boolean).join(' ')}});
  __def('tailwind-merge',function(){return function(){return Array.prototype.filter.call(arguments,Boolean).join(' ')}});
  __def('class-variance-authority',function(){return{cva:function(){return function(){return ''}}}});
  __def('lucide',function(){return{X:'X',Check:'Check',ArrowRight:'ArrowRight'}});
  __def('./lib/utils',function(){return{cn:function(){return Array.prototype.filter.call(arguments,Boolean).join(' ')}}});
  // shadcn shims
  __def('./components/ui/button',function(){
    var R=React;
    return{Button:function(p){return R.createElement('button',Object.assign({},p,{className:'px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition '+(p.className||'')}),p.children)},default:this.Button}
  });
  __def('./components/ui/input',function(){
    var R=React;
    return{Input:function(p){return R.createElement('input',Object.assign({},p,{className:'px-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white '+(p.className||'')})),default:this.Input}
  });
  __def('./components/ui/label',function(){
    var R=React;
    return{Label:function(p){return R.createElement('label',Object.assign({},p,{className:'text-sm text-gray-400 '+(p.className||'')}),p.children),default:this.Label}
  });
  __def('./components/ui/card',function(){
    var R=React;
    return{Card:function(p){return R.createElement('div',Object.assign({},p,{className:'rounded-xl border border-gray-700 bg-gray-900 p-4 '+(p.className||'')}),p.children),default:this.Card}
  });
  </script>

  <script>
  // Register all component files
  var code = window.__CODE;
  (code.components||[]).forEach(function(c){
    try {
      var script = document.createElement('script');
      script.type = 'text/babel';
      script.textContent = c.code;
      document.body.appendChild(script);
    } catch(e){ console.error(c.path, e); }
  });
  // App component
  try {
    var appScript = document.createElement('script');
    appScript.type = 'text/babel';
    appScript.textContent = code.app;
    document.body.appendChild(appScript);
  } catch(e){ console.error('App', e); }
  </script>

  <script>
  // Compile and render
  setTimeout(function(){
    try { Babel.transformScriptTags(); } catch(e){ console.error('Babel', e); }
    var App = window.__mod['./App']?.default || function(){ return React.createElement('div', null, 'Preview ready') };
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
  }, 200);
  </script>

</body></html>`;
}
