import React, { useState } from 'react';
import { View } from '../types';
import { AppPage, PageHeader } from './AppLayout';

interface CalculatorHubProps {
  setView: (view: View) => void;
}

type CalculatorCategory = 'All' | 'Dosing' | 'IV' | 'Compounding';

type CalculatorItem = {
  title: string;
  description: string;
  category: Exclude<CalculatorCategory, 'All'>;
  view: View;
  tone: string;
  icon: React.ReactNode;
};

const CalculatorIcon = ({ className = 'h-7 w-7' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Zm2.25 4.5h6m-6 4.5h.01m3 0h.01m3 0h.01m-6 3h.01m3 0h.01m3 0h.01" />
  </svg>
);

const SyringeIcon = ({ className = 'h-7 w-7' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5.75-.75m-3 3 3-3 1.5 1.5-3 3m-1.5-1.5L6.75 16.5l-1.5 3.75L9 18.75 19.5 8.25l-3-3Zm-6 6 3 3m-5.25 2.25 3 3" />
  </svg>
);

const BeakerIcon = ({ className = 'h-7 w-7' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75h4.5M10.5 3.75v5.1l-5.25 8.4A2.25 2.25 0 0 0 7.16 20.25h9.68a2.25 2.25 0 0 0 1.91-3l-5.25-8.4v-5.1M8.25 14.25h7.5" />
  </svg>
);

const PillIcon = ({ className = 'h-7 w-7' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
  </svg>
);

const calculators: CalculatorItem[] = [
  {
    title: 'Oral Days Supply',
    description: 'Tablets, capsules, and standard directions',
    category: 'Dosing',
    view: View.DaysSupplyOral,
    tone: 'bg-indigo-50 text-indigo-600',
    icon: <CalculatorIcon />,
  },
  {
    title: 'Inhaler Days Supply',
    description: 'Puffs per use, daily use, and inhaler count',
    category: 'Dosing',
    view: View.DaysSupplyInhaler,
    tone: 'bg-sky-50 text-sky-600',
    icon: <PillIcon />,
  },
  {
    title: 'Injectable Days Supply',
    description: 'Vials, pens, syringes, dose, and frequency',
    category: 'Dosing',
    view: View.DaysSupplyInjectable,
    tone: 'bg-emerald-50 text-emerald-600',
    icon: <SyringeIcon />,
  },
  {
    title: 'IV Flow Rate',
    description: 'mL/hr, gtt/min, and time calculations',
    category: 'IV',
    view: View.IVFlowRate,
    tone: 'bg-violet-50 text-violet-600',
    icon: <SyringeIcon />,
  },
  {
    title: 'Alligation',
    description: 'Mixing ratios for compounding',
    category: 'Compounding',
    view: View.Alligation,
    tone: 'bg-amber-50 text-amber-600',
    icon: <BeakerIcon />,
  },
];

const categories: CalculatorCategory[] = ['All', 'Dosing', 'IV', 'Compounding'];

const CalculatorHub: React.FC<CalculatorHubProps> = ({ setView }) => {
  const [activeCategory, setActiveCategory] = useState<CalculatorCategory>('All');

  const visibleCalculators = calculators.filter(item => (
    activeCategory === 'All' || item.category === activeCategory
  ));

  return (
    <AppPage>
      <PageHeader
        title="Calculators"
        subtitle="Quick, accurate calculations for everyday pharmacy tasks."
      />

      <div className="-mx-5 mb-5 overflow-x-auto px-5">
        <div className="flex min-w-max gap-2">
          {categories.map(category => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={[
                  'rounded-xl px-4 py-2 text-sm font-semibold transition',
                  active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' : 'bg-slate-50 text-slate-500',
                ].join(' ')}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <section className="space-y-3">
        {visibleCalculators.map(calculator => (
          <button
            key={calculator.title}
            onClick={() => setView(calculator.view)}
            className="flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition active:scale-[0.99]"
          >
            <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${calculator.tone}`}>
              {calculator.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-slate-950">{calculator.title}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{calculator.description}</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
        <p className="text-sm font-semibold text-indigo-700">Tip</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Keep units consistent and verify final values with a licensed pharmacist.
        </p>
      </section>
    </AppPage>
  );
};

export default CalculatorHub;
