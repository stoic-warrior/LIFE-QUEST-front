export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface User {
  uuid: string;
  email: string;
  nickname: string;
  level: number;
  currentXp: number;
  totalXp: number;
  gold: number;
  streakDays: number;
}

export interface UserStats {
  strength: number;
  intelligence: number;
  creativity: number;
  social: number;
  emotional: number;
  spiritual: number;
}

export type QuestType = 'DAILY' | 'MAIN' | 'GUILD' | 'SIDE' | 'EVENT';
export type StatType =
  | 'STRENGTH'
  | 'INTELLIGENCE'
  | 'CREATIVITY'
  | 'SOCIAL'
  | 'EMOTIONAL'
  | 'SPIRITUAL';

export interface Quest {
  id: number;
  title: string;
  description: string;
  type: QuestType;
  difficulty: number;
  baseXp: number;
  goldReward: number;
  targetStat: StatType;
  repeatable: boolean;
}

export interface QuestCreateRequest {
  title: string;
  description: string;
  type: QuestType;
  difficulty: number;
  baseXp: number;
  goldReward: number;
  targetStat: StatType;
  repeatable: boolean;
}

export interface QuestCompletionResult {
  xpEarned: number;
  goldEarned: number;
  statPoints: number;
  newLevel: number;
  leveledUp: boolean;
}
