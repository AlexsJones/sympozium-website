import { useState, useEffect } from 'react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AGENT_ICONS = [
  // Researcher — crosshair/search
  <svg key="r" className="w-7 h-7 mx-auto" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
    <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="10" width="4" height="4" fill="currentColor" />
  </svg>,
  // Writer — pen/edit
  <svg key="w" className="w-7 h-7 mx-auto" viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 17L17 5l2 2L7 19H5v-2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="15" y="5" width="4" height="4" transform="rotate(-45 17 5)" fill="currentColor" />
  </svg>,
  // Reviewer — eye/inspect
  <svg key="v" className="w-7 h-7 mx-auto" viewBox="0 0 24 24" fill="none">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="6" height="6" fill="currentColor" />
  </svg>,
]

const AGENTS = [
  { name: 'Researcher', color: 'kube-blue', trustGroup: 'core' },
  { name: 'Writer', color: 'claw-orange', trustGroup: 'core' },
  { name: 'Reviewer', color: 'claw-purple', trustGroup: 'review' },
]

interface AnimStep {
  from: number
  to: number
  label: string
  tag: string            // visibility tag on the pill
  outcome: 'pass' | 'block' | 'decay'
  layer: number          // which LAYER index highlights
  caption: string
}

const STEPS: AnimStep[] = [
  {
    from: 0, to: 1, label: 'findings', tag: 'public',
    outcome: 'pass', layer: 0,
    caption: 'Public entry passes freely to all agents',
  },
  {
    from: 1, to: 0, label: 'draft v2', tag: 'trusted',
    outcome: 'pass', layer: 1,
    caption: 'Trusted entry shared within the same trust group',
  },
  {
    from: 0, to: 2, label: 'credentials', tag: 'private',
    outcome: 'block', layer: 0,
    caption: 'Private entry blocked by the membrane',
  },
  {
    from: 2, to: 0, label: 'feedback', tag: 'trusted',
    outcome: 'block', layer: 1,
    caption: 'Cross-group trusted entry rejected',
  },
  {
    from: -1, to: -1, label: '', tag: 'budget',
    outcome: 'block', layer: 2,
    caption: 'Token budget nearing cap \u2014 new runs paused',
  },
  {
    from: -1, to: -1, label: '', tag: 'breaker',
    outcome: 'block', layer: 3,
    caption: 'Circuit breaker trips after 3 consecutive failures',
  },
  {
    from: 0, to: 1, label: 'old notes', tag: 'public',
    outcome: 'decay', layer: 4,
    caption: 'Stale entry faded out by time decay',
  },
]

const LAYERS = [
  {
    title: 'Permeability',
    desc: 'Tag entries as public, trusted, or private. Each agent sees only what its clearance allows.',
    color: 'claw-cyan',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Filter / funnel — angular */}
        <path d="M2 3h16l-5 6v6l-2 2v-8L2 3z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    snippet: 'defaultVisibility: trusted',
  },
  {
    title: 'Trust Groups',
    desc: 'Named groups of agents that share trusted entries. Cross-group access is denied by default.',
    color: 'claw-purple',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Three linked squares */}
        <rect x="1" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="7" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="9.5" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="13" y1="9.5" x2="14" y2="9.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="9" width="1.5" height="1.5" fill="currentColor" />
        <rect x="10" y="9" width="1.5" height="1.5" fill="currentColor" />
        <rect x="16" y="9" width="1.5" height="1.5" fill="currentColor" />
      </svg>
    ),
    snippet: 'core: [researcher, writer]',
  },
  {
    title: 'Token Budget',
    desc: 'Set a total token ceiling for the ensemble. The membrane halts new runs before the budget blows out.',
    color: 'claw-orange',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Meter / gauge */}
        <rect x="2" y="4" width="16" height="12" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="8" width="3" height="6" fill="currentColor" />
        <rect x="8.5" y="6" width="3" height="8" fill="currentColor" opacity="0.6" />
        <rect x="13" y="10" width="3" height="4" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    snippet: 'maxTokens: 50000',
  },
  {
    title: 'Circuit Breaker',
    desc: 'If delegation keeps failing, the membrane trips and stops cascading failures automatically.',
    color: 'claw-red',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Lightning bolt / break */}
        <path d="M11 2L5 10h4l-2 8 8-10h-5l3-6z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    snippet: 'consecutiveFailures: 3',
  },
  {
    title: 'Time Decay',
    desc: 'Old memory entries fade from search results over time. Recent knowledge is prioritised automatically.',
    color: 'kube-blue',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Clock — square */}
        <rect x="2" y="2" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="5" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    snippet: 'ttl: "168h"',
  },
  {
    title: 'Provenance',
    desc: 'Every entry records who created it and what it derived from. Full attribution chains for auditability.',
    color: 'claw-green',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        {/* Chain / link */}
        <rect x="2" y="6" width="6" height="8" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="6" width="6" height="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="9" width="2" height="2" fill="currentColor" />
        <rect x="14" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    snippet: 'provenance: enabled',
  },
]

