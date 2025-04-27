# Pitch of Aces

![Pitch of Aces Logo](assets/logo.png)

**Pitch of Aces** is a football-themed solitaire game that combines the excitement of card games with the passion for football leagues and players. The game features custom-designed playing cards representing players from different leagues, eras, and clubs, complete with unique designs and attributes.

---

## Features

- **Custom Playing Cards**: Each card represents a football player with attributes like rank, club, league, flag, and iconic number.
- **Era Selection**: Choose between different football eras (2000s, 2010s, modern) to play with players from that time.
- **Dynamic SVG Generation**: Cards are dynamically generated as SVGs, ensuring high-quality visuals.
- **Interactive Gameplay**: Fully interactive solitaire game with drag-and-drop mechanics, double-click functionality, and win conditions.
- **Timer and Scoring System**: A football-themed timer simulates 90 minutes of gameplay (scaled to 3 real-time minutes), and a scoring system rewards players for valid moves.
- **Responsive Design**: The game adapts to different screen sizes for an optimal experience.

---

## How It Works

1. **Era Selection**: Players start by selecting an era (2000s, 2010s, or modern). This determines the deck of players used in the game.
2. **Card Generation**: The deck is built dynamically using player data and rendered as SVGs with unique designs for each card.
3. **Gameplay**: The game follows standard solitaire rules with some football-themed twists, such as matching cards by league, flag, or club.
4. **Timer and Scoring**:
   - The timer starts at `0:00` and counts up to `90:00` over 3 real-time minutes.
   - Players earn points for valid moves, and the final score is displayed when the timer ends.
5. **Winning**: The goal is to move all cards to the foundation piles, sorted by league and rank.

---

## Project Structure

The project is organized as follows:

### **Frontend Files**
- **`index.html`**: The main HTML file that sets up the game interface.
- **`style.css`**: Contains the styles for the game, including the football-themed design.

### **JavaScript Files**
- **`js/main.js`**: The main entry point for the application. Handles initialization, event listeners, and the timer logic.
- **`js/state.js`**: Manages the mutable game state, including the score, timer, and card positions.
- **`js/gameLogic.js`**: Implements the core solitaire game logic, including card moves and win conditions.
- **`js/drawing.js`**: Handles canvas drawing operations for cards and game elements.
- **`js/interaction.js`**: Manages user interactions like clicks and drags.
- **`js/layout.js`**: Calculates and manages layout positions for cards and piles.
- **`js/dom.js`**: Handles DOM element references and manipulation.
- **`js/config.js`**: Contains configuration constants like leagues, ranks, and colors.

### **Card Generation Tools**
- **`tools/cardGenerator.js`**: Defines functions for building decks and generating SVG cards.
- **`tools/generateCards.js`**: A Node.js script for batch-generating card SVGs and PNGs.
- **`tools/package.json`**: Defines dependencies for the card generation tools (`sharp` and `yargs`).

---

## Installation and Usage

### Prerequisites

- A modern web browser for playing the game.
- Node.js (if you want to use the card generation tools).

### Playing the Game

1. Open `index.html` in your browser.
2. Select an era to start the game.
3. Play solitaire with football-themed cards!

### Generating Cards

1. Navigate to the `tools/` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Generate cards for a specific era:
    ```bash
    node tools/generateCards.js --era 2010s --out ./assets/cards/2010s
    ```

---

## Gameplay Details

### Timer
- The timer starts at `0:00` and counts up to `90:00` over 3 real-time minutes.
- When the timer reaches `90:00`, the game ends, and a modal displays the final score.

### Scoring
- Players earn **10 points** for each valid move.
- The score resets to `0` when the game is restarted.

### Restarting the Game
- Clicking the "Restart Game" button resets the timer, score, and game state.
- Players can select a new era or continue with the current one.

---

## Authors
- **Jorge** (Project Owner)
- **GitHub Copilot** (AI Assistant for code and documentation)
- **Gemini** (AI Assistant for initial design)
- **ChatGPT** (AI Assistant for code and data generation)

---

## License
This project is for educational and personal use. All player data and club information are fictitious or lightly misspelled for intellectual property safety.