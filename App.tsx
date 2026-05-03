import React, { useState, useCallback } from 'react';
import { CalculatorType, View } from './types';
import Dashboard from './components/Dashboard';
import DaysSupplyCalculator from './components/DosageCalculator';
import Glossary from './components/DrugLookup';
import PillIdentifier from './components/PillIdentifier';
import SIGTrainer from './components/SIGTrainer';
import Header from './components/Header';
import Education from './components/Education';
import PTCBLearning from './components/FlashCards';
import InjectionGuide from './components/InjectionGuide';
import IVFlowRateCalculator from './components/IVFlowRateCalculator';
import AlligationCalculator from './components/AlligationCalculator';
import HospitalCalculations from './components/HospitalCalculations';
import BillingInsurance from './components/BillingInsurance';
import DiscountCardFinder from './components/DiscountCardFinder';
import PriorAuthHelper from './components/PriorAuthHelper';
import Onboarding from './components/Onboarding';
import { ThemeProvider } from './context/ThemeContext';

const ONBOARDING_STORAGE_KEY = 'rxmate:onboarding-complete';

const BottomNavIcon = ({ type }: { type: 'home' | 'lookup' | 'pill' | 'tools' | 'study' }) => {
  if (type === 'lookup') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z" />
      </svg>
    );
  }

  if (type === 'pill') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
      </svg>
    );
  }

  if (type === 'tools') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Zm2.25 4.5h6m-6 4.5h.01m3 0h.01m3 0h.01m-6 3h.01m3 0h.01m3 0h.01" />
      </svg>
    );
  }

  if (type === 'study') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A8.25 8.25 0 0 0 5.25 3.5C4.45 3.5 3.69 3.62 3 3.85v14.5c.7-.23 1.45-.35 2.25-.35A8.25 8.25 0 0 1 12 21.25m0-14.5a8.25 8.25 0 0 1 6.75-3.25c.8 0 1.56.12 2.25.35v14.5a7.21 7.21 0 0 0-2.25-.35A8.25 8.25 0 0 0 12 21.25m0-14.5v14.5" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 11.25 8.25-7.5 8.25 7.5v8.25a.75.75 0 0 1-.75.75h-5.25v-5.25h-4.5v5.25H4.5a.75.75 0 0 1-.75-.75v-8.25Z" />
    </svg>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [viewHistory, setViewHistory] = useState<View[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(() => (
    window.localStorage.getItem(ONBOARDING_STORAGE_KEY) !== 'true'
  ));

  const setView = useCallback((view: View) => {
    setViewHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    // Scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const goBack = useCallback(() => {
    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView);
    } else {
      setCurrentView(View.Dashboard);
    }
    // Scroll to top when going back
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewHistory]);

  const closeOnboarding = useCallback(() => {
    window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setShowOnboarding(false);
  }, []);

  const openOnboarding = useCallback(() => {
    setShowOnboarding(true);
  }, []);

  const isActive = useCallback((views: View[]) => views.includes(currentView), [currentView]);

  const navButtonClass = (active: boolean) => [
    'flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition',
    active ? 'text-indigo-600' : 'text-slate-500',
  ].join(' ');

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard setView={setView} />;
      case View.Glossary:
        return <Glossary setView={setView} />;
      case View.DaysSupplyCalc:
        return <DaysSupplyCalculator setView={setView} initialType={CalculatorType.Oral} allowTypeSwitch />;
      case View.DaysSupplyOral:
        return <DaysSupplyCalculator setView={setView} initialType={CalculatorType.Oral} allowTypeSwitch={false} />;
      case View.DaysSupplyInhaler:
        return <DaysSupplyCalculator setView={setView} initialType={CalculatorType.Inhaler} allowTypeSwitch={false} />;
      case View.DaysSupplyInjectable:
        return <DaysSupplyCalculator setView={setView} initialType={CalculatorType.Injectable} allowTypeSwitch={false} />;
      case View.SigGlossary:
        return <SIGTrainer setView={setView} />;
      case View.PillIdentifier:
        return <PillIdentifier setView={setView} />;
      case View.FlashCards:
        return <PTCBLearning setView={setView} />;
      case View.Education:
        return <Education setView={setView} />;
      case View.InjectionGuide:
        return <InjectionGuide setView={setView} />;
      case View.HospitalCalculations:
        return <HospitalCalculations setView={setView} />;
      case View.IVFlowRate:
        return <IVFlowRateCalculator setView={setView} />;
      case View.Alligation:
        return <AlligationCalculator setView={setView} />;
      case View.BillingInsurance:
        return <BillingInsurance setView={setView} />;
      case View.DiscountCardFinder:
        return <DiscountCardFinder setView={setView} />;
      case View.PriorAuthHelper:
        return <PriorAuthHelper setView={setView} />;
      default:
        // Default to Dashboard as the home view
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <ThemeProvider view={currentView}>
      <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
        <Header
          currentView={currentView}
          onBack={goBack}
          showBack={currentView !== View.Dashboard}
          onOpenOnboarding={openOnboarding}
        />

        {/* Main content with view transition */}
        <main className="flex-1 w-full">
          <div key={currentView} className="animate-fade-in">
            {renderView()}
          </div>
        </main>

        <footer className="mt-8 hidden border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>RxMate Professional Edition</p>
            <p>Verify all information with a licensed pharmacist.</p>
          </div>
        </footer>

        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-5 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mx-auto grid max-w-md grid-cols-5 items-end">
            <button onClick={() => setCurrentView(View.Dashboard)} className={navButtonClass(isActive([View.Dashboard]))}>
              <BottomNavIcon type="home" />
              Home
            </button>
            <button onClick={() => setView(View.PillIdentifier)} className={navButtonClass(isActive([View.PillIdentifier]))}>
              <BottomNavIcon type="pill" />
              Pill ID
            </button>
            <button
              onClick={() => setView(View.Glossary)}
              className="mx-auto -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
              aria-label="Open drug lookup"
            >
              <BottomNavIcon type="lookup" />
            </button>
            <button onClick={() => setView(View.HospitalCalculations)} className={navButtonClass(isActive([View.DaysSupplyCalc, View.DaysSupplyOral, View.DaysSupplyInhaler, View.DaysSupplyInjectable, View.HospitalCalculations, View.IVFlowRate, View.Alligation]))}>
              <BottomNavIcon type="tools" />
              Calc
            </button>
            <button onClick={() => setView(View.Education)} className={navButtonClass(isActive([View.Education, View.FlashCards, View.SigGlossary, View.BillingInsurance, View.PriorAuthHelper, View.InjectionGuide]))}>
              <BottomNavIcon type="study" />
              Study
            </button>
          </div>
        </nav>

        {showOnboarding && <Onboarding onClose={closeOnboarding} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
