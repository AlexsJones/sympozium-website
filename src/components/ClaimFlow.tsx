/**
 * ClaimFlow — animated SVG showing demand and supply meeting at the claim:
 * an ensemble declares a ModelClaim (demand); llmfit-dra probes accelerators
 * and publishes fit physics; the stock kube-scheduler places the model with
 * exclusive allocation; the endpoint flows back to the agent. Sympozium never
 * picks a node — the claim is the only thing that crosses the boundary.
 *
 * One 12-second SMIL loop, phase-gated with keyTimes. Colours are driven by
 * the active theme via CSS custom properties.
 */

const SYMPOZIUM = 'var(--color-kube-blue)'
const CLAIM = 'var(--color-claw-purple)'
const PHYSICS = 'var(--color-claw-green)'
const SCHEDULER = 'var(--color-claw-orange)'
const BOUNDARY = 'var(--color-claw-cyan)'
const NOFIT = 'var(--color-claw-red)'

const T = 12 // seconds per cycle
const f = (s: number) => +(Math.min(s, T) / T).toFixed(4)

// ── Fade a group in at `from` seconds, hold, fade out at `to` ───────────────
function Appear({ from, to, children }: { from: number; to: number; children: React.ReactNode }) {
  const times = `0;${f(from)};${f(Math.min(from + 0.4, to))};${f(to)};${f(to + 0.4)};1`
  return (
    <g opacity={0}>
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite"
        values="0;0;1;1;0;0" keyTimes={times} />
      {children}
    </g>
  )
}

// ── Token that travels along `d` during [from, to] seconds of the cycle ─────
function Token({ d, from, to, color, r = 3 }: { d: string; from: number; to: number; color: string; r?: number }) {
  return (
    <circle r={r} style={{ fill: color }} opacity={0}>
      <animateMotion dur={`${T}s`} repeatCount="indefinite" path={d} calcMode="linear"
        keyPoints={`0;0;1;1`} keyTimes={`0;${f(from)};${f(to)};1`} />
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite"
        values="0;0;1;1;0;0"
        keyTimes={`0;${f(from)};${f(from + 0.15)};${f(to - 0.15)};${f(to)};1`} />
    </circle>
  )
}

// ── Cluster node card ────────────────────────────────────────────────────────
function NodeCard({
  x, y, w = 195, h = 48, name, hw,
}: { x: number; y: number; w?: number; h?: number; name: string; hw: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      <text x={x + 12} y={y + 18} fontSize={9.5} fontWeight={700} fill="#ffffff"
        fontFamily="Inter, sans-serif">{name}</text>
      <text x={x + 12} y={y + 32} fontSize={8} fill="#8a8c82"
        fontFamily="'JetBrains Mono', monospace">{hw}</text>
    </g>
  )
}

// ── Physics badge published on a node after the probe ───────────────────────
function PhysicsBadge({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <Appear from={2.2} to={11.5}>
      <rect x={x} y={y} width={78} height={16} rx={8}
        fill="var(--color-surface)" style={{ stroke: color, strokeOpacity: 0.5 }} strokeWidth={1} />
      <text x={x + 39} y={y + 11} fontSize={7.5} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" style={{ fill: color }}>{label}</text>
    </Appear>
  )
}

// ── Phase caption that brightens during its window ──────────────────────────
function Phase({ x, from, to, label, color }: { x: number; from: number; to: number; label: string; color: string }) {
  return (
    <text x={x} y={458} fontSize={8.5} textAnchor="middle" opacity={0.3}
      fontFamily="'JetBrains Mono', monospace" style={{ fill: color }}>
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite"
        values="0.3;0.3;1;1;0.3;0.3"
        keyTimes={`0;${f(from)};${f(from + 0.2)};${f(to)};${f(to + 0.2)};1`} />
      {label}
    </text>
  )
}

const PROBE_A = 'M405,100 L447,150'
const PROBE_B = 'M405,100 C430,150 445,190 447,228'
const PROBE_C = 'M405,100 C418,180 438,255 440,320'
const PUBLISH = 'M352,100 C315,118 300,135 296,158'
const CLAIM_PATH = 'M190,181 L245,181'
const SERVE = 'M350,252 C255,252 235,112 185,94'

