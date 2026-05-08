import type { TranslationSchema } from "./types";

const zh: TranslationSchema = {
  // Site-wide
  site: {
    tagline: "录制一次，交付一个可用的原型。",
    footer: "献给那些真正交付产品的人。",
    version: "v0.1 · 早期访问漏斗着陆页",
  },

  // Navigation
  nav: {
    flowCapture: "流程捕获",
    howItWorks: "工作原理",
    landscape: "行业格局",
    prd: "PRD",
    signIn: "登录",
    joinWaitlist: "加入候补名单",
    beta: "Beta",
  },

  // Hero
  hero: {
    badge: "现已进入内测 · Module C",
    heading1: "录制一次。",
    heading2: "交付原型。",
    description:
      "所有设计转代码工具都将界面帧转换为 UI。PixelForge 则将流程转化为可工作的原型——屏幕录制输入，交互式 React 应用输出，状态、过渡和边界情况完整保留。",
    cta: "获取早期访问权限",
    watchDemo: "观看 90 秒演示",
    recordingToState: "录制 → 状态机",
    realInteractions: "真实交互",
    productionReact: "生产级 React",
  },

  // Hero Preview
  heroPreview: {
    input: "输入 · screen.mov",
    output: "输出 · TaskList.tsx",
    detectedStates: "检测到 7 个状态",
    live: "实时",
    states: {
      idle: "空闲 / 空列表",
      addTask: "点击「添加任务」按钮",
      modalOpens: "模态框打开（上滑动画）",
      typeInput: "在输入框中输入",
      submitLoading: "提交 → 加载状态",
      optimisticInsert: "乐观插入",
      settled: "已稳定 · 1 个任务",
    },
  },

  // Gap Section
  gap: {
    label: "差距",
    heading: "今天的工具只看得见界面，看不见流程。",
    description:
      "v0、Locofy、Same.dev、Builder.io——它们都将一个帧转换为一个页面。但你的产品不是一个帧。它是加载状态、乐观更新、模态过渡、错误提示，以及 QA 在深夜十一点发现的七个边界情况。",
    staticLabel: "静态设计转代码",
    staticItems: [
      "一张截图输入，一个无状态页面输出",
      "你需要手动编写状态、过渡和 API",
      "加载、错误和空状态常常被遗忘",
      "需要用十几个提示来描述 5 秒视频所展示的内容",
    ],
    pixelforgeLabel: "PixelForge · 流程捕获",
    pixelforgeItems: [
      "录制输入，可交互的原型输出",
      "从你的操作中推断出状态机",
      "过渡、乐观更新和异步状态得以保留",
      "可编辑的时间轴——调整任意状态，仅重新生成该分支",
    ],
  },

  // Module Showcase
  modules: {
    label: "三大模块，一个工作流。",
    heading: "流程捕获领衔，其余模块协同配合。",
    description:
      "我们并非在打造又一个设计转代码工具。流程捕获是核心利器，帧重构和灵感工坊则完善了整个工作流程。",
    items: {
      flowCapture: {
        badge: "Module C · 主打模块",
        title: "流程捕获",
        subtitle: "录制 → 交互式原型",
        description:
          "拖入一段屏幕录制。PixelForge 提取底层状态机，然后生成一个可用的 React 应用——按钮真的可以点击，模态框真的可以打开，列表真的可以更新。",
        bullets: [
          "自动检测状态和过渡",
          "可编辑的时间轴——随意调整每一步",
          "乐观更新和异步状态",
          "生产级 React + Tailwind 输出",
        ],
        learnMore: "了解更多",
      },
      frameReforge: {
        badge: "Module A · 基础模块",
        title: "Frame Reforge",
        subtitle: "截图 / Figma → 页面",
        description:
          "这是一款基础设计转代码引擎，为流程捕获提供底层支持。当你只需要一个高保真页面时，也可以独立使用。",
        bullets: [
          "像素级视觉保真度",
          "组件感知提取",
          "Tailwind / shadcn 输出",
          "Playwright 像素对比循环",
        ],
      },
      ideaFoundry: {
        badge: "Module B · 灵感模块",
        title: "灵感工坊",
        subtitle: "关键词 / 氛围 → 九宫格探索",
        description:
          "面对空白画布无从下手？描述一种感觉，获得九个方向。选择一个，发送到帧重构或流程捕获继续完善。",
        bullets: [
          "九宫格风格探索",
          "氛围和品牌输入",
          "衔接到代码模块",
          "免费层级——漏斗顶部",
        ],
      },
    },
  },

  // How It Works
  howItWorks: {
    label: "流程捕获的工作原理",
    heading: "录制输入，应用输出，只需四步。",
    steps: {
      drop: {
        title: "拖入录制",
        description:
          "屏幕录制、Loom 链接或点击演示视频，5 到 90 秒效果最佳。无需添加注释——只需录制你操作过程即可。",
        code: "input.mov → PixelForge",
      },
      extract: {
        title: "流程提取",
        description:
          "视觉模型将帧分割为离散的 UI 状态。推理模型标记过渡、意图和异步边界——构建一个强类型状态机。",
        code: "状态: 7 · 过渡: 9 · 效果: 3",
      },
      edit: {
        title: "编辑时间轴",
        description:
          "在水平时间轴上检查每个检测到的状态。重命名、合并、分支或添加模型遗漏的状态。这就是真相来源。",
        code: "state.modal_open → 上滑 · 240ms · ease-out",
      },
      ship: {
        title: "交付可用的应用",
        description:
          "生成生产级 React + Tailwind，包含正确的 Hooks、状态管理、乐观更新，以及原始应用所拥有——或应该拥有的——加载、错误和空状态。",
        code: "→ TaskList.tsx · AddTaskModal.tsx · api.ts",
      },
    },
  },

  // Competitive Quadrant
  quadrant: {
    label: "行业格局",
    heading: "别人在血战的地方，和我们不去的地方。",
    description:
      "静态/开发者象限已成红海。动态/开发者象限依然空白。这就是 PixelForge 所在之处。",
    xAxis: "静态帧 → 动态流程",
    yAxis: "设计师 → 开发者",
    quadrants: {
      topLeft: {
        title: "静态 · 开发者",
        note: "竞争激烈 · Locofy、Builder、v0、Bolt",
      },
      topRight: { title: "动态 · 开发者", note: "蓝海领域" },
      bottomLeft: {
        title: "静态 · 设计师",
        note: "Figma Make、Anima、Galileo",
      },
      bottomRight: { title: "动态 · 设计师", note: "主要为动效/原型工具" },
    },
    readChart: "解读图表",
    readChartDesc:
      "X 轴：工具对流程的理解程度。Y 轴：输出服务于谁——设计师（线框图）还是开发者（生产代码）。",
    competitors: {
      "figma-make": "Figma → 代码，设计师优先",
      anima: "Figma 插件，设计交接",
      galileo: "提示词 → UI 线框图",
      uizard: "草图 / 线框图 → 模型",
      locofy: "Figma → React/Tailwind",
      builder: "Visual Copilot，无头 CMS",
      v0: "提示词 + 截图 → 应用",
      bolt: "从提示词生成全栈应用",
      lovable: "从提示词生成全栈应用",
      same: "像素级克隆现有网站",
      pixelforge: "录制 → 交互式原型",
    },
  },

  // Comparison Table
  comparison: {
    label: "正面对比",
    heading: "当今其他工具做不到的事",
    capability: "能力",
    rows: {
      "screenshot-static": "截图 → 静态页面",
      "production-react": "生产级 React + Tailwind",
      "recording-multi-state": "录制 → 多状态 UI",
      "inferred-state-machine": "推断状态机",
      "editable-transition-timeline": "可编辑的过渡时间轴",
      "optimistic-async-preserved": "保留乐观 / 异步状态",
      "per-state-regenerate": "按状态重新生成",
    },
    tools: ["v0", "Locofy", "Same.dev", "Figma Make", "PixelForge"],
  },

  // Waitlist
  waitlist: {
    badge: "内测阶段 · 2026 年 Q2",
    heading: "抢先一步，助力塑造流程捕获。",
    description:
      "我们将亲自引导首批 200 个团队加入。您将获得早期访问权限、创始人级支持和终身专业版定价。",
    emailPlaceholder: "your@company.com",
    cta: "申请访问",
    joining: "加入中...",
    roleLabel: "我是",
    roles: ["前端工程师", "设计师", "创业者", "产品经理", "其他"],
    success: "您已在候补名单上。",
    successNote: "我们会在一周内与您联系。",
    error: "加入失败，请重试。",
    alreadyJoined: "出错了，请稍后再试。",
    noSpam: "无垃圾邮件",
    unsubscribe: "可随时取消订阅",
    lifetimePricing: "已加入团队保留终身定价",
  },

  // FAQ
  faq: {
    label: "常见问题",
    heading: "大家都会问的问题",
    items: [
      {
        q: "这与 v0、Bolt 或 Lovable 有什么不同？",
        a: "这些工具通过提示词或截图一次性生成单个页面或完整应用。PixelForge 则处理视频——这意味着我们拥有其他工具没有的时间信号。我们从录制中提取隐含的状态机，因此输出天生就是可交互的。它们做的是界面帧，而我们做的是流程。",
      },
      {
        q: "为什么用录制而不是 Figma 文件？",
        a: "Figma 描述的是静态布局，录制则描述的是行为。一段 5 秒钟的使用操作视频，包含的信息量远超 50 个 Figma 帧拼接在一起。而且录制操作简单得多——你不需要设计师参与其中。",
      },
      {
        q: "哪种录制效果最好？",
        a: "5-90 秒的单一用户操作流程片段，缩放比例一致，无叠加元素。目前我们处理 Web 应用效果最好。原生 iOS/Android、内部工具和 Loom 风格的录制都在路线图上。",
      },
      {
        q: "生成的代码可以直接用于生产吗？",
        a: "我们的目标是肯定的——类型化的 React、合理的状态管理、可访问的标记、Tailwind 工具类，以及录制所暗示的加载/错误/空状态。您仍然需要接入真实的 API 并进行审查，但不必从头重写。",
      },
      {
        q: "那 Frame Reforge（Module A）是做什么的？",
        a: "它是为流程捕获提供底层支持的截图转页面引擎。我们将其作为独立模块开放，因为有时你确实只需要快速得到一个页面。这是基本功——流程捕获才是真正的差异化优势。",
      },
      {
        q: "我什么时候可以试用？",
        a: "内测将于 2026 年 Q2 启动。注册候补名单，我们将亲自引导首批 200 个团队。随后将公开发布。",
      },
    ],
  },

  // Footer
  footer: {
    description:
      "录制 → 交互式原型。首个理解流程而非仅仅理解界面的设计转代码工具。",
    product: "产品",
    company: "公司",
    resources: "资源",
    flowCapture: "流程捕获",
    howItWorks: "工作原理",
    landscape: "行业格局",
    prd: "PRD",
    waitlist: "候补名单",
    changelog: "更新日志",
    contact: "联系我们",
    docs: "文档",
    blog: "博客",
    twitter: "Twitter / X",
  },
};

export default zh;
