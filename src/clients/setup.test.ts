import { describe, it, expect } from "vitest";
import { installRequestedClients } from "./setup";
import { financeSummary } from "../services/rules";
import { validateStore, type Item } from "../types";
const existing: Item = {
  id: "other",
  name: "Projeto já existente",
  type: "projects",
  status: "Em andamento",
  segment: "",
  value: 0,
  date: "",
  notes: "Não apagar",
  next: "",
  city: "",
  probability: 0,
  updated: "2026-11-21",
};
describe("cadastros solicitados", () => {
  it("adiciona clientes e lançamentos sem perder dados e sem duplicar no recarregamento", () => {
    const original = { items: [existing], history: ["antigo"] };
    const result = installRequestedClients(original);
    expect(result.items).toHaveLength(6);
    expect(result.items).toContain(existing);
    expect(
      result.items.filter((x) => x.fixedClient && x.clientStatus === "ativo"),
    ).toHaveLength(2);
    expect(installRequestedClients(result)).toBe(result);
    expect(
      validateStore(JSON.parse(JSON.stringify(result))).clientSetup,
    ).toEqual({ completed: true, conflicts: [] });
  });
  it("calcula recorrência e dezembro sem contar valores como recebidos", () => {
    const s = installRequestedClients({ items: [], history: [] });
    expect(financeSummary(s.items, "2026-12")).toEqual({
      received: 0,
      paid: 0,
      forecast: 400,
      pendingExpenses: 0,
      mrr: 165,
    });
    expect(financeSummary(s.items, "2026-11").forecast).toBe(0);
    const pending = s.items.find((x) => x.value === 400)!;
    expect(pending.date).toBe("2026-12");
    expect(pending.clientId).toBe("client-daniela-lina-202611");
  });
  it("não duplica nem altera um cliente com nome já existente", () => {
    const dupe: Item = {
      ...existing,
      id: "existing-client",
      name: "Daniela Lina",
      type: "crm",
      status: "Cliente",
    };
    const s = installRequestedClients({ items: [dupe], history: [] });
    expect(s.clientSetup?.conflicts).toContain("Daniela Lina");
    expect(s.items.filter((x) => x.name === "Daniela Lina")).toEqual([dupe]);
    expect(s.items.some((x) => x.value === 400)).toBe(false);
    expect(s.items.some((x) => x.name === "Açaí do Cordeiro")).toBe(true);
  });
  it("não reinstala registros excluídos depois da primeira aplicação", () => {
    const first = installRequestedClients({ items: [], history: [] });
    const after = {
      ...first,
      items: first.items.filter((x) => x.id !== "client-daniela-lina-202611"),
    };
    expect(installRequestedClients(after).items).toEqual(after.items);
  });
});
