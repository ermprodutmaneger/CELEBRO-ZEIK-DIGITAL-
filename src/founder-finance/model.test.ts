import {describe,it,expect} from 'vitest';
import {initial,calculate,validate} from './model';
import type {Item} from '../types';
const entry=(id:string,value:number,kind:Item['financeKind'],state:Item['financeState'],date=''):Item=>({id,name:id,type:'finance',status:'',segment:'',value,date,notes:'',next:'',city:'',probability:0,updated:'',financeKind:kind,financeState:state});
const items=[entry('mrr-daniela-lina-202611',100,'mensalidade','ativo'),entry('mrr-acai-cordeiro-202611',65,'mensalidade','ativo'),entry('site-daniela-lina-202612',400,'receita','previsto','2026-12')];
describe('finanças do fundador',()=>{
 it('usa líquido sem descontar consignado duas vezes e mantém 13º sem mês fora da previsão',()=>{const d=initial(), c=calculate(d,items,'2026-12');expect(c.bills).toBeCloseTo(1848.15);expect(c.forecast).toBeCloseTo(-448.15);expect(c.extra).toBe(0);expect(c.agencyForecast).toBe(465);expect(c.agencyReceived).toBe(0);expect(c.safeAds).toBeNull()});
 it('conta 13º apenas no mês designado e não replica pagamentos',()=>{const d=initial();d.entries=d.entries.map(e=>e.id==='13-1'?{...e,month:'2026-11',state:'recebido'}:e);expect(calculate(d,items,'2026-11').extraReceived).toBe(1000);expect(calculate(d,items,'2026-12').extra).toBe(0)});
 it('não soma receita empresarial ao saldo pessoal e preserva estados mensais',()=>{const d=initial();d.cash=2000;d.agencyStates['mrr-acai-cordeiro-202611:2026-12']='recebido';const dec=calculate(d,items,'2026-12');expect(dec.agencyReceived).toBe(65);expect(dec.safeAds).toBeCloseTo(151.85);expect(calculate(d,items,'2027-01').agencyReceived).toBe(0);expect(calculate(d,items,'2027-01').agencyForecast).toBe(165)});
 it('recusa backup inválido sem aceitar lançamentos duplicados',()=>{const d=initial();d.entries.push(d.entries[0]);expect(()=>validate(d)).toThrow()});
});
