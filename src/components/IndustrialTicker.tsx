/**
 * Top status ticker bar — bold orange with dark mono text.
 * Only visible on the industrial theme.
 */
export default function IndustrialTicker() {
  const items = [
    'COORDINATION LAYER — ACTIVE',
    'KUBERNETES-NATIVE CONTROL PLANE',
    'SYNTHETIC MEMBRANE PROTOCOL',
    'AGENT ISOLATION: ENFORCED',
    'ENSEMBLE STATUS: NOMINAL',
    'CRD POLICY ENGINE: ONLINE',
    'MULTI-TENANT ORCHESTRATION',
    'STRUCTURED HANDOFFS ENABLED',
    'FIELD TESTED / STATUS — OPERATIONAL',
  ]

  const doubled = [...items, ...items]

  return (
    <div className="industrial-ticker fixed top-0 left-0 right-0 z-[60] h-7 bg-[#e8562a] border-b border-[#c44820] flex items-center overflow-hidden">
      <div className="industrial-ticker-scroll flex items-center gap-8 whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-semibold tracking-[0.15em] text-[#1a1a18]">
              {text}
            </span>
            <span className="text-[#1a1a18] text-[8px] opacity-50">&#9656;&#9656;&#9656;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
