import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { GameContextType, GameState, Character, ScoreBreakdown } from '../types';
import { LEVELS, LEVEL_TIME_LIMIT_SECONDS, BONUS_TIME_THRESHOLD } from '../constants';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  
  const [lives, setLives] = useState(3);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [hintsUsedInLevel, setHintsUsedInLevel] = useState(false);
  
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState<ScoreBreakdown[]>([]);
  
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const [timerActive, setTimerActive] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && gameState === GameState.PLAYING) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameState]);

  // Check for Level Timeout
  useEffect(() => {
    if (elapsedTime >= LEVEL_TIME_LIMIT_SECONDS && gameState === GameState.PLAYING) {
       // Timeout! 
       // For this game, we'll treat timeout as a forced level restart or massive penalty.
       // Let's just deduct a life and reset timer or game over.
       // Simpler: treat as loseLife logic repeated or just fail level.
       loseLife();
       setElapsedTime(0); // Reset timer for the retry
    }
  }, [elapsedTime, gameState]);

  const startGame = () => {
    setGameState(GameState.PLAYING);
    setCurrentLevelIndex(0);
    setCurrentTaskIndex(0);
    setLives(3);
    setHintsRemaining(3);
    setScore(0);
    setScoreHistory([]);
    setElapsedTime(0);
    setTimerActive(true);
    setHintsUsedInLevel(false);
  };

  const nextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      // Logic for carrying over lives happens in the Level Summary calculation usually, 
      // but here we just add the standard 3 for the new level + existing.
      const newLives = lives + 3;
      setLives(newLives);
      
      setCurrentLevelIndex(prev => prev + 1);
      setCurrentTaskIndex(0);
      setHintsRemaining(3);
      setElapsedTime(0);
      setHintsUsedInLevel(false);
      setGameState(GameState.PLAYING);
      setTimerActive(true);
    } else {
      setGameState(GameState.VICTORY);
      setTimerActive(false);
    }
  };

  const useHint = (): string | null => {
    if (hintsRemaining > 0) {
      setHintsRemaining(prev => prev - 1);
      setHintsUsedInLevel(true);
      const level = LEVELS[currentLevelIndex];
      const task = level.tasks[currentTaskIndex];
      // Return a random unused hint or sequential? Sequential is better.
      const hintIndex = 3 - hintsRemaining; 
      return task.hints[hintIndex] || task.hints[0];
    }
    return null;
  };

  const loseLife = () => {
    if (lives > 1) {
      setLives(prev => prev - 1);
    } else {
      setGameState(GameState.GAME_OVER);
      setTimerActive(false);
    }
  };

  const completeTask = () => {
    // Award Base Points
    setScore(prev => prev + 10);

    // Check if level is complete
    const currentLevel = LEVELS[currentLevelIndex];
    if (currentTaskIndex < currentLevel.tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      // Level Complete
      setTimerActive(false);
      calculateLevelBonus();
      setGameState(GameState.LEVEL_SUMMARY);
    }
  };

  const calculateLevelBonus = () => {
    let bonusTime = 0;
    let bonusHint = 0;

    if (elapsedTime <= BONUS_TIME_THRESHOLD) {
      bonusTime = 5;
    }
    if (!hintsUsedInLevel) {
      bonusHint = 2;
    }

    const levelBasePoints = 30; // 3 tasks * 10
    const levelTotal = levelBasePoints + bonusTime + bonusHint;

    setScore(prev => prev + bonusTime + bonusHint);

    setScoreHistory(prev => [...prev, {
      levelIndex: currentLevelIndex,
      basePoints: levelBasePoints,
      timeBonus: bonusTime,
      hintBonus: bonusHint,
      total: levelTotal
    }]);
  };

  const resetLevel = () => {
    // Used when failing a level completely if we implemented that, 
    // or just resetting state for debug. 
    // For this game, "Lose Life" handles failures. 
    // But if Game Over, we might want restartGame.
    setElapsedTime(0);
  };

  const restartGame = () => {
    setCharacter(null);
    setGameState(GameState.INTRO);
  };

  return (
    <GameContext.Provider value={{
      character,
      setCharacter,
      gameState,
      setGameState,
      currentLevelIndex,
      currentTaskIndex,
      lives,
      hintsRemaining,
      score,
      scoreHistory,
      elapsedTime,
      hintsUsedInLevel,
      startGame,
      nextLevel,
      nextTask: completeTask, // Alias for flow
      useHint,
      loseLife,
      completeTask,
      resetLevel,
      restartGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};