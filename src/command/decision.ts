import type { Item } from '../types';
import {financeInfo} from '../services/rules';
export type Action = {id:string;item:Item;reason:string; group:string};
export function actions(items:Item[],today:string):Action[]{
 const result:Action[]=[];
 for(const x of items){
  if((x.type==='crm'||x.type==='leads')&&x.status!=='Cliente') {
   if(x.next.trim()) result.push({id:`next-${x.id}`,item:x,group:'Relacionamento',reason:`Próxima ação registrada: ${x.next}`});
   else result.push({id:`lead-${x.id}`,item:x,group:'Relacionamento',reason:'Oportunidade sem próxima ação cadastrada.'});
  }
  if(x.type==='crm'&&x.status==='Cliente'&&x.clientStatus!=='inativo'&&x.next.trim()) result.push({id:`client-${x.id}`,item:x,group:'Relacionamento',reason:`Próxima ação registrada: ${x.next}`});
  if(x.type==='projects'&&x.status!=='Concluído')result.push({id:`project-${x.id}`,item:x,group:'Entregas',reason:x.date?`Projeto em aberto · prazo cadastrado: ${x.date}`:'Projeto em aberto · prazo não informado.'});
  if(x.type==='tasks'&&x.status!=='Concluído')result.push({id:`task-${x.id}`,item:x,group:'Entregas',reason:x.next||'Tarefa em aberto.'});
  if(x.type==='finance'&&financeInfo(x).kind==='receita'&&financeInfo(x).state==='previsto') result.push({id:`finance-${x.id}`,item:x,group:'Conferir',reason:x.date?`Receita prevista para ${x.date}; recebimento não confirmado.`:'Receita prevista sem data; recebimento não confirmado.'});
 }
 // Explicitly ordered by group, not a claim of objective urgency.
 const order=['Entregas','Relacionamento','Conferir'];return result.sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group));
}
export function clientContext(items:Item[],client:Item){return {projects:items.filter(x=>x.type==='projects'&&x.clientId===client.id),financial:items.filter(x=>x.type==='finance'&&x.clientId===client.id),contacts:client.contacts||[],proposals:client.proposals||[]}}
export function openProposals(items:Item[]){return items.flatMap(x=>(x.proposals||[]).filter(p=>p.status==='Rascunho'||p.status==='Enviada').map(p=>({item:x,proposal:p})));}
export function proposalText(name:string,title:string,value:number,scope:string){return `PROPOSTA COMERCIAL — ${name}\n\nServiço: ${title}\n\nNecessidade e escopo:\n${scope.trim()||'[Preencher após conversar com o cliente]'}\n\nInvestimento: ${value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}\nPrazo e condições: [preencher]\n\nPróximo passo: alinhar e aprovar o escopo.\n\nPrévia para revisão. Nenhuma mensagem foi enviada.`}
