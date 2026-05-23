export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t-4 border-purple-500 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-display text-2xl text-white tracking-wider mb-2">
          ⚔️ THE BATTLE NEVER ENDS ⚔️
        </p>
        <p className="text-gray-400 text-sm">
          Wolter Woxer Fight © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}