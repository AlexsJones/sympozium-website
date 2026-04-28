import { useState, useEffect } from 'react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AGENTS = [
  { name: 'Researcher', icon: '\u{1F50D}', color: 'kube-blue', trustGroup: 'core' },
  { name: 'Writer', icon: '\u{270D}\u{FE0F}', color: 'claw-orange', trustGroup: 'core' },
  { name: 'Reviewer', icon: '\u{1F441}\u{FE0F}', color: 'claw-purple', trustGroup: 'review' },
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
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
      </svg>
    ),
    snippet: 'defaultVisibility: trusted',
  },
  {
    title: 'Trust Groups',
    desc: 'Named groups of agents that share trusted entries. Cross-group access is denied by default.',
    color: 'claw-purple',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    snippet: 'core: [researcher, writer]',
  },
  {
    title: 'Token Budget',
    desc: 'Set a total token ceiling for the ensemble. The membrane halts new runs before the budget blows out.',
    color: 'claw-orange',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    snippet: 'maxTokens: 50000',
  },
  {
    title: 'Circuit Breaker',
    desc: 'If delegation keeps failing, the membrane trips and stops cascading failures automatically.',
    color: 'claw-red',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />
      </svg>
    ),
    snippet: 'consecutiveFailures: 3',
  },
  {
    title: 'Time Decay',
    desc: 'Old memory entries fade from search results over time. Recent knowledge is prioritised automatically.',
    color: 'kube-blue',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    snippet: 'ttl: "168h"',
  },
  {
    title: 'Provenance',
    desc: 'Every entry records who created it and what it derived from. Full attribution chains for auditability.',
    color: 'claw-green',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a48.667 48.667 0 00-1.232 8.568M12 2.25A2.25 2.25 0 009.75 4.5v.75a2.25 2.25 0 001.5 2.122M12 2.25A2.25 2.25 0 0114.25 4.5v.75a2.25 2.25 0 01-1.5 2.122m-1.5-2.872V4.5m0 0a2.25 2.25 0 002.25 2.25M12 4.5a2.25 2.25 0 01-2.25 2.25" />
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
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
                        <div className="text-2xl mb-2">{agent.icon}</div>
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

        {/* Six-layer feature cards */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Six layers of{' '}
            <span className="bg-gradient-to-r from-claw-cyan to-claw-green bg-clip-text text-transparent">
              selective control
            </span>
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto text-center mb-10">
            Each layer is optional and composable. Enable only what you need &mdash; the membrane is entirely backward-compatible with plain shared memory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAYERS.map((layer) => {
              const c = colorClasses[layer.color]
              return (
                <div
                  key={layer.title}
                  className={`rounded-2xl bg-surface-light/30 border border-white/5 ${c.hoverBorder} transition-all duration-300 overflow-hidden`}
                >
                  <div className={`h-1 bg-gradient-to-r ${c.gradientBar} to-transparent`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={c.text}>
                        {layer.icon}
                      </span>
                      <h4 className="text-base font-bold text-white">{layer.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                      {layer.desc}
                    </p>
                    <div className="rounded-lg bg-surface/60 border border-white/5 px-3 py-2">
                      <code className={`text-xs font-mono ${c.text}`}>{layer.snippet}</code>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Full YAML config */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-claw-cyan/20 via-claw-purple/15 to-claw-green/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
          <div className="relative rounded-2xl border border-white/10 bg-surface/90 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-claw-red/60" />
                <div className="w-3 h-3 rounded-full bg-claw-orange/60" />
                <div className="w-3 h-3 rounded-full bg-claw-green/60" />
              </div>
              <span className="text-xs font-mono text-slate-500 ml-2">ensemble-membrane.yaml</span>
            </div>
            <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                <span className="text-kube-blue">apiVersion:</span><span className="text-slate-300"> sympozium.ai/v1alpha1</span>{'\n'}
                <span className="text-kube-blue">kind:</span><span className="text-claw-purple"> Ensemble</span>{'\n'}
                <span className="text-kube-blue">metadata:</span>{'\n'}
                <span className="text-slate-500">  </span><span className="text-kube-blue">name:</span><span className="text-claw-orange"> research-team</span>{'\n'}
                <span className="text-kube-blue">spec:</span>{'\n'}
                <span className="text-slate-500">  </span><span className="text-kube-blue">sharedMemory:</span>{'\n'}
                <span className="text-slate-500">    </span><span className="text-kube-blue">enabled:</span><span className="text-claw-green"> true</span>{'\n'}
                <span className="text-slate-500">    </span><span className="text-kube-blue">membrane:</span>{'\n'}
                {'\n'}
                <span className="text-slate-500">      </span><span className="text-slate-500"># Visibility &amp; tag filtering</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">defaultVisibility:</span><span className="text-claw-cyan"> public</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">permeability:</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">- agentConfig:</span><span className="text-claw-orange"> researcher</span>{'\n'}
                <span className="text-slate-500">          </span><span className="text-kube-blue">defaultVisibility:</span><span className="text-claw-cyan"> trusted</span>{'\n'}
                <span className="text-slate-500">          </span><span className="text-kube-blue">exposeTags:</span><span className="text-slate-300"> ["findings", "data"]</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">- agentConfig:</span><span className="text-claw-orange"> reviewer</span>{'\n'}
                <span className="text-slate-500">          </span><span className="text-kube-blue">defaultVisibility:</span><span className="text-claw-cyan"> private</span>{'\n'}
                {'\n'}
                <span className="text-slate-500">      </span><span className="text-slate-500"># Named trust boundaries</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">trustGroups:</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">- name:</span><span className="text-claw-purple"> core</span>{'\n'}
                <span className="text-slate-500">          </span><span className="text-kube-blue">agentConfigs:</span><span className="text-slate-300"> ["researcher", "writer"]</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">- name:</span><span className="text-claw-purple"> editorial</span>{'\n'}
                <span className="text-slate-500">          </span><span className="text-kube-blue">agentConfigs:</span><span className="text-slate-300"> ["writer", "reviewer"]</span>{'\n'}
                {'\n'}
                <span className="text-slate-500">      </span><span className="text-slate-500"># Cost ceiling</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">tokenBudget:</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">maxTokens:</span><span className="text-claw-orange"> 100000</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">action:</span><span className="text-claw-green"> halt</span>{'\n'}
                {'\n'}
                <span className="text-slate-500">      </span><span className="text-slate-500"># Failure isolation</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">circuitBreaker:</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">consecutiveFailures:</span><span className="text-claw-red"> 3</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">cooldownDuration:</span><span className="text-claw-orange"> "10m"</span>{'\n'}
                {'\n'}
                <span className="text-slate-500">      </span><span className="text-slate-500"># Knowledge freshness</span>{'\n'}
                <span className="text-slate-500">      </span><span className="text-kube-blue">timeDecay:</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">ttl:</span><span className="text-claw-cyan"> "168h"</span>{'\n'}
                <span className="text-slate-500">        </span><span className="text-kube-blue">decayFunction:</span><span className="text-claw-cyan"> linear</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
