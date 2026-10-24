# FluentPath AI — App (Expo / React Native)

Aplicativo web + Android + iPhone que materializa a "arquitetura futura" descrita
nos documentos do plugin FluentPath AI. Os arquivos `.md` em `../skills/` são a
fonte de verdade pedagógica e **não são modificados** por este app.

## Stack

- Expo + React Native + TypeScript (um código, três plataformas)
- expo-router (rotas por arquivo)
- Supabase (auth, Postgres, storage de áudio)
- React Query + Zustand (dados e estado)
- OpenAI via Edge Function do Supabase (tutor de IA — Fase 3)

## Rodar localmente

```bash
cd app
npm install
npm run web      # abre no navegador
npm start        # abre o Metro; use o app Expo Go no celular para escanear o QR
```

## Configuração do Supabase

Preencha em `app.json` (campo `expo.extra`):

```json
"supabaseUrl": "https://SEU-PROJETO.supabase.co",
"supabaseAnonKey": "SUA_ANON_KEY"
```

Enquanto não preencher, o app roda mas mostra um aviso e o login fica inativo.
A `anon key` é pública por design; a chave da OpenAI **nunca** vai aqui — ela fica
numa Edge Function (Fase 3).

## Geração de conteúdo (md -> json)

```bash
npm run build:content
```

Lê o currículo dos `.md` e gera `src/content/curriculum.generated.json`.

## Fases

- **Fase 0 (atual):** fundação — auth, navegação, telas base, tema. ✅
- **Fase 1:** currículo + progressão a partir dos `.md`.
- **Fase 2:** aulas e exercícios interativos.
- **Fase 3:** tutor de IA (OpenAI via Edge Function).
- **Fase 4:** áudio real (gravação, TTS, Whisper).
- **Fase 5:** revisão espaçada + builds Android/iOS/PWA.
