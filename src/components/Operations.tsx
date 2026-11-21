import { useState } from "react";
import { ArrowRight, FileText, Plus, Trash2, X } from "lucide-react";
import type { Item } from "../types";
import {
  convertLead,
  leadPriority,
  buildBriefing,
  financeInfo,
} from "../services/rules";
const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const date = () => new Date().toISOString().slice(0, 10);
const id = () => crypto.randomUUID();
const stages = ["Novo", "Contato feito", "Proposta", "Negociação", "Cliente"];
export function stage(x: Item) {
  if (x.status === "Cliente") return "Cliente";
  if (x.status === "Negociação" || x.status === "Qualificado")
    return "Negociação";
  if (x.status === "Proposta") return "Proposta";
  if (x.status === "Contato feito" || x.status === "Pesquisado")
    return "Contato feito";
  return "Novo";
}
type Props = {
  items: Item[];
  query: string;
  onChange: (x: Item, reason: string) => void;
  onOpen: (x: Item) => void;
};
export function CrmBoard({ items, query, onChange, onOpen }: Props) {
  const [priority, setPriority] = useState("todos");
  const [next, setNext] = useState("todos");
  const filtered = items
    .filter((x) => ["crm", "leads"].includes(x.type))
    .filter((x) =>
      `${x.name} ${x.segment} ${x.city} ${x.next}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter(
      (x) =>
        priority === "todos" ||
        (priority === "alta" ? x.probability >= 70 : x.probability < 70),
    )
    .filter((x) => next === "todos" || (next === "sem" ? !x.next : !!x.next));
  const fixedClients = filtered.filter(
    (x) => x.status === "Cliente" && x.fixedClient,
  );
  const mrrFor = (x: Item) =>
    items
      .filter(
        (f) =>
          f.type === "finance" &&
          f.clientId === x.id &&
          financeInfo(f).kind === "mensalidade" &&
          financeInfo(f).state === "ativo",
      )
      .reduce((a, b) => a + b.value, 0);
  return (
    <>
      {fixedClients.length > 0 && (
        <div className="fixed-clients">
          <div className="section-heading">
            <div>
              <h2>
                Clientes <span>fixos</span>
              </h2>
              <p>Mensalidades vinculadas, sem presumir pagamentos recebidos.</p>
            </div>
          </div>
          <div className="fixed-client-grid">
            {fixedClients.map((x) => (
              <button
                className="panel fixed-client-card"
                key={x.id}
                onClick={() => onOpen(x)}
              >
                {(x.logo || x.avatar) && (
                  <img
                    src={x.logo || x.avatar}
                    alt={`${x.logo ? "Logo" : "Arte"} de ${x.name}`}
                    loading="lazy"
                  />
                )}
                <div>
                  <strong>{x.name}</strong>
                  <small>{x.segment}</small>
                  <span className="status-pill">
                    Cliente fixo ·{" "}
                    {x.clientStatus === "inativo" ? "Inativo" : "Ativo"}
                  </span>
                  <b>{money(mrrFor(x))} / mês</b>
                  <small>{x.phone || "Telefone não informado"}</small>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="board-filters">
        <label>
          Probabilidade{" "}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="todos">Todas</option>
            <option value="alta">70% ou mais</option>
            <option value="outras">Abaixo de 70%</option>
          </select>
        </label>
        <label>
          Próxima ação{" "}
          <select value={next} onChange={(e) => setNext(e.target.value)}>
            <option value="todos">Todas</option>
            <option value="sem">Sem ação</option>
            <option value="com">Com ação</option>
          </select>
        </label>
        <span>Valor ponderado = valor × probabilidade estimada.</span>
      </div>
      <div className="kanban">
        {stages.map((s) => (
          <section className="kanban-column" key={s}>
            <div className="kanban-title">
              {s}
              <span>{filtered.filter((x) => stage(x) === s).length}</span>
            </div>
            {filtered
              .filter((x) => stage(x) === s)
              .map((x) => (
                <article className="kanban-card" key={x.id}>
                  <button className="kanban-open" onClick={() => onOpen(x)}>
                    {x.logo && <img className="kanban-logo" src={x.logo} alt={`Logo de ${x.name}`} />}
                    <strong>{x.name}</strong>
                    <small>
                      {x.segment || "Segmento não informado"} ·{" "}
                      {x.city || "Região não informada"}
                    </small>
                    {x.status === "Cliente" && x.fixedClient ? (
                      <>
                        <span>
                          Cliente fixo ·{" "}
                          {x.clientStatus === "inativo" ? "Inativo" : "Ativo"}
                        </span>
                        <span>{money(mrrFor(x))} / mês</span>
                        <small>{x.phone}</small>
                      </>
                    ) : (
                      <>
                        <span>
                          {money(x.value)} · {x.probability}%
                        </span>
                        <small>
                          Potencial ponderado: {money(leadPriority(x))}
                        </small>
                      </>
                    )}
                    <small>
                      {x.next ? `Próxima: ${x.next}` : "Sem próxima ação"}
                    </small>
                  </button>
                  <label>
                    Etapa
                    <select
                      aria-label={`Etapa de ${x.name}`}
                      value={s}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "Cliente" && s !== "Cliente") {
                          if (
                            !confirm(
                              `Converter ${x.name} em cliente, mantendo o histórico?`,
                            )
                          )
                            return;
                          onChange(convertLead(x), "Convertido em cliente");
                        } else
                          onChange(
                            {
                              ...x,
                              status: v,
                              type: v === "Cliente" ? "crm" : x.type,
                              updated: date(),
                            },
                            "Etapa alterada",
                          );
                      }}
                    >
                      {stages.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                </article>
              ))}
          </section>
        ))}
      </div>
    </>
  );
}
export function RecordDetails({
  item,
  items,
  onClose,
  onChange,
  onEdit,
  onCreateProject,
  onDelete,
  preferences,
}: {
  item: Item;
  items: Item[];
  onClose: () => void;
  onChange: (x: Item, reason: string) => void;
  onEdit: () => void;
  onCreateProject: (x: Item) => void;
  onDelete: () => void;
  preferences: string[];
}) {
  const [contact, setContact] = useState("");
  const [channel, setChannel] = useState("WhatsApp");
  const [proposal, setProposal] = useState("");
  const [proposalValue, setProposalValue] = useState("");
  const [check, setCheck] = useState("");
  const isProject = item.type === "projects";
  const links = item.links || {
    github: "",
    vercel: "",
    domain: "",
    references: "",
  };
  const update = (patch: Partial<Item>, reason: string) =>
    onChange({ ...item, ...patch, updated: date() }, reason);
  const client = items.find((x) => x.id === item.clientId);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal details-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${item.name}`}
      >
        <div className="modal-head">
          <div>
            <h2>{item.name}</h2>
            <p>
              {item.status} · {item.segment || "Sem segmento"}{" "}
              {item.date && `· Prazo/data: ${item.date}`}
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        {item.logo && <div className="client-logo-detail"><strong>Logo do cliente</strong><img className="client-logo-preview" src={item.logo} alt={`Logo de ${item.name}`} /></div>}
        {item.avatar && (
          <img
            className="client-detail-art"
            src={item.avatar}
            alt={`Arte de ${item.name}`}
          />
        )}
        <div className="detail-summary">
          {item.fixedClient ? (
            <>
              <span>
                Categoria{" "}
                <strong>
                  Cliente fixo ·{" "}
                  {item.clientStatus === "inativo" ? "Inativo" : "Ativo"}
                </strong>
              </span>
              <span>
                Mensalidade ativa{" "}
                <strong>
                  {money(
                    items
                      .filter(
                        (x) =>
                          x.type === "finance" &&
                          x.clientId === item.id &&
                          financeInfo(x).kind === "mensalidade" &&
                          financeInfo(x).state === "ativo",
                      )
                      .reduce((a, x) => a + x.value, 0),
                  )}{" "}
                  / mês
                </strong>
              </span>
              <span>
                Telefone <strong>{item.phone || "Não informado"}</strong>
              </span>
            </>
          ) : (
            <span>
              Valor <strong>{money(item.value)}</strong>
            </span>
          )}
          {!isProject && !item.fixedClient && (
            <span>
              Probabilidade <strong>{item.probability}%</strong>
            </span>
          )}
          <span>
            Próxima ação <strong>{item.next || "Não informada"}</strong>
          </span>
        </div>
        <p className="detail-notes">
          {item.notes || "Nenhuma observação registrada."}
        </p>
        {item.type === "crm" && <div className="client-history"><h3>História e relacionamento</h3><p>{item.relationshipHistory || "Nenhuma história registrada. Use Editar dados para adicionar."}</p></div>}
        <div className="detail-actions">
          <button className="button secondary" onClick={onDelete}>
            <Trash2 size={15} /> Excluir
          </button>
          <button className="button secondary" onClick={onEdit}>
            <FileText size={15} /> Editar dados
          </button>
          {!isProject && item.status !== "Cliente" && (
            <button
              className="button primary"
              onClick={() => {
                if (confirm(`Converter ${item.name} em cliente?`))
                  onChange(convertLead(item), "Convertido em cliente");
              }}
            >
              Converter em cliente
            </button>
          )}
          {!isProject && item.status === "Cliente" && (
            <button
              className="button primary"
              onClick={() => onCreateProject(item)}
            >
              <Plus size={15} /> Criar projeto
            </button>
          )}
        </div>
        {item.fixedClient && (
          <section className="detail-section">
            <h3>Lançamentos vinculados</h3>
            {items
              .filter((x) => x.type === "finance" && x.clientId === item.id)
              .map((x) => (
                <p key={x.id}>
                  {x.name} · {money(x.value)} · {financeInfo(x).state}
                  {x.date
                    ? ` · ${x.date.length === 7 ? `${x.date.slice(5)}/${x.date.slice(0, 4)} (dia não informado)` : x.date}`
                    : ""}
                </p>
              ))}
          </section>
        )}
        {isProject ? (
          <>
            <section className="detail-section">
              <h3>Cliente vinculado</h3>
              <select
                value={item.clientId || ""}
                onChange={(e) =>
                  update(
                    { clientId: e.target.value },
                    "Vínculo do projeto alterado",
                  )
                }
              >
                <option value="">Sem vínculo</option>
                {items
                  .filter((x) => x.type === "crm" && x.status === "Cliente")
                  .map((x) => (
                    <option value={x.id} key={x.id}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </section>
            <section className="detail-section">
              <h3>Checklist de entrega</h3>
              {(item.checklist || []).map((c) => (
                <div className="detail-entry" key={c.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={c.done}
                      onChange={(e) =>
                        update(
                          {
                            checklist: (item.checklist || []).map((v) =>
                              v.id === c.id
                                ? { ...v, done: e.target.checked }
                                : v,
                            ),
                          },
                          "Checklist atualizado",
                        )
                      }
                    />{" "}
                    {c.text}
                  </label>
                  <button
                    className="icon-button"
                    aria-label="Excluir item"
                    onClick={() =>
                      update(
                        {
                          checklist: (item.checklist || []).filter(
                            (v) => v.id !== c.id,
                          ),
                        },
                        "Item do checklist excluído",
                      )
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <form
                className="inline-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (check.trim()) {
                    update(
                      {
                        checklist: [
                          ...(item.checklist || []),
                          { id: id(), text: check.trim(), done: false },
                        ],
                      },
                      "Item adicionado ao checklist",
                    );
                    setCheck("");
                  }
                }}
              >
                <input
                  value={check}
                  onChange={(e) => setCheck(e.target.value)}
                  placeholder="Adicionar item ao checklist"
                />
                <button className="button secondary">Adicionar</button>
              </form>
            </section>
            <section className="detail-section">
              <h3>Links e referências</h3>
              {(["github", "vercel", "domain", "references"] as const).map(
                (key) => (
                  <label className="detail-field" key={key}>
                    {
                      {
                        github: "GitHub",
                        vercel: "Vercel",
                        domain: "Domínio",
                        references: "Referências visuais",
                      }[key]
                    }
                    <input
                      defaultValue={links[key]}
                      key={item.id + key}
                      onBlur={(e) => {
                        if (e.target.value !== links[key])
                          update(
                            { links: { ...links, [key]: e.target.value } },
                            "Links atualizados",
                          );
                      }}
                      placeholder="URL ou referência"
                    />
                  </label>
                ),
              )}
              <button
                className="button secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    buildBriefing(item, client) +
                      (preferences.length
                        ? `\nPreferências autorizadas do fundador: ${preferences.join("; ")}.`
                        : ""),
                  );
                  alert("Prompt copiado.");
                }}
              >
                <FileText size={15} /> Copiar briefing estruturado
              </button>
            </section>
            <section className="detail-section">
              <h3>Histórico do projeto</h3>
              {(item.changes || []).length ? (
                (item.changes || []).map((c, i) => <p key={i}>{c}</p>)
              ) : (
                <p>Nenhuma alteração registrada ainda.</p>
              )}
            </section>
          </>
        ) : (
          <>
            <section className="detail-section">
              <h3>Histórico de contatos</h3>
              {(item.contacts || []).map((c) => (
                <div className="detail-entry" key={c.id}>
                  <div>
                    <strong>
                      {c.channel} · {c.date}
                    </strong>
                    <p>{c.notes}</p>
                  </div>
                  <button
                    className="icon-button"
                    aria-label="Excluir contato"
                    onClick={() => {
                      if (confirm("Excluir contato?"))
                        update(
                          {
                            contacts: (item.contacts || []).filter(
                              (v) => v.id !== c.id,
                            ),
                          },
                          "Contato excluído",
                        );
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <form
                className="inline-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contact.trim()) {
                    update(
                      {
                        contacts: [
                          {
                            id: id(),
                            date: date(),
                            channel,
                            notes: contact.trim(),
                          },
                          ...(item.contacts || []),
                        ],
                      },
                      "Contato registrado",
                    );
                    setContact("");
                  }
                }}
              >
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option>WhatsApp</option>
                  <option>Telefone</option>
                  <option>E-mail</option>
                  <option>Reunião</option>
                  <option>Outro</option>
                </select>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Resumo do contato"
                />
                <button className="button secondary">Registrar</button>
              </form>
            </section>
            <section className="detail-section">
              <h3>Propostas vinculadas</h3>
              {(item.proposals || []).map((p) => (
                <div className="detail-entry" key={p.id}>
                  <div>
                    <strong>
                      {p.title} · {money(p.value)}
                    </strong>
                    <p>{p.notes}</p>
                  </div>
                  <select
                    aria-label={`Status da proposta ${p.title}`}
                    value={p.status}
                    onChange={(e) =>
                      update(
                        {
                          proposals: (item.proposals || []).map((v) =>
                            v.id === p.id
                              ? { ...v, status: e.target.value }
                              : v,
                          ),
                        },
                        "Proposta atualizada",
                      )
                    }
                  >
                    <option>Rascunho</option>
                    <option>Enviada</option>
                    <option>Aceita</option>
                    <option>Recusada</option>
                  </select>
                  <button
                    className="icon-button"
                    aria-label="Excluir proposta"
                    onClick={() => {
                      if (confirm("Excluir proposta?"))
                        update(
                          {
                            proposals: (item.proposals || []).filter(
                              (v) => v.id !== p.id,
                            ),
                          },
                          "Proposta excluída",
                        );
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <form
                className="inline-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (proposal.trim() && Number(proposalValue) >= 0) {
                    update(
                      {
                        proposals: [
                          ...(item.proposals || []),
                          {
                            id: id(),
                            title: proposal.trim(),
                            value: Number(proposalValue),
                            status: "Rascunho",
                            notes: "",
                          },
                        ],
                      },
                      "Proposta criada",
                    );
                    setProposal("");
                    setProposalValue("");
                  }
                }}
              >
                <input
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Nome da proposta"
                  required
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={proposalValue}
                  onChange={(e) => setProposalValue(e.target.value)}
                  placeholder="Valor R$"
                  required
                />
                <button className="button secondary">Adicionar</button>
              </form>
            </section>
            {items.filter(
              (x) => x.type === "projects" && x.clientId === item.id,
            ).length > 0 && (
              <section className="detail-section">
                <h3>Projetos vinculados</h3>
                {items
                  .filter(
                    (x) => x.type === "projects" && x.clientId === item.id,
                  )
                  .map((x) => (
                    <p key={x.id}>
                      {x.name} · {x.status} <ArrowRight size={12} />
                    </p>
                  ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
