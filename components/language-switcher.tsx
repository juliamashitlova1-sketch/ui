'use client'

import { useI18n } from '@/lib/i18n/context'
import type { Language } from '@/lib/i18n/types'
import { Languages } from 'lucide-react'

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
]

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/40 px-2 py-1">
      <Languages className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={l.label}
          className={`font-mono text-[11px] transition-colors px-1.5 py-0.5 rounded ${
            lang === l.code
              ? 'bg-primary/15 text-primary font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
