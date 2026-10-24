// Espelho tipado das tabelas do Supabase (schema 0001).
export type CompetencyStatus =
  | 'DOMINADO'
  | 'EM_REFORCO'
  | 'NAO_AVALIADO'
  | 'PENDENTE_DE_MODALIDADE';

export type StudentState = {
  user_id: string;
  cefr: string;
  module: string | null;
  lesson: string | null;
  phase: string;
  status: string;
  revision: number;
  updated_at: string;
};

export type Profile = {
  id: string;
  display_name: string | null;
  goal: string | null;
  minutes_per_day: number | null;
  passing_score_percent: number;
  study_mode: 'FLEXIVEL' | 'POMODORO';
  focus_minutes: number | null;
  break_minutes: number | null;
  professional_english: Record<string, unknown>;
};

export type CompetencyRow = {
  id: string;
  user_id: string;
  competency_code: string;
  status: CompetencyStatus;
  evidence: unknown[];
  updated_at: string;
};
