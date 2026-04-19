export default function Workflows() {
  return (
    <section id="workflows" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-claw-purple/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-claw-orange/8 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-orange/10 border border-claw-orange/20 text-claw-orange text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            New in v0.8.27
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Agents that work
            <br />
            <span className="bg-gradient-to-r from-claw-orange to-claw-purple bg-clip-text text-transparent">
              together, not just side by side.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Workflows turn Ensembles from static bundles into coordinated teams.
            Define <span className="text-white font-medium">typed relationships</span> between personas &mdash;
            delegation, sequencing, supervision &mdash; and let agents hand off tasks,
            share knowledge, and run pipelines automatically.
          </p>
        </div>

        {/* Hero image + feature highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Screenshot */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-claw-purple/20 via-claw-orange/20 to-claw-cyan/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <img
                src="/workflow.png"
                alt="Workflow canvas showing a research team with delegation and sequential relationships between Research Lead, Researcher, Writer, and Reviewer personas"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-4 text-sm text-slate-500 font-mono text-center">
              Visual workflow canvas &mdash; drag-to-connect personas, pick relationship types, save to CRD
            </p>
          </div>

          {/* Key capabilities */}
          <div className="space-y-6">
            {/* Delegation */}
            <div className="rounded-2xl bg-surface-light/30 border border-white/5 p-6 hover:border-claw-purple/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-purple to-kube-blue p-[1px]">
                  <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-claw-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Delegation</h3>
                  <p className="text-sm text-claw-purple">Runtime task hand-off</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                One persona requests work from another and waits for the result before continuing.
                The Research Lead delegates to the Researcher, gets findings back, then decides next steps.
              </p>
            </div>

            {/* Sequential */}
            <div className="rounded-2xl bg-surface-light/30 border border-white/5 p-6 hover:border-claw-orange/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-orange to-claw-red p-[1px]">
                  <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-claw-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sequential Pipelines</h3>
                  <p className="text-sm text-claw-orange">Ordered execution chains</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Define strict ordering &mdash; one persona must finish before the next begins.
                Writer completes the draft, <em>then</em> Reviewer starts quality checks. No gaps, no race conditions.
              </p>
            </div>

            {/* Supervision */}
            <div className="rounded-2xl bg-surface-light/30 border border-white/5 p-6 hover:border-claw-cyan/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-claw-cyan to-claw-green p-[1px]">
                  <div className="w-full h-full rounded-xl bg-surface-light flex items-center justify-center">
                    <svg className="w-5 h-5 text-claw-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Supervision</h3>
                  <p className="text-sm text-claw-cyan">Observability without interference</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                A supervisor persona monitors others for progress tracking and reporting &mdash;
                without blocking or altering their execution. Full visibility, zero overhead.
              </p>
            </div>
          </div>
        </div>

        {/* Shared Workflow Memory */}
        <div className="rounded-2xl border border-white/5 bg-surface-light/20 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-cyan/10 border border-claw-cyan/20 text-claw-cyan text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
                </svg>
                Shared Workflow Memory
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                A shared brain for every team
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Each Ensemble gets a dedicated SQLite memory pool that all personas can read and write.
                Facts discovered by the Researcher are instantly available to the Writer.
                Feedback from the Reviewer shapes future research. Knowledge compounds across runs.
              </p>
              <ul className="space-y-3">
                {[
                  'Auto-attributed entries — every fact tagged with its source persona',
                  'Per-persona access control — read-write or read-only',
                  'Auto-context injection — top results appear in system prompts',
                  'Persisted on PVC — survives pod restarts and redeployments',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-claw-cyan shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Memory flow diagram */}
            <div className="relative">
              <div className="rounded-xl border border-white/10 bg-surface/80 p-6 font-mono text-sm space-y-4">
                {/* Store */}
                <div>
                  <span className="text-slate-500"># Researcher stores a finding</span>
                  <div className="mt-1 text-claw-cyan">workflow_memory_store</div>
                  <div className="text-slate-400 pl-4">
                    key: <span className="text-claw-orange">"k8s-crd-patterns"</span><br />
                    value: <span className="text-claw-green">"Owner references enable cascading deletes..."</span><br />
                    source: <span className="text-claw-purple">"researcher"</span>
                  </div>
                </div>
                <div className="border-t border-white/5" />
                {/* Search */}
                <div>
                  <span className="text-slate-500"># Writer searches team knowledge</span>
                  <div className="mt-1 text-claw-cyan">workflow_memory_search</div>
                  <div className="text-slate-400 pl-4">
                    query: <span className="text-claw-orange">"CRD best practices"</span>
                  </div>
                </div>
                <div className="border-t border-white/5" />
                {/* Result */}
                <div>
                  <span className="text-slate-500"># Returns attributed results</span>
                  <div className="text-slate-400 pl-4">
                    <span className="text-claw-purple">[researcher]</span> <span className="text-claw-green">"Owner references enable..."</span><br />
                    <span className="text-claw-purple">[lead]</span> <span className="text-claw-green">"Validation webhooks should..."</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live status strip */}
        <div className="mt-10 rounded-2xl border border-white/5 bg-surface-light/20 p-6">
          <div className="text-center mb-5">
            <h3 className="text-lg font-bold text-white">Live Status on the Canvas</h3>
            <p className="text-sm text-slate-500">Real-time visual indicators show what every persona is doing right now</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: 'Running', color: 'bg-kube-blue', ring: 'ring-kube-blue/40' },
              { label: 'Serving', color: 'bg-claw-purple', ring: 'ring-claw-purple/40' },
              { label: 'Awaiting Delegate', color: 'bg-claw-orange', ring: 'ring-claw-orange/40' },
              { label: 'Succeeded', color: 'bg-claw-green', ring: 'ring-claw-green/40' },
              { label: 'Failed', color: 'bg-claw-red', ring: 'ring-claw-red/40' },
            ].map((status) => (
              <div key={status.label} className="flex items-center gap-2 text-sm">
                <span className={`w-3 h-3 rounded-full ${status.color} ring-4 ${status.ring} animate-pulse`} />
                <span className="text-slate-300">{status.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow types */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Autonomous */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-green to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-green">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">Autonomous</h4>
                  <span className="text-xs font-mono text-claw-green">workflowType: autonomous</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Each persona runs independently on its own schedule. No coordination overhead &mdash; ideal for diverse, independent tasks.
              </p>
            </div>
          </div>

          {/* Pipeline */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-orange to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-orange">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">Pipeline</h4>
                  <span className="text-xs font-mono text-claw-orange">workflowType: pipeline</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Personas execute in strict order defined by sequential edges. Perfect for review chains, approval flows, and staged processing.
              </p>
            </div>
          </div>

          {/* Delegation */}
          <div className="rounded-2xl bg-surface-light/30 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-claw-purple to-transparent" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-claw-purple">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-base font-bold text-white">Delegation</h4>
                  <span className="text-xs font-mono text-claw-purple">workflowType: delegation</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Personas actively delegate tasks to each other at runtime. A lead breaks down work and assigns it to specialists dynamically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
