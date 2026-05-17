/**
 * Subtle drifting organic shapes that float in the background.
 * Only renders on the jade theme for the membrane-inspired feel.
 * Shapes stay at low opacity — just visible enough to suggest life.
 */
export default function OrganicBackground() {
  return (
    <div className="organic-bg fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large slow-drifting cell shapes */}
      <svg className="organic-shape absolute -top-32 -left-32 w-[500px] h-[500px] opacity-[0.035]" viewBox="0 0 200 200">
        <path
          d="M100 20 C140 20, 180 50, 175 100 C170 150, 130 180, 90 175 C50 170, 20 140, 25 90 C30 40, 60 20, 100 20Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M100 40 C130 40, 155 60, 152 100 C149 140, 125 158, 95 155 C65 152, 42 130, 45 95 C48 60, 70 40, 100 40Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>

      <svg className="organic-shape organic-shape-delay-1 absolute top-[20%] -right-20 w-[400px] h-[400px] opacity-[0.03]" viewBox="0 0 200 200">
        <path
          d="M90 15 C135 10, 185 45, 180 95 C175 145, 140 185, 95 180 C50 175, 15 145, 20 95 C25 45, 45 20, 90 15Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      </svg>

      <svg className="organic-shape organic-shape-delay-2 absolute top-[45%] left-[10%] w-[350px] h-[350px] opacity-[0.025]" viewBox="0 0 200 200">
        <path
          d="M105 25 C150 30, 175 65, 170 105 C165 145, 135 175, 95 170 C55 165, 30 135, 35 95 C40 55, 60 20, 105 25Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.4" />
      </svg>

      <svg className="organic-shape organic-shape-delay-3 absolute top-[65%] right-[15%] w-[450px] h-[450px] opacity-[0.03]" viewBox="0 0 200 200">
        <path
          d="M95 20 C140 15, 180 55, 175 100 C170 145, 135 180, 90 175 C45 170, 20 140, 25 95 C30 50, 50 25, 95 20Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <path
          d="M95 50 C125 47, 150 70, 148 100 C146 130, 125 150, 95 148 C65 146, 47 125, 50 98 C53 70, 65 53, 95 50Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
        />
      </svg>

      <svg className="organic-shape organic-shape-delay-4 absolute -bottom-24 left-[30%] w-[380px] h-[380px] opacity-[0.025]" viewBox="0 0 200 200">
        <path
          d="M100 18 C145 22, 182 52, 178 100 C174 148, 142 178, 98 175 C54 172, 22 142, 26 98 C30 54, 55 14, 100 18Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </svg>

      {/* Small dot connectors drifting */}
      <div className="organic-dots absolute top-[30%] left-[50%] w-2 h-2 rounded-full bg-current opacity-[0.04]" />
      <div className="organic-dots organic-shape-delay-2 absolute top-[55%] left-[25%] w-1.5 h-1.5 rounded-full bg-current opacity-[0.03]" />
      <div className="organic-dots organic-shape-delay-3 absolute top-[75%] left-[65%] w-2.5 h-2.5 rounded-full bg-current opacity-[0.035]" />
    </div>
  )
}
