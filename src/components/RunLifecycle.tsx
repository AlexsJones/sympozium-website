/**
 * RunLifecycle — animated SVG showing the anatomy of a single agent run over
 * time: an AgentRun CR is applied, validated by the admission webhook, spawned
 * as a Job, executed inside a locked-down pod (agent + IPC bridge + skill
 * sidecar) with ephemeral RBAC, then garbage-collected with credentials
 * revoked. The differentiated story here is *time*: every step is a
 * Kubernetes resource, gated on the way in and revoked on the way out.
 *
 * One 12-second SMIL loop, phase-gated with keyTimes (same pattern as
 * ClaimFlow). Colours come from the active theme via CSS custom properties.
 */

const CRD = 'var(--color-claw-purple)'
const GATE = 'var(--color-claw-cyan)'
const RUN = 'var(--color-claw-green)'
const REVOKE = 'var(--color-claw-red)'
const SUBSTRATE = 'var(--color-kube-blue)'

const T = 12 // seconds per cycle
const f = (s: number) => +(Math.min(s, T) / T).toFixed(4)

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

function Phase({ x, from, to, label, color }: { x: number; from: number; to: number; label: string; color: string }) {
  return (
    <text x={x} y={296} fontSize={9} textAnchor="middle" opacity={0.3}
      fontFamily="'JetBrains Mono', monospace" style={{ fill: color }}>
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite"
        values="0.3;0.3;1;1;0.3;0.3"
        keyTimes={`0;${f(from)};${f(from + 0.2)};${f(to)};${f(to + 0.2)};1`} />
      {label}
    </text>
  )
}

function Container({ x, y, w, name, sub }: { x: number; y: number; w: number; name: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={40} rx={8}
        fill="var(--color-surface-light)" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
      <text x={x + 10} y={y + 17} fontSize={9.5} fontWeight={700} fill="#ffffff"
        fontFamily="Inter, sans-serif">{name}</text>
      <text x={x + 10} y={y + 31} fontSize={7.5} fill="#8a8c82"
        fontFamily="'JetBrains Mono', monospace">{sub}</text>
    </g>
  )
}

const APPLY = 'M190,140 L240,140'
const ADMIT_OUT = 'M360,140 L410,140'
const SPAWN = 'M500,140 L545,140'
const EXEC_A = 'M645,138 C650,152 658,162 668,168'   // agent-runner → ipc-bridge
const EXEC_B = 'M722,168 C732,160 738,150 742,138'   // ipc-bridge → skill sidecar
const STATUS = 'M560,62 C420,10 220,25 115,92'

