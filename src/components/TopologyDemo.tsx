import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/* ── colour tokens — industrial palette ─────────────── */
const C = {
  gateway:  { bg: '#1a1a18', border: '#c4532a', text: '#f0ece4' },
  node:     { bg: '#1a1a18', border: '#f0ece4', text: '#f0ece4' },
  model:    { bg: '#1a1a18', border: '#8a8c82', text: '#f0ece4' },
  provider: { bg: '#1a1a18', border: '#c4532a', text: '#c4532a' },
  ensemble: { bg: '#1a1a18', border: '#f0ece4', text: '#f0ece4' },
  agent:    { bg: '#111110', border: '#8a8c82', text: '#f0ece4' },
  collapsed:{ bg: '#111110', border: '#333330', text: '#8a8c82' },
}

/* ── Badge ────────────────────────────────────────── */
function Badge({ label, color = 'default' }: { label: string; color?: string }) {
  const colours: Record<string, string> = {
    green:   'bg-[#2d7a4f]/20 text-[#2d7a4f] border-[#2d7a4f]/30',
    blue:    'bg-[#f0ece4]/10 text-[#f0ece4] border-[#f0ece4]/20',
    orange:  'bg-[#c4532a]/20 text-[#c4532a] border-[#c4532a]/30',
    purple:  'bg-[#f0ece4]/10 text-[#f0ece4] border-[#f0ece4]/20',
    slate:   'bg-[#333330] text-[#8a8c82] border-[#333330]',
    default: 'bg-[#333330] text-[#8a8c82] border-[#333330]',
  }
  return (
    <span className={`text-[9px] font-mono font-medium px-1.5 py-0.5 border ${colours[color] ?? colours.default}`}>
      {label}
    </span>
  )
}

