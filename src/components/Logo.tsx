export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6"/>
          <stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#logoGrad)"/>
      <text x="16" y="24" fontFamily="Georgia,serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">Ω</text>
    </svg>
  )
}
