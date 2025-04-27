import { describe, it, expect } from 'vitest';
import { resetScoreAndTimer, score, timeRemaining } from './state.js';

describe('Game State', () => {
    it('should reset score and timer', () => {
        resetScoreAndTimer();
        expect(score).toBe(0); // Access the score directly
        expect(timeRemaining).toBe(90); // Access the timeRemaining directly
    });
});