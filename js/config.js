// config.js
// Game configuration constants

export const leagues = ["England", "Spain", "Italy", "Germany"];
export const leagueAbbr   = { England:'PL', Spain:'LL', Italy:'SA', Germany:'BL' };
export const leagueColors = { England:'#3D195B', Spain:'#EE3224', Italy:'#005BAC', Germany:'#DAA520' };

export const ranks       = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
export const rankValues  = { A:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, J:11, Q:12, K:13 };

export const BASE_CANVAS_WIDTH = 900;
export const BASE_CARD_WIDTH = 80;
export const BASE_CARD_HEIGHT = 115;
export const BASE_PADDING = 15;
export const BASE_HORIZONTAL_SPACING = 15;
export const BASE_VERTICAL_SPACING = 20;
export const BASE_TABLEAU_STACK_OFFSET = 35; // Reduced from 50 to 35

export const DOUBLE_CLICK_THRESHOLD = 400; // milliseconds


export const clubKits = {
    /* ── England ───────────────────────────────────────────── */
    England: [
        { id:'C1',  code:'MCI', col:'#6CABDD' }, // Manchester City – sky-blue
        { id:'C2',  code:'ARS', col:'#EF0107' }, // Arsenal – red
        { id:'C3',  code:'LIV', col:'#C8102E' }, // Liverpool – red
        { id:'C4',  code:'TOT', col:'#FFFFFF' }, // Tottenham – white
        { id:'C5',  code:'CHE', col:'#034694' }, // Chelsea – royal blue
        { id:'C6', code:'MUN', col:'#DA291C' },   // Manchester Utd – red  
        { id:'C7',  code:'AVL', col:'#670E36' }, // Aston Villa – claret
        { id:'C8',  code:'BHA', col:'#0057B8' }, // Brighton – blue
        { id:'C9',  code:'WOL', col:'#FDB913' }, // Wolves – old-gold
        { id:'C10', code:'WHU', col:'#7A263A' }, // West Ham – claret
        { id:'C11', code:'BRE', col:'#E30613' }, // Brentford – red
        { id:'C12', code:'NEW', col:'#000000' },   // Newcastle – black/white
        { id:'C13', code:'EVE', col:'#003399' }  // Everton – royal blue
    ],
  
    /* ── Spain ─────────────────────────────────────────────── */
    Spain: [
      { id:'C1', code:'RMA', col:'#FFFFFF' },  // Real Madrid
      { id:'C2', code:'BAR', col:'#004D98' },  // Barcelona (blaugrana blue)
      { id:'C3', code:'ATM', col:'#C8102E' },  // Atlético
      { id:'C4', code:'ATH', col:'#EE2737' },  // Athletic Club
      { id:'C5', code:'RSO', col:'#005BAC' },  // Real Sociedad
      { id:'C6', code:'SEV', col:'#FFFFFF' },  // Sevilla
      { id:'C7', code:'BET', col:'#00954C' },  // Real Betis
      { id:'C8', code:'VIL', col:'#FFF200' },  // Villarreal – yellow
      { id:'C9', code:'VAL', col:'#F18E00' },  // Valencia – orange
      { id:'C10',code:'CEL', col:'#00A0E9' },  // Celta Vigo – sky-blue
      { id:'C11',code:'GIR', col:'#FF0000' },  // Girona
      { id:'C12',code:'GET', col:'#004B8D' },  // Getafe
      { id:'C13',code:'OSA', col:'#B51A35' }   // Osasuna
    ],
  
    /* ── Italy ─────────────────────────────────────────────── */
    Italy: [
      { id:'C1', code:'INT', col:'#005BAC' },  // Inter – blue/black
      { id:'C2', code:'ACM', col:'#AC1A2F' },  // AC Milan – red/black
      { id:'C3', code:'JUV', col:'#000000' },  // Juventus – black/white
      { id:'C4', code:'NAP', col:'#007BCC' },  // Napoli – azure
      { id:'C5', code:'ROM', col:'#8E2F2D' },  // Roma – maroon
      { id:'C6', code:'LAZ', col:'#A0DFF0' },  // Lazio – sky-blue
      { id:'C7', code:'ATA', col:'#0051A2' },  // Atalanta – blue/black
      { id:'C8', code:'FIO', col:'#5B0CB3' },  // Fiorentina – purple
      { id:'C9', code:'BOL', col:'#C8102E' },  // Bologna – red/blue
      { id:'C10',code:'TOR', col:'#7F0016' },  // Torino – maroon
      { id:'C11',code:'MON', col:'#FF2A2A' },  // Monza – red
      { id:'C12',code:'UDI', col:'#231F20' },  // Udinese – black/white
      { id:'C13',code:'GEN', col:'#004D98' }   // Genoa – blue/red
    ],
  
    /* ── Germany ───────────────────────────────────────────── */
    Germany: [
      { id:'C1', code:'BMU', col:'#DC052D' },  // Bayern Munich – red
      { id:'C2', code:'BVB', col:'#FDE100' },  // Dortmund – yellow
      { id:'C3', code:'RBL', col:'#E4002B' },  // RB Leipzig – red/white
      { id:'C4', code:'B04', col:'#E32219' },  // Leverkusen – red/black
      { id:'C5', code:'FCU', col:'#D00027' },  // Union Berlin – red
      { id:'C6', code:'WOB', col:'#77C043' },  // Wolfsburg – green
      { id:'C7', code:'SGE', col:'#000000' },  // Eintracht – black/red
      { id:'C8', code:'TSG', col:'#0059B3' },  // Hoffenheim – blue
      { id:'C9', code:'SCF', col:'#ED1C24' },  // Freiburg – red
      { id:'C10',code:'VFB', col:'#FFFFFF' },  // Stuttgart – white/red
      { id:'C11',code:'M05', col:'#C8102E' },  // Mainz 05 – red
      { id:'C12',code:'SVW', col:'#008557' },  // Werder Bremen – green
      { id:'C13',code:'FCA', col:'#00563F' }   // Augsburg – green/red
    ]
  };
  

