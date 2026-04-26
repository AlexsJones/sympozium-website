import { useState, useEffect } from 'react'

const PIPELINE_STEPS = [
  {
    label: 'kubectl apply',
    sub: 'Model CRD submitted',
    icon: '$ ',
    color: 'kube-blue',
  },
  {
    label: 'Download GGUF',
    sub: 'HuggingFace → Init Container',
    icon: '\u{2B07}',
    color: 'claw-orange',
  },
  {
    label: 'Create PVC',
    sub: 'Persistent model storage',
    icon: '\u{1F4BE}',
    color: 'claw-cyan',
  },
  {
    label: 'llama-server',
    sub: 'Deployment created',
    icon: '\u{1F9E0}',
    color: 'claw-purple',
  },
  {
    label: 'ClusterIP Service',
    sub: 'Internal endpoint ready',
    icon: '\u{1F310}',
    color: 'claw-green',
  },
]

const colorClasses: Record<string, {
  bg: string
  border: string
  text: string
  glow: string
  bar: string
  dot: string
  ring: string
}> = {
  'kube-blue': {
    bg: 'bg-kube-blue/10',
    border: 'border-kube-blue/40',
    text: 'text-kube-blue',
    glow: 'shadow-[0_0_24px_rgba(50,108,229,0.4)]',
    bar: 'bg-kube-blue',
    dot: 'bg-kube-blue',
    ring: 'ring-kube-blue/30',
  },
  'claw-orange': {
    bg: 'bg-claw-orange/10',
    border: 'border-claw-orange/40',
    text: 'text-claw-orange',
    glow: 'shadow-[0_0_24px_rgba(249,115,22,0.4)]',
    bar: 'bg-claw-orange',
    dot: 'bg-claw-orange',
    ring: 'ring-claw-orange/30',
  },
  'claw-cyan': {
    bg: 'bg-claw-cyan/10',
    border: 'border-claw-cyan/40',
    text: 'text-claw-cyan',
    glow: 'shadow-[0_0_24px_rgba(6,182,212,0.4)]',
    bar: 'bg-claw-cyan',
    dot: 'bg-claw-cyan',
    ring: 'ring-claw-cyan/30',
  },
  'claw-purple': {
    bg: 'bg-claw-purple/10',
    border: 'border-claw-purple/40',
    text: 'text-claw-purple',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.4)]',
    bar: 'bg-claw-purple',
    dot: 'bg-claw-purple',
    ring: 'ring-claw-purple/30',
  },
  'claw-green': {
    bg: 'bg-claw-green/10',
    border: 'border-claw-green/40',
    text: 'text-claw-green',
    glow: 'shadow-[0_0_24px_rgba(16,185,129,0.4)]',
    bar: 'bg-claw-green',
    dot: 'bg-claw-green',
    ring: 'ring-claw-green/30',
  },
}

