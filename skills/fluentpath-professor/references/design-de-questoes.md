# FluentPath AI — Design de questões e experiência de avaliação

## Propósito e princípio

Exercícios devem ser **pedagogicamente corretos e fáceis de responder**. Escolha o tipo de interação conforme a habilidade (reconhecimento, recuperação, construção, leitura, escuta, fala) e a dificuldade do nível. Não trate todas as questões como um único texto corrido. Mantenha o mesmo nível de clareza de uma plataforma educacional bem projetada.

## Regras de montagem: obrigatórias

1. **Uma unidade visual por questão**: número estável, comando simples, estímulo e resposta logo abaixo ou ao lado, separados da questão seguinte por espaçamento/divisor. Ex.: `1. Complete: She ___ happy.` seguido imediatamente de um campo ou alternativas.
2. **Lacunas independentes**: quando pedir várias frases para completar, repita o bloco `frase → campo` ou `frase → alternativas` em cada item. Nunca liste todas as frases e apenas depois todos os campos. Se o aluno precisa digitar, mostre a frase completa com `___` visível e um campo próprio, com rótulo da questão.
3. **Várias lacunas em UMA frase**: cada lacuna deve ter um campo/identificador próprio (ex. `2a`, `2b`) e ordem inequívoca. Se a interface não permitir campos embutidos, mantenha a frase visível e forneça campos separados identificados por letras, ou peça uma reconstrução completa em um campo único. Não force entradas em ordem ambígua.
4. **Alternativas**: uma pergunta e seu grupo de alternativas juntos; opções legíveis, exclusivas quando a pergunta pede uma única resposta; não misturar opções de itens diferentes. Use seleção única para uma resposta, múltipla apenas quando o enunciado disser `Selecione todas as corretas`.
5. **Tipo de campo corresponde à tarefa**: seleção simples para reconhecimento; campo curto para palavra/lacuna; campo maior para frase/tradução; área de texto para parágrafo; ordenação quando o controle funcionar; áudio/voz quando a modalidade estiver efetivamente disponível.
6. **Fácil de responder no celular ou PC**: enunciados diretos, quebras claras, fonte legível, controles próximos do texto, sem tabelas gigantes ou rolagem horizontal para responder.
7. **Sem armadilhas de layout**: numeração única e consistente; rótulos completos; diferenciação visível de itens e de subitens; sem caixa de texto única para uma lista inteira salvo se houver instrução explícita de numerar as respostas.
8. **Feedback no momento adequado**: em prática guiada, a correção imediata pode ser útil. Em prova de domínio, não mostrar gabarito nem dicas reveladoras antes da submissão. Depois corrigir por item e apresentar justificativa. Bloquear ou identificar alterações após avaliação, conforme o controle.
9. **Validação e acessibilidade**: habilitar ação de enviar apenas quando as respostas obrigatórias estiverem preenchidas; não perder respostas ao corrigir; mostrar itens sem resposta; não usar cor como único sinal de acerto/erro; evitar campos fictícios sem funcionalidade.
10. **Coerência de conteúdo**: o item deve testar exatamente o objetivo anunciado, usar inglês natural e aceitar variantes corretas; evitar pegadinhas involuntárias, alternativas ambíguas, respostas duplas em questão de escolha única e dependência de conteúdo ainda não ensinado.

## Blocos para voz e áudio

Quando o exercício envolve oralidade, use o mesmo princípio de **enunciado → estímulo audível (se existir) → forma de responder → resposta/feedback**. Em gravações, um bloco por sentença ou tarefa, com identificador e orientação de duração opcional; não agrupar cinco frases e pedir áudios sem identificadores claros.

Exemplo de enunciado claro: `Questão oral 3 — Diga em inglês: "Eu trabalho com software." Ouça o modelo se houver áudio e grave apenas esta frase. Envie o áudio referente à questão 3 (ou responda no modo de voz).` **Não** criar um controle visual de gravação se ele não for funcional. Se upload/voz indisponível, marque a modalidade como pendente ou adapte a atividade para prática escrita claramente rotulada.

