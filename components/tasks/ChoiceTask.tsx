import React, { useState } from 'react';
import { TaskData } from '../../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ChoiceTaskProps {
  task: TaskData;
  onComplete: (success: boolean) => void;
}

const ChoiceTask: React.FC<ChoiceTaskProps> = ({ task, onComplete }) => {
  const { scenario, options, messages } = task.content;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (!submitted) setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    
    const option = options.find((o: any) => o.id === selectedOption);
    if (option.correct) {
      setTimeout(() => onComplete(true), 1500); // Delay to read feedback
    } else {
       setTimeout(() => {
         onComplete(false);
         setSubmitted(false); // Reset for retry if lives permit
         setSelectedOption(null);
       }, 2000);
    }
  };

  // Support for Chat style presentation
  const isChat = task.type === 'chat';

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner min-h-[120px]">
        {isChat && messages ? (
          <div className="space-y-4">
             {messages.map((msg: any, i: number) => (
               <div key={i} className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm max-w-[80%]">
                 <div className="text-xs text-blue-600 font-bold mb-1">{msg.sender}</div>
                 <div className="text-slate-700">{msg.text}</div>
               </div>
             ))}
          </div>
        ) : (
          <p className="text-lg text-slate-700 leading-relaxed font-medium">{scenario}</p>
        )}
      </div>

      <div className="space-y-3">
        {options.map((opt: any) => {
           const isSelected = selectedOption === opt.id;
           let statusColor = "border-slate-200 bg-white hover:bg-slate-50";
           if (submitted && isSelected) {
             statusColor = opt.correct 
              ? "border-green-500 bg-green-50 text-green-700" 
              : "border-red-500 bg-red-50 text-red-700";
           } else if (isSelected) {
             statusColor = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
           }

           return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={submitted}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${statusColor}`}
            >
              <span className="font-medium">{opt.text}</span>
              {submitted && isSelected && (
                opt.correct ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />
              )}
            </button>
           );
        })}
      </div>
      
      {submitted && selectedOption && (
        <div className="text-center animate-fade-in p-2 bg-slate-100 rounded-lg">
           {options.find((o: any) => o.id === selectedOption)?.feedback}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`mt-auto py-3 rounded-lg font-bold text-white transition-colors
            ${selectedOption ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-300 cursor-not-allowed'}
          `}
        >
          Confirm Decision
        </button>
      )}
    </div>
  );
};

export default ChoiceTask;
