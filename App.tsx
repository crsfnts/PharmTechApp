import React, { useState, useCallback } from 'react';
import { View } from './types';
import Dashboard from './components/Dashboard';
import DaysSupplyCalculator from './components/DosageCalculator';
import Glossary from './components/DrugLookup';
import PillIdentifier from './components/PillIdentifier';
import SIGTrainer from './components/SIGTrainer';
import Header from './components/Header';
import PTCBLearning from './components/FlashCards';
import InjectionGuide from './components/InjectionGuide';
import IVFlowRateCalculator from './components/IVFlowRateCalculator';
import AlligationCalculator from './components/AlligationCalculator';
import HospitalCalculations from './components/HospitalCalculations';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [viewHistory, setViewHistory] = useState<View[]>([]);

  const setView = useCallback((view: View) => {
    setViewHistory(prev => [...prev, currentView]);
    setCurrentView(view);
  }, [currentView]);

  const goBack = useCallback(() => {
    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView);
    } else {
      setCurrentView(View.Dashboard);
    }
  }, [viewHistory]);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard setView={setView} />;
      case View.Glossary:
        return <Glossary setView={setView} />;
      case View.DaysSupplyCalc:
        return <DaysSupplyCalculator setView={setView} />;
      case View.SigGlossary:
        return <SIGTrainer setView={setView} />;
      case View.PillIdentifier:
        return <PillIdentifier setView={setView} />;
      case View.FlashCards:
        return <PTCBLearning setView={setView} />;
      case View.InjectionGuide:
        return <InjectionGuide setView={setView} />;
      case View.HospitalCalculations:
        return <HospitalCalculations setView={setView} />;
      case View.IVFlowRate:
        return <IVFlowRateCalculator setView={setView} />;
      case View.Alligation:
        return <AlligationCalculator setView={setView} />;
      default:
        // Default to Dashboard as the home view
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <ThemeProvider view={currentView}>
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <Header
          currentView={currentView}
          onBack={goBack}
          showBack={currentView !== View.Dashboard}
        />

        {/* Main content */}
        <main className="flex-1 w-full">
          {renderView()}
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-white border-t border-neutral-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H10C9.45 2 9 2.45 9 3V9H3C2.45 9 2 9.45 2 10V14C2 14.55 2.45 15 3 15H9V21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V15H21C21.55 15 22 14.55 22 14V10C22 9.45 21.55 9 21 9H15V3C15 2.45 14.55 2 14 2Z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Pharm-Assist Tech v2.0</p>
                  <p className="text-xs text-neutral-600">Professional Edition</p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs text-neutral-600">
                  &copy; 2024 Pharm-Assist Tech. All information should be verified by a licensed pharmacist.
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Created with care by <span className="font-semibold text-neutral-700">Christopher Fuentes</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;