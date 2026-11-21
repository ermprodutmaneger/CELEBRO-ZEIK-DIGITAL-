import { useState } from "react";
import { Check, ExternalLink, MapPin, Plus, Search } from "lucide-react";
import type { Item } from "../types";
import {
  cleanName,
  prospects,
  researchId,
  researchedAt,
  type Prospect,
} from "./research";

export function ProspectList({
  items,
  query,
  onAdd,
  onQueryChange,
}: {
  items: Item[];
  query: string;
  onAdd: (p: Prospect) => void;
  onQueryChange: (s: string) => void;
}) {
  const [segment, setSegment] = useState("Todos");
  const available = prospects.filter(
    (p) =>
      (segment === "Todos" || p.segment === segment) &&
      `${p.name} ${p.neighborhood} ${p.segment} ${p.address}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <section className="prospecting-section">
      <div className="prospect-header">
        <div>
          <div className="eyebrow">PESQUISA PONTUAL · SÃO PAULO CAPITAL</div>
          <h2>
            Oportunidades para <span>investigar</span>
          </h2>
          <p>
            Selecionadas em fontes públicas em 21/11/2026. Não é busca ao
            vivo nem lista de interessados confirmados.
          </p>
        </div>
        <label>
          Segmento
          <select value={segment} onChange={(e) => setSegment(e.target.value)}>
            <option>Todos</option>
            {Array.from(new Set(prospects.map((p) => p.segment))).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="prospect-search">
        <Search size={16} />
        <input
          aria-label="Buscar oportunidades por nome, bairro ou segmento"
          placeholder="Buscar nome, bairro ou segmento..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="prospect-alert">
        Site e Perfil da Empresa no Google: <strong>verificação não abrangente</strong>. Algumas páginas foram encontradas e estão indicadas abaixo.
        Antes de oferecer qualquer serviço, confirme se o negócio está ativo, se
        o contato continua correto, o que ele já possui e se há interesse.
        Nenhuma mensagem é enviada automaticamente.
      </div>
      <div className="prospect-grid">
        {available.map((p) => {
          const added = items.some(
            (i) =>
              i.id === researchId(p.id) ||
              (["leads", "crm"].includes(i.type) &&
                cleanName(i.name) === cleanName(p.name)),
          );
          return (
            <article className="panel prospect-card" key={p.id}>
              <div className="prospect-top">
                <span className="status-pill">{p.segment}</span>
                <span className="prospect-state">A QUALIFICAR</span>
              </div>
              <h3>{p.name}</h3>
              <p className="prospect-place">
                <MapPin size={14} />
                {p.neighborhood} · São Paulo
              </p>
              <div className="prospect-facts">
                <p>
                  <strong>Endereço na fonte</strong>
                  {p.address}
                </p>
                <p>
                  <strong>WhatsApp informado</strong>
                  {p.phone}
                </p>
                {p.website && (
                  <p>
                    <strong>Presença encontrada</strong>
                    <a href={p.website} target="_blank" rel="noopener noreferrer">{p.websiteLabel || "Site encontrado"}</a>
                  </p>
                )}
                <p>
                  <strong>O que encontramos</strong>
                  {p.fact}
                </p>
                <p>
                  <strong>Hipótese a validar</strong>
                  {p.idea}
                </p>
              </div>
              <div className="prospect-bottom">
                <a href={p.source} target="_blank" rel="noopener noreferrer">
                  Ver fonte <ExternalLink size={14} />
                </a>
                <button
                  className={"button " + (added ? "secondary" : "primary")}
                  disabled={added}
                  onClick={() => onAdd(p)}
                >
                  {added ? (
                    <>
                      <Check size={15} /> Já no CRM
                    </>
                  ) : (
                    <>
                      <Plus size={15} /> Adicionar ao CRM
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {!available.length && (
        <div className="panel empty-state">
          <Search size={20} />
          <p>Nenhuma sugestão corresponde aos filtros.</p>
        </div>
      )}
      <p className="prospect-footnote">
        Pesquisa manual de {researchedAt.split("-").reverse().join("/")} · a
        inclusão no CRM é local e não verifica automaticamente estes dados.
      </p>
    </section>
  );
}
