import React, { useState, useCallback } from 'react';
import { View } from './types';
import DaysSupplyCalculator from './components/DosageCalculator';
import Glossary from './components/DrugLookup';
import PillIdentifier from './components/PillIdentifier';
import SIGTrainer from './components/SIGTrainer';
import PTCBLearning from './components/FlashCards';
import InjectionGuide from './components/InjectionGuide';
import IVFlowRateCalculator from './components/IVFlowRateCalculator';
import AlligationCalculator from './components/AlligationCalculator';
import HospitalCalculations from './components/HospitalCalculations';

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
      case View.HospitalCalculations:
        return <HospitalCalculations setView={setView} />;
      case View.IVFlowRate:
        return <IVFlowRateCalculator setView={setView} />;
      case View.Alligation:
        return <AlligationCalculator setView={setView} />;
      default:
        // Default to Days Supply Calculator as the home view
        return <DaysSupplyCalculator setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col">
          {/* Main content */}
          <main className="flex-1">
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