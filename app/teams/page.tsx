import { getAllTeams } from '@/lib/cosmic'
import TeamCard from '@/components/TeamCard'

export default async function TeamsPage() {
  const teams = await getAllTeams()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-7xl text-white tracking-wider text-stroke mb-4">
          🛡️ THE TEAMS
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Heroes and villains face off in an epic conflict
        </p>
      </div>

      {teams.length === 0 ? (
        <div className="text-center text-white/60 py-12">
          <p className="text-2xl">No teams found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  )
}