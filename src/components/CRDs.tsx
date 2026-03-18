const crdStyles: Record<string, { card: string; name: string }> = {
  'kube-blue': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-kube-blue/30 transition-all duration-300',
    name: 'text-kube-blue font-mono text-sm font-bold mb-2',
  },
  'claw-purple': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-claw-purple/30 transition-all duration-300',
    name: 'text-claw-purple font-mono text-sm font-bold mb-2',
  },
  'claw-red': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-claw-red/30 transition-all duration-300',
    name: 'text-claw-red font-mono text-sm font-bold mb-2',
  },
  'claw-orange': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-claw-orange/30 transition-all duration-300',
    name: 'text-claw-orange font-mono text-sm font-bold mb-2',
  },
  'claw-green': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-claw-green/30 transition-all duration-300',
    name: 'text-claw-green font-mono text-sm font-bold mb-2',
  },
  'claw-cyan': {
    card: 'relative group p-6 rounded-2xl bg-surface-light/30 border border-white/5 hover:border-claw-cyan/30 transition-all duration-300',
    name: 'text-claw-cyan font-mono text-sm font-bold mb-2',
  },
}

const crds = [
  {
    name: 'SympoziumInstance',
    analogy: 'Namespace / Tenant',
    description: 'Per-user gateway — channels, provider config, memory settings, skill bindings',
    color: 'kube-blue',
  },
  {
    name: 'AgentRun',
    analogy: 'Job',
    description: 'Single agent execution — task, model, result capture, memory extraction',
    color: 'claw-purple',
  },
  {
    name: 'SympoziumPolicy',
    analogy: 'NetworkPolicy',
    description: 'Feature and tool gating — what an agent can and cannot do',
    color: 'claw-red',
  },
  {
    name: 'SkillPack',
    analogy: 'ConfigMap',
    description: 'Portable skill bundles — kubectl, Helm, or custom tools — mounted into agent pods as files, with optional sidecar containers for cluster ops',
    color: 'claw-orange',
  },
  {
    name: 'SympoziumSchedule',
    analogy: 'CronJob',
    description: 'Recurring tasks — heartbeats, sweeps, scheduled runs with cron expressions',
    color: 'claw-green',
  },
  {
    name: 'PersonaPack',
    analogy: 'Helm Chart',
    description: 'Pre-configured agent bundles — activating a pack stamps out instances, schedules, and memory for each persona',
    color: 'claw-cyan',
  },
  {
    name: 'MCPServer',
    analogy: 'Deployment + Service',
    description: 'External tool providers via Model Context Protocol — managed stdio/HTTP servers or external endpoints, auto-discovery, prefixed tool namespacing',
    color: 'kube-blue',
  },
]

