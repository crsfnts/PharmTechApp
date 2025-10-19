import React from 'react';
import { View, viewColors } from '../types';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentView: View;
  onBack?: () => void;
  showBack?: boolean;
}

const viewTitles: Record<View, string> = {
  [View.Dashboard]: 'Pharm-Assist Tech',
  [View.Glossary]: 'Glossary',
  [View.SigGlossary]: 'Sig Trainer',
  [View.DaysSupplyCalc]: 'Days Supply Calculator',
  [View.PillIdentifier]: 'Pill Identifier',
  [View.FlashCards]: 'PTCB Prep',
  [View.InjectionGuide]: 'Injection Guide',
  [View.IVFlowRate]: 'IV Flow Rate',
  [View.Alligation]: 'Alligation Calculator',
  [View.HospitalCalculations]: 'Hospital Calculations'
};

const Header: React.FC<HeaderProps> = ({ currentView, onBack, showBack }) => {
  const navigate = useNavigate();
  const bgColor = viewColors[currentView] || 'bg-white';
  const isDashboard = currentView === View.Dashboard;
  const textColor = isDashboard ? 'text-slate-800' : 'text-white';
  
  const handleBack = () => {
    if (currentView !== View.Dashboard) {
      onBack?.();
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`${bgColor} sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center">
        {(showBack && !isDashboard) && (
          <button
            onClick={handleBack}
            className={`mr-4 p-1 rounded-full ${isDashboard ? 'text-teal-600 hover:bg-teal-50' : 'text-white/90 hover:bg-white/20'} transition-colors`}
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-teal-50 text-teal-600 ring-1 ring-teal-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1zm2 0a1 1 0 011-1h0a1 1 0 110 2h-1a1 1 0 01-1-1z" />
            </svg>
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight text-slate-900">Pharm-Assist Tech</h1>
            <p className="text-xs text-slate-500">Tools and learning resources for pharmacy technicians</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
