import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Demo Project Notice" className="bg-slate-900 border-b border-teal-500/20 text-slate-300 text-xs py-2 px-4 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Info className="w-4 h-4 text-teal-400 shrink-0" />
          <p className="truncate">
            <span className="font-semibold text-teal-300">College Capstone Project:</span>{' '}
            BusGo prototype with simulated seat reservations & payments. No live payment gateway or real transactions.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
