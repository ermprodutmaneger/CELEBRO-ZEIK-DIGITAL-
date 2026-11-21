# ZEIK BRAIN 1.0

Central operacional local para a Zeik Digital, construída com React, TypeScript, Vite, Recharts, Three.js, React Three Fiber e Drei. Não usa Supabase, backend, autenticação ou serviços pagos.

## Executar e verificar

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```bash
npm install
npm run dev
npm test
npm run build
```

Abra o endereço informado pelo Vite. Para servir o build: `npm run preview`.

## Funcionalidades locais

- Dashboard com indicadores e gráfico de receitas recebidas; estados vazios sem dados fictícios.
- CRM em Kanban com busca, filtros por probabilidade e próxima ação, valor ponderado, movimentação por seleção (acessível por toque e teclado), contatos, propostas e conversão sem duplicar registros. Criar projeto a partir do cliente mantém um vínculo por ID.
- Projetos com briefing, prazo, checklist, referências, links, histórico de alterações e gerador de prompt local. A exclusão de um cliente remove o vínculo, mas preserva seus projetos.
- Financeiro com tipo (receita, despesa, contrato ou mensalidade) e situação (previsto, recebido, pago, ativo ou encerrado), mês de referência e indicadores separados de realizado, previsto e MRR. Mensalidades ativas não são contadas como recebimentos. Registros antigos de receita e despesa sem situação são tratados como previstos; registros antigos marcados como Recebido são considerados recebidos. Revise os lançamentos antigos.
- Hoje na Zeik e radar com critérios explícitos: leads sem próxima ação, clientes sem contato registrado ou há mais de 30 dias, prazos próximos e receitas previstas.
- ZEIK CORE responde por regras locais. Pergunte sobre prioridades, projetos, oportunidades sem ação ou receita recorrente. Use `criar tarefa: nome da tarefa` para preparar uma tarefa; ela só é salva após confirmação. Não é um modelo de IA.
- Cérebro 3D GLB com toque, rotação, zoom, partículas e qualidade configurável. Marcadores selecionam agentes; controles equivalentes fora do canvas permitem a seleção por teclado e no painel 2D. Os marcadores são representações funcionais, não regiões anatômicas científicas. A abertura do módulo é explícita.
- Exportação/importação JSON com validação de estrutura e confirmação antes de substituir dados. Histórico básico de alterações. Testes de regras financeiras, conversão e validação de backups.

## Limitações e cuidados

Os dados ficam no **localStorage do navegador**, são provisórios e podem ser perdidos ao limpar os dados do navegador. Não há sincronização nem backup automático; exporte o JSON e guarde-o em local seguro. O sistema não tem autenticação ou controle de acesso. Não há pesquisa real na internet, envio de mensagens, integrações externas ou execução autônoma de agentes. As interfaces de provedores são contratos, não integrações prontas. A proposta registra título, valor e situação, mas não é um editor completo nem realiza envio. O financeiro não calcula recorrências históricas automaticamente. O painel alternativo é uma representação simplificada; não há animações de processamento artificiais. Não foram adicionados testes automatizados de interface ou compatibilidade com dispositivos físicos.

## Arquitetura e evolução

`src/types.ts` define entidades, validação do armazenamento, o contrato `DataRepository`, implementação local e interfaces `AIProvider`, `SearchProvider` e `AutomationProvider`. `src/services/rules.ts` reúne regras de negócio testáveis; `src/components/Operations.tsx` contém o funil e os detalhes operacionais; `src/Brain.tsx` carrega a cena separadamente. `src/main.tsx` ainda concentra a composição da aplicação e outros módulos. Antes de produção, continuar a separação dos módulos, ampliar os testes e incluir backend seguro, autenticação e autorização. IndexedDB pode substituir localStorage via repositório em uma migração futura; não foi implementado nesta versão. Nenhuma credencial deve ser colocada no frontend.

## Créditos do modelo