const deckModern = {
  England: [
    { rank:'A', iconicNumber:1,  clubId:'C3',  player:'Alisson Beker',     flag:'🇧🇷' },
    { rank:'2', iconicNumber:2,  clubId:'C1',  player:'Kyle Walkar',       flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'3', iconicNumber:3,  clubId:'C3',  player:'Virgil Van Dyke',   flag:'🇳🇱' },
    { rank:'4', iconicNumber:4,  clubId:'C1',  player:'Phil Fodan',        flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'5', iconicNumber:5,  clubId:'C1',  player:'John Stons',        flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'6', iconicNumber:6,  clubId:'C5',  player:'Thiago Silvo',      flag:'🇧🇷' },
    { rank:'7', iconicNumber:7,  clubId:'C2',  player:'Bukari Sako',       flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'8', iconicNumber:8,  clubId:'C6',  player:'Bruno Ferandes',    flag:'🇵🇹' },
    { rank:'9', iconicNumber:9,  clubId:'C3',  player:'Darwin Nunez',      flag:'🇺🇾' },
    { rank:'10',iconicNumber:10, clubId:'C6', player:'Marcus Rashferd',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'J', iconicNumber:11, clubId:'C2',  player:'Gabriel Martineli', flag:'🇧🇷' },
    { rank:'Q', iconicNumber:12, clubId:'C2', player:'William Saliba',    flag:'🇫🇷' },
    { rank:'K', iconicNumber:17, clubId:'C1',  player:'Kevin De Bruyne',   flag:'🇧🇪' }
  ],
  Spain: [
    { rank:'A', iconicNumber:1,  clubId:'C1',  player:'Tibo Cortois',      flag:'🇧🇪' },
    { rank:'2', iconicNumber:2,  clubId:'C1',  player:'Dani Carvajal',     flag:'🇪🇸' },
    { rank:'3', iconicNumber:3,  clubId:'C2',  player:'Ronald Arajo',      flag:'🇺🇾' },
    { rank:'4', iconicNumber:4,  clubId:'C3',  player:'Koke',             flag:'🇪🇸' },
    { rank:'5', iconicNumber:5,  clubId:'C1',  player:'Jude Billingham',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'6', iconicNumber:6,  clubId:'C5',  player:'Mikel Merino',      flag:'🇪🇸' },
    { rank:'7', iconicNumber:7,  clubId:'C3',  player:'Anton Grezman',     flag:'🇫🇷' },
    { rank:'8', iconicNumber:8,  clubId:'C2',  player:'Pedri',             flag:'🇪🇸' },
    { rank:'9', iconicNumber:9,  clubId:'C4',  player:'Inaki William',     flag:'🇬🇭' },
    { rank:'10',iconicNumber:10, clubId:'C10', player:'Iago Aspas',        flag:'🇪🇸' },
    { rank:'J', iconicNumber:11, clubId:'C1',  player:'Rodrygo Gues',      flag:'🇧🇷' },
    { rank:'Q', iconicNumber:12, clubId:'C1',  player:'Eduardo Camavina',  flag:'🇫🇷' },
    { rank:'K', iconicNumber:22, clubId:'C2',  player:'Ilkay Gundogan',    flag:'🇩🇪' }
  ],
  Italy: [
    { rank:'A', iconicNumber:1,  clubId:'C4',  player:'Alex Merret',          flag:'🇮🇹' },
    { rank:'2', iconicNumber:2,  clubId:'C2',  player:'Davide Kalabria',      flag:'🇮🇹' },
    { rank:'3', iconicNumber:3,  clubId:'C3',  player:'Gleison Bremer',       flag:'🇧🇷' },
    { rank:'4', iconicNumber:4,  clubId:'C3',  player:'Federico Gatti',       flag:'🇮🇹' },
    { rank:'5', iconicNumber:5,  clubId:'C5',  player:'Manuel Locateli',      flag:'🇮🇹' },
    { rank:'6', iconicNumber:6,  clubId:'C5',  player:'Chris Smalling',       flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'7', iconicNumber:7,  clubId:'C3',  player:'Federico Chiesa',      flag:'🇮🇹' },
    { rank:'8', iconicNumber:8,  clubId:'C2',  player:'Ruben Loftus-Chiek',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'9', iconicNumber:9,  clubId:'C4',  player:'Victor Oshimen',       flag:'🇳🇬' },
    { rank:'10',iconicNumber:10, clubId:'C2',  player:'Rafael Leon',          flag:'🇵🇹' },
    { rank:'J', iconicNumber:10, clubId:'C1',  player:'Lautaro Martines',     flag:'🇦🇷' },
    { rank:'Q', iconicNumber:21, clubId:'C5',  player:'Paulo Dybola',         flag:'🇦🇷' },
    { rank:'K', iconicNumber:22, clubId:'C1',  player:'Nicolo Barelo',        flag:'🇮🇹' }
  ],
  Germany: [
    { rank:'A', iconicNumber:1,  clubId:'C1',  player:'Manuel Noyer',         flag:'🇩🇪' },
    { rank:'2', iconicNumber:2,  clubId:'C1',  player:'Dayot Upameceno',      flag:'🇫🇷' },
    { rank:'3', iconicNumber:3,  clubId:'C1',  player:'Kim Minjae',           flag:'🇰🇷' },
    { rank:'4', iconicNumber:4,  clubId:'C1',  player:'Mattias de Ligt',      flag:'🇳🇱' },
    { rank:'5', iconicNumber:5,  clubId:'C2',  player:'Niklas Sule',          flag:'🇩🇪' },
    { rank:'6', iconicNumber:6,  clubId:'C1',  player:'Joshua Kimmich',       flag:'🇩🇪' },
    { rank:'7', iconicNumber:7,  clubId:'C1',  player:'Serge Gnabry',         flag:'🇩🇪' },
    { rank:'8', iconicNumber:8,  clubId:'C1',  player:'Leon Goretzka',        flag:'🇩🇪' },
    { rank:'9', iconicNumber:9,  clubId:'C1',  player:'Harry Kain',           flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'10',iconicNumber:10, clubId:'C1', player:'Leroy Sane',           flag:'🇩🇪' },
    { rank:'J', iconicNumber:42, clubId:'C1',  player:'Jamal Musiala',        flag:'🇩🇪' },
    { rank:'Q', iconicNumber:10, clubId:'C4',  player:'Florian Wirtz',        flag:'🇩🇪' },
    { rank:'K', iconicNumber:25, clubId:'C1',  player:'Thomas Muller',        flag:'🇩🇪' }
  ]
};


