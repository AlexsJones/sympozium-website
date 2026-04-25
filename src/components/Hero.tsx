import { useState, useEffect } from 'react'

/* ── Animated cluster visualization ── */

const AGENTS = [
  { name: 'Local Assistant', role: 'assistant', skills: ['memory'], ensemble: 'local-inference' },
  { name: 'Local Coder', role: 'coder', skills: ['software-dev', 'memory'], ensemble: 'local-inference' },
  { name: 'Cluster SRE', role: 'sre', skills: ['kubectl', 'helm'], ensemble: 'devops-essentials' },
]

const NODES = [
  { name: 'node-gpu-01', model: 'qwen3-8b', type: 'GPU' },
  { name: 'node-cpu-02', model: 'phi-3-mini', type: 'CPU' },
]

// Cycles through: idle → agent 0 active → agent 1 active → agent 2 active → all done → restart
function useAgentCycle() {
  const [activeAgent, setActiveAgent] = useState(-1)
  const [activeNode, setActiveNode] = useState(-1)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const steps = [
      // agent 0 → node 0
      () => { setActiveAgent(0); setActiveNode(0) },
      // agent 1 → node 0
      () => { setActiveAgent(1); setActiveNode(0) },
      // agent 2 → node 1
      () => { setActiveAgent(2); setActiveNode(1) },
      // all settle
      () => { setActiveAgent(-2); setActiveNode(-1) },
      // reset
      () => { setActiveAgent(-1); setActiveNode(-1); setCycle(c => c + 1) },
    ]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) { steps[i](); i++ }
      else clearInterval(interval)
    }, 1800)
    return () => clearInterval(interval)
  }, [cycle])

  return { activeAgent, activeNode }
}

function ClusterDemo() {
  const { activeAgent, activeNode } = useAgentCycle()

  return (
    <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-5 sm:p-6 overflow-hidden backdrop-blur-sm">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative">
        {/* Cluster frame */}
        <div className="rounded-xl border border-white/10 bg-surface/50 p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kubernetes Cluster</span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-claw-green">
              <span className="w-1.5 h-1.5 rounded-full bg-claw-green animate-pulse" />
              healthy
            </span>
          </div>

          {/* Nodes with models */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {NODES.map((node, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 transition-all duration-500 ${
                  activeNode === i
                    ? 'border-claw-purple/40 bg-claw-purple/5 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                    activeNode === i ? 'bg-claw-purple animate-pulse' : 'bg-claw-green'
                  }`} />
                  <span className="text-[10px] font-mono text-slate-500 truncate">{node.name}</span>
                  <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    node.type === 'GPU'
                      ? 'bg-claw-orange/10 text-claw-orange'
                      : 'bg-kube-blue/10 text-kube-blue'
                  }`}>{node.type}</span>
                </div>
                {/* Model inside the node */}
                <div className={`rounded-md border px-2.5 py-2 transition-all duration-500 ${
                  activeNode === i
                    ? 'border-claw-green/40 bg-claw-green/5'
                    : 'border-white/10 bg-white/[0.02]'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-claw-purple shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3" />
                    </svg>
                    <span className="text-xs font-mono font-bold text-white truncate">{node.model}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1 h-1 rounded-full bg-claw-green" />
                    <span className="text-[9px] font-mono text-claw-green">Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated inference lines */}
          <div className="flex justify-center mb-3">
            <div className="flex items-center gap-4">
              <div className={`h-px w-12 border-t border-dashed transition-colors duration-500 ${
                activeNode === 0 ? 'border-claw-purple/60' : 'border-white/10'
              }`} />
              <span className={`text-[9px] font-mono transition-colors duration-500 ${
                activeAgent >= 0 ? 'text-claw-purple' : 'text-slate-600'
              }`}>
                {activeAgent >= 0 ? 'inference request' : 'modelRef'}
              </span>
              <div className={`h-px w-12 border-t border-dashed transition-colors duration-500 ${
                activeNode === 1 ? 'border-claw-purple/60' : 'border-white/10'
              }`} />
            </div>
          </div>

          {/* Agent ensemble */}
          <div className="rounded-lg border border-white/10 bg-surface/40 p-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Agent Ensemble</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="space-y-2">
              {AGENTS.map((agent, i) => {
                const isActive = activeAgent === i
                const isDone = activeAgent === -2

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-md border px-3 py-2 transition-all duration-500 ${
                      isActive
                        ? 'border-kube-blue/40 bg-kube-blue/5 shadow-[0_0_16px_rgba(50,108,229,0.12)]'
                        : isDone
                          ? 'border-claw-green/20 bg-claw-green/[0.03]'
                          : 'border-white/5 bg-transparent'
                    }`}
                  >
                    {/* Status dot */}
                    <div className="relative shrink-0">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                        isActive
                          ? 'bg-kube-blue'
                          : isDone
                            ? 'bg-claw-green'
                            : 'bg-slate-600'
                      }`} />
                      {isActive && (
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-kube-blue animate-ping opacity-40" />
                      )}
                    </div>

                    {/* Agent info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold transition-colors duration-500 ${
                          isActive ? 'text-white' : isDone ? 'text-claw-green' : 'text-slate-400'
                        }`}>{agent.name}</span>
                        <span className="text-[9px] font-mono text-slate-600">{agent.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] font-mono text-claw-cyan/60">{agent.ensemble}</span>
                        <span className="text-slate-700">|</span>
                        {agent.skills.map((s, j) => (
                          <span key={j} className="text-[9px] font-mono text-slate-600">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="shrink-0">
                      {isActive && (
                        <span className="text-[9px] font-mono text-kube-blue flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-kube-blue animate-pulse" />
                          running
                        </span>
                      )}
                      {isDone && (
                        <svg className="w-3.5 h-3.5 text-claw-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Hero section ── */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kube-blue/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-claw-purple/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-claw-orange/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: headline + CTAs */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-kube-blue via-primary to-claw-purple bg-clip-text text-transparent">
                Kubernetes-Native
              </span>
              <br />
              <span className="text-white">Agentic </span>
              <span className="bg-gradient-to-r from-claw-orange to-claw-red bg-clip-text text-transparent">
                Control Plane
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-light mb-4 leading-relaxed">
              Run a <span className="text-claw-orange font-medium">fleet of AI agents</span> on Kubernetes.{' '}
              <span className="text-claw-purple font-medium">Distributed inference</span>.{' '}
              <span className="text-kube-blue font-medium">Administer your cluster</span> agentically.
            </p>

            <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
              Every agent is an <span className="text-claw-cyan font-medium">ephemeral Pod</span>.{' '}
              Every policy is a <span className="text-claw-purple font-medium">CRD</span>.{' '}
              Every execution is a <span className="text-claw-green font-medium">Job</span>.
              <br className="hidden sm:block" />
              Multi-tenant. Horizontally scalable. <span className="text-white font-semibold">Safe by design.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#get-started"
                className="group relative px-7 py-3.5 text-base font-bold text-white rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-kube-blue/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-kube-blue to-claw-purple" />
                <div className="absolute inset-0 bg-gradient-to-r from-kube-blue-dark to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Install in 30 seconds
                </span>
              </a>
              <a
                href="https://github.com/sympozium-ai/sympozium"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 text-base font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right: animated cluster demo */}
          <ClusterDemo />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