/* ── Industrial SVG icons ────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  gateway: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1" />
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  node: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" />
    </svg>
  ),
  model: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="3" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" />
      <line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  provider: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="6" width="4" height="4" fill="currentColor" />
    </svg>
  ),
  ensemble: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="6" y="5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="10" y="5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  agent: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="7" width="2" height="2" fill="currentColor" />
    </svg>
  ),
}

/* ── Custom node component ────────────────────────── */
function TopologyNode({ data }: NodeProps) {
  const d = data as {
    label: string
    nodeType: string
    subtitle?: string
    badges?: { label: string; color: string }[]
    statusColor?: string
    count?: number
  }

  const c = C[d.nodeType as keyof typeof C] ?? C.collapsed
  const handleStyle = { background: c.border, borderColor: '#1a1a18', width: 8, height: 8 }

  if (d.nodeType === 'collapsed') {
    return (
      <div
        className="border px-3 py-2 min-w-[120px] text-center cursor-grab font-mono"
        style={{ background: c.bg, borderColor: c.border }}
      >
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <Handle type="source" position={Position.Bottom} style={handleStyle} />
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[10px]" style={{ color: c.text }}>
            {d.label}
          </span>
          {d.count && (
            <span className="text-[9px] font-mono" style={{ color: '#c4532a' }}>[{d.count}]</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="border min-w-[140px] cursor-grab font-mono"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <Handle type="target" position={Position.Top} style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />
      <Handle type="target" position={Position.Left} style={handleStyle} />
      <Handle type="source" position={Position.Right} style={handleStyle} />

      <div className="px-3 py-2.5">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: c.text }}>{ICONS[d.nodeType] ?? ICONS.agent}</span>
          <span className="text-xs font-bold" style={{ color: c.text }}>
            {d.label}
          </span>
          {d.statusColor && (
            <span className="w-2 h-2" style={{ background: d.statusColor === 'bg-claw-green' ? '#2d7a4f' : d.statusColor === 'bg-claw-red' ? '#c4532a' : '#8a8c82' }} />
          )}
        </div>

        {d.subtitle && (
          <div className="text-[10px] mb-1.5" style={{ color: '#8a8c82' }}>{d.subtitle}</div>
        )}

        {d.badges && d.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {d.badges.map((b, i) => (
              <Badge key={i} label={b.label} color={b.color} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Legend item ───────────────────────────────────── */
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5" style={{ background: color }} />
      <span>{label}</span>
    </span>
  )
}

/* ── Main component ───────────────────────────────── */
export default function TopologyDemo() {
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'gateway',
      type: 'topology',
      position: { x: 350, y: 0 },
      data: { label: 'Gateway', nodeType: 'gateway', subtitle: 'Not Configured' },
    },
    {
      id: 'node1',
      type: 'topology',
      position: { x: 300, y: 100 },
      data: {
        label: 'kind-control-plane',
        nodeType: 'node',
        subtitle: '172.18.0.2',
        badges: [
          { label: 'ollama (1)', color: 'green' },
          { label: 'lm-studio (10)', color: 'blue' },
        ],
      },
    },
    {
      id: 'model1',
      type: 'topology',
      position: { x: 310, y: 240 },
      data: {
        label: 'qwen3-0-6b-q8',
        nodeType: 'model',
        badges: [
          { label: 'Pod', color: 'green' },
          { label: 'llama-cpp', color: 'slate' },
          { label: 'Ready', color: 'green' },
        ],
      },
    },
    {
      id: 'provider1',
      type: 'topology',
      position: { x: 580, y: 180 },
      data: {
        label: 'LM Studio',
        nodeType: 'provider',
        badges: [{ label: 'API', color: 'orange' }],
      },
    },
    {
      id: 'ensemble1',
      type: 'topology',
      position: { x: 180, y: 380 },
      data: { label: 'research-team', nodeType: 'ensemble', statusColor: 'bg-claw-green' },
    },
    {
      id: 'agent-lead',
      type: 'topology',
      position: { x: 40, y: 470 },
      data: { label: 'Research Lead', nodeType: 'agent', statusColor: 'bg-claw-red' },
    },
    {
      id: 'agent-researcher',
      type: 'topology',
      position: { x: 200, y: 470 },
      data: { label: 'Researcher', nodeType: 'agent', statusColor: 'bg-claw-red' },
    },
    {
      id: 'agent-writer',
      type: 'topology',
      position: { x: 370, y: 470 },
      data: { label: 'Writer', nodeType: 'agent', statusColor: 'bg-claw-red' },
    },
    {
      id: 'agent-reviewer',
      type: 'topology',
      position: { x: 200, y: 560 },
      data: { label: 'Reviewer', nodeType: 'agent', statusColor: 'bg-claw-red' },
    },
    {
      id: 'ens-platform',
      type: 'topology',
      position: { x: 60, y: 660 },
      data: { label: 'platform-team', nodeType: 'collapsed', count: 3 },
    },
    {
      id: 'ens-devops',
      type: 'topology',
      position: { x: 240, y: 660 },
      data: { label: 'devops-essentials', nodeType: 'collapsed', count: 2 },
    },
    {
      id: 'ens-local',
      type: 'topology',
      position: { x: 420, y: 660 },
      data: { label: 'local-inference', nodeType: 'collapsed', count: 2 },
    },
    {
      id: 'ens-developer',
      type: 'topology',
      position: { x: 600, y: 660 },
      data: { label: 'developer-team', nodeType: 'collapsed', count: 7 },
    },
  ], [])

  const edgeDefaults = {
    labelStyle: { fill: '#8a8c82', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: '#1a1a18', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  }

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'e-node-model',
      source: 'node1',
      target: 'model1',
      animated: true,
      style: { stroke: '#8a8c82', strokeWidth: 1.5 },
    },
    {
      id: 'e-model-provider',
      source: 'model1',
      target: 'provider1',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'inference',
      ...edgeDefaults,
      style: { stroke: '#c4532a', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#c4532a', width: 14, height: 14 },
    },
    {
      id: 'e-ens-model',
      source: 'ensemble1',
      target: 'model1',
      label: 'inference',
      ...edgeDefaults,
      animated: true,
      style: { stroke: '#f0ece4', strokeWidth: 1.5, strokeDasharray: '6 3' },
    },
    {
      id: 'e-writer-provider',
      source: 'agent-writer',
      target: 'provider1',
      label: 'inference',
      ...edgeDefaults,
      style: { stroke: '#c4532a', strokeWidth: 1, strokeDasharray: '4 4' },
    },
    {
      id: 'e-lead-researcher',
      source: 'agent-lead',
      target: 'agent-researcher',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'delegation',
      ...edgeDefaults,
      style: { stroke: '#f0ece4', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f0ece4', width: 12, height: 12 },
    },
    {
      id: 'e-researcher-writer',
      source: 'agent-researcher',
      target: 'agent-writer',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'delegation',
      ...edgeDefaults,
      style: { stroke: '#f0ece4', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f0ece4', width: 12, height: 12 },
    },
    {
      id: 'e-writer-reviewer',
      source: 'agent-writer',
      target: 'agent-reviewer',
      label: 'sequential',
      ...edgeDefaults,
      style: { stroke: '#c4532a', strokeWidth: 1.5, strokeDasharray: '4 4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#c4532a', width: 12, height: 12 },
    },
    {
      id: 'e-lead-reviewer',
      source: 'agent-lead',
      target: 'agent-reviewer',
      label: 'supervision',
      ...edgeDefaults,
      style: { stroke: '#8a8c82', strokeWidth: 1, strokeDasharray: '2 3' },
    },
  ], [])

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)

  const nodeTypes = useMemo(() => ({ topology: TopologyNode }), [])

  const onInit = useCallback(() => {}, [])

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cluster Topology</h3>
        <p className="text-sm text-slate-400">
          Interactive view of nodes, models, ensembles, and agent relationships — drag to explore
        </p>
      </div>

      <div className="border border-[#333330] overflow-hidden" style={{ height: 520 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onInit={onInit}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          className="!bg-[#111110]"
        >
          <Background color="#c4532a" gap={48} size={1.5} />
        </ReactFlow>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-[#8a8c82]">
        <LegendDot color="#c4532a" label="Gateway" />
        <LegendDot color="#f0ece4" label="K8s Nodes" />
        <LegendDot color="#c4532a" label="Providers" />
        <LegendDot color="#8a8c82" label="Models (Pod)" />
        <LegendDot color="#f0ece4" label="Ensembles" />
        <LegendDot color="#8a8c82" label="Agents" />
      </div>
    </div>
  )
}
