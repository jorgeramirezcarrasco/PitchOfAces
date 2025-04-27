// dom.js
// DOM element references and manipulation

export const canvas = document.getElementById('solitaire-canvas');
export const ctx = canvas?.getContext('2d'); // Use optional chaining for safety
export const restartButton = document.getElementById('restart-button');
export const messageArea = document.getElementById('message-area');
export const modalOverlay = document.getElementById('modal-overlay');
export const eraModal = document.getElementById('era-modal');
export const gameContainer = document.getElementById('game-container');
export const eraButtons = document.querySelectorAll('.era-button');

export function showEraModal() {
    if (modalOverlay && gameContainer) {
        modalOverlay.style.display = 'flex';
        gameContainer.classList.add('blurred');
    }
}

export function hideEraModal() {
     if (modalOverlay && gameContainer) {
        modalOverlay.style.display = 'none';
        gameContainer.classList.remove('blurred');
    }
}

export function setMessage(msg) {
    if (messageArea) {
        messageArea.textContent = msg;
    }
}

// Basic check to ensure canvas context was obtained
if (!ctx) {
    console.error("Failed to get 2D context from canvas. Ensure the canvas element exists.");
    setMessage("Error: Canvas not supported or found!");
}
