// gameLogic.js
import * as state from './state.js';
import { leagues, ranks, rankValues, leagueColors, leagueAbbr, eraDecks, clubKits } from './config.js';
import { setMessage } from './dom.js';
import { drawGameBoard } from './drawing.js';
import { updateScore } from './main.js';


function createDeck(era) {
    state.deck.length = 0; // Clear the deck

    const eraData = eraDecks[era]; // Get the data for the selected era
    if (!eraData) {
        console.error(`Era "${era}" not found in configuration.`);
        return;
    }

    for (const league of leagues) {
        const leagueCards = eraData[league]; // Get cards for the league
        if (!leagueCards) {
            console.warn(`No cards found for league "${league}" in era "${era}".`);
            continue;
        }

        for (const cardData of leagueCards) {
            const clubInfo = clubKits[league].find(c => c.id === cardData.clubId) || {};
            state.deck.push({
                rank: cardData.rank,
                league: league,
                value: rankValues[cardData.rank],
                clubId: cardData.clubId,
                flag: cardData.flag,
                leagueCode: leagueAbbr[league],
                leagueColor: leagueColors[league],
                clubCode: clubInfo.code || 'UNK',
                clubColor: clubInfo.col || '#777',
                iconicNumber: cardData.iconicNumber,
                player: cardData.player,
                isFaceUp: false,
                id: `${cardData.rank}-${league}-${cardData.clubId}`
            });
        }
    }
}


function shuffleDeck() {
    // This works because it modifies the array elements, not the array reference itself
    for (let i = state.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.deck[i], state.deck[j]] = [state.deck[j], state.deck[i]];
    }
}

export function dealCards() {
    if (!state.selectedEra) {
        console.error("Cannot deal cards, no era selected.");
        return;
    }

    state.resetGameState();
    setMessage('');

    createDeck(state.selectedEra);
    shuffleDeck();

    // Deal to tableau
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            const card = state.deck.pop();
            if (!card) continue;
            if (j === i) {
                card.isFaceUp = true;
            }
            state.tableau[j].push(card);
        }
    }

    const remainingCards = state.deck.map(card => ({ ...card, isFaceUp: false }));
    state.stock.length = 0; // Clear existing stock
    state.stock.push(...remainingCards); // Add new cards
    state.deck.length = 0; // Clear the deck array

    state.setIsGameActive(true); // Game is now active
}

export function drawStock() {
    if (state.stock.length > 0) {
        // .pop() modifies the original array - OK
        const card = state.stock.pop();
        if (card) {
            card.isFaceUp = true;
            // .push() modifies the original array - OK
            state.waste.push(card);
        }
    } else if (state.waste.length > 0) {
        // Recycle waste back to stock
        // This reassignment is also problematic!
        // state.stock = state.waste.reverse(); // <-- PROBLEM

        // --- FIX for stock reassignment in drawStock ---
        const recycledWaste = state.waste.reverse();
        recycledWaste.forEach(card => card.isFaceUp = false);
        state.stock.length = 0; // Clear existing stock
        state.stock.push(...recycledWaste); // Add recycled cards
        state.waste.length = 0; // Clear waste
        // --- END FIX ---

    }
    state.setSelectedCardInfo(null); // Deselect any card
}

// executeMove, tryMoveToFoundation, tryMoveToTableau, checkWinCondition
// generally modify arrays using methods like push, pop, splice, which is fine.
// Double-check state.resetGameState() to ensure it also avoids direct reassignment
// of exported arrays.

// ... rest of the functions ...

function executeMove(destinationPile, sourceInfo) {
    const { pileType, pileIndex, cardIndex, stackSize } = sourceInfo;
    let cardsToMove = [];

    // Remove card(s) from source (using pop/splice is OK)
    if (pileType === 'waste') {
        if (state.waste.length > 0) cardsToMove.push(state.waste.pop());
    } else if (pileType === 'tableau') {
        const sourcePile = state.tableau[pileIndex];
        if (sourcePile) { // Check if pile exists
             cardsToMove = sourcePile.splice(cardIndex, stackSize);
             // Flip the new top card if it exists and is face down
             if (sourcePile.length > 0 && !sourcePile[sourcePile.length - 1].isFaceUp) {
                 sourcePile[sourcePile.length - 1].isFaceUp = true;
             }
        }
    } else if (pileType === 'foundation') {
        // Moving FROM foundation (less common)
        if (state.foundations[pileIndex]?.length > 0) { // Optional chaining for safety
             cardsToMove.push(state.foundations[pileIndex].pop());
        }
    }

    // Add card(s) to destination (using push is OK)
    destinationPile.push(...cardsToMove);

    // Increment score for a valid move
    updateScore(10);

    // Clear selection, redraw, and check win
    state.setSelectedCardInfo(null);
    drawGameBoard();
    checkWinCondition();
}

