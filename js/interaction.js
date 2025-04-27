// interaction.js
// Handles user interactions (clicks, touches)

import { canvas, setMessage } from './dom.js';
import * as layout from './layout.js';
import * as state from './state.js';
import { drawGameBoard } from './drawing.js';
import { drawStock, tryMoveToFoundation, tryMoveToTableau } from './gameLogic.js';
import { leagues, DOUBLE_CLICK_THRESHOLD } from './config.js';

function getMousePos(event) {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

function getClickedCard(x, y) {
    // Check Tableau Piles
    for (let i = state.tableau.length - 1; i >= 0; i--) {
        const pile = state.tableau[i];
        const pileX = layout.TABLEAU_START_X + i * (layout.CARD_WIDTH + layout.HORIZONTAL_SPACING);
        for (let j = pile.length - 1; j >= 0; j--) {
            const card = pile[j];
            const cardY = layout.TABLEAU_Y + j * layout.TABLEAU_STACK_OFFSET;
            const cardClickableTop = cardY;
            const cardClickableBottom = (j === pile.length - 1)
                                        ? cardY + layout.CARD_HEIGHT
                                        : layout.TABLEAU_Y + (j + 1) * layout.TABLEAU_STACK_OFFSET;

            if (x >= pileX && x <= pileX + layout.CARD_WIDTH && y >= cardClickableTop && y <= cardClickableBottom) {
                if (card.isFaceUp || j === pile.length - 1) {
                    return { card, pileType: 'tableau', pileIndex: i, cardIndex: j };
                } else {
                    return null; // Clicked hidden card in middle of stack
                }
            }
        }
        // Check empty tableau pile placeholder
        if (pile.length === 0) {
            const pileY = layout.TABLEAU_Y;
            if (x >= pileX && x <= pileX + layout.CARD_WIDTH && y >= pileY && y <= pileY + layout.CARD_HEIGHT) {
                return { card: null, pileType: 'tableau', pileIndex: i, cardIndex: -1 };
            }
        }
    }

    // Check Foundation Piles
    for (let i = 0; i < state.foundations.length; i++) {
        const pile = state.foundations[i];
        const pileX = layout.FOUNDATION_START_X + i * (layout.CARD_WIDTH + layout.HORIZONTAL_SPACING);
        const pileY = layout.FOUNDATION_Y;
        if (x >= pileX && x <= pileX + layout.CARD_WIDTH && y >= pileY && y <= pileY + layout.CARD_HEIGHT) {
            const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
            return { card: topCard, pileType: 'foundation', pileIndex: i, cardIndex: pile.length - 1 };
        }
    }

    // Check Waste Pile
    if (state.waste.length > 0) {
        if (x >= layout.WASTE_X && x <= layout.WASTE_X + layout.CARD_WIDTH && y >= layout.WASTE_Y && y <= layout.WASTE_Y + layout.CARD_HEIGHT) {
            return { card: state.waste[state.waste.length - 1], pileType: 'waste', pileIndex: -1, cardIndex: state.waste.length - 1 };
        }
    }

    // Check Stock Pile
    if (x >= layout.STOCK_X && x <= layout.STOCK_X + layout.CARD_WIDTH && y >= layout.STOCK_Y && y <= layout.STOCK_Y + layout.CARD_HEIGHT) {
        return { card: null, pileType: 'stock', pileIndex: -1, cardIndex: -1 };
    }

    return null; // Click outside any interactive area
}


export function handleInteractionStart(event) {
    if (!state.isGameActive) return;

    if (event.type === 'touchstart') {
        event.preventDefault();
    }

    const pos = getMousePos(event);
    const clickedItem = getClickedCard(pos.x, pos.y);
    const currentTime = Date.now();
    setMessage('');

    // --- Click outside ---
    
    if (!clickedItem) {
        if (state.selectedCardInfo) {
            state.setSelectedCardInfo(null);
            drawGameBoard();
        }
        state.setLastClick(0, null); // Reset double-click timer
        return;
    }

    const { card, pileType, pileIndex, cardIndex } = clickedItem;

    // --- Double-Click Handling ---
    if (card?.isFaceUp) { // Use optional chaining
        const isDoubleClickTarget = (pileType === 'waste' && cardIndex === state.waste.length - 1) ||
                                    (pileType === 'tableau' && cardIndex === state.tableau[pileIndex].length - 1);

        if (isDoubleClickTarget && currentTime - state.lastClickTime < DOUBLE_CLICK_THRESHOLD && state.lastClickedCardId === card.id) {
            const targetFoundationIndex = leagues.indexOf(card.league);
            if (targetFoundationIndex !== -1) {
                const tempSourceInfo = { card, pileType, pileIndex, cardIndex, stackSize: 1 };
                tryMoveToFoundation(targetFoundationIndex, tempSourceInfo);
            }
            state.resetInteractionState(); // Reset click state and selection
            // drawGameBoard() is called within tryMove or implicitly if no move
            return; // End processing
        }
    }

    // Update last click info for potential next double-click
    state.setLastClick(currentTime, card ? card.id : null);

    // --- Single Click / First Click Logic ---
    if (!state.selectedCardInfo) {
        // Click Stock
        if (pileType === 'stock') {
            drawStock(); drawGameBoard(); return;
        }
        // Click face-down tableau card to flip
        if (pileType === 'tableau' && card && !card.isFaceUp && cardIndex === state.tableau[pileIndex].length - 1) {
            card.isFaceUp = true; drawGameBoard(); return;
        }
        // Click Waste card to select
        if (pileType === 'waste' && card) {
            state.setSelectedCardInfo({ card, pileType, pileIndex, cardIndex, stackSize: 1 });
            drawGameBoard(); return;
        }
        // Click face-up Tableau card to select stack
        if (pileType === 'tableau' && card?.isFaceUp) {
            const pile = state.tableau[pileIndex];
            const stackSize = pile.length - cardIndex; // Cards from clicked one down
            state.setSelectedCardInfo({ card, pileType, pileIndex, cardIndex, stackSize });
            drawGameBoard(); return;
        }
        // Click empty pile or foundation - do nothing on first click
        return;
    }
    // --- Second Click Logic (Card already selected) ---
    else {
        const sourceInfo = state.selectedCardInfo;

        // Clicked same card/stack again: Deselect
        if (pileType === sourceInfo.pileType && pileIndex === sourceInfo.pileIndex && cardIndex === sourceInfo.cardIndex) {
            state.setSelectedCardInfo(null); drawGameBoard(); return;
        }

        // Clicked Foundation: Try move
        if (pileType === 'foundation') {
            if (sourceInfo.stackSize === 1) {
                tryMoveToFoundation(pileIndex, sourceInfo);
            } else {
                setMessage("Cannot move stacks to foundation.");
                state.setSelectedCardInfo(null); drawGameBoard();
            }
            return;
        }

        // Clicked Tableau: Try move
        if (pileType === 'tableau') {
            // Pass the target pile index. targetCardIndex from getClickedCard isn't needed here,
            // as tryMoveToTableau checks the pile's state (empty or top card).
            tryMoveToTableau(pileIndex, sourceInfo);
            return;
        }

        // Clicked somewhere else (Stock, Waste, outside): Deselect
        state.setSelectedCardInfo(null);
        drawGameBoard();
    }
}
