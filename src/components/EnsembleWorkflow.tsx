/**
 * EnsembleWorkflow — animated SVG showing an ensemble of agents coordinating
 * through the synthetic membrane. Illustrates the four relationship types:
 *   • delegate  (lead hands work to specialists)
 *   • sequence  (ordered hand-off between agents)
 *   • supervise (observe without interfering — control)
 *   • share     (bidirectional shared-memory traffic)
 *
 * Colours are driven by the active theme via CSS custom properties, so the
 * diagram re-themes with the rest of the site.
 */

const DELEGATE = 'var(--color-claw-purple)'
const SEQUENCE = 'var(--color-claw-orange)'
const SUPERVISE = 'var(--color-claw-cyan)'
const SHARE = 'var(--color-claw-green)'
const MEMBRANE = 'var(--color-claw-cyan)'

// ── Agent card ──────────────────────────────────────────────────────────────
function Agent({
  x, y, name, role, dot,
}: { x: number; y: number; name: string; role: string; dot: string }) {
  const w = 120
  const h = 44
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={10}
        fill="var(--color-surface-light)"
        stroke="rgba(255,255,255,0.12)" strokeWidth={1}
      />
      <circle cx={x + 13} cy={y + 16} r={3} style={{ fill: dot }}>
        <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <text x={x + 23} y={y + 19} fontSize={12} fontWeight={700} fill="#ffffff"
        fontFamily="Inter, sans-serif">{name}</text>
      <text x={x + 13} y={y + 34} fontSize={8.5} fill="#8a8c82"
        fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">{role}</text>
    </g>
  )
}

// ── Directed edge with a travelling token ────────────────────────────────────
function Edge({
  d, color, dashed = false, arrow = true, dur = 1.9, begin = 0,
}: { d: string; color: string; dashed?: boolean; arrow?: boolean; dur?: number; begin?: number }) {
  return (
    <g>
      <path
        d={d} fill="none" strokeWidth={1.5}
        strokeDasharray={dashed ? '3 4' : undefined}
        markerEnd={arrow ? 'url(#ew-arrow)' : undefined}
        style={{ stroke: color, strokeOpacity: 0.55 }}
      />
      <circle r={2.6} style={{ fill: color }}>
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1"
          dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      </circle>
    </g>
  )
}

// ── Undirected share edge with two opposing tokens ───────────────────────────
function ShareEdge({ d, begin = 0 }: { d: string; begin?: number }) {
  return (
    <g>
      <path d={d} fill="none" strokeWidth={1.2} style={{ stroke: SHARE, strokeOpacity: 0.4 }} />
      <circle r={2.4} style={{ fill: SHARE }}>
        <animateMotion dur="2.1s" begin={`${begin}s`} repeatCount="indefinite" path={d} />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.1s" begin={`${begin}s`} repeatCount="indefinite" />
      </circle>
      <circle r={2.4} style={{ fill: SHARE }}>
        <animateMotion dur="2.1s" begin={`${begin + 1.05}s`} repeatCount="indefinite"
          path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.1s" begin={`${begin + 1.05}s`} repeatCount="indefinite" />
      </circle>
    </g>
  )
}

function LegendItem({ color, label, dashed = false }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block w-4 h-0 border-t-2"
        style={{ borderColor: color, borderStyle: dashed ? 'dashed' : 'solid' }}
      />
      <span className="text-[11px] font-mono text-slate-400">{label}</span>
    </div>
  )
}

