export default function GetStarted() {
  return (
    <section id="get-started" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kube-blue/5 rounded-full blur-[200px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-green/10 border border-claw-green/20 text-claw-green text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Get Started
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Up and running in{' '}
            <span className="bg-gradient-to-r from-claw-green to-claw-cyan bg-clip-text text-transparent">
              30 seconds
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            All you need is a Kubernetes cluster and a terminal.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/30">
            <div className="flex items-center gap-3 px-6 py-4 bg-surface-lighter/30 border-b border-white/5">
              <span className="w-7 h-7 rounded-lg bg-kube-blue/20 text-kube-blue text-sm font-bold flex items-center justify-center">1</span>
              <span className="font-semibold text-white">Install the CLI</span>
              <span className="text-xs text-slate-500 ml-auto">macOS / Linux</span>
            </div>
            <div className="p-6">
              <div className="font-mono text-sm bg-surface/60 rounded-lg p-4 border border-white/5">
                <span className="text-claw-green select-none">$ </span>
                <span className="text-white">curl -fsSL https://deploy.sympozium.ai/install.sh | sh</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Detects your OS and architecture, downloads the latest release binary.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/30">
            <div className="flex items-center gap-3 px-6 py-4 bg-surface-lighter/30 border-b border-white/5">
              <span className="w-7 h-7 rounded-lg bg-claw-purple/20 text-claw-purple text-sm font-bold flex items-center justify-center">2</span>
              <span className="font-semibold text-white">Deploy to your cluster</span>
            </div>
            <div className="p-6">
              <div className="font-mono text-sm bg-surface/60 rounded-lg p-4 border border-white/5">
                <span className="text-claw-green select-none">$ </span>
                <span className="text-white">sympozium install</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Applies CRDs, RBAC, controller, API server, admission webhook, NATS, 
                cert-manager, and network policies to your current kubectl context.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/30">
            <div className="flex items-center gap-3 px-6 py-4 bg-surface-lighter/30 border-b border-white/5">
              <span className="w-7 h-7 rounded-lg bg-claw-orange/20 text-claw-orange text-sm font-bold flex items-center justify-center">3</span>
              <span className="font-semibold text-white">Activate an Ensemble</span>
              <span className="ml-auto px-2 py-0.5 rounded-md bg-claw-green/10 text-claw-green text-xs font-medium border border-claw-green/20">recommended</span>
            </div>
            <div className="p-6">
              <div className="font-mono text-sm bg-surface/60 rounded-lg p-4 border border-white/5">
                <span className="text-claw-green select-none">$ </span>
                <span className="text-white">sympozium</span>
              </div>
              <div className="mt-4 font-mono text-xs text-slate-500 bg-surface/40 rounded-lg p-4 border border-white/5">
                <div className="text-claw-cyan">╔═══════════════════════════════════════════════════════╗</div>
                <div className="text-claw-cyan">║{'  '}Sympozium · Ensembles{'                                '}║</div>
                <div className="text-claw-cyan">╚═══════════════════════════════════════════════════════╝</div>
                <div className="mt-2 space-y-1">
                  <div className="text-white"> NAME{'                  '}CATEGORY{'   '}AGENTS{'  '}PHASE</div>
                  <div className="text-claw-orange">▸ platform-team{'        '}platform{'   '}3{'       '}Pending</div>
                  <div className="text-slate-400">  devops-essentials{'    '}devops{'     '}2{'       '}Pending</div>
                </div>
                <div className="mt-2 text-slate-600"> Press Enter to activate → wizard → API key → done</div>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                The TUI opens on the <span className="text-claw-cyan font-medium">Ensembles</span> tab. Pick a pack, enter your API key,
                and the controller creates all agents, schedules, and memory automatically.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/30">
            <div className="flex items-center gap-3 px-6 py-4 bg-surface-lighter/30 border-b border-white/5">
              <span className="w-7 h-7 rounded-lg bg-claw-green/20 text-claw-green text-sm font-bold flex items-center justify-center">4</span>
              <span className="font-semibold text-white">Your agents are live</span>
            </div>
            <div className="p-6">
              <div className="font-mono text-xs text-slate-500 bg-surface/40 rounded-lg p-4 border border-white/5">
                <div className="text-claw-cyan">✓</div>
                <div className="mt-1 space-y-1">
                  <div><span className="text-claw-green">✓</span> Agent <span className="text-white">platform-team-security-guardian</span> created</div>
                  <div><span className="text-claw-green">✓</span> Agent <span className="text-white">platform-team-sre-watchdog</span> created</div>
                  <div><span className="text-claw-green">✓</span> Agent <span className="text-white">platform-team-platform-engineer</span> created</div>
                  <div><span className="text-claw-green">✓</span> SympoziumSchedule <span className="text-slate-400">×3</span> created</div>
                  <div><span className="text-claw-green">✓</span> Memory ConfigMap <span className="text-slate-400">×3</span> seeded</div>
                </div>
                <div className="mt-2 text-slate-400">Ensemble <span className="text-claw-cyan">platform-team</span> → <span className="text-claw-green">Ready</span> (3/3 agents deployed)</div>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Each agent runs on its own schedule with dedicated skills, memory, and tool policies.
                Submit ad-hoc tasks with <code className="text-claw-cyan">/run</code>, 
                or let the heartbeats handle it.
              </p>
            </div>
          </div>
        </div>

        {/* Supported providers */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-6">Supports any AI provider</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'OpenAI', color: 'text-claw-green' },
              { name: 'Anthropic', color: 'text-claw-orange' },
              { name: 'Azure OpenAI', color: 'text-kube-blue' },
              { name: 'Ollama', color: 'text-claw-cyan' },
              { name: 'Any OpenAI-compatible', color: 'text-claw-purple' },
            ].map((provider) => (
              <div
                key={provider.name}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <span className={`text-sm font-medium ${provider.color}`}>{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
