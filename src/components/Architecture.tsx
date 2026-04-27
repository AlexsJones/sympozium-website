import TopologyDemo from './TopologyDemo'

const stepStyles: Record<string, { box: string; badge: string }> = {
  'kube-blue': {
    box: 'w-14 h-14 rounded-2xl bg-kube-blue/10 border border-kube-blue/30 flex items-center justify-center text-2xl',
    badge: 'text-xs font-bold text-kube-blue bg-kube-blue/10 px-2 py-0.5 rounded',
  },
  'claw-purple': {
    box: 'w-14 h-14 rounded-2xl bg-claw-purple/10 border border-claw-purple/30 flex items-center justify-center text-2xl',
    badge: 'text-xs font-bold text-claw-purple bg-claw-purple/10 px-2 py-0.5 rounded',
  },
  'claw-orange': {
    box: 'w-14 h-14 rounded-2xl bg-claw-orange/10 border border-claw-orange/30 flex items-center justify-center text-2xl',
    badge: 'text-xs font-bold text-claw-orange bg-claw-orange/10 px-2 py-0.5 rounded',
  },
  'claw-cyan': {
    box: 'w-14 h-14 rounded-2xl bg-claw-cyan/10 border border-claw-cyan/30 flex items-center justify-center text-2xl',
    badge: 'text-xs font-bold text-claw-cyan bg-claw-cyan/10 px-2 py-0.5 rounded',
  },
  'claw-green': {
    box: 'w-14 h-14 rounded-2xl bg-claw-green/10 border border-claw-green/30 flex items-center justify-center text-2xl',
    badge: 'text-xs font-bold text-claw-green bg-claw-green/10 px-2 py-0.5 rounded',
  },
}


export default function Architecture() {
  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kube-blue/10 border border-kube-blue/20 text-kube-blue text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How it{' '}
            <span className="bg-gradient-to-r from-kube-blue to-claw-cyan bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Every concept that OpenClaw manages in application code, Sympozium expresses as a
            Kubernetes resource. The same architecture powers both agent fleet orchestration
            and agentic cluster administration.
          </p>
        </div>

        {/* How It Works step flow */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Message arrives via Channel Pod',
                desc: 'A message from Telegram, Slack, Discord, or WhatsApp hits a dedicated channel deployment and is published to the NATS event bus.',
                color: 'kube-blue',
                icon: '\u{1F4AC}',
              },
              {
                step: '2',
                title: 'Controller creates an AgentRun CR',
                desc: 'The controller reconciles the event into an ephemeral K8s Job — an agent container + IPC bridge sidecar + optional sandbox + skill sidecars with auto-provisioned RBAC.',
                color: 'claw-purple',
                icon: '⚡',
              },
              {
                step: '3',
                title: 'Agent calls LLM provider',
                desc: 'The agent container calls OpenAI, Anthropic, Azure, Ollama, a cluster-local Model via modelRef, or any compatible endpoint — with skills mounted as files, persistent memory provided by a SQLite + FTS5 sidecar on a PersistentVolume, and tool sidecars providing runtime capabilities.',
                color: 'claw-orange',
                icon: '\u{1F9E0}',
              },
              {
                step: '4',
                title: 'Results flow back through the bus',
                desc: 'Results travel: IPC bridge → NATS → channel pod → user. The memory server persists findings to SQLite on a PVC that survives across ephemeral agent runs.',
                color: 'claw-cyan',
                icon: '\u{1F4E1}',
              },
              {
                step: '5',
                title: 'Web endpoints expose agents as APIs',
                desc: 'Agents with the web-endpoint skill get a long-lived Deployment with a web-proxy sidecar. Envoy Gateway routes OpenAI-compatible and MCP requests, creating per-request AgentRun Jobs.',
                color: 'claw-orange',
                icon: '\u{1F310}',
              },
              {
                step: '6',
                title: 'MCP servers extend agent capabilities',
                desc: 'MCPServer CRDs define external tool providers using the Model Context Protocol. The controller deploys managed servers or connects to external ones, probes for available tools, and injects an mcp-bridge sidecar into agent pods. Tool names are prefixed to avoid collisions across providers.',
                color: 'claw-cyan',
                icon: '\u{1F50C}',
              },
              {
                step: '7',
                title: 'Everything is a K8s resource',
                desc: 'Agents, agent configs, runs, policies, skills, schedules, models, and MCP servers are all CRDs. Lifecycle is managed by controllers. Access is gated by admission webhooks. Network isolation is enforced by NetworkPolicy.',
                color: 'claw-green',
                icon: '☸️',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className={stepStyles[item.color].box}>{item.icon}</div>
                  {i < 6 && (
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent mt-2" />
                  )}
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={stepStyles[item.color].badge}>STEP {item.step}</span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Topology */}
        <div className="max-w-6xl mx-auto">
          <TopologyDemo />
        </div>
      </div>
    </section>
  )
}
