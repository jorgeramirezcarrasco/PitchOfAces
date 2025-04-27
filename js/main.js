// main.js
// Main application entry point, initialization, and event listeners

import { canvas, ctx, restartButton, eraButtons, showEraModal, hideEraModal, setMessage, gameContainer } from './dom.js';
import { updateLayoutPositions } from './layout.js';
import { drawGameBoard } from './drawing.js';
import { dealCards } from './gameLogic.js';
import * as state from './state.js'; // Import state module
import { handleInteractionStart } from './interaction.js';
import { BASE_CANVAS_WIDTH } from './config.js';
import { buildDeck } from '../tools/cardGenerator.js'; // Import buildDeck
import { resetScoreAndTimer } from './state.js';
import { updateScore as updateStateScore } from './state.js';

let timerInterval;

async function selectEraAndStart(era) {
    state.setSelectedEra(era);
    hideEraModal();
    console.log("Starting game with era:", state.selectedEra);

    const deck = buildDeck(era); // Now properly imported

    updateLayoutPositions();
    dealCards();
    drawGameBoard();
}

function resizeCanvas() {
    if (!canvas || !gameContainer) return;

    // Calculate available width, considering container padding/border
    // Assuming 20px padding left/right in #game-container from CSS
    const containerPadding = 40;
    const containerWidth = gameContainer.clientWidth - containerPadding;
    const aspectRatio = 675 / BASE_CANVAS_WIDTH; // Original height / original width

    // Set canvas width, respecting min/max and container size
    canvas.width = Math.max(320, Math.min(containerWidth, BASE_CANVAS_WIDTH));
    canvas.height = canvas.width * aspectRatio;

    // Recalculate layout and redraw if game is active
    updateLayoutPositions();
    if (state.isGameActive) { // Check state
         drawGameBoard();
    }
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    let elapsedSeconds = 0; // Timer starts at 0

    // Clear any existing timer interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        elapsedSeconds++;
        const displayedTime = Math.floor((elapsedSeconds / 180) * 90); // Scale 3 real-time minutes to 90 football minutes
        const minutes = Math.floor(displayedTime);
        const seconds = Math.floor((displayedTime % 1) * 60); // Convert fractional minutes to seconds
        timerElement.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (displayedTime >= 90) {
            clearInterval(timerInterval);
            showFinalScoreModal(); // Show the score pop-up
        }
    }, 1000); // 1-second interval
}

function showFinalScoreModal() {
    const modal = document.createElement('div');
    modal.id = 'final-score-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#004d00'; // Updated background color
    modal.style.padding = '20px';
    modal.style.border = '2px solid #000';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '1000';

    const scoreText = document.createElement('p');
    scoreText.textContent = `Final Score: ${state.score}`;
    scoreText.style.color = '#FFFF00'; // Set text color to yellow
    scoreText.style.fontWeight = 'bold'; // Optional: Make the text bold
    modal.appendChild(scoreText);

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.onclick = () => {
        document.body.removeChild(modal);
        initializeGame(); // Restart the game
    };
    modal.appendChild(restartButton);

    document.body.appendChild(modal);
}

export function updateScore(points) {
    const scoreElement = document.getElementById('score');
    updateStateScore(points); // Update the score in the state
    scoreElement.textContent = `Score: ${state.score}`;
}

function initializeGame() {
    if (!canvas || !ctx) {
        console.error("Canvas or context not available. Game cannot initialize.");
        setMessage("Initialization Error!");
        return;
    }

    resetScoreAndTimer(); // Reset score and timer
    updateScore(0); // Reset score display
    startTimer(); // Start the timer

    updateLayoutPositions(); // Calculate initial layout
    setupEventListeners();
    showEraModal(); // Start by showing era selection
    setMessage("Select Player Era!");
    // Don't draw board yet, wait for era selection
}

function setupEventListeners() {
    canvas?.addEventListener('mousedown', handleInteractionStart);
    canvas?.addEventListener('touchstart', handleInteractionStart, { passive: false });

    restartButton?.addEventListener('click', () => {
        clearInterval(timerInterval); // Clear the existing timer
        state.setIsGameActive(false); // Mark game as inactive
        resetScoreAndTimer(); // Reset score and timer
        updateScore(0); // Reset score display
        startTimer(); // Restart the timer
        showEraModal();
        if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear board visually
        setMessage('Select Era to Restart!');
    });

    window.addEventListener('resize', resizeCanvas);

    eraButtons.forEach(button => {
        button.addEventListener('click', () => {
            const era = button.getAttribute('data-era');
            if (era) {
                selectEraAndStart(era);
            }
        });
    });
}

// --- Start the application ---
initializeGame();

