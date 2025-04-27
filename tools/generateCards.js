#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import sharp from 'sharp'; // ⇦ comment-out if SVG only

// 🚚 import your master file (the one we built in Canvas)
import { buildDeck, createCardSVG } from './cardGenerator.js';

// ────────── CLI args ──────────
const { era, out, png } = yargs(hideBin(process.argv))
  .option('era', { choices: ['modern', '2010s', '2000s'], default: 'modern' })
  .option('out', { type: 'string', default: './dist/cards' })
  .option('png', { type: 'boolean', default: false })
  .argv;

// ────────── generate folder ──────────
fs.mkdirSync(out, { recursive: true });

// ────────── loop deck ──────────
const deck = buildDeck(era); // Uses the updated buildDeck function
for (const card of deck) {
    const fileName = `${card.leagueCode}_${card.rank}_${card.clubId}.svg`.toLowerCase(); // Ensure lowercase filenames
    const svg = createCardSVG(card, { width: 300, height: 450, isFaceUp: true }); // Front of the card
    const savePath = path.join(out, fileName);

    fs.writeFileSync(savePath, svg, 'utf8');

    if (png) {
        const pngPath = savePath.replace(/svg$/i, 'png');
        await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(pngPath);
    }
}

console.log(`✅  Generated ${deck.length} ${png ? 'SVG+PNG' : 'SVG'} files to ${out}`);