const deck2010s = {
  England: [
    { rank:'A', iconicNumber:1, clubId:'C2', player:'David Seeman',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'2', iconicNumber:2, clubId:'C6', player:'Gary Nevile',       flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'3', iconicNumber:3, clubId:'C6', player:'Patrice Evara',     flag:'🇫🇷' },
    { rank:'4', iconicNumber:4, clubId:'C3', player:'Steven Gerard',     flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'5', iconicNumber:5, clubId:'C6', player:'Rio Ferdinand',     flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'6', iconicNumber:6, clubId:'C5', player:'John Terry',        flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'7', iconicNumber:7, clubId:'C6', player:'David Beckam',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'8', iconicNumber:8, clubId:'C5', player:'Frank Lampart',     flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'9', iconicNumber:9, clubId:'C6', player:'Wayne Roonie',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'10',iconicNumber:10,clubId:'C2', player:'Robin van Persie',  flag:'🇳🇱' },
    { rank:'J', iconicNumber:11,clubId:'C6', player:'Ryan Giggs',        flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'Q', iconicNumber:12,clubId:'C2', player:'Thierry Anri',      flag:'🇫🇷' },
    { rank:'K', iconicNumber:7, clubId:'C6', player:'Cristiano Ranaldo', flag:'🇵🇹' }
  ],
 Spain : [
    { rank:'A',  iconicNumber: 1,  clubId:'C1', player:'Iker Casilas',       flag:'🇪🇸' },
    { rank:'2',  iconicNumber: 2,  clubId:'C2', player:'Dani Alvez',         flag:'🇧🇷' },
    { rank:'3',  iconicNumber: 3,  clubId:'C2', player:'Gerard Piquet',      flag:'🇪🇸' },
    { rank:'4',  iconicNumber: 4,  clubId:'C1', player:'Sergio Ramas',       flag:'🇪🇸' },
    { rank:'5',  iconicNumber: 5,  clubId:'C2', player:'Carles Puyol',       flag:'🇪🇸' },
    { rank:'6',  iconicNumber: 6,  clubId:'C2', player:'Xavi Hernandes',     flag:'🇪🇸' },
    { rank:'7',  iconicNumber: 7,  clubId:'C1', player:'Raul Gonzales',      flag:'🇪🇸' },
    { rank:'8',  iconicNumber: 8,  clubId:'C2', player:'Andres Inesta',      flag:'🇪🇸' },
    { rank:'9',  iconicNumber: 9,  clubId:'C3', player:'Fernando Torrez',    flag:'🇪🇸' },
    { rank:'10', iconicNumber:10,  clubId:'C2', player:'Lionel Massi',       flag:'🇦🇷' },
    { rank:'J',  iconicNumber:11,  clubId:'C2', player:'Neymar Junio',       flag:'🇧🇷' },
    { rank:'Q',  iconicNumber:12,  clubId:'C1', player:'Marcelo Viera',      flag:'🇧🇷' },
    { rank:'K',  iconicNumber: 7,  clubId:'C1', player:'Cristiano Ranaldo',  flag:'🇵🇹' }
  ],
  
  Italy : [
    { rank:'A',  iconicNumber: 1,  clubId:'C3', player:'Gianluigi Buffen',   flag:'🇮🇹' },
    { rank:'2',  iconicNumber: 2,  clubId:'C2', player:'Mattia De Sciglo',   flag:'🇮🇹' },
    { rank:'3',  iconicNumber: 3,  clubId:'C3', player:'Giorgio Chiellino',  flag:'🇮🇹' },
    { rank:'4',  iconicNumber: 4,  clubId:'C1', player:'Javier Zaneti',      flag:'🇦🇷' },
    { rank:'5',  iconicNumber: 5,  clubId:'C4', player:'Fabio Canavaro',     flag:'🇮🇹' },
    { rank:'6',  iconicNumber: 6,  clubId:'C5', player:'Marco Verati',       flag:'🇮🇹' },
    { rank:'7',  iconicNumber: 7,  clubId:'C8', player:'Franck Ribery',      flag:'🇫🇷' },
    { rank:'8',  iconicNumber: 8,  clubId:'C2', player:'Gennaro Gatuso',     flag:'🇮🇹' },
    { rank:'9',  iconicNumber: 9,  clubId:'C2', player:'Filippo Inzagi',     flag:'🇮🇹' },
    { rank:'10', iconicNumber:10,  clubId:'C5', player:'Francesco Totti',    flag:'🇮🇹' },
    { rank:'J',  iconicNumber:21,  clubId:'C3', player:'Andrea Pirlo',       flag:'🇮🇹' },
    { rank:'Q',  iconicNumber:10,  clubId:'C3', player:'Alessandro Del Piero',flag:'🇮🇹' },
    { rank:'K',  iconicNumber:22,  clubId:'C1', player:'Diego Milito',       flag:'🇦🇷' }
  ],
  
  Germany : [
    { rank:'A',  iconicNumber: 1,  clubId:'C1', player:'Manuel Noyer',       flag:'🇩🇪' },
    { rank:'2',  iconicNumber:21,  clubId:'C1', player:'Philipp Lam',        flag:'🇩🇪' },
    { rank:'3',  iconicNumber:15,  clubId:'C2', player:'Mats Hummels',       flag:'🇩🇪' },
    { rank:'4',  iconicNumber:17,  clubId:'C1', player:'Jerome Boatang',     flag:'🇩🇪' },
    { rank:'5',  iconicNumber: 7,  clubId:'C1', player:'Bastian Schweinsteigr',flag:'🇩🇪' },
    { rank:'6',  iconicNumber: 6,  clubId:'C10', player:'Sami Khedira',       flag:'🇩🇪' },
    { rank:'7',  iconicNumber:10,  clubId:'C12', player:'Mesut Oezil',        flag:'🇩🇪' },
    { rank:'8',  iconicNumber: 8,  clubId:'C1', player:'Toni Kros',          flag:'🇩🇪' },
    { rank:'9',  iconicNumber:11,  clubId:'C10',player:'Miroslav Klose',     flag:'🇩🇪' },
    { rank:'10', iconicNumber:11,  clubId:'C2', player:'Marco Reuz',         flag:'🇩🇪' },
    { rank:'J',  iconicNumber:33,  clubId:'C10',player:'Mario Gomezz',       flag:'🇩🇪' },
    { rank:'Q',  iconicNumber:10,  clubId:'C10',player:'Lukas Podolsky',     flag:'🇩🇪' },
    { rank:'K',  iconicNumber:25,  clubId:'C1', player:'Thomas Muller',      flag:'🇩🇪' }
  ],
  
};

