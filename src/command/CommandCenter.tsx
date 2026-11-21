import {useState} from 'react';
import type {Item} from '../types';
import {actions,openProposals} from './decision';
import {agency, load} from '../founder-finance/model';
import {financeInfo,financeSummary} from '../services/rules';
import './command.css';
const br=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export function CommandCenter({items,onOpen,onNavigate,onBackup}:{items:Item[];onOpen:(x:Item)=>void;onNavigate:(page:string)=>void;onBackup:()=>void}) {
 const [hidden,setHidden]=useState<string[]>([]);
 const today=new Date().toISOString().slice(0,10);const all=actions(items,today);const visible=all.filter(a=>!hidden.includes(a.id));
 const clients=items.filter(x=>x.type==='crm'&&x.status==='Cliente'&&x.fixedClient&&x.clientStatus!=='inativo').length;
 const month=today.slice(0,7),fin=financeSummary(items,month),open=openProposals(items); let recurringReceived=0; try { recurringReceived=agency(items,month,load()).filter(e=>e.state==='recebido' && items.some(i=>i.id===e.id && financeInfo(i).kind==='mensalidade')).reduce((s,e)=>s+e.amount,0) } catch { /* invalid private backup is reported in its own module */ }
 return <div className="command-center"><div className="section-heading"><div><h2>Central de <span>decisão</span></h2><p>Organização local por tipo de trabalho, não uma análise de IA nem prioridade automática definitiva.</p></div><button className="button secondary" onClick={onBackup}>Backup e segurança</button></div>
 <div className="decision-layout"><section className="panel decision-panel"><h3>Próximos passos</h3><p>Comece pelas entregas e revise as demais sugestões. Você decide a ordem.</p>{visible.slice(0,6).map(a=><div className="decision-row" key={a.id}><button onClick={()=>a.item.type==='finance'?onNavigate('finance'):onOpen(a.item)}><small>{a.group}</small><strong>{a.item.name}</strong><span>{a.reason}</span></button><button className="decision-dismiss" aria-label={`Ocultar sugestão ${a.item.name}`} onClick={()=>setHidden([...hidden,a.id])}>×</button></div>)}{!visible.length&&<p>Nenhuma sugestão visível. Adicione registros ou restaure as sugestões.</p>}{hidden.length>0&&<button className="text-link" onClick={()=>setHidden([])}>Restaurar sugestões ocultadas nesta sessão</button>}{visible.length>6&&<p>Mais {visible.length-6} sugestão(ões) nas áreas correspondentes.</p>}</section>
 <section className="panel decision-panel"><h3>Crescimento sem confundir metas</h3><div className="decision-stat"><span>Clientes fixos ativos cadastrados</span><b>{clients} <small>/ meta 10–20</small></b></div><div className="decision-stat"><span>Mensalidades ativas habituais</span><b>{br(fin.mrr)} / mês</b></div><div className="decision-stat"><span>Recebido na Zeik em {month}</span><b>{br(fin.received+recurringReceived)}</b></div><div className="decision-stat"><span>Propostas em rascunho ou enviadas</span><b>{open.length}</b></div><p>Mensalidade não é pagamento confirmado. Valores recebidos usam o Financeiro principal e as marcações mensais compartilhadas das mensalidades.</p><button className="button secondary" onClick={()=>onNavigate('sales')}>Abrir central comercial</button></section></div></div>;
}
