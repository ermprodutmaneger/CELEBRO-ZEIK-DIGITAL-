import { useEffect, useRef, useState } from 'react';
import { BookOpen, Copy, FileUp, MessageCircle } from 'lucide-react';
import { prospects } from '../prospecting/research';
import type { Item } from '../types';
import { firstApproach } from './approach';
import './approach.css';

export function ApproachGuide({items}: {items:Item[]}) {
  const [selected,setSelected]=useState('');
  const [name,setName]=useState('');
  const [observation,setObservation]=useState('');
  const [question,setQuestion]=useState('');
  const [draft,setDraft]=useState('');
  const [notice,setNotice]=useState('');
  const [pdf,setPdf]=useState('');
  const file=useRef<HTMLInputElement>(null);
  useEffect(()=>()=>{if(pdf) URL.revokeObjectURL(pdf)},[pdf]);
  const options=[...prospects.map(p=>({id:`research:${p.id}`,name:p.name})), ...items.filter(i=>(i.type==='crm'||i.type==='leads') && i.status!=='Cliente' && !prospects.some(p=>p.name.trim().toLocaleLowerCase('pt-BR')===i.name.trim().toLocaleLowerCase('pt-BR'))).map(i=>({id:`crm:${i.id}`,name:i.name}))];
  return <section className="approach-guide panel">
    <div className="approach-top"><div className="approach-icon"><BookOpen size={21}/></div><div><span className="approach-eyebrow">PROSPECÇÃO COM INTENÇÃO</span><h3>Primeira abordagem · escutar antes de vender</h3><p>Roteiro local inspirado no trecho de <em>Negocie como se a sua vida dependesse disso</em>, de Chris Voss, enviado por você.</p></div></div>
    <div className="approach-principles"><div><b>01 · Prepare</b><span>Confira negócio, contato e canais; use apenas fatos que você verificou.</span></div><div><b>02 · Pergunte</b><span>Faça uma pergunta aberta sobre a situação atual, sem presumir um problema.</span></div><div><b>03 · Escute</b><span>Se responder, procure entender antes de propor; respeite um não.</span></div></div>
    <p className="approach-source">Fonte: arquivo enviado, capítulo 1, páginas impressas 8 e 28–31 (páginas 6 e 26–29 do PDF). O arquivo recebido contém um trecho, não o livro completo. A adaptação é original e não garante respostas.</p>
    <div className="approach-fields">
      <label>Escolher oportunidade (opcional)<select value={selected} onChange={e=>{const value=e.target.value;setSelected(value);setName(options.find(o=>o.id===value)?.name || '');setObservation('');setDraft('')}}><option value="">Preencher manualmente</option>{options.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
      <label>Nome do negócio<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Elmóveis" /></label>
      <label>Fato que você confirmou (opcional)<input value={observation} onChange={e=>setObservation(e.target.value)} placeholder="Ex.: vocês trabalham com móveis planejados." /></label>
      <label>Pergunta aberta (opcional)<input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Como vocês recebem pedidos de orçamento hoje?" /></label>
    </div>
    <div className="approach-actions"><button className="button primary" onClick={()=>{setDraft(firstApproach(name,observation,question));setNotice('')}}><MessageCircle size={16}/> Criar primeira abordagem</button>
      <button className="button secondary" onClick={()=>file.current?.click()}><FileUp size={16}/> Abrir meu PDF neste dispositivo</button><input ref={file} type="file" accept="application/pdf,.pdf" hidden onChange={e=>{const f=e.target.files?.[0];if(f){if(f.type && f.type!=='application/pdf'){setNotice('Selecione um arquivo PDF.');return}setPdf(URL.createObjectURL(f));setNotice('PDF aberto localmente; não foi enviado nem salvo pelo painel.')}e.target.value=''}} />
    </div>
    <p className="approach-hint">O livro não é publicado nem enviado: selecione seu PDF no aparelho para consultá-lo. A seleção não permanece ao fechar a página.</p>
    {pdf && <a className="approach-pdf" href={pdf} target="_blank" rel="noopener noreferrer">Abrir o PDF selecionado ↗</a>}
    {draft && <div className="approach-draft"><label>Rascunho para revisar<textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={9}/></label><button className="button secondary" onClick={async()=>{try{await navigator.clipboard.writeText(draft);setNotice('Texto copiado. Nenhuma mensagem foi enviada.')}catch{setNotice('Não foi possível copiar automaticamente. Selecione e copie o texto.')}}}><Copy size={15}/> Copiar texto</button><small>Revise a mensagem e confirme o canal antes de enviar manualmente.</small></div>}
    {notice && <p className="approach-notice" role="status">{notice}</p>}
  </section>
}
