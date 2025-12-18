import React, { useState } from 'react';
import { useGame } from './GameContext';
import { LEVELS } from '../constants';
import { Heart, Lightbulb, Clock, ShieldCheck } from 'lucide-react';

import DashboardTask from './tasks/DashboardTask';
import ChoiceTask from './tasks/ChoiceTask';
import SortingTask from './tasks/SortingTask';
import HighlightTask from './tasks/HighlightTask';

const LevelView: React.FC = () => {
  const { 
    currentLevelIndex, 
    currentTaskIndex, 
    lives, 
    hintsRemaining, 
    score, 
    elapsedTime, 
    useHint, 
    loseLife,
    completeTask
  } = useGame();

  const levelData = LEVELS[currentLevelIndex];
  const taskData = levelData.tasks[currentTaskIndex];
  const [currentHint, setCurrentHint] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTaskCompletion = (success: boolean) => {
    if (success) {
      setCurrentHint(null); // Clear hint for next task
      completeTask();
    } else {
      loseLife();
    }
  };

  const handleUseHint = () => {
    const hint = useHint();
    if (hint) setCurrentHint(hint);
  };

  const renderTask = () => {
    // We add key={taskData.id} to ensure React remounts the component 
    // when the task changes, resetting internal state (like selections or sorting).
    switch(taskData.type) {
        case 'dashboard': return <DashboardTask key={taskData.id} task={taskData} onComplete={handleTaskCompletion} />;
        case 'sorting': return <SortingTask key={taskData.id} task={taskData} onComplete={handleTaskCompletion} />;
        case 'highlight': return <HighlightTask key={taskData.id} task={taskData} onComplete={handleTaskCompletion} />;
        case 'choice':
        case 'chat':
        case 'input': 
            return <ChoiceTask key={taskData.id} task={taskData} onComplete={handleTaskCompletion} />;
        default: return <div>Unknown Task Type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HUD */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Level {currentLevelIndex + 1}</span>
              <h2 className="font-bold text-slate-800">{levelData.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700 font-mono bg-slate-100 px-3 py-1 rounded-full">
               <Clock className="w-4 h-4 text-blue-500" />
               <span>{formatTime(elapsedTime)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-200'}`} />
              ))}
            </div>

            <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400">SCORE</span>
                <span className="font-bold text-xl text-slate-900">{score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
            {levelData.tasks.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 flex-1 rounded-full transition-colors 
                    ${idx < currentTaskIndex ? 'bg-green-500' : idx === currentTaskIndex ? 'bg-blue-500' : 'bg-slate-200'}
                  `}
                />
            ))}
        </div>

        {/* Task Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-start">
            <div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 uppercase tracking-wide
                    ${taskData.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                      taskData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}
                `}>
                    {taskData.difficulty}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{taskData.title}</h3>
                <p className="text-slate-500 mt-1">{taskData.description}</p>
            </div>
            <button 
                onClick={handleUseHint}
                disabled={hintsRemaining === 0 || !!currentHint}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${hintsRemaining > 0 && !currentHint ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                `}
            >
                <Lightbulb className="w-4 h-4" />
                <span>Hint ({hintsRemaining})</span>
            </button>
          </div>

          <div className="p-6 flex-1 relative">
            {renderTask()}
            
            {currentHint && (
                <div className="absolute bottom-4 left-6 right-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3 animate-fade-in z-10">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                    <p className="text-sm text-yellow-800 italic">{currentHint}</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LevelView;