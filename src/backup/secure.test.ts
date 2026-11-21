import {describe,it,expect} from 'vitest';
import {encryptBackup,decryptBackup} from './secure';
describe('backup criptografado',()=>{
 it('criptografa e restaura com frase correta e sal aleatório',async()=>{const data={store:{items:[{name:'privado'}]},financial:{salary:1400}};const pass='frase longa de backup';const a=await encryptBackup(data,pass),b=await encryptBackup(data,pass);expect(a.ciphertext).not.toContain('privado');expect(a.salt).not.toBe(b.salt);expect(await decryptBackup(a,pass)).toEqual(data);await expect(decryptBackup(a,'frase errada')).rejects.toThrow();});
 it('recusa adulteração e parâmetros desconhecidos',async()=>{const a=await encryptBackup({ok:true},'frase longa de backup');await expect(decryptBackup({...a,iterations:1},'frase longa de backup')).rejects.toThrow();const c=a.ciphertext;await expect(decryptBackup({...a,ciphertext:(c[0]==='A'?'B':'A')+c.slice(1)},'frase longa de backup')).rejects.toThrow();await expect(encryptBackup({},'curta')).rejects.toThrow()});
});
