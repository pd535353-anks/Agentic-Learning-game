import React from 'react';
import { useGame } from './GameContext';
import { Award, RefreshCcw, CheckCircle } from 'lucide-react';

const FinalReport: React.FC = () => {
  const { score, character, scoreHistory, restartGame } = useGame();

  // Determine Badge based on score
  // Max score estimation: 5 levels * (30 base + 5 time + 2 hint) = 185
  let badge = "Novice Operator";
  let badgeColor = "bg-slate-200 text-slate-700";
  
  if (score > 150) {
      badge = "AI Grandmaster";
      badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-400";
  } else if (score > 100) {
      badge = "Senior Analyst";
      badgeColor = "bg-blue-100 text-blue-700 border-blue-400";
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-slate-900 p-8 text-center text-white">
                <h1 className="text-4xl font-bold mb-2">Simulation Complete</h1>
                <p className="text-slate-400">Congratulations, {character}!</p>
            </div>

            <div className="p-8">
                <div className="flex flex-col items-center mb-12">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 mb-4 ${badgeColor}`}>
                        <Award className="w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{badge}</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-2">{score} pts</p>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Performance Breakdown</h3>
                <div className="space-y-3 mb-8">
                    {scoreHistory.map((hist, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                            <span className="font-medium text-slate-700">Level {i + 1}</span>
                            <div className="flex gap-4 text-sm">
                                <span className="text-slate-500">Base: {hist.basePoints}</span>
                                {hist.timeBonus > 0 && <span className="text-blue-500">Speed +{hist.timeBonus}</span>}
                                {hist.hintBonus > 0 && <span className="text-green-500">Skill +{hist.hintBonus}</span>}
                                <span className="font-bold text-slate-900 ml-2">{hist.total} pts</span>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Evaluation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <h4 className="font-bold text-green-800 flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4"/> Strengths</h4>
                        <p className="text-sm text-green-700">
                            You demonstrated strong capability in monitoring AI metrics and intervening when necessary. Your ethical judgment in bias scenarios was excellent.
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2"><Award className="w-4 h-4"/> Focus Areas</h4>
                        <p className="text-sm text-blue-700">
                            Continue refining your prompt engineering skills. Specificity in context templates is key to reducing future interventions.
                        </p>
                    </div>
                </div>

                <button 
                    onClick={restartGame}
                    className="w-full mt-8 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                >
                    <RefreshCcw className="w-5 h-5" /> Play Again
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
