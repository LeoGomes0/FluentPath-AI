# MVP leve — continuidade entre chats e economia de tokens

## Objetivo e recursos disponíveis

Implementar o melhor fluxo **sem backend, banco, hospedagem ou ferramenta MCP própria**. A base é (1) habilidade do FluentPath AI, (2) conversas organizadas quando possível em um Projeto do ChatGPT, (3) checkpoint portátil versionado entregue ao aluno em formato JSON ou texto equivalente. A memória do ChatGPT/Projeto pode ajudar a localizar contexto, mas **não é fonte de verdade nem sincronização transacional**. A persistência do checkpoint exige que o aluno o conserve e disponibilize, ou que uma ferramenta com permissão confirme realmente que o armazenou.

## Prioridade de recuperação do estado

1. Registro/checkpoint mais recente confirmado (anexo ou arquivo do Projeto efetivamente acessível), com `revision`, data de atualização e estágio definido.
2. Evidências explícitas da conversa atual e avaliações anteriores identificáveis, sem sobrescrever histórico comprovado.
3. Memória e outras conversas do Projeto como pistas auxiliares, **nunca presumidas exatas**.
4. Se nenhum registro confiável: perguntar somente qual foi última aula, status e prova, ou solicitar o arquivo. Estado desconhecido recebe `NAO_AVALIADO`; nenhum salto de módulo/CEFR.

Quando houver mais de uma versão: selecionar a maior `revision` **somente se** ela for posterior e semanticamente compatível; se versões conflitantes foram alteradas em chats paralelos, não somar aprovações automaticamente. Mostrar o conflito e resolver com o aluno/evidência. Jamais alterar o documento original sem ferramentas de escrita e confirmação.

## Estrutura mínima do checkpoint

Usar JSON enxuto, legível, sem dados pessoais sensíveis desnecessários. Esquema operacional indicativo:

```json
{
  "schema_version": "1.0",
  "revision": 1,
  "updated_at": "AAAA-MM-DD",
  "student_profile": {"goal": "", "minutes_per_day": null, "passing_score_percent": 100},
  "location": {"cefr": "A1", "module": "", "lesson": "", "phase": "TEORIA", "status": "EM_ANDAMENTO"},
  "mastery": {"approved_lessons": [], "essential_objectives": {}, "cefr_exit_criteria": {}},
  "assessments": {"last": null, "in_progress": null},
  "open_gaps": [],
  "reviews_due": [],
  "next_action": ""
}
```

Regras: usar valores somente quando fundamentados; manter notas/evidências relevantes; `status` de competência `DOMINADO`, `EM_REFORCO`, `NAO_AVALIADO`, `PENDENTE_DE_MODALIDADE`. IDs estáveis para competências/provas, datas reais, nenhuma nota ou conclusão inventada. `last` resume ID da prova, objetivo, nota, rubricas, data e status. `in_progress` indica onde interrompeu e quais itens já foram respondidos, sem publicar gabarito de prova em andamento. O histórico extenso, se existir, fica em arquivo separado; o checkpoint deve ser pequeno e suficiente para retomar.

## Ciclo de trabalho por sessão

**Abertura:** (a) identificar checkpoint e versão; (b) ler apenas estado mínimo, pré-requisitos e atividade pendente; (c) pedir uma pergunta breve se falta estado crítico; (d) retomar. Não reproduzir longas entrevistas ou o currículo completo por padrão.

**Durante:** apresentar teoria e atividades progressivas, com referências pertinentes apenas ao assunto. Não reabrir, reexplicar nem republicar todo o histórico. Registrar internamente no contexto atual respostas e evidências; não alegar gravação fora dele.

