import React from 'react';
import { useGame } from './GameContext';
import { Character } from '../types';
import { User, UserCheck, UserPlus } from 'lucide-react';

const IntroScreen: React.FC = () => {
  const { setCharacter, startGame } = useGame();
  const [selected, setSelected] = React.useState<Character | null>(null);

  const handleSelect = (char: Character) => {
    setSelected(char);
    setCharacter(char);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
            AI Operator Simulation
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Welcome, Operator. Your mission is to oversee the integration of advanced AI agents into our workforce. 
            Monitor, correct, and refine their performance. Choose your avatar to begin.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[Character.KANE, Character.JULIA, Character.CHANG].map((char) => (
              <button
                key={char}
                onClick={() => handleSelect(char)}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4
                  ${selected === char 
                    ? 'border-blue-500 bg-blue-900/20 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-105' 
                    : 'border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-750'
                  }`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-colors
                   ${selected === char ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>
                   {char === Character.KANE && <User />}
                   {char === Character.JULIA && <UserPlus />}
                   {char === Character.CHANG && <UserCheck />}
                </div>
                <div className="text-center">
                  <h3 className={`text-xl font-bold ${selected === char ? 'text-blue-400' : 'text-slate-200'}`}>{char}</h3>
                  <p className="text-sm text-slate-500 mt-2">Senior AI Analyst</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            disabled={!selected}
            className={`px-12 py-4 rounded-full text-lg font-bold tracking-wide transition-all transform 
              ${selected 
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg hover:scale-105 hover:from-blue-500 hover:to-teal-400' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
          >
            INITIALIZE SIMULATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
