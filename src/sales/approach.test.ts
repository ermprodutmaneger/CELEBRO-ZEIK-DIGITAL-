import {describe,it,expect} from 'vitest';
import {firstApproach} from './approach';
describe('primeira abordagem',()=>{
 it('usa a informação informada sem inventar deficiência ou interesse',()=>{const m=firstApproach('Elmóveis','vocês trabalham com móveis planejados.','Como recebem os orçamentos?');expect(m).toContain('Elmóveis');expect(m).toContain('vocês trabalham com móveis planejados.');expect(m).toContain('Como recebem os orçamentos?');expect(m).not.toContain('não têm site')});
 it('aceita entrada vazia sem alegar pesquisa ou problema',()=>{const m=firstApproach('','','');expect(m).toContain('[nome do negócio]');expect(m).toContain('Como vocês apresentam');expect(m).not.toContain('Vi que')});
});
