import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ConfigBanner } from '@/components/ConfigBanner';
import { TextField } from '@/components/TextField';
import { useAuth } from '@/features/auth/AuthProvider';
import { isSupabaseConfigured } from '@/lib/config';
import { theme } from '@/theme';

export default function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!isSupabaseConfigured) {
      Alert.alert('Configuração pendente', 'Preencha as credenciais do Supabase em app.json.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Senha curta', 'Use pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      const { needsConfirmation } = await signUp(email.trim(), password);
      if (needsConfirmation) {
        Alert.alert(
          'Conta criada',
          'Verifique seu e-mail para confirmar o cadastro, depois faça login.'
        );
        router.replace('/(auth)/sign-in');
      }
      // Sem confirmação pendente: a sessão já está ativa e o _layout
      // redireciona automaticamente para as abas.
    } catch (err) {
      Alert.alert('Não foi possível cadastrar', err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Criar conta</Text>

        <ConfigBanner />

        <TextField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="voce@email.com"
          keyboardType="email-address"
        />
        <TextField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="mínimo 6 caracteres"
          secureTextEntry
        />

        <Button label="Cadastrar" onPress={handleSignUp} loading={loading} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing(3),
    gap: theme.spacing(2),
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
});
