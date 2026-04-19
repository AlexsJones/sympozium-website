const rows = [
  {
    category: 'Agent runtime',
    kagent: 'Long-running engine process (Python or Go ADK) inside the controller',
    sympozium: 'Ephemeral Pod (K8s Job) per run — fresh process, no stale state',
  },
  {
    category: 'Tool isolation',
    kagent: 'In-process MCP client shares the engine\'s ServiceAccount and memory space',
    sympozium: 'Dedicated sidecar container per skill with ephemeral, least-privilege RBAC per run',
  },
  {
    category: 'Kernel-level sandboxing',
    kagent: 'Not available — standard pod security only',
    sympozium: 'gVisor / Kata Containers via kubernetes-sigs/agent-sandbox with warm pools for instant starts',
  },
  {
    category: 'Blast radius',
    kagent: 'A rogue tool shares the controller process with every other agent',
    sympozium: 'Crash, OOM, or exploit stays inside an ephemeral Pod — gone when the Job completes',
  },
  {
    category: 'Multi-tenancy',
    kagent: 'Namespace-scoped CRDs, shared execution engine',
    sympozium: 'SympoziumInstance CRD per tenant + namespace isolation + RBAC + admission webhooks',
  },
  {
    category: 'Agent packaging',
    kagent: 'Individual Agent CRDs defined one at a time',
    sympozium: 'Ensembles — bundle personas, skills, schedules, and memory seeds in one kubectl apply',
  },
  {
    category: 'Policy & gating',
    kagent: 'Per-tool approval gates (human-in-the-loop) in UI',
    sympozium: 'SympoziumPolicy CRD + admission webhooks — cluster-wide, auditable, GitOps-friendly',
  },
  {
    category: 'Persistent memory',
    kagent: 'Vector-backed recall in shared PostgreSQL, no individual deletion',
    sympozium: 'SQLite + FTS5 on PVC — survives across runs, portable, per-instance',
  },
  {
    category: 'Channels',
    kagent: 'Slack, Discord (in-engine integration)',
    sympozium: 'Telegram, Slack, Discord, WhatsApp — each a dedicated Deployment via NATS JetStream',
  },
  {
    category: 'Scheduled runs',
    kagent: 'No native scheduling primitive',
    sympozium: 'SympoziumSchedule CRD with CronJob-style concurrency policies',
  },
  {
    category: 'MCP tools',
    kagent: 'MCP CRDs with stdio transport, manual tool selection via toolNames[]',
    sympozium: 'MCPServer CRD — managed Deployments, auto-discovery, prefixed tool namespacing',
  },
  {
    category: 'Scaling model',
    kagent: 'Vertical — all agents funnel through one controller pod',
    sympozium: 'Horizontal — stateless control plane, HPA on agent Pods, scale to thousands',
  },
  {
    category: 'Observability',
    kagent: 'OpenTelemetry tracing (Jaeger), prompt audit logs, Dashboard UI',
    sympozium: 'kubectl native (logs, events, conditions), OpenTelemetry traces/metrics, k9s TUI, web dashboard',
  },
  {
    category: 'Human-in-the-loop',
    kagent: 'Tool-level approve/reject in dashboard UI',
    sympozium: 'Policy-driven via SympoziumPolicy CRD — enforceable without a UI open',
  },
]

export default function ComparisonKagent() {
  return (
    <section id="comparison-kagent" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-claw-green/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-green/10 border border-claw-green/20 text-claw-green text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Design philosophy
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            kagent vs{' '}
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              Sympozium
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            kagent runs agents inside a shared controller process, optimizing for latency.
            Sympozium treats every invocation as an <span className="text-white font-medium">isolated Kubernetes workload</span> —
            the same model you already trust for production services.
          </p>
        </div>

        {/* Key insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-claw-red/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-claw-red/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-claw-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Workload isolation</h3>
            <p className="text-sm text-slate-400">
              kagent loads tools in-process, sharing the engine's ServiceAccount.
              Sympozium injects every skill as a <span className="text-claw-red font-medium">dedicated sidecar</span> with
              ephemeral RBAC — plus optional gVisor / Kata kernel-level sandboxing.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-kube-blue/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-kube-blue/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-kube-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Horizontal scaling</h3>
            <p className="text-sm text-slate-400">
              kagent funnels all agents through one controller pod.
              Sympozium's stateless control plane scales horizontally with <span className="text-kube-blue font-medium">HPA</span> — each agent run is its own Job.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-claw-purple/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-claw-purple/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-claw-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Ensembles</h3>
            <p className="text-sm text-slate-400">
              kagent defines agents one CRD at a time.
              Sympozium ships <span className="text-claw-purple font-medium">Ensembles</span> — declarative bundles that
              stamp out an entire team of agents, skills, schedules, and memory seeds in one apply.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-px mb-2">
              <div className="p-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
                Design choice
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-base font-bold text-slate-300">kagent</span>
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
                    <span className="text-sm text-slate-400 text-center">{row.kagent}</span>
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
            <span className="font-bold text-white">The core difference:</span> kagent runs agents <em>beside</em> Kubernetes.
            Sympozium runs agents <em>as</em> Kubernetes workloads —{' '}
            <span className="text-kube-blue font-semibold">sandboxed</span>,{' '}
            <span className="text-claw-purple font-semibold">policy-governed</span>,{' '}
            <span className="text-claw-cyan font-semibold">horizontally scalable</span>, and{' '}
            <span className="text-claw-green font-semibold">built for multi-tenant production</span>.
          </p>
        </div>

        {/* Read more link */}
        <div className="mt-6 text-center">
          <a
            href="https://deploy.sympozium.ai/docs/sympozium-vs-kagent/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-kube-blue transition-colors"
          >
            Read the full deep-dive comparison
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
