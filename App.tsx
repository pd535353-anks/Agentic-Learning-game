import React from 'react';
import { GameProvider, useGame } from './components/GameContext';
import { GameState } from './types';
import IntroScreen from './components/IntroScreen';
import LevelView from './components/LevelView';
import LevelSummary from './components/LevelSummary';
import FinalReport from './components/FinalReport';
import { AlertTriangle } from 'lucide-react';

const GameRouter: React.FC = () => {
  const { gameState, restartGame } = useGame();

  switch (gameState) {
    case GameState.INTRO:
      return <IntroScreen />;
    case GameState.PLAYING:
      return <LevelView />;
    case GameState.LEVEL_SUMMARY:
      return (
        <>
          <LevelView /> {/* Keep background visible */}
          <LevelSummary />
        </>
      );
    case GameState.GAME_OVER:
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl text-center max-w-md">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Simulation Failed</h2>
            <p className="text-slate-500 mb-6">You ran out of chances. The AI systems became unstable.</p>
            <button 
              onClick={restartGame}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
            >
              Restart Simulation
            </button>
          </div>
        </div>
      );
    case GameState.VICTORY:
      return <FinalReport />;
    default:
      return <div>Loading...</div>;
  }
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
};

export default App;
