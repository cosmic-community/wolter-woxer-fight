import Link from 'next/link'
import { getAllTeams, getAllCharacters, getAllBattles } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'
import TeamCard from '@/components/TeamCard'
import BattleCard from '@/components/BattleCard'

export default async function HomePage() {
  const [teams, characters, battles] = await Promise.all([
    getAllTeams(),
    getAllCharacters(),
    getAllBattles(),
  ])

  const topCharacters = characters.slice(0, 4)
  const recentBattles = battles.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-purple-600/20" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block animate-float mb-6">
            <span className="text-7xl md:text-9xl">⚔️</span>
          </div>
          <h1 className="font-display text-5xl md:text-8xl tracking-wider mb-6">
            <span className="text-orange-500 text-stroke">WOLTER</span>
            <span className="text-white mx-4">VS</span>
            <span className="text-purple-500 text-stroke">WOXER</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
            The ultimate battle! Join Wolter and Fexigirl as they face off against the explosive villain Woxer and his slime minions!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/characters" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl border-4 border-black comic-shadow text-lg uppercase tracking-wider transition-transform hover:scale-105">
              Meet the Heroes
            </Link>
            <Link href="/battles" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl border-4 border-black comic-shadow text-lg uppercase tracking-wider transition-transform hover:scale-105">
              See the Battles
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-black/40 border-y-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display text-4xl md:text-6xl text-orange-500 text-stroke">{teams.length}</div>
            <div className="text-white/80 uppercase text-sm font-semibold tracking-wider">Teams</div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-6xl text-yellow-400 text-stroke">{characters.length}</div>
            <div className="text-white/80 uppercase text-sm font-semibold tracking-wider">Characters</div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-6xl text-purple-500 text-stroke">{battles.length}</div>
            <div className="text-white/80 uppercase text-sm font-semibold tracking-wider">Battles</div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      {teams.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider text-stroke">
              🛡️ THE TEAMS
            </h2>
            <Link href="/teams" className="text-orange-400 hover:text-orange-300 font-bold uppercase text-sm tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}

      {/* Top Characters */}
      {topCharacters.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider text-stroke">
              🦸 TOP FIGHTERS
            </h2>
            <Link href="/characters" className="text-orange-400 hover:text-orange-300 font-bold uppercase text-sm tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Battles */}
      {recentBattles.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider text-stroke">
              ⚔️ EPIC BATTLES
            </h2>
            <Link href="/battles" className="text-orange-400 hover:text-orange-300 font-bold uppercase text-sm tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBattles.map((battle) => (
              <BattleCard key={battle.id} battle={battle} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}