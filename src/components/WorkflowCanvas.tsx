/**
 * WorkflowCanvas — themed re-creation of the visual workflow editor.
 *
 * Replaces the static (blue/slate) product screenshot with an SVG that uses
 * the site's theme CSS custom properties, so its colours match the rest of the
 * page and re-theme with it. Shows the three typed relationships:
 *   delegate (purple) · then / sequence (orange) · supervise (cyan, dashed).
 */

const DELEGATE = 'var(--color-claw-purple)'
const SEQUENCE = 'var(--color-claw-orange)'
const SUPERVISE = 'var(--color-claw-cyan)'

const MODEL = 'Qwen3.5-4B-UD-Q4_K_XL.gguf'

const CARD_W = 240
const CARD_H = 148

function Card({ x, y, name, role }: { x: number; y: number; name: string; role: string }) {
  const dots: [number, number][] = [
    [CARD_W / 2, 0], [CARD_W / 2, CARD_H], [0, CARD_H / 2], [CARD_W, CARD_H / 2],
  ]
  return (
    <g>
      <rect x={x} y={y} width={CARD_W} height={CARD_H} rx={14}
        fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <text x={x + 20} y={y + 38} fontSize={17} fontWeight={700} fill="#ffffff" fontFamily="Inter, sans-serif">{name}</text>
      <text x={x + 20} y={y + 58} fontSize={11} fill="#8a8c82" fontFamily="'JetBrains Mono', monospace">{role}</text>

      {/* model chip */}
      <rect x={x + 20} y={y + 72} width={200} height={28} rx={6}
        fill="var(--color-surface)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      <text x={x + 30} y={y + 90} fontSize={10.5} fill="#ffffff" fontFamily="'JetBrains Mono', monospace">{MODEL}</text>

      {/* memory badge */}
      <rect x={x + 20} y={y + 110} width={62} height={20} rx={6} fill="rgba(255,255,255,0.06)" />
      <text x={x + 30} y={y + 124} fontSize={10} fill="#8a8c82" fontFamily="'JetBrains Mono', monospace">memory</text>

      {/* connection handles */}
      {dots.map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={4}
          fill="var(--color-surface-lighter)" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
      ))}
    </g>
  )
}

function Edge({
  d, color, label, lx, ly, dashed = false,
}: { d: string; color: string; label: string; lx: number; ly: number; dashed?: boolean }) {
  const w = label.length * 6.4 + 12
  return (
    <g>
      <path d={d} fill="none" strokeWidth={1.6} strokeDasharray={dashed ? '2 5' : '6 5'}
        markerEnd="url(#wf-arrow)" style={{ stroke: color, strokeOpacity: 0.85 }}>
        <animate attributeName="stroke-dashoffset" values="22;0" dur="1.4s" repeatCount="indefinite" />
      </path>
      <rect x={lx - w / 2} y={ly - 9} width={w} height={18} rx={5} fill="var(--color-surface)" />
      <text x={lx} y={ly + 3.5} fontSize={10.5} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" style={{ fill: color }}>{label}</text>
    </g>
  )
}

export default function WorkflowCanvas() {
  return (
    <div className="relative bg-surface/60">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <svg viewBox="0 0 580 470" className="relative w-full h-auto p-3 sm:p-4" role="img"
        aria-label="A visual workflow canvas with four agent cards connected by typed relationships: delegate, then, and supervise.">
        <defs>
          <marker id="wf-arrow" viewBox="0 0 10 10" refX="8.5" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 Z" fill="context-stroke" />
          </marker>
        </defs>

        {/* edges (under cards) */}
        <Edge d="M260,102 L320,102" color={DELEGATE} label="delegate" lx={290} ly={102} />
        <Edge d="M440,176 L440,288" color={SEQUENCE} label="then" lx={440} ly={232} />
        <Edge d="M320,362 L260,362" color={SEQUENCE} label="then" lx={290} ly={362} />
        <Edge d="M140,176 L140,288" color={SUPERVISE} label="supervise" lx={140} ly={232} dashed />

        {/* agent cards */}
        <Card x={20} y={28} name="Research Lead" role="lead" />
        <Card x={320} y={28} name="Researcher" role="researcher" />
        <Card x={20} y={288} name="Reviewer" role="reviewer" />
        <Card x={320} y={288} name="Writer" role="writer" />
      </svg>
    </div>
  )
}
