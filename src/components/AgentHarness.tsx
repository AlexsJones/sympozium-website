import FamilyStack from './FamilyStack'

export default function AgentHarness() {
  return (
    <section id="why" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 font-mono text-[11px] font-medium tracking-[0.18em] text-claw-orange">
            Not just agents in pods
          </p>
          <h2 className="mb-4 text-4xl text-white sm:text-5xl">
            Kubernetes gives you isolation. Sympozium gives you a control plane.
          </h2>
          <p className="max-w-2xl leading-relaxed text-slate-400">
            One family, distinct layers. Coordination, claimed models, isolated cells, and
            accelerator energy sit on Kubernetes as substrate — not as interchangeable products.
          </p>
        </div>

        <FamilyStack />
      </div>
    </section>
  )
}
