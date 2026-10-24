import { StyleSheet, Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { useAuth } from '@/features/auth/AuthProvider';
import { useProfile } from '@/features/student/api';
import { theme } from '@/theme';

export default function Profile() {
  const { session, signOut } = useAuth();
  const { data: profile } = useProfile();

  const modeLabel =
    profile?.study_mode === 'POMODORO' ? 'Pomodoro' : 'Ritmo flexível (padrão)';

  return (
    <Screen>
      <Text style={styles.heading}>Perfil</Text>

      <Card title="Conta">
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{session?.user.email ?? '—'}</Text>
      </Card>

      <Card title="Metas">
        <Text style={styles.label}>Aprovação por aula</Text>
        <Text style={styles.value}>{profile?.passing_score_percent ?? 100}%</Text>
        <Text style={styles.body}>
          Para concluir um nível CEFR é preciso 100% das competências essenciais
          dominadas, independentemente da nota de uma prova.
        </Text>
      </Card>

      <Card title="Preferências de estudo">
        <Text style={styles.label}>Modo</Text>
        <Text style={styles.value}>{modeLabel}</Text>
        <Text style={styles.body}>
          {profile?.study_mode === 'POMODORO'
            ? `Ciclos de ${profile.focus_minutes ?? 25} min de foco e ${profile.break_minutes ?? 5} min de pausa, ajustáveis.`
            : 'Estude em blocos ajustáveis ao assunto, com pausas conforme necessário. Pomodoro é opcional.'}
        </Text>
      </Card>

      <Button label="Sair" variant="ghost" onPress={signOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: theme.colors.text, fontSize: 22, fontWeight: '800' },
  label: { color: theme.colors.textMuted, fontSize: 12 },
  value: { color: theme.colors.text, fontSize: 15, fontWeight: '600' },
  body: { color: theme.colors.textMuted, fontSize: 14, lineHeight: 20 },
});
