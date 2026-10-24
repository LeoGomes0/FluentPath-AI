import { StyleSheet, Text, View } from 'react-native';

import { isSupabaseConfigured } from '@/lib/config';
import { theme } from '@/theme';

// Aviso visível enquanto as credenciais do Supabase não forem preenchidas em app.json.
export function ConfigBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Supabase ainda não configurado</Text>
      <Text style={styles.body}>
        Preencha supabaseUrl e supabaseAnonKey em app.json (campo extra) para ativar login e dados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: theme.colors.surfaceAlt,
    borderColor: theme.colors.warning,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    gap: theme.spacing(0.5),
  },
  title: {
    color: theme.colors.warning,
    fontWeight: '700',
    fontSize: 14,
  },
  body: {
    color: theme.colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
