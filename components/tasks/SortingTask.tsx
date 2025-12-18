import React, { useState } from 'react';
import { TaskData } from '../../types';
import { ArrowRight, Check, RefreshCcw } from 'lucide-react';

interface SortingTaskProps {
  task: TaskData;
  onComplete: (success: boolean) => void;
}

const SortingTask: React.FC<SortingTaskProps> = ({ task, onComplete }) => {
  const { items, buckets } = task.content;
  
  // State to track where items are: null (unsorted) or bucket name
  const [assignments, setAssignments] = useState<Record<string, string | null>>(
    items.reduce((acc: any, item: any) => ({ ...acc, [item.id]: null }), {})
  );
  
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    // If item is already sorted, remove it (undo)
    if (assignments[id]) {
        setAssignments(prev => ({...prev, [id]: null}));
        return;
    }
    setSelectedItemId(id);
  };

  const handleBucketClick = (bucketName: string) => {
    if (selectedItemId) {
      setAssignments(prev => ({ ...prev, [selectedItemId]: bucketName }));
      setSelectedItemId(null);
    }
  };

  const checkResults = () => {
    // Check if all items are assigned
    const unassigned = Object.values(assignments).some(val => val === null);
    if (unassigned) {
      setFeedback("Please assign all items before checking.");
      return;
    }

    let allCorrect = true;
    items.forEach((item: any) => {
      if (assignments[item.id] !== item.bucket) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setFeedback("Perfect categorization!");
      setTimeout(() => onComplete(true), 1000);
    } else {
      setFeedback("Some items are in the wrong category.");
      // Penalty: Reset wrong ones? Or fail? 
      // For this game mechanics: Fail attempt.
      setTimeout(() => {
          onComplete(false);
          // Optional: Auto reset only wrong ones if continuing
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="text-sm text-slate-500 mb-2">Click an item, then click a category bin.</div>
      
      {/* Unsorted Items Area */}
      <div className="flex flex-wrap gap-3 min-h-[100px] p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        {items.map((item: any) => {
            if (assignments[item.id]) return null; // Already sorted
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`p-3 text-sm bg-white rounded-lg shadow-sm border text-left max-w-[200px] hover:border-blue-400 transition-all
                  ${selectedItemId === item.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'}
                `}
              >
                {item.text}
              </button>
            );
        })}
        {items.every((i: any) => assignments[i.id]) && (
            <div className="w-full text-center text-slate-400 italic flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> All items sorted
            </div>
        )}
      </div>

      {/* Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {buckets.map((bucket: string) => (
          <div 
            key={bucket}
            onClick={() => handleBucketClick(bucket)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-2 transition-colors cursor-pointer min-h-[150px]
              ${selectedItemId ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' : 'border-slate-200 bg-white'}
            `}
          >
            <h4 className="font-bold text-slate-700 text-center border-b pb-2 mb-2">{bucket}</h4>
            <div className="space-y-2">
                {items.filter((i: any) => assignments[i.id] === bucket).map((i: any) => (
                    <div key={i.id} onClick={(e) => { e.stopPropagation(); handleItemClick(i.id); }} className="p-2 text-xs bg-slate-100 rounded border border-slate-200 cursor-pointer hover:bg-red-50 hover:text-red-500 group relative">
                         {i.text}
                         <span className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"><RefreshCcw className="w-3 h-3"/></span>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {feedback && <div className="text-center font-medium text-slate-700">{feedback}</div>}

      <button
        onClick={checkResults}
        className="mt-auto py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
      >
        Verify sorting
      </button>
    </div>
  );
};

export default SortingTask;