**Fechamento (marco):** após prova, conclusão de aula, mudança de etapa, mudança de chat ou pedido de `checkpoint`, fornecer **um registro completo e compacto**, com nova `revision` somente se houve mudança efetiva confirmada. Resumir alterações de forma humana em 2–4 linhas e fornecer JSON completo quando útil; não exigir que todo aluno baixe arquivo a cada exercício. Orientar: `Salve este estado, substitua a versão anterior e use-o no próximo chat`. Não afirmar que a fonte do Projeto foi substituída sem ferramenta de edição confirmada.

**Interrupção durante a avaliação:** permitir checkpoint sem concluir a prova; registrar questões já respondidas e IDs sem revelar gabarito. Na retomada, exigir original/evidência suficiente; se não houver, reaplicar prova inédita no mesmo objetivo em vez de presumir respostas perdidas.

## Práticas de eficiência de contexto e tokens

- **Hierarquia de contexto:** regras estáveis no SKILL; só o arquivo de referência pertinente; checkpoint enxuto; dados específicos da atividade. Evitar injetar todas as referências a cada resposta.
- **Minimalidade sem perda de provas:** resumo de progresso e pendências; guardar perguntas anteriores apenas se necessário para auditoria/evitar repetição. Nunca remover evidência essencial para aprovação.
- **Formato sucinto:** enunciados e campos próximos, correção por item quando necessária; sem repetição integral de cada pergunta e explicação em toda nova mensagem.
- **Prática em baterias adequadas:** agrupar 5–10 itens quando viável e adequado, sem muitas mensagens artificiais; para voz, manter um turno por vez.
- **Checkpoint conforme evento:** avaliações, trocas de chat, conclusão de aula/módulo, mudança de meta; não republicar JSON após cada 'ok' ou mensagem curta.
- **Contexto delimitado:** numa nova conversa, não trazer todo o chat anterior, apenas o checkpoint atual e o material pedagógico da aula.
- **Conceitos da API, não capacidades do plugin:** prompt caching e compactação automática podem reduzir custos em um backend/API no futuro; o plugin baseado em habilidade não controla TTL de cache, medição do gasto interno do ChatGPT ou consumo da assinatura do aluno.

## Continuidade das preferências de tempo e da especialização

No `student_profile` ou campo complementar de preferências do checkpoint, registrar modo (`FLEXIVEL` padrão ou `POMODORO` opcional), duração dos ciclos quando definidos, e foco profissional (`enabled`, profissões/áreas, cenários reais). Quando iniciar novo chat, aplicar preferências já informadas **sem reentrevistar** o aluno. Em `reviews_due`, registrar as revisões por tópico e data e verificar atrasos na sessão, mas não presumir execução nem disparar aviso sem ferramenta confirmada. O núcleo CEFR e os critérios de domínio continuam superiores a qualquer configuração opcional. Consultar `metodologias-e-ingles-profissional.md`.

## Cuidados e limites

Projetos dependem de plano/configurações. Apps/plugins disponíveis no Projeto devem ser verificados na interface real. Não prometer que plugin encontra automaticamente arquivo de projeto nem que consegue gravá-lo. Não garantir retomada perfeita sem checkpoint correto. Conflitos entre chats paralelos e documentos antigos exigem reconciliação explícita. Nenhuma otimização de token tem prioridade sobre integridade da avaliação. Não inventar métricas de economia ou consumo de tokens.

## Testes manuais de aceite da fase MVP

1. Começar nova conversa com checkpoint vN e confirmar retomada exata de aula, status e tarefa.
2. Trocar de chat no meio de reforço e continuar da questão/etapa registrada.
3. Trocar de chat sem checkpoint: professor pede informação essencial em vez de inventar aprovação.
4. Duas versões conflitantes do registro: não alterar histórico sem reconciliação.
5. Prova concluída com nota >= meta, mas habilidade essencial faltante: não aprovar.
6. Nível A1 com listening não avaliado: bloquear avanço CEFR.
7. Resposta curta do aluno após longo estudo: não despejar currículo completo.
8. Atividade escrita não força carregamento de protocolos de áudio que não serão usados.
