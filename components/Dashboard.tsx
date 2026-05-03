import React, { useMemo, useState } from 'react';
import { View } from '../types';
import { TOP_DRUGS_LIST } from '../constants';

interface DashboardProps {
  setView: (view: View) => void;
}

const SearchIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z" />
  </svg>
);

const CalculatorIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Zm2.25 4.5h6m-6 4.5h.01m3 0h.01m3 0h.01m-6 3h.01m3 0h.01m3 0h.01" />
  </svg>
);

const PillIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
  </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const [lookupQuery, setLookupQuery] = useState('');

  const lookupMatches = useMemo(() => {
    const query = lookupQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    return TOP_DRUGS_LIST
      .filter(drug => (
        drug.brand.toLowerCase().includes(query) ||
        drug.generic.toLowerCase().includes(query)
      ))
      .slice(0, 4);
  }, [lookupQuery]);

  return (
    <div className="mx-auto w-full max-w-md px-5 py-5">
      <section className="mb-5">
        <p className="text-2xl font-semibold tracking-normal text-slate-950">
          Good morning
        </p>
        <p className="mt-1 text-base text-slate-500">
          Your pharmacy tools at a glance.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-indigo-500/25">
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/85">Quick lookup</p>
          <h1 className="mt-2 max-w-[76%] text-2xl font-semibold leading-tight">Search medication details</h1>
          <div className="mt-5 rounded-2xl bg-white p-2 text-slate-950 shadow-sm">
            <label className="flex items-center gap-2 px-2">
              <SearchIcon className="h-5 w-5 shrink-0 text-indigo-600" />
              <input
                value={lookupQuery}
                onChange={event => setLookupQuery(event.target.value)}
                placeholder="Search brand or generic"
                className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </label>
            {lookupMatches.length > 0 && (
              <div className="mt-1 divide-y divide-slate-100 rounded-xl bg-slate-50">
                {lookupMatches.map(drug => (
                  <button
                    key={`${drug.brand}-${drug.generic}`}
                    onClick={() => setView(View.Glossary)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-950">{drug.generic}</span>
                      <span className="block text-xs text-slate-500">{drug.brand}</span>
                    </span>
                    <span className="text-xs font-semibold text-indigo-600">Open</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="absolute right-5 top-10 h-28 w-16 rotate-[28deg] rounded-full bg-white/95 shadow-2xl shadow-indigo-950/30">
          <div className="absolute inset-x-2 top-1/2 h-px bg-slate-300" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 text-2xl font-semibold text-slate-300">
            Rx
          </span>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-4">
        <button
          onClick={() => setView(View.HospitalCalculations)}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition active:scale-[0.99]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
            <CalculatorIcon />
          </span>
          <span className="mt-5 block text-base font-semibold text-slate-950">Calculators</span>
          <span className="mt-1 block text-sm leading-5 text-slate-500">Days supply, IV, and compounding</span>
        </button>
        <button
          onClick={() => setView(View.PillIdentifier)}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition active:scale-[0.99]"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
            <PillIcon />
          </span>
          <span className="mt-5 block text-base font-semibold text-slate-950">Pill Identifier</span>
          <span className="mt-1 block text-sm leading-5 text-slate-500">Imprint, color, and shape</span>
        </button>
      </section>

      <p className="mt-7 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500">
        Calculations and drug information should be verified by a licensed pharmacist before use.
      </p>
    </div>
  );
};

export default Dashboard;
