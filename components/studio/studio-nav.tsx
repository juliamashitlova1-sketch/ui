'use client'
import Link from 'next/link'
import { Flame, ArrowLeft } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'

export function StudioNav({ projectName }: { projectName?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/studio" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30">
              <Flame className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-tight">PixelForge</span>
          </Link>
          {projectName && (
            <>
              <span className="text-border">/</span>
              <span className="text-xs text-muted-foreground truncate max-w-[200px]">{projectName}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            Landing
          </Link>
        </div>
      </div>
    </header>
  )
}
