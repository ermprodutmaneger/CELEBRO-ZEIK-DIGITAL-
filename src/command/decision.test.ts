import {describe,it,expect} from 'vitest';
import {actions,clientContext,openProposals,proposalText} from './decision';
import type {Item} from '../types';
const item=(x:Partial<Item>):Item=>({id:'a',name:'Empresa',type:'crm',status:'Cliente',segment:'',value:0,date:'',notes:'',next:'',city:'',probability:0,updated:'',...x});
describe('central de decisão',()=>{
 it('não inventa vencimento ou recebimento em cobranças',()=>{const x=item({type:'finance',financeKind:'receita',financeState:'previsto'});expect(actions([x],'2026-11-01')[0].reason).toContain('sem data');expect(actions([x],'2026-11-01')[0].reason).toContain('não confirmado')});
 it('vincula somente projetos e finanças pelo cliente',()=>{const client=item({});const data=[item({id:'p',type:'projects',clientId:'a'}),item({id:'p2',type:'projects',clientId:'b'}),item({id:'f',type:'finance',clientId:'a'})];expect(clientContext(data,client).projects).toHaveLength(1);expect(clientContext(data,client).financial).toHaveLength(1)});
 it('traz propostas abertas e gera prévia sem envio',()=>{const x=item({proposals:[{id:'1',title:'Site',value:500,status:'Rascunho',notes:'Página de serviços'},{id:'2',title:'Outro',value:1,status:'Aceita',notes:''}]});expect(openProposals([x])).toHaveLength(1);expect(proposalText(x.name,'Site',500,'Página de serviços')).toContain('Nenhuma mensagem foi enviada')});
});
