import EnsembleWorkflow from './EnsembleWorkflow'

/* ── Compact "full stack" strip — the layers an agent runs on ── */

const stackChipColors: Record<string, string> = {
  'kube-blue': 'text-kube-blue',
  'claw-purple': 'text-claw-purple',
  'claw-green': 'text-claw-green',
}

function StackChip({ icon, label, sub, color }: { icon: React.ReactNode; label: string; sub: string; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-surface/40 px-2.5 py-1.5">
      <span className={stackChipColors[color]}>{icon}</span>
      <div className="leading-tight">
        <div className="text-[11px] font-bold text-white">{label}</div>
        <div className="text-[9px] font-mono text-slate-500">{sub}</div>
      </div>
    </div>
  )
}

function StackArrow() {
  return (
    <svg className="w-3.5 h-3.5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function FullStack() {
  return (
    <div className="mb-7 inline-flex flex-col gap-1.5">
      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">Runs the full stack</span>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-light/30 p-2 backdrop-blur-sm">
        <StackChip
          color="kube-blue"
          label="Cluster"
          sub="Kubernetes"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="13" stroke="currentColor" strokeWidth="1.5" />
              <polyline points="3,8 12,3 21,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="3" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
        <StackArrow />
        <StackChip
          color="claw-purple"
          label="Model"
          sub="claimed, not placed"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="5" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="9" width="6" height="6" fill="currentColor" />
              <line x1="9" y1="2" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="15" y1="2" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="19" x2="9" y2="22" stroke="currentColor" strokeWidth="1.5" />
              <line x1="15" y1="19" x2="15" y2="22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          }
        />
        <StackArrow />
        <StackChip
          color="claw-green"
          label="Agent Runtime"
          sub="isolated workload"
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4 14h7v8l9-12h-7l0-8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          }
        />
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-5">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-kube-blue via-primary to-claw-purple bg-clip-text text-transparent">
                Coordination Layer
              </span>
              <br />
              <span className="text-white">for </span>
              <span className="bg-gradient-to-r from-claw-orange to-claw-red bg-clip-text text-transparent">
                Multi-Agent AI
              </span>
            </h1>

            {/* Full-stack strip — sits with the headline */}
            <FullStack />

            <p className="text-lg sm:text-xl text-slate-300 font-light mb-4 leading-relaxed">
              Agents don't need better prompts. They need{' '}
              <span className="text-claw-orange font-medium">shared situational awareness</span>,{' '}
              <span className="text-claw-purple font-medium">structured handoffs</span>, and{' '}
              <span className="text-kube-blue font-medium">policy</span> that governs{' '}
              <span className="text-white font-medium">what</span> they share,{' '}
              <span className="text-white font-medium">where</span>, and{' '}
              <span className="text-white font-medium">when</span>.
            </p>

            <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
              Every agent runs in an <span className="text-claw-cyan font-medium">isolated workload</span>.{' '}
              Every policy is a <span className="text-claw-purple font-medium">CRD</span>.{' '}
              Ephemeral AgentRuns are <span className="text-claw-green font-medium">Jobs</span>; interactive sessions are{' '}
              <span className="text-claw-orange font-medium">HarnessSessions</span>.
              <br className="hidden sm:block" />
              Kubernetes-native. Multi-tenant. <span className="text-white font-semibold">Safe by design.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="https://deploy.sympozium.ai/docs/getting-started/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-install group relative px-7 py-3.5 text-base font-bold text-white rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-kube-blue/25"
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

          {/* Right: animated ensemble workflow */}
          <EnsembleWorkflow />
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