const colorClasses: Record<string, {
  bg: string; border: string; text: string; glow: string; dot: string; ring: string
  hoverBorder: string; gradientBar: string
}> = {
  'kube-blue': {
    bg: 'bg-kube-blue/10', border: 'border-kube-blue/40', text: 'text-kube-blue',
    glow: 'shadow-[0_0_24px_rgba(50,108,229,0.4)]', dot: 'bg-kube-blue', ring: 'ring-kube-blue/30',
    hoverBorder: 'hover:border-kube-blue/20', gradientBar: 'from-kube-blue',
  },
  'claw-orange': {
    bg: 'bg-claw-orange/10', border: 'border-claw-orange/40', text: 'text-claw-orange',
    glow: 'shadow-[0_0_24px_rgba(249,115,22,0.4)]', dot: 'bg-claw-orange', ring: 'ring-claw-orange/30',
    hoverBorder: 'hover:border-claw-orange/20', gradientBar: 'from-claw-orange',
  },
  'claw-cyan': {
    bg: 'bg-claw-cyan/10', border: 'border-claw-cyan/40', text: 'text-claw-cyan',
    glow: 'shadow-[0_0_24px_rgba(6,182,212,0.4)]', dot: 'bg-claw-cyan', ring: 'ring-claw-cyan/30',
    hoverBorder: 'hover:border-claw-cyan/20', gradientBar: 'from-claw-cyan',
  },
  'claw-purple': {
    bg: 'bg-claw-purple/10', border: 'border-claw-purple/40', text: 'text-claw-purple',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.4)]', dot: 'bg-claw-purple', ring: 'ring-claw-purple/30',
    hoverBorder: 'hover:border-claw-purple/20', gradientBar: 'from-claw-purple',
  },
  'claw-green': {
    bg: 'bg-claw-green/10', border: 'border-claw-green/40', text: 'text-claw-green',
    glow: 'shadow-[0_0_24px_rgba(16,185,129,0.4)]', dot: 'bg-claw-green', ring: 'ring-claw-green/30',
    hoverBorder: 'hover:border-claw-green/20', gradientBar: 'from-claw-green',
  },
  'claw-red': {
    bg: 'bg-claw-red/10', border: 'border-claw-red/40', text: 'text-claw-red',
    glow: 'shadow-[0_0_24px_rgba(239,68,68,0.4)]', dot: 'bg-claw-red', ring: 'ring-claw-red/30',
    hoverBorder: 'hover:border-claw-red/20', gradientBar: 'from-claw-red',
  },
}

// ---------------------------------------------------------------------------
// Animation hook
// ---------------------------------------------------------------------------

function useMembraneAnimation() {
  const [step, setStep] = useState(-1)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    let s = -1
    const interval = setInterval(() => {
      s++
      if (s >= STEPS.length) {
        setTimeout(() => {
          setStep(-1)
          setCycle((c) => c + 1)
        }, 2000)
        clearInterval(interval)
        return
      }
      setStep(s)
    }, 1800)
    return () => clearInterval(interval)
  }, [cycle])

  return { step }
}

// ---------------------------------------------------------------------------
// Pill badge colors
// ---------------------------------------------------------------------------