`public/models/brain.glb` foi obtido do repositório [SahilK-027/Digital-Brain](https://github.com/SahilK-027/Digital-Brain), distribuído naquele repositório sob licença MIT. A licença e copyright estão em `public/models/LICENSE.txt`. Decodificadores Draco são distribuídos com Three.js.

## Founder Intelligence

A página **Memória do fundador** permite criar, procurar, corrigir e excluir registros por categoria, origem, grau de confirmação e privacidade. As sugestões fornecidas no escopo são conteúdo inicial embutido na aplicação, não registros salvos: cada uma deve ser revisada e salva manualmente; descartar ou excluir impede que ela reapareça no perfil local. Como esse conteúdo inicial integra o código da aplicação, apagar uma memória local não remove o texto das sugestões do código-fonte. Evite distribuir o projeto contendo informações que você não queira publicar.

Somente memórias confirmadas com uso explicitamente autorizado são usadas no Core; preferências pessoais autorizadas (mas não marcadas como sensíveis) também entram no prompt de briefing que o usuário copia. O modo fundador pode usar o nome autorizado; o modo profissional evita essa personalização. A central comercial continua produzindo templates profissionais locais, sem inserir memórias pessoais automaticamente. A análise de ideias é uma lista de perguntas e projetos cadastrados, não uma pesquisa ou diagnóstico automatizado. Nada é aprendido automaticamente de conversas.

Dados sensíveis exigem autorização específica no formulário e novamente na importação. A classificação depende também do usuário: a detecção por palavras é limitada e não substitui uma revisão. Bloqueios de credenciais são heurísticos e não garantem detectar segredos. Dados e arquivos exportados **não são criptografados**. A exportação apenas do fundador pode ser importada em Configurações sem substituir os outros módulos; a importação completa substitui todos os dados após confirmação. A página Evolução apresenta contagens e correções realmente registradas, sem alegar aprendizagem autônoma. Histórico de correções contém data e categoria, não o conteúdo anterior.

## Uso no iPad

O layout adapta a navegação para menu recolhível em telas de tablet, com áreas de toque maiores, fontes de formulário adequadas ao Safari, rolagem horizontal do Kanban e modais dimensionados para a área visível. O cérebro 3D deixa de renderizar quando fica fora da tela ou a aba fica oculta; a rotação respeita a preferência do sistema por movimento reduzido. É possível usar a qualidade baixa ou o painel 2D. Essas melhorias não foram verificadas em um iPad físico; recomenda-se testar Safari em retrato, paisagem e com teclado na tela.

## Pesquisa inicial de prospecção

Em Caçador de Leads há oito sugestões selecionadas manualmente de diretórios públicos de São Paulo capital, consultados em 21/11/2026. São candidatos, não clientes confirmados ou empresas comprovadamente sem site. A fonte e os dados informados estão visíveis; endereço, número, funcionamento, presença digital, necessidades e interesse devem ser reconfirmados. A pesquisa não é atualizada automaticamente. Só o botão **Adicionar ao CRM** cria um registro local, sem envio de mensagens ou inclusão automática nas métricas; a origem e as hipóteses ficam nas notas. Valor e probabilidade começam em zero como campos não estimados e devem ser revistos manualmente. Há prevenção básica de duplicação por ID e nome, que pode bloquear homônimos. Remover um lead permite adicioná-lo novamente. Nenhuma API externa ou base de dados foi conectada.

## Clientes fixos solicitados

Na primeira abertura após esta atualização, o navegador inclui de forma aditiva os cadastros de Daniela Lina e Açaí do Cordeiro e seus lançamentos, sem apagar dados existentes. Um marcador persistido evita reinclusão em recarregamentos ou após exclusão. Se já houver cliente ou lançamento possivelmente duplicado pelo nome/ID, o respectivo conjunto é ignorado e um aviso pede revisão manual; os dados existentes não são alterados. A verificação não identifica todas as duplicatas possíveis. Cada mensalidade é vinculada ao cliente; mensalidade ativa representa MRR, não pagamento recebido. A segunda parcela de R$ 400 é receita prevista para **dezembro de 2026**, com dia de vencimento não informado. O ano foi assumido a partir da data da solicitação e pode ser alterado no Financeiro. Para encerrar uma mensalidade, edite o lançamento financeiro; alterar ou excluir o cliente não altera automaticamente o lançamento.

**Privacidade:** por solicitação, os dados iniciais e as artes com nomes e telefones fazem parte do código e dos arquivos públicos da aplicação. Qualquer pessoa com acesso ao repositório ou a uma implantação pública pode vê-los, inclusive os valores no código do frontend. localStorage não é criptografado nem isolado por usuário. Não publique esses dados em um site ou repositório público sem autorização dos clientes e sem substituir essa abordagem por armazenamento e acesso seguros no backend. As imagens finais estão em `public/clients/`.


### Finanças do Fundador

Módulo privado separado, salvo em `localStorage` sob chave própria. Valores iniciais são estimativas informadas; o salário líquido começa no limite inferior de R$ 1.400, com consignado já incluído. As parcelas do 13º não têm mês nem recebimento presumidos. O saldo pessoal disponível e a reserva são informados manualmente. O simulador de anúncios não inclui contas futuras ou despesas não cadastradas. A previsão da Zeik lê os lançamentos existentes e substitui a mensalidade original de Daniela pela parcela do site em dezembro de 2026 quando ambos os registros originais existem; confira duplicatas manuais. As marcações novas de mensalidade por mês são guardadas no lançamento da agência e compartilhadas com o Financeiro principal. Marcações antigas guardadas no backup privado continuam sendo lidas quando não há marcação compartilhada; exporte os dois backups. Nenhum dado financeiro privado é enviado a serviços externos.

Os dados pessoais iniciais estão no código-fonte e no pacote público do aplicativo, além do navegador: não publique nem compartilhe esta versão sem remover os dados iniciais e estabelecer acesso seguro. O backup privado JSON é separado do backup geral e contém dados sensíveis em texto puro: exporte ambos e guarde-os em local seguro. O armazenamento local não oferece criptografia, autenticação, sincronização ou backup automático. A importação privada substitui somente esse módulo. Para consultar no Core, use “finanças do fundador” e, opcionalmente, o mês no formato AAAA-MM; são regras locais, não IA.

### Logo e história de clientes
No cadastro ou edição de um registro de CRM é possível selecionar uma logo JPG, PNG ou WebP (até 12 MB); o navegador reduz e converte a imagem em JPEG com fundo branco antes de salvá-la. A logo é separada das artes já existentes. O campo de história é editável e aparece nos detalhes do cliente, além do histórico de contatos já existente. Logo e história são locais, não são sincronizadas e integram o backup geral em texto sem criptografia. O armazenamento do navegador tem limite: se faltar espaço, o formulário permanece aberto. O app tem manifesto e ícones para adicionar à Tela de Início pelo Safari no iPad; não há garantia de funcionamento offline.


### Central de decisão e relacionamento
A central agrupa tarefas e projetos abertos, próximas ações e cobranças previstas por regras locais explicáveis; não calcula urgência real. Sugestões podem ser ocultadas durante a sessão. A meta de clientes fixos (10–20) não é resultado atual. A linha do tempo aceita contatos, decisões e entregas com data opcional. Propostas guardam escopo em notas e geram texto para revisão e cópia, sem envio. O salário pode ter holerites por mês, mantendo o salário habitual como referência. O marcador de última exportação só registra que o download foi iniciado, não que foi salvo; o backup geral e o privado continuam separados.

### Backup completo protegido
Em Configurações, o backup completo criptografado inclui dados gerais e, se já inicializadas, finanças do fundador. O arquivo é cifrado no navegador com AES-GCM e chave derivada por PBKDF2-SHA256, com salt e nonce aleatórios. A frase não é armazenada nem enviada; sem ela não é possível recuperar o arquivo. A restauração valida os dois conjuntos e pede confirmação antes de substituir os dados locais. Esse recurso protege o arquivo, não o armazenamento no navegador nem o acesso ao painel publicado. Os backups antigos em texto simples continuam disponíveis e não são protegidos. As fontes visuais foram incluídas no pacote local em vez de requisitadas ao Google Fonts.
