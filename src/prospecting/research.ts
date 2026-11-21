/** Pesquisa pontual de cadastros públicos, não é uma busca ao vivo. */
export type Prospect = {
  id: string;
  name: string;
  segment: string;
  neighborhood: string;
  address: string;
  phone: string;
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
];
export const researchId = (id: string) => `pesquisa-sp-20261121-${id}`;
export const cleanName = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("pt-BR");
