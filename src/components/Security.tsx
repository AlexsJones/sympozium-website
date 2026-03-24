const threats = [
  {
    threat: 'Agent escapes sandbox',
    openclaw: 'Shared process — one rogue tool call can access memory, files, or network of every other agent',
    sympozium: 'Each agent runs in an ephemeral Pod with deny-all egress NetworkPolicy. Opt into kernel-level isolation via Agent Sandbox — gVisor or Kata Containers — for an additional layer between the agent and the host kernel. Blast radius = one Job.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    threat: 'Privilege escalation',
    openclaw: 'Long-lived Docker sidecar with standing permissions — credentials persist between runs',
    sympozium: 'Ephemeral RBAC per AgentRun — controller provisions least-privilege credentials at start, revokes on completion. No standing god-roles.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    threat: 'Lateral movement',
    openclaw: 'In-process — agents share network, filesystem, and event emitter. No isolation boundary.',
    sympozium: 'NetworkPolicy deny-all egress on every agent pod. Only the IPC bridge sidecar can reach NATS. Agents cannot reach the internet or other pods.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    threat: 'Unauthorized tool use',
    openclaw: '7-layer in-process pipeline — enforcement at runtime, bypassable by code',
    sympozium: 'SympoziumPolicy CRD + admission webhook — tools and features gated before the pod is even created. Enforcement at the API server, not in your app.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    threat: 'Leftover permissions',
    openclaw: 'Credentials and file locks persist on disk (~/.openclaw/) — no automatic cleanup',
    sympozium: 'ownerReference garbage collection for namespace RBAC. Label-based cleanup for cluster RBAC. Everything is deleted when the AgentRun finishes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    threat: 'Multi-tenant breach',
    openclaw: 'Single-instance file lock — no tenant isolation, one process serves all',
    sympozium: 'Namespace-scoped CRDs with Kubernetes RBAC. Each tenant gets their own namespace, policies, and network boundaries.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

const layers = [
  {
    label: 'Network',
    detail: 'deny-all egress NetworkPolicy',
    color: 'from-claw-red to-claw-orange',
  },
  {
    label: 'Pod Sandbox',
    detail: 'runAsNonRoot · UID 1000 · read-only rootfs',
    color: 'from-claw-orange to-claw-orange',
  },
  {
    label: 'Admission Control',
    detail: 'SympoziumPolicy webhook enforced before pod creation',
    color: 'from-claw-orange to-primary',
  },
  {
    label: 'Skill RBAC',
    detail: 'Ephemeral Role/ClusterRole per AgentRun',
    color: 'from-primary to-claw-purple',
  },
  {
    label: 'RBAC Lifecycle',
    detail: 'ownerReference + label-based auto-cleanup',
    color: 'from-claw-purple to-kube-blue',
  },
  {
    label: 'Multi-tenancy',
    detail: 'Namespace-scoped CRDs + Kubernetes RBAC',
    color: 'from-kube-blue to-claw-cyan',
  },
  {
    label: 'Kernel Isolation',
    detail: 'Agent Sandbox — gVisor user-space kernel or Kata lightweight VMs',
    color: 'from-claw-cyan to-claw-green',
  },
]

export default function Security() {
  return (
    <section id="security" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-claw-red/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-claw-green/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-red/10 border border-claw-red/20 text-claw-red text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Security
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Security isn't a feature.
            <br />
            <span className="bg-gradient-to-r from-claw-red via-claw-orange to-primary bg-clip-text text-transparent">
              It's the architecture.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            OpenClaw runs agents as in-process monoliths with shared memory, standing permissions, and file-based state.
            Sympozium enforces <span className="text-white font-semibold">defence-in-depth at every layer</span> — from
            network isolation to per-run RBAC to admission-time policy enforcement.
            Every agent gets exactly the permissions it declares, for exactly as long as the run lasts, and not a second longer.
          </p>
        </div>

        {/* Defence-in-depth layers */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Seven layers of defence-in-depth
          </h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {layers.map((layer, i) => (
              <div key={i} className="group relative">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light/50 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} p-[1px]`}>
                    <div className="w-full h-full rounded-lg bg-surface-light flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-white font-semibold">{layer.label}</span>
                      <span className="text-slate-500 text-sm font-mono truncate">{layer.detail}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-claw-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat comparison grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Real threats. Real differences.
          </h3>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
            Every security concern you have about running AI agents in production — Sympozium addresses it at the infrastructure level, not with application-level workarounds.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {threats.map((t, i) => (
              <div
                key={i}
                className="group relative rounded-2xl bg-surface-light/50 border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-500"
              >
                {/* Threat header */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                  <div className="w-10 h-10 rounded-lg bg-claw-red/10 border border-claw-red/20 flex items-center justify-center text-claw-red">
                    {t.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white">{t.threat}</h4>
                </div>

                {/* Comparison */}
                <div className="px-6 pb-6 space-y-3">
                  {/* OpenClaw - the risk */}
                  <div className="flex gap-3 p-3 rounded-lg bg-claw-red/5 border border-claw-red/10">
                    <svg className="w-5 h-5 text-claw-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <span className="text-xs font-medium text-claw-red/70 uppercase tracking-wider">OpenClaw</span>
                      <p className="text-sm text-slate-400 mt-0.5">{t.openclaw}</p>
                    </div>
                  </div>

                  {/* Sympozium - the solution */}
                  <div className="flex gap-3 p-3 rounded-lg bg-claw-green/5 border border-claw-green/10">
                    <svg className="w-5 h-5 text-claw-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75" />
                    </svg>
                    <div>
                      <span className="text-xs font-medium text-claw-green/70 uppercase tracking-wider">Sympozium</span>
                      <p className="text-sm text-slate-300 mt-0.5">{t.sympozium}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote callout */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-claw-red/5 via-claw-orange/5 to-primary/5 border border-claw-red/20 text-center">
          <blockquote className="text-xl text-slate-200 font-medium italic mb-4">
            "Give the agent tools, not trust."
          </blockquote>
          <p className="text-slate-400">
            Whether it's orchestrating a fleet or administering the cluster, skills get
            exactly the permissions they declare, for exactly as long as the run lasts,
            and not a second longer. This is the Kubernetes-native equivalent of
            <span className="text-kube-blue font-semibold"> temporary IAM session credentials</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
