export function Logo({ className = "w-8 h-8", variant = "default" }: { className?: string; variant?: "default" | "dark" | "light" }) {
  // Default: black omega on transparent (for light backgrounds)
  // Dark: white omega for dark backgrounds  
  // Light: keeps the purple gradient
  
  if (variant === "light") {
    return (
      <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#A855F7"/>
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="4" fill="url(#logoGradLight)"/>
        <text x="16" y="24" fontFamily="Georgia,serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">Ω</text>
      </svg>
    )
  }

  if (variant === "dark") {
    return (
      <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="white"/>
        <text x="16" y="24" fontFamily="Georgia,serif" fontSize="22" fontWeight="bold" fill="black" textAnchor="middle">Ω</text>
      </svg>
    )
  }

  // Default: black square with white omega
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="black"/>
      <text x="16" y="24" fontFamily="Georgia,serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">Ω</text>
    </svg>
  )
}
