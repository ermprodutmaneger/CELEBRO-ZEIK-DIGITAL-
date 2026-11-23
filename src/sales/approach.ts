/** Rascunho original inspirado na escuta e nas perguntas abertas do trecho fornecido. */
export function firstApproach(name: string, observation: string, question: string) {
  const business = name.trim() || '[nome do negócio]';
  const fact = observation.trim();
  const ask = question.trim() || 'Como vocês apresentam seus serviços e recebem novos contatos hoje?';
  return `Olá! Tudo bem? Meu nome é [seu nome] e sou da Zeik Digital.\n\n${fact ? `Vi que ${fact}\n\n` : ''}Estou conhecendo melhor o trabalho da ${business} e gostaria de entender: ${ask}\n\nSe fizer sentido conversar sobre isso, fico à disposição. Obrigado pelo seu tempo!`;
}
