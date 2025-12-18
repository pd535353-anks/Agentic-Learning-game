import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { TaskData } from '../../types';

interface DashboardTaskProps {
  task: TaskData;
  onComplete: (success: boolean) => void;
}

const DashboardTask: React.FC<DashboardTaskProps> = ({ task, onComplete }) => {
  const { data, question, correctReason, correctMetric, options } = task.content;
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleBarClick = (entry: any) => {
    setSelectedMetric(entry.name);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (!selectedMetric) {
      setFeedback("Please select a metric from the chart first.");
      return;
    }
    if (!selectedReason) {
      setFeedback("Please select a reason/action.");
      return;
    }

    const isMetricCorrect = selectedMetric === correctMetric;
    const isReasonCorrect = selectedReason === correctReason;

    if (isMetricCorrect && isReasonCorrect) {
      onComplete(true);
    } else {
      setFeedback(
        !isMetricCorrect 
        ? "Incorrect metric selected. Look at the data again." 
        : "Correct metric, but incorrect reason/action."
      );
      onComplete(false); // Only if we want immediate failure. But usually we let them try again if lives allow? 
      // The parent handles logic. If we call onComplete(false), parent deducts life.
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              cursor={{fill: '#f1f5f9'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            {data[0].target && <ReferenceLine y={90} label="Target" stroke="red" strokeDasharray="3 3" />}
            <Bar dataKey="value" onClick={handleBarClick} cursor="pointer">
              {data.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedMetric === entry.name ? '#3b82f6' : '#94a3b8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-800">{question}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-sm text-slate-500 block mb-1">Selected Metric</span>
            <span className={`font-medium ${selectedMetric ? 'text-blue-600' : 'text-slate-400'}`}>
              {selectedMetric || "Click a bar on chart"}
            </span>
          </div>
          
          <div className="relative">
            <select 
              className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              onChange={(e) => setSelectedReason(e.target.value)}
              value={selectedReason || ""}
            >
              <option value="" disabled>Select Reason / Action</option>
              {options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {feedback && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium animate-pulse">
            {feedback}
          </div>
        )}

        <button 
          onClick={handleSubmit}
          className="w-full py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
        >
          Submit Analysis
        </button>
      </div>
    </div>
  );
};

export default DashboardTask;
