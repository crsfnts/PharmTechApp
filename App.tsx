import React, { useState, useCallback } from 'react';
import { View } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import DaysSupplyCalculator from './components/DosageCalculator.tsx';
import Glossary from './components/DrugLookup.tsx';
import PillIdentifier from './components/PillIdentifier.tsx';
import SigGlossary from './components/Abbreviations';
import SIGTrainer from './components/SIGTrainer';
import Header from './components/Header.tsx';
import PTCBLearning from './components/FlashCards.tsx';
import InjectionGuide from './components/InjectionGuide.tsx';
import IVFlowRateCalculator from './components/IVFlowRateCalculator.tsx';
import Sidebar from './components/Sidebar.tsx';
import MobileNav from './components/MobileNav.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);

  const setView = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const renderView = () => {
    switch (currentView) {
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
      case View.IVFlowRate:
        return <IVFlowRateCalculator setView={setView} />;
      case View.Dashboard:
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      {/* Mobile navigation (below sticky header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MobileNav currentView={currentView} setView={setView} />
      </div>

      {/* Main layout with sidebar + content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:gap-6">
          <Sidebar currentView={currentView} setView={setView} />
          <main className="flex-1 py-6">
            {renderView()}
          </main>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-500 p-6 border-t border-slate-200 mt-8">
        <p>Pharm-Assist Tech Version 2 &copy; 2024. All information should be verified by a licensed pharmacist.</p>
        <p className="mt-1 font-medium">Created by Christopher Fuentes</p>
      </footer>
    </div>
  );
};

export default App;