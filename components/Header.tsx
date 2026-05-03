import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onBack?: () => void;
  showBack?: boolean;
  onOpenOnboarding?: () => void;
}

const viewTitles: Record<View, string> = {
  [View.Dashboard]: 'Workbench',
  [View.Glossary]: 'Drug Lookup',
  [View.SigGlossary]: 'SIG Code Trainer',
  [View.DaysSupplyCalc]: 'Days Supply Calculator',
  [View.DaysSupplyOral]: 'Oral Days Supply',
  [View.DaysSupplyInhaler]: 'Inhaler Days Supply',
  [View.DaysSupplyInjectable]: 'Injectable Calculator',
  [View.PillIdentifier]: 'Pill Identifier',
  [View.FlashCards]: 'PTCB Prep',
  [View.Education]: 'Education',
  [View.InjectionGuide]: 'Injection Guide',
  [View.IVFlowRate]: 'IV Flow Rate',
  [View.Alligation]: 'Alligation Calculator',
  [View.HospitalCalculations]: 'Hospital Calculations',
  [View.BillingInsurance]: 'Billing & Insurance',
  [View.DiscountCardFinder]: 'Discount Card Finder',
  [View.PriorAuthHelper]: 'Prior Authorization',
};

const Header: React.FC<HeaderProps> = ({ currentView, onBack, showBack, onOpenOnboarding }) => {
  const isDashboard = currentView === View.Dashboard;

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-slate-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-5">
        <div className="flex min-w-0 items-center gap-3">
          {showBack && !isDashboard && (
            <button
              onClick={onBack}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2h-4a1 1 0 0 0-1 1v6H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6V3a1 1 0 0 0-1-1Z" />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold tracking-normal text-indigo-600">rxmate</p>
              <span className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[11px] font-medium text-slate-500 md:inline-flex">
                Professional
              </span>
            </div>
            <p className="truncate text-sm text-slate-500">{viewTitles[currentView]}</p>
          </div>
        </div>

        <button
          onClick={onOpenOnboarding}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          aria-label="Open guide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 18.75a2.25 2.25 0 0 1-4.5 0m8.25-6V10.5a6 6 0 1 0-12 0v2.25L4.5 15v1.5h15V15L18 12.75Z" />
          </svg>
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[11px] font-semibold text-white">
            ?
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
