import React, { useState, useCallback } from 'react';
import { View } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import DaysSupplyCalculator from './components/DosageCalculator.tsx';
import Glossary from './components/DrugLookup.tsx';
import Counter from './components/IVDripRateCalculator.tsx';
import SigGlossary from './components/Abbreviations.tsx';
import Header from './components/Header.tsx';
import PTCBLearning from './components/FlashCards.tsx';
import InjectionGuide from './components/InjectionGuide.tsx';

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
        return <SigGlossary setView={setView} />;
      case View.Counter:
        return <Counter setView={setView} />;
      case View.FlashCards:
        return <PTCBLearning setView={setView} />;
      case View.InjectionGuide:
        return <InjectionGuide setView={setView} />;
      case View.Dashboard:
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderView()}
      </main>
      <footer className="text-center text-xs text-slate-400 p-4">
        <p>Pharm-Assist Tech Version 2 &copy; 2024. All information should be verified by a licensed pharmacist.</p>
        <p className="mt-1 font-medium">Created by Christopher Fuentes</p>
      </footer>
    </div>
  );
};

export default App;