function tagColor(tag: string) {
  switch (tag) {
    case 'public': return 'bg-claw-green/20 text-claw-green border-claw-green/30'
    case 'trusted': return 'bg-claw-cyan/20 text-claw-cyan border-claw-cyan/30'
    case 'private': return 'bg-claw-red/20 text-claw-red border-claw-red/30'
    default: return 'bg-white/10 text-slate-400 border-white/10'
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Membrane() {
  const { step } = useMembraneAnimation()
  const currentStep = step >= 0 && step < STEPS.length ? STEPS[step] : null
  const activeLayer = currentStep ? currentStep.layer : -1

  // Budget animation state
  const budgetPct = step >= 4 ? 92 : step === 3 ? 78 : step === 2 ? 55 : step === 1 ? 32 : step === 0 ? 15 : 0
  const budgetWarning = step >= 3

  // Circuit breaker state
  const breakerTripped = step >= 5

  return (
    <section id="membrane" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-claw-cyan/8 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-claw-purple/6 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-cyan/10 border border-claw-cyan/20 text-claw-cyan text-sm font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              <rect x="6" y="6" width="4" height="4" fill="currentColor" />
            </svg>
            Synthetic Membrane
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Selective permeability for{' '}
            <br />
            <span className="bg-gradient-to-r from-claw-cyan to-claw-purple bg-clip-text text-transparent">
              agent teams
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Agents in a team can now control what they share with each other.
            Think of it like putting a cell membrane around your agent team &mdash;
            things pass through selectively, not indiscriminately.
          </p>
        </div>

        {/* Main visualization + layer sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
          {/* Visualization panel */}
          <div className="lg:col-span-2 relative rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-sm overflow-hidden">
            {/* Subtle dot grid */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            <div className="relative p-6 sm:p-10">
              {/* Membrane boundary */}
              <div className={`
                relative rounded-2xl border-2 border-dashed transition-all duration-700 p-6 sm:p-8
                ${breakerTripped
                  ? 'border-claw-red/50 shadow-[0_0_32px_rgba(239,68,68,0.15)]'
                  : 'border-claw-cyan/30'
                }
              `}>
                {/* Membrane label */}
                <div className="absolute -top-3 left-6">
                  <span className={`
                    px-3 py-0.5 rounded-full text-xs font-mono transition-colors duration-500
                    ${breakerTripped
                      ? 'bg-claw-red/20 text-claw-red border border-claw-red/30'
                      : 'bg-claw-cyan/10 text-claw-cyan/70 border border-claw-cyan/20'
                    }
                  `}>
                    {breakerTripped ? 'membrane: tripped' : 'membrane: active'}
                  </span>
                </div>

                {/* Agent nodes row */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
                  {AGENTS.map((agent, i) => {
                    const c = colorClasses[agent.color]
                    const isSource = currentStep?.from === i
                    const isTarget = currentStep?.to === i
                    const isActive = isSource || isTarget

                    return (
                      <div
                        key={agent.name}
                        className={`
                          relative rounded-xl border px-3 py-4 sm:px-5 sm:py-5 text-center transition-all duration-500
                          ${isActive
                            ? `${c.bg} ${c.border} ${c.glow}`
                            : 'bg-white/[0.02] border-white/5'
                          }
                        `}
                      >
                        <div className={`mb-2 transition-colors duration-500 ${isActive ? c.text : 'text-slate-400'}`}>{AGENT_ICONS[i]}</div>
                        <div className={`text-sm font-bold transition-colors duration-500 ${isActive ? c.text : 'text-white'}`}>
                          {agent.name}
                        </div>
                        <div className="mt-2">
                          <span className={`
                            inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono transition-all duration-500
                            ${isActive ? `${c.bg} ${c.text}` : 'bg-white/5 text-slate-500'}
                          `}>
                            {agent.trustGroup}
                          </span>
                        </div>
                        {/* Active indicator dot */}
                        <div className="absolute top-2 right-2">
                          <div className={`
                            w-2 h-2 rounded-full transition-colors duration-500
                            ${isSource ? colorClasses[agent.color].dot : isTarget ? (currentStep?.outcome === 'pass' ? 'bg-claw-green' : currentStep?.outcome === 'block' ? 'bg-claw-red' : 'bg-slate-500') : 'bg-slate-600'}
                          `} />
                          {isSource && (
                            <div className={`absolute inset-0 w-2 h-2 rounded-full ${colorClasses[agent.color].dot} animate-ping opacity-40`} />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Animated pill / event area */}
                <div className="relative h-16 flex items-center justify-center">
                  {/* Memory pill — shown for entry-based steps */}
                  {currentStep && currentStep.from >= 0 && (
                    <div className={`
                      inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono
                      transition-all duration-700
                      ${currentStep.outcome === 'pass'
                        ? tagColor(currentStep.tag)
                        : currentStep.outcome === 'block'
                          ? 'bg-claw-red/20 text-claw-red border-claw-red/30 line-through'
                          : 'bg-white/5 text-slate-500 border-white/10 opacity-30'
                      }
                    `}>
                      {currentStep.outcome === 'pass' && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {currentStep.outcome === 'block' && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      {currentStep.outcome === 'decay' && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span>{currentStep.label}</span>
                      <span className={`
                        px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider
                        ${tagColor(currentStep.tag)}
                      `}>
                        {currentStep.tag}
                      </span>
                      {/* Arrow showing direction */}
                      <span className="text-slate-500 text-[10px]">
                        {AGENTS[currentStep.from]?.name} &rarr; {AGENTS[currentStep.to]?.name}
                      </span>
                    </div>
                  )}

                  {/* Token budget indicator — shown for budget step */}
                  {step === 4 && (
                    <div className="flex items-center gap-4 w-full max-w-sm">
                      <span className="text-xs font-mono text-claw-orange shrink-0">tokens</span>
                      <div className="flex-1 h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            budgetWarning ? 'bg-claw-orange' : 'bg-claw-cyan'
                          }`}
                          style={{ width: `${budgetPct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-mono transition-colors duration-500 ${budgetWarning ? 'text-claw-orange' : 'text-slate-400'}`}>
                        {budgetPct}%
                      </span>
                    </div>
                  )}

                  {/* Circuit breaker — shown for breaker step */}
                  {step === 5 && (
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <div key={n} className="w-6 h-6 rounded-md bg-claw-red/20 border border-claw-red/40 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-claw-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-mono text-claw-red">
                        <span className="w-1.5 h-1.5 rounded-full bg-claw-red inline-block animate-pulse mr-1" />
                        breaker open
                      </span>
                    </div>
                  )}

                  {/* Idle state */}
                  {step < 0 && (
                    <span className="text-xs font-mono text-slate-500">membrane monitoring&hellip;</span>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <p className={`text-sm font-mono transition-all duration-500 ${
                  currentStep ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {currentStep?.caption || 'Observing shared memory traffic'}
                </p>
              </div>
            </div>
          </div>

          {/* Layer sidebar */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 px-1">
              Active Layer
            </div>
            {LAYERS.map((layer, i) => {
              const c = colorClasses[layer.color]
              const isActive = activeLayer === i
              return (
                <div
                  key={layer.title}
                  className={`
                    rounded-xl border px-4 py-3 transition-all duration-500
                    ${isActive
                      ? `${c.bg} ${c.border} ${c.glow}`
                      : 'bg-white/[0.02] border-white/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`shrink-0 transition-colors duration-500 ${isActive ? c.text : 'text-slate-500'}`}>
                      {layer.icon}
                    </div>
                    <div>
                      <div className={`text-sm font-bold transition-colors duration-500 ${isActive ? c.text : 'text-slate-400'}`}>
                        {layer.title}
                      </div>
                      {isActive && (
                        <div className="text-xs text-slate-400 mt-0.5">{layer.desc}</div>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
                        <span className={c.text}>{layer.snippet}</span>
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Paper link */}
        <div className="text-center">
          <a
            href="https://zenodo.org/records/15510783"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-claw-cyan transition-colors"
          >
            Read the synthetic membrane paper
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
