/** Pesquisa pontual de cadastros públicos, não é uma busca ao vivo. */
export type Prospect = {
  id: string;
  name: string;
  segment: string;
  neighborhood: string;
  address: string;
  phone: string;
  contactKind?: "telefone" | "whatsapp";
  source: string;
  fact: string;
  idea: string;
  website?: string;
  websiteLabel?: string;
};
export const researchedAt = "2026-11-21";
export const prospects: Prospect[] = [
  {
    id: "babbo-caffe",
    name: "Babbo Caffè",
    segment: "Cafeteria",
    neighborhood: "Jardim Bonfiglioli",
    address: "Av. Engenheiro Heitor Antônio Eiras Garcia, 648",
    phone: "(11) 98932-2276",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/restaurantes/restaurante/11230160-9/babbo-caffe",
    fact: "O GuiaMais apresenta a cafeteria, o endereço, o WhatsApp e o Instagram @babbo.caffe.",
    idea: "Investigar se um site com cardápio, localização e contato complementaria os canais existentes.",
  },
  {
    id: "kaklau-pet",
    name: "Kaklau Pet Shop",
    segment: "Pet shop",
    neighborhood: "Liberdade",
    address: "Rua Pires da Mota, 451",
    phone: "(11) 96473-6544",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/servicos-para-animais/pet-shop/2357104770-2904251/kaklau-pet-shop",
    fact: "A ficha pública descreve serviços para pets e informa endereço e WhatsApp.",
    idea: "Investigar interesse em uma página de serviços, localização e agendamento para banho e tosa.",
  },
  {
    id: "ohana-makeup",
    name: "Ohana Makeup",
    segment: "Maquiagem",
    neighborhood: "Itaim Paulista",
    address: "Rua Antônio João de Medeiros, 827",
    phone: "(11) 91456-4125",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/maquiadores/3001738038-8739909/maquiadora-profissional-em-sao-paulo-ohana-makeup",
    fact: "O diretório lista serviços de maquiagem, endereço e WhatsApp.",
    idea: "Investigar se há interesse em portfólio digital e apresentação dos serviços; confirmar a atuação atual.",
  },
  {
    id: "barbearia-berrini",
    name: "Barbearia Berrini",
    segment: "Barbearia",
    neighborhood: "Cidade Monções",
    address: "Rua Oswaldo Casimiro Muller, 102",
    phone: "(11) 99501-0175",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/barbearias/3000864649-7830702/barbearia-berrini",
    fact: "O diretório lista endereço e WhatsApp.",
    idea: "Conversar sobre agendamento, presença local e integração entre os canais existentes.",
  },
  {
    id: "barbearia-imperial",
    name: "Barbearia Imperial",
    segment: "Barbearia",
    neighborhood: "São Paulo (bairro a confirmar)",
    address: "Av. Doutor Francisco Ranieri, 584",
    phone: "(11) 93444-6703",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/barbearias/11228048-3/barbearia-imperial",
    fact: "A ficha pública descreve a barbearia e informa endereço e WhatsApp.",
    idea: "Investigar se uma página de serviços e agendamento ajudaria; confirmar bairro e canais atuais.",
  },
  {
    id: "don-barbosa",
    name: "Don Barbosa Barbeiro",
    segment: "Barbearia",
    neighborhood: "Penha de França",
    address: "Rua Celestino da Cunha Alves, 20",
    phone: "(11) 97378-7886",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/barbearias/3000864050-7829232/don-barbosa-barbeiro",
    fact: "O GuiaMais informa endereço na Penha e WhatsApp. Confirme o endereço antes da visita.",
    idea: "Confirmar endereço e canais atuais; depois avaliar se uma página de agendamento seria útil.",
  },
  {
    id: "tutti-animale",
    name: "Tutti Animale Clínica Veterinária e Pet Shop",
    segment: "Clínica veterinária",
    neighborhood: "Tatuapé",
    address: "Rua Tuiuti, 2771",
    phone: "(11) 99765-5380",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/clinicas-e-laboratorios-para-animais/clinicas-veterinarias/2359214904-5112961/tutti-animale-clinica-veterinaria-e-pet-shop",
    fact: "O GuiaMais informa endereço e WhatsApp; o site e o perfil no Google não foram verificados.",
    idea: "Confirmar se o site e as informações no Google estão atualizados antes de oferecer melhorias.",
  },
  {
    id: "barbearia-bastos",
    name: "Barbearia Bastos",
    segment: "Barbearia",
    neighborhood: "Vila Romana",
    address: "Rua Aurélia, 798",
    phone: "(11) 96665-2389",
    source:
      "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/barbearias/2357213242-3001488/barbearia-bastos",
    fact: "O diretório informa serviços de barbearia, endereço e WhatsApp.",
    idea: "Investigar se uma página com serviços e agendamento agregaria valor aos canais atuais.",
  },
  {
    id:'felpudinhos-penha',name:'Felpudinhos Banho e Tosa',segment:'Pet shop',neighborhood:'Penha',address:'Rua General Dias, 102',phone:'(11) 96613-8252',source:'https://www.guiamais.com.br/sao-paulo-sp/servicos-para-animais/pet-shop/11229207-0/felpudinhos-banho-e-tosa-pet-shop-estetica-animal-penha-sao-paulo',website:'https://felpudinhosbanhoetosa.com.br/',websiteLabel:'Site encontrado nos resultados de busca; disponibilidade a confirmar',fact:'O diretório lista banho e tosa, endereço e WhatsApp. A pesquisa também retornou um site com o mesmo endereço.',idea:'Investigar se há interesse em melhorar a apresentação ou a integração dos canais existentes; não presumir ausência de site.'
  },
  {
    id:'pizzaria-da-hora',name:'Pizzaria da Hora',segment:'Pizzaria',neighborhood:'Jardim Patente',address:'Av. Patente, 531',phone:'(11) 94984-0441',source:'https://www.guiamais.com.br/sao-paulo-sp/restaurantes/pizzarias/14595266-1/pizza-da-hora',fact:'O GuiaMais informa endereço, WhatsApp e serviço de entrega. Outro diretório cita um possível site, não confirmado.',idea:'Confirmar o site e o canal de pedidos atual; só então avaliar se há espaço para melhorias.'
  },
  {
    id:'pizzaria-esfiharia-veneza',name:'Pizzaria e Esfiharia Veneza',segment:'Pizzaria',neighborhood:'Jardim Capela',address:'Rua José Góes, 99',phone:'(11) 96472-7246',source:'https://www.guiamais.com.br/sao-paulo-sp/restaurantes/pizzarias/11230830-9/pizzaria-e-esfiharia-veneza',website:'https://pizzariavenezacapela.wordpress.com/2013/07/30/pizzariavenezacapela/',websiteLabel:'Página publicada em 2013 encontrada na busca; atualidade a confirmar',fact:'A ficha pública lista endereço e WhatsApp; uma página antiga na busca cita o mesmo endereço.',idea:'Confirmar presença digital atual e investigar se atualizar cardápio ou contato ajudaria.'
  },
  {
    id:'pizzaria-forno-brasily',name:'Pizzaria Forno Brasily',segment:'Pizzaria',neighborhood:'Jardim Capela',address:'Rua Visc. de Ribamar, 60',phone:'(11) 99653-2786',source:'https://www.guiamais.com.br/sao-paulo-sp/restaurantes/pizzarias/11230831-2/pizzaria-forno-brasily',fact:'O diretório informa endereço, WhatsApp e opções de pizzas e massas.',idea:'Investigar se um cardápio digital e links de pedidos seriam úteis; confirmar canais existentes.'
  },
  {
    id:'pizzaria-calamares',name:'Pizzaria Calamares',segment:'Pizzaria',neighborhood:'Parque Casa de Pedra',address:'Av. Josino Vieira de Goes, 167',phone:'(11) 96204-3810',source:'https://www.guiamais.com.br/sao-paulo-sp/restaurantes/pizzarias/14706433-1/pizzaria-calamares',fact:'O GuiaMais lista endereço e WhatsApp; outros diretórios apresentam endereço diferente.',idea:'Confirmar o endereço e as formas atuais de pedidos antes de propor qualquer serviço.'
  },
  {
    id:'gl-barbearia',name:'GL Barbearia Ltda.',segment:'Barbearia',neighborhood:'Pinheiros',address:'Rua Oscar Freire, 2127',phone:'(11) 95129-3559',source:'https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/saloes-de-beleza-e-cabeleireiros/3001086346-8074148/gl-barbearia-ltda',fact:'O diretório informa endereço em Pinheiros e WhatsApp.',idea:'Confirmar o nome comercial e investigar a necessidade de agendamento ou presença local.'
  },
  {
    id:'washtec-tatuape',name:'Washtec Tatuapé',segment:'Lavanderia',neighborhood:'Vila Gomes Cardim',address:'Rua Serra de Botucatu, 1362',phone:'(11) 95459-0415',source:'https://www.washtec.com.br/tatuape',website:'https://www.washtec.com.br/tatuape',websiteLabel:'Site existente encontrado na pesquisa',fact:'A página da unidade apresenta endereço, serviços e WhatsApp.',idea:'Como já possui site, investigar se a empresa deseja ajustes ou melhorias no perfil local; não oferecer site como inexistente.'
  },
  {
    id:'amabile-flower',name:'Amábile Flower Shop',segment:'Floricultura',neighborhood:'Vila Mariana',address:'Rua José Antônio Coelho, 602',phone:'(11) 2528-2968',source:'https://www.guiamais.com.br/sao-paulo-sp/flores-presentes-e-datas-especiais/floriculturas/11231356-7/amabile-flower-shop-floricultura-e-garden-na-vila-mariana',fact:'A ficha informa floricultura, endereço e número apresentado como WhatsApp.',idea:'Investigar se um catálogo digital e informações de entrega complementariam os canais atuais.'
  },
  {
    id:'jlchaveiros',name:'JLChaveiros',segment:'Chaveiro',neighborhood:'São Paulo (bairro a confirmar)',address:'Av. Nova Cantareira, 4808',phone:'(11) 98166-7374',source:'https://www.guiamais.com.br/sao-paulo-sp/profissionais-diversos/chaveiros/11231118-3/jlchaveiros',fact:'O GuiaMais apresenta serviços de chaveiro, endereço e WhatsApp.',idea:'Confirmar região de atendimento e investigar se uma página local ajudaria os contatos.'
  },
  {
    id:'nikkey-formosa',name:'Nikkey Formosa',segment:'Moda',neighborhood:'Vila Formosa',address:'Av. Doutor Eduardo Cotching, 1862',phone:'(11) 96299-8662',source:'https://www.guiamais.com.br/sao-paulo-sp/vila-formosa/vestuario-calcados-e-acessorios/lojas-de-roupas-femininas',fact:'O diretório lista loja de roupas femininas, endereço e número apresentado como WhatsApp.',idea:'Investigar se um catálogo digital ou melhorias nas informações locais seriam interessantes.'
  },
  {
    "id": "portal-padeiro",
    "name": "Portal do Padeiro",
    "segment": "Padaria",
    "neighborhood": "Vila Suzana",
    "address": "Rua Professor José Horácio Meirelles Teixeira, 546",
    "phone": "(11) 99965-6994",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/lanches-e-salgados/padarias-e-confeitarias/2355887459-2185700/padaria-portal-pao",
    "fact": "O GuiaMais lista panificadora, endereço e WhatsApp.",
    "idea": "Investigar interesse em apresentar produtos e informações de atendimento nos canais já existentes."
  },
  {
    "id": "arte-fina",
    "name": "Marcenaria Arte Fina",
    "segment": "Marcenaria",
    "neighborhood": "Jardim Brasil",
    "address": "Rua Carlos dos Santos, 895",
    "phone": "(11) 94781-9407",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/servicos-especializados-para-construcao-e-reformas/marcenarias/2357263045-3065027/marcenaria-arte-fina",
    "fact": "O diretório informa endereço e WhatsApp; outro diretório menciona um site, ainda não confirmado.",
    "idea": "Confirmar canais e investigar interesse em portfólio e pedidos de orçamento."
  },
  {
    "id": "luck-marcenaria",
    "name": "Luck Marcenaria",
    "segment": "Marcenaria",
    "neighborhood": "Vila da Saúde",
    "address": "Rua Carneiro da Cunha, 732",
    "phone": "(11) 98068-0758",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/servicos-especializados-para-construcao-e-reformas/marcenarias/11226426-7/luck-marcenaria",
    "fact": "O GuiaMais lista endereço, WhatsApp e móveis sob medida; outro diretório cita um site.",
    "idea": "Confirmar a página existente e investigar possíveis melhorias no portfólio e orçamento."
  },
  {
    "id": "elmoveis",
    "name": "Elmóveis Móveis Planejados",
    "segment": "Marcenaria",
    "neighborhood": "Itaquera",
    "address": "Rua Sabbado D’Ângelo, 2430",
    "phone": "(11) 98718-9925",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/servicos-especializados-para-construcao-e-reformas/marcenarias/8924151-2/elmoveis-moveis-planejados",
    "fact": "O GuiaMais lista marcenaria, endereço e WhatsApp.",
    "idea": "Investigar interesse em portfólio de projetos e formulário de orçamento."
  },
  {
    "id": "modular-vidros",
    "name": "Modular Vidros",
    "segment": "Vidraçaria",
    "neighborhood": "Paraíso",
    "address": "Av. Armando Ferrentini, 63, loja 03",
    "phone": "(11) 99570-9351",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/paraiso/servicos-especializados-para-construcao-e-reformas/vidracarias",
    "fact": "O diretório lista vidraçaria, endereço e WhatsApp.",
    "idea": "Investigar se uma apresentação de serviços e pedidos de orçamento agregaria valor."
  },
  {
    "id": "vidracaria-paraiso",
    "name": "Vidraçaria Paraíso",
    "segment": "Vidraçaria",
    "neighborhood": "Paraíso",
    "address": "Rua Desembargador Eliseu Guilherme, 315",
    "phone": "(11) 96667-8961",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/paraiso/servicos-especializados-para-construcao-e-reformas/vidracarias",
    "fact": "O diretório informa endereço e número direcionado ao WhatsApp.",
    "idea": "Confirmar canais atuais e investigar interesse em catálogo de vidros e espelhos."
  },
  {
    "id": "impianto-vila-maria",
    "name": "Impianto Odontologia e Saúde — Vila Maria",
    "segment": "Odontologia",
    "neighborhood": "Vila Maria",
    "address": "Rua Nova Prata, 170",
    "phone": "(11) 95043-3991",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/dentistas-e-especialistas/dentistas/11226966-7/impianto-odontologia-e-saude",
    "fact": "A ficha informa clínica, endereço e WhatsApp; a instituição também apresenta site com unidades.",
    "idea": "Como já possui site, investigar se há interesse em melhorias de comunicação ou atualização.",
    "website": "https://www.institutoimpianto.org.br/unidades/",
    "websiteLabel": "Site institucional encontrado; confirmar informações atuais"
  },
  {
    "id": "salva-pet-mascote",
    "name": "Clínica Veterinária Salva Pet — São Paulo",
    "segment": "Clínica veterinária",
    "neighborhood": "Vila Mascote",
    "address": "Rua Lacedemônia, 132",
    "phone": "(11) 97053-1613",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/veterinarios/8924276-7/clinica-veterinaria-salva-pet-sao-paulo-atendimento-24h",
    "fact": "O GuiaMais lista clínica, endereço e WhatsApp.",
    "idea": "Confirmar atividade e canais; investigar se informações de atendimento seriam úteis."
  },
  {
    "id": "chaveiro-cidade",
    "name": "Chaveiro Cidade",
    "segment": "Chaveiro",
    "neighborhood": "Vila Mariana",
    "address": "Rua Domingos de Morais, 2027",
    "phone": "(11) 94456-3386",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/profissionais-diversos/chaveiros/2350369671-6206003/chaveiro-cidade",
    "fact": "O GuiaMais informa endereço e WhatsApp.",
    "idea": "Investigar se uma página com serviços e região de atendimento ajudaria."
  },
  {
    "id": "chaveiro-locksmith",
    "name": "Chaveiro Locksmith",
    "segment": "Chaveiro",
    "neighborhood": "Itaim Bibi",
    "address": "Rua Olimpíadas, 2",
    "phone": "(11) 95911-4211",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/profissionais-diversos/chaveiros/11230374-1/chaveiro-locksmith",
    "fact": "O diretório informa endereço, serviços de chaveiro e WhatsApp.",
    "idea": "Investigar se informações locais e apresentação dos serviços poderiam ser aprimoradas."
  },
  {
    "id": "plastija",
    "name": "Plastijá Embalagens",
    "segment": "Embalagens",
    "neighborhood": "Itaim Paulista",
    "address": "Estrada Dom João Nery, 80",
    "phone": "(11) 96916-0516",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/estr-dom-joao-nery?page=8",
    "fact": "O GuiaMais lista endereço e WhatsApp; a loja também possui página própria.",
    "idea": "Investigar se há interesse em otimização do catálogo e canais já existentes.",
    "website": "https://plastija.com.br/quem-somos/",
    "websiteLabel": "Página própria encontrada; atualidade a confirmar"
  },
  {
    "id": "pizzaria-du-frade",
    "name": "Pizzaria Du Frade",
    "segment": "Pizzaria",
    "neighborhood": "Tatuapé",
    "address": "Rua Cantagalo, 2222",
    "phone": "(11) 93344-7504",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/restaurantes/pizzarias/2353597976-2058476/pizzaria-du-frade-ii",
    "fact": "O GuiaMais lista endereço e WhatsApp da pizzaria.",
    "idea": "Investigar se cardápio ou integração dos canais de pedido precisam de melhorias."
  },
  {
    "id": "krav-maga-bukan",
    "name": "Krav-Maga Bukan — Santa Cecília",
    "segment": "Academia",
    "neighborhood": "Santa Cecília",
    "address": "Av. São João, 1912",
    "phone": "(11) 98573-5523",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/praticas-esportivas/academias/14749050-1/academia-esporte-concentracao",
    "fact": "O diretório apresenta esta unidade como sugestão e informa endereço e WhatsApp.",
    "idea": "Confirmar operação e investigar se informações de aulas e contato precisam de melhorias."
  },
  {
    "id": "desmonte-aquarius",
    "name": "Desmonte Aquarius",
    "segment": "Autopeças",
    "neighborhood": "Vila Mariana",
    "address": "Av. Doutor Ricardo Jafet, 2421",
    "phone": "(11) 5069-2111",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/equipamentos-pecas-e-acessorios/desmanches/8924267-0/desmonte-aquarius",
    "fact": "O GuiaMais lista peças automotivas, endereço e número apontado como WhatsApp; o negócio possui site.",
    "idea": "Investigar melhorias no catálogo ou atendimento digital existente.",
    "website": "https://desmonteaquarius.com.br/",
    "websiteLabel": "Site encontrado na pesquisa; confirmar informações atuais"
  },
  {
    "id": "bispo-hair",
    "name": "Bispo Hair & Cia",
    "segment": "Salão de beleza",
    "neighborhood": "Perdizes",
    "address": "Rua Tucuna, 891",
    "phone": "(11) 94477-4247",
    "source": "https://www.bispohairecia.com.br/",
    "fact": "O site apresenta endereço, serviços e WhatsApp do salão.",
    "idea": "Investigar se existe interesse em melhorias no site, portfólio ou agendamento.",
    "website": "https://www.bispohairecia.com.br/",
    "websiteLabel": "Site próprio encontrado"
  },
  {
    "id": "nany-hair",
    "name": "Nany Hair",
    "segment": "Salão de beleza",
    "neighborhood": "Vila Nova Savoia",
    "address": "Av. Pasteur, 37",
    "phone": "(11) 2651-3595",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/institutos-de-beleza/saloes-de-beleza-e-cabeleireiros/16453504-1/nany-hair",
    "fact": "O diretório informa salão, endereço e telefone; não identifica o número como WhatsApp.",
    "idea": "Confirmar atividade, telefone e canais antes de avaliar oportunidades.",
    "contactKind": "telefone"
  },
  {
    "id": "imobiliaria-apa",
    "name": "Imobiliária APA",
    "segment": "Imobiliária",
    "neighborhood": "Santa Cecília",
    "address": "Av. Angélica, 671",
    "phone": "(11) 3826-8155",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/compra-venda-e-locacao/imobiliarias/14697402-1/imobiliaria-apa",
    "fact": "O diretório informa endereço e telefone, sem identificar WhatsApp.",
    "idea": "Confirmar operação e investigar interesse em melhorar apresentação dos imóveis.",
    "contactKind": "telefone"
  },
  {
    "id": "academia-esporte-concentracao",
    "name": "Academia Esporte Concentração",
    "segment": "Academia",
    "neighborhood": "Jardim Têxtil",
    "address": "Rua Antúrios, 33",
    "phone": "(11) 2673-0808",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/praticas-esportivas/academias/14749050-1/academia-esporte-concentracao",
    "fact": "O diretório informa endereço e telefone; WhatsApp não identificado.",
    "idea": "Confirmar atividade e se informações de aulas e matrícula já estão disponíveis.",
    "contactKind": "telefone"
  },
  {
    "id": "auto-mecanica-consoli",
    "name": "Auto Mecânica Consoli",
    "segment": "Oficina",
    "neighborhood": "Jardim Ana Rosa",
    "address": "Rua Heráclito Odilon, 395",
    "phone": "(11) 2216-2863",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/servicos-e-manutencao-veicular/oficinas-mecanicas-para-caminhoes",
    "fact": "O diretório lista oficina para caminhões, endereço e telefone; não confirma WhatsApp.",
    "idea": "Confirmar atividade e investigar interesse em apresentar serviços e facilitar orçamentos.",
    "contactKind": "telefone"
  },
  {
    "id": "casa-de-bolos-ipiranga",
    "name": "Casa de Bolos — Ipiranga",
    "segment": "Confeitaria",
    "neighborhood": "Ipiranga",
    "address": "Rua Silva Bueno, 1314",
    "phone": "(11) 2062-6315",
    "source": "https://www.guiamais.com.br/sao-paulo-sp/doces-e-sobremesas/confeitarias-e-docerias/2357228029-3020812/casa-de-bolos",
    "fact": "O diretório lista a unidade, endereço e telefone; não confirma WhatsApp.",
    "idea": "Confirmar atividade e canais da unidade; investigar interesse em divulgar catálogo.",
    "website": "https://www.telelistas.net/locais/sp/sao+paulo/bolos+e+tortas/bu-5737714/casa+de+bolos+sao+paulo+ipiranga+em+ipiranga",
    "websiteLabel": "Diretório menciona site da rede; confirmar",
    "contactKind": "telefone"
  },
  {
    "id": "pucci-odontologia",
    "name": "Pucci Odontologia",
    "segment": "Odontologia",
    "neighborhood": "Bela Vista",
    "address": "Av. Paulista, 1009, 2º andar, conjunto 210",
    "phone": "(11) 93804-1057",
    "source": "https://www.pucciodontologia.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em melhorias na apresentação dos tratamentos ou do contato no site existente.",
    "website": "https://www.pucciodontologia.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "chedid-odontologica",
    "name": "Chedid Odontológica",
    "segment": "Odontologia",
    "neighborhood": "Chácara Tatuapé",
    "address": "Rua Marquês de Abrantes, 258",
    "phone": "(11) 95438-9966",
    "source": "https://claudiochedidodonto.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em aprimorar a comunicação dos serviços no site existente.",
    "website": "https://claudiochedidodonto.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "flori-odontologia",
    "name": "Flori Odontologia",
    "segment": "Odontologia",
    "neighborhood": "Perdizes",
    "address": "Rua Cayowaá, 759",
    "phone": "(11) 98773-2576",
    "source": "https://floriodontologia.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar se existem necessidades de atualização ou comunicação nos canais digitais atuais.",
    "website": "https://floriodontologia.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "kitt-odontologia",
    "name": "Kitt Odontologia",
    "segment": "Odontologia",
    "neighborhood": "Vila Ester",
    "address": "Rua Maria Curupaiti, 441, sala 205G",
    "phone": "(11) 99913-6464",
    "source": "https://www.kittodontologia.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em melhorias no site e na apresentação dos tratamentos.",
    "website": "https://www.kittodontologia.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "prime-odonto-sp",
    "name": "Prime Odonto SP — Unidade 1",
    "segment": "Odontologia",
    "neighborhood": "Parque São Luís",
    "address": "Rua José Otávio, 103, 1º andar",
    "phone": "(11) 91548-2378",
    "source": "https://primeodontosp.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Confirmar o contato comercial e investigar como apresentar melhor as unidades e serviços.",
    "website": "https://primeodontosp.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "odonto-delgado",
    "name": "Odonto Delgado",
    "segment": "Odontologia",
    "neighborhood": "Jardim França",
    "address": "Rua Capitão Alberto Mendes Júnior, 381",
    "phone": "(11) 98936-9559",
    "source": "https://www.odontodelgado.com.br/perguntas-frequentes",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar se há interesse em aperfeiçoar a comunicação digital já existente.",
    "website": "https://www.odontodelgado.com.br/perguntas-frequentes",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "urbano-odontologia",
    "name": "Urbano Odontologia",
    "segment": "Odontologia",
    "neighborhood": "Vila Dom Pedro II",
    "address": "Rua Capitão Sérvio Rodrigues Caldas, 116",
    "phone": "(11) 97204-9344",
    "source": "https://urbanoodontologiasp.com.br/tecnologia-camera-micro-oral-fotografia-odontologica-e-rede-de-computadores/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em atualização de conteúdo ou melhorias nos canais atuais.",
    "website": "https://urbanoodontologiasp.com.br/tecnologia-camera-micro-oral-fotografia-odontologica-e-rede-de-computadores/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "wa-odontologia",
    "name": "W&A Odontologia Especializada",
    "segment": "Odontologia",
    "neighborhood": "Jardim Morumbi",
    "address": "Rua Itapaiuna, 2980, sala 4",
    "phone": "(11) 97654-0388",
    "source": "https://waodontologia.codental.site/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em ampliar a apresentação dos serviços ou aperfeiçoar o contato no site.",
    "website": "https://waodontologia.codental.site/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "portal-sorriso-pinheiros",
    "name": "Portal do Sorriso — Pinheiros",
    "segment": "Odontologia",
    "neighborhood": "Pinheiros",
    "address": "Rua Cristiano Viana, 401, 5º andar, conjunto 501",
    "phone": "(11) 97414-1418",
    "source": "https://www.portaldosorriso.com.br/contato",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "O site distingue fornecedores e pacientes; buscar o canal adequado para apresentar serviços.",
    "website": "https://www.portaldosorriso.com.br/contato",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "sakamoto-tatuape",
    "name": "Sakamoto Odontologia — Tatuapé",
    "segment": "Odontologia",
    "neighborhood": "Tatuapé",
    "address": "Rua Itapura, 300, sala 509",
    "phone": "(11) 94155-6015",
    "source": "https://www.sakamotoodontologia.com.br/contato.html",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em melhorar a comunicação das unidades ou dos serviços no site.",
    "website": "https://www.sakamotoodontologia.com.br/contato.html",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "complexo-odontologico-jacana",
    "name": "Complexo Odontológico",
    "segment": "Odontologia",
    "neighborhood": "Jaçanã",
    "address": "Rua Capitão Nascimento, 230",
    "phone": "(11) 97693-1287",
    "source": "https://www.complexoodontologico.com.br/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em atualização do site ou organização das informações de contato.",
    "website": "https://www.complexoodontologico.com.br/",
    "websiteLabel": "Site da clínica encontrado"
  },
  {
    "id": "well-clinic",
    "name": "Well Clinic Odontologia",
    "segment": "Odontologia",
    "neighborhood": "Jardim Paulista",
    "address": "Rua Bento de Andrade, 116",
    "phone": "(11) 92004-8069",
    "source": "https://wellclinic.com/en/contact/",
    "fact": "O site da clínica informa endereço e WhatsApp; atividade e contato comercial precisam ser confirmados.",
    "idea": "Investigar interesse em melhorias na comunicação multilíngue ou em outros canais existentes.",
    "website": "https://wellclinic.com/en/contact/",
    "websiteLabel": "Site da clínica encontrado"
  },
];
export const researchId = (id: string) => `pesquisa-sp-20261121-${id}`;
export const cleanName = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");
