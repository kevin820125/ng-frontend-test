export interface Rewards {
  experience: number;
  gold: number;
}

export default interface Quest {
  id: number;
  skillTree: string;
  skill: string;
  title: string;
  difficulty: number;
  experience: number;
  gold: number;
  type: string;
  cover: string;
  description: string;
  rewards: Rewards;
}
