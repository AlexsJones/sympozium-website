export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kube-blue/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-claw-purple/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-claw-orange/10 rounded-full blur-[150px]" />
      </div>

      {/* Kubernetes wheel decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="0.5" fill="none" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
              y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        {/* Creator badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 bg-claw-green rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              From the creator of{' '}
              <a href="https://k8sgpt.ai" target="_blank" rel="noopener noreferrer" className="text-kube-blue hover:text-primary-light transition-colors font-semibold">
                k8sgpt
              </a>
              {' & '}
              <a href="https://github.com/AlexsJones/llmfit" target="_blank" rel="noopener noreferrer" className="text-claw-purple hover:text-claw-orange transition-colors font-semibold">
                llmfit
              </a>
            </span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
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

        {/* Sub-headline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light max-w-4xl mx-auto mb-4 leading-relaxed">
          Run a <span className="text-claw-orange font-medium">fleet of AI agents</span> on Kubernetes.{' '}
          <span className="text-kube-blue font-medium">Administer your cluster</span> agentically.
        </p>

        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">
          Every agent is an <span className="text-claw-cyan font-medium">ephemeral Pod</span>. 
          Every policy is a <span className="text-claw-purple font-medium">CRD</span>. 
          Every execution is a <span className="text-claw-green font-medium">Job</span>.
          <br className="hidden sm:block" />
          Orchestrate multi-agent workflows <em>and</em> let agents diagnose, scale, and remediate your infrastructure.
          <br className="hidden sm:block" />
          Multi-tenant. Horizontally scalable. <span className="text-white font-semibold">Safe by design.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#get-started"
            className="group relative px-8 py-4 text-lg font-bold text-white rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-kube-blue/25"
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
            href="https://github.com/AlexsJones/sympozium"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Intro video */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Intro to <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">Sympozium</span>
            </h3>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-surface-light/70 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
              <iframe
                src="https://share.synthesia.io/embeds/videos/34749f6f-0fa4-448f-a61b-91239b9ae91f"
                loading="lazy"
                title="Synthesia video player - Unlocking the Power of Sympozium: A Feature Overview"
                allowFullScreen
                allow="encrypted-media; fullscreen; microphone;"
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0, overflow: 'hidden' }}
              />
            </div>
          </div>
        </div>

        {/* Terminal preview */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-surface-light/80 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-lighter/50 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-claw-red/80" />
              <div className="w-3 h-3 rounded-full bg-claw-orange/80" />
              <div className="w-3 h-3 rounded-full bg-claw-green/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-slate-400 mb-1">
                <span className="text-claw-green">$</span>{' '}
                <span className="text-white">curl -fsSL https://deploy.sympozium.ai/install.sh | sh</span>
              </div>
              <div className="text-slate-500 mb-3">
                <span className="text-claw-cyan">✓</span> Sympozium CLI installed
              </div>
              <div className="text-slate-400 mb-1">
                <span className="text-claw-green">$</span>{' '}
                <span className="text-white">sympozium install</span>
              </div>
              <div className="text-slate-500 mb-1">
                <span className="text-claw-cyan">✓</span> CRDs applied
              </div>
              <div className="text-slate-500 mb-1">
                <span className="text-claw-cyan">✓</span> Controller deployed
              </div>
              <div className="text-slate-500 mb-1">
                <span className="text-claw-cyan">✓</span> NATS event bus ready
              </div>
              <div className="text-slate-500 mb-3">
                <span className="text-claw-cyan">✓</span> Webhook & RBAC configured
              </div>
              <div className="text-slate-400">
                <span className="text-claw-green">$</span>{' '}
                <span className="text-white">sympozium</span>
              </div>
              <div className="mt-1 text-slate-500">
                <span className="animate-pulse text-claw-orange">▊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interact your way — TUI / Web / Helm */}
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-center text-2xl sm:text-3xl font-bold text-white mb-2">
            Interact <span className="bg-gradient-to-r from-claw-cyan to-claw-green bg-clip-text text-transparent">your way</span>
          </h3>
          <p className="text-center text-slate-400 text-sm mb-10 max-w-2xl mx-auto">
            Use the k9s-style TUI, the Web UI, or just <span className="font-mono text-claw-cyan">helm</span> and <span className="font-mono text-claw-cyan">kubectl</span> — Sympozium meets you where you are.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TUI */}
            <div className="group">
              <div className="rounded-xl overflow-hidden border border-white/10 hover:border-claw-green/30 transition-colors shadow-2xl shadow-black/40">
                <img
                  src="/demo.gif"
                  alt="Sympozium TUI — terminal-based cluster management"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-claw-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span className="text-sm font-semibold text-white">Terminal UI</span>
                <span className="text-xs text-slate-500 font-mono ml-1">sympozium</span>
              </div>
            </div>

            {/* Web */}
            <div className="group">
              <div className="rounded-xl overflow-hidden border border-white/10 hover:border-kube-blue/30 transition-colors shadow-2xl shadow-black/40">
                <video
                  src="/web.webm"
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Sympozium Web UI — browser-based management dashboard"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-kube-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="text-sm font-semibold text-white">Web UI</span>
                <span className="text-xs text-slate-500 font-mono ml-1">sympozium web</span>
              </div>
            </div>
          </div>

          {/* Helm / kubectl note */}
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-500">
            <div className="h-px w-12 bg-white/10" />
            <span>or just use</span>
            <span className="font-mono text-claw-orange">helm install</span>
            <span>&</span>
            <span className="font-mono text-claw-orange">kubectl apply</span>
            <span>— no UI required</span>
            <div className="h-px w-12 bg-white/10" />
          </div>
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
