export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type TeamAlignment = 'Heroes' | 'Villains' | 'Neutral';

export interface Team extends CosmicObject {
  type: 'teams';
  metadata: {
    team_name?: string;
    description?: string;
    alignment?: TeamAlignment | { key: string; value: string };
    emblem?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    character_name?: string;
    role?: string | { key: string; value: string };
    team?: Team;
    special_power?: string;
    bio?: string;
    likes?: string;
    power_level?: number;
    character_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Battle extends CosmicObject {
  type: 'battles';
  metadata: {
    battle_title?: string;
    story?: string;
    fighters?: Character[];
    winner?: Character;
    battle_scene?: {
      url: string;
      imgix_url: string;
    };
  };
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}