import * as THREE from 'three';

/**
 * Clean, high-fidelity procedural textures for Pía Lab 3D models.
 * Focused on crisp, appetizing, premium aesthetics without muddy noise.
 */

const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Generates an elegant, crisp traditional red stamp (Mộc Son Đỏ).
 * Clean calligraphy, delicate double ring border, authentic vermilion red,
 * and subtle golden egg-wash glaze halo.
 */
export function getArtisanStampTexture(text: string): THREE.CanvasTexture {
  const cacheKey = `stamp_clean_${text}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey)!;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  const center = 256;
  const radius = 175;

  // 1. Subtle Egg-Wash Glaze Halo (Golden-amber warmth radiating from center)
  const glazeGrad = ctx.createRadialGradient(center, center, 40, center, center, 240);
  glazeGrad.addColorStop(0, 'rgba(217, 119, 6, 0.22)');
  glazeGrad.addColorStop(0.65, 'rgba(180, 83, 9, 0.12)');
  glazeGrad.addColorStop(1, 'rgba(146, 64, 14, 0)');
  ctx.fillStyle = glazeGrad;
  ctx.beginPath();
  ctx.arc(center, center, 240, 0, Math.PI * 2);
  ctx.fill();

  // 2. Delicate Spiral Pastry Flake Lines (Vân vi tầng bánh Pía Sóc Trăng)
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1.8;
  for (let r = 70; r <= 230; r += 32) {
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 3. Outer Traditional Double Circle Seal (Mộc Son Đỏ Chu Sa)
  ctx.strokeStyle = '#BE123C';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(center, center, radius - 14, 0, Math.PI * 2);
  ctx.stroke();

  // Decorative corner/compass dots (8 hướng cát tường)
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    const x = center + Math.cos(a) * (radius - 7);
    const y = center + Math.sin(a) * (radius - 7);
    ctx.fillStyle = '#BE123C';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Stamp Typography / Brand Symbol
  ctx.fillStyle = '#BE123C';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (/^\p{Extended_Pictographic}$/u.test(text)) {
    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = iconCanvas.height = 256;
    const iconContext = iconCanvas.getContext('2d')!;
    iconContext.font = '150px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    iconContext.textAlign = 'center';
    iconContext.textBaseline = 'middle';
    iconContext.fillText(text, 128, 132);

    // Dùng hình emoji làm mặt nạ để biểu tượng có cùng màu mực son.
    iconContext.globalCompositeOperation = 'source-in';
    iconContext.fillStyle = ctx.fillStyle;
    iconContext.fillRect(0, 0, 256, 256);
    ctx.drawImage(iconCanvas, center - 128, center - 128);
  } else {
    const cleanText = text.replace(/[^a-zA-Z0-9\u00C0-\u1EF9\u4E00-\u9FFF]/g, '').slice(0, 2) || '福';
    const fontSize = cleanText.length === 1 ? 150 : 84;
    ctx.font = `bold ${fontSize}px "Cinzel", "Playfair Display", "Times New Roman", serif`;
    ctx.fillText(cleanText, center, center + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Traditional mooncake (Bánh Nướng) embossed floral relief map
 */
export function getTraditionalEmbossTexture(): THREE.CanvasTexture {
  const cacheKey = 'traditional_emboss_clean';
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey)!;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  const c = 256;

  // Outer border ring
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(c, c, 210, 0, Math.PI * 2);
  ctx.stroke();

  // 16 petals
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const x1 = c + Math.cos(angle) * 140;
    const y1 = c + Math.sin(angle) * 140;
    const x2 = c + Math.cos(angle) * 200;
    const y2 = c + Math.sin(angle) * 200;

    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x2, y2, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner lotus core circle
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(c, c, 120, 0, Math.PI * 2);
  ctx.stroke();

  // Center character "福"
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 120px "Cinzel", "Playfair Display", serif';
  ctx.fillText('福', c, c + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  textureCache.set(cacheKey, texture);
  return texture;
}
