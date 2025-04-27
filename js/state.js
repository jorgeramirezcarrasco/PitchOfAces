// state.js
// Manages the mutable game state

// Note: Exporting 'let' variables directly means modules import a *binding*
// to these variables. Mutating the variable (e.g., array.push) works as expected.
// Reassigning the variable (e.g., stock = []) within this module updates the binding.
// Reassigning it from *another* module would not work as intended.
// Consider wrapping state in an object or using functions for complex state management.

export let deck = [];
export let stock = [];
export let waste = [];
export let foundations = [[], [], [], []];
export let tableau = [[], [], [], [], [], [], []];

export let selectedCardInfo = null;
export let selectedEra = null;
export let isGameActive = false;
export let lastClickTime = 0;
export let lastClickedCardId = null;

export let score = 0;
export let timeRemaining = 90; // 90 seconds (1 minute in real time)

export function setSelectedCardInfo(info) {
    selectedCardInfo = info;
}

export function setSelectedEra(era) {
    selectedEra = era;
}

export function setIsGameActive(active) {
    isGameActive = active;
}

export function setLastClick(time, cardId) {
    lastClickTime = time;
    lastClickedCardId = cardId;
}

export function resetInteractionState() {
    selectedCardInfo = null;
    lastClickTime = 0;
    lastClickedCardId = null;
}

export function resetGameState() {
    deck = [];
    stock = [];
    waste = [];
    foundations = [[], [], [], []];
    tableau = [[], [], [], [], [], [], []];
    resetInteractionState();
    // selectedEra remains
    isGameActive = false; // Game becomes active after dealing
}

export function resetScoreAndTimer() {
    score = 0; // Reset the score
    timeRemaining = 90; // Reset the timer to 90 seconds (football time)
}

export function updateScore(points) {
    score += points;
}

export function decrementTime() {
    if (timeRemaining > 0) {
        timeRemaining--;
    }
    return timeRemaining;
}
