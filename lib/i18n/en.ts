import type { TranslationSchema } from "./types"

export const en: TranslationSchema = {
  // Site-wide
  site: {
    tagline: "Record once. Ship a working prototype.",
    footer: "© {year} PixelForge. Built for people who ship.",
    version: "v0.1 · landing for early-access funnel",
  },

  // Navigation
  nav: {
    flowCapture: "Flow Capture",
    howItWorks: "How it works",
    landscape: "Landscape",
    prd: "PRD",
    signIn: "Sign in",
    joinWaitlist: "Join waitlist",
    beta: "Beta",
  },

  // Hero
  hero: {
    badge: "Now in private beta · Module C",
    heading1: "Record once.",
    heading2: "Ship the prototype.",
    description:
      "Every design-to-code tool turns frames into UI. PixelForge turns flows into working prototypes — screen recording in, interactive React app out, with state, transitions, and edge cases intact.",
    cta: "Get early access",
    watchDemo: "Watch 90s demo",
    recordingToState: "Recording → State machine",
    realInteractions: "Real interactions",
    productionReact: "Production React",
  },

  // Hero Preview
  heroPreview: {
    input: "Input · screen.mov",
    output: "Output · TaskList.tsx",
    detectedStates: "Detected 7 states",
    live: "live",
    states: {
      idle: "Idle / empty list",
      addTask: "Click 'Add task' button",
      modalOpens: "Modal opens (slide-up)",
      typeInput: "Type into input field",
      submitLoading: "Submit → loading state",
      optimisticInsert: "Optimistic insert",
      settled: "Settled · 1 task",
    },
  },

  // Gap Section
  gap: {
    label: "The gap",
    heading: "Today's tools see screens. Not flows.",
    description:
      "v0, Locofy, Same.dev, Builder.io — they all turn one frame into one page. But your product isn't a frame. It's loading states, optimistic updates, modal transitions, error toasts, and the seven edge cases QA finds at 11pm.",
    staticLabel: "Static design-to-code",
    staticItems: [
      "One screenshot in, one stateless page out",
      "You wire up state, transitions, and APIs by hand",
      "Loading, error, and empty states get forgotten",
      "A dozen prompts to describe what 5 seconds of video shows",
    ],
    pixelforgeLabel: "PixelForge · Flow Capture",
    pixelforgeItems: [
      "Recording in, working interactive prototype out",
      "State machine inferred from your actions",
      "Transitions, optimistic updates, and async states preserved",
      "Editable timeline — tweak any state, regenerate just that branch",
    ],
  },

  // Module Showcase
  modules: {
    label: "Three modules. One workflow.",
    heading: "Flow Capture leads. The rest support.",
    description:
      "We're not building another design-to-code tool. Flow Capture is the wedge. Frame Reforge and Idea Foundry round out the workflow.",
    items: {
      flowCapture: {
        badge: "Module C · Headliner",
        title: "Flow Capture",
        subtitle: "Recording → interactive prototype",
        description:
          "Drop in a screen recording. PixelForge extracts the underlying state machine, then generates a working React app — buttons that actually do things, modals that actually open, lists that actually update.",
        bullets: [
          "Auto-detected states & transitions",
          "Editable timeline — tweak any step",
          "Optimistic updates & async states",
          "Production React + Tailwind output",
        ],
        learnMore: "Learn more",
      },
      frameReforge: {
        badge: "Module A · Foundation",
        title: "Frame Reforge",
        subtitle: "Screenshot / Figma → page",
        description:
          "The table-stakes design-to-code engine that powers Flow Capture under the hood. Use it standalone when all you need is a single high-fidelity screen.",
        bullets: [
          "Pixel-grade visual fidelity",
          "Component-aware extraction",
          "Tailwind / shadcn output",
          "Playwright pixel-diff loop",
        ],
      },
      ideaFoundry: {
        badge: "Module B · Spark",
        title: "Idea Foundry",
        subtitle: "Keyword / mood → 9-up explorations",
        description:
          "Stuck on a blank canvas? Describe a vibe, get nine directions. Pick one, send it to Frame Reforge or Flow Capture to keep going.",
        bullets: [
          "9-grid style explorations",
          "Mood + brand inputs",
          "Hand-off to code modules",
          "Free tier — top of funnel",
        ],
      },
    },
  },

  // How It Works
  howItWorks: {
    label: "How Flow Capture works",
    heading: "Recording in. Working app out. Four steps.",
    steps: {
      drop: {
        title: "Drop a recording",
        description:
          "Screen recording, Loom link, or click-through video. 5 to 90 seconds works best. No annotations needed — just record yourself using the thing.",
        code: "input.mov  →  PixelForge",
      },
      extract: {
        title: "Flow extraction",
        description:
          "A vision model segments frames into discrete UI states. A reasoning model labels transitions, intents, and async boundaries — building a typed state machine.",
        code: "states: 7  ·  transitions: 9  ·  effects: 3",
      },
      edit: {
        title: "Edit the timeline",
        description:
          "Inspect every detected state on a horizontal timeline. Rename, merge, branch, or add states the model missed. This is the source of truth.",
        code: "state.modal_open  →  Slide-up · 240ms · ease-out",
      },
      ship: {
        title: "Ship a working app",
        description:
          "Generates production React + Tailwind with proper hooks, state management, optimistic updates, and the loading/error/empty states the original had — or should have had.",
        code: "→ TaskList.tsx  ·  AddTaskModal.tsx  ·  api.ts",
      },
    },
  },

  // Competitive Quadrant
  quadrant: {
    label: "The landscape",
    heading: "Where everyone else is fighting. And where we're not.",
    description:
      "The static / developer-focused quadrant is a bloodbath. The dynamic / developer-focused quadrant is empty. That's where PixelForge lives.",
    xAxis: "Static frame → Dynamic flow",
    yAxis: "Designer → Developer",
    quadrants: {
      topLeft: {
        title: "Static · Developer",
        note: "Crowded · Locofy, Builder, v0, Bolt",
      },
      topRight: {
        title: "Dynamic · Developer",
        note: "Open territory",
      },
      bottomLeft: {
        title: "Static · Designer",
        note: "Figma Make, Anima, Galileo",
      },
      bottomRight: {
        title: "Dynamic · Designer",
        note: "Mostly motion / prototyping tools",
      },
    },
    readChart: "Read the chart",
    readChartDesc:
      "X-axis: how much of the flow the tool understands. Y-axis: who the output serves — designer (mocks) or developer (production code).",
    competitors: {
      "figma-make": "Figma Make",
      anima: "Anima",
      galileo: "Galileo",
      uizard: "Uizard",
      locofy: "Locofy",
      builder: "Builder.io",
      v0: "v0",
      bolt: "Bolt.new",
      lovable: "Lovable",
      same: "Same.dev",
      pixelforge: "PixelForge",
    },
  },

  // Comparison Table
  comparison: {
    label: "Head to head",
    heading: "What no other tool does today",
    capability: "Capability",
    rows: {
      "screenshot-static": "Screenshot → static page",
      "production-react": "Production React + Tailwind",
      "recording-multi-state": "Recording → multi-state UI",
      "inferred-state-machine": "Inferred state machine",
      "editable-transition-timeline": "Editable transition timeline",
      "optimistic-async-preserved": "Optimistic / async states preserved",
      "per-state-regenerate": "Per-state regenerate",
    },
    tools: ["v0", "Locofy", "Same.dev", "Figma Make", "PixelForge"],
  },

  // Waitlist
  waitlist: {
    badge: "Private beta · Q2 2026",
    heading: "Be early. Help shape Flow Capture.",
    description:
      "We're onboarding the first 200 teams personally. You'll get early access, founder-level support, and lifetime pro pricing.",
    emailPlaceholder: "you@company.com",
    cta: "Request access",
    joining: "Joining...",
    roleLabel: "I'm a",
    roles: ["Frontend engineer", "Designer", "Founder", "PM", "Other"],
    success: "You're on the list.",
    successNote: "We'll be in touch within a week.",
    error: "Failed to join. Please try again.",
    alreadyJoined: "You're already on the list.",
    noSpam: "No spam",
    unsubscribe: "Unsubscribe anytime",
    lifetimePricing: "Onboarded teams keep lifetime pricing",
  },

  // FAQ
  faq: {
    label: "FAQ",
    heading: "The questions everyone asks",
    items: [
      {
        q: "How is this different from v0, Bolt, or Lovable?",
        a: "Those tools take prompts or screenshots and generate single screens or full apps in one shot. PixelForge takes a video — meaning we have a temporal signal nobody else uses. We extract the state machine implied by the recording, so the output is interactive by construction. They do frames; we do flows.",
      },
      {
        q: "Why a recording instead of a Figma file?",
        a: "Figma describes static layouts. Recordings describe behavior. A 5-second video of you using a UI contains more information about how it should work than 50 Figma frames stitched together. And recordings are far easier to capture — you don't need a designer in the loop.",
      },
      {
        q: "What kind of recordings work best?",
        a: "5–90 second clips of a single user flow at consistent zoom, no overlays. We handle web apps best today. Native iOS / Android, internal tools, and Loom-style recordings are all on the roadmap.",
      },
      {
        q: "Will the generated code be production-ready?",
        a: "Our goal is yes — typed React, proper state management, accessible markup, Tailwind utility classes, and the loading / error / empty states the recording implies. You'll still want to wire up real APIs and review, but you should not be rewriting from scratch.",
      },
      {
        q: "What does Frame Reforge (Module A) do, then?",
        a: "It's the screenshot-to-page engine that powers Flow Capture under the hood. We expose it as a standalone module because sometimes you really do just need one screen, fast. It's table stakes — Flow Capture is the differentiator.",
      },
      {
        q: "When can I try it?",
        a: "Private beta starts Q2 2026. Sign up for the waitlist and we'll onboard the first 200 teams personally. Public launch follows.",
      },
    ],
  },

  // Footer
  footer: {
    description:
      "Recording → interactive prototype. The first design-to-code tool that understands flows, not just frames.",
    product: "Product",
    company: "Company",
    resources: "Resources",
    flowCapture: "Flow Capture",
    howItWorks: "How it works",
    landscape: "Landscape",
    prd: "PRD",
    waitlist: "Waitlist",
    changelog: "Changelog",
    contact: "Contact",
    docs: "Docs",
    blog: "Blog",
    twitter: "Twitter / X",
  },
}