export function tryMoveToFoundation(targetFoundationIndex, sourceInfo) {
    if (!sourceInfo?.card) {
        console.error("Move attempt failed: No source card info.");
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }
    if (sourceInfo.stackSize !== 1) {
        setMessage("Cannot move stacks to foundation.");
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }

    const cardToMove = sourceInfo.card;
    const targetPile = state.foundations[targetFoundationIndex];
    const targetLeague = leagues[targetFoundationIndex];

    if (!targetPile || !targetLeague) { // Safety check
        console.error("Invalid target foundation index:", targetFoundationIndex);
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }

    if (cardToMove.league !== targetLeague) {
        setMessage(`Wrong Goal! This is for ${targetLeague}.`);
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }

    if (targetPile.length === 0) {
        if (cardToMove.value === 1) { // Ace
            executeMove(targetPile, sourceInfo);
        } else {
            setMessage(`Only an Ace of ${targetLeague} can start this pile.`);
            state.setSelectedCardInfo(null); drawGameBoard();
        }
    } else {
        const topCard = targetPile[targetPile.length - 1];
        if (cardToMove.value === topCard.value + 1) {
            executeMove(targetPile, sourceInfo);
        } else {
            // Ensure topCard.value is within the bounds of the ranks array
            const requiredRankIndex = topCard.value; // ranks is 1-based index for value
            if (requiredRankIndex >= 0 && requiredRankIndex < ranks.length) {
                 const requiredRankName = ranks[requiredRankIndex]; // ranks[1] = '2'
                 setMessage(`Requires a ${requiredRankName} of ${targetLeague}.`);
            } else {
                 setMessage(`Invalid rank needed for ${targetLeague}.`); // Fallback message
            }
            state.setSelectedCardInfo(null); drawGameBoard();
        }
    }
}


export function tryMoveToTableau(targetPileIndex, sourceInfo) {
     if (!sourceInfo?.card) return;

    const cardToMove = sourceInfo.card;
    const targetPile = state.tableau[targetPileIndex];

    if (!targetPile) { // Safety check
        console.error("Invalid target tableau index:", targetPileIndex);
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }

    // Moving to an empty pile
    if (targetPile.length === 0) {
        if (cardToMove.value === 13) { // King
            executeMove(targetPile, sourceInfo);
        } else {
            setMessage("Only a King can move to an empty tableau pile.");
            state.setSelectedCardInfo(null); drawGameBoard();
        }
        return;
    }

    // Moving onto an existing card
    const topCard = targetPile[targetPile.length - 1];
    // No need for !topCard check here because we already checked targetPile.length === 0

    // Rank check
    if (cardToMove.value !== topCard.value - 1) {
        setMessage(`Cannot place ${cardToMove.rank} on ${topCard.rank}. Requires descending rank.`);
        state.setSelectedCardInfo(null); drawGameBoard(); return;
    }

    // Matching rule check
    const matchFound = cardToMove.league === topCard.league ||
                       cardToMove.flag === topCard.flag ||
                       cardToMove.club === topCard.club;

    if (matchFound) {
        executeMove(targetPile, sourceInfo);
    } else {
        setMessage(`Requires descending rank and matching League, Nationality, OR Club.`);
        state.setSelectedCardInfo(null); drawGameBoard();
    }
}

export function checkWinCondition() {
    const won = state.foundations.every(pile => pile?.length === 13); // Add optional chaining
    if (won) {
        setMessage("GOAL!!! YOU WON!");
        state.setIsGameActive(false);
        // Add win effects here if desired
    }
}

