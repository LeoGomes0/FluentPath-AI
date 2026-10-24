import { Redirect } from 'expo-router';

// Entrada neutra: o _layout redireciona conforme o estado de autenticação.
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