export default function LocalInference() {
  const [activeStep, setActiveStep] = useState(-1)
  const [loopCount, setLoopCount] = useState(0)

  // Animate through the pipeline steps in a loop
  useEffect(() => {
    let step = -1
    const interval = setInterval(() => {
      step++
      if (step > PIPELINE_STEPS.length) {
        // Pause at the end showing all green, then restart
        setTimeout(() => {
          setActiveStep(-1)
          setLoopCount((c) => c + 1)
        }, 2000)
        clearInterval(interval)
        return
      }
      setActiveStep(step)
    }, 1200)
    return () => clearInterval(interval)
  }, [loopCount])

  return (
    <section id="local-inference" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-claw-purple/8 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-claw-green/6 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-purple/10 border border-claw-purple/20 text-claw-purple text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
            </svg>
            Local Model Inference
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Run models{' '}
            <span className="bg-gradient-to-r from-claw-purple to-claw-green bg-clip-text text-transparent">
              inside your cluster
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Deploy GGUF models with a single CRD. The controller downloads the model,
            provisions storage, spins up llama-server, and exposes a ClusterIP Service &mdash;
            no API keys, no external calls, full data sovereignty. Enable distributed inference
            across your fleet by deploying models to different nodes and referencing them
            from any agent.
          </p>
        </div>

        {/* Main content: YAML + animated pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          {/* Left: Model CRD YAML */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-claw-purple/20 via-claw-green/15 to-claw-cyan/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
            <div className="relative rounded-2xl border border-white/10 bg-surface/90 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-claw-red/60" />
                  <div className="w-3 h-3 rounded-full bg-claw-orange/60" />
                  <div className="w-3 h-3 rounded-full bg-claw-green/60" />
                </div>
                <span className="text-xs font-mono text-slate-500 ml-2">model-qwen3-8b.yaml</span>
              </div>
              <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-kube-blue">apiVersion:</span><span className="text-slate-300"> sympozium.ai/v1alpha1</span>{'\n'}
                  <span className="text-kube-blue">kind:</span><span className="text-claw-purple"> Model</span>{'\n'}
                  <span className="text-kube-blue">metadata:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">name:</span><span className="text-claw-orange"> qwen3-8b</span>{'\n'}
                  <span className="text-kube-blue">spec:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">preset:</span><span className="text-claw-green"> qwen3-8b</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">resources:</span>{'\n'}
                  <span className="text-slate-500">    </span><span className="text-kube-blue">requests:</span>{'\n'}
                  <span className="text-slate-500">      </span><span className="text-kube-blue">memory:</span><span className="text-claw-orange"> "8Gi"</span>{'\n'}
                  <span className="text-slate-500">      </span><span className="text-kube-blue">cpu:</span><span className="text-claw-orange"> "4"</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">nodeSelector:</span>{'\n'}
                  <span className="text-slate-500">    </span><span className="text-kube-blue">gpu:</span><span className="text-claw-green"> "true"</span>{'\n'}
                  {'\n'}
                  <span className="text-slate-500"># Reference from any AgentRun or Ensemble:</span>{'\n'}
                  <span className="text-kube-blue">spec:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">modelRef:</span><span className="text-claw-purple"> qwen3-8b</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Right: Animated pipeline */}
          <div className="space-y-0">
            {PIPELINE_STEPS.map((step, i) => {
              const c = colorClasses[step.color]
              const isActive = activeStep === i
              const isDone = activeStep > i

              return (
                <div key={i}>
                  {/* Step card */}
                  <div
                    className={`
                      relative flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-500
                      ${isActive
                        ? `${c.bg} ${c.border} ${c.glow}`
                        : isDone
                          ? `bg-claw-green/5 border-claw-green/20`
                          : 'bg-white/[0.02] border-white/5'
                      }
                    `}
                  >
                    {/* Status indicator */}
                    <div className="relative shrink-0">
                      <div
                        className={`
                          w-10 h-10 rounded-xl flex items-center justify-center text-lg
                          transition-all duration-500
                          ${isActive
                            ? `${c.bg} ring-2 ${c.ring}`
                            : isDone
                              ? 'bg-claw-green/10'
                              : 'bg-white/5'
                          }
                        `}
                      >
                        {isDone ? (
                          <svg className="w-5 h-5 text-claw-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className={isActive ? '' : 'opacity-40'}>{step.icon}</span>
                        )}
                      </div>
                      {/* Pulsing ring on active */}
                      {isActive && (
                        <div className={`absolute inset-0 rounded-xl ring-2 ${c.ring} animate-ping opacity-30`} />
                      )}
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div
                        className={`font-bold text-sm transition-colors duration-500 ${
                          isActive ? c.text : isDone ? 'text-claw-green' : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-500 ${
                          isActive ? 'text-slate-300' : isDone ? 'text-slate-500' : 'text-slate-600'
                        }`}
                      >
                        {step.sub}
                      </div>
                    </div>

                    {/* Right badge */}
                    <div className="ml-auto shrink-0">
                      {isActive && (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${c.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
                          reconciling
                        </span>
                      )}
                      {isDone && (
                        <span className="text-xs font-mono text-claw-green/70">done</span>
                      )}
                    </div>
                  </div>

                  {/* Connector line between steps */}
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div
                        className={`w-px h-5 transition-all duration-500 ${
                          isDone ? 'bg-claw-green/40' : isActive ? `${c.bar}/30` : 'bg-white/10'
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Ready state */}
            <div className="mt-4">
              <div
                className={`
                  relative flex items-center gap-4 px-5 py-5 rounded-xl border transition-all duration-700
                  ${activeStep >= PIPELINE_STEPS.length
                    ? 'bg-claw-green/10 border-claw-green/40 shadow-[0_0_32px_rgba(16,185,129,0.3)]'
                    : 'bg-white/[0.02] border-white/5'
                  }
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-xl
                    transition-all duration-700
                    ${activeStep >= PIPELINE_STEPS.length
                      ? 'bg-claw-green/20 ring-2 ring-claw-green/40'
                      : 'bg-white/5 opacity-30'
                    }
                  `}
                >
                  {activeStep >= PIPELINE_STEPS.length ? '\u{2705}' : '\u{1F512}'}
                </div>
                <div>
                  <div
                    className={`font-bold transition-colors duration-700 ${
                      activeStep >= PIPELINE_STEPS.length ? 'text-claw-green' : 'text-slate-600'
                    }`}
                  >
                    Model Ready
                  </div>
                  <div
                    className={`text-sm transition-colors duration-700 ${
                      activeStep >= PIPELINE_STEPS.length ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Agents can now reference via <code className="text-claw-purple">modelRef: qwen3-8b</code>
                  </div>
                </div>
                {activeStep >= PIPELINE_STEPS.length && (
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1.5 text-sm font-mono text-claw-green">
                      <span className="w-2 h-2 rounded-full bg-claw-green animate-pulse" />
                      serving
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Workflow canvas — model feeding the local-inference ensemble */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              The{' '}
              <span className="bg-gradient-to-r from-claw-purple to-claw-cyan bg-clip-text text-transparent">
                local-inference
              </span>{' '}
              Ensemble
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Ships out of the box &mdash; a ready-made agent team that runs entirely on cluster-local models.
              No API keys, no external calls.
            </p>
          </div>

          <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-6 sm:p-10 overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            <div className="relative">
              {/* Model card (top center) */}
              <div className="flex justify-center mb-10">
                <div className="relative group">
                  <div className="absolute -inset-[2px] bg-gradient-to-b from-claw-green/50 to-claw-green/20 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-xl bg-surface-light/80 border border-claw-green/30 backdrop-blur-sm px-8 py-6 min-w-[280px] sm:min-w-[340px]">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6 text-claw-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7" />
                      </svg>
                      <span className="text-xl font-bold text-white">Local Model</span>
                    </div>
                    <div className="text-sm font-mono text-slate-400 mb-3">qwen3-0-6b-q8</div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-claw-green/10 border border-claw-green/30 text-claw-green text-sm font-medium mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-claw-green animate-pulse" />
                      Ready
                    </div>
                    <div className="text-xs font-mono text-slate-500 truncate">
                      http://model-qwen3-0-6b-q8.sympozium...
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection hub dot */}
              <div className="flex justify-center mb-2">
                <div className="w-3 h-3 rounded-full bg-claw-purple/60 ring-4 ring-claw-purple/20" />
              </div>

              {/* Dashed lines visual (CSS-based for reliability) */}
              <div className="flex justify-center mb-2">
                <div className="flex items-end gap-16 sm:gap-32 md:gap-48">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-10 border-l-2 border-dashed border-claw-purple/30" />
                    <svg className="w-3 h-3 text-claw-purple/50" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M6 9L2 4h8L6 9z" />
                    </svg>
                    <div className="w-3 h-3 rounded-full bg-slate-500/40 ring-2 ring-slate-500/20 -mt-0.5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-px h-10 border-l-2 border-dashed border-claw-purple/30" />
                    <svg className="w-3 h-3 text-claw-purple/50" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M6 9L2 4h8L6 9z" />
                    </svg>
                    <div className="w-3 h-3 rounded-full bg-slate-500/40 ring-2 ring-slate-500/20 -mt-0.5" />
                  </div>
                </div>
              </div>

              {/* Agent config cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Local Assistant */}
                <div className="relative group">
                  <div className="absolute -inset-[2px] bg-gradient-to-b from-claw-green/30 to-claw-green/10 rounded-xl opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="relative rounded-xl bg-surface-light/80 border border-claw-green/20 backdrop-blur-sm px-6 py-5">
                    <div className="text-xs font-mono text-slate-500 mb-1.5">local-inference</div>
                    <div className="text-lg font-bold text-white mb-1">Local Assistant</div>
                    <div className="text-sm font-mono text-slate-400 mb-4">assistant</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                        qwen3-0-6b-q8
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-claw-purple/10 border border-claw-purple/20 text-xs font-mono text-claw-purple">
                        memory
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 mt-3">local-inference-assistant</div>
                  </div>
                </div>

                {/* Local Coder */}
                <div className="relative group">
                  <div className="absolute -inset-[2px] bg-gradient-to-b from-claw-green/30 to-claw-green/10 rounded-xl opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="relative rounded-xl bg-surface-light/80 border border-claw-green/20 backdrop-blur-sm px-6 py-5">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="text-xs font-mono text-slate-500">local-inference</div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-claw-green">
                        <span className="w-2 h-2 rounded-full bg-claw-green animate-pulse" />
                        Done
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Local Coder</div>
                    <div className="text-sm font-mono text-slate-400 mb-4">coder</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                        qwen3-0-6b-q8
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-claw-green/10 border border-claw-green/20 text-xs font-mono text-claw-green">
                        software-dev
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-claw-purple/10 border border-claw-purple/20 text-xs font-mono text-claw-purple">
                        memory
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 mt-3">local-inference-coder</div>
                  </div>
                </div>
              </div>

              {/* Delegation label between cards */}
              <div className="hidden md:flex justify-center -mt-[72px] pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-claw-cyan/20 backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5 text-claw-cyan/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  <span className="text-[11px] font-mono text-claw-cyan/70">delegates to</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Sovereignty */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-green to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-green">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </span>
                <h4 className="text-base font-bold text-white">Full Data Sovereignty</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Models run inside your cluster. No tokens leave your network. Deploy in air-gapped environments with pre-loaded PVCs.
              </p>
            </div>
          </div>

          {/* HuggingFace Presets */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-purple to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-purple">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                <h4 className="text-base font-bold text-white">HuggingFace Presets</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Pick from built-in presets &mdash; Qwen3 8B, Phi-3 Mini, and more. Or specify any GGUF model URL. One field, zero config.
              </p>
            </div>
          </div>

          {/* GPU/CPU Targeting */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-cyan to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-cyan">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <h4 className="text-base font-bold text-white">GPU/CPU Targeting</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Use nodeSelector and resource requests to place models on GPU nodes, or run quantized models on CPU-only clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
