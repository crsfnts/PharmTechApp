import React, { useState } from 'react';
import { View } from '../types.ts';

interface MobileNavProps {
  currentView: View;
  setView: (view: View) => void;
}

const items: Array<{ key: View; label: string }> = [
  { key: View.Dashboard, label: 'Dashboard' },
  { key: View.DaysSupplyCalc, label: 'Days Supply' },
  { key: View.Glossary, label: 'Glossary' },
  { key: View.PillIdentifier, label: 'Pill Identifier' },
  { key: View.SigGlossary, label: 'Sig' },
  { key: View.FlashCards, label: 'PTCB' },
  { key: View.InjectionGuide, label: 'Injection' },
];

const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden border-b border-slate-200 bg-white sticky top-16 z-40">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700 truncate">
          {items.find(i => i.key === currentView)?.label}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-500 hover:text-slate-700 p-2"
          aria-label="Toggle navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
        </button>
      </div>
      {open && (
        <div className="px-2 pb-2 grid grid-cols-2 gap-2">
          {items.map(item => (
            <button
              key={item.key}
              onClick={() => { setView(item.key); setOpen(false); }}
              className={[
                'w-full px-3 py-2 text-sm rounded-md border',
                item.key === currentView ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
