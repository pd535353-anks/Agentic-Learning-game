import React from 'react';
import { useGame } from './GameContext';
import { ArrowRight, Star, Clock, Trophy } from 'lucide-react';

const LevelSummary: React.FC = () => {
  const { scoreHistory, nextLevel, score } = useGame();
  const lastLevel = scoreHistory[scoreHistory.length - 1];

  if (!lastLevel) return null;

  return (
    <div className="min-h-screen bg-slate-900/95 flex items-center justify-center p-4 fixed inset-0 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl animate-fade-in-up">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Level Complete!</h2>
        <p className="text-slate-500 mb-8">Great work maintaining operational efficiency.</p>

        <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600 font-medium">Task Points</span>
                <span className="font-bold text-slate-900">+{lastLevel.basePoints}</span>
            </div>
            {lastLevel.timeBonus > 0 && (
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-medium flex items-center gap-2"><Clock className="w-4 h-4"/> Speed Bonus</span>
                    <span className="font-bold text-blue-700">+{lastLevel.timeBonus}</span>
                </div>
            )}
             {lastLevel.hintBonus > 0 && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 font-medium flex items-center gap-2"><Star className="w-4 h-4"/> No Hint Bonus</span>
                    <span className="font-bold text-green-700">+{lastLevel.hintBonus}</span>
                </div>
            )}
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">Total Score</span>
                <span className="text-2xl font-bold text-blue-600">{score}</span>
            </div>
        </div>

        <button 
            onClick={nextLevel}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
        >
            Next Level <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LevelSummary;
