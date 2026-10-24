import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { theme } from '@/theme';

export default function Tutor() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tutor FluentPath',
          headerStyle: { backgroundColor: theme.colors.bg },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.bg },
        }}
      />
      <Screen>
        <Card title="Tutor de IA (Fase 3)">
          <Text style={styles.body}>
            Aqui vai o chat com o professor de IA. A chave da OpenAI ficará numa Edge Function
            do Supabase (nunca no app), e o tutor será alimentado pelas regras dos documentos
            do plugin.
          </Text>
          <Button label="Voltar" variant="ghost" onPress={() => router.back()} />
        </Card>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
