# Registro, repetição espaçada e visualização da jornada

## Estado mínimo a manter

Representação exportável em JSON ou tabela: `learner_id` opcional, objetivo, carga semanal, nível CEFR (estimado e parcial/completo), métricas separadas por reading/writing/listening/speaking, meta_de_aprovacao_de_aula (85–100, padrão 100), checklist_de_saida_de_nivel com objetivos, evidências e status, módulo/aula atual, `status` (`NAO_INICIADO`, `EM_ANDAMENTO`, `EM_REFORCO`, `PENDENTE_DE_MODALIDADE`, `APROVADO`), critérios e evidências de cada aula, erros recorrentes, revisões pendentes e data da última avaliação.

A habilidade por si só não garante memória permanente, app ou sincronização. Usar apenas armazenamento conectado e autorizado; caso contrário gerar `registro_de_progresso.json` ao concluir uma etapa importante. Não incluir dados pessoais sensíveis desnecessários. Em exportações, separar o currículo genérico do registro individual.

## Checkpoint portátil como estado operacional no MVP

Usar `continuidade-mvp-e-tokens.md` como protocolo de **retomada entre chats**: o aluno pode organizar aulas por conversa num Projeto, porém a memória do Projeto não substitui o registro de progresso. O checkpoint mais recente **explicitamente salvo ou anexado** é a fonte preferida de estado. Um checkpoint gerado apenas na resposta não equivale a arquivo atualizado automaticamente. Distinguir versão `revision` e `updated_at`, progresso comprovado, avaliação parcial e próxima ação. Pedir confirmação em caso de conflito, nunca mesclar provas contraditórias arbitrariamente.

## Preferências e trilha profissional no registro leve

Acrescentar ao checkpoint, quando houver informação: `study_style: { mode: "FLEXIVEL" | "POMODORO", focus_minutes, break_minutes }`, `professional_english: { enabled, areas, use_cases, priorities, objectives, last_practice }`. Preferência ausente significa ritmo flexível; não presumir uma profissão. Manter `professional_english` como **trilha adicional**, distinguindo atividades técnicas de comprovação dos resultados CEFR obrigatórios. Não repetir dados pessoais privados irrelevantes.

Cada entrada compacta em `reviews_due` deve preservar, quando conhecido, `topic_id`, `due_date`, `status` (`PENDENTE`, `VENCIDA`, `CONCLUIDA`), `last_result` e `next_action`. Na abertura de cada sessão, priorizar revisões vencidas e necessárias; só declarar concluída com avaliação/revisão feita e comprovada. **Sem backend ou automação instalada, não existem notificações proativas** — agendar somente se o estudante solicitar e a ferramenta permitir. Para detalhes consultar `metodologias-e-ingles-profissional.md`.

## Revisão espaçada e memorização

Planejar revisões após 1, 3, 7, 14 e 30 dias de conteúdo recente como valores iniciais, ajustando com base em erros e respostas. A revisão precisa ser feita de fato para registrar `concluida`. Flashcards e perguntas de recuperação sem tradução primeiro; depois correção, exemplos em frases e uso oral.

Se recursos interativos de flashcards estiverem disponíveis, use-os quando explicitamente pedidos ou quando a tarefa for memorização objetiva. Não afirmar que criou decks salvos quando não houve criação efetiva. Nunca afirmar que lembrete foi agendado sem confirmação de uma ferramenta de automação.

## Progressão de aprendizagem — apresentação

Mostrar sempre a jornada completa com o título **Progressão de aprendizagem**:

A1 Iniciante — informações pessoais, expressões simples e necessidades imediatas.
A2 Básico — hábitos, compras, rotina e situações familiares.
B1 Intermediário — conversas, experiências, opiniões e autonomia crescente.
B2 Intermediário superior — comunicação independente, trabalho, viagens, argumentos.
C1 Avançado — fluência flexível, precisão e conteúdos complexos.
C2 Proficiência — nuances, síntese e alta precisão expressiva.

Cada nível com status, próximo marco, e barra de progresso **somente quando existir denominador conhecido e comprovação**. Ex.: `aulas aprovadas / aulas planejadas` ou `objetivos dominados / objetivos do nível`; rotular claramente progresso curricular e nunca interpretá-lo como CEFR medido ou percentual de fluência. Na ausência de contagem confiável, usar `—` ou `Não avaliado`, não valor arbitrário. Para nível concluído, exigir avaliação integrada apropriada incluindo competências orais e auditivas.

## Relatório de saída de nível obrigatório

Ao abrir um nível CEFR e antes da avaliação de saída, exiba o título **"O que você precisa ser capaz de fazer para concluir [A1/A2/B1/B2/C1/C2]"** e apresente todos os objetivos de `marcos-cefr-criterios.md` relevantes. Cada competência fica `DOMINADO`, `EM_REFORCO`, `NAO_AVALIADO` ou `PENDENTE_DE_MODALIDADE`, associada a tarefa e evidência real. A barra **"Domínio dos objetivos de saída"** = `número de objetivos essenciais DOMINADO / número total de objetivos essenciais exigidos`, com rótulo explícito; não corresponde à nota de prova nem ao percentual de fluência. Apenas ao atingir 100% dos objetivos exigidos o professor registra `NIVEL_CONCLUIDO`. Se houver pendência, permaneça no nível, ofereça reforço direcionado e reaplique itens inéditos. Não invente conclusão com base em autoavaliação não testada.

## Relatórios periódicos

Aula: código, acertos, rubrica e pontos pendentes; módulo: acumulado, evidências, lacunas e próxima etapa; mês: consistência declarada, evolução demonstrada e prioridades sem inventar métricas. Quando dados externos são declarados pelo aluno, sinalizar fonte como `auto-relato`.

## Migração de aluno já existente

Ao receber um arquivo de progresso do aluno, utilizá-lo como base somente se o usuário o fornecer/autorizar. Respeitar status anteriores comprovados, não exigir refazer entrevista básica. Um registro de migração separado não pertence ao currículo genérico e não deve ser reaproveitado para outro aluno. Se houver divergência entre conversa e arquivo, pedir resolução simples e continuar a etapa mais conservadora.
