# Arquitetura do Tutor de IA (Fase 3)

Decisão de arquitetura para o agente pedagógico do FluentPath AI.
Os arquivos `.md` em `skills/` continuam sendo a fonte de verdade pedagógica e
alimentam o system prompt do agente — nada neles muda.

## Stack escolhida

- **LangGraph.js** (StateGraph) — orquestração do agente como grafo de estados.
- **LangChain.js** — modelos de chat, tools e integração com OpenAI.
- **LangSmith** — tracing e observabilidade (via variáveis de ambiente).
- **OpenAI** — provedor do LLM (chave fornecida pelo usuário, só no servidor).

Referências (conteúdo parafraseado para conformidade de licença):
- Persistência/checkpointer: <https://docs.langchain.com/oss/javascript/langgraph/persistence>
- Tracing LangSmith: <https://docs.langchain.com/langsmith/trace-with-langchain>

LangChain/LangGraph atingiram 1.0 LTS (out/2025). O `AgentExecutor` legado está
deprecado; usamos **StateGraph** para orquestração customizada.

## Por que um serviço Node separado (e não Edge Function)

A ideia inicial era rodar o tutor numa Edge Function do Supabase (Deno). Mudamos para
um **serviço Node dedicado** porque:

- LangGraph com checkpointer e o tracing do LangSmith têm suporte maduro em Node;
  as melhores práticas de mercado assumem runtime Node.
- Facilita persistência do estado do grafo e depuração via LangSmith.

A regra de segurança permanece: a **OpenAI key nunca vai no app**. Ela fica no
serviço Node, junto do acesso ao Supabase via service_role (lado servidor).

```
App (Expo)  ──HTTPS──>  Serviço Tutor (Node + LangGraph)  ──>  OpenAI
                                 │                          └──>  LangSmith (tracing)
                                 └──>  Supabase (service_role, estado do aluno)
```

## Grafo do tutor (esboço de nós)

Modelado a partir do fluxo pedagógico dos `.md`:

- `recuperar_estado` — lê checkpoint do aluno (nível, módulo, lacunas, revisões).
- `rotear_intencao` — INICIAR / INTEGRAR / RETOMAR / dúvida pontual.
- `diagnostico` — avaliação escalonada quando necessário.
- `ensinar` — explicação + exemplos do objetivo CEFR atual.
- `praticar` — gera exercícios (aplica design-de-questoes.md).
- `corrigir` — feedback por item + rubricas.
- `validar_progressao` — aplica as duas regras de aprovação (meta 85–100% na aula;
  100% das competências para fechar nível). Código, não só confiança no LLM.
- `registrar_checkpoint` — persiste estado e revisões no Supabase.

O **checkpointer** do LangGraph preserva o estado do grafo entre turnos; o estado
pedagógico canônico (competências, provas) vive nas tabelas do Supabase.

## Variáveis de ambiente (serviço, nunca no app)

```
OPENAI_API_KEY=...
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=...
LANGSMITH_PROJECT=fluentpath-tutor
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Status

Planejado para a Fase 3. A Fase 1 (currículo) e a Fase 2 (exercícios) não dependem
deste serviço.
