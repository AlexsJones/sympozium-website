/**
 * TransmissionDiagram — compact SVG for the "How it works" section.
 *
 * Story: Kubernetes is the substrate; every exchange between an agent and its
 * skills / tools / memory is funnelled through a control plane that enforces
 * admission, RBAC, and network policy. Tokens flow agent → control → tools;
 * a bypass attempt is denied.
 *
 * Colours come from theme CSS custom properties so it re-themes with the site.
 */

const SUBSTRATE = 'var(--color-kube-blue)'
const CHANNEL = 'var(--color-claw-cyan)'
const PASS = 'var(--color-claw-green)'
const BLOCK = 'var(--color-claw-red)'

function Token({ d, color, dur = 1.9, begin = 0 }: { d: string; color: string; dur?: number; begin?: number }) {
  return (
    <circle r={2.6} style={{ fill: color }}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1"
        dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  )
}

function Channel({ d, begin = 0 }: { d: string; begin?: number }) {
  return (
    <g>
      <path d={d} fill="none" strokeWidth={1.4} markerEnd="url(#tx-arrow)"
        style={{ stroke: CHANNEL, strokeOpacity: 0.5 }} />
      <Token d={d} color={PASS} begin={begin} />
    </g>
  )
}

function Tool({ x, y, name, sub }: { x: number; y: number; name: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={40} rx={10}
        fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      <text x={x + 12} y={y + 18} fontSize={11} fontWeight={700} fill="#ffffff" fontFamily="Inter, sans-serif">{name}</text>
      <text x={x + 12} y={y + 31} fontSize={8} fill="#8a8c82" fontFamily="'JetBrains Mono', monospace">{sub}</text>
    </g>
  )
}

function Gate({ y, label }: { y: number; label: string }) {
  return (
    <g>
      <circle cx={210} cy={y} r={3} style={{ fill: CHANNEL }}>
        <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text x={220} y={y + 3.5} fontSize={9} fill="#ffffff" fontFamily="'JetBrains Mono', monospace">{label}</text>
    </g>
  )
}

export default function TransmissionDiagram() {
  return (
    <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-5 sm:p-6 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Transmission</span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-claw-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-claw-cyan animate-pulse" />
            gated
          </span>
        </div>

        <svg viewBox="0 0 460 360" className="w-full h-auto" role="img"
          aria-label="An agent reaches its skills and tools only through a control plane that enforces admission, RBAC, and network policy, all running on a Kubernetes substrate.">
          <defs>
            <marker id="tx-arrow" viewBox="0 0 10 10" refX="8.5" refY="5"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 Z" fill="context-stroke" />
            </marker>
          </defs>

          {/* ── Mount lines to the substrate ── */}
          {['M82,200 L82,300', 'M230,266 L230,300', 'M394,258 L394,300'].map((d, i) => (
            <path key={i} d={d} fill="none" strokeWidth={1} strokeDasharray="2 4"
              style={{ stroke: SUBSTRATE, strokeOpacity: 0.3 }} />
          ))}

          {/* ── Kubernetes substrate ── */}
          <rect x={20} y={300} width={420} height={46} rx={10}
            style={{ fill: SUBSTRATE, fillOpacity: 0.07, stroke: SUBSTRATE, strokeOpacity: 0.35 }} strokeWidth={1} />
          <text x={230} y={320} fontSize={10} fontWeight={700} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em" style={{ fill: SUBSTRATE }}>
            KUBERNETES SUBSTRATE
          </text>
          <text x={230} y={335} fontSize={8.5} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fill="#8a8c82">
            pods · jobs · CRDs · RBAC
          </text>

          {/* ── Control plane capsule ── */}
          <rect x={170} y={96} width={86} height={160} rx={16}
            style={{ fill: CHANNEL, fillOpacity: 0.07, stroke: CHANNEL, strokeOpacity: 0.5 }} strokeWidth={1.2} />
          <text x={184} y={116} fontSize={9} fontWeight={700}
            fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em" style={{ fill: CHANNEL }}>CONTROL</text>
          <Gate y={148} label="admission" />
          <Gate y={180} label="rbac" />
          <Gate y={212} label="netpol" />

          {/* ── Channels: agent → control → tools ── */}
          <Channel d="M138,176 L170,176" begin={0} />
          <Channel d="M256,150 L342,120" begin={0.5} />
          <Channel d="M256,176 L342,178" begin={0.9} />
          <Channel d="M256,202 L342,236" begin={1.3} />

          {/* ── Denied bypass attempt (agent → tool, skipping control) ── */}
          <path d="M120,150 C200,40 320,46 392,118" fill="none" strokeWidth={1.3}
            strokeDasharray="4 4" style={{ stroke: BLOCK, strokeOpacity: 0.5 }} />
          <g transform="translate(256,58)">
            <circle r={8} style={{ fill: BLOCK, fillOpacity: 0.15, stroke: BLOCK, strokeOpacity: 0.7 }} strokeWidth={1} />
            <path d="M-3,-3 L3,3 M3,-3 L-3,3" style={{ stroke: BLOCK }} strokeWidth={1.4} strokeLinecap="round" />
            <text x={14} y={3.5} fontSize={8.5} fontFamily="'JetBrains Mono', monospace" style={{ fill: BLOCK }}>bypass denied</text>
          </g>

          {/* ── Agent ── */}
          <g>
            <rect x={26} y={148} width={112} height={56} rx={12}
              fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            <circle cx={42} cy={168} r={3} style={{ fill: PASS }}>
              <animate attributeName="opacity" values="1;0.4;1" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <text x={52} y={172} fontSize={13} fontWeight={700} fill="#ffffff" fontFamily="Inter, sans-serif">Agent</text>
            <text x={42} y={190} fontSize={8.5} fill="#8a8c82" fontFamily="'JetBrains Mono', monospace">ephemeral pod</text>
          </g>

          {/* ── Skills / tools ── */}
          <Tool x={342} y={100} name="kubectl" sub="skill sidecar" />
          <Tool x={342} y={158} name="Memory" sub="sqlite · pvc" />
          <Tool x={342} y={216} name="MCP tool" sub="mcp bridge" />
        </svg>
      </div>
    </div>
  )
}
