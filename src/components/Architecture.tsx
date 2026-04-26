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

/* tiny arrow connector */
function Arrow({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1 py-2 ${className}`}>
      <div className="w-px h-6 bg-gradient-to-b from-white/30 to-white/10" />
      {label && (
        <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">{label}</span>
      )}
      <svg className="w-3 h-3 text-white/30" fill="currentColor" viewBox="0 0 12 12">
        <path d="M6 9L1 4h10L6 9z" />
      </svg>
    </div>
  )
}

/* node card */
function Node({
  label,
  sub,
  color = 'white',
  small,
}: {
  label: string
  sub?: string
  color?: string
  small?: boolean
}) {
  const colorMap: Record<string, string> = {
    blue:   'bg-kube-blue/10 border-kube-blue/30 text-kube-blue',
    purple: 'bg-claw-purple/10 border-claw-purple/30 text-claw-purple',
    orange: 'bg-claw-orange/10 border-claw-orange/30 text-claw-orange',
    red:    'bg-claw-red/10 border-claw-red/30 text-claw-red',
    cyan:   'bg-claw-cyan/10 border-claw-cyan/30 text-claw-cyan',
    green:  'bg-claw-green/10 border-claw-green/30 text-claw-green',
    yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    white:  'bg-white/5 border-white/10 text-slate-400',
  }
  const c = colorMap[color] ?? colorMap.white
  return (
    <div
      className={`rounded-lg border backdrop-blur-sm transition-colors hover:brightness-125 ${c} ${
        small ? 'px-2.5 py-1.5 text-[10px]' : 'px-4 py-2.5 text-xs'
      } font-mono text-center`}
    >
      <div className="font-bold">{label}</div>
      {sub && <div className="mt-0.5 opacity-70 text-[10px] leading-tight">{sub}</div>}
    </div>
  )
}

/* boxed group */
function Group({
  title,
  color,
  children,
  className = '',
}: {
  title: string
  color: string
  children: React.ReactNode
  className?: string
}) {
  const borderMap: Record<string, string> = {
    red:    'border-claw-red/30',
    purple: 'border-claw-purple/30',
    orange: 'border-claw-orange/30',
    blue:   'border-kube-blue/30',
    green:  'border-claw-green/30',
    cyan:   'border-claw-cyan/30',
    yellow: 'border-yellow-500/30',
    white:  'border-white/10',
  }
  const textMap: Record<string, string> = {
    red:    'text-claw-red',
    purple: 'text-claw-purple',
    orange: 'text-claw-orange',
    blue:   'text-kube-blue',
    green:  'text-claw-green',
    cyan:   'text-claw-cyan',
    yellow: 'text-yellow-400',
    white:  'text-slate-400',
  }
  return (
    <div
      className={`relative rounded-xl border bg-surface/40 backdrop-blur-sm p-4 ${
        borderMap[color] ?? borderMap.white
      } ${className}`}
    >
      <span
        className={`absolute -top-2.5 left-4 px-2 text-[10px] font-bold uppercase tracking-wider bg-surface ${
          textMap[color] ?? textMap.white
        }`}
      >
        {title}
      </span>
      {children}
    </div>
  )
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

        {/* Full Architectural Diagram */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">System Overview</h3>
            <p className="text-sm text-slate-400">
              The full Sympozium architecture inside a Kubernetes cluster
            </p>
          </div>

          <div className="rounded-2xl bg-surface-light/20 border border-white/5 p-6 sm:p-10 overflow-x-auto">
            {/* outer cluster frame */}
            <div className="relative rounded-xl border border-white/10 bg-surface/60 p-6 sm:p-8 min-w-[700px]">
              <span className="absolute -top-3 left-6 px-3 py-0.5 text-xs font-bold uppercase tracking-wider bg-surface text-slate-400 border border-white/10 rounded-md">
                Kubernetes Cluster
              </span>

              {/* Row 0: External actors */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-claw-green/20 border border-claw-green/40 flex items-center justify-center text-sm">{'\u{1F464}'}</div>
                  <div className="text-xs font-mono">
                    <div className="text-claw-green font-bold">User / Chat Client</div>
                    <div className="text-slate-500">Telegram · Slack · Discord · WhatsApp</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono text-right">
                    <div className="text-claw-orange font-bold">HTTP / API Client</div>
                    <div className="text-slate-500">REST · MCP · OpenAI-compat</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-claw-orange/20 border border-claw-orange/40 flex items-center justify-center text-sm">{'\u{1F310}'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono text-right">
                    <div className="text-kube-blue font-bold">Operator / SRE</div>
                    <div className="text-slate-500">sympozium TUI · Web UI · kubectl · k9s</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-kube-blue/20 border border-kube-blue/40 flex items-center justify-center text-sm">{'\u{1F6E0}'}</div>
                </div>
              </div>

              {/* connecting arrows from actors */}
              <div className="flex justify-between px-6 mb-2">
                <Arrow label="messages" />
                <Arrow label="REST · MCP" />
                <Arrow label="sympozium TUI / kubectl" />
              </div>

              {/* Row 1: Channel pods + Web Endpoints + Control Plane */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <Group title="Channel Pods · one Deployment per type" color="blue">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node label="Telegram" color="blue" small />
                    <Node label="Slack" color="blue" small />
                    <Node label="Discord" color="blue" small />
                    <Node label="WhatsApp" color="blue" small />
                  </div>
                </Group>

                <Group title="Web Endpoints · long-lived Deployments" color="orange">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node label="Web Proxy" sub="OpenAI-compat API + MCP" color="orange" />
                    <Node label="Envoy Gateway" sub="HTTPRoute per instance" color="orange" small />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500">
                    Gateway routes traffic → Web Proxy → creates AgentRun Jobs
                  </div>
                </Group>

                <Group title="Control Plane" color="red">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="Controller Manager"
                      sub="Agent · AgentConfig · AgentRun · Ensemble · Model · SympoziumPolicy · SkillPack · SympoziumSchedule · MCPServer"
                      color="purple"
                    />
                    <Node label="API Server" sub="HTTP + WebSocket" color="orange" />
                    <Node label="Admission Webhook" sub="Policy enforcement" color="red" />
                  </div>
                </Group>
              </div>

              {/* NATS bus (central) */}
              <div className="flex justify-center my-3">
                <div className="relative px-8 py-3 rounded-xl bg-claw-red/15 border border-claw-red/40 text-claw-red font-mono text-sm font-bold flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  NATS JetStream · Event Bus
                  <div className="absolute -top-2 left-1/4 w-px h-2 bg-claw-red/40" />
                  <div className="absolute -top-2 right-1/4 w-px h-2 bg-claw-red/40" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-2 bg-claw-red/40" />
                </div>
              </div>

              <Arrow label="tasks" />

              {/* Row 2: Agent Pod + Scheduled Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <Group title="Agent Pod · ephemeral K8s Job" color="blue" className="lg:col-span-2">
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Node label="Agent Container" sub="LLM provider agnostic" color="blue" />
                    <div className="flex flex-col items-center justify-center text-[10px] font-mono text-slate-500 gap-1">
                      <span>/ipc volume</span>
                      <span className="text-white/30">{'⟷'}</span>
                    </div>
                    <Node label="IPC Bridge" sub="fsnotify → NATS" color="cyan" />
                    <Node label="Memory Server" sub="SQLite + FTS5 · HTTP API" color="purple" />
                    <Node label="MCP Bridge" sub="HTTP/stdio adapter" color="cyan" small />
                    <Node label="Sandbox" sub="optional sidecar" color="orange" small />
                    <Node label="Skill Sidecars" sub="kubectl, helm, etc. · auto-RBAC" color="green" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <span className="text-claw-green/60">{'↳'}</span> /workspace volume shared
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <span className="text-claw-purple/60">{'↳'}</span> /skills mounted from ConfigMap
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <span className="text-claw-cyan/60">{'↳'}</span> memory_search · memory_store · memory_list via HTTP
                    </div>
                  </div>
                </Group>

                <Group title="Scheduled Tasks" color="yellow">
                  <div className="mt-2 space-y-2">
                    <Node label="SympoziumSchedule Controller" sub="Cron-based reconciler" color="yellow" />
                    <Node label="Schedule Router" sub="NATS → SympoziumSchedule CRD" color="yellow" small />
                    <div className="text-[10px] font-mono text-center text-slate-500">
                      creates AgentRuns on schedule {'→'}
                    </div>
                  </div>
                </Group>
              </div>

              {/* Row 3: MCP Servers + Skill RBAC + Persistent Memory */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Group title="MCP Servers · external tool providers" color="cyan">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="MCPServer Controller"
                      sub="Deployment + Service · tool discovery"
                      color="cyan"
                    />
                    <Node
                      label="MCP Bridge Sidecar"
                      sub="SSE/stdio adapter"
                      color="cyan"
                      small
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                    <div>Controller deploys & probes tools</div>
                    <div>Bridge injects into Agent Pods</div>
                  </div>
                </Group>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Group title="Skill RBAC · ephemeral, least-privilege" color="green">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="Role + RoleBinding"
                      sub="namespace-scoped · ownerRef → AgentRun"
                      color="green"
                    />
                    <Node
                      label="ClusterRole + Binding"
                      sub="cluster-scoped · label-based cleanup"
                      color="green"
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500">
                    Controller creates / deletes · Skill sidecars use
                  </div>
                </Group>

                <Group title="Persistent Memory · two-tier" color="purple">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="SQLite + FTS5"
                      sub="PVC · memory.db · full-text search"
                      color="purple"
                    />
                    <Node
                      label="ConfigMap"
                      sub="MEMORY.md · legacy fallback"
                      color="white"
                      small
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                    <div>Memory server sidecar → SQLite on PersistentVolume</div>
                    <div>memory_search (FTS5) · memory_store · memory_list</div>
                    <div>PVC outlives ephemeral agent pods</div>
                  </div>
                </Group>
              </div>

              {/* Row 4: Local Model Inference + Node Probe */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Group title="Local Model Inference · Model CRD" color="purple">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="Model Controller"
                      sub="download → PVC → llama-server → Service"
                      color="purple"
                    />
                    <Node
                      label="llama-server"
                      sub="Deployment + ClusterIP Service"
                      color="purple"
                      small
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                    <div>Declarative GGUF model deployment</div>
                    <div>modelRef on AgentRun + Ensemble auto-resolves</div>
                    <div>Node placement for GPU/CPU targeting</div>
                  </div>
                </Group>

                <Group title="Node Probe · DaemonSet (opt-in)" color="yellow">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Node
                      label="Node Probe"
                      sub="Ollama · vLLM · llama-cpp discovery"
                      color="yellow"
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                    <div>Probes localhost for inference providers</div>
                    <div>Annotates nodes: sympozium.ai/inference-*</div>
                  </div>
                </Group>
              </div>

              {/* Row 5: Data Layer */}
              <Group title="Data Layer" color="white">
                <div className="flex flex-wrap gap-3 mt-2 justify-center">
                  <Node label="etcd" sub="CRDs, state" color="white" />
                  <Node label="PostgreSQL" sub="sessions, history" color="white" />
                  <Node label="PersistentVolumes" sub="memory.db per instance" color="white" />
                  <Node label="SkillPack ConfigMaps" sub="mounted at /skills" color="white" />
                </div>
              </Group>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-kube-blue/30 border border-kube-blue/50" /> Channels
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-purple/30 border border-claw-purple/50" /> Control Plane
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-orange/30 border border-claw-orange/50" /> Web Endpoints
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-red/30 border border-claw-red/50" /> Event Bus
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-green/30 border border-claw-green/50" /> RBAC / Security
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-cyan/30 border border-claw-cyan/50" /> IPC / MCP Bridge
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-claw-purple/30 border border-claw-purple/50" /> Memory
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-yellow-500/30 border border-yellow-500/50" /> Scheduling / Node Probe
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
