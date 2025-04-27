import { leagues, leagueAbbr, leagueColors, rankValues, clubKits, eraDecks } from '../js/config.js';

export function buildDeck(era = 'modern') {
    const pool = eraDecks[era];
    if (!pool) throw new Error(`Unknown era "${era}"`);

    const deck = [];

    for (const league of leagues) {
        const cards = pool[league];
        if (!Array.isArray(cards)) {
            throw new Error(`Era "${era}" missing cards for league "${league}"`);
        }

        for (const raw of cards) {
            const clubInfo = clubKits[league].find(c => c.id === raw.clubId) || {};
            const card = {
                era,
                league,
                leagueCode: leagueAbbr[league],
                leagueColor: leagueColors[league],
                rank: raw.rank,
                value: rankValues[raw.rank],
                iconicNumber: raw.iconicNumber,
                flag: raw.flag,
                clubId: raw.clubId,
                clubCode: clubInfo.code || 'UNK',
                clubColor: clubInfo.col || '#777',
                player: raw.player,
                isFaceUp: false, // Default state
            };
            deck.push(card);
        }
    }
    return deck;
}

export function createCardSVG(card, { width = 300, height = 450, isFaceUp = true } = {}) {
    const pad = 20;
    const radius = 24;
    const jerseyY = height * 0.26;
    const jerseyH = height * 0.42;
    const jerseyW = width * 0.55;
    const jerseyX = (width - jerseyW) / 2;
    const fontCorner = Math.round(height * 0.13);
    const fontNumber = Math.round(height * 0.24);
    const fontPlayer = Math.round(height * 0.08); // Font size for player name
    const fontTag = Math.round(height * 0.07); // Font size for league code

    if (!isFaceUp) {
        // Back of the card with logo
        return /* svg */ `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      .frame { fill:#FDFCFB; stroke:#02172F; stroke-width:${radius / 4}; }
    </style>
  </defs>

  <!-- card frame -->
  <rect x="0" y="0" rx="${radius}" ry="${radius}" width="${width}" height="${height}"
        class="frame"/>

  <!-- logo as the back of the card -->
  <image href="logo.png" x="10%" y="10%" width="80%" height="80%" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
    }

    // Determine the color of the number based on the t-shirt color
    const numberColor = card.clubColor === '#FFFFFF' ? card.leagueColor : '#FFF';

    // Front of the card
    return /* svg */ `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      .frame  { fill:#FDFCFB; stroke:#02172F; stroke-width:${radius / 4}; }
      .corner { font-family:'Kdam Thmor Pro',sans-serif; font-size:${fontCorner}px; font-weight:700; }
      .tag    { font-family:'Montserrat',sans-serif; font-size:${fontTag}px; font-weight:700;
                letter-spacing:1.5px; fill:${card.leagueColor}; } /* League color applied here */
      .number { font-family:'Bebas Neue',sans-serif; font-size:${fontNumber}px; font-weight:900;
                text-anchor:middle; fill:${numberColor}; }
      .player { font-family:'Montserrat',sans-serif; font-size:${fontPlayer}px; font-weight:700;
                text-anchor:middle; fill:#02172F; }
    </style>
  </defs>

  <!-- card frame -->
  <rect x="0" y="0" rx="${radius}" ry="${radius}" width="${width}" height="${height}"
        class="frame"/>

  <!-- halftone background -->
  <rect x="0" y="0" width="${width}" height="${height}"
        fill="url(#dots)" opacity="0.15"/>

  <!-- top-left rank / top-right flag -->
  <text x="${pad}"           y="${pad + fontCorner}"     class="corner" fill="#02172F">${card.rank}</text>
  <text x="${width - pad}"   y="${pad + fontCorner}"     class="corner" fill="#02172F"
        text-anchor="end">${card.flag}</text>

  <!-- back-view jersey -->
  <g transform="translate(${jerseyX},${jerseyY})">
    <!-- body -->
    <rect x="0" y="0" width="${jerseyW}" height="${jerseyH}" rx="${radius / 2}"
          fill="${card.clubColor}" stroke="#02172F" stroke-width="${radius / 6}"/>
    <!-- sleeves -->
    <rect x="-${jerseyW * 0.23}" y="${jerseyH * 0.12}" width="${jerseyW * 0.23}" height="${jerseyH * 0.28}"
          fill="${card.clubColor}" stroke="#02172F" stroke-width="${radius / 6}"/>
    <rect x="${jerseyW}" y="${jerseyH * 0.12}" width="${jerseyW * 0.23}" height="${jerseyH * 0.28}"
          fill="${card.clubColor}" stroke="#02172F" stroke-width="${radius / 6}"/>
    <!-- sleeve stripes (club colour) -->
    <rect x="-${jerseyW * 0.23}" y="${jerseyH * 0.24}" width="${jerseyW * 0.23}" height="${jerseyH * 0.07}"
          fill="${card.leagueColor}"/>
    <rect x="${jerseyW}" y="${jerseyH * 0.24}" width="${jerseyW * 0.23}" height="${jerseyH * 0.07}"
          fill="${card.leagueColor}"/>
    <!-- number -->
    <text x="${jerseyW / 2}" y="${jerseyH * 0.70}" class="number">${card.iconicNumber}</text>
  </g>

  <!-- player name -->
  <text x="${width / 2}" y="${jerseyY + jerseyH + fontPlayer * 1.5}" class="player">${card.player}</text>

  <!-- bottom tags -->
  <text x="${pad}"           y="${height - pad}" class="tag">${card.leagueCode}</text>
  <text x="${width - pad}"   y="${height - pad}" class="tag"
        text-anchor="end">${card.clubCode}</text>

  <!-- tiny dots pattern for manga feel -->
  <defs>
    <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#02172F"/>
    </pattern>
  </defs>
</svg>`;
}
