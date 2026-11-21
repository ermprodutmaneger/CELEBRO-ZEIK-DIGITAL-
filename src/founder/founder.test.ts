import { describe, expect, it } from "vitest";
import {
  emptyFounder,
  hasCredential,
  mayBeSensitive,
  validateStore,
  type FounderMemory,
} from "../types";
import {
  contextMemories,
  founderName,
  pendingSuggestions,
  siteContext,
  ideaReview,
} from "./founder";
const memory = (overrides: Partial<FounderMemory> = {}): FounderMemory => ({
  id: "1",
  content: "Prefiro sites responsivos.",
  category: "Minhas preferências",
  source: "Fundador",
  confirmation: "Confirmado",
  privacy: "Pessoal",
  useInContext: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});
describe("memória do fundador", () => {
  it("não persiste sugestões automaticamente e só oferece sugestões ainda não resolvidas", () => {
    const f = emptyFounder();
    expect(f.memories).toEqual([]);
    expect(pendingSuggestions(f).length).toBeGreaterThan(0);
    f.dismissed = ["ipad"];
    f.memories = [memory({ suggestionId: "visual" })];
    expect(
      pendingSuggestions(f).some((s) => s.id === "ipad" || s.id === "visual"),
    ).toBe(false);
  });
  it("usa somente memórias confirmadas e autorizadas, sem informações sensíveis nos briefings", () => {
    const f = emptyFounder();
    f.memories = [
      memory(),
      memory({ id: "2", confirmation: "Não confirmado", useInContext: false }),
      memory({ id: "3", useInContext: false }),
      memory({
        id: "4",
        privacy: "Sensível",
        content: "Prefiro cuidados com minha saúde.",
        sensitiveConsent: true,
      }),
    ];
    expect(contextMemories(f)).toHaveLength(2);
    expect(siteContext(f)).toEqual(["Prefiro sites responsivos."]);
  });
  it("só usa nome autorizado e confirmação, com correções refletidas", () => {
    const f = emptyFounder();
    f.memories = [
      memory({
        category: "Minha identidade",
        suggestionId: "identity",
        content: "Meu nome é Ezequiel e sou fundador.",
        useInContext: false,
      }),
    ];
    expect(founderName(f)).toBe("");
    f.memories[0].useInContext = true;
    expect(founderName(f)).toBe("Ezequiel");
    f.memories[0].content = "Meu nome é José.";
    expect(founderName(f)).toBe("José");
  });
  it("rejeita credenciais, alertando dados sensíveis detectáveis", () => {
    expect(hasCredential("token: abcdef1234")).toBe(true);
    expect(mayBeSensitive("Informação sobre saúde")).toBe(true);
    const f = emptyFounder();
    f.memories = [memory({ content: "senha: segredo123" })];
    expect(() =>
      validateStore({ items: [], history: [], founder: f }),
    ).toThrow();
  });
  it("exige consentimento sensível e não aceita hipótese como contexto não confirmado", () => {
    const f = emptyFounder();
    f.memories = [memory({ content: "Minha saúde", privacy: "Pessoal" })];
    expect(() =>
      validateStore({ items: [], history: [], founder: f }),
    ).toThrow();
    f.memories = [memory({ privacy: "Sensível" })];
    expect(() =>
      validateStore({ items: [], history: [], founder: f }),
    ).toThrow();
    f.memories = [
      memory({ confirmation: "Não confirmado", useInContext: true }),
    ];
    expect(() =>
      validateStore({ items: [], history: [], founder: f }),
    ).toThrow();
  });
  it("preserva dados fundadores na validação e aceita backups antigos", () => {
    const f = emptyFounder();
    f.memories = [memory()];
    expect(
      validateStore({ items: [], history: [], founder: f }).founder,
    ).toEqual(f);
    expect(validateStore({ items: [], history: [] }).founder).toBeUndefined();
  });
  it("usa projetos cadastrados sem assumir viabilidade de uma ideia", () => {
    expect(ideaReview(["Projeto A"])).toContain("Projeto A");
    expect(ideaReview([])).toContain("Não há projetos");
  });
});
