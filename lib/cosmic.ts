import { createBucketClient } from '@cosmicjs/sdk'
import { Team, Character, Battle, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getAllTeams(): Promise<Team[]> {
  try {
    const response = await cosmic.objects.find({ type: 'teams' }).depth(1)
    return response.objects as Team[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch teams')
  }
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'teams', slug }).depth(1)
    return response.object as Team
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch team')
  }
}

export async function getAllCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects.find({ type: 'characters' }).depth(1)
    const characters = response.objects as Character[]
    return characters.sort((a, b) => {
      const aLevel = a.metadata?.power_level || 0
      const bLevel = b.metadata?.power_level || 0
      return bLevel - aLevel
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'characters', slug }).depth(1)
    return response.object as Character
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch character')
  }
}

export async function getCharactersByTeam(teamId: string): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters', 'metadata.team': teamId })
      .depth(1)
    return response.objects as Character[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch team characters')
  }
}

export async function getAllBattles(): Promise<Battle[]> {
  try {
    const response = await cosmic.objects.find({ type: 'battles' }).depth(1)
    return response.objects as Battle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch battles')
  }
}

export async function getBattleBySlug(slug: string): Promise<Battle | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'battles', slug }).depth(1)
    return response.object as Battle
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch battle')
  }
}