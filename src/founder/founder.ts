import { emptyFounder, FounderData, FounderMemory, Store } from "../types";

// Reviewed individually; nothing here is silently persisted as a memory.
export const suggestions: {
  id: string;
  content: string;
  category: FounderMemory["category"];
  source: FounderMemory["source"];
}[] = [
  {
    id: "identity",
    content: "Meu nome é Ezequiel e sou fundador da Zeik Digital.",
    category: "Minha identidade",
    source: "Fundador",
  },
  {
    id: "location",
    content: "Estou em São Paulo, Brasil.",
    category: "Minha identidade",
    source: "Fundador",
  },
  {
    id: "age-2026",
    content: "Tenho 19 anos em 2026.",
    category: "Minha identidade",
    source: "Fundador",
  },
  {
    id: "job",
    content:
      "Concilio o emprego de porteiro com o desenvolvimento da Zeik Digital.",
    category: "Minha identidade",
    source: "Fundador",
  },
  {
    id: "ipad",
    content:
      "Prefiro soluções que funcionem bem no iPad e em dispositivos móveis.",
    category: "Minhas preferências",
    source: "Fundador",
  },
  {
    id: "visual",
    content:
      "Em sites, prefiro design premium, estética Apple, animações suaves, responsividade e boa performance.",
    category: "Minhas preferências",
    source: "Fundador",
  },
  {
    id: "tone",
    content:
      "Prefiro uma conversa natural, direta e próxima, sem gírias exageradas.",
    category: "Meu jeito de conversar",
    source: "Fundador",
  },
  {
    id: "learning",
    content:
      "Aprendo principalmente construindo, testando e resolvendo problemas reais.",
    category: "Meus aprendizados",
    source: "Fundador",
  },
  {
    id: "recurring",
    content:
      "Objetivo: construir uma agência sustentável e, futuramente, alcançar aproximadamente 10 a 20 clientes fixos. Isso não é um resultado atual.",
    category: "Minhas metas",
    source: "Fundador",
  },
  {
    id: "growth",
    content:
      "Objetivo: crescer gradualmente em automação, inteligência artificial, sistemas e produtos digitais.",
    category: "Minhas metas",
    source: "Fundador",
  },
  {
    id: "practical",
    content:
      "Tendo a valorizar resultados práticos e experiências bem acabadas.",
    category: "Minhas preferências",
    source: "Padrão observado",
  },
];
export function pendingSuggestions(f: FounderData) {
  return suggestions.filter(
    (s) =>
      !f.dismissed.includes(s.id) &&
      !f.memories.some((m) => m.suggestionId === s.id),
  );
}
export function contextMemories(
  f: FounderData,
  categories?: FounderMemory["category"][],
) {
  return f.memories.filter(
    (m) =>
      m.confirmation === "Confirmado" &&
      m.useInContext &&
      (!categories || categories.includes(m.category)),
  );
}
export function founderName(f: FounderData) {
  const m = contextMemories(f, ["Minha identidade"]).find(
    (x) => x.suggestionId === "identity",
  );
  if (!m) return "";
  const match = m.content.match(/(?:meu nome é|me chamo)\s+([\p{L}]+)/iu);
  return match?.[1] || "";
}
export function getFounder(s: Store) {
  return s.founder || emptyFounder();
}
export function siteContext(f: FounderData) {
  return contextMemories(f, ["Minhas preferências"])
    .filter((m) => m.privacy !== "Sensível")
    .map((m) => m.content)
    .slice(0, 8);
}
export function ideaReview(projects: string[]) {
  return `Para avaliar a ideia sem presumir demanda: defina o problema e quem pagaria; estime custo, esforço e potencial comercial; teste uma versão pequena antes de decidir. ${projects.length ? `Projetos em aberto que podem ser reaproveitados ou competir por tempo: ${projects.join(", ")}.` : "Não há projetos em aberto cadastrados para comparação."} Classifique como ideia, projeto ou prioridade após validar essas informações.`;
}
