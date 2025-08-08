import React from 'react';
import { View } from '../types.ts';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const navItems: Array<{ key: View; label: string; icon: React.ReactNode }> = [
  { key: View.Dashboard, label: 'Dashboard', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75v9.375c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V20.25h4.125c.621 0 1.125-.504 1.125-1.125V9.75"/></svg>
  )},
  { key: View.DaysSupplyCalc, label: 'Days Supply Calc', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"/></svg>
  )},
  { key: View.Glossary, label: 'Glossary (AI)', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
  )},
  { key: View.PillIdentifier, label: 'Pill Identifier', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
  )},
  { key: View.SigGlossary, label: 'Sig Abbreviations', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0v14.25"/></svg>
  )},
  { key: View.FlashCards, label: 'PTCB Learning', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347"/></svg>
  )},
  { key: View.InjectionGuide, label: 'Injection Guide', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5"/></svg>
  )},
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] sticky top-16">
      <nav className="p-4 space-y-1">
        {navItems.map(item => {
          const active = item.key === currentView;
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                active ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-600/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              ].join(' ')}
            >
              <span className={active ? 'text-teal-600' : 'text-slate-400'}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
