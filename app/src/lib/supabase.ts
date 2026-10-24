import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './config';

// Em mobile usamos AsyncStorage para persistir a sessão.
// Na web o supabase-js usa localStorage automaticamente.
const authStorage = Platform.OS === 'web' ? undefined : AsyncStorage;

// Stub de WebSocket: nunca conecta. Satisfaz o RealtimeClient do supabase-js
// sem depender de WebSocket nativo (ausente no Node < 22 usado na pré-render web).
class NoopWebSocket {
  static readonly CONNECTING = 0;
  static readonly OPEN = 1;
  static readonly CLOSING = 2;
  static readonly CLOSED = 3;
  readyState = NoopWebSocket.CLOSED;
  constructor(..._args: unknown[]) {}
  send() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}

export const supabase = createClient(
  // Placeholders evitam crash quando as credenciais ainda não foram preenchidas.
  isSupabaseConfigured ? SUPABASE_URL : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? SUPABASE_ANON_KEY : 'placeholder-anon-key',
  {
    auth: {
      storage: authStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === 'web',
    },
    // Não usamos Realtime; passamos um transport WebSocket inócuo para evitar
    // que o RealtimeClient quebre na pré-renderização web (Node < 22 sem
    // WebSocket nativo). O app só usa auth + queries REST.
    realtime: { transport: NoopWebSocket as never },
  }
);