export default function EnsembleWorkflow() {
  return (
    <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-5 sm:p-6 overflow-hidden backdrop-blur-sm">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Agent Ensemble</span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-claw-green">
            <span className="w-1.5 h-1.5 rounded-full bg-claw-green animate-pulse" />
            coordinating
          </span>
        </div>

        <svg viewBox="0 0 440 486" className="w-full h-auto" role="img"
          aria-label="An ensemble of agents coordinating through a synthetic membrane via delegation, sequencing, supervision, and shared memory.">
          <defs>
            <marker id="ew-arrow" viewBox="0 0 10 10" refX="8.5" refY="5"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 Z" fill="context-stroke" />
            </marker>
          </defs>

          {/* ── Membrane boundary ── */}
          <rect x={28} y={158} width={384} height={314} rx={20}
            fill="none" strokeWidth={1.5} strokeDasharray="6 6"
            style={{ stroke: MEMBRANE, strokeOpacity: 0.45 }}>
            <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite" />
          </rect>
          {/* Membrane label chip */}
          <rect x={150} y={150} width={140} height={18} rx={9}
            fill="var(--color-surface)" style={{ stroke: MEMBRANE, strokeOpacity: 0.4 }} strokeWidth={1} />
          <text x={220} y={162} fontSize={9} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" letterSpacing="0.08em"
            style={{ fill: MEMBRANE }}>synthetic membrane</text>

          {/* ── Relationship edges ── (drawn under nodes) */}
          {/* delegate: lead → researcher / writer */}
          <Edge d="M188,222 L152,288" color={DELEGATE} dur={1.7} />
          <Edge d="M252,222 L288,288" color={DELEGATE} dur={1.7} begin={0.3} />
          {/* sequence: writer → reviewer */}
          <Edge d="M330,334 L330,406" color={SEQUENCE} dur={1.5} begin={0.6} />
          {/* supervise: supervisor → shared memory (observe, dashed) */}
          <Edge d="M152,406 L180,382" color={SUPERVISE} dashed dur={2.2} begin={0.2} />

          {/* share: shared memory ↔ each agent */}
          <ShareEdge d="M220,346 L220,224" begin={0} />
          <ShareEdge d="M180,360 L132,332" begin={0.5} />
          <ShareEdge d="M260,360 L308,332" begin={0.9} />
          <ShareEdge d="M262,378 L300,406" begin={1.3} />

          {/* edge labels */}
          <text x={150} y={262} fontSize={9} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" style={{ fill: DELEGATE }}>delegate</text>
          <g transform="rotate(-90 344 372)">
            <text x={344} y={372} fontSize={9} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: SEQUENCE }}>sequence</text>
          </g>
          <text x={96} y={392} fontSize={9} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" style={{ fill: SUPERVISE }}>supervise</text>

          {/* ── Shared memory hub ── */}
          <g>
            <rect x={180} y={348} width={80} height={44} rx={12}
              style={{ fill: SHARE, fillOpacity: 0.1, stroke: SHARE, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            <circle cx={220} cy={370} r={30} style={{ stroke: SHARE, strokeOpacity: 0.3 }} fill="none" strokeWidth={1}>
              <animate attributeName="r" values="26;34;26" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* tiny db-cylinder glyph */}
            <g style={{ stroke: SHARE }} strokeWidth={1.2} fill="none">
              <ellipse cx={220} cy={362} rx={7} ry={2.6} />
              <path d="M213,362 v8 a7,2.6 0 0 0 14,0 v-8" />
            </g>
            <text x={220} y={384} fontSize={8.5} textAnchor="middle" fontWeight={700}
              fontFamily="'JetBrains Mono', monospace" style={{ fill: SHARE }}>SHARED</text>
          </g>

          {/* ── Agents ── */}
          <Agent x={160} y={178} name="Research Lead" role="orchestrator" dot="var(--color-kube-blue)" />
          <Agent x={50} y={288} name="Researcher" role="research" dot="var(--color-claw-purple)" />
          <Agent x={270} y={288} name="Writer" role="drafting" dot="var(--color-claw-orange)" />
          <Agent x={270} y={408} name="Reviewer" role="quality-gate" dot="var(--color-claw-red)" />
          <Agent x={50} y={408} name="Supervisor" role="observe-only" dot="var(--color-claw-cyan)" />
        </svg>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <LegendItem color={DELEGATE} label="delegate" />
          <LegendItem color={SEQUENCE} label="sequence" />
          <LegendItem color={SUPERVISE} label="supervise" dashed />
          <LegendItem color={SHARE} label="share" />
        </div>
      </div>
    </div>
  )
}
