/**
 * build-content.ts
 *
 * Lê os .md pedagógicos (fonte de verdade, nunca modificados) e gera
 * src/content/curriculum.generated.json consumido pelo app.
 *
 * Fontes:
 *  - references/curriculo-cefr.md       -> níveis, saída desejada, módulos
 *  - references/marcos-cefr-criterios.md -> competências essenciais de saída
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

type CefrCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
const LEVEL_CODES: CefrCode[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

type CurriculumModule = { code: string; title: string };
type ExitCompetency = { code: string; skill: string; description: string };
type CurriculumLevel = {
  code: CefrCode;
  name: string;
  outcome: string;
  modules: CurriculumModule[];
  exitCompetencies: ExitCompetency[];
};

const ROOT = join(__dirname, '..', '..');
const SKILLS = join(ROOT, 'skills', 'fluentpath-professor', 'references');
const CURRICULO = join(SKILLS, 'curriculo-cefr.md');
const MARCOS = join(SKILLS, 'marcos-cefr-criterios.md');
const OUT = join(__dirname, '..', 'src', 'content', 'curriculum.generated.json');

/** Quebra o arquivo em seções por nível, a partir de headers "## A1 — Iniciante". */
function splitLevelSections(md: string): Map<CefrCode, { name: string; body: string }> {
  const result = new Map<CefrCode, { name: string; body: string }>();
  // Captura "## A1 — Iniciante" (traço em — ou -) e o corpo até o próximo "## ".
  const re = /^##\s+(A1|A2|B1|B2|C1|C2)\s*[—-]\s*([^\n]+)\n([\s\S]*?)(?=^##\s|\Z)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const code = m[1] as CefrCode;
    const name = m[2].trim();
    result.set(code, { name, body: m[3] });
  }
  return result;
}

/** Extrai "**Saída desejada:** ..." (uma linha) do corpo de um nível. */
function parseOutcome(body: string): string {
  const m = body.match(/\*\*Sa[ií]da desejada:\*\*\s*([^\n]+)/i);
  return m ? m[1].trim() : '';
}

/**
 * Extrai módulos. Suporta os dois formatos presentes no .md:
 *  - "1. **A1-M1 Fundamentos de frase:** ..."
 *  - "1. A2-M1 Revisão integrada do presente e formas de rotina."
 */
function parseModules(body: string): CurriculumModule[] {
  const modules: CurriculumModule[] = [];
  const seen = new Set<string>();
  const lineRe = /^\s*\d+\.\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = lineRe.exec(body)) !== null) {
    const raw = m[1].replace(/\*\*/g, '').trim();
    // Espera iniciar por um código tipo "A1-M1".
    const codeMatch = raw.match(/^([A-C][12]-M\d+)\s*(.*)$/);
    if (!codeMatch) continue;
    const code = codeMatch[1];
    if (seen.has(code)) continue;
    seen.add(code);
    let title = codeMatch[2].trim();
    // Corta no primeiro ":" ou "." que encerra o título curto.
    title = title.replace(/[:.].*$/s, '').trim();
    modules.push({ code, title });
  }
  return modules;
}

const SKILL_NAMES: Record<string, string> = {
  L: 'Listening',
  R: 'Reading',
  SP: 'Spoken production',
  SI: 'Spoken interaction',
  W: 'Writing',
  M: 'Mediation',
};

/**
 * Extrai competências de saída do marcos-cefr-criterios.md.
 * Formato: "- **A1-L (Listening):** identificar palavras..."
 */
function parseCompetencies(marcosMd: string, level: CefrCode): ExitCompetency[] {
  const comps: ExitCompetency[] = [];
  // Formato real: "- **A1-L (Listening):** descrição..."
  // O código e o rótulo ficam dentro de **...**, terminando em ":**".
  const re = new RegExp(
    `^-\\s+\\*\\*(${level}-(L|R|SP|SI|W|M))\\b[^*]*:\\*\\*\\s*([^\\n]+)`,
    'gm'
  );
  let m: RegExpExecArray | null;
  while ((m = re.exec(marcosMd)) !== null) {
    const code = m[1];
    const skillKey = m[2];
    const description = m[3].trim();
    comps.push({ code, skill: SKILL_NAMES[skillKey] ?? skillKey, description });
  }
  return comps;
}

function main() {
  for (const p of [CURRICULO, MARCOS]) {
    if (!existsSync(p)) {
      console.error('Fonte .md não encontrada:', p);
      process.exit(1);
    }
  }

  const curriculoMd = readFileSync(CURRICULO, 'utf8');
  const marcosMd = readFileSync(MARCOS, 'utf8');
  const sections = splitLevelSections(curriculoMd);

  const levels: CurriculumLevel[] = [];
  for (const code of LEVEL_CODES) {
    const section = sections.get(code);
    if (!section) {
      console.warn(`Aviso: nível ${code} não encontrado em curriculo-cefr.md`);
      continue;
    }
    const modules = parseModules(section.body);
    const exitCompetencies = parseCompetencies(marcosMd, code);
    levels.push({
      code,
      name: section.name,
      outcome: parseOutcome(section.body),
      modules,
      exitCompetencies,
    });
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sources: [CURRICULO, MARCOS].map((p) => p.replace(ROOT, '').replace(/\\/g, '/')),
    levels,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  // Relatório de sanidade.
  console.log('Gerado:', OUT.replace(ROOT, '').replace(/\\/g, '/'));
  for (const lvl of levels) {
    console.log(
      `  ${lvl.code} ${lvl.name}: ${lvl.modules.length} módulos, ` +
        `${lvl.exitCompetencies.length} competências de saída`
    );
  }
}

main();
