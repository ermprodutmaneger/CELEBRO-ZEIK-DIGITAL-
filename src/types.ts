import { validLogo } from "./clients/logo";
export type Contact = {
  id: string;
  date: string;
  channel: string;
  notes: string;
};
export type Proposal = {
  id: string;
  title: string;
  value: number;
  status: string;
  notes: string;
};
export type ChecklistEntry = { id: string; text: string; done: boolean };
export type Item = {
  id: string;
  name: string;
  type: string;
  status: string;
  segment: string;
  value: number;
  date: string;
  notes: string;
  next: string;
  city: string;
  probability: number;
  updated: string;
  contacts?: Contact[];
  proposals?: Proposal[];
  checklist?: ChecklistEntry[];
  clientId?: string;
  phone?: string;
  fixedClient?: boolean;
  clientStatus?: "ativo" | "inativo";
  avatar?: string;
  logo?: string;
  relationshipHistory?: string;
  links?: {
    github: string;
    vercel: string;
    domain: string;
    references: string;
  };
  changes?: string[];
  financeKind?: "receita" | "despesa" | "mensalidade" | "contrato";
  financeState?: "previsto" | "recebido" | "pago" | "ativo" | "encerrado";
};
export const founderCategories = [
  "Minha identidade",
  "Meu jeito de conversar",
  "Minhas preferências",
  "Minhas metas",
  "Meus projetos",
  "Minhas ideias",
  "Minhas decisões",
  "Meus aprendizados",
  "Minhas prioridades",
  "Minha evolução",
] as const;
export type FounderCategory = (typeof founderCategories)[number];
export type FounderMemory = {
  id: string;
  content: string;
  category: FounderCategory;
  source: "Fundador" | "Padrão observado" | "Hipótese";
  confirmation: "Confirmado" | "Não confirmado";
  privacy: "Pessoal" | "Sensível";
  useInContext: boolean;
  createdAt: string;
  updatedAt: string;
  suggestionId?: string;
  sensitiveConsent?: boolean;
  active?: boolean;
};
export type FounderData = {
  memories: FounderMemory[];
  dismissed: string[];
  corrections: { id: string; at: string; category: FounderCategory }[];
  mode: "fundador" | "profissional";
};
export type Store = {
  items: Item[];
  history: string[];
  founder?: FounderData;
  clientSetup?: { completed: true; conflicts: string[] };
};
export const emptyFounder = (): FounderData => ({
  memories: [],
  dismissed: [],
  corrections: [],
  mode: "fundador",
});
export function hasCredential(text: string): boolean {
  return /(?:senha|password|token|api[_ -]?key|chave secreta|credential|credencial)\s*[:=]\s*\S{4,}|\b(?:sk-[a-zA-Z0-9_-]{12,}|ghp_[a-zA-Z0-9]{20,}|AKIA[A-Z0-9]{16})\b/i.test(
    text,
  );
}
export function mayBeSensitive(text: string): boolean {
  return /\b(saúde|saude|doença|doenca|diagnóstico|diagnostico|religião|religiao|sexualidade|orientação sexual|orientacao sexual|raça|raca|etnia|política|politica|biometria|sindicato)\b/i.test(
    text,
  );
}
export interface DataRepository {
  load(): Store;
  save(data: Store): void;
}
export interface AIProvider {
  complete(prompt: string): Promise<string>;
}
export interface SearchProvider {
  search(query: string): Promise<unknown[]>;
}
export interface AutomationProvider {
  run(action: string): Promise<void>;
}
const types = ["crm", "leads", "projects", "finance", "tasks", "memory"];
const stringFields = [
  "id",
  "name",
  "type",
  "status",
  "segment",
  "date",
  "notes",
  "next",
  "city",
  "updated",
] as const;
const obj = (x: unknown): x is Record<string, any> =>
  typeof x === "object" && x !== null && !Array.isArray(x);
