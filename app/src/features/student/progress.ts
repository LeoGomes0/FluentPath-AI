import type { CurriculumLevel } from '@/content/curriculum';

import type { CompetencyRow, CompetencyStatus } from './types';

export type LevelProgress = {
  level: CurriculumLevel;
  total: number; // competências essenciais exigidas
  mastered: number; // com status DOMINADO
  /** Percentual de objetivos de saída DOMINADO, ou null se não há denominador. */
  percent: number | null;
  statusByCode: Record<string, CompetencyStatus>;
  /** true somente se TODAS as competências essenciais estão DOMINADO. */
  levelComplete: boolean;
};

/**
 * Calcula o progresso de um nível cruzando o currículo (competências exigidas)
 * com as competências registradas do aluno. Segue a regra dos .md:
 * a barra é "objetivos DOMINADO / objetivos exigidos", nunca fluência inventada;
 * e um nível só é concluído com 100% DOMINADO.
 */
export function computeLevelProgress(
  level: CurriculumLevel,
  competencies: CompetencyRow[]
): LevelProgress {
  const byCode = new Map(competencies.map((c) => [c.competency_code, c.status]));
  const statusByCode: Record<string, CompetencyStatus> = {};

  let mastered = 0;
  for (const comp of level.exitCompetencies) {
    const status = byCode.get(comp.code) ?? 'NAO_AVALIADO';
    statusByCode[comp.code] = status;
    if (status === 'DOMINADO') mastered += 1;
  }

  const total = level.exitCompetencies.length;
  const percent = total > 0 ? Math.round((mastered / total) * 100) : null;
  const levelComplete = total > 0 && mastered === total;

  return { level, total, mastered, percent, statusByCode, levelComplete };
}
