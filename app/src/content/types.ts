// Tipos do currículo gerado a partir dos .md pedagógicos.
export type CefrCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type CurriculumModule = {
  code: string; // ex.: "A1-M1"
  title: string; // ex.: "Fundamentos de frase"
};

export type ExitCompetency = {
  code: string; // ex.: "A1-L"
  skill: string; // ex.: "Listening"
  description: string;
};

export type CurriculumLevel = {
  code: CefrCode;
  name: string; // ex.: "Iniciante"
  outcome: string; // "Saída desejada"
  modules: CurriculumModule[];
  exitCompetencies: ExitCompetency[];
};

export type Curriculum = {
  generatedAt: string;
  sources: string[];
  levels: CurriculumLevel[];
};
