import { useEffect, useId, useState } from 'react'

type LayerLink = { label: string; href: string }

type Layer = {
  id: string
  n: string
  name: string
  role: string
  plate: string
  body: string
  points: string[]
  links: LayerLink[]
}

const LAYERS: Layer[] = [
  {
    id: 'sympozium',
    n: '01',
    name: 'Sympozium',
    role: 'Coordination',
    plate: 'ensembles · policy · harness seam',
    body: 'The coordination layer for multi-agent AI: typed relationships, shared ensemble memory, and policy as CRDs. Agent Harness is the BYO runtime seam on this layer — not its own product layer.',
    points: [
      'Operators approve a digest-pinned AgentRuntime. Teams bring a harness via an approved contract-compatible adapter — not an upstream image.',
      'Interactive chat defaults to a HarnessSession (Pi / Hermes). One-shot work is an AgentRun. Not every execution is a Job.',
      'External runtimes are policy opt-in and off by default.',
    ],
    links: [
      { label: 'Agent Harness docs', href: 'https://deploy.sympozium.ai/docs/guides/agentharness/' },
    ],
  },
  {
    id: 'llmfit',
    n: '02',
    name: 'llmfit / llmfit-dra',
    role: 'Models',
    plate: 'claimed, not placed',
    body: 'Agents ask for a model and a speed. llmfit scores fit against hardware; llmfit-dra makes that physics scheduler-native. The stock kube-scheduler places the compute. Sympozium never picks a node.',
    points: [
      'Capability layer — where compute happens, not what agents do.',
      'ModelClaim in, placement out. No node pinning in Sympozium.',
    ],
    links: [
      { label: 'llmfit', href: 'https://github.com/AlexsJones/llmfit' },
      { label: 'llmfit-dra', href: 'https://github.com/sympozium-ai/llmfit-dra' },
    ],
  },
  {
    id: 'celln',
    n: '03',
    name: 'Celln',
    role: 'Isolation',
    plate: 'isolated cells · attested tools',
    body: 'Isolated cells that borrow attested tools instead of rebuilding Linux environments. Celln does not compose with Agent Harness. It is not a sandbox and not Agent Sandbox.',
    points: [
      'Its own isolation product — a family layer, not a harness mode.',
      'Cells borrow attested tools; they do not wrap the agent loop.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/sympozium-ai/celln' },
      { label: 'Docs', href: 'https://sympozium-ai.github.io/celln/' },
    ],
  },
  {
    id: 'ergoz',
    n: '04',
    name: 'Ergoz',
    role: 'Energy',
    plate: 'accelerator power · placement sees watts',
    body: 'First-class energy layer of the family. Vendor-neutral accelerator power so placement and cost see electricity. If Ergoz is not there, the control plane still runs — you just do not get watts (not zeros).',
    points: [
      'Labelled energy collector, fail-open: absent means no energy data — never a failed control plane, never a fabricated 0 W.',
      'Not a Helm chart dependency. Built-in stack family is not a hard runtime dependency.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/sympozium-ai/ergoz' },
    ],
  },
  {
    id: 'kubernetes',
    n: '05',
    name: 'Kubernetes',
    role: 'Substrate',
    plate: 'pods · jobs · CRDs · RBAC',
    body: 'The battle-tested substrate — not a sibling product. Isolation primitives live here. Sympozium is the control plane on top.',
    points: [
      'Pods, Jobs, CRDs, admission, and NetworkPolicy are the floor, not the product.',
    ],
    links: [],
  },
]

const TOKEN_STOPS = ['sympozium', 'llmfit', 'celln', 'ergoz', 'kubernetes'] as const

function Glyph({ id }: { id: string }) {
  const common = { className: 'h-5 w-5 shrink-0', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }
  if (id === 'sympozium') {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="6" cy="7" r="2.2" />
        <circle cx="18" cy="7" r="2.2" />
        <circle cx="12" cy="17" r="2.2" />
        <path strokeWidth="1.5" d="M8 8.2l3.2 6.4M16 8.2l-3.2 6.4M8.4 7h7.2" />
      </svg>
    )
  }
  if (id === 'llmfit') {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none" />
        <path strokeWidth="1.5" d="M9 2v3M15 2v3M9 19v3M15 19v3" />
      </svg>
    )
  }
  if (id === 'celln') {
    return (
      <svg {...common} aria-hidden="true">
        <path strokeWidth="1.5" d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
        <path strokeWidth="1.5" d="M12 8.5l3.5 2v4L12 16.5 8.5 14.5v-4L12 8.5z" />
      </svg>
    )
  }
  if (id === 'ergoz') {
    return (
      <svg {...common} aria-hidden="true">
        <path strokeWidth="1.5" d="M13 2L4 14h7v8l9-12h-7V2z" />
      </svg>
    )
  }
  return (
    <svg {...common} aria-hidden="true">
      <path strokeWidth="1.5" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path strokeWidth="1.5" d="M12 3v18M4 7.5l8 4.5 8-4.5" />
    </svg>
  )
}

