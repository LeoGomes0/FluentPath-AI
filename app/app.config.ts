import type { ExpoConfig } from 'expo/config';

// Credenciais lidas de variáveis de ambiente (arquivo .env, não versionado).
// A anon key é pública por design, mas mantemos fora do controle de versão
// como boa prática. Veja .env.example.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const config: ExpoConfig = {
  name: 'FluentPath AI',
  slug: 'fluentpath-ai',
  version: '0.1.0',
  orientation: 'portrait',
  scheme: 'fluentpath',
  userInterfaceStyle: 'automatic',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#0E1116',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'ai.fluentpath.app',
  },
  android: {
    package: 'ai.fluentpath.app',
    adaptiveIcon: {
      backgroundColor: '#0E1116',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: [
    'expo-router',
    [
      'expo-av',
      {
        microphonePermission:
          'O FluentPath AI usa o microfone para avaliar sua pronúncia e conversação.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supabaseUrl,
    supabaseAnonKey,
  },
};

export default config;
