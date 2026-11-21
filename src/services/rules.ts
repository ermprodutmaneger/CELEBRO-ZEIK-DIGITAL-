import type { Item } from "../types";
export function financeInfo(x: Item) {
  if (x.financeKind && x.financeState)
    return { kind: x.financeKind, state: x.financeState };
  // Legacy records did not distinguish settlement; do not claim receipts or payments without evidence.
  if (x.status === "Recebido") return { kind: "receita", state: "recebido" };
  if (x.status === "Despesa") return { kind: "despesa", state: "previsto" };
  if (x.status === "Mensalidade")
    return { kind: "mensalidade", state: "ativo" };
  return { kind: "receita", state: "previsto" };
}
export function financeSummary(items: Item[], month: string) {
  const entries = items.filter((x) => x.type === "finance");
  const sum = (arr: Item[]) => arr.reduce((n, x) => n + x.value, 0);
  const thisMonth = entries.filter((x) => x.date.startsWith(month));
  return {
    received: sum(
      thisMonth.filter((x) => {
        const f = financeInfo(x);
        return f.kind === "receita" && f.state === "recebido";
      }),
    ),
    paid: sum(
      thisMonth.filter((x) => {
        const f = financeInfo(x);
        return f.kind === "despesa" && f.state === "pago";
      }),
    ),
    forecast: sum(
      thisMonth.filter((x) => {
        const f = financeInfo(x);
        return f.kind === "receita" && f.state === "previsto";
      }),
    ),
    pendingExpenses: sum(
      thisMonth.filter((x) => {
        const f = financeInfo(x);
        return f.kind === "despesa" && f.state === "previsto";
      }),
    ),
    mrr: sum(
      entries.filter((x) => {
        const f = financeInfo(x);
        return f.kind === "mensalidade" && f.state === "ativo";
      }),
    ),
  };
}
export function convertLead(item: Item): Item {
  return {
    ...item,
    type: "crm",
    status: "Cliente",
    updated: new Date().toISOString().slice(0, 10),
  };
}
export function leadPriority(item: Item): number {
  return Math.round((item.value * item.probability) / 100);
}
export function buildBriefing(x: Item, client?: Item) {
  return `Crie um site profissional para ${client?.name || x.name}.\nSegmento: ${x.segment || "[definir]"}.\nObjetivo e briefing: ${x.notes || "[definir]"}.\nReferências e funcionalidades: ${x.next || "[definir]"}.\nLinks de referência: ${x.links?.references || "[definir]"}.\nChecklist: ${(x.checklist || []).map((c) => c.text).join("; ") || "[definir]"}.\n\nDesenvolva um layout moderno e responsivo para desktop, tablet e celular, com acessibilidade, navegação intuitiva, animações leves, SEO técnico, carregamento rápido e testes de qualidade. Prazo: ${x.date || "[definir]"}.`;
}
