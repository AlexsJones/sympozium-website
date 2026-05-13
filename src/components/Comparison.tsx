import { useState } from 'react'

const openclawRows = [
  {
    category: 'Agent execution',
    other: 'Shared memory, single process',
    sympozium: 'Ephemeral Pod per invocation (K8s Job)',
  },
  {
    category: 'Orchestration',
    other: 'In-process registry + lane queue',
    sympozium: 'CRD-based registry with controller reconciliation',
  },
  {
    category: 'Sandbox isolation',
    other: 'Long-lived Docker sidecar',
    sympozium: 'Pod SecurityContext + PodSecurity admission',
  },
  {
    category: 'IPC',
    other: 'In-process EventEmitter',
    sympozium: 'Filesystem sidecar + NATS JetStream',
  },
  {
    category: 'Tool / feature gating',
    other: '7-layer in-process pipeline',
    sympozium: 'Admission webhooks + SympoziumPolicy CRD',
  },
  {
    category: 'Persistent memory',
    other: 'Files on disk (~/.openclaw/)',
    sympozium: 'ConfigMap per instance, controller-managed',
  },
  {
    category: 'Scheduled tasks',
    other: 'Cron jobs / external scripts',
    sympozium: 'SympoziumSchedule CRD with cron controller',
  },
  {
    category: 'State',
    other: 'SQLite + flat files',
    sympozium: 'etcd (CRDs) + PostgreSQL + object storage',
  },
  {
    category: 'Multi-tenancy',
    other: 'Single-instance file lock',
    sympozium: 'Namespaced CRDs, RBAC, NetworkPolicy',
  },
  {
    category: 'Scaling',
    other: 'Vertical only',
    sympozium: 'Horizontal — stateless control plane, HPA',
  },
  {
    category: 'Channel connections',
    other: 'In-process per channel',
    sympozium: 'Dedicated Deployment per channel type',
  },
  {
    category: 'External tools',
    other: 'Plugin SDKs, in-process registries',
    sympozium: 'MCPServer CRD — managed deployments, auto-discovery, prefixed tool namespacing',
  },
  {
    category: 'Observability',
    other: 'Application logs',
    sympozium: 'kubectl logs, events, conditions, OpenTelemetry traces/metrics, k9s TUI, web dashboard',
  },
]

const kagentRows = [
  {
    category: 'Agent runtime',
    other: 'Long-running engine process (Python or Go ADK) inside the controller',
    sympozium: 'Ephemeral Pod (K8s Job) per run — fresh process, no stale state',
  },
  {
    category: 'Tool isolation',
    other: 'In-process MCP client shares the engine\'s ServiceAccount and memory space',
    sympozium: 'Dedicated sidecar container per skill with ephemeral, least-privilege RBAC per run',
  },
  {
    category: 'Kernel-level sandboxing',
    other: 'Not available — standard pod security only',
    sympozium: 'gVisor / Kata Containers via kubernetes-sigs/agent-sandbox with warm pools for instant starts',
  },
  {
    category: 'Blast radius',
    other: 'A rogue tool shares the controller process with every other agent',
    sympozium: 'Crash, OOM, or exploit stays inside an ephemeral Pod — gone when the Job completes',
  },
  {
    category: 'Multi-tenancy',
    other: 'Namespace-scoped CRDs, shared execution engine',
    sympozium: 'Agent CRD per tenant + namespace isolation + RBAC + admission webhooks',
  },
  {
    category: 'Agent packaging',
    other: 'Individual Agent CRDs defined one at a time',
    sympozium: 'Ensembles — bundle agent configs, skills, schedules, and memory seeds in one kubectl apply',
  },
  {
    category: 'Policy & gating',
    other: 'Per-tool approval gates (human-in-the-loop) in UI',
    sympozium: 'SympoziumPolicy CRD + admission webhooks — cluster-wide, auditable, GitOps-friendly',
  },
  {
    category: 'Persistent memory',
    other: 'Vector-backed recall in shared PostgreSQL, no individual deletion',
    sympozium: 'SQLite + FTS5 on PVC — survives across runs, portable, per-instance',
  },
  {
    category: 'Channels',
    other: 'Slack, Discord (in-engine integration)',
    sympozium: 'Telegram, Slack, Discord, WhatsApp — each a dedicated Deployment via NATS JetStream',
  },
  {
    category: 'Scheduled runs',
    other: 'No native scheduling primitive',
    sympozium: 'SympoziumSchedule CRD with CronJob-style concurrency policies',
  },
  {
    category: 'MCP tools',
    other: 'MCP CRDs with stdio transport, manual tool selection via toolNames[]',
    sympozium: 'MCPServer CRD — managed Deployments, auto-discovery, prefixed tool namespacing',
  },
  {
    category: 'Scaling model',
    other: 'Vertical — all agents funnel through one controller pod',
    sympozium: 'Horizontal — stateless control plane, HPA on agent Pods, scale to thousands',
  },
  {
    category: 'Observability',
    other: 'OpenTelemetry tracing (Jaeger), prompt audit logs, Dashboard UI',
    sympozium: 'kubectl native (logs, events, conditions), OpenTelemetry traces/metrics, k9s TUI, web dashboard',
  },
  {
    category: 'Human-in-the-loop',
    other: 'Tool-level approve/reject in dashboard UI',
    sympozium: 'Policy-driven via SympoziumPolicy CRD — enforceable without a UI open',
  },
]

