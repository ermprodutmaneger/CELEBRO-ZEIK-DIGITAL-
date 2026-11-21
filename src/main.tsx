import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Command,
  Download,
  FileText,
  Globe,
  LayoutDashboard,
  ListTodo,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Radio,
  Search,
  Send,
  Settings2,
  Sparkles,
  Target,
  Trash2,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { Item, Store, localRepository, validateStore } from "./types";
import { FounderMemoryPage, FounderEvolution } from "./founder/FounderPages";
import {
  getFounder,
  founderName,
  contextMemories,
  siteContext,
  ideaReview,
} from "./founder/founder";
import { CrmBoard, RecordDetails } from "./components/Operations";
import { financeInfo, financeSummary } from "./services/rules";
import { prepareLogo } from "./clients/logo";
import { installRequestedClients } from "./clients/setup";
import { ProspectList } from "./prospecting/Prospects";
import {
  researchId,
  researchedAt,
  cleanName,
  type Prospect,
} from "./prospecting/research";
import FounderFinance from "./founder-finance/FounderFinance";
import {load as loadFounderFinance, calculate as calculateFounderFinance} from "./founder-finance/model";
import "./style.css";
const Brain = lazy(() => import("./Brain"));
class BrainBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="brain-fallback">
        <BrainCircuit size={110} />
        <span>3D indisponível neste dispositivo. Use o painel.</span>
      </div>
    ) : (
      this.props.children
    );
  }
}
function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
const modules = [
  { id: "dashboard", label: "Visão geral", icon: LayoutDashboard },
  { id: "core", label: "Zeik Core", icon: BrainCircuit },
  { id: "crm", label: "CRM & Clientes", icon: Users },
  { id: "leads", label: "Caçador de Leads", icon: Target },
  { id: "projects", label: "Projetos", icon: Boxes },
  { id: "sales", label: "Central Comercial", icon: BriefcaseBusiness },
  { id: "finance", label: "Financeiro", icon: CircleDollarSign },
  { id: "founder-finance", label: "Finanças do fundador", icon: CircleDollarSign },
  { id: "tasks", label: "Produtividade", icon: ListTodo },
  { id: "memory", label: "Memória", icon: ClipboardList },
  { id: "radar", label: "Radar de oportunidades", icon: Radio },
  { id: "founder", label: "Memória do fundador", icon: BrainCircuit },
  { id: "evolution", label: "Evolução do cérebro", icon: Activity },
];
const agents = [
  {
    name: "ZEIK DIRECTOR",
    desc: "Estratégia e crescimento",
    icon: Sparkles,
    id: "dashboard",
    color: "#ad92ff",
  },
  {
    name: "ZEIK HUNTER",
    desc: "Prospecção de oportunidades",
    icon: Target,
    id: "leads",
    color: "#5da8ff",
  },
  {
    name: "ZEIK SALES",
    desc: "Inteligência comercial",
    icon: BriefcaseBusiness,
    id: "sales",
    color: "#b58afa",
  },
  {
    name: "ZEIK BUILDER",
    desc: "Criação e desenvolvimento",
    icon: Boxes,
    id: "projects",
    color: "#6caaff",
  },
  {
    name: "ZEIK SOCIAL",
    desc: "Marketing e conteúdo",
    icon: MessageSquareText,
    id: "sales",
    color: "#f17cb6",
  },
  {
    name: "ZEIK FINANCE",
    desc: "Gestão financeira",
    icon: CircleDollarSign,
    id: "finance",
    color: "#69dcc5",
  },
  {
    name: "FINANÇAS DO FUNDADOR",
    desc: "Planejamento pessoal privado",
    icon: CircleDollarSign,
    id: "founder-finance",
    color: "#bc92ff",
  },
  {
    name: "ZEIK MEMORY",
    desc: "Memória empresarial",
    icon: ClipboardList,
    id: "memory",
    color: "#ffc57b",
  },
];
const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const today = () => new Date().toISOString().slice(0, 10);
const titles: Record<string, string> = {
  crm: "CRM & Clientes",
  leads: "Caçador de Leads",
  projects: "Projetos",
  finance: "Financeiro",
  "founder-finance": "Finanças do Fundador",
  tasks: "Produtividade",
  memory: "Memória da Zeik",
  sales: "Central Comercial",
  radar: "Radar de oportunidades",
  founder: "Quem sou eu — memória do fundador",
  evolution: "Evolução do cérebro",
};
const singular: Record<string, string> = {
  crm: "cliente",
  leads: "lead",
  projects: "projeto",
  finance: "lançamento",
  tasks: "tarefa",
  memory: "memória",
};
const defaults: Record<string, string[]> = {
  crm: [
    "Lead",
    "Novo",
    "Pesquisado",
    "Contato feito",
    "Proposta",
    "Qualificado",
    "Negociação",
    "Cliente",
  ],
  leads: [
    "Novo",
    "Pesquisado",
    "Contato feito",
    "Proposta",
    "Qualificado",
    "Negociação",
    "Cliente",
  ],
  projects: ["Planejamento", "Em andamento", "Revisão", "Concluído"],
  finance: ["Receita", "Despesa", "Mensalidade", "Pendente", "Recebido"],
  tasks: ["A fazer", "Em andamento", "Concluído"],
  memory: ["Agência", "Cliente", "Estratégia", "Processo"],
};
function App() {
  const [loadResult] = useState(() => {
    try {
      return {
        data: installRequestedClients(localRepository.load()),
        error: false,
      };
    } catch {
      return { data: { items: [], history: [] } as Store, error: true };
    }
  });
  const [store, setStore] = useState<Store>(loadResult.data);
  const [storageError, setStorageError] = useState(loadResult.error);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [pendingTask, setPendingTask] = useState<string | null>(null);
  const [financeMonth, setFinanceMonth] = useState(today().slice(0, 7));
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [edit, setEdit] = useState<Item | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [view, setView] = useState<"3d" | "2d">(() =>
    supportsWebGL() ? "3d" : "2d",
  );
  const [quality, setQuality] = useState("high");
  const [agent, setAgent] = useState(0);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    [],
  );
  const [toast, setToast] = useState("");
  const [template, setTemplate] = useState("");
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (storageError) return;
    try {
      localRepository.save(store);
    } catch {
      setToast("Não foi possível salvar os dados neste navegador.");
    }
  }, [store, storageError]);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
      if (e.key === "Escape") {
        setModal(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  const items = store.items;
  const founder = getFounder(store);
  const name = founderName(founder);
  const clients = items.filter(
    (x) =>
      x.type === "crm" &&
      x.status === "Cliente" &&
      x.clientStatus !== "inativo",
  );
  const leads = items.filter(
    (x) => (x.type === "leads" || x.type === "crm") && x.status !== "Cliente",
  );
  const projects = items.filter(
    (x) => x.type === "projects" && x.status !== "Concluído",
  );
  const tasks = items.filter(
    (x) => x.type === "tasks" && x.status !== "Concluído",
  );
  const finance = items.filter((x) => x.type === "finance");
  const totals = financeSummary(items, financeMonth);
  const mrr = totals.mrr,
    income = totals.received,
    expenses = totals.paid;
  const pending = finance.filter((x) => {
    const f = financeInfo(x);
    return f.kind === "receita" && f.state === "previsto";
  });
  const staleClients = clients.filter((x) => {
    const dates = (x.contacts || []).map((c) => c.date).sort();
    const latest = dates[dates.length - 1];
    return (
      !latest ||
      latest < new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10)
    );
  });
  const save = (it: Item) => {
    if (storageError) { setToast("Restaure os dados locais antes de salvar."); return; }
    const saved = it.type === "leads" && it.status === "Cliente" ? { ...it, type: "crm" } : it;
    const nextStore = {
      ...store,
      items: edit ? store.items.map((x) => x.id === saved.id ? saved : x) : [saved, ...store.items],
      history: [`${new Date().toLocaleString("pt-BR")} · ${edit ? "Editado" : "Criado"}: ${it.name}`, ...store.history].slice(0, 100),
    };
    try {
      validateStore(nextStore);
      localRepository.save(nextStore);
    } catch {
      setToast("Não foi possível salvar. Confira o espaço disponível no navegador; o formulário continua aberto.");
      return;
    }
    setStore(nextStore);
    setModal(null);
    setEdit(null);
    setToast("Salvo neste dispositivo");
  };
  const updateRecord = (it: Item, reason: string) => {
    setStore((s) => ({
      ...s,
      items: s.items.map((x) =>
        x.id === it.id
          ? {
              ...it,
              changes:
                it.type === "projects"
                  ? [
                      `${new Date().toLocaleString("pt-BR")} · ${reason}`,
                      ...(it.changes || []),
                    ].slice(0, 100)
                  : it.changes,
            }
          : x,
      ),
      history: [
        `${new Date().toLocaleString("pt-BR")} · ${reason}: ${it.name}`,
        ...s.history,
      ].slice(0, 100),
    }));
    setToast("Alteração salva localmente");
  };
  const addProspect = (p: Prospect) => {
    if (storageError) {
      setToast("Restaure os dados locais antes de adicionar leads.");
      return;
    }
    if (
      items.some(
        (i) =>
          i.id === researchId(p.id) ||
          (["leads", "crm"].includes(i.type) &&
            cleanName(i.name) === cleanName(p.name)),
      )
    ) {
      setToast("Este negócio já consta no CRM. Confira antes de duplicar.");
      return;
    }
    const lead: Item = {
      id: researchId(p.id),
      name: p.name,
      type: "leads",
      status: "Novo",
      segment: p.segment,
      city: `São Paulo · ${p.neighborhood}`,
      value: 0,
      probability: 0,
      date: "",
      updated: today(),
      next: "Confirmar atividade, canais digitais, contato e interesse.",
      notes: `Pesquisa pontual em ${researchedAt.split("-").reverse().join("/")}. Fonte: ${p.source}\nEndereço: ${p.address}. WhatsApp informado: ${p.phone}.\nFato: ${p.fact}\nHipótese a validar: ${p.idea}\n${p.website ? `Presença encontrada: ${p.website} (${p.websiteLabel}). ` : ""}Verificação de site e Perfil da Empresa no Google não é abrangente. O valor e a probabilidade não foram estimados.`,
    };
    setStore((s) => ({
      ...s,
      items: [lead, ...s.items],
      history: [
        `${new Date().toLocaleString("pt-BR")} · Lead adicionado da pesquisa: ${p.name}`,
        ...s.history,
      ].slice(0, 100),
    }));
    setToast("Lead adicionado para qualificação no CRM");
  };
  const createProject = (client: Item) => {
    if (!confirm(`Criar projeto para ${client.name}?`)) return;
    const project: Item = {
      id: crypto.randomUUID(),
      type: "projects",
      name: `Site — ${client.name}`,
      status: "Planejamento",
      segment: client.segment,
      value: 0,
      date: "",
      notes: "",
      next: "",
      city: "",
      probability: 0,
      updated: today(),
      clientId: client.id,
      checklist: [],
      changes: [`${new Date().toLocaleString("pt-BR")} · Projeto criado`],
    };
    setStore((s) => ({
      ...s,
      items: [project, ...s.items],
      history: [
        `${new Date().toLocaleString("pt-BR")} · Projeto criado: ${project.name}`,
        ...s.history,
      ],
    }));
    setPage("projects");
    setDetailId(project.id);
  };
  const remove = (id: string) => {
    if (
      !confirm(
        "Excluir este registro? Projetos e lançamentos vinculados permanecerão, mas sem cliente. Mensalidades não serão encerradas automaticamente.",
      )
    )
      return;
    setStore((s) => ({
      ...s,
      items: s.items
        .filter((x) => x.id !== id)
        .map((x) => (x.clientId === id ? { ...x, clientId: "" } : x)),
      history: [
        `${new Date().toLocaleString("pt-BR")} · Registro excluído`,
        ...s.history,
      ],
    }));
    setToast("Registro excluído");
    return true;
  };
  const navigate = (id: string) => {
    setPage(id);
    setQuery("");
    setFilter("Todos");
    setMobile(false);
  };
  const answer = (text: string) => {
    const q = text.toLowerCase();
    let r =
      "Ainda não tenho uma ferramenta local para esse pedido. Experimente perguntar sobre prioridades, projetos, leads ou receita recorrente. A integração com IA está pendente.";
    setPendingTask(null);
    const taskMatch = text.match(/^criar tarefa:\s*(.+)$/i);
    if (taskMatch) {
      setPendingTask(taskMatch[1].trim());
      r = `Prévia: criar a tarefa “${taskMatch[1].trim()}”. Confirme abaixo para salvar.`;
    } else if (/finanças pessoais|financas pessoais|finanças do fundador|financas do fundador|contas pessoais/.test(q)) {
      try {
        const data = loadFounderFinance();
        const monthMatch = text.match(/\b(20\d{2})-(0[1-9]|1[0-2])\b/);
        const month = monthMatch ? monthMatch[0] : today().slice(0, 7);
        const c = calculateFounderFinance(data, items, month);
        r = `Consulta local ${month}: salário líquido previsto ${money(data.salaryNet)}, renda extra ${money(c.extra)}, contas ${money(c.bills)} (pendentes ${money(c.pending)}), saldo previsto pessoal ${money(c.forecast)}. Saldo efetivo ${data.cash === null ? "não informado" : money(data.cash)}. Receita Zeik prevista ${money(c.agencyForecast)} não é dinheiro pessoal. Prioridade: confira vencimentos e recebimentos antes de comprometer o saldo. Valores não cadastrados não entram no cálculo.`;
      } catch { r = "Não foi possível ler as finanças privadas. Verifique ou restaure o backup no módulo."; }
    } else if (
      q.includes("quem sou") ||
      q.includes("o que você sabe") ||
      q.includes("o que voce sabe")
    ) {
      const known = contextMemories(founder);
      r = known.length
        ? `Memórias autorizadas para uso: ${known.map((m) => m.content).join(" | ")}. Consulte ou corrija em Memória do fundador.`
        : "Ainda não há memórias autorizadas para uso. Revise suas informações em Memória do fundador.";
    } else if (q.includes("ideia") || q.includes("idéia")) {
      r = ideaReview(projects.map((x) => x.name));
    } else if (q.includes("sem ação") || q.includes("sem acao"))
      r = `${leads.filter((x) => !x.next).length} oportunidade(s) sem próxima ação: ${
        leads
          .filter((x) => !x.next)
          .map((x) => x.name)
          .join(", ") || "nenhuma"
      }.`;
    else if (q.includes("receita") || q.includes("mrr"))
      r = `A receita recorrente cadastrada é ${money(mrr)} por mês, calculada a partir dos lançamentos classificados como Mensalidade.`;
    else if (q.includes("projeto"))
      r = projects.length
        ? `Há ${projects.length} projeto(s) em aberto: ${projects.map((x) => x.name).join(", ")}. Confira prazos e próximas ações em Projetos.`
        : "Não há projetos em aberto cadastrados.";
    else if (
      q.includes("prioridade") ||
      q.includes("hoje") ||
      q.includes("tarefa")
    )
      r = tasks.length
        ? `Você tem ${tasks.length} tarefa(s) em aberto: ${tasks
            .slice(0, 5)
            .map((x) => x.name)
            .join(", ")}.`
        : "Não há tarefas em aberto cadastradas. Adicione uma em Produtividade.";
    else if (
      q.includes("lead") ||
      q.includes("oportunidade") ||
      q.includes("cliente")
    )
      r = `Há ${leads.length} oportunidade(s) e ${clients.length} cliente(s) cadastrados. ${leads.filter((x) => !x.next).length} oportunidade(s) estão sem próxima ação.`;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      {
        role: "core",
        text:
          founder.mode === "fundador" && name
            ? `${name}, ${r.charAt(0).toLocaleLowerCase("pt-BR")}${r.slice(1)}`
            : r,
      },
    ]);
    setCommand("");
  };
  const exportData = () => {
    if (
      store.founder?.memories.some((m) => m.privacy === "Sensível") &&
      !confirm(
        "O arquivo conterá memórias sensíveis em texto sem criptografia. Continuar?",
      )
    )
      return;
    const blob = new Blob([JSON.stringify({ version: 3, ...store }, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "zeik-brain-dados.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const f = e.target.files?.[0];
      if (!f) return;
      if (f.size > 10 * 1024 * 1024) throw Error("Arquivo excede 10 MB");
      const raw = JSON.parse(await f.text());
      if (raw.version !== undefined && ![1, 2, 3].includes(raw.version))
        throw Error("Versão não suportada");
      const founderOnly = raw.kind === "founder-only";
      const d = validateStore(
        founderOnly ? { items: [], history: [], founder: raw.founder } : raw,
      );
      if (founderOnly && !d.founder) throw Error("Memórias ausentes");
      if (founderOnly && storageError)
        throw Error(
          "Importe um backup completo para restaurar os dados existentes.",
        );
      if (
        confirm(
          founderOnly
            ? "A importação substituirá somente as memórias do fundador. Os demais dados serão preservados. Continuar?"
            : "A importação substituirá os dados locais atuais. Continuar?",
        )
      ) {
        if (
          d.founder?.memories.some((m) => m.privacy === "Sensível") &&
          !confirm(
            "Este arquivo contém memórias sensíveis. Autoriza especificamente armazená-las neste navegador sem criptografia?",
          )
        ) {
          e.target.value = "";
          return;
        }
        setStore(founderOnly ? { ...store, founder: d.founder } : d);
        setStorageError(false);
        setToast("Dados importados");
      }
    } catch {
      setToast("Arquivo inválido. Importe um JSON exportado pelo Zeik Brain.");
    }
    e.target.value = "";
  };
  const filtered = items.filter(
    (x) =>
      x.type === page &&
      (filter === "Todos" ||
        (page === "finance"
          ? financeInfo(x).kind === filter
          : x.status === filter)) &&
      `${x.name} ${x.segment} ${x.notes} ${x.city}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const actionItems = [
    ...pending.slice(0, 3),
    ...tasks.slice(0, 2),
    ...projects
      .filter(
        (x) =>
          x.date &&
          x.date <= new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
      )
      .slice(0, 2),
    ...leads.filter((x) => !x.next).slice(0, 2),
  ];
  const chart = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 5 + i);
    const key = d.toISOString().slice(0, 7);
    return {
      name: d.toLocaleDateString("pt-BR", { month: "short" }),
      value: finance
        .filter(
          (x) =>
            x.date?.startsWith(key) &&
            financeInfo(x).kind === "receita" &&
            financeInfo(x).state === "recebido",
        )
        .reduce((a, x) => a + x.value, 0),
    };
  });
  return (
    <div className={"app " + (collapsed ? "collapsed" : "")}>
      {mobile && (
        <button
          className="sidebar-scrim"
          aria-label="Fechar menu"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        id="main-navigation"
        className={"sidebar " + (mobile ? "mobile-open" : "")}
      >
        <div className="brand">
          <div className="brand-mark">
            <BrainCircuit size={23} />
          </div>
          <div className="brand-copy">
            <strong>
              ZEIK <span>BRAIN</span>
            </strong>
            <small>INTELIGÊNCIA DIGITAL</small>
          </div>
          <button
            className="icon-button side-close"
            onClick={() => setMobile(false)}
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>
        <div className="side-label">WORKSPACE</div>
        <nav>
          {modules.map((m, i) => (
            <React.Fragment key={m.id}>
              {i === 2 && (
                <div className="side-label section-label">OPERAÇÃO</div>
              )}
              {i === 7 && (
                <div className="side-label section-label">INTELIGÊNCIA</div>
              )}
              <button
                title={m.label}
                className={"nav-item " + (page === m.id ? "active" : "")}
                onClick={() => navigate(m.id)}
              >
                <m.icon size={18} />
                <span>{m.label}</span>
                {m.id === "core" && <span className="nav-dot" />}
              </button>
            </React.Fragment>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-card">
            <span className="system-orb">
              <Activity size={16} />
            </span>
            <div>
              <strong>Sistema operacional</strong>
              <small>
                <i /> Dados locais ativos
              </small>
            </div>
          </div>
          <button className="collapse" onClick={() => setCollapsed(!collapsed)}>
            <ChevronLeft size={16} />
            <span>Recolher menu</span>
          </button>
        </div>
      </aside>
      <div className="main-wrap">
        <header>
          <button
            className="icon-button hamburger"
            onClick={() => setMobile(true)}
            aria-label="Abrir menu"
            aria-controls="main-navigation"
            aria-expanded={mobile}
          >
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            Workspace <ChevronRight size={14} />{" "}
            <strong>
              {page === "dashboard"
                ? "Visão geral"
                : page === "core"
                  ? "Zeik Core"
                  : titles[page]}
            </strong>
          </div>
          <div className="header-right">
            <div className="search-box">
              <Search size={16} />
              <input
                id="global-search"
                placeholder="Buscar nesta seção..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>
            <button
              className="icon-button"
              title="Dados locais"
              onClick={() => setModal("settings")}
            >
              <Settings2 size={18} />
            </button>
            <button
              className="icon-button notification"
              title="Ver prioridades"
              onClick={() => navigate("tasks")}
            >
              <Bell size={18} />
              <i />
            </button>
            <div className="avatar">Z</div>
            <div className="profile">
              <strong>Zeik Digital</strong>
              <small>Workspace local</small>
            </div>
            <ChevronDown size={14} />
          </div>
        </header>
        <main>
          {storageError && (
            <div className="storage-warning" role="alert">
              Os dados existentes não puderam ser lidos. Eles não serão
              sobrescritos. Importe um backup válido em Configurações ou
              recupere os dados do navegador.
            </div>
          )}
          {store.clientSetup?.conflicts.length ? (
            <div className="storage-warning" role="alert">
              Possível cadastro ou lançamento já existente para{" "}
              {store.clientSetup.conflicts.join(", ")}. Para evitar duplicações,
              nenhum dado desses clientes foi incluído automaticamente. Confira
              o CRM e o financeiro antes de cadastrar.
            </div>
          ) : null}
          {page === "dashboard" || page === "core" ? (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="sparkle">✦</span> SEU CENTRO DE COMANDO
                  </div>
                  <h1>
                    {page === "core" ? (
                      "Zeik Core"
                    ) : (
                      <>
                        {name
                          ? `Olá, ${name}. Bem-vindo à `
                          : "Olá, bem-vindo à "}
                        <span>Zeik Brain.</span>
                      </>
                    )}
                  </h1>
                  <p>
                    {page === "core"
                      ? "Sua central de inteligência e ferramentas locais."
                      : "Sua agência mais inteligente, organizada e pronta para crescer."}
                  </p>
                </div>
                <div className="heading-actions">
                  <button
                    className="button secondary"
                    onClick={() => navigate("tasks")}
                  >
                    <CalendarDays size={16} /> Hoje na Zeik
                  </button>
                  <button
                    className="button primary"
                    onClick={() => {
                      setEdit(null);
                      setModal("leads");
                    }}
                  >
                    <Plus size={17} /> Novo lead
                  </button>
                </div>
              </div>
              <div className="hero-grid">
                <section className="hero panel">
                  <div className="hero-top">
                    <div>
                      <div className="live-label">
                        <i /> ZEIK CORE <span> / </span> CENTRAL DE INTELIGÊNCIA
                      </div>
                      <h2>
                        Inteligência que
                        <br />
                        <em>move suas ideias.</em>
                      </h2>
                      <p>
                        Seu cérebro digital, conectado ao que
                        <br className="desktop-only" /> importa para o
                        crescimento da agência.
                      </p>
                    </div>
                    <div className="hero-controls">
                      <button
                        className={view === "3d" ? "selected" : ""}
                        onClick={() => setView("3d")}
                      >
                        3D
                      </button>
                      <button
                        className={view === "2d" ? "selected" : ""}
                        onClick={() => setView("2d")}
                      >
                        Painel
                      </button>
                    </div>
                  </div>
                  <div className="brain-area">
                    {view === "3d" ? (
                      <BrainBoundary>
                        <Suspense
                          fallback={
                            <div className="brain-fallback">
                              Carregando cérebro 3D...
                            </div>
                          }
                        >
                          <Brain
                            quality={quality}
                            selected={agent}
                            onSelect={(i) => { setAgent(i); if (agents[i].id === "founder-finance") navigate("founder-finance"); }}
                          />
                        </Suspense>
                      </BrainBoundary>
                    ) : (
                      <div className="brain-fallback">
                        <BrainCircuit size={110} />
                        <span>Visualização simplificada</span>
                      </div>
                    )}
                    <div className="brain-glow" />
                    <div className="orbit orbit-one" />
                    <div className="orbit orbit-two" />
                    <div className="brain-caption">
                      <span className="caption-line" />{" "}
                      {view === "3d"
                        ? "ARRASTE PARA GIRAR · PINÇA OU SCROLL PARA ZOOM"
                        : "VISUALIZAÇÃO 2D"}
                    </div>
                    <div className="quality">
                      <select
                        aria-label="Qualidade gráfica"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                      >
                        <option value="high">Qualidade alta</option>
                        <option value="low">Qualidade baixa</option>
                      </select>
                    </div>
                  </div>
                  <div className="agent-selection">
                    <strong>{agents[agent].name}</strong>
                    <span>
                      {agents[agent].desc} · módulo local, IA pendente
                    </span>
                    <div
                      className="agent-selectors"
                      aria-label="Selecionar agente"
                    >
                      {agents.map((a, i) => (
                        <button
                          aria-label={`Selecionar ${a.name}`}
                          aria-pressed={i === agent}
                          title={a.name}
                          key={a.name}
                          className={i === agent ? "chosen" : ""}
                          onClick={() => { setAgent(i); if (a.id === "founder-finance") navigate("founder-finance"); }}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      className="agent-open"
                      onClick={() => navigate(agents[agent].id)}
                    >
                      Abrir módulo <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="hero-bottom">
                    <div className="core-status">
                      <span className="pulse-icon">
                        <Activity size={18} />
                      </span>
                      <div>
                        <strong>Zeik Core</strong>
                        <small>
                          <i /> Ferramentas locais disponíveis
                        </small>
                      </div>
                    </div>
                    <button
                      className="text-link"
                      onClick={() => navigate("core")}
                    >
                      Explorar o Core <ArrowRight size={16} />
                    </button>
                  </div>
                </section>
                <section className="assistant panel">
                  <div className="panel-title">
                    <div className="assistant-icon">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h3>
                        Zeik Core <span className="tag">BETA</span>
                      </h3>
                      <p>Seu assistente executivo</p>
                    </div>
                    <MoreHorizontal className="more" size={20} />
                  </div>
                  <div className="mode-switch" aria-label="Modo de comunicação">
                    <button
                      aria-pressed={founder.mode === "fundador"}
                      className={founder.mode === "fundador" ? "active" : ""}
                      onClick={() =>
                        setStore((s) => ({
                          ...s,
                          founder: { ...getFounder(s), mode: "fundador" },
                        }))
                      }
                    >
                      Modo fundador
                    </button>
                    <button
                      aria-pressed={founder.mode === "profissional"}
                      className={
                        founder.mode === "profissional" ? "active" : ""
                      }
                      onClick={() =>
                        setStore((s) => ({
                          ...s,
                          founder: { ...getFounder(s), mode: "profissional" },
                        }))
                      }
                    >
                      Modo profissional
                    </button>
                  </div>
                  <div className="assistant-body">
                    <div className="assistant-greeting">
                      <span>✦</span>
                      <div>
                        <strong>
                          {founder.mode === "fundador" && name
                            ? `Como posso ajudar, ${name}?`
                            : "Como posso ajudar você hoje?"}
                        </strong>
                        <p>
                          Consulte seus dados e organize o trabalho com comandos
                          locais.
                        </p>
                      </div>
                    </div>
                    <div className="prompt-list">
                      {[
                        "Organize minhas prioridades de hoje",
                        "Mostre os projetos que precisam de atenção",
                        "Quanto tenho de receita recorrente?",
                      ].map((x) => (
                        <button key={x} onClick={() => answer(x)}>
                          <Sparkles size={14} />
                          <span>{x}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      ))}
                    </div>
                    <div className="messages">
                      {messages.slice(-4).map((m, i) => (
                        <div className={"message " + m.role} key={i}>
                          <b>{m.role === "core" ? "ZEIK CORE" : "VOCÊ"}</b>
                          <p>{m.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {pendingTask && (
                    <div className="core-confirm">
                      <span>Criar: {pendingTask}</span>
                      <button
                        className="button primary"
                        onClick={() => {
                          const task: Item = {
                            id: crypto.randomUUID(),
                            type: "tasks",
                            name: pendingTask,
                            status: "A fazer",
                            segment: "",
                            value: 0,
                            date: "",
                            notes: "",
                            next: "",
                            city: "",
                            probability: 0,
                            updated: today(),
                          };
                          setStore((s) => ({
                            ...s,
                            items: [task, ...s.items],
                            history: [
                              `${new Date().toLocaleString("pt-BR")} · Tarefa criada pelo Core: ${task.name}`,
                              ...s.history,
                            ],
                          }));
                          setMessages((m) => [
                            ...m,
                            { role: "core", text: "Tarefa salva localmente." },
                          ]);
                          setPendingTask(null);
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        className="button secondary"
                        onClick={() => setPendingTask(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                  <form
                    className="command-input"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (command.trim()) answer(command);
                    }}
                  >
                    <input
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="Pergunte ao Zeik Core..."
                    />
                    <button aria-label="Enviar comando">
                      <Send size={16} />
                    </button>
                  </form>
                  <div className="assistant-note">
                    ✧ Comando: “criar tarefa: nome” · IA externa não conectada
                  </div>
                </section>
              </div>
              <div className="section-heading">
                <div>
                  <h2>
                    Visão geral <span>da agência</span>
                  </h2>
                  <p>Seus números e atividades em um só lugar.</p>
                </div>
                <button
                  className="subtle-button"
                  onClick={() => navigate("finance")}
                >
                  Ver financeiro <ArrowRight size={15} />
                </button>
              </div>
              <div className="metrics">
                <Metric
                  icon={Users}
                  label="Clientes ativos"
                  value={String(clients.length)}
                  note="Clientes cadastrados"
                  color="purple"
                  onClick={() => navigate("crm")}
                />
                <Metric
                  icon={Target}
                  label="Leads em aberto"
                  value={String(leads.length)}
                  note="Oportunidades no funil"
                  color="blue"
                  onClick={() => navigate("leads")}
                />
                <Metric
                  icon={Boxes}
                  label="Projetos ativos"
                  value={String(projects.length)}
                  note="Projetos em andamento"
                  color="violet"
                  onClick={() => navigate("projects")}
                />
                <Metric
                  icon={CircleDollarSign}
                  label="Receita recorrente"
                  value={money(mrr)}
                  note="Mensalidades cadastradas"
                  color="green"
                  onClick={() => navigate("finance")}
                />
              </div>
              <div className="bottom-grid">
                <section className="panel chart-card">
                  <div className="card-heading">
                    <div>
                      <h3>Desempenho financeiro</h3>
                      <p>Receitas recebidas nos últimos 6 meses</p>
                    </div>
                    <span className="period">
                      Últimos 6 meses <ChevronDown size={14} />
                    </span>
                  </div>
                  <div className="chart-value">
                    {money(income)} <small>recebido no mês de referência</small>
                  </div>
                  <div className="chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chart}>
                        <defs>
                          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="#826aff"
                              stopOpacity={0.32}
                            />
                            <stop
                              offset="100%"
                              stopColor="#826aff"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Tooltip
                          contentStyle={{
                            background: "#171a29",
                            border: "1px solid #35384d",
                            borderRadius: 8,
                          }}
                          formatter={(v: number) => money(v)}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#9d89ff"
                          strokeWidth={2}
                          fill="url(#fill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="chart-labels">
                    {chart.map((x, i) => (
                      <span key={i}>{x.name}</span>
                    ))}
                  </div>
                </section>
                <section className="panel today-card">
                  <div className="card-heading">
                    <div>
                      <h3>Hoje na Zeik</h3>
                      <p>O que precisa da sua atenção</p>
                    </div>
                    <button
                      className="icon-button"
                      onClick={() => navigate("tasks")}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                  {actionItems.length ? (
                    actionItems.slice(0, 3).map((x) => (
                      <button
                        className="today-row"
                        key={x.id}
                        onClick={() => navigate(x.type)}
                      >
                        <span className="today-icon">
                          <CheckCircle2 size={16} />
                        </span>
                        <div>
                          <strong>{x.name}</strong>
                          <small>
                            {x.type === "finance"
                              ? `Cobrança pendente · ${money(x.value)}`
                              : x.next || x.status}
                            {x.date
                              ? " · " +
                                (x.date.length === 7
                                  ? `${x.date.slice(5)}/${x.date.slice(0, 4)} (dia não informado)`
                                  : x.date)
                              : ""}
                          </small>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                    ))
                  ) : (
                    <div className="empty-today">
                      <CheckCircle2 size={21} />
                      <span>
                        Tudo em dia por aqui.
                        <small>
                          Adicione tarefas, leads e projetos para começar.
                        </small>
                      </span>
                    </div>
                  )}
                </section>
              </div>
              <div className="section-heading agents-heading">
                <div>
                  <h2>
                    Conheça seus <span>agentes</span>
                  </h2>
                  <p>Especialistas preparados para cada área da sua agência.</p>
                </div>
                <span className="muted-label">
                  MÓDULOS LOCAIS · IA PENDENTE
                </span>
              </div>
              <div className="agents-grid">
                {agents.map((a, i) => (
                  <button
                    className={
                      "agent-card panel " +
                      (agent === i ? "agent-selected" : "")
                    }
                    key={a.name}
                    onClick={() => {
                      setAgent(i);
                      navigate(a.id);
                    }}
                  >
                    <div
                      className="agent-icon"
                      style={{ color: a.color, background: a.color + "19" }}
                    >
                      <a.icon size={19} />
                    </div>
                    <div>
                      <strong>{a.name}</strong>
                      <small>{a.desc}</small>
                    </div>
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="page-heading module-heading">
                <div>
                  <div className="eyebrow">
                    <span className="sparkle">✦</span> WORKSPACE ZEIK
                  </div>
                  <h1>{titles[page]}</h1>
                  <p>
                    {page === "radar"
                      ? "Recomendações explicáveis a partir dos dados locais."
                      : page === "sales"
                        ? "Ferramentas práticas para sua operação comercial."
                        : "Organize suas informações em um só lugar, neste dispositivo."}
                  </p>
                </div>
                {singular[page] && (
                  <button
                    className="button primary"
                    onClick={() => {
                      setEdit(null);
                      setModal(page);
                    }}
                  >
                    <Plus size={17} /> Novo {singular[page]}
                  </button>
                )}
              </div>
              {page === "leads" && (
                <ProspectList
                  items={items}
                  query={query}
                  onAdd={addProspect}
                  onQueryChange={setQuery}
                />
              )}
              {page === "founder-finance" ? (
                <FounderFinance items={items} />
              ) : page === "founder" ? (
                <FounderMemoryPage
                  data={founder}
                  query={query}
                  onQueryChange={setQuery}
                  onChange={(f) => {
                    setStore((s) => ({ ...s, founder: f }));
                    setToast("Memória atualizada neste dispositivo");
                  }}
                />
              ) : page === "evolution" ? (
                <FounderEvolution
                  data={founder}
                  items={items}
                  onNavigate={navigate}
                />
              ) : page === "radar" ? (
                <div className="radar-list panel">
                  <h3>Oportunidades identificadas</h3>
                  {[
                    ...staleClients.map((x) => ({
                      x,
                      why: (x.contacts || []).length
                        ? `Último contato registrado há mais de 30 dias. Revise o relacionamento.`
                        : "Nenhum contato registrado. Considere iniciar um acompanhamento.",
                    })),
                    ...leads
                      .filter((x) => !x.next)
                      .map((x) => ({
                        x,
                        why: "Lead sem próxima ação cadastrada. Defina um acompanhamento.",
                      })),
                    ...projects
                      .filter(
                        (x) =>
                          x.date &&
                          x.date <=
                            new Date(Date.now() + 7 * 864e5)
                              .toISOString()
                              .slice(0, 10),
                      )
                      .map((x) => ({
                        x,
                        why: `Projeto em aberto com prazo em ${x.date}. Revise a entrega.`,
                      })),
                    ...pending.map((x) => ({
                      x,
                      why: `Receita prevista de ${money(x.value)} ainda não marcada como recebida${x.date ? ` · referência ${x.date}${x.date.length === 7 ? " (dia não informado)" : ""}` : ""}.`,
                    })),
                  ].map(({ x, why }) => (
                    <button
                      className="radar-row"
                      key={`${x.id}-${why}`}
                      onClick={() =>
                        ["crm", "leads", "projects"].includes(x.type)
                          ? setDetailId(x.id)
                          : navigate(x.type)
                      }
                    >
                      <span className="today-icon">
                        <Zap size={17} />
                      </span>
                      <div>
                        <strong>{x.name}</strong>
                        <p>{why}</p>
                      </div>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                  {!staleClients.length &&
                    !leads.filter((x) => !x.next).length &&
                    !projects.filter(
                      (x) =>
                        x.date &&
                        x.date <=
                          new Date(Date.now() + 7 * 864e5)
                            .toISOString()
                            .slice(0, 10),
                    ).length &&
                    !pending.length && (
                      <div className="empty-state">
                        Nenhuma oportunidade identificada nos dados cadastrados.
                      </div>
                    )}
                </div>
              ) : page === "sales" ? (
                <section className="panel generator">
                  <div className="card-heading">
                    <div>
                      <h3>Gerador comercial</h3>
                      <p>Templates locais editáveis · não utilizam IA</p>
                    </div>
                    <Sparkles size={20} />
                  </div>
                  <label>
                    Nome ou empresa
                    <input
                      id="sales-name"
                      placeholder="Ex.: Barbearia Central"
                    />
                  </label>
                  <label>
                    Segmento
                    <input id="sales-segment" placeholder="Ex.: barbearia" />
                  </label>
                  <div className="generator-buttons">
                    <button
                      className="button secondary"
                      onClick={() => {
                        const n =
                          (
                            document.getElementById(
                              "sales-name",
                            ) as HTMLInputElement
                          ).value || "sua empresa";
                        const s =
                          (
                            document.getElementById(
                              "sales-segment",
                            ) as HTMLInputElement
                          ).value || "seu segmento";
                        setTemplate(
                          `Olá, ${n}! Tudo bem? Sou da Zeik Digital. Trabalhamos com soluções digitais para negócios de ${s} e gostaria de entender seus objetivos. Podemos conversar sobre como fortalecer sua presença online?`,
                        );
                      }}
                    >
                      Gerar abordagem
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => {
                        const n =
                          (
                            document.getElementById(
                              "sales-name",
                            ) as HTMLInputElement
                          ).value || "cliente";
                        setTemplate(
                          `Proposta comercial para ${n}\n\nObjetivo: fortalecer sua presença digital.\n\nEscopo: planejamento, criação e publicação de uma experiência digital responsiva.\n\nInvestimento: [preencher]\nPrazo: [preencher]\nPróximos passos: alinhar necessidades e aprovar escopo.`,
                        );
                      }}
                    >
                      Gerar proposta
                    </button>
                  </div>
                  {template && (
                    <>
                      <textarea
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        rows={9}
                      />
                      <button
                        className="button primary"
                        onClick={() => {
                          navigator.clipboard.writeText(template);
                          setToast("Texto copiado");
                        }}
                      >
                        Copiar texto
                      </button>
                    </>
                  )}
                </section>
              ) : (
                <>
                  {page === "finance" && (
                    <>
                      <div className="board-filters">
                        <label>
                          Mês de referência{" "}
                          <input
                            type="month"
                            value={financeMonth}
                            onChange={(e) => setFinanceMonth(e.target.value)}
                          />
                        </label>
                        <span>
                          Mensalidades ativas representam MRR, não pagamentos
                          recebidos.
                        </span>
                      </div>
                      <div className="metrics finance-metrics">
                        <Metric
                          icon={CircleDollarSign}
                          label="Recebido no mês"
                          value={money(income)}
                          note="Receitas confirmadas"
                          color="green"
                        />
                        <Metric
                          icon={Activity}
                          label="Receita recorrente"
                          value={money(mrr)}
                          note="Mensalidades"
                          color="purple"
                        />
                        <Metric
                          icon={ArrowDownLeft}
                          label="Despesas pagas"
                          value={money(expenses)}
                          note="Pagamentos confirmados"
                          color="blue"
                        />
                        <Metric
                          icon={BarChart3}
                          label="Saldo realizado"
                          value={money(income - expenses)}
                          note="Recebido menos pago"
                          color="violet"
                        />
                      </div>
                      <section className="panel pending-panel">
                        <div>
                          <h3>Cobranças pendentes</h3>
                          <p>
                            Receitas previstas não marcadas como recebidas ·
                            todos os períodos
                          </p>
                        </div>
                        {pending.length ? (
                          pending.map((x) => (
                            <div className="pending-item" key={x.id}>
                              <span>
                                <strong>{x.name}</strong>
                                <small>
                                  {x.date
                                    ? x.date.length === 7
                                      ? `${x.date.slice(5)}/${x.date.slice(0, 4)} · dia não informado`
                                      : x.date
                                    : "Data não informada"}
                                </small>
                              </span>
                              <b>{money(x.value)}</b>
                              <button
                                className="button secondary"
                                onClick={() => {
                                  setEdit(x);
                                  setModal("finance");
                                }}
                              >
                                Editar
                              </button>
                            </div>
                          ))
                        ) : (
                          <p>Nenhuma cobrança pendente cadastrada.</p>
                        )}
                      </section>
                      <div className="finance-forecast">
                        Previsto no mês:{" "}
                        <strong>{money(totals.forecast)}</strong> em receitas ·{" "}
                        <strong>{money(totals.pendingExpenses)}</strong> em
                        despesas. Contratos e mensalidades não são somados aos
                        recebimentos.
                      </div>
                    </>
                  )}
                  {page === "leads" && (
                    <div className="section-heading">
                      <div>
                        <h2>
                          Seus leads <span>salvos</span>
                        </h2>
                        <p>
                          Somente os negócios adicionados ao seu workspace
                          aparecem aqui e no CRM.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="list-toolbar">
                    <div className="filter-wrap">
                      <Search size={16} />
                      <input
                        placeholder={`Buscar em ${titles[page]}...`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    {page !== "crm" && (
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option>Todos</option>
                        {page === "finance" ? (
                          <>
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                            <option value="mensalidade">Mensalidade</option>
                            <option value="contrato">Contrato</option>
                          </>
                        ) : (
                          (defaults[page] || []).map((x) => (
                            <option key={x}>{x}</option>
                          ))
                        )}
                      </select>
                    )}
                  </div>
                  {page === "crm" ? (
                    <CrmBoard
                      items={items}
                      query={query}
                      onChange={updateRecord}
                      onOpen={(x) => setDetailId(x.id)}
                    />
                  ) : (
                    <div className="panel data-list">
                      {filtered.length ? (
                        filtered.map((x) => (
                          <div className="data-row" key={x.id}>
                            <div className="row-icon">
                              {x.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="row-main">
                              <strong>{x.name}</strong>
                              <small>
                                {[x.segment, x.city, x.next]
                                  .filter(Boolean)
                                  .join(" · ") || "Sem detalhes adicionais"}
                              </small>
                            </div>
                            <span className="status-pill">
                              {page === "finance"
                                ? `${financeInfo(x).kind} · ${financeInfo(x).state}`
                                : x.status}
                            </span>
                            {x.value > 0 && (
                              <span className="row-value">
                                {money(x.value)}
                              </span>
                            )}
                            {["leads", "projects"].includes(page) && (
                              <button
                                className="button secondary"
                                onClick={() => setDetailId(x.id)}
                              >
                                Detalhes
                              </button>
                            )}
                            <button
                              className="icon-button"
                              onClick={() => {
                                setEdit(x);
                                setModal(page);
                              }}
                              title="Editar"
                            >
                              <FileText size={16} />
                            </button>
                            <button
                              className="icon-button"
                              onClick={() => remove(x.id)}
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <div className="empty-icon">
                            <Sparkles size={22} />
                          </div>
                          <strong>Nada por aqui ainda</strong>
                          <p>
                            Cadastre seus dados para começar a organizar sua
                            operação.
                          </p>
                          {singular[page] && (
                            <button
                              className="button secondary"
                              onClick={() => {
                                setEdit(null);
                                setModal(page);
                              }}
                            >
                              <Plus size={16} /> Adicionar {singular[page]}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
          <footer>
            <span>
              ZEIK BRAIN <b>1.0</b> <span className="footer-sep">·</span> A
              inteligência por trás do crescimento.
            </span>
            <span>
              <i /> Dados salvos localmente neste dispositivo
            </span>
          </footer>
        </main>
      </div>
      {modal === "settings" && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h2>Dados e configurações</h2>
                <p>Seus dados permanecem neste navegador.</p>
              </div>
              <button className="icon-button" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            <p className="notice">
              A persistência local é temporária: não há sincronização nem backup
              automático. Exporte seus dados regularmente.
            </p>
            <div className="generator-buttons">
              <button className="button secondary" onClick={exportData}>
                <Download size={16} /> Exportar JSON
              </button>
              <button
                className="button secondary"
                onClick={() => file.current?.click()}
              >
                <Upload size={16} /> Importar JSON
              </button>
              <input
                ref={file}
                type="file"
                accept="application/json"
                hidden
                onChange={importData}
              />
            </div>
            <h3>Histórico local</h3>
            <div className="history">
              {store.history.length ? (
                store.history.slice(0, 10).map((x, i) => <p key={i}>{x}</p>)
              ) : (
                <p>Nenhuma alteração registrada.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {detailId && items.find((x) => x.id === detailId) && (
        <RecordDetails
          key={detailId}
          item={items.find((x) => x.id === detailId)!}
          items={items}
          onClose={() => setDetailId(null)}
          onChange={updateRecord}
          onEdit={() => {
            const x = items.find((x) => x.id === detailId)!;
            setDetailId(null);
            setEdit(x);
            setModal(x.type);
          }}
          preferences={siteContext(founder)}
          onCreateProject={createProject}
          onDelete={() => {
            const id = detailId;
            if (id && remove(id)) setDetailId(null);
          }}
        />
      )}
      {modal && singular[modal] && (
        <ItemModal
          type={modal}
          item={edit}
          preferences={siteContext(founder)}
          onClose={() => {
            setModal(null);
            setEdit(null);
          }}
          onSave={save}
        />
      )}
      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Metric({
  icon: Icon,
  label,
  value,
  note,
  color,
  onClick,
}: {
  icon: any;
  label: string;
  value: string;
  note: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button className="metric panel" onClick={onClick}>
      <div className="metric-top">
        <span className={"metric-icon " + color}>
          <Icon size={19} />
        </span>
        <ArrowUpRight size={16} />
      </div>
      <div className="metric-label">{label}</div>
      <strong>{value}</strong>
      <small>{note}</small>
    </button>
  );
}
function ItemModal({
  type,
  item,
  onClose,
  onSave,
  preferences,
}: {
  type: string;
  item: Item | null;
  preferences: string[];
  onClose: () => void;
  onSave: (x: Item) => void;
}) {
  const [form, setForm] = useState<Item>(
    item || {
      id: crypto.randomUUID(),
      type,
      name: "",
      status: defaults[type][0],
      segment: "",
      value: 0,
      date: "",
      notes: "",
      next: "",
      city: "",
      probability: 0,
      updated: today(),
    },
  );
  const set = (key: keyof Item, value: string | number) =>
    setForm({ ...form, [key]: value });
  const [logoError, setLogoError] = useState("");
  const [logoLoading, setLogoLoading] = useState(false);
  const briefing = () =>
    `Crie um site profissional para ${form.name}.\nSegmento: ${form.segment || "[definir]"}.\nObjetivo e briefing: ${form.notes || "[definir]"}.\nReferências e requisitos: ${form.next || "[definir]"}.\n\nDesenvolva um layout moderno e responsivo para desktop, tablet e celular, com acessibilidade, navegação intuitiva, animações leves, SEO técnico, carregamento rápido e testes de qualidade. Prazo: ${form.date || "[definir]"}.${preferences.length ? `\nPreferências autorizadas do fundador: ${preferences.join("; ")}.` : ""}`;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim() || logoLoading) return;
          const f =
            type === "finance"
              ? {
                  ...form,
                  financeKind:
                    form.financeKind ||
                    (financeInfo(form).kind as Item["financeKind"]),
                  financeState:
                    form.financeState ||
                    (financeInfo(form).state as Item["financeState"]),
                }
              : form;
          onSave({
            ...f,
            name: form.name.trim(),
            updated: today(),
            changes:
              type === "projects"
                ? [
                    `${new Date().toLocaleString("pt-BR")} · Dados editados`,
                    ...(form.changes || []),
                  ]
                : form.changes,
          });
        }}
      >
        <div className="modal-head">
          <div>
            <h2>
              {item ? "Editar" : "Novo"} {singular[type]}
            </h2>
            <p>As informações são armazenadas localmente.</p>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="form-grid">
          <label className="wide">
            Nome / título{" "}
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Digite um nome"
            />
          </label>
          {type !== "finance" && (
            <label>
              Status{" "}
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                {defaults[type].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          )}
          {type === "finance" && (
            <>
              <label>
                Tipo financeiro
                <select
                  value={form.financeKind || financeInfo(form).kind}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      financeKind: e.target.value as Item["financeKind"],
                      financeState:
                        e.target.value === "mensalidade" ||
                        e.target.value === "contrato"
                          ? "ativo"
                          : "previsto",
                    })
                  }
                >
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                  <option value="mensalidade">Mensalidade</option>
                  <option value="contrato">Contrato</option>
                </select>
              </label>
              <label>
                Situação
                <select
                  value={form.financeState || financeInfo(form).state}
                  onChange={(e) => set("financeState", e.target.value)}
                >
                  {(form.financeKind || financeInfo(form).kind) ===
                    "mensalidade" ||
                  (form.financeKind || financeInfo(form).kind) ===
                    "contrato" ? (
                    <>
                      <option value="ativo">Ativo</option>
                      <option value="encerrado">Encerrado</option>
                    </>
                  ) : (
                    <>
                      <option value="previsto">Previsto / pendente</option>
                      <option
                        value={
                          (form.financeKind || financeInfo(form).kind) ===
                          "despesa"
                            ? "pago"
                            : "recebido"
                        }
                      >
                        {(form.financeKind || financeInfo(form).kind) ===
                        "despesa"
                          ? "Pago"
                          : "Recebido"}
                      </option>
                    </>
                  )}
                </select>
              </label>
            </>
          )}
          <label>
            {type === "memory" ? "Categoria" : "Segmento / categoria"}{" "}
            <input
              value={form.segment}
              onChange={(e) => set("segment", e.target.value)}
              placeholder="Ex.: comércio"
            />
          </label>
          {type !== "memory" && (
            <>
              <label>
                Valor (R$){" "}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.value}
                  onChange={(e) => set("value", Number(e.target.value))}
                />
              </label>
              <label>
                {form.date.length === 7
                  ? "Mês previsto (dia não informado)"
                  : "Data / prazo"}{" "}
                <input
                  type={form.date.length === 7 ? "month" : "date"}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </label>
            </>
          )}
          {type === "crm" && (
            <>
              <div className="wide client-logo-editor">
                <strong>Logo do cliente</strong>
                <p>A imagem é guardada somente neste navegador e incluída no backup geral. JPG, PNG ou WebP até 12 MB; será reduzida. Transparência será branca.</p>
                {form.logo && <img className="client-logo-preview" src={form.logo} alt="Prévia da logo" />}
                <label>Escolher imagem <input type="file" accept="image/jpeg,image/png,image/webp" disabled={logoLoading} onChange={async (e) => {
                  const input = e.currentTarget; const file = input.files?.[0]; if (!file) return;
                  setLogoLoading(true); setLogoError("");
                  try { const logo = await prepareLogo(file); setForm(f => ({ ...f, logo })); }
                  catch (error) { setLogoError(error instanceof Error ? error.message : "Não foi possível carregar a imagem."); }
                  finally { setLogoLoading(false); input.value = ""; }
                }} /></label>
                {logoLoading && <p>Preparando imagem…</p>}
                {logoError && <p role="alert">{logoError}</p>}
                {form.logo && <button type="button" className="button secondary" onClick={() => setForm(f => { const { logo: _logo, ...rest } = f; return rest; })}>Remover logo</button>}
              </div>
              <label className="wide">História e relacionamento com o cliente
                <textarea rows={5} maxLength={20000} value={form.relationshipHistory || ""} onChange={e => set("relationshipHistory", e.target.value)} placeholder="Como nos conhecemos, projetos realizados, combinados e contexto importante..." />
                <small>Somente informações necessárias; não registre senhas ou dados sensíveis sem autorização.</small>
              </label>
              <label>
                Telefone / WhatsApp
                <input
                  value={form.phone || ""}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="Telefone comercial"
                />
              </label>
              <label>
                Tipo de cliente
                <select
                  value={form.fixedClient ? "fixo" : "outro"}
                  onChange={(e) =>
                    setForm({ ...form, fixedClient: e.target.value === "fixo" })
                  }
                >
                  <option value="outro">Não definido</option>
                  <option value="fixo">Cliente fixo</option>
                </select>
              </label>
              <label>
                Situação do cliente
                <select
                  value={form.clientStatus || "ativo"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      clientStatus: e.target.value as Item["clientStatus"],
                    })
                  }
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </label>
            </>
          )}
          {["leads", "crm"].includes(type) && (
            <>
              <label>
                Cidade / região{" "}
                <input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Cidade, bairro"
                />
              </label>
              <label>
                Probabilidade (%){" "}
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.probability}
                  onChange={(e) => set("probability", Number(e.target.value))}
                />
              </label>
            </>
          )}
          <label className="wide">
            {type === "projects"
              ? "Referências / funcionalidades"
              : "Próxima ação"}{" "}
            <input
              value={form.next}
              onChange={(e) => set("next", e.target.value)}
              placeholder="O que acontece a seguir?"
            />
          </label>
          <label className="wide">
            {type === "projects"
              ? "Objetivo e briefing"
              : "Observações / histórico"}{" "}
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Adicione detalhes importantes..."
            />
          </label>
        </div>
        {type === "projects" && (
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              navigator.clipboard.writeText(briefing());
            }}
          >
            {" "}
            <Sparkles size={15} /> Copiar prompt de briefing
          </button>
        )}
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="button primary" type="submit">
            Salvar {singular[type]}
          </button>
        </div>
      </form>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
