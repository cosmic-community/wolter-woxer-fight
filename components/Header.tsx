import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b-4 border-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:animate-pulse">⚔️</span>
          <span className="font-display text-2xl md:text-3xl text-white tracking-wider">
            <span className="text-orange-500">WOLTER</span> vs <span className="text-purple-500">WOXER</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-white font-semibold">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link href="/teams" className="hover:text-orange-400 transition-colors">Teams</Link>
          <Link href="/characters" className="hover:text-orange-400 transition-colors">Characters</Link>
          <Link href="/battles" className="hover:text-orange-400 transition-colors">Battles</Link>
        </nav>
        <nav className="flex md:hidden gap-3 text-sm text-white font-semibold">
          <Link href="/teams" className="hover:text-orange-400">Teams</Link>
          <Link href="/characters" className="hover:text-orange-400">Chars</Link>
          <Link href="/battles" className="hover:text-orange-400">Battles</Link>
        </nav>
      </div>
    </header>
  )
}