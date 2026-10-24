import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { getLevels } from '@/content/curriculum';
import { useCompetencies, useStudentState } from '@/features/student/api';
import { computeLevelProgress } from '@/features/student/progress';
import type { CompetencyStatus } from '@/features/student/types';
import { theme } from '@/theme';

const STATUS_LABEL: Record<CompetencyStatus, string> = {
  DOMINADO: 'Dominado',
  EM_REFORCO: 'Em reforço',
  NAO_AVALIADO: 'Não avaliado',
  PENDENTE_DE_MODALIDADE: 'Pendente de modalidade',
};

const STATUS_COLOR: Record<CompetencyStatus, string> = {
  DOMINADO: theme.colors.success,
  EM_REFORCO: theme.colors.warning,
  NAO_AVALIADO: theme.colors.textMuted,
  PENDENTE_DE_MODALIDADE: theme.colors.primary,
};

export default function Progress() {
  const levels = getLevels();
  const { data: competencies = [], isLoading } = useCompetencies();
  const { data: state } = useStudentState();

  return (
    <Screen>
      <Text style={styles.heading}>Progressão de aprendizagem</Text>
      <Text style={styles.subtitle}>
        As barras mostram objetivos de saída dominados sobre o total exigido — não
        percentuais de fluência. Um nível só conclui com 100% dominado.
      </Text>

      {isLoading ? (
        <ActivityIndicator color={theme.colors.primary} style={{ marginTop: theme.spacing(2) }} />
      ) : null}

      {levels.map((level) => {
        const progress = computeLevelProgress(level, competencies);
        const isCurrent = state?.cefr === level.code;
        return (
          <Card key={level.code}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelCode}>{level.code}</Text>
              <Text style={styles.levelName}>{level.name}</Text>
              {isCurrent ? <Text style={styles.currentBadge}>Atual</Text> : null}
            </View>

            <Text style={styles.outcome}>{level.outcome}</Text>

            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${progress.percent ?? 0}%` }]} />
            </View>
            <Text style={styles.barLabel}>
              Domínio dos objetivos de saída:{' '}
              {progress.percent === null ? '—' : `${progress.percent}%`} (
              {progress.mastered}/{progress.total})
            </Text>

            <Text style={styles.sectionTitle}>Competências de saída</Text>
            {level.exitCompetencies.map((comp) => {
              const status = progress.statusByCode[comp.code];
              return (
                <View key={comp.code} style={styles.compRow}>
                  <View style={[styles.dot, { backgroundColor: STATUS_COLOR[status] }]} />
                  <Text style={styles.compText}>
                    <Text style={styles.compCode}>{comp.code}</Text> · {comp.skill}
                    {'  '}
                    <Text style={{ color: STATUS_COLOR[status] }}>{STATUS_LABEL[status]}</Text>
                  </Text>
                </View>
              );
            })}

            <Text style={styles.sectionTitle}>Módulos</Text>
            <Text style={styles.modules}>
              {level.modules.map((m) => `${m.code} ${m.title}`).join(' · ')}
            </Text>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: theme.colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: theme.colors.textMuted, fontSize: 13, lineHeight: 18 },
  levelHeader: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
  levelCode: { color: theme.colors.primary, fontSize: 18, fontWeight: '800' },
  levelName: { color: theme.colors.text, fontSize: 15, fontWeight: '600', flex: 1 },
  currentBadge: {
    color: theme.colors.primaryText,
    backgroundColor: theme.colors.primary,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: theme.spacing(1),
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  outcome: { color: theme.colors.textMuted, fontSize: 13, lineHeight: 18 },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: theme.colors.primary },
  barLabel: { color: theme.colors.textMuted, fontSize: 12 },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: theme.spacing(0.5),
  },
  compRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
  dot: { width: 8, height: 8, borderRadius: 4 },
  compText: { color: theme.colors.textMuted, fontSize: 13, flex: 1 },
  compCode: { color: theme.colors.text, fontWeight: '700' },
  modules: { color: theme.colors.textMuted, fontSize: 12, lineHeight: 18 },
});
