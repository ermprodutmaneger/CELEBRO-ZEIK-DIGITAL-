import { useState } from "react";
import {
  BrainCircuit,
  Check,
  Clock3,
  FileDown,
  Pencil,
  Plus,
  Shield,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  emptyFounder,
  founderCategories,
  hasCredential,
  mayBeSensitive,
  type FounderData,
  type FounderMemory,
  type Item,
} from "../types";
import { pendingSuggestions, suggestions } from "./founder";
type Props = {
  data: FounderData;
  onChange: (f: FounderData) => void;
  query: string;
  onQueryChange: (value: string) => void;
};
const date = () => new Date().toISOString();
const labelDate = (s: string) => new Date(s).toLocaleString("pt-BR");
export function FounderMemoryPage({ data, onChange, query, onQueryChange }: Props) {
  const [draft, setDraft] = useState<FounderMemory | null>(null);
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState("Todas");
  const visible = data.memories.filter(
    (m) =>
      (category === "Todas" || m.category === category) &&
      `${m.content} ${m.category} ${m.source}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const newDraft = (): FounderMemory => ({
    id: crypto.randomUUID(),
    content: "",
    category: "Minha identidade",
    source: "Fundador",
    confirmation: "Confirmado",
    privacy: "Pessoal",
    useInContext: false,
    createdAt: date(),
    updatedAt: date(),
  });
  const openSuggestion = (id: string) => {
    const s = suggestions.find((x) => x.id === id);
    if (!s) return;
    setEditing(false);
    setDraft({
      ...newDraft(),
      content: s.content,
      category: s.category,
      source: s.source,
      confirmation: s.source === "Fundador" ? "Confirmado" : "Não confirmado",
      suggestionId: s.id,
    });
  };
  const save = (m: FounderMemory) => {
    const updated = {
      ...m,
      updatedAt: date(),
      useInContext: m.confirmation === "Confirmado" && m.useInContext,
    };
    onChange({
      ...data,
      memories: editing
        ? data.memories.map((x) => (x.id === m.id ? updated : x))
        : [updated, ...data.memories],
      corrections: editing
        ? [
            { id: crypto.randomUUID(), at: date(), category: m.category },
            ...data.corrections,
          ].slice(0, 200)
        : data.corrections,
    });
    setDraft(null);
  };
  const remove = (m: FounderMemory) => {
    if (
      !confirm(
        "Excluir esta memória? Ela deixará de ser usada na personalização.",
      )
    )
      return;
    onChange({
      ...data,
      memories: data.memories.filter((x) => x.id !== m.id),
      dismissed: m.suggestionId
        ? [...new Set([...data.dismissed, m.suggestionId])]
        : data.dismissed,
    });
  };
  const exportFounder = () => {
    if (
      data.memories.some((m) => m.privacy === "Sensível") &&
      !confirm(
        "O arquivo conterá memórias sensíveis em texto sem criptografia. Continuar?",
      )
    )
      return;
    const a = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { version: 3, kind: "founder-only", founder: data },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    a.href = url;
    a.download = "zeik-memoria-fundador.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="founder-intro panel">
        <div className="founder-intro-icon">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h3>Sua memória, sob seu controle.</h3>
          <p>
            Revise o que o Zeik sabe, escolha o que pode personalizar a
            experiência e corrija ou exclua quando quiser. Nada é aprendido ou
            salvo automaticamente das conversas.
          </p>
        </div>
        <button className="button secondary" onClick={exportFounder}>
          <FileDown size={15} /> Exportar memórias
        </button>
      </div>
      <div className="founder-actions">
        <div className="list-toolbar">
          <input
            className="founder-search"
            aria-label="Buscar memórias"
            placeholder="Buscar memórias..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <select
            aria-label="Filtrar categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todas</option>
            {founderCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span>{visible.length} memória(s)</span>
        </div>
        <button
          className="button primary"
          onClick={() => {
            setEditing(false);
            setDraft(newDraft());
          }}
        >
          <Plus size={16} /> Nova memória
        </button>
      </div>
      <div className="founder-list">
        {visible.length ? (
          visible.map((m) => (
            <article className="panel founder-card" key={m.id}>
              <div className="founder-card-top">
                <span className="status-pill">{m.category}</span>
                <div>
                  <button
                    className="icon-button"
                    aria-label="Editar memória"
                    onClick={() => {
                      setEditing(true);
                      setDraft(m);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label="Excluir memória"
                    onClick={() => remove(m)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p>{m.content}</p>
              <div className="founder-meta">
                <span>{m.source}</span>
                <span>{m.confirmation}</span>
                {m.category === "Minhas metas" && (
                  <span>
                    {m.active === false ? "Meta inativa" : "Meta ativa"}
                  </span>
                )}
                <span>
                  <Shield size={12} /> {m.privacy}
                </span>
                <span>
                  {m.useInContext
                    ? "Personalização autorizada"
                    : "Não usada no contexto"}
                </span>
                <span>Atualizada: {labelDate(m.updatedAt)}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="panel empty-state">
            <Sparkles size={22} />
            <p>
              Nenhuma memória encontrada. Adicione uma ou revise as sugestões
              abaixo.
            </p>
          </div>
        )}
      </div>
      <div className="section-heading">
        <div>
          <h2>
            Sugestões <span>para revisar</span>
          </h2>
          <p>
            Baseadas nas informações fornecidas. Não são memórias salvas até
            você confirmar.
          </p>
        </div>
      </div>
      <div className="suggestions">
        {pendingSuggestions(data).length ? (
          pendingSuggestions(data).map((s) => (
            <div className="suggestion panel" key={s.id}>
              <div>
                <strong>
                  {s.category} · {s.source}
                </strong>
                <p>{s.content}</p>
              </div>
              <div className="suggestion-actions">
                <button
                  className="button secondary"
                  onClick={() => openSuggestion(s.id)}
                >
                  Revisar
                </button>
                <button
                  className="icon-button"
                  aria-label="Descartar sugestão"
                  onClick={() =>
                    onChange({ ...data, dismissed: [...data.dismissed, s.id] })
                  }
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="panel empty-state">Nenhuma sugestão pendente.</div>
        )}
      </div>
      {draft && (
        <MemoryForm
          value={draft}
          editing={editing}
          onClose={() => setDraft(null)}
          onSave={save}
        />
      )}
    </>
  );
}
function MemoryForm({
  value,
  editing,
  onClose,
  onSave,
}: {
  value: FounderMemory;
  editing: boolean;
  onClose: () => void;
  onSave: (m: FounderMemory) => void;
}) {
  const [form, setForm] = useState(value);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const sensitive = mayBeSensitive(form.content) || form.privacy === "Sensível";
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Memória do fundador"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.content.trim()) {
            setError("Escreva a memória.");
            return;
          }
          if (hasCredential(form.content)) {
            setError(
              "Não salve senhas, tokens ou chaves. Remova a credencial antes de continuar.",
            );
            return;
          }
          if (sensitive && !consent) {
            setError(
              "Confirme a autorização específica para armazenar este dado sensível.",
            );
            return;
          }
          onSave({
            ...form,
            content: form.content.trim(),
            privacy: sensitive ? "Sensível" : form.privacy,
            sensitiveConsent: sensitive ? true : undefined,
          });
        }}
      >
        <div className="modal-head">
          <div>
            <h2>{editing ? "Corrigir memória" : "Revisar memória"}</h2>
            <p>Apenas você decide o que será salvo neste dispositivo.</p>
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
            Informação
            <textarea
              required
              rows={4}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Escreva uma informação que queira registrar"
            />
          </label>
          <label>
            Categoria
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as FounderMemory["category"],
                })
              }
            >
              {founderCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Origem
            <select
              value={form.source}
              onChange={(e) =>
                setForm({
                  ...form,
                  source: e.target.value as FounderMemory["source"],
                })
              }
            >
              <option>Fundador</option>
              <option>Padrão observado</option>
              <option>Hipótese</option>
            </select>
          </label>
          <label>
            Grau de confirmação
            <select
              value={form.confirmation}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmation: e.target.value as FounderMemory["confirmation"],
                  useInContext:
                    e.target.value === "Confirmado" && form.useInContext,
                })
              }
            >
              <option>Confirmado</option>
              <option>Não confirmado</option>
            </select>
          </label>
          <label>
            Privacidade
            <select
              value={form.privacy}
              onChange={(e) =>
                setForm({
                  ...form,
                  privacy: e.target.value as FounderMemory["privacy"],
                })
              }
            >
              <option>Pessoal</option>
              <option>Sensível</option>
            </select>
          </label>
        </div>
        {form.category === "Minhas metas" && (
          <label className="check-line">
            <input
              type="checkbox"
              checked={form.active !== false}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />{" "}
            Meta ativa
          </label>
        )}
        <p className="notice">
          Não inclua senhas, tokens, credenciais ou detalhes financeiros
          confidenciais. A detecção é limitada: revise o conteúdo antes de
          salvar. Dados locais não são criptografados.
        </p>
        <label className="check-line">
          <input
            type="checkbox"
            checked={form.useInContext}
            disabled={form.confirmation !== "Confirmado"}
            onChange={(e) =>
              setForm({ ...form, useInContext: e.target.checked })
            }
          />{" "}
          Autorizar o uso desta memória confirmada na personalização local.
        </label>
        {sensitive && (
          <label className="check-line sensitive-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />{" "}
            Autorizo especificamente salvar esta informação sensível neste
            navegador, sem criptografia ou sincronização.
          </label>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="button primary">
            {editing ? "Salvar correção" : "Salvar memória"}
          </button>
        </div>
      </form>
    </div>
  );
}
export function FounderEvolution({
  data,
  items,
  onNavigate,
}: {
  data: FounderData;
  items: Item[];
  onNavigate: (id: string) => void;
}) {
  const confirmed = data.memories.filter(
    (m) => m.confirmation === "Confirmado",
  );
  const goals = data.memories.filter(
    (m) => m.category === "Minhas metas" && m.active !== false,
  );
  const decisions = data.memories.filter(
    (m) => m.category === "Minhas decisões",
  );
  const preferences = data.memories.filter(
    (m) => m.category === "Minhas preferências",
  );
  const knowledge = items.filter((i) => i.type === "memory");
  const pending = pendingSuggestions(data);
  return (
    <>
      <div className="evolution-note panel">
        <BrainCircuit size={25} />
        <div>
          <strong>
            O cérebro muda quando você registra ou corrige informações.
          </strong>
          <p>
            Sem aprendizagem autônoma ou sincronização. Os números abaixo
            refletem somente este dispositivo.
          </p>
        </div>
        <button
          className="button secondary"
          onClick={() => onNavigate("founder")}
        >
          Revisar memórias
        </button>
      </div>
      <div className="evolution-stats">
        <Stat label="Memórias cadastradas" value={data.memories.length} />
        <Stat label="Informações confirmadas" value={confirmed.length} />
        <Stat label="Correções registradas" value={data.corrections.length} />
        <Stat label="Sugestões para revisão" value={pending.length} />
      </div>
      <div className="evolution-grid">
        <Summary
          title="Informações conhecidas"
          icon={<BrainCircuit size={17} />}
          texts={confirmed.map((m) => m.content)}
          empty="Nenhuma memória confirmada."
        />
        <Summary
          title="Preferências cadastradas"
          icon={<Sparkles size={17} />}
          texts={preferences.map((m) => `${m.content} (${m.confirmation})`)}
          empty="Nenhuma preferência cadastrada."
        />
        <Summary
          title="Metas ativas"
          icon={<Check size={17} />}
          texts={goals.map((m) => m.content)}
          empty="Nenhuma meta cadastrada."
        />
        <Summary
          title="Decisões importantes"
          icon={<Clock3 size={17} />}
          texts={decisions.map((m) => m.content)}
          empty="Nenhuma decisão cadastrada."
        />
        <Summary
          title="Conhecimento da empresa"
          icon={<BrainCircuit size={17} />}
          texts={knowledge.map(
            (x) => `${x.name}${x.notes ? " · " + x.notes : ""}`,
          )}
          empty="Nenhuma memória empresarial cadastrada."
        />
        <Summary
          title="Correções realizadas"
          icon={<Pencil size={17} />}
          texts={data.corrections.map(
            (c) => `${c.category} · ${labelDate(c.at)}`,
          )}
          empty="Nenhuma correção realizada."
        />
      </div>
      <div className="section-heading">
        <div>
          <h2>
            Sugestões <span>pendentes</span>
          </h2>
          <p>Revise cada sugestão antes de salvá-la como memória.</p>
        </div>
        <button className="subtle-button" onClick={() => onNavigate("founder")}>
          Revisar sugestões →
        </button>
      </div>
      <div className="panel evolution-pending">
        {pending.length ? (
          pending.map((s) => (
            <p key={s.id}>
              {s.category} · {s.content}
            </p>
          ))
        ) : (
          <p>Nenhuma sugestão pendente.</p>
        )}
      </div>
    </>
  );
}
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="panel evolution-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function Summary({
  title,
  icon,
  texts,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  texts: string[];
  empty: string;
}) {
  return (
    <section className="panel evolution-card">
      <h3>
        {icon} {title}
      </h3>
      {texts.length ? (
        texts.slice(0, 8).map((x, i) => <p key={i}>{x}</p>)
      ) : (
        <p>{empty}</p>
      )}
    </section>
  );
}
export { emptyFounder };
