/**
 * Neo-industrial background — corner brackets, system readout text,
 * dot patterns, and stamp elements. Only visible on industrial theme.
 */
export default function IndustrialBackground() {
  return (
    <div className="industrial-bg fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Corner bracket marks — L-shaped with dots */}
      <svg className="absolute top-8 left-6 w-8 h-8 opacity-[0.15]" viewBox="0 0 32 32">
        <path d="M0 12V0h12" fill="none" stroke="#e8562a" strokeWidth="2" />
        <circle cx="2" cy="2" r="2" fill="#e8562a" />
      </svg>
      <svg className="absolute top-8 right-6 w-8 h-8 opacity-[0.15]" viewBox="0 0 32 32">
        <path d="M32 12V0H20" fill="none" stroke="#e8562a" strokeWidth="2" />
        <circle cx="30" cy="2" r="2" fill="#e8562a" />
      </svg>
      <svg className="absolute bottom-8 left-6 w-8 h-8 opacity-[0.15]" viewBox="0 0 32 32">
        <path d="M0 20v12h12" fill="none" stroke="#e8562a" strokeWidth="2" />
        <circle cx="2" cy="30" r="2" fill="#e8562a" />
      </svg>
      <svg className="absolute bottom-8 right-6 w-8 h-8 opacity-[0.15]" viewBox="0 0 32 32">
        <path d="M32 20v12H20" fill="none" stroke="#e8562a" strokeWidth="2" />
        <circle cx="30" cy="30" r="2" fill="#e8562a" />
      </svg>

      {/* System readout — top */}
      <div className="absolute top-10 left-14 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f0ece4] opacity-[0.08] leading-5">
        <div>UNIT ID SYM-01 / COORDINATION LAYER</div>
      </div>
      <div className="absolute top-10 right-14 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f0ece4] opacity-[0.08] leading-5 text-right">
        <div>KUBERNETES NATIVE</div>
      </div>

      {/* System readout — bottom */}
      <div className="absolute bottom-10 left-14 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f0ece4] opacity-[0.08] leading-5">
        <div>STATUS: OPERATIONAL / LIVE</div>
      </div>
      <div className="absolute bottom-10 right-14 font-mono text-[9px] tracking-[0.2em] uppercase text-[#f0ece4] opacity-[0.08] leading-5 text-right">
        <div>DEPLOYMENT: ALPHA-K8S</div>
      </div>

      {/* Stamp — slow rotating */}
      <svg className="absolute top-[18%] left-[5%] w-[240px] h-[240px] opacity-[0.04] industrial-stamp" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="#e8562a" strokeWidth="2" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#e8562a" strokeWidth="1" strokeDasharray="4 4" />
        <ellipse cx="100" cy="100" rx="40" ry="25" fill="none" stroke="#e8562a" strokeWidth="1" transform="rotate(-20 100 100)" />
        <ellipse cx="100" cy="100" rx="35" ry="20" fill="none" stroke="#e8562a" strokeWidth="0.8" transform="rotate(30 100 100)" />
        <circle cx="100" cy="100" r="5" fill="#e8562a" opacity="0.5" />
        <defs>
          <path id="stamp-top" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0" />
          <path id="stamp-bot" d="M 100,100 m 70,0 a 70,70 0 1,1 -140,0" />
        </defs>
        <text fill="#e8562a" fontSize="8" fontFamily="monospace" letterSpacing="4">
          <textPath href="#stamp-top">SYMPOZIUM CONTROL</textPath>
        </text>
        <text fill="#e8562a" fontSize="8" fontFamily="monospace" letterSpacing="4">
          <textPath href="#stamp-bot">COORDINATION LAYER</textPath>
        </text>
      </svg>

      {/* Dot pattern cluster — top right */}
      <div className="absolute top-[12%] right-[10%] opacity-[0.06]">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#e8562a] rounded-full" />
          ))}
        </div>
      </div>

      {/* Dot pattern cluster — bottom left */}
      <div className="absolute bottom-[15%] left-[12%] opacity-[0.05]">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#f0ece4] rounded-full" />
          ))}
        </div>
      </div>

      {/* Horizontal accent lines */}
      <div className="absolute top-[50%] left-0 right-0 h-px bg-[#e8562a] opacity-[0.04]" />
    </div>
  )
}