/** Strict validation prevents partial imports and accidental overwrites of incompatible backups. */
export function validateStore(data: unknown): Store {
  if (
    !obj(data) ||
    !Array.isArray(data.items) ||
    !Array.isArray(data.history) ||
    !data.history.every((x: unknown) => typeof x === "string")
  )
    throw Error("Formato de dados inválido");
  const ids = new Set<string>();
  for (const x of data.items) {
    if (
      !obj(x) ||
      !stringFields.every((k) => typeof x[k] === "string") ||
      !x.id ||
      !x.name.trim() ||
      !types.includes(x.type) ||
      ids.has(x.id) ||
      !Number.isFinite(x.value) ||
      x.value < 0 ||
      !Number.isFinite(x.probability) ||
      x.probability < 0 ||
      x.probability > 100
    )
      throw Error("Registro inválido ou duplicado");
    ids.add(x.id);
    if (
      x.contacts !== undefined &&
      (!Array.isArray(x.contacts) ||
        !x.contacts.every(
          (v: unknown) =>
            obj(v) &&
            ["id", "date", "channel", "notes"].every(
              (k) => typeof v[k] === "string",
            ),
        ))
    )
      throw Error("Contatos inválidos");
    if (
      x.proposals !== undefined &&
      (!Array.isArray(x.proposals) ||
        !x.proposals.every(
          (v: unknown) =>
            obj(v) &&
            ["id", "title", "status", "notes"].every(
              (k) => typeof v[k] === "string",
            ) &&
            Number.isFinite(v.value) &&
            v.value >= 0,
        ))
    )
      throw Error("Propostas inválidas");
    if (
      x.checklist !== undefined &&
      (!Array.isArray(x.checklist) ||
        !x.checklist.every(
          (v: unknown) =>
            obj(v) &&
            typeof v.id === "string" &&
            typeof v.text === "string" &&
            typeof v.done === "boolean",
        ))
    )
      throw Error("Checklist inválido");
    if (
      x.links !== undefined &&
      (!obj(x.links) ||
        !["github", "vercel", "domain", "references"].every(
          (k) => typeof x.links[k] === "string",
        ))
    )
      throw Error("Links inválidos");
    if (
      x.changes !== undefined &&
      (!Array.isArray(x.changes) ||
        !x.changes.every((v: unknown) => typeof v === "string"))
    )
      throw Error("Histórico inválido");
    if (x.clientId !== undefined && typeof x.clientId !== "string")
      throw Error("Vínculo inválido");
    if (x.phone !== undefined && typeof x.phone !== "string")
      throw Error("Telefone inválido");
    if (x.fixedClient !== undefined && typeof x.fixedClient !== "boolean")
      throw Error("Categoria inválida");
    if (
      x.clientStatus !== undefined &&
      !["ativo", "inativo"].includes(x.clientStatus)
    )
      throw Error("Status do cliente inválido");
    if (
      x.avatar !== undefined &&
      (typeof x.avatar !== "string" ||
        !/^\/clients\/[a-z0-9-]+\.jpg$/.test(x.avatar))
    )
      throw Error("Avatar inválido");
    if (x.logo !== undefined && !validLogo(x.logo)) throw Error("Logo inválida");
    if (x.relationshipHistory !== undefined && (typeof x.relationshipHistory !== "string" || x.relationshipHistory.length > 20000)) throw Error("História do cliente inválida");
    if (
      x.financeKind !== undefined &&
      !["receita", "despesa", "mensalidade", "contrato"].includes(x.financeKind)
    )
      throw Error("Tipo financeiro inválido");
    if (
      x.financeState !== undefined &&
      !["previsto", "recebido", "pago", "ativo", "encerrado"].includes(
        x.financeState,
      )
    )
      throw Error("Estado financeiro inválido");
  }
  if (data.founder !== undefined) {
    const f = data.founder;
    if (
      !obj(f) ||
      !Array.isArray(f.memories) ||
      !Array.isArray(f.dismissed) ||
      !f.dismissed.every((x: unknown) => typeof x === "string") ||
      !Array.isArray(f.corrections) ||
      !["fundador", "profissional"].includes(f.mode)
    )
      throw Error("Perfil do fundador inválido");
    const memoryIds = new Set<string>();
    for (const m of f.memories) {
      if (
        !obj(m) ||
        typeof m.id !== "string" ||
        !m.id ||
        memoryIds.has(m.id) ||
        typeof m.content !== "string" ||
        !m.content.trim() ||
        hasCredential(m.content) ||
        !founderCategories.includes(m.category) ||
        !["Fundador", "Padrão observado", "Hipótese"].includes(m.source) ||
        !["Confirmado", "Não confirmado"].includes(m.confirmation) ||
        !["Pessoal", "Sensível"].includes(m.privacy) ||
        typeof m.useInContext !== "boolean" ||
        typeof m.createdAt !== "string" ||
        typeof m.updatedAt !== "string" ||
        (m.suggestionId !== undefined && typeof m.suggestionId !== "string") ||
        (m.active !== undefined && typeof m.active !== "boolean") ||
        ((m.privacy === "Sensível" || mayBeSensitive(m.content)) &&
          (m.privacy !== "Sensível" || m.sensitiveConsent !== true)) ||
        (m.useInContext && m.confirmation !== "Confirmado")
      )
        throw Error("Memória do fundador inválida");
      memoryIds.add(m.id);
    }
    if (
      !f.corrections.every(
        (c: unknown) =>
          obj(c) &&
          typeof c.id === "string" &&
          typeof c.at === "string" &&
          founderCategories.includes(c.category),
      )
    )
      throw Error("Correções inválidas");
  }
  if (
    data.clientSetup !== undefined &&
    (!obj(data.clientSetup) ||
      data.clientSetup.completed !== true ||
      !Array.isArray(data.clientSetup.conflicts) ||
      !data.clientSetup.conflicts.every((x: unknown) => typeof x === "string"))
  )
    throw Error("Configuração de clientes inválida");
  return {
    items: data.items as Item[],
    history: data.history as string[],
    founder: data.founder as FounderData | undefined,
    clientSetup: data.clientSetup as Store["clientSetup"],
  };
}
export const localRepository: DataRepository = {
  load() {
    const raw = localStorage.getItem("zeik-brain-v1");
    return raw ? validateStore(JSON.parse(raw)) : { items: [], history: [] };
  },
  save(data) {
    localStorage.setItem("zeik-brain-v1", JSON.stringify(data));
  },
};
