import ClaimFlow from './ClaimFlow'

export default function LlmFit() {
  return (
    <section id="models" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-claw-green/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kube-blue/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claw-green/10 border border-claw-green/20 text-claw-green text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Model Capability
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Heterogeneous
            <br />
            <span className="bg-gradient-to-r from-claw-green to-claw-cyan bg-clip-text text-transparent">
              Model Provisioning
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Mixed hardware, one contract: agents ask for a model and a speed, not a device. Powered by{' '}
            <a href="https://github.com/AlexsJones/llmfit" target="_blank" rel="noopener noreferrer" className="text-claw-green hover:underline">llmfit</a>,
            which inspects your cluster — nodes, CPUs, memory, GPUs — and knows which models will actually
            run on your hardware, and{' '}
            <a href="https://github.com/sympozium-ai/llmfit-dra" target="_blank" rel="noopener noreferrer" className="text-claw-cyan hover:underline">llmfit-dra</a>,
            which makes that physics scheduler-native so the stock kube-scheduler places the model.
            Sympozium claims models — it never picks nodes.
          </p>
        </div>

        {/* Content: image + details side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Animated claim lifecycle */}
          <ClaimFlow />

          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-claw-green/10 border border-claw-green/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-claw-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Cluster inspection</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Automatically detects node count, CPU cores, memory, GPU availability, and cluster type (Kind, EKS, GKE, etc.).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-claw-cyan/10 border border-claw-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-claw-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Smart recommendations</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Matches your hardware profile to compatible models — from small CPU-only models like Qwen2.5 1.5B to large GPU-accelerated deployments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-kube-blue/10 border border-kube-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-kube-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Runs as a skill sidecar</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Deploys as an isolated sidecar container with ephemeral RBAC — inspects your cluster, reports findings, and cleans up after itself.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-claw-purple/10 border border-claw-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-claw-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Ask for a model, not a device</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    With llmfit-dra installed, a ModelClaim ("Qwen at ≥20 tok/s") compiles the fit physics into
                    a claim the stock kube-scheduler satisfies — exclusive allocation, exact shortfalls when
                    nothing fits, and no node pinning anywhere in Sympozium.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
