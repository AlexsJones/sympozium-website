import { useState, useEffect } from 'react'

// ---------------------------------------------------------------------------
// Model deploy pipeline
// ---------------------------------------------------------------------------

const PIPELINE_STEPS = [
  {
    label: 'kubectl apply',
    sub: 'Model CRD submitted',
    icon: '$ ',
    color: 'kube-blue',
  },
  {
    label: 'Download GGUF',
    sub: 'HuggingFace \u2192 Init Container',
    icon: '\u2B07',
    color: 'claw-orange',
  },
  {
    label: 'Create PVC',
    sub: 'Persistent model storage',
    icon: '\uD83D\uDCBE',
    color: 'claw-cyan',
  },
  {
    label: 'llama-server',
    sub: 'Deployment created',
    icon: '\uD83E\uDDE0',
    color: 'claw-purple',
  },
  {
    label: 'ClusterIP Service',
    sub: 'Internal endpoint ready',
    icon: '\uD83C\uDF10',
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

// ---------------------------------------------------------------------------
// Density node data for the visualization
// ---------------------------------------------------------------------------

interface DensityNode {
  name: string
  gpu: string
  ram: string
  backend: string
  modelCount: number
  topScore: number
  stale: boolean
}

const DENSITY_NODES: DensityNode[] = [
  { name: 'gpu-node-01', gpu: 'A100 80GB', ram: '256 GB', backend: 'CUDA', modelCount: 14, topScore: 98, stale: false },
  { name: 'gpu-node-02', gpu: 'RTX 4090', ram: '128 GB', backend: 'CUDA', modelCount: 11, topScore: 85, stale: false },
  { name: 'mac-mini-01', gpu: 'M4 Pro 24GB', ram: '64 GB', backend: 'Metal', modelCount: 8, topScore: 72, stale: false },
  { name: 'cpu-node-01', gpu: '\u2014', ram: '32 GB', backend: 'CPU', modelCount: 3, topScore: 41, stale: true },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

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
            no API keys, no external calls, full data sovereignty. Placement is claimed, not
            decided here: with llmfit-dra installed, the stock scheduler puts each model on
            silicon that can actually run it.
          </p>
        </div>

        {/* Main content: YAML + animated pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
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
                  <span className="text-slate-500">  </span><span className="text-slate-500"># Let the density scheduler pick the best node</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-kube-blue">placement:</span><span className="text-claw-cyan"> auto</span>{'\n'}
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
                  {activeStep >= PIPELINE_STEPS.length ? '\u2705' : '\uD83D\uDD12'}
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

        {/* ================================================================= */}
        {/* Cluster Model Density */}
        {/* ================================================================= */}

        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-cyan/10 border border-claw-cyan/20 text-claw-cyan text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              Cluster Model Density
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Know where every model{' '}
              <span className="bg-gradient-to-r from-claw-cyan to-kube-blue bg-clip-text text-transparent">
                fits best
              </span>
            </h3>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              The built-in <span className="text-white font-medium">llmfit DaemonSet</span> continuously
              profiles every node's hardware — GPU VRAM, RAM, CPU, backend capabilities.
              The controller uses this to place models instantly instead of spawning probe pods.
            </p>
          </div>

          {/* Before/after callout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-claw-red/5 border border-claw-red/20">
              <svg className="w-5 h-5 text-claw-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs font-mono text-claw-red/70 uppercase tracking-wider">Before</div>
                <div className="text-white font-bold">~3 min</div>
                <div className="text-xs text-slate-500">probe-pod scheduling</div>
              </div>
            </div>
            <svg className="w-8 h-8 text-slate-600 shrink-0 rotate-90 sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-claw-green/5 border border-claw-green/20">
              <svg className="w-5 h-5 text-claw-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <div>
                <div className="text-xs font-mono text-claw-green/70 uppercase tracking-wider">Now</div>
                <div className="text-white font-bold">Instant</div>
                <div className="text-xs text-slate-500">density cache lookup</div>
              </div>
            </div>
          </div>

          {/* Density node cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {DENSITY_NODES.map((node) => {
              const scoreColor =
                node.topScore >= 80 ? 'text-claw-green' :
                node.topScore >= 60 ? 'text-claw-cyan' :
                node.topScore >= 40 ? 'text-claw-orange' :
                'text-claw-red'
              const barColor =
                node.topScore >= 80 ? 'bg-claw-green' :
                node.topScore >= 60 ? 'bg-claw-cyan' :
                node.topScore >= 40 ? 'bg-claw-orange' :
                'bg-claw-red'

              return (
                <div
                  key={node.name}
                  className={`
                    rounded-xl border p-5 transition-all duration-300
                    ${node.stale
                      ? 'bg-white/[0.01] border-white/5 opacity-60'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-slate-500 truncate">{node.name}</span>
                    {node.stale && (
                      <span className="text-[10px] font-mono text-claw-orange px-1.5 py-0.5 rounded bg-claw-orange/10 border border-claw-orange/20">
                        stale
                      </span>
                    )}
                  </div>

                  {/* Score bar */}
                  <div className="mb-3">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-slate-500">fitness</span>
                      <span className={`text-lg font-bold ${scoreColor}`}>{node.topScore}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-700`}
                        style={{ width: `${node.topScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">GPU</span>
                      <span className="text-slate-300 font-mono">{node.gpu}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">RAM</span>
                      <span className="text-slate-300 font-mono">{node.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Backend</span>
                      <span className="text-slate-300 font-mono">{node.backend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Models fit</span>
                      <span className="text-white font-bold">{node.modelCount}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Density feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-claw-cyan to-transparent" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-claw-cyan">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <h4 className="text-base font-bold text-white">GPU-Aware Scheduling</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Composite scoring ranks nodes by VRAM, backend preference (CUDA, Metal, ROCm), estimated TPS, and available memory.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-claw-purple to-transparent" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-claw-purple">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.659 13.84A2.25 2.25 0 005 15.432v2.318a2.25 2.25 0 002.25 2.25h9.5A2.25 2.25 0 0019 17.75v-2.318a2.25 2.25 0 00-.659-1.591l-3.432-3.432a2.25 2.25 0 01-.659-1.591V3.104" />
                    </svg>
                  </span>
                  <h4 className="text-base font-bold text-white">Simulate Before Deploy</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Preview capacity impact per node before deploying. The <code className="text-claw-purple/80">density/simulate</code> API shows remaining memory and ranked placements.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-claw-green to-transparent" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-claw-green">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                  </span>
                  <h4 className="text-base font-bold text-white">Live Eviction</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  When a node's fitness degrades past a threshold, the controller automatically re-places affected models onto healthier nodes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlights — original cards */}
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

          {/* Cost Attribution */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-orange to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-orange">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <h4 className="text-base font-bold text-white">Cost Attribution</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Per-model, per-namespace resource attribution via the density API. Know exactly what each model costs across GPU, memory, and compute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
