export enum Character {
  KANE = 'Kane',
  JULIA = 'Julia',
  CHANG = 'Chang'
}

export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  LEVEL_SUMMARY = 'LEVEL_SUMMARY',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export interface ScoreBreakdown {
  levelIndex: number;
  basePoints: number;
  timeBonus: number;
  hintBonus: number;
  total: number;
}

export interface GameContextType {
  character: Character | null;
  setCharacter: (char: Character) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  currentLevelIndex: number;
  currentTaskIndex: number;
  lives: number;
  hintsRemaining: number;
  score: number;
  scoreHistory: ScoreBreakdown[];
  elapsedTime: number; // in seconds
  hintsUsedInLevel: boolean;
  startGame: () => void;
  nextLevel: () => void;
  nextTask: () => void;
  useHint: () => string | null;
  loseLife: () => void;
  completeTask: () => void;
  resetLevel: () => void;
  restartGame: () => void;
}

export type TaskType = 'choice' | 'dashboard' | 'sorting' | 'highlight' | 'chat' | 'input';

export interface TaskData {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Difficult';
  title: string;
  description: string;
  type: TaskType;
  hints: string[];
  content: any; // Flexible payload for different task types
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  tasks: TaskData[];
}
