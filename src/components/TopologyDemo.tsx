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

/* ── colour tokens ─────────────────────────────────── */
const C = {
  gateway:  { bg: '#1a1a2e', border: '#6366f1', text: '#a5b4fc' },
  node:     { bg: '#0f2a1a', border: '#22c55e', text: '#86efac' },
  model:    { bg: '#0f2a1a', border: '#22c55e', text: '#86efac' },
  provider: { bg: '#2a1a0f', border: '#f97316', text: '#fdba74' },
  ensemble: { bg: '#1a1a2e', border: '#8b5cf6', text: '#c4b5fd' },
  agent:    { bg: '#1a1a2e', border: '#8b5cf6', text: '#c4b5fd' },
  collapsed:{ bg: '#111827', border: '#374151', text: '#6b7280' },
}

/* ── Badge ────────────────────────────────────────── */
function Badge({ label, color = 'green' }: { label: string; color?: string }) {
  const colours: Record<string, string> = {
    green:  'bg-claw-green/20 text-claw-green border-claw-green/30',
    blue:   'bg-kube-blue/20 text-kube-blue border-kube-blue/30',
    orange: 'bg-claw-orange/20 text-claw-orange border-claw-orange/30',
    purple: 'bg-claw-purple/20 text-claw-purple border-claw-purple/30',
    slate:  'bg-slate-700/40 text-slate-400 border-slate-600/30',
  }
  return (
    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${colours[color] ?? colours.slate}`}>
      {label}
    </span>
  )
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

  // Collapsed ensemble — smaller, muted
  if (d.nodeType === 'collapsed') {
    return (
      <div
        className="rounded-lg border px-3 py-2 min-w-[120px] text-center cursor-grab"
        style={{ background: c.bg, borderColor: c.border }}
      >
        <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-600 !border-slate-500" />
        <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-slate-600 !border-slate-500" />
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-[10px]" style={{ color: c.text }}>
            {'\u{1F465}'} {d.label}
          </span>
          {d.count && (
            <span className="text-[9px] text-slate-500">{d.count}</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl border shadow-lg min-w-[140px] cursor-grab"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !border-2" style={{ background: c.border, borderColor: c.bg }} />
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !border-2" style={{ background: c.border, borderColor: c.bg }} />
      <Handle type="target" position={Position.Left} className="!w-2.5 !h-2.5 !border-2" style={{ background: c.border, borderColor: c.bg }} />
      <Handle type="source" position={Position.Right} className="!w-2.5 !h-2.5 !border-2" style={{ background: c.border, borderColor: c.bg }} />

      <div className="px-3 py-2.5">
        {/* icon + label */}
        <div className="flex items-center gap-2 mb-1">
          {d.nodeType === 'gateway'  && <span className="text-sm">{'\u{2699}\uFE0F'}</span>}
          {d.nodeType === 'node'     && <span className="text-sm">{'\u{1F5A5}\uFE0F'}</span>}
          {d.nodeType === 'model'    && <span className="text-sm">{'\u{1F9E0}'}</span>}
          {d.nodeType === 'provider' && <span className="text-sm">{'\u{2699}\uFE0F'}</span>}
          {d.nodeType === 'ensemble' && <span className="text-sm">{'\u{1F465}'}</span>}
          {d.nodeType === 'agent'    && <span className="text-sm">{'\u{1F464}'}</span>}
          <span className="text-xs font-bold" style={{ color: c.text }}>
            {d.label}
          </span>
          {d.statusColor && (
            <span className={`w-2 h-2 rounded-full ${d.statusColor}`} />
          )}
        </div>

        {/* subtitle */}
        {d.subtitle && (
          <div className="text-[10px] text-slate-500 mb-1.5">{d.subtitle}</div>
        )}

        {/* badges */}
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
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </span>
  )
}

/* ── Main component ───────────────────────────────── */
export default function TopologyDemo() {
  const initialNodes: Node[] = useMemo(() => [
    // Gateway
    {
      id: 'gateway',
      type: 'topology',
      position: { x: 350, y: 0 },
      data: { label: 'Gateway', nodeType: 'gateway', subtitle: 'Not Configured' },
    },
    // K8s Node
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
    // Model pod
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
    // Provider
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
    // Ensemble — research-team
    {
      id: 'ensemble1',
      type: 'topology',
      position: { x: 180, y: 380 },
      data: {
        label: 'research-team',
        nodeType: 'ensemble',
        statusColor: 'bg-claw-green',
      },
    },
    // Agents
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
    // Collapsed ensembles
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

  const initialEdges: Edge[] = useMemo(() => [
    // Node → Model
    {
      id: 'e-node-model',
      source: 'node1',
      target: 'model1',
      animated: true,
      style: { stroke: '#22c55e', strokeWidth: 1.5 },
    },
    // Model → Provider (inference)
    {
      id: 'e-model-provider',
      source: 'model1',
      target: 'provider1',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'inference',
      labelStyle: { fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [4, 2] as [number, number],
      style: { stroke: '#f97316', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316', width: 14, height: 14 },
    },
    // Ensemble → Model (inference)
    {
      id: 'e-ens-model',
      source: 'ensemble1',
      target: 'model1',
      label: 'inference',
      labelStyle: { fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [4, 2] as [number, number],
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '6 3' },
    },
    // Agents → inference edges
    {
      id: 'e-writer-provider',
      source: 'agent-writer',
      target: 'provider1',
      label: 'inference',
      labelStyle: { fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [4, 2] as [number, number],
      style: { stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' },
    },
    // Agent relationships
    {
      id: 'e-lead-researcher',
      source: 'agent-lead',
      target: 'agent-researcher',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'delegation',
      labelStyle: { fill: '#c4b5fd', fontSize: 9, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [3, 2] as [number, number],
      style: { stroke: '#8b5cf6', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6', width: 12, height: 12 },
    },
    {
      id: 'e-researcher-writer',
      source: 'agent-researcher',
      target: 'agent-writer',
      sourceHandle: 'right',
      targetHandle: 'left',
      label: 'delegation',
      labelStyle: { fill: '#c4b5fd', fontSize: 9, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [3, 2] as [number, number],
      style: { stroke: '#8b5cf6', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6', width: 12, height: 12 },
    },
    {
      id: 'e-writer-reviewer',
      source: 'agent-writer',
      target: 'agent-reviewer',
      label: 'sequential',
      labelStyle: { fill: '#fdba74', fontSize: 9, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [3, 2] as [number, number],
      style: { stroke: '#f97316', strokeWidth: 1.5, strokeDasharray: '4 4' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316', width: 12, height: 12 },
    },
    {
      id: 'e-lead-reviewer',
      source: 'agent-lead',
      target: 'agent-reviewer',
      label: 'supervision',
      labelStyle: { fill: '#fde047', fontSize: 9, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
      labelBgPadding: [3, 2] as [number, number],
      style: { stroke: '#eab308', strokeWidth: 1, strokeDasharray: '2 3' },
    },
  ], [])

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)

  const nodeTypes = useMemo(() => ({ topology: TopologyNode }), [])

  const onInit = useCallback(() => {
    // noop — layout is static
  }, [])

  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Cluster Topology</h3>
        <p className="text-sm text-slate-400">
          Interactive view of nodes, models, ensembles, and agent relationships — drag to explore
        </p>
      </div>

      {/* React Flow canvas */}
      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ height: 520 }}>
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
          className="!bg-[#0a0e1a]"
        >
          <Background color="#1e293b" gap={24} size={1} />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] font-mono text-slate-500">
        <LegendDot color="bg-indigo-400" label="Gateway" />
        <LegendDot color="bg-green-400" label="K8s Nodes" />
        <LegendDot color="bg-orange-400" label="Providers" />
        <LegendDot color="bg-green-500" label="Models (Pod)" />
        <LegendDot color="bg-purple-400" label="Ensembles" />
        <LegendDot color="bg-purple-300" label="Agents" />
      </div>
    </div>
  )
}
