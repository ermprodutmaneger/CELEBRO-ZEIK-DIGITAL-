import type { Item, Store } from "../types";
import { cleanName } from "../prospecting/research";
const now = "2026-11-21";
const base = (
  id: string,
  name: string,
  type: string,
  status: string,
  segment: string,
  value: number,
  notes: string,
): Item => ({
  id,
  name,
  type,
  status,
  segment,
  value,
  notes,
  date: "",
  next: "",
  city: "",
  probability: 0,
  updated: now,
});
const fixed: { name: string; client: Item; finance: Item[] }[] = [
  {
    name: "Daniela Lina",
    client: {
      ...base(
        "client-daniela-lina-202611",
        "Daniela Lina",
        "crm",
        "Cliente",
        "Terapia Integrativa",
        0,
        "Cliente recorrente; em dezembro de 2026, a segunda parcela do site substitui a mensalidade para previsão.",
      ),
      phone: "11 96114-7268",
      fixedClient: true,
      clientStatus: "ativo",
      avatar: "/clients/daniela.jpg",
    },
    finance: [
      {
        ...base(
          "mrr-daniela-lina-202611",
          "Mensalidade — Daniela Lina",
          "finance",
          "Mensalidade",
          "Terapia Integrativa",
          100,
          "Mensalidade recorrente; pagamento não informado.",
        ),
        clientId: "client-daniela-lina-202611",
        financeKind: "mensalidade",
        financeState: "ativo",
      },
      {
        ...base(
          "site-daniela-lina-202612",
          "Segunda parcela do site — Daniela Lina",
          "finance",
          "Pendente",
          "Site",
          400,
          "Segunda parcela do site em dezembro de 2026 substitui a mensalidade desse mês na previsão; dia de vencimento não informado.",
        ),
        clientId: "client-daniela-lina-202611",
        date: "2026-12",
        financeKind: "receita",
        financeState: "previsto",
      },
    ],
  },
  {
    name: "Açaí do Cordeiro",
    client: {
      ...base(
        "client-acai-cordeiro-202611",
        "Açaí do Cordeiro",
        "crm",
        "Cliente",
        "Distribuidor de Açaí",
        0,
        "Cliente recorrente mensal.",
      ),
      phone: "11 94749-2569",
      fixedClient: true,
      clientStatus: "ativo",
      avatar: "/clients/acai.jpg",
    },
    finance: [
      {
        ...base(
          "mrr-acai-cordeiro-202611",
          "Mensalidade — Açaí do Cordeiro",
          "finance",
          "Mensalidade",
          "Distribuidor de Açaí",
          65,
          "Mensalidade recorrente; pagamento não informado.",
        ),
        clientId: "client-acai-cordeiro-202611",
        financeKind: "mensalidade",
        financeState: "ativo",
      },
    ],
  },
];
/** Add only once, preserving unrelated records; ambiguous matches require manual review. */
export function installRequestedClients(store: Store): Store {
  if (store.clientSetup?.completed) return store;
  const additions: Item[] = [];
  const conflicts: string[] = [];
  for (const x of fixed) {
    const ids = [x.client.id, ...x.finance.map((f) => f.id)];
    const duplicate = store.items.some(
      (i) =>
        ids.includes(i.id) ||
        (["crm", "leads"].includes(i.type) &&
          cleanName(i.name) === cleanName(x.name)) ||
        (i.type === "finance" &&
          (cleanName(i.name).includes(cleanName(x.name)) ||
            (x.name === "Daniela Lina" &&
              cleanName(i.name).includes("segunda parcela do site") &&
              i.value === 400))),
    );
    if (duplicate) {
      conflicts.push(x.name);
      continue;
    }
    additions.push(x.client, ...x.finance);
  }
  return {
    ...store,
    items: [...additions, ...store.items],
    history: additions.length
      ? [
          `${new Date().toLocaleString("pt-BR")} · Clientes e lançamentos adicionados conforme solicitação`,
          ...store.history,
        ].slice(0, 100)
      : store.history,
    clientSetup: { completed: true, conflicts },
  };
}