export default function CRDs() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-cyan/10 border border-claw-cyan/20 text-claw-cyan text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Custom Resources
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Every concept is a{' '}
            <span className="bg-gradient-to-r from-claw-cyan to-kube-blue bg-clip-text text-transparent">
              CRD
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Sympozium models every agentic concept as a Kubernetes Custom Resource — whether you're
            running external agent workflows or giving agents the tools to manage the cluster itself.
            Familiar semantics, native tooling, GitOps-ready.
          </p>
        </div>

        {/* CRD cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {crds.map((crd, i) => (
            <div
              key={i}
              className={crdStyles[crd.color].card}
            >
              <div className={crdStyles[crd.color].name}>
                {crd.name}
              </div>
              <div className="text-xs text-slate-500 mb-3 font-mono">
                ≈ {crd.analogy}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {crd.description}
              </p>
            </div>
          ))}
        </div>

        {/* Example YAMLs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* PersonaPack YAML */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">PersonaPack: One Pack, Many Agents</h3>
              <p className="text-sm text-slate-400 mt-1">Activate a pack and the controller stamps out all agents automatically</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-lighter/50 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-claw-red/80" />
                <div className="w-3 h-3 rounded-full bg-claw-orange/80" />
                <div className="w-3 h-3 rounded-full bg-claw-green/80" />
                <span className="ml-2 text-xs text-slate-500 font-mono">platform-team.yaml</span>
              </div>
              <pre className="p-6 font-mono text-sm overflow-x-auto">
                <code>
                  <span className="text-claw-purple">apiVersion</span><span className="text-slate-500">:</span> <span className="text-claw-green">sympozium.ai/v1alpha1</span>{'\n'}
                  <span className="text-claw-purple">kind</span><span className="text-slate-500">:</span> <span className="text-claw-green">PersonaPack</span>{'\n'}
                  <span className="text-claw-purple">metadata</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">name</span><span className="text-slate-500">:</span> <span className="text-claw-green">platform-team</span>{'\n'}
                  <span className="text-claw-purple">spec</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">description</span><span className="text-slate-500">:</span> <span className="text-claw-green">"Core platform engineering agents"</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">category</span><span className="text-slate-500">:</span> <span className="text-claw-green">platform</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">personas</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">    - </span><span className="text-claw-purple">name</span><span className="text-slate-500">:</span> <span className="text-claw-green">security-guardian</span>{'\n'}
                  <span className="text-slate-500">      </span><span className="text-claw-purple">skills</span><span className="text-slate-500">:</span> <span className="text-slate-400">[</span><span className="text-claw-green">k8s-ops</span><span className="text-slate-400">]</span>{'\n'}
                  <span className="text-slate-500">      </span><span className="text-claw-purple">schedule</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">        </span><span className="text-claw-purple">type</span><span className="text-slate-500">:</span> <span className="text-claw-green">sweep</span>{'\n'}
                  <span className="text-slate-500">        </span><span className="text-claw-purple">interval</span><span className="text-slate-500">:</span> <span className="text-claw-orange">"30m"</span>{'\n'}
                  <span className="text-slate-500">    - </span><span className="text-claw-purple">name</span><span className="text-slate-500">:</span> <span className="text-claw-green">sre-watchdog</span>{'\n'}
                  <span className="text-slate-500">    - </span><span className="text-claw-purple">name</span><span className="text-slate-500">:</span> <span className="text-claw-green">platform-engineer</span>
                </code>
              </pre>
            </div>
          </div>

          {/* Schedule YAML */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white">SympoziumSchedule: Recurring Tasks</h3>
              <p className="text-sm text-slate-400 mt-1">Each persona gets its own schedule — heartbeats, sweeps, or cron</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-surface-light/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-lighter/50 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-claw-red/80" />
                <div className="w-3 h-3 rounded-full bg-claw-orange/80" />
                <div className="w-3 h-3 rounded-full bg-claw-green/80" />
                <span className="ml-2 text-xs text-slate-500 font-mono">schedule.yaml</span>
              </div>
              <pre className="p-6 font-mono text-sm overflow-x-auto">
                <code>
                  <span className="text-claw-purple">apiVersion</span><span className="text-slate-500">:</span> <span className="text-claw-green">sympozium.ai/v1alpha1</span>{'\n'}
                  <span className="text-claw-purple">kind</span><span className="text-slate-500">:</span> <span className="text-claw-green">SympoziumSchedule</span>{'\n'}
                  <span className="text-claw-purple">metadata</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">name</span><span className="text-slate-500">:</span> <span className="text-claw-green">daily-standup</span>{'\n'}
                  <span className="text-claw-purple">spec</span><span className="text-slate-500">:</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">instanceRef</span><span className="text-slate-500">:</span> <span className="text-claw-green">alice</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">schedule</span><span className="text-slate-500">:</span> <span className="text-claw-orange">"0 9 * * *"</span>      <span className="text-slate-600"># daily at 9am</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">type</span><span className="text-slate-500">:</span> <span className="text-claw-green">heartbeat</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">task</span><span className="text-slate-500">:</span> <span className="text-claw-green">"Review overnight alerts"</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">includeMemory</span><span className="text-slate-500">:</span> <span className="text-kube-blue">true</span>{'\n'}
                  <span className="text-slate-500">  </span><span className="text-claw-purple">concurrencyPolicy</span><span className="text-slate-500">:</span> <span className="text-claw-green">Forbid</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
