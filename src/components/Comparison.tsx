const rows = [
  {
    category: 'Agent execution',
    openclaw: 'Shared memory, single process',
    sympozium: 'Ephemeral Pod per invocation (K8s Job)',
  },
  {
    category: 'Orchestration',
    openclaw: 'In-process registry + lane queue',
    sympozium: 'CRD-based registry with controller reconciliation',
  },
  {
    category: 'Sandbox isolation',
    openclaw: 'Long-lived Docker sidecar',
    sympozium: 'Pod SecurityContext + PodSecurity admission',
  },
  {
    category: 'IPC',
    openclaw: 'In-process EventEmitter',
    sympozium: 'Filesystem sidecar + NATS JetStream',
  },
  {
    category: 'Tool / feature gating',
    openclaw: '7-layer in-process pipeline',
    sympozium: 'Admission webhooks + SympoziumPolicy CRD',
  },
  {
    category: 'Persistent memory',
    openclaw: 'Files on disk (~/.openclaw/)',
    sympozium: 'ConfigMap per instance, controller-managed',
  },
  {
    category: 'Scheduled tasks',
    openclaw: 'Cron jobs / external scripts',
    sympozium: 'SympoziumSchedule CRD with cron controller',
  },
  {
    category: 'State',
    openclaw: 'SQLite + flat files',
    sympozium: 'etcd (CRDs) + PostgreSQL + object storage',
  },
  {
    category: 'Multi-tenancy',
    openclaw: 'Single-instance file lock',
    sympozium: 'Namespaced CRDs, RBAC, NetworkPolicy',
  },
  {
    category: 'Scaling',
    openclaw: 'Vertical only',
    sympozium: 'Horizontal — stateless control plane, HPA',
  },
  {
    category: 'Channel connections',
    openclaw: 'In-process per channel',
    sympozium: 'Dedicated Deployment per channel type',
  },
  {
    category: 'External tools',
    openclaw: 'Plugin SDKs, in-process registries',
    sympozium: 'MCPServer CRD — managed deployments, auto-discovery, prefixed tool namespacing',
  },
  {
    category: 'Observability',
    openclaw: 'Application logs',
    sympozium: 'kubectl logs, events, conditions, OpenTelemetry traces/metrics, k9s TUI, web dashboard',
  },
]

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-claw-orange/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-orange/10 border border-claw-orange/20 text-claw-orange text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            How it compares
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            OpenClaw vs{' '}
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              Sympozium
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            OpenClaw pioneered agentic orchestration. Sympozium takes every concept and 
            expresses it as a Kubernetes-native resource — then adds the ability to point agents at the cluster itself.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-px mb-2">
              <div className="p-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
                Capability
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-base font-bold text-slate-300">OpenClaw</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-kube-blue/10 to-claw-purple/10 border border-kube-blue/30">
                  <span className="text-base font-bold bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
                    Sympozium
                  </span>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-1">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-px rounded-lg overflow-hidden hover:bg-white/[0.02] transition-colors"
                >
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-semibold text-white">{row.category}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-sm text-slate-400 text-center">{row.openclaw}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-kube-blue/[0.03] border-l-2 border-kube-blue/20">
                    <span className="text-sm text-kube-blue text-center font-medium">{row.sympozium}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-kube-blue/5 to-claw-purple/5 border border-kube-blue/20 text-center">
          <p className="text-lg text-slate-300">
            <span className="font-bold text-white">The result:</span> every concept that OpenClaw manages in application code,
            Sympozium expresses as a Kubernetes resource — 
            <span className="text-kube-blue font-semibold"> declarative</span>,{' '}
            <span className="text-claw-purple font-semibold">reconcilable</span>,{' '}
            <span className="text-claw-cyan font-semibold">observable</span>, and{' '}
            <span className="text-claw-green font-semibold">scalable</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