const deck2000s = {
  England: [
    { rank:'A', iconicNumber:1, clubId:'C2', player:'David Seeman',    flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'2', iconicNumber:2, clubId:'C6', player:'Gary Nevile',     flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'3', iconicNumber:3, clubId:'C5', player:'Ashley Cole',     flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'4', iconicNumber:4, clubId:'C3', player:'Steven Gerard',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'5', iconicNumber:5, clubId:'C6', player:'Rio Ferdinand',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'6', iconicNumber:6, clubId:'C5', player:'John Terry',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'7', iconicNumber:7, clubId:'C6', player:'David Beckam',    flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'8', iconicNumber:8, clubId:'C5', player:'Frank Lampart',   flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'9', iconicNumber:9, clubId:'C5', player:'Alan Shearer',    flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'10',iconicNumber:10,clubId:'C2', player:'Michael Owen',    flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'J', iconicNumber:11,clubId:'C6', player:'Ryan Giggs',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'Q', iconicNumber:18, clubId:'C6', player:'Paul Scholes', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { rank:'K', iconicNumber:7, clubId:'C6', player:'Cristiano Ranaldo',flag:'🇵🇹' }
  ],

Spain : [
    { rank:'A',  iconicNumber: 1,  clubId:'C1',  player:'Iker Casilas',      flag:'🇪🇸' },
    { rank:'2',  iconicNumber: 2,  clubId:'C2',  player:'Dani Alvez',        flag:'🇧🇷' },
    { rank:'3',  iconicNumber: 3,  clubId:'C2',  player:'Carles Puyol',      flag:'🇪🇸' },
    { rank:'4',  iconicNumber: 4,  clubId:'C1',  player:'Sergio Ramas',      flag:'🇪🇸' },
    { rank:'5',  iconicNumber: 5,  clubId:'C1',  player:'Zinedine Zedane',   flag:'🇫🇷' },
    { rank:'6',  iconicNumber: 6,  clubId:'C2',  player:'Xavi Hernandes',    flag:'🇪🇸' },
    { rank:'7',  iconicNumber: 7,  clubId:'C1',  player:'Raul Gonzales',     flag:'🇪🇸' },
    { rank:'8',  iconicNumber: 8,  clubId:'C2',  player:'Andres Inesta',     flag:'🇪🇸' },
    { rank:'9',  iconicNumber: 9,  clubId:'C1',  player:'Ronaldo Nazario',   flag:'🇧🇷' },
    { rank:'10', iconicNumber:10,  clubId:'C2',  player:'Ronaldinho Gaucho', flag:'🇧🇷' },
    { rank:'J',  iconicNumber:11,  clubId:'C3',  player:'Fernando Torrez',   flag:'🇪🇸' },
    { rank:'Q',  iconicNumber:12,  clubId:'C1',  player:'Roberto Carlos',    flag:'🇧🇷' },
    { rank:'K',  iconicNumber:19,  clubId:'C2',  player:'Lionel Massi',      flag:'🇦🇷' }
  ],
  
 Italy : [
    { rank:'A',  iconicNumber: 1,  clubId:'C3',  player:'Gianluigi Buffen',  flag:'🇮🇹' },
    { rank:'2',  iconicNumber: 2,  clubId:'C2',  player:'Cafu',              flag:'🇧🇷' },
    { rank:'3',  iconicNumber: 3,  clubId:'C2',  player:'Paolo Maldini',     flag:'🇮🇹' },
    { rank:'4',  iconicNumber: 4,  clubId:'C1',  player:'Javier Zaneti',     flag:'🇦🇷' },
    { rank:'5',  iconicNumber:13,  clubId:'C2',  player:'Alessandro Nesta',  flag:'🇮🇹' },
    { rank:'6',  iconicNumber: 8,  clubId:'C5',  player:'Gennaro Gatuso',    flag:'🇮🇹' },
    { rank:'7', iconicNumber:7, clubId:'C2', player:'Andriy Shevchenko', flag:'🇺🇦' },
    { rank:'8',  iconicNumber:22,  clubId:'C2',  player:'Kaka',              flag:'🇧🇷' },
    { rank:'9',  iconicNumber: 9,  clubId:'C2',  player:'Filippo Inzagi',    flag:'🇮🇹' },
    { rank:'10', iconicNumber:10,  clubId:'C5',  player:'Francesco Totti',   flag:'🇮🇹' },
    { rank:'J',  iconicNumber:21,  clubId:'C3',  player:'Andrea Pirlo',      flag:'🇮🇹' },
    { rank:'Q',  iconicNumber:11,  clubId:'C1',  player:'Hernan Crespo',     flag:'🇦🇷' },
    { rank:'K',  iconicNumber: 7,  clubId:'C3',  player:'Alessandro Del Piero',flag:'🇮🇹' }
  ],
  
  Germany : [
    { rank:'A',  iconicNumber: 1,  clubId:'C1',  player:'Oliver Kahn',        flag:'🇩🇪' },
    { rank:'2',  iconicNumber: 2,  clubId:'C1',  player:'Willy Sagnol',       flag:'🇫🇷' },
    { rank:'3',  iconicNumber: 3,  clubId:'C1',  player:'Lucio',              flag:'🇧🇷' },
    { rank:'4',  iconicNumber: 4,  clubId:'C1',  player:'Samuel Kuffour',     flag:'🇬🇭' },
    { rank:'5',  iconicNumber:13,  clubId:'C2',  player:'Michael Ballack',    flag:'🇩🇪' },
    { rank:'6',  iconicNumber: 6,  clubId:'C1',  player:'Bixente Lizarazu',   flag:'🇫🇷' },
    { rank:'7',  iconicNumber: 7,  clubId:'C1',  player:'Mehmet Scholl',      flag:'🇩🇪' },
    { rank:'8',  iconicNumber: 8,  clubId:'C12', player:'Thorsten Frings',    flag:'🇩🇪' },
    { rank:'9',  iconicNumber:11,  clubId:'C1',  player:'Miroslav Klose',     flag:'🇩🇪' },
    { rank:'10', iconicNumber:10,  clubId:'C1', player:'Lukas Podolsky',     flag:'🇩🇪' },
    { rank:'J',  iconicNumber:25,  clubId:'C1',  player:'Thomas Muller',      flag:'🇩🇪' },
    { rank:'Q',  iconicNumber:21,  clubId:'C1',  player:'Philipp Lahm',       flag:'🇩🇪' },
    { rank:'K',  iconicNumber:31,  clubId:'C1',  player:'Bastian Schweinsteigr',flag:'🇩🇪' }
  ],
  
};

/* bundle the eras */
export const eraDecks = { 'modern': deckModern, '2010s': deck2010s, '2000s': deck2000s };
