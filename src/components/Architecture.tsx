import TopologyDemo from './TopologyDemo'

const stepStyles: Record<string, { box: string; badge: string }> = {
  'kube-blue': {
    box: 'w-12 h-12 bg-kube-blue/10 border border-kube-blue/30 flex items-center justify-center text-kube-blue',
    badge: 'text-xs font-bold text-kube-blue bg-kube-blue/10 px-2 py-0.5',
  },
  'claw-purple': {
    box: 'w-12 h-12 bg-claw-purple/10 border border-claw-purple/30 flex items-center justify-center text-claw-purple',
    badge: 'text-xs font-bold text-claw-purple bg-claw-purple/10 px-2 py-0.5',
  },
  'claw-orange': {
    box: 'w-12 h-12 bg-claw-orange/10 border border-claw-orange/30 flex items-center justify-center text-claw-orange',
    badge: 'text-xs font-bold text-claw-orange bg-claw-orange/10 px-2 py-0.5',
  },
  'claw-cyan': {
    box: 'w-12 h-12 bg-claw-cyan/10 border border-claw-cyan/30 flex items-center justify-center text-claw-cyan',
    badge: 'text-xs font-bold text-claw-cyan bg-claw-cyan/10 px-2 py-0.5',
  },
  'claw-green': {
    box: 'w-12 h-12 bg-claw-green/10 border border-claw-green/30 flex items-center justify-center text-claw-green',
    badge: 'text-xs font-bold text-claw-green bg-claw-green/10 px-2 py-0.5',
  },
}

const STEP_ICONS = [
  // 1: Message — chat box
  <svg key="1" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="11" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 14v3l4-3" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="7" width="6" height="1.5" fill="currentColor" />
    <rect x="5" y="10" width="4" height="1.5" fill="currentColor" />
  </svg>,
  // 2: Controller — bolt
  <svg key="2" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <path d="M11 2L5 10h4l-2 8 8-10h-5l3-6z" fill="currentColor" />
  </svg>,
  // 3: LLM — brain/chip
  <svg key="3" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <rect x="4" y="4" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
    <rect x="7" y="7" width="6" height="6" fill="currentColor" />
    <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="16" x2="10" y2="19" stroke="currentColor" strokeWidth="1.5" />
    <line x1="1" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // 4: Results — signal/broadcast
  <svg key="4" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <rect x="8" y="8" width="4" height="4" fill="currentColor" />
    <path d="M5 5a8 8 0 000 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M15 5a8 8 0 010 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M3 2a12 12 0 000 16" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M17 2a12 12 0 010 16" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>,
  // 5: Web endpoint — globe/grid
  <svg key="5" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1" />
    <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="10" cy="10" rx="4" ry="8" stroke="currentColor" strokeWidth="1" />
  </svg>,
  // 6: MCP / plug
  <svg key="6" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="7" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="7" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="2" />
    <rect x="5" y="9" width="2" height="2" fill="currentColor" />
    <rect x="13" y="9" width="2" height="2" fill="currentColor" />
  </svg>,
  // 7: K8s resource — grid/helm
  <svg key="7" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    <rect x="4" y="4" width="3" height="3" fill="currentColor" />
    <rect x="13" y="4" width="3" height="3" fill="currentColor" />
    <rect x="4" y="13" width="3" height="3" fill="currentColor" />
    <rect x="13" y="13" width="3" height="3" fill="currentColor" />
  </svg>,
]


export default function Architecture() {
  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kube-blue/10 border border-kube-blue/20 text-kube-blue text-sm font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
              <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
              <rect x="5" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
              <line x1="4" y1="7" x2="8" y2="9" stroke="currentColor" strokeWidth="1" />
              <line x1="12" y1="7" x2="8" y2="9" stroke="currentColor" strokeWidth="1" />
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
              },
              {
                step: '2',
                title: 'Controller creates an AgentRun CR',
                desc: 'The controller reconciles the event into an ephemeral K8s Job — an agent container + IPC bridge sidecar + optional sandbox + skill sidecars with auto-provisioned RBAC.',
                color: 'claw-purple',
              },
              {
                step: '3',
                title: 'Agent calls LLM provider',
                desc: 'The agent container calls OpenAI, Anthropic, Azure, Ollama, a cluster-local Model via modelRef, or any compatible endpoint — with skills mounted as files, persistent memory provided by a SQLite + FTS5 sidecar on a PersistentVolume, and tool sidecars providing runtime capabilities.',
                color: 'claw-orange',
              },
              {
                step: '4',
                title: 'Results flow back through the bus',
                desc: 'Results travel: IPC bridge → NATS → channel pod → user. The memory server persists findings to SQLite on a PVC that survives across ephemeral agent runs.',
                color: 'claw-cyan',
              },
              {
                step: '5',
                title: 'Web endpoints expose agents as APIs',
                desc: 'Agents with the web-endpoint skill get a long-lived Deployment with a web-proxy sidecar. Envoy Gateway routes OpenAI-compatible and MCP requests, creating per-request AgentRun Jobs.',
                color: 'claw-orange',
              },
              {
                step: '6',
                title: 'MCP servers extend agent capabilities',
                desc: 'MCPServer CRDs define external tool providers using the Model Context Protocol. The controller deploys managed servers or connects to external ones, probes for available tools, and injects an mcp-bridge sidecar into agent pods. Tool names are prefixed to avoid collisions across providers.',
                color: 'claw-cyan',
              },
              {
                step: '7',
                title: 'Everything is a K8s resource',
                desc: 'Agents, agent configs, runs, policies, skills, schedules, models, and MCP servers are all CRDs. Lifecycle is managed by controllers. Access is gated by admission webhooks. Network isolation is enforced by NetworkPolicy.',
                color: 'claw-green',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className={stepStyles[item.color].box}>{STEP_ICONS[i]}</div>
                  {i < 6 && (
                    <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent mt-1" />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className={stepStyles[item.color].badge}>STEP {item.step}</span>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{item.desc}</p>
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
