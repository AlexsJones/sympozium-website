const platformBenefits = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        {/* Cube / Pod — blocky */}
        <rect x="3" y="8" width="18" height="13" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <polyline points="3,8 12,3 21,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="3" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="21" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Every Agent is a Pod',
    description:
      'Each execution spawns an ephemeral K8s Job — blast-radius isolation, resource limits, automatic cleanup.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        {/* Shield — angular */}
        <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25 5.25-1.1 9-6 9-11.25V6L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="10" y="9" width="4" height="4" fill="currentColor" />
      </svg>
    ),
    title: 'Safe by Design',
    description:
      'AI safety enforced in infrastructure: the membrane governs what agents share and coordinate, backed by deny-all egress, admission webhooks, and ephemeral RBAC per run.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        {/* Expand / Scale — arrows out */}
        <path d="M3 3h6v2H5v4H3V3z" fill="currentColor" />
        <path d="M21 3h-6v2h4v4h2V3z" fill="currentColor" />
        <path d="M3 21h6v-2H5v-4H3v6z" fill="currentColor" />
        <path d="M21 21h-6v-2h4v-4h2v6z" fill="currentColor" />
        <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    title: 'Horizontally Scalable',
    description:
      'Stateless control plane, HPA-ready. Scale from one agent to thousands.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        {/* Eye / crosshair — surveillance style */}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <line x1="12" y1="1" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" />
        <line x1="1" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="19" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Full Observability',
    description:
      'kubectl logs, events, conditions, k9s-style TUI, and Web UI. Every action is a K8s resource.',
  },
]

export default function WhySympozium() {
  return (
    <section id="why" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-orange/10 border border-claw-orange/20 text-claw-orange text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Why Sympozium?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Containers needed orchestration.
            <br />
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              Agents need coordination.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            Most multi-agent systems communicate through messages &mdash; strings of tokens one agent serialises
            and another deserialises. Sympozium replaces this{' '}
            <a href="https://axjns.dev/blog/sticky-note-problem" target="_blank" rel="noopener noreferrer"
               className="text-claw-cyan hover:text-claw-cyan/80 underline underline-offset-2 decoration-claw-cyan/30">
              sticky-note pattern
            </a>{' '}
            with shared situational awareness: a{' '}
            <span className="text-white font-medium">synthetic membrane</span> that
            governs what agent teams share, where it travels, and when &mdash;
            selective permeability, structured handoffs, and shared memory, all on Kubernetes.
          </p>
        </div>

        {/* Two use cases — left / right split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* LEFT: Agent Fleet Orchestration */}
          <div className="relative rounded-2xl border border-claw-orange/20 bg-surface-light/30 p-8 sm:p-10 overflow-hidden group hover:border-claw-orange/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-claw-orange/5 via-transparent to-transparent" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-claw-orange to-claw-red p-[1px] mb-6">
                <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    {/* Three connected nodes — agent team */}
                    <rect x="2" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="9" y="2" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="16" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="9" y1="8" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="15" y1="8" x2="19" y2="9" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="4" y="11" width="2" height="2" fill="currentColor" />
                    <rect x="11" y="4" width="2" height="2" fill="currentColor" />
                    <rect x="18" y="11" width="2" height="2" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Coordinated Agent Teams
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Run <span className="text-claw-orange font-medium">coordinated teams</span> of AI agents &mdash; each
                isolated in its own pod with delegation, shared memory, selective permeability, and persistent state.
              </p>

              <ul className="space-y-3">
                {[
                  'Customer support bots across Telegram, Slack, Discord, WhatsApp',
                  'Code review agents that triage issues and ship PRs',
                  'Data pipeline agents with scheduled sweeps',
                  'Research teams with delegation, sequencing, and shared memory',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-claw-orange mt-0.5 shrink-0">&#x276F;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Agentic Cluster Administration */}
          <div className="relative rounded-2xl border border-kube-blue/20 bg-surface-light/30 p-8 sm:p-10 overflow-hidden group hover:border-kube-blue/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-kube-blue/5 via-transparent to-transparent" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kube-blue to-claw-cyan p-[1px] mb-6">
                <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    {/* Kubernetes wheel / cluster — angular */}
                    <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1" />
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1" />
                    <rect x="10" y="10" width="4" height="4" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Agentic Cluster Administration
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Point agents <span className="text-kube-blue font-medium">inward at the cluster itself</span> — equipped
                with kubectl, Helm, and custom skills in isolated sidecars with ephemeral, least-privilege RBAC.
              </p>

              <ul className="space-y-3">
                {[
                  'Diagnose crash-looping pods and failing deployments',
                  'Scale workloads, drain nodes, provision namespaces',
                  'Triage overnight alerts and remediate issues on schedule',
                  'Scan for privilege escalation, hardcoded secrets, missing policies',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-kube-blue mt-0.5 shrink-0">&#x276F;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Shared platform benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformBenefits.map((benefit, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-xl bg-surface-light/30 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="text-slate-400 mb-3 group-hover:text-white transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-claw-purple/20 font-serif">"</div>
            <p className="text-xl italic text-slate-300 leading-relaxed pt-8">
              Structured, gated, persistent communication is a prerequisite &mdash; not an accelerant &mdash;
              for collective intelligence. Agents don't need better messages. They need a shared medium.
            </p>
            <footer className="mt-4 text-sm text-slate-500">
              &mdash; <a href="https://zenodo.org/records/20070699" target="_blank" rel="noopener noreferrer" className="text-claw-purple hover:text-claw-purple/80 underline underline-offset-2 decoration-claw-purple/30">The Synthetic Membrane</a> (Zenodo)
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
