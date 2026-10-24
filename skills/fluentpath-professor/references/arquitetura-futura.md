# Arquitetura futura das quatro camadas (não implantada)

Preservar este plano como **roadmap**, sem declarar recursos ainda inexistentes.

1. **Motor pedagógico:** políticas CEFR, sequências de teoria → prática → reforço → prova → revisão, rubricas claras, prompts e questões consistentes. **MVP:** skill + referências e auditoria manual. **Futuro:** políticas centralizadas e com testes automatizados.
2. **Memória persistente:** perfil, checkpoint, avaliação, evidências, revisões, histórico e conflitos. **MVP:** arquivo portátil versionado, com salvamento/atualização confirmados pelo aluno. **Futuro:** autenticação, banco transacional e recuperação automática entre chats.
3. **Validador de progressão:** nota configurável em aulas (85–100%, padrão 100%), todas as rubricas essenciais dominadas, saída CEFR com 100% dos objetivos comprovados. **MVP:** checklist e autoverificação do professor, não bloqueio técnico garantido. **Futuro:** motor de regras em código no servidor, antes de qualquer gravação oficial.
4. **Auditoria e testes:** casos de erro, dados ausentes, duplicidade, sessão interrompida, voz indisponível, conflito de versões e regressões. **MVP:** cenários manuais repetíveis. **Futuro:** testes unitários, integração, avaliação de comportamento, logs e monitoramento.

## Etapas condicionais para adotar infraestrutura

Somente quando houver necessidade comprovada de sincronização automática, vários estudantes ou múltiplos dispositivos sem checkpoint manual: criar API com autenticação e armazenamento adequado; validar regras no servidor; conectar a um endpoint MCP real; testar segurança, proteção de dados e disponibilidade; atualizar o plugin existente (nunca inventar endpoint de MCP). Reutilizar dados e formato do checkpoint para migração.

## Critérios de conclusão do MVP

- Arquivo portátil legível e suficiente para retomar sem chat antigo.
- Critério para escolher checkpoint confiável ou declarar conflito.
- Instruções de tokens aplicadas sem omitir avaliação ou evidência.
- Zero alegação de sincronização, salvamento ou análise de áudio não confirmados.
- Testes manuais de aceite executados antes de alegar comportamento comprovado.
