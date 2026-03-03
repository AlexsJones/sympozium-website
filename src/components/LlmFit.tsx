export default function LlmFit() {
  return (
    <section className="relative py-32 overflow-hidden">
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
            Skill Spotlight
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Right-size LLMs for your cluster with
            <br />
            <span className="bg-gradient-to-r from-claw-green to-claw-cyan bg-clip-text text-transparent">
              llmfit
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A Sympozium skill that inspects your Kubernetes cluster — nodes, CPUs, memory, GPUs — and
            recommends which LLM models will actually run on your hardware.
          </p>
        </div>

        {/* Content: image + details side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Screenshot */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-claw-green/20 via-claw-cyan/20 to-kube-blue/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-surface-light/50">
              <img
                src="/llmfit.png"
                alt="llmfit cluster analysis showing model recommendations for a Kubernetes cluster"
                className="w-full h-auto"
              />
            </div>
          </div>

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
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/AlexsJones/llmfit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View llmfit on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
