const reasons = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Every Agent is a Pod',
    description:
      'Each agent execution spawns an ephemeral Kubernetes Job — complete blast-radius isolation, resource limits, and automatic cleanup. No shared process, no contamination.',
    color: 'from-kube-blue to-claw-cyan',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Safe by Design',
    description:
      'Defense-in-depth at every layer: NetworkPolicy deny-all egress, SecurityContext non-root, admission webhooks, ephemeral RBAC per run. Opt into kernel-level isolation via Agent Sandbox (gVisor / Kata). No standing god-roles, no leftover permissions.',
    color: 'from-claw-green to-claw-cyan',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'True Multi-Agent',
    description:
      'Not just multiple tools in one process. Each agent gets its own pod, its own RBAC, its own network policy. Run dozens of agents concurrently — handling external tasks or managing cluster resources — with proper tenant isolation.',
    color: 'from-claw-purple to-primary',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m10.5-6v4.5m0-4.5h-4.5m4.5 0L15 9m-10.5 6v4.5m0-4.5h4.5m-4.5 0L9 15m10.5 6v-4.5m0 4.5h-4.5m4.5 0L15 15" />
      </svg>
    ),
    title: 'Horizontally Scalable',
    description:
      'Stateless control plane, HPA-ready. Scale from one agent to thousands. Kubernetes handles the scheduling — you handle the strategy.',
    color: 'from-claw-orange to-claw-red',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.384 3.181 1.028-5.993L2.114 7.63l6.016-.874L11.42 1.5l2.692 5.256 6.016.874-4.95 4.728 1.028 5.993z" />
      </svg>
    ),
    title: 'Cluster-Aware Skills',
    description:
      'Equip agents with kubectl, Helm, and custom cluster-ops skills — each in its own sidecar with auto-provisioned, least-privilege RBAC. Agents can inspect pods, scale deployments, or run domain-specific tools — safely and ephemerally.',
    color: 'from-primary to-claw-purple',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Full Observability',
    description:
      'kubectl logs, events, conditions, k9s-style TUI. Whether agents are processing external tasks or managing cluster resources, every action is a Kubernetes resource — declarative, reconcilable, observable.',
    color: 'from-claw-cyan to-kube-blue',
  },
]

export default function WhySympozium() {
  return (
    <section id="why" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-orange/10 border border-claw-orange/20 text-claw-orange text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Why Sympozium?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Two powerful use cases.
            <br />
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              One Kubernetes-native platform.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Use Sympozium to <span className="text-claw-orange font-medium">orchestrate fleets of AI agents</span> for
            any workload — customer support, code review, data pipelines. Or point those agents
            inward to <span className="text-kube-blue font-medium">administer the cluster itself</span>: diagnose
            failures, scale deployments, triage alerts, and remediate issues — all with Kubernetes-native
            isolation, RBAC, and audit trails.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-surface-light/50 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} p-[1px] mb-6`}>
                <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center text-white">
                  {reason.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-slate-400 leading-relaxed">{reason.description}</p>
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
