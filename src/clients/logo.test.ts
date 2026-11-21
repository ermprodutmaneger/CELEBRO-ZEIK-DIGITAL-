import {describe,it,expect} from 'vitest';
import {validLogo,maxLogoLength} from './logo';
import {validateStore} from '../types';
describe('logo e histórico dos clientes',()=>{
 it('aceita apenas imagens locais seguras e limitadas',()=>{expect(validLogo('data:image/jpeg;base64,YWJj')).toBe(true);expect(validLogo('https://example.com/logo.png')).toBe(false);expect(validLogo('data:image/svg+xml;base64,YWJj')).toBe(false);expect(validLogo('data:image/jpeg;base64,'+'a'.repeat(maxLogoLength))).toBe(false)});
 it('preserva campos no backup e rejeita imagens remotas',()=>{const item={id:'1',name:'Cliente',type:'crm',status:'Cliente',segment:'',value:0,date:'',notes:'',next:'',city:'',probability:0,updated:'',logo:'data:image/png;base64,YWJj',relationshipHistory:'Nossa história'};expect(validateStore({items:[item],history:[]}).items[0].relationshipHistory).toBe('Nossa história');expect(()=>validateStore({items:[{...item,logo:'https://example.com/x.png'}],history:[]})).toThrow()});
});
