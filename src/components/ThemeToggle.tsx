import { useState, useEffect, useRef } from 'react'

const themes = [
  {
    id: 'industrial',
    name: 'Neo Industrial',
    description: 'Black, cream & orange',
    swatch: ['#1a1a18', '#eae6de', '#e8562a'],
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Indigo & Orange',
    swatch: ['#6366f1', '#f97316'],
  },
  {
    id: 'jade',
    name: 'Obsidian & Jade',
    description: 'Organic-inspired',
    swatch: ['#3dd68c', '#d4a537'],
  },
  {
    id: 'teal',
    name: 'Graphite & Teal',
    description: 'Network-inspired',
    swatch: ['#2dd4bf', '#a78bfa'],
  },
  {
    id: 'phosphor',
    name: 'Carbon & Phosphor',
    description: 'Infrastructure-inspired',
    swatch: ['#22c55e', '#7dd3fc'],
  },
] as const

export default function ThemeToggle() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('industrial')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('sympozium-theme') || 'industrial'
    setActive(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectTheme = (id: string) => {
    setActive(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem('sympozium-theme', id)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
        title="Switch theme"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-surface-light border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Theme Preview</p>
          </div>
          <div className="p-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                  active === theme.id
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex gap-1">
                  {theme.swatch.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">{theme.name}</p>
                  <p className="text-xs text-slate-400">{theme.description}</p>
                </div>
                {active === theme.id && (
                  <svg className="w-4 h-4 ml-auto text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
