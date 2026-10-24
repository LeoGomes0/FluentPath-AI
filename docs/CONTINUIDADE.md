# FluentPath AI — Guia de continuidade

Documento para retomar o desenvolvimento em outra máquina. Última atualização ao
final da Fase 1.

Repositório: <https://github.com/LeoGomes0/FluentPath-AI>

---

## 1. O que é o projeto

App web + Android + iPhone que transforma o plugin pedagógico FluentPath AI
(professor de inglês CEFR A1–C2) em um aplicativo real com backend, login,
progresso persistente, exercícios interativos, áudio e um tutor de IA.

Os arquivos `.md` em `skills/fluentpath-professor/` são a **fonte de verdade
pedagógica** e NÃO devem ser alterados. O app os consome (parser gera JSON; o
tutor de IA os usa como system prompt).

## 2. Stack

| Camada | Tecnologia |
| --- | --- |
| App (web/Android/iOS) | Expo + React Native + TypeScript |
| Navegação | expo-router (rotas por arquivo) |
| Backend/auth/dados/áudio | Supabase (Postgres + Auth + Storage) |
| Estado/dados no app | React Query + Zustand |
| Tutor de IA (Fase 3) | LangGraph + LangChain + LangSmith (serviço Node) + OpenAI |

## 3. Setup em uma máquina nova

Pré-requisitos: Node 20+, npm, git. Para testar no celular: app **Expo Go**.

```bash
git clone https://github.com/LeoGomes0/FluentPath-AI.git
cd FluentPath-AI/app
cp .env.example .env        # preencher com URL + anon key do Supabase
npm install
npm run web                 # abre no navegador
# npm start                 # QR code para o Expo Go no celular
```

O `.env` NÃO está no repositório (contém credenciais). Pegue os valores em:
Supabase → Project Settings → API.

Comandos úteis:

```bash
npm run typecheck      # checagem de tipos
npm run build:content  # regenera o currículo a partir dos .md
```

## 4. Estrutura de pastas

```
FluentPath-AI/
├─ plugin.json, README.md, .codex-plugin/   # plugin original (intacto)
├─ skills/fluentpath-professor/             # .md pedagógicos (FONTE DE VERDADE)
├─ docs/
│  ├─ arquitetura-tutor-ia.md               # decisão do tutor (LangGraph)
│  └─ CONTINUIDADE.md                        # este arquivo
├─ supabase/
│  └─ migrations/0001_initial_schema.sql    # schema do banco (já aplicado)
└─ app/                                      # aplicativo Expo
   ├─ app/                                   # rotas
   │  ├─ (auth)/   sign-in, sign-up
   │  ├─ (tabs)/   index, progress, reviews, profile
   │  └─ tutor.tsx (placeholder da Fase 3)
   ├─ src/
   │  ├─ lib/       supabase.ts, config.ts, empty-module.js
   │  ├─ features/  auth/, student/
   │  ├─ content/   curriculum.ts, curriculum.generated.json, types.ts
   │  └─ theme.ts, components/
   ├─ scripts/build-content.ts               # parser md -> json
   ├─ app.config.ts                          # config Expo (lê .env)
   └─ .env.example
```

## 5. Supabase (projeto já existente)

- Projeto ref: `uizrimtzxliqydehwgme`
- Schema aplicado (migration 0001): tabelas `profiles`, `student_state`,
  `competencies`, `assessments`, `reviews_due`, `audio_submissions`.
- RLS ativo em todas; cada aluno só acessa os próprios dados.
- Trigger `on_auth_user_created` cria `profile` + `student_state` no cadastro
  (padrões: meta 100%, modo FLEXIVEL, nível A1/TEORIA).

### Pendências de configuração no painel (não bloqueiam código)

1. **Confirmação de e-mail:** decidido DESLIGAR por enquanto para permitir
   cadastro de qualquer e-mail em desenvolvimento.
   Authentication → Sign In / Providers → Email → desligar "Confirm email".
2. **SMTP (Resend):** configurado, mas usando `onboarding@resend.dev`, que só
   entrega e-mail para o dono da conta Resend. Para abrir ao público: registrar
   um domínio próprio, verificar no Resend (Domains → Add Domain → DNS) e trocar
   o Sender para `noreply@seudominio` no Supabase.

### SEGURANÇA — rotacionar credenciais

Durante o setup, a `service_role` e a senha do banco passaram por um chat.
Rotacione as duas:
- service_role/JWT: Project Settings → API → Legacy keys → gerar novo JWT secret.
- Senha do banco: Project Settings → Database.
Ao trocar a anon key, atualizar `app/.env`. A anon key é pública por design.

## 6. Progresso por fase

- **Fase 0** — Fundação (auth, navegação, telas base, tema). ✅
- **Fase 1** — Currículo real dos .md + tela de progressão + estado do aluno. ✅
- **Fase 2** — Aulas e exercícios interativos (design-de-questoes.md) + validador
  de aprovação que grava competências no Supabase. ⬅️ PRÓXIMA
- **Fase 3** — Tutor de IA (serviço Node com LangGraph/LangChain/LangSmith +
  OpenAI). A OpenAI key fica no servidor, nunca no app. Ver
  `docs/arquitetura-tutor-ia.md`.
- **Fase 4** — Áudio real (gravação com expo-av, TTS, transcrição Whisper),
  rubricas de speaking/listening (avaliacao-oral-audio.md).
- **Fase 5** — Revisão espaçada (1/3/7/14/30 dias) + builds Android/iOS + PWA.

## 7. Regras pedagógicas que o código DEVE respeitar

Extraídas dos .md; já parcialmente refletidas no app:

- Duas aprovações distintas: meta de nota por aula (85–100%, padrão 100%) vs.
  100% das competências essenciais para concluir um nível CEFR.
- Nunca inventar progresso, nota, áudio ouvido ou revisão feita. Sem evidência →
  `NAO_AVALIADO` / `PENDENTE_DE_MODALIDADE`.
- Barras de progresso só com denominador real (objetivos dominados / total),
  nunca percentual de fluência inventado.
- Honestidade de áudio: não alegar que gravou/analisou sem recurso real.
- Pomodoro é opt-in e sempre explicado; ritmo flexível é o padrão.

## 8. Próximos passos imediatos (Fase 2)

1. Tela de aula `app/lesson/[id].tsx` começando por A1-M1.
2. Componentes de questão (campo, alternativa, múltiplas lacunas) seguindo
   `references/design-de-questoes.md`.
3. Validador de aprovação que atualiza `competencies` e `assessments` no Supabase.
4. Ligar a conclusão de aula ao avanço de `student_state`.
