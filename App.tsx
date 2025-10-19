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
import Sidebar from './components/Sidebar';

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
    <div className="min-h-screen bg-slate-100">
      <Header onBack={goBack} showBack={currentView !== View.Dashboard} />
      
      {/* Main content */}
      <main className="w-full">
        {renderView()}
      </main>
      <footer className="text-center text-xs text-slate-500 p-6 border-t border-slate-200 mt-8">
        <p>Pharm-Assist Tech Version 2 &copy; 2024. All information should be verified by a licensed pharmacist.</p>
        <p className="mt-1 font-medium">Created by Christopher Fuentes</p>
      </footer>
    </div>
  );
};

export default App;