export type Language = 'en' | 'zh'

export type TranslationSchema = {
  // Site-wide
  site: {
    tagline: string
    footer: string
    version: string
  }

  // Navigation
  nav: {
    flowCapture: string
    howItWorks: string
    landscape: string
    prd: string
    signIn: string
    joinWaitlist: string
    beta: string
  }

  // Hero
  hero: {
    badge: string
    heading1: string
    heading2: string
    description: string
    cta: string
    watchDemo: string
    recordingToState: string
    realInteractions: string
    productionReact: string
  }

  // Hero Preview
  heroPreview: {
    input: string
    output: string
    detectedStates: string
    live: string
    states: {
      idle: string
      addTask: string
      modalOpens: string
      typeInput: string
      submitLoading: string
      optimisticInsert: string
      settled: string
    }
  }

  // Gap Section
  gap: {
    label: string
    heading: string
    description: string
    staticLabel: string
    staticItems: string[]
    pixelforgeLabel: string
    pixelforgeItems: string[]
  }

  // Module Showcase
  modules: {
    label: string
    heading: string
    description: string
    items: {
      flowCapture: {
        badge: string
        title: string
        subtitle: string
        description: string
        bullets: string[]
        learnMore: string
      }
      frameReforge: {
        badge: string
        title: string
        subtitle: string
        description: string
        bullets: string[]
      }
      ideaFoundry: {
        badge: string
        title: string
        subtitle: string
        description: string
        bullets: string[]
      }
    }
  }

  // How It Works
  howItWorks: {
    label: string
    heading: string
    steps: {
      drop: { title: string; description: string; code: string }
      extract: { title: string; description: string; code: string }
      edit: { title: string; description: string; code: string }
      ship: { title: string; description: string; code: string }
    }
  }

  // Competitive Quadrant
  quadrant: {
    label: string
    heading: string
    description: string
    xAxis: string
    yAxis: string
    quadrants: {
      topLeft: { title: string; note: string }
      topRight: { title: string; note: string }
      bottomLeft: { title: string; note: string }
      bottomRight: { title: string; note: string }
    }
    readChart: string
    readChartDesc: string
    competitors: Record<string, string>
  }

  // Comparison Table
  comparison: {
    label: string
    heading: string
    capability: string
    rows: Record<string, string>
    tools: string[]
  }

  // Waitlist
  waitlist: {
    badge: string
    heading: string
    description: string
    emailPlaceholder: string
    cta: string
    joining: string
    roleLabel: string
    roles: string[]
    success: string
    successNote: string
    error: string
    alreadyJoined: string
    noSpam: string
    unsubscribe: string
    lifetimePricing: string
  }

  // FAQ
  faq: {
    label: string
    heading: string
    items: Array<{ q: string; a: string }>
  }

  // Footer
  footer: {
    description: string
    product: string
    company: string
    resources: string
    flowCapture: string
    howItWorks: string
    landscape: string
    prd: string
    waitlist: string
    changelog: string
    contact: string
    docs: string
    blog: string
    twitter: string
  }
}
