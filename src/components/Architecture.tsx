import RunLifecycle from './RunLifecycle'
import TransmissionDiagram from './TransmissionDiagram'

const highlights = [
  {
    title: 'Gated at admission',
    desc: 'Tools and features are checked by the SympoziumPolicy admission webhook before a pod is ever created.',
  },
  {
    title: 'Least-privilege RBAC',
    desc: 'Every run gets ephemeral Role/ClusterRole credentials — auto-revoked the moment the Job finishes.',
  },
  {
    title: 'Sealed network path',
    desc: 'Deny-all egress NetworkPolicy: agents reach skills, memory, and the bus only through the IPC bridge.',
  },
  {
    title: 'Models are claimed, not placed',
    desc: 'Agents declare a ModelClaim; llmfit-dra and the stock kube-scheduler decide where compute happens. Sympozium never picks a node.',
  },
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
        </div>

        {/* Compact: text on the side + transmission SVG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Kubernetes is the substrate.{' '}
              <span className="bg-gradient-to-r from-kube-blue to-claw-cyan bg-clip-text text-transparent">
                The control is ours.
              </span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-7">
              Pods, Jobs, CRDs and RBAC give us a battle-tested substrate. On top of it Sympozium runs a{' '}
              <span className="text-white font-medium">tightly controlled transmission system</span> — every
              exchange between an agent and its skills, tools, memory, and teammates passes through gated,
              policy-checked channels. Nothing moves until admission control, RBAC, and network policy allow it.
            </p>
            <ul className="space-y-4">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-kube-blue/10 border border-kube-blue/30 flex items-center justify-center text-kube-blue">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-white font-semibold text-sm">{h.title}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{h.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <TransmissionDiagram />
        </div>

        {/* Lifecycle of a single run */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">One run, start to finish</h3>
            <p className="text-sm text-slate-400">
              From <span className="font-mono text-slate-300">kubectl apply</span> to garbage collection —
              every step is a Kubernetes resource, gated on the way in and revoked on the way out
            </p>
          </div>
          <RunLifecycle />
        </div>
      </div>
    </section>
  )
}