const tabs = [
  {
    id: 'openclaw',
    label: 'vs OpenClaw',
    otherName: 'OpenClaw',
    rows: openclawRows,
    columnHeader: 'Capability',
    description: (
      <>
        OpenClaw pioneered agentic orchestration. Sympozium takes every concept and
        expresses it as a Kubernetes-native resource — then adds the ability to point agents at the cluster itself.
      </>
    ),
    callout: (
      <>
        <span className="font-bold text-white">The result:</span> every concept that OpenClaw manages in application code,
        Sympozium expresses as a Kubernetes resource —
        <span className="text-kube-blue font-semibold"> declarative</span>,{' '}
        <span className="text-claw-purple font-semibold">reconcilable</span>,{' '}
        <span className="text-claw-cyan font-semibold">observable</span>, and{' '}
        <span className="text-claw-green font-semibold">scalable</span>.
      </>
    ),
  },
  {
    id: 'kagent',
    label: 'vs kagent',
    otherName: 'kagent',
    rows: kagentRows,
    columnHeader: 'Design choice',
    description: (
      <>
        kagent runs agents inside a shared controller process, optimizing for latency.
        Sympozium treats every invocation as an <span className="text-white font-medium">isolated Kubernetes workload</span> —
        the same model you already trust for production services.
      </>
    ),
    callout: (
      <>
        <span className="font-bold text-white">The core difference:</span> kagent runs agents <em>beside</em> Kubernetes.
        Sympozium runs agents <em>as</em> Kubernetes workloads —{' '}
        <span className="text-kube-blue font-semibold">sandboxed</span>,{' '}
        <span className="text-claw-purple font-semibold">policy-governed</span>,{' '}
        <span className="text-claw-cyan font-semibold">horizontally scalable</span>, and{' '}
        <span className="text-claw-green font-semibold">built for multi-tenant production</span>.
      </>
    ),
    deepDiveUrl: 'https://deploy.sympozium.ai/docs/sympozium-vs-kagent/',
  },
]

export default function Comparison() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = tabs[activeTab]

  return (
    <section id="comparison" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-claw-orange/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-orange/10 border border-claw-orange/20 text-claw-orange text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            How it compares
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sympozium vs{' '}
            <span className="bg-gradient-to-r from-kube-blue to-claw-purple bg-clip-text text-transparent">
              the alternatives
            </span>
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-white/[0.03] border border-white/10 p-1">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(i)}
                className={`
                  px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                  ${activeTab === i
                    ? 'bg-gradient-to-r from-kube-blue/20 to-claw-purple/20 text-white border border-kube-blue/30'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-slate-400 max-w-3xl mx-auto text-center mb-12">
          {tab.description}
        </p>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-px mb-2">
              <div className="p-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
                {tab.columnHeader}
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-base font-bold text-slate-300">{tab.otherName}</span>
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
              {tab.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-px rounded-lg overflow-hidden hover:bg-white/[0.02] transition-colors"
                >
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-semibold text-white">{row.category}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <span className="text-sm text-slate-400 text-center">{row.other}</span>
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
            {tab.callout}
          </p>
        </div>

        {/* Deep-dive link (kagent only) */}
        {tab.deepDiveUrl && (
          <div className="mt-6 text-center">
            <a
              href={tab.deepDiveUrl}
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
        )}
      </div>
    </section>
  )
}