export default function RunLifecycle() {
  return (
    <div className="relative rounded-2xl bg-surface-light/20 border border-white/5 p-5 sm:p-6 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Anatomy of an Agent Run</span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-claw-green">
            <span className="w-1.5 h-1.5 rounded-full bg-claw-green animate-pulse" />
            reconciling
          </span>
        </div>

        <svg viewBox="0 0 920 310" className="w-full h-auto" role="img"
          aria-label="An AgentRun resource is applied, validated by the admission webhook, spawned as a Job into a locked-down pod with ephemeral RBAC, then garbage-collected with credentials revoked.">

          {/* ── AgentRun CR ── */}
          <g>
            <rect x={25} y={95} width={165} height={92} rx={10}
              fill="var(--color-surface-light)" style={{ stroke: CRD, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            <text x={40} y={116} fontSize={12} fontWeight={700} fill="#ffffff"
              fontFamily="Inter, sans-serif">AgentRun</text>
            <rect x={144} y={104} width={34} height={15} rx={7.5}
              fill="var(--color-surface)" style={{ stroke: CRD, strokeOpacity: 0.5 }} strokeWidth={1} />
            <text x={161} y={114.5} fontSize={7.5} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: CRD }}>CRD</text>
            <text x={40} y={135} fontSize={8.5} fill="#f0ece4"
              fontFamily="'JetBrains Mono', monospace">agentRef: researcher</text>
            <text x={40} y={150} fontSize={8.5} fill="#f0ece4"
              fontFamily="'JetBrains Mono', monospace">toolPolicy: allow</text>
            <text x={40} y={165} fontSize={8.5} fill="#f0ece4"
              fontFamily="'JetBrains Mono', monospace">cleanup: delete</text>
            <Appear from={10.2} to={11.7}>
              <text x={40} y={180} fontSize={8.5} fontWeight={700}
                fontFamily="'JetBrains Mono', monospace" style={{ fill: RUN }}>status: Succeeded ✓</text>
            </Appear>
          </g>

          {/* ── Admission webhook ── */}
          <g>
            <rect x={240} y={100} width={120} height={80} rx={12}
              style={{ fill: GATE, fillOpacity: 0.07, stroke: GATE, strokeOpacity: 0.5 }} strokeWidth={1.2} />
            <text x={300} y={122} fontSize={10} fontWeight={700} textAnchor="middle" fill="#ffffff"
              fontFamily="Inter, sans-serif">admission</text>
            <text x={300} y={136} fontSize={7.5} textAnchor="middle" fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">validating webhook</text>
            <Appear from={2.0} to={11.5}>
              <text x={300} y={160} fontSize={8.5} textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace" style={{ fill: RUN }}>✓ policy ok</text>
            </Appear>
          </g>

          {/* ── Job ── */}
          <Appear from={3.4} to={9.4}>
            <rect x={410} y={112} width={90} height={56} rx={10}
              fill="var(--color-surface-light)" style={{ stroke: SUBSTRATE, strokeOpacity: 0.55 }} strokeWidth={1.2} />
            <text x={455} y={136} fontSize={11} fontWeight={700} textAnchor="middle" fill="#ffffff"
              fontFamily="Inter, sans-serif">Job</text>
            <text x={455} y={152} fontSize={7.5} textAnchor="middle" fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">batch/v1</text>
          </Appear>

          {/* ── Agent pod ── */}
          <Appear from={3.8} to={9.4}>
            <rect x={545} y={60} width={255} height={170} rx={14}
              style={{ fill: RUN, fillOpacity: 0.05, stroke: RUN, strokeOpacity: 0.45 }} strokeWidth={1.2} />
            <text x={560} y={82} fontSize={10} fontWeight={700} fill="#ffffff"
              fontFamily="Inter, sans-serif">agent pod</text>
            <text x={624} y={82} fontSize={7.5} fill="#8a8c82"
              fontFamily="'JetBrains Mono', monospace">· ephemeral</text>

            <Container x={560} y={98} w={105} name="agent-runner" sub="LLM loop" />
            <Container x={700} y={98} w={85} name="kubectl" sub="skill sidecar" />
            <Container x={620} y={168} w={110} name="ipc-bridge" sub="gated channel" />

            {/* everything crosses the bridge */}
            <path d={EXEC_A} fill="none" strokeWidth={1} strokeDasharray="3 4"
              style={{ stroke: GATE, strokeOpacity: 0.35 }} />
            <path d={EXEC_B} fill="none" strokeWidth={1} strokeDasharray="3 4"
              style={{ stroke: GATE, strokeOpacity: 0.35 }} />

            <text x={672} y={222} fontSize={7.5} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" fill="#8a8c82">non-root · read-only fs · deny-all egress</text>
          </Appear>

          {/* execute traffic across the bridge */}
          <Token d={EXEC_A} from={5.0} to={5.7} color={GATE} r={2.6} />
          <Token d={EXEC_B} from={5.8} to={6.5} color={GATE} r={2.6} />
          <Token d={EXEC_A} from={6.7} to={7.4} color={GATE} r={2.6} />
          <Token d={EXEC_B} from={7.5} to={8.2} color={GATE} r={2.6} />

          {/* pod ghost after garbage collection */}
          <Appear from={9.6} to={11.5}>
            <rect x={545} y={60} width={255} height={170} rx={14} fill="none"
              strokeDasharray="5 6" stroke="#8a8c82" strokeOpacity={0.35} strokeWidth={1.2} />
            <text x={672} y={148} fontSize={9} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" fill="#8a8c82">garbage-collected · nothing left behind</text>
          </Appear>

          {/* ── Ephemeral RBAC ── */}
          <Appear from={4.8} to={8.8}>
            <rect x={585} y={245} width={175} height={22} rx={11}
              fill="var(--color-surface)" style={{ stroke: RUN, strokeOpacity: 0.5 }} strokeWidth={1} />
            <text x={672.5} y={259} fontSize={8} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: RUN }}>Role: run-researcher-7f2 · bound</text>
          </Appear>
          <Appear from={8.8} to={11.5}>
            <rect x={585} y={245} width={175} height={22} rx={11}
              fill="var(--color-surface)" style={{ stroke: REVOKE, strokeOpacity: 0.5 }} strokeWidth={1} />
            <text x={672.5} y={259} fontSize={8} textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace" style={{ fill: REVOKE }}>Role revoked · credentials gone</text>
          </Appear>

          {/* ── Flow edges + tokens ── */}
          <path d={APPLY} fill="none" strokeWidth={1.2} style={{ stroke: CRD, strokeOpacity: 0.4 }} />
          <Token d={APPLY} from={0.3} to={1.6} color={CRD} r={3.2} />

          <path d={ADMIT_OUT} fill="none" strokeWidth={1.2} style={{ stroke: GATE, strokeOpacity: 0.4 }} />
          <Token d={ADMIT_OUT} from={3.2} to={4.0} color={GATE} r={3.2} />

          <path d={SPAWN} fill="none" strokeWidth={1.2} style={{ stroke: SUBSTRATE, strokeOpacity: 0.4 }} />
          <Token d={SPAWN} from={4.0} to={4.8} color={SUBSTRATE} r={3.2} />

          {/* status reported back to the CR */}
          <Appear from={8.8} to={11.5}>
            <path d={STATUS} fill="none" strokeWidth={1.2} strokeDasharray="4 5"
              style={{ stroke: RUN, strokeOpacity: 0.4 }} />
          </Appear>
          <Token d={STATUS} from={8.9} to={10.2} color={RUN} r={3.2} />

          {/* ── Phase captions ── */}
          <Phase x={95} from={0.3} to={1.7} label="apply" color={CRD} />
          <Phase x={280} from={1.8} to={3.1} label="admit" color={GATE} />
          <Phase x={465} from={3.2} to={4.7} label="spawn" color={SUBSTRATE} />
          <Phase x={650} from={4.8} to={8.7} label="execute" color={RUN} />
          <Phase x={835} from={8.8} to={11.5} label="cleanup" color={REVOKE} />
        </svg>
      </div>
    </div>
  )
}