## Layouts exemplares

### Complete digitando — múltiplas frases independentes

**1. Complete com am, is ou are.**

`She ___ a teacher.`

`[Campo da questão 1: digite uma palavra]`

**2. Complete com am, is ou are.**

`They ___ students.`

`[Campo da questão 2: digite uma palavra]`

**3. Complete com am, is ou are.**

`I ___ Brazilian.`

`[Campo da questão 3: digite uma palavra]`

Cada frase tem seu próprio campo imediatamente ligado a ela.

### Complete selecionando

**1. Complete: She ___ an engineer.**

`( ) am    ( ) is    ( ) are`

**2. Complete: We ___ students.**

`( ) am    ( ) is    ( ) are`

Se houver um componente de seleção, utilize o recurso real do host, não caracteres simulando botões funcionais.

### Frase com múltiplas lacunas

**3. Complete: She ___ a developer, and they ___ engineers.**

`3a — Primeira lacuna: [campo]`

`3b — Segunda lacuna: [campo]`

Outra abordagem válida: um único campo pedindo a **frase inteira reconstruída**, desde que isso seja explícito.

### Tradução aberta

**4. Traduza para o inglês: "Nós somos desenvolvedores."**

`[Campo de frase com espaço para resposta completa]`

### Pergunta de interpretação

Mostre primeiro um texto curto em área diferenciada. Abaixo, cada pergunta numerada com campo próprio. Não coloque perguntas e todas as respostas misturadas num parágrafo.

## Seleção pedagógica dos formatos

- **Reconhecer**: escolha única/associação. Útil para entrada no conteúdo.
- **Recuperar de memória**: lacunas digitadas sem dicas ou banco de alternativas.
- **Aplicar**: tradução curta, reformulação, identificação/correção de erros.
- **Produzir**: frases originais, descrição, diálogo ou texto.
- **Compreender**: leitura/áudio com perguntas separadas.
- **Interagir**: turnos orais ou escritos, um de cada vez.

Avaliação final de aula: combinar reconhecimento com produção independente e tarefas compatíveis com todos os critérios essenciais; **100% de domínio comprovado** permanece obrigatório. Não usar só múltipla escolha como prova de domínio.

## Controle de qualidade antes de publicar um exercício

Faça internamente estas verificações:

- Cada enunciado possui resposta claramente associada e nenhum campo está órfão?
- O aluno saberá exatamente *onde* responder cada frase e em qual ordem?
- O tipo de controle é adequado ao que está sendo medido?
- Há instrução clara quando for mais de uma alternativa ou lacuna?
- Nenhuma alternativa confusa ou outro gabarito igualmente válido?
- Existem campos suficientemente grandes para as respostas?
- Gabarito está oculto antes de uma prova?
- A resposta pode ser submetida e corrigida com clareza?
- O layout funciona sem componentes avançados, se o host não os suportar?

Se uma dessas perguntas falhar, refaça a apresentação antes de pedir que o aluno responda.

## Adaptação a ferramentas disponíveis

Priorize **controles nativos realmente disponíveis** (opções/radio, campos, área de texto, botões com ação). Não escreva HTML, componentes inexistentes ou pseudo-interações que o host não renderiza. Se não houver controles, use Markdown convencional: cada questão numerada em parágrafo próprio com a indicação `Sua resposta: ____`; instrua o aluno a responder `1. ...; 2. ...`, sem fingir que há um formulário interativo.

Em voz, faça **uma pergunta por vez**, aguarde a resposta e registre a sequência. Não use controles escritos para fingir que gravou ou avaliou áudio.

Nenhuma instrução deste documento concede ao plugin uma interface própria; descreve a experiência a ser construída com os recursos do ChatGPT disponíveis no momento.
