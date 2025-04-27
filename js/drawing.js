// drawing.js
// Handles canvas drawing operations – revised 27 Apr 2025

import { ctx, canvas }      from './dom.js';
import * as layout          from './layout.js';
import * as state           from './state.js';
import { leagues, leagueAbbr } from './config.js';

/*──────────────────────────────────────────────────────────────
  1. In-memory image cache
──────────────────────────────────────────────────────────────*/
const imgCache = new Map();   // key → Promise<HTMLImageElement>

async function loadSvgAsImage(filePath) {
  if (imgCache.has(filePath)) return imgCache.get(filePath);   // cache hit

  const p = (async () => {
    const resp = await fetch(filePath);
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} – ${filePath}`);
    }
    const svg = await resp.text();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  })();

  imgCache.set(filePath, p);
  return p;
}

/*──────────────────────────────────────────────────────────────
  2. Draw a card (returns after it’s painted)
──────────────────────────────────────────────────────────────*/
export async function drawCard(card, x, y, isSelected = false) {
  if (!ctx) return;

  const fileName = card.isFaceUp
    ? `${card.leagueCode}_${card.rank}_${card.clubId}.svg`.toLowerCase() // Convert to lowercase
    : 'card_back.svg';

  const filePath = card.isFaceUp
    ? `assets/cards/${state.selectedEra}/${fileName}`
    : `assets/cards/card_back.svg`;

  try {
    const img = await loadSvgAsImage(filePath);

    ctx.drawImage(img, x, y, layout.CARD_WIDTH, layout.CARD_HEIGHT);

    if (isSelected) {
      ctx.save();
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth   = 4 * layout.scaleFactor;
      ctx.strokeRect(x, y, layout.CARD_WIDTH, layout.CARD_HEIGHT);
      ctx.restore();
    }
  } catch (err) {
    console.error(err);
  }
}

/*──────────────────────────────────────────────────────────────
  3. Helpers for empty piles
──────────────────────────────────────────────────────────────*/
function drawEmptyPile(x, y, text = '') {
  if (!ctx) return;
  ctx.save();

  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth   = 2 * layout.scaleFactor;
  ctx.setLineDash([6 * layout.scaleFactor, 6 * layout.scaleFactor]);

  ctx.beginPath();
  ctx.roundRect(x, y, layout.CARD_WIDTH, layout.CARD_HEIGHT, 3 * layout.scaleFactor);
  ctx.stroke();
  ctx.setLineDash([]);

  if (text) {
    ctx.fillStyle = 'rgba(255,255,150,0.6)';
    const fs = Math.max(16, Math.floor(20 * layout.scaleFactor));
    ctx.font = `${fs}px 'Press Start 2P', cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + layout.CARD_WIDTH / 2, y + layout.CARD_HEIGHT / 2);
  }
  ctx.restore();
}

/*──────────────────────────────────────────────────────────────
  4. Main board renderer (async)
──────────────────────────────────────────────────────────────*/
export async function drawGameBoard() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /*── Stock ─────────────────────────────────────────────────*/
  if (state.stock.length) {
    await drawCard(
      { ...state.stock.at(-1), isFaceUp: false },
      layout.STOCK_X, layout.STOCK_Y
    );
    ctx.fillStyle = 'white';
    const fs = Math.max(8, 12 * layout.scaleFactor);
    ctx.font = `${fs}px 'Press Start 2P', cursive`;
    ctx.textAlign = 'center';
    ctx.fillText(
      state.stock.length,
      layout.STOCK_X + layout.CARD_WIDTH / 2,
      layout.STOCK_Y + layout.CARD_HEIGHT + 12 * layout.scaleFactor
    );
  } else {
    drawEmptyPile(layout.STOCK_X, layout.STOCK_Y, '♻');
  }

  /*── Waste ────────────────────────────────────────────────*/
  if (state.waste.length) {
    const wTop = state.waste.at(-1);
    const sel  = state.selectedCardInfo?.pileType === 'waste';
    await drawCard(wTop, layout.WASTE_X, layout.WASTE_Y, sel);
  } else {
    drawEmptyPile(layout.WASTE_X, layout.WASTE_Y);
  }

  /*── Foundations ──────────────────────────────────────────*/
  for (let i = 0; i < state.foundations.length; i++) {
    const x = layout.FOUNDATION_START_X +
              i * (layout.CARD_WIDTH + layout.HORIZONTAL_SPACING);
    const y = layout.FOUNDATION_Y;
    const pile = state.foundations[i];

    if (pile.length) {
      await drawCard(pile.at(-1), x, y);
    } else {
      drawEmptyPile(x, y, leagueAbbr[leagues[i]]);
    }
  }

  /*── Tableau ──────────────────────────────────────────────*/
  for (let p = 0; p < state.tableau.length; p++) {
    const pile   = state.tableau[p];
    const pileX  = layout.TABLEAU_START_X +
                   p * (layout.CARD_WIDTH + layout.HORIZONTAL_SPACING);
    const baseY  = layout.TABLEAU_Y;

    if (!pile.length) {
      drawEmptyPile(pileX, baseY);
      continue;
    }

    for (let c = 0; c < pile.length; c++) {
      const card = pile[c];
      const y    = baseY + c * layout.TABLEAU_STACK_OFFSET;
      const isSel = state.selectedCardInfo &&
                    state.selectedCardInfo.pileType  === 'tableau' &&
                    state.selectedCardInfo.pileIndex === p &&
                    c >= state.selectedCardInfo.cardIndex;

      await drawCard(card, pileX, y, isSel);
    }
  }
}