/** Local-only image: canvas limits storage consumption and never contacts a server. */
export const maxLogoLength = 400_000;
export function validLogo(value: unknown): value is string {
  return typeof value === 'string' && value.length <= maxLogoLength && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
}
export async function prepareLogo(file: File): Promise<string> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw Error('Use uma imagem JPG, PNG ou WebP.');
  if (file.size > 12 * 1024 * 1024) throw Error('A imagem deve ter no máximo 12 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload=()=>resolve(); image.onerror=()=>reject(Error('Não foi possível abrir a imagem.')); image.src=url; });
    if (!image.naturalWidth || !image.naturalHeight) throw Error('Imagem inválida.');
    const scale=Math.min(1,512/Math.max(image.naturalWidth,image.naturalHeight));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
    const context=canvas.getContext('2d');if(!context)throw Error('Não foi possível processar a imagem.');
    // White background makes transparent logos legible in JPEG, supported by Safari.
    context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
    const result=canvas.toDataURL('image/jpeg',0.78);if(!validLogo(result)) throw Error('Imagem processada muito grande. Tente outra imagem.');return result;
  } finally { URL.revokeObjectURL(url); }
}
