const platformBenefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Every Agent is a Pod',
    description:
      'Each execution spawns an ephemeral K8s Job — blast-radius isolation, resource limits, automatic cleanup.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Safe by Design',
    description:
      'NetworkPolicy deny-all egress, non-root SecurityContext, admission webhooks, ephemeral RBAC per run. Optional gVisor / Kata kernel isolation.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m10.5-6v4.5m0-4.5h-4.5m4.5 0L15 9m-10.5 6v4.5m0-4.5h4.5m-4.5 0L9 15m10.5 6v-4.5m0 4.5h-4.5m4.5 0L15 15" />
      </svg>
    ),
    title: 'Horizontally Scalable',
    description:
      'Stateless control plane, HPA-ready. Scale from one agent to thousands.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
            Two powerful use cases.
            <br />
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              One Kubernetes-native platform.
            </span>
          </h2>
        </div>

        {/* Two use cases — left / right split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* LEFT: Agent Fleet Orchestration */}
          <div className="relative rounded-2xl border border-claw-orange/20 bg-surface-light/30 p-8 sm:p-10 overflow-hidden group hover:border-claw-orange/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-claw-orange/5 via-transparent to-transparent" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-claw-orange to-claw-red p-[1px] mb-6">
                <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Agent Fleet Orchestration
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Run fleets of AI agents for <span className="text-claw-orange font-medium">any workload</span> — each
                agent isolated in its own pod with dedicated RBAC, network policies, and persistent memory.
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
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.384 3.181 1.028-5.993L2.114 7.63l6.016-.874L11.42 1.5l2.692 5.256 6.016.874-4.95 4.728 1.028 5.993z" />
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
              Give the agent tools, not trust. Whether it's orchestrating a fleet or administering
              the cluster, skills get exactly the permissions they declare, for exactly as long as
              the run lasts, and not a second longer.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
