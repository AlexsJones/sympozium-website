const agentConfigs = [
  {
    role: 'SRE On-Call',
    pack: 'platform-team',
    skills: ['k8s-ops', 'incident-response'],
    description:
      'Always-on agent that monitors cluster health, triages incidents, and performs rollbacks — every 30 minutes.',
    tasks: [
      'Why is checkout-service crash-looping?',
      'Roll back payments-api to the previous version',
      'Top 5 resource-hungry pods across the cluster',
    ],
    color: 'from-claw-orange to-claw-red',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    role: 'Security Auditor',
    pack: 'platform-team',
    skills: ['code-review', 'k8s-ops'],
    description:
      'Daily scans for privilege escalation, hardcoded secrets, missing NetworkPolicies — under a restrictive policy that blocks before it breaks.',
    tasks: [
      'Which ServiceAccounts have cluster-admin?',
      'Any deployments using :latest tags?',
      'Check Helm values for hardcoded secrets',
    ],
    color: 'from-claw-green to-claw-cyan',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    role: 'DevOps / Platform Eng',
    pack: 'devops-essentials',
    skills: ['k8s-ops', 'code-review'],
    description:
      'General-purpose agent for day-to-day ops — scaling, namespace provisioning, rollout history, node drains — running permissive on dev clusters.',
    tasks: [
      'Scale frontend to 5 replicas in staging',
      'Create namespace feature-xyz with LimitRange',
      'Drain worker-3 without violating PDBs',
    ],
    color: 'from-kube-blue to-claw-purple',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.384 3.181 1.028-5.993L2.114 7.63l6.016-.874L11.42 1.5l2.692 5.256 6.016.874-4.95 4.728 1.028 5.993z" />
      </svg>
    ),
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-purple/10 border border-claw-purple/20 text-claw-purple text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            Who It's For
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Activate an Ensemble.
            <br />
            <span className="bg-gradient-to-r from-claw-orange to-claw-purple bg-clip-text text-transparent">
              Get a team of agents instantly.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Sympozium ships with <span className="text-claw-cyan font-medium">built-in Ensembles</span> — pre-configured
            bundles of agent configs, each with its own system prompt, skills, tool policy, schedule, and persistent memory.
            Activate an ensemble in the TUI, enter your API key, and the controller stamps out all agents automatically.
            Think of them as <span className="text-white font-medium">Helm Charts for AI agents</span>.
          </p>
        </div>

        {/* Agent config cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {agentConfigs.map((agentCfg, i) => (
            <div
              key={i}
              className="group relative rounded-2xl bg-surface-light/50 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agentCfg.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Header */}
              <div className="p-8 pb-0">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agentCfg.color} p-[1px] mb-5`}>
                  <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center text-white">
                    {agentCfg.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{agentCfg.role}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-claw-cyan/10 text-claw-cyan border border-claw-cyan/20">
                    {agentCfg.pack}
                  </span>
                  {agentCfg.skills.map((skill) => (
                    <span key={skill} className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{agentCfg.description}</p>
              </div>

              {/* Example tasks */}
              <div className="p-8 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Example tasks</p>
                <div className="space-y-2">
                  {agentCfg.tasks.map((task, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-claw-orange mt-0.5 shrink-0">&#x276F;</span>
                      <span className="font-mono text-xs leading-relaxed">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Built-in Ensembles */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Built-in Ensembles</h3>
            <p className="text-sm text-slate-400">Ship with Sympozium — activate via the TUI or <span className="font-mono text-claw-cyan text-xs">kubectl</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* platform-team pack */}
            <div className="relative rounded-2xl border border-claw-cyan/20 bg-surface-light/30 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-claw-cyan/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-cyan to-kube-blue p-[1px]">
                    <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m10.5-6v4.5m0-4.5h-4.5m4.5 0L15 9m-10.5 6v4.5m0-4.5h4.5m-4.5 0L9 15m10.5 6v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono">platform-team</h4>
                    <span className="text-xs text-claw-cyan">Platform</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Core platform engineering — security audits, cluster health monitoring, and scheduled manifest review.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Security Guardian', 'SRE Watchdog', 'Platform Engineer'].map((name) => (
                    <span key={name} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-claw-cyan/10 text-claw-cyan border border-claw-cyan/20">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* devops-essentials pack */}
            <div className="relative rounded-2xl border border-claw-orange/20 bg-surface-light/30 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-claw-orange/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-orange to-claw-red p-[1px]">
                    <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.384 3.181 1.028-5.993L2.114 7.63l6.016-.874L11.42 1.5l2.692 5.256 6.016.874-4.95 4.728 1.028 5.993z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono">devops-essentials</h4>
                    <span className="text-xs text-claw-orange">DevOps</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  DevOps workflows — incident triage, resource right-sizing, and cost optimisation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Incident Responder', 'Cost Analyzer'].map((name) => (
                    <span key={name} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-claw-orange/10 text-claw-orange border border-claw-orange/20">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* developer-team pack */}
            <div className="relative rounded-2xl border border-claw-purple/20 bg-surface-light/30 p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-claw-purple/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-purple to-kube-blue p-[1px]">
                    <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-mono">developer-team</h4>
                    <span className="text-xs text-claw-purple">Software Development</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  A full 7-agent dev team that collaborates on a single GitHub repo — triaging issues, writing code, reviewing PRs, running tests, and shipping docs.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Tech Lead', 'Backend Dev', 'Frontend Dev', 'QA Engineer', 'Code Reviewer', 'DevOps Engineer', 'Docs Writer'].map((name) => (
                    <span key={name} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-claw-purple/10 text-claw-purple border border-claw-purple/20">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ensemble TUI demo */}
          <div className="mt-10 max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <img
                src="/personas.gif"
                alt="Ensemble activation in the Sympozium TUI — select an ensemble, enter API key, agents deploy automatically"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-sm text-slate-500 font-mono text-center">
              Activating the platform-team Ensemble — 3 agents deployed in seconds
            </p>
          </div>

          {/* How it works strip */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-surface-light/20 p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-kube-blue/20 text-kube-blue text-xs font-bold flex items-center justify-center">1</span>
                <span className="text-slate-300">Pick a pack in the TUI</span>
              </div>
              <svg className="w-4 h-4 text-slate-600 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-claw-purple/20 text-claw-purple text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-slate-300">Enter your API key</span>
              </div>
              <svg className="w-4 h-4 text-slate-600 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-claw-green/20 text-claw-green text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-slate-300">Controller creates all agents</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-3">
              Each agent config gets an Agent, SympoziumSchedule, and seeded memory ConfigMap — all with ownerReferences for cascading cleanup.
            </p>
          </div>

          {/* Custom pack callout */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Need something different? <span className="text-white font-medium">Write your own Ensemble</span> — define agent configs with custom system prompts, skills, schedules, and memory seeds, then <span className="font-mono text-claw-cyan text-xs">kubectl apply</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
