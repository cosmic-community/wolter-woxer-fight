import { getAllBattles } from '@/lib/cosmic'
import BattleCard from '@/components/BattleCard'

export default async function BattlesPage() {
  const battles = await getAllBattles()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke mb-4">
          ⚔️ BATTLES
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Epic confrontations that shaped the war
        </p>
      </div>

      {battles.length === 0 ? (
        <div className="text-center text-white/60 py-12">
          <p className="text-2xl">No battles recorded</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {battles.map((battle) => (
            <BattleCard key={battle.id} battle={battle} />
          ))}
        </div>
      )}
    </div>
  )
}