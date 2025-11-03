import React from 'react';
import { View } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentView: View;
  onBack?: () => void;
  showBack?: boolean;
}

const viewTitles: Record<View, string> = {
  [View.Dashboard]: 'RxMate',
  [View.Glossary]: 'Drug Lookup',
  [View.SigGlossary]: 'SIG Code Trainer',
  [View.DaysSupplyCalc]: 'Days Supply Calculator',
  [View.PillIdentifier]: 'Pill Identifier',
  [View.FlashCards]: 'PTCB Prep',
  [View.InjectionGuide]: 'Injection Guide',
  [View.IVFlowRate]: 'IV Flow Rate',
  [View.Alligation]: 'Alligation Calculator',
  [View.HospitalCalculations]: 'Hospital Calculations',
  [View.BillingInsurance]: 'Billing & Insurance',
  [View.DiscountCardFinder]: 'Discount Card Finder',
  [View.PriorAuthHelper]: 'Prior Authorization Helper',
};

// Color mapping for each view
const viewColors: Record<View, { from: string; to: string }> = {
  [View.Dashboard]: { from: 'from-blue-600', to: 'to-blue-500' },
  [View.DaysSupplyCalc]: { from: 'from-blue-600', to: 'to-blue-500' },
  [View.HospitalCalculations]: { from: 'from-teal-600', to: 'to-emerald-500' },
  [View.Glossary]: { from: 'from-violet-600', to: 'to-purple-500' },
  [View.PillIdentifier]: { from: 'from-amber-600', to: 'to-orange-500' },
  [View.SigGlossary]: { from: 'from-emerald-600', to: 'to-emerald-500' },
  [View.FlashCards]: { from: 'from-rose-600', to: 'to-pink-500' },
  [View.InjectionGuide]: { from: 'from-indigo-600', to: 'to-indigo-500' },
  [View.IVFlowRate]: { from: 'from-cyan-600', to: 'to-cyan-500' },
  [View.Alligation]: { from: 'from-fuchsia-600', to: 'to-fuchsia-500' },
  [View.BillingInsurance]: { from: 'from-green-600', to: 'to-green-500' },
  [View.DiscountCardFinder]: { from: 'from-orange-600', to: 'to-orange-500' },
  [View.PriorAuthHelper]: { from: 'from-sky-600', to: 'to-sky-500' },
};

const Header: React.FC<HeaderProps> = ({ currentView, onBack, showBack }) => {
  const { primaryColor, textColor, borderColor } = useTheme();
  const isDashboard = currentView === View.Dashboard;
  const currentColors = viewColors[currentView] || viewColors[View.Dashboard];

  const handleBack = () => {
    if (currentView !== View.Dashboard && onBack) {
      onBack();
    }
  };

  // Calculate progress percentage based on view (for non-dashboard views)
  const getProgressPercentage = () => {
    if (isDashboard) return 0;
    // Simple progress indicator based on view type
    return 33;
  };

  return (
    <header className={`sticky top-0 z-50 glass-effect transition-all duration-300 ${isDashboard ? 'bg-white/95' : `bg-gradient-to-r ${currentColors.from} ${currentColors.to} text-white`} border-b ${isDashboard ? 'border-neutral-200' : 'border-white/20'} shadow-sm`}>
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(showBack && !isDashboard) && (
              <button
                onClick={handleBack}
                className={`group p-2 rounded-xl ${isDashboard ? 'text-blue-600 hover:bg-blue-50' : 'text-white/90 hover:bg-white/20'} transition-all duration-200 hover:scale-105 active:scale-95`}
                aria-label="Go back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}

            <div className="flex items-center gap-3">
              {/* Pharmacy Cross Icon */}
              <div className={`relative inline-flex items-center justify-center h-11 w-11 rounded-2xl ${isDashboard ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white/20 backdrop-blur-sm'} ring-2 ${isDashboard ? 'ring-blue-500/20' : 'ring-white/30'} transition-all duration-300 group-hover:scale-110`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDashboard ? 'text-white' : 'text-white'}`} viewBox="0 0 24 24" fill="currentColor">
                  {/* Medical Cross */}
                  <path d="M14 2H10C9.45 2 9 2.45 9 3V9H3C2.45 9 2 9.45 2 10V14C2 14.55 2.45 15 3 15H9V21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V15H21C21.55 15 22 14.55 22 14V10C22 9.45 21.55 9 21 9H15V3C15 2.45 14.55 2 14 2Z"/>
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`text-xl sm:text-2xl font-bold leading-tight ${isDashboard ? 'text-neutral-900' : 'text-white'}`}>
                    {isDashboard ? 'RxMate' : viewTitles[currentView]}
                  </h1>
                  {isDashboard && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                      v2.0
                    </span>
                  )}
                </div>
                <p className={`text-xs sm:text-sm mt-0.5 ${isDashboard ? 'text-neutral-600' : 'text-white/90'}`}>
                  {isDashboard ? 'Professional tools for pharmacy technicians' : 'Dashboard / ' + viewTitles[currentView]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator for Non-Dashboard Views */}
      {!isDashboard && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white/60 transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