export default function ClaimFlow() {
  return (
    <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-5 sm:p-6 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Model Claim Lifecycle</span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-claw-green">
            <span className="w-1.5 h-1.5 rounded-full bg-claw-green animate-pulse" />
            demand ⇄ supply
          </span>
        </div>

        <svg viewBox="0 0 560 470" className="w-full h-auto" role="img"
          aria-label="An ensemble declares a ModelClaim; llmfit-dra probes accelerators and publishes fit physics; the stock kube-scheduler places the model with exclusive allocation; the endpoint flows back to the agent.">

          {/* ── Column headers ── */}
          <text x={115} y={28} fontSize={10} fontWeight={700} textAnchor="middle" letterSpacing="0.12em"
            fontFamily="'JetBrains Mono', monospace" style={{ fill: SYMPOZIUM }}>SYMPOZIUM</text>
          <text x={115} y={42} fontSize={7.5} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fill="#8a8c82">coordination · what agents do</text>

          <text x={395} y={28} fontSize={10} fontWeight={700} textAnchor="middle" letterSpacing="0.12em"
            fontFamily="'JetBrains Mono', monospace" style={{ fill: PHYSICS }}>LLMFIT-DRA</text>
          <text x={395} y={42} fontSize={7.5} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fill="#8a8c82">capability · where compute happens</text>

          {/* ── Boundary ── */}
          <line x1={222} y1={55} x2={222} y2={412} strokeWidth={1.5} strokeDasharray="6 6"
            style={{ stroke: BOUNDARY, strokeOpacity: 0.4 }}>
            <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite" />
          </line>
          <rect x={137} y={418} width={170} height={18} rx={9}
            fill="var(--color-surface)" style={{ stroke: BOUNDARY, strokeOpacity: 0.4 }} strokeWidth={1} />
          <text x={222} y={430} fontSize={8} textAnchor="middle" letterSpacing="0.06em"
            fontFamily="'JetBrains Mono', monospace" style={{ fill: BOUNDARY }}>sympozium never picks nodes</text>

          {/* ── Left: ensemble + ModelClaim ── */}
          <g>
            <rect x={35} y={70} width={150} height={46} rx={10}
              fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            <circle cx={48} cy={87} r={3} style={{ fill: SYMPOZIUM }}>
              <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
            </circle>
            {/* dot turns green once the endpoint arrives */}
            <Appear from={10.4} to={11.7}>
              <circle cx={48} cy={87} r={3} style={{ fill: PHYSICS }} />
            </Appear>
            <text x={58} y={90} fontSize={11} fontWeight={700} fill="#ffffff"
              fontFamily="Inter, sans-serif">research-team</text>
            <text x={48} y={105} fontSize={8} fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">ensemble · needs a model</text>
          </g>

          <path d="M110,116 L110,148" fill="none" strokeWidth={1.2}
            style={{ stroke: CLAIM, strokeOpacity: 0.5 }} />

          {/* ModelClaim chip */}
          <g>
            <rect x={30} y={150} width={160} height={62} rx={8}
              fill="var(--color-surface-light)" style={{ stroke: CLAIM, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            {/* pulse while the claim is in flight */}
            <Appear from={3.5} to={5.5}>
              <rect x={30} y={150} width={160} height={62} rx={8} fill="none"
                style={{ stroke: CLAIM }} strokeWidth={1.6}>
                <animate attributeName="stroke-opacity" values="0.9;0.3;0.9" dur="1s" repeatCount="indefinite" />
              </rect>
            </Appear>
            <text x={42} y={167} fontSize={9} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace" style={{ fill: CLAIM }}>modelClaim:</text>
            <text x={50} y={182} fontSize={8.5} fill="#f0ece4"
              fontFamily="'JetBrains Mono', monospace">model: qwen3-32b</text>
            <text x={50} y={196} fontSize={8.5} fill="#f0ece4"
              fontFamily="'JetBrains Mono', monospace">minTps: 25</text>
          </g>

          {/* endpoint readout, once served */}
          <Appear from={10.6} to={11.7}>
            <text x={110} y={232} fontSize={8} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: PHYSICS }}>endpoint: model-qwen3-32b:8000</text>
          </Appear>

          {/* ── Middle: stock scheduler ── */}
          <g>
            <rect x={245} y={158} width={100} height={46} rx={8}
              fill="var(--color-surface-light)" style={{ stroke: SCHEDULER, strokeOpacity: 0.5 }} strokeWidth={1.2} />
            <text x={295} y={178} fontSize={9} fontWeight={700} textAnchor="middle" fill="#ffffff"
              fontFamily="Inter, sans-serif">kube-scheduler</text>
            <text x={295} y={192} fontSize={7.5} textAnchor="middle" fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">stock · unmodified</text>
          </g>

          {/* ── Right: llmfit-dra driver + nodes ── */}
          <g>
            <rect x={345} y={60} width={120} height={40} rx={8}
              fill="var(--color-surface-light)" style={{ stroke: PHYSICS, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            <text x={405} y={77} fontSize={10} fontWeight={700} textAnchor="middle" fill="#ffffff"
              fontFamily="Inter, sans-serif">llmfit-dra</text>
            <text x={405} y={91} fontSize={7.5} textAnchor="middle" fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">DRA driver · fit physics</text>
          </g>

          {/* probe edges (faint, permanent) + probe tokens */}
          {[PROBE_A, PROBE_B, PROBE_C].map((d, i) => (
            <path key={i} d={d} fill="none" strokeWidth={1} strokeDasharray="3 4"
              style={{ stroke: PHYSICS, strokeOpacity: 0.25 }} />
          ))}
          <Token d={PROBE_A} from={0.3} to={1.5} color={PHYSICS} r={2.6} />
          <Token d={PROBE_B} from={0.5} to={1.7} color={PHYSICS} r={2.6} />
          <Token d={PROBE_C} from={0.7} to={1.9} color={PHYSICS} r={2.6} />

          {/* publish edge: llmfit-dra → scheduler */}
          <path d={PUBLISH} fill="none" strokeWidth={1} strokeDasharray="3 4"
            style={{ stroke: PHYSICS, strokeOpacity: 0.25 }} />
          <Token d={PUBLISH} from={2.0} to={3.3} color={PHYSICS} r={2.6} />

          {/* claim edge: ModelClaim → scheduler (crosses the boundary) */}
          <path d={CLAIM_PATH} fill="none" strokeWidth={1.2}
            style={{ stroke: CLAIM, strokeOpacity: 0.4 }} />
          <Token d={CLAIM_PATH} from={3.8} to={5.2} color={CLAIM} r={3.2} />

          {/* nodes */}
          <NodeCard x={350} y={150} name="node-a" hw="RTX 4090 · 24 GB" />
          <NodeCard x={350} y={228} h={64} name="node-b" hw="A100 · 80 GB" />
          <NodeCard x={350} y={320} name="node-c" hw="cpu-only" />

          <PhysicsBadge x={460} y={158} label="31 tok/s ✓" color={PHYSICS} />
          <PhysicsBadge x={460} y={236} label="74 tok/s ✓" color={PHYSICS} />
          <PhysicsBadge x={460} y={328} label="no fit ✗" color={NOFIT} />

          {/* schedule: node-b wins the placement */}
          <Appear from={5.8} to={11.5}>
            <rect x={350} y={228} width={195} height={64} rx={10} fill="none"
              style={{ stroke: SCHEDULER }} strokeWidth={1.6}>
              <animate attributeName="stroke-opacity" values="0.9;0.4;0.9" dur="1.4s" repeatCount="indefinite" />
            </rect>
            <text x={412} y={246} fontSize={7.5}
              fontFamily="'JetBrains Mono', monospace" style={{ fill: SCHEDULER }}>selected</text>
          </Appear>

          {/* allocate: model pod lands on node-b, exclusively */}
          <Appear from={7.5} to={11.5}>
            <rect x={360} y={262} width={175} height={22} rx={6}
              style={{ fill: PHYSICS, fillOpacity: 0.1, stroke: PHYSICS, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            <text x={447} y={276} fontSize={8} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: PHYSICS }}>qwen3-32b · Ready · exclusive</text>
          </Appear>

          {/* serve: endpoint flows back to the ensemble */}
          <Appear from={9} to={11.5}>
            <path d={SERVE} fill="none" strokeWidth={1.2}
              style={{ stroke: PHYSICS, strokeOpacity: 0.4 }} />
          </Appear>
          <Token d={SERVE} from={9.1} to={10.6} color={PHYSICS} r={3.2} />

          {/* ── Phase captions ── */}
          <Phase x={60} from={0.3} to={1.9} label="probe" color={PHYSICS} />
          <Phase x={150} from={2.0} to={3.4} label="publish" color={PHYSICS} />
          <Phase x={240} from={3.5} to={5.5} label="claim" color={CLAIM} />
          <Phase x={330} from={5.6} to={7.4} label="schedule" color={SCHEDULER} />
          <Phase x={420} from={7.5} to={8.9} label="allocate" color={PHYSICS} />
          <Phase x={510} from={9.0} to={11.5} label="serve" color={SYMPOZIUM} />
        </svg>
      </div>
    </div>
  )
}
