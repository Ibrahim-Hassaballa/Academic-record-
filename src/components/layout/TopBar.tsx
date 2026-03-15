
interface TopBarProps {
  onMenuToggle: () => void
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 sticky top-0 z-30 lg:hidden">
      {/* Hamburger (mobile only) */}
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Logo */}
      <img src="/logo_edu.svg" alt="KSU EduGate" className="h-7 ms-3 object-contain max-w-[140px]" />
    </header>
  )
}
