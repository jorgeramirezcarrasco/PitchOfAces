// layout.js
// Calculates and manages layout positions and dimensions

import { canvas } from './dom.js';
import {
    BASE_CANVAS_WIDTH, BASE_CARD_WIDTH, BASE_CARD_HEIGHT, BASE_PADDING,
    BASE_HORIZONTAL_SPACING, BASE_VERTICAL_SPACING, BASE_TABLEAU_STACK_OFFSET
} from './config.js';

export let scaleFactor = 1;
export let CARD_WIDTH, CARD_HEIGHT, PADDING, HORIZONTAL_SPACING, VERTICAL_SPACING, TABLEAU_STACK_OFFSET;
export let STOCK_X, STOCK_Y, WASTE_X, WASTE_Y, FOUNDATION_START_X, FOUNDATION_Y, TABLEAU_START_X, TABLEAU_Y;

export function updateLayoutPositions() {
    if (!canvas) return;

    scaleFactor = canvas.width / BASE_CANVAS_WIDTH;

    // Scale base dimensions
    CARD_WIDTH = BASE_CARD_WIDTH * scaleFactor;
    CARD_HEIGHT = BASE_CARD_HEIGHT * scaleFactor;

    PADDING = BASE_PADDING * scaleFactor;
    HORIZONTAL_SPACING = BASE_HORIZONTAL_SPACING * scaleFactor;
    VERTICAL_SPACING = BASE_VERTICAL_SPACING * scaleFactor;
    TABLEAU_STACK_OFFSET = BASE_TABLEAU_STACK_OFFSET * scaleFactor;

    // Calculate base positions
    STOCK_X = PADDING;
    STOCK_Y = PADDING;
    WASTE_X = STOCK_X + CARD_WIDTH + HORIZONTAL_SPACING;
    WASTE_Y = PADDING;
    FOUNDATION_START_X = canvas.width - PADDING - 4 * (CARD_WIDTH + HORIZONTAL_SPACING) + HORIZONTAL_SPACING;
    FOUNDATION_Y = PADDING;
    TABLEAU_START_X = PADDING;
    TABLEAU_Y = PADDING + CARD_HEIGHT + VERTICAL_SPACING;
}
