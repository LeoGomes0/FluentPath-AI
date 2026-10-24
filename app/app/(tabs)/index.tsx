import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ConfigBanner } from '@/components/ConfigBanner';
import { Screen } from '@/components/Screen';
import { getLevel } from '@/content/curriculum';
import { useProfile, useStudentState } from '@/features/student/api';
import { theme } from '@/theme';

export default function Home() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const { data: state } = useStudentState();

  const level = state ? getLevel(state.cefr as never) : undefined;
  const greetingName = profile?.display_name ? `, ${profile.display_name}` : '';

  return (
    <Screen>
      <ConfigBanner />

      <Text style={styles.heading}>Bem-vindo de volta{greetingName} 👋</Text>
      <Text style={styles.subtitle}>
        Continue sua jornada do inglês pelo CEFR, do A1 ao C2.
      </Text>

      <Card title="Onde você está">
        {state ? (
          <Text style={styles.body}>
            Nível {state.cefr}
            {level ? ` · ${level.name}` : ''} · fase {state.phase.toLowerCase()}.
            {state.module ? ` Módulo ${state.module}.` : ''}
          </Text>
        ) : (
          <Text style={styles.body}>
            Faça login para carregar seu progresso. Novos alunos começam no A1.
          </Text>
        )}
        <Button label="Ver progressão" onPress={() => router.push('/(tabs)/progress')} />
      </Card>

      <Card title="Meta de aprovação">
        <Text style={styles.body}>
          {profile
            ? `Sua meta por aula é ${profile.passing_score_percent}%. Para concluir um nível CEFR, é preciso 100% das competências essenciais dominadas.`
            : 'Meta padrão: 100% por aula, e 100% das competências para concluir cada nível CEFR.'}
        </Text>
      </Card>

      <Card title="Tutor FluentPath">
        <Text style={styles.body}>
          O professor de IA conversacional será ativado na Fase 3 (LangGraph + OpenAI),
          usando a mesma pedagogia dos documentos do plugin.
        </Text>
        <Button label="Abrir tutor" variant="ghost" onPress={() => router.push('/tutor')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: theme.colors.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: theme.colors.textMuted, fontSize: 15 },
  body: { color: theme.colors.textMuted, fontSize: 14, lineHeight: 20 },
});
