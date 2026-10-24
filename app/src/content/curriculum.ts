import type { Curriculum, CurriculumLevel, CefrCode } from './types';
import generated from './curriculum.generated.json';

// O JSON é gerado por `npm run build:content` a partir dos .md pedagógicos.
export const curriculum = generated as Curriculum;

export function getLevels(): CurriculumLevel[] {
  return curriculum.levels;
}

export function getLevel(code: CefrCode): CurriculumLevel | undefined {
  return curriculum.levels.find((l) => l.code === code);
}

export const LEVEL_ORDER: CefrCode[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export type { Curriculum, CurriculumLevel, CefrCode, ExitCompetency, CurriculumModule } from './types';
