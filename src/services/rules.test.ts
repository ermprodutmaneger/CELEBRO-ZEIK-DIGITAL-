import {describe,it,expect} from 'vitest';
import {financeInfo,financeSummary,convertLead,buildBriefing,leadPriority} from './rules';
import {validateStore, type Item} from '../types';
const item=(override:Partial<Item>={}):Item=>({id:'1',name:'Empresa',type:'leads',status:'Novo',segment:'Comércio',value:1000,date:'2026-11-01',notes:'Briefing',next:'Ligar',city:'São Paulo',probability:50,updated:'2026-11-01',...override});
describe('regras operacionais',()=>{
 it('converte sem perder identidade e histórico',()=>{const x=item({contacts:[{id:'c',date:'2026-11-01',channel:'Telefone',notes:'Ligou'}]});const y=convertLead(x);expect(y.id).toBe(x.id);expect(y.type).toBe('crm');expect(y.status).toBe('Cliente');expect(y.contacts).toEqual(x.contacts)});
 it('distingue receitas realizadas, previstas e mensalidades',()=>{const data=[item({type:'finance',financeKind:'receita',financeState:'recebido',value:300}),item({id:'2',type:'finance',financeKind:'receita',financeState:'previsto',value:200}),item({id:'3',type:'finance',financeKind:'mensalidade',financeState:'ativo',value:100}),item({id:'4',type:'finance',financeKind:'despesa',financeState:'pago',value:50}),item({id:'5',type:'finance',financeKind:'receita',financeState:'recebido',date:'2026-10-01',value:900})];expect(financeSummary(data,'2026-11')).toEqual({received:300,forecast:200,mrr:100,paid:50,pendingExpenses:0})});
 it('não interpreta lançamentos antigos ambíguos como pagamento',()=>{expect(financeInfo(item({status:'Receita'}))).toEqual({kind:'receita',state:'previsto'});expect(financeInfo(item({status:'Recebido'}))).toEqual({kind:'receita',state:'recebido'})});
 it('calcula potencial e usa o cliente no briefing',()=>{expect(leadPriority(item())).toBe(500);expect(buildBriefing(item({type:'projects'}),item({name:'Cliente X'}))).toContain('Cliente X')});
});
describe('validação de backup',()=>{
 it('aceita backup válido',()=>expect(validateStore({items:[item()],history:[]})).toHaveProperty('items'));
 it('rejeita registros inválidos ou duplicados',()=>{expect(()=>validateStore({items:[item(),item()],history:[]})).toThrow();expect(()=>validateStore({items:[item({value:NaN})],history:[]})).toThrow();expect(()=>validateStore({items:[{...item(),notes:null}],history:[]})).toThrow();expect(()=>validateStore({items:[item({contacts:[{id:'x'} as never]})],history:[]})).toThrow()});
});