function Dock({ layer, id }: { layer: Layer; id: string }) {
  return (
    <div id={id} className="family-dock border-2 border-primary/80 bg-surface-light/40 p-5 sm:p-6">
      <p className="mb-2 font-mono text-[11px] tracking-[0.18em] text-claw-orange">
        {layer.n} · {layer.role}
      </p>
      <h3 className="mb-3 text-white">{layer.name}</h3>
      <p className="mb-4 text-[15px] leading-relaxed text-slate-300">{layer.body}</p>
      <ul className="space-y-2.5">
        {layer.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-400">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-claw-orange" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {layer.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3">
          {layer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-2 border-primary/40 px-3 py-1.5 text-[13px] text-primary hover:border-claw-orange hover:text-white"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FamilyStack() {
  const [selected, setSelected] = useState(LAYERS[0].id)
  const listId = useId()
  const layer = LAYERS.find((item) => item.id === selected) ?? LAYERS[0]
  const mobilePanelId = `${listId}-mobile`
  const desktopPanelId = `${listId}-desktop`

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      const root = document.getElementById(listId)
      if (!root || !root.contains(document.activeElement)) return
      event.preventDefault()
      const idx = LAYERS.findIndex((item) => item.id === selected)
      if (event.key === 'Home') setSelected(LAYERS[0].id)
      else if (event.key === 'End') setSelected(LAYERS[LAYERS.length - 1].id)
      else if (event.key === 'ArrowDown') setSelected(LAYERS[Math.min(idx + 1, LAYERS.length - 1)].id)
      else setSelected(LAYERS[Math.max(idx - 1, 0)].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [listId, selected])

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
      <div className="family-stack relative">
        <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-slate-500">
          Family stack — select a layer
        </p>

        <div className="relative pl-7">
          <div className="family-stack-rail" aria-hidden="true">
            <span className="family-stack-token" />
          </div>

          <div id={listId} role="list" className="flex flex-col gap-3">
            {LAYERS.map((item, index) => {
              const active = selected === item.id
              return (
                <div key={item.id} role="listitem">
                  <button
                    type="button"
                    data-layer={item.id}
                    aria-pressed={active}
                    aria-expanded={active}
                    aria-controls={active ? `${mobilePanelId} ${desktopPanelId}` : undefined}
                    onClick={() => setSelected(item.id)}
                    className={`family-plate group flex w-full items-center gap-3 border-2 px-4 py-3.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claw-orange ${
                      active
                        ? 'border-claw-orange bg-claw-orange/10 text-white'
                        : 'border-primary/35 bg-surface-light/30 text-primary hover:border-primary/70 hover:bg-surface-light/50'
                    }`}
                    style={{ marginLeft: `${index * 10}px`, width: `calc(100% - ${index * 10}px)` }}
                  >
                    <span className={active ? 'text-claw-orange' : 'text-primary/80'}>
                      <Glyph id={item.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[13px] font-semibold tracking-[0.08em] text-white">
                          {item.name}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-claw-orange">
                          {item.n} {item.role}
                        </span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[11px] tracking-[0.06em] text-slate-400">
                        {item.plate}
                      </span>
                    </span>
                  </button>

                  {active && (
                    <div className="mt-3 lg:hidden" style={{ marginLeft: `${index * 10}px` }}>
                      <Dock layer={layer} id={mobilePanelId} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-slate-500">
          Idle path: Sympozium → llmfit-dra → Celln → Ergoz → Kubernetes. Agent Harness lives on the
          coordination layer. Layers are not interchangeable.
        </p>
      </div>

      <div className="hidden lg:sticky lg:top-28 lg:block">
        <Dock layer={layer} id={desktopPanelId} />
        <ol className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
          {TOKEN_STOPS.map((id) => (
            <li
              key={id}
              className={`font-mono text-[10px] tracking-[0.14em] ${
                selected === id ? 'text-claw-orange' : 'text-slate-600'
              }`}
            >
              {LAYERS.find((item) => item.id === id)?.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
