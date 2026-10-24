import { StyleSheet, Text } from 'react-native';

import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { theme } from '@/theme';

export default function Reviews() {
  return (
    <Screen>
      <Text style={styles.heading}>Revisão espaçada</Text>
      <Card title="Sem revisões pendentes">
        <Text style={styles.body}>
          As revisões (intervalos de 1, 3, 7, 14 e 30 dias) serão registradas conforme você
          concluir aulas e provas. Chega na Fase 5.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  body: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
