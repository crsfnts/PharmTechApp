import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from '../types.ts';
import type { DrugInfo, TopDrug } from '../types.ts';
import { findDrugLocally } from './drugData.ts';
import Spinner from './Spinner.tsx';
import { TOP_DRUGS_LIST } from '../constants.ts';
import { AppPage, PageHeader, SectionCard, SectionLabel, primaryButtonClass } from './AppLayout.tsx';

interface GlossaryProps {
  setView: (view: View) => void;
}

type QuickFilter = 'Top 200 Drugs' | 'Brand ↔ Generic' | 'Controlled Substances' | 'Common Uses' | 'High-alert Meds';

const Icon = ({ type, className = 'h-5 w-5' }: { type: 'search' | 'pill' | 'book' | 'alert' | 'chevron' | 'tag'; className?: string }) => {
  if (type === 'chevron') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
      </svg>
    );
  }

  if (type === 'book') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A8.25 8.25 0 0 0 5.25 3.5C4.45 3.5 3.69 3.62 3 3.85v14.5c.7-.23 1.45-.35 2.25-.35A8.25 8.25 0 0 1 12 21.25m0-14.5a8.25 8.25 0 0 1 6.75-3.25c.8 0 1.56.12 2.25.35v14.5a7.21 7.21 0 0 0-2.25-.35A8.25 8.25 0 0 0 12 21.25m0-14.5v14.5" />
      </svg>
    );
  }

  if (type === 'alert') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v4.5m0 3h.01M10.3 4.7 3.6 18a1.5 1.5 0 0 0 1.34 2.17h14.12A1.5 1.5 0 0 0 20.4 18L13.7 4.7a1.5 1.5 0 0 0-2.68 0Z" />
      </svg>
    );
  }

  if (type === 'tag') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.01M3.75 6.75v5.5c0 .6.24 1.17.66 1.59l6.75 6.75a2.25 2.25 0 0 0 3.18 0l5.25-5.25a2.25 2.25 0 0 0 0-3.18L12.84 5.41a2.25 2.25 0 0 0-1.59-.66h-5.5a2 2 0 0 0-2 2Z" />
      </svg>
    );
  }

  if (type === 'pill') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z" />
    </svg>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-3">
    <h2 className="text-base font-semibold text-slate-950">{title}</h2>
    {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
  </div>
);

const DrugResultRow: React.FC<{ drug: TopDrug; onClick: () => void }> = ({ drug, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition active:scale-[0.99]"
  >
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
      <Icon type="pill" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-semibold text-slate-950">{drug.generic}</span>
      <span className="mt-1 block truncate text-xs leading-5 text-slate-500">{drug.brand}</span>
    </span>
    {drug.schedule && (
      <span className="rounded-lg bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700">C-{drug.schedule}</span>
    )}
    <Icon type="chevron" className="h-5 w-5 shrink-0 text-slate-400" />
  </button>
);

const DetailCard: React.FC<{ title: string; children: React.ReactNode; tone?: string }> = ({ title, children, tone = 'bg-white' }) => (
  <section className={`rounded-3xl border border-slate-200 p-4 shadow-sm ${tone}`}>
    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-600">{title}</h3>
    <div className="mt-3 text-sm leading-6 text-slate-700">{children}</div>
  </section>
);

const Glossary: React.FC<GlossaryProps> = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'brand' | 'generic' | 'schedule'>('generic');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'II' | 'III' | 'IV' | 'V'>('all');
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilter>('Top 200 Drugs');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const executeSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Search for a medication to see details.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      const q = searchQuery.trim().toLowerCase();
      const brandsForQuery: string[] = [];
      TOP_DRUGS_LIST.forEach((drug) => {
        if (drug.generic.toLowerCase() === q || drug.brand.toLowerCase() === q) {
          brandsForQuery.push(drug.brand);
        }
      });

      const local = findDrugLocally(searchQuery, brandsForQuery);
      if (local) {
        setDrugInfo(local);
        return;
      }

      setError('No results found. Try checking the spelling or adding more details.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(drugName);
  };

  const handleDrugItemClick = (name: string) => {
    setDrugName(name);
    executeSearch(name);
  };

  const handleBackToList = () => {
    setDrugInfo(null);
    setDrugName('');
    setError(null);
  };

  const applyQuickFilter = (filter: QuickFilter) => {
    setActiveQuickFilter(filter);
    setDrugInfo(null);
    setError(null);

    if (filter === 'Brand ↔ Generic') {
      setSortKey('brand');
      setScheduleFilter('all');
      setDrugName('');
      return;
    }

    if (filter === 'Controlled Substances') {
      setSortKey('schedule');
      setScheduleFilter('all');
      setDrugName('');
      return;
    }

    if (filter === 'Common Uses') {
      setSortKey('generic');
      setScheduleFilter('all');
      setDrugName('');
      return;
    }

    if (filter === 'High-alert Meds') {
      setSortKey('generic');
      setScheduleFilter('all');
      setDrugName('insulin');
      return;
    }

    setSortKey('generic');
    setScheduleFilter('all');
    setDrugName('');
  };

  const sortedAndFilteredDrugs = useMemo(() => {
    let filtered = [...TOP_DRUGS_LIST];

    if (sortKey === 'schedule') {
      filtered = scheduleFilter === 'all'
        ? filtered.filter(drug => drug.schedule)
        : filtered.filter(drug => drug.schedule === scheduleFilter);
    }

    const lowercasedFilter = drugName.toLowerCase();
    if (lowercasedFilter) {
      filtered = filtered.filter(
        (drug) =>
          drug.brand.toLowerCase().includes(lowercasedFilter) ||
          drug.generic.toLowerCase().includes(lowercasedFilter)
      );
    }

    return filtered.sort((a, b) => {
      if (sortKey === 'generic') return a.generic.localeCompare(b.generic);
      if (sortKey === 'brand') return a.brand.localeCompare(b.brand);
      if (sortKey === 'schedule') {
        const scheduleOrder: Record<string, number> = { II: 1, III: 2, IV: 3, V: 4 };
        const aOrder = a.schedule ? scheduleOrder[a.schedule] || 999 : 999;
        const bOrder = b.schedule ? scheduleOrder[b.schedule] || 999 : 999;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.generic.localeCompare(b.generic);
      }
      return a.brand.localeCompare(b.brand);
    });
  }, [drugName, sortKey, scheduleFilter]);

  const commonLookups = [
    { generic: 'Lisinopril', descriptor: 'ACE inhibitor' },
    { generic: 'Metformin', descriptor: 'Diabetes medication' },
    { generic: 'Atorvastatin', descriptor: 'Statin' },
    { generic: 'Amoxicillin', descriptor: 'Antibiotic' },
  ];

  return (
    <AppPage>
      <PageHeader
        title="Drug Lookup"
        subtitle="Search brand, generic, class, or common use."
      />

      <SectionCard>
        <SectionLabel>Search medication</SectionLabel>
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <label className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <Icon type="search" className="h-5 w-5 shrink-0 text-indigo-600" />
            <input
              type="text"
              value={drugName}
              onChange={event => {
                setDrugName(event.target.value);
                if (drugInfo) setDrugInfo(null);
                setError(null);
              }}
              placeholder="Search a medication..."
              className="min-w-0 flex-1 border-0 bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-400"
              disabled={isLoading || !!drugInfo}
            />
          </label>
          <button type="submit" className={primaryButtonClass} disabled={isLoading || !drugName.trim() || !!drugInfo}>
            {isLoading ? <Spinner size="sm" /> : 'Search'}
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {(['Brand', 'Generic', 'Class', 'Use'] as const).map(filter => (
            <span key={filter} className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
              {filter}
            </span>
          ))}
        </div>
      </SectionCard>

      {error && (
        <div className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
          {error}
        </div>
      )}

      {drugInfo && !isLoading ? (
        <div className="mt-5 animate-fade-in space-y-4">
          <button onClick={handleBackToList} className="text-sm font-semibold text-indigo-700">
            Back to drug list
          </button>

          <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-5 text-white shadow-lg shadow-indigo-500/25">
            <p className="text-sm font-semibold text-white/75">Drug detail</p>
            <h2 className="mt-2 text-3xl font-bold capitalize">{drugInfo.genericName}</h2>
            <p className="mt-2 text-sm leading-6 text-white/85">Brand: {drugInfo.brandNames.join(', ')}</p>
            {drugInfo.schedule && (
              <span className="mt-4 inline-flex rounded-xl bg-white/15 px-3 py-2 text-xs font-bold ring-1 ring-white/20">
                DEA Schedule C-{drugInfo.schedule}
              </span>
            )}
          </section>

          <DetailCard title="Overview" tone="bg-white">
            <p>{drugInfo.commonUses.join(', ')}</p>
          </DetailCard>

          <DetailCard title="Brand / Generic" tone="bg-indigo-50">
            <p><span className="font-semibold text-slate-950">Generic:</span> {drugInfo.genericName}</p>
            <p className="mt-1"><span className="font-semibold text-slate-950">Brand:</span> {drugInfo.brandNames.join(', ')}</p>
          </DetailCard>

          <DetailCard title="Common Dosage Forms">
            <p>{drugInfo.dosageForms.join(', ')}</p>
          </DetailCard>

          <DetailCard title="Pharmacy Notes" tone="bg-slate-50">
            <p>{drugInfo.pharmacology}</p>
            <p className="mt-3 rounded-2xl bg-white p-3 text-xs font-semibold leading-5 text-slate-500">
              Verify drug information with official pharmacy resources and pharmacist review.
            </p>
          </DetailCard>
        </div>
      ) : (
        <div className="mt-7 space-y-7">
          <section>
            <SectionHeader title="Quick Searches" />
            <div className="grid grid-cols-2 gap-3">
              {(['Top 200 Drugs', 'Brand ↔ Generic', 'Controlled Substances', 'Common Uses', 'High-alert Meds'] as QuickFilter[]).map(filter => (
                <button
                  key={filter}
                  onClick={() => applyQuickFilter(filter)}
                  className={`min-h-16 rounded-2xl border p-3 text-left text-sm font-semibold transition ${activeQuickFilter === filter ? 'border-indigo-300 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100' : 'border-slate-200 bg-white text-slate-700 shadow-sm'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Common Lookups" />
            <div className="space-y-3">
              {commonLookups.map(item => (
                <button
                  key={item.generic}
                  onClick={() => handleDrugItemClick(item.generic)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition active:scale-[0.99]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                    <Icon type="pill" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-950">{item.generic}</span>
                    <span className="mt-1 block text-xs text-slate-500">{item.descriptor}</span>
                  </span>
                  <Icon type="chevron" className="h-5 w-5 text-slate-400" />
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title={activeQuickFilter === 'Controlled Substances' ? 'Controlled Substances' : 'Search Results'} />
            {sortKey === 'schedule' && (
              <div className="mb-3 flex flex-wrap gap-2">
                {(['all', 'II', 'III', 'IV', 'V'] as const).map(schedule => (
                  <button
                    key={schedule}
                    onClick={() => setScheduleFilter(schedule)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold ${scheduleFilter === schedule ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'}`}
                  >
                    {schedule === 'all' ? 'All Controlled' : `C-${schedule}`}
                  </button>
                ))}
              </div>
            )}
            <div className="space-y-3">
              {sortedAndFilteredDrugs.slice(0, 40).map(drug => (
                <DrugResultRow
                  key={`${drug.brand}-${drug.generic}`}
                  drug={drug}
                  onClick={() => handleDrugItemClick(drug.generic)}
                />
              ))}
            </div>
            {sortedAndFilteredDrugs.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                  <Icon type="search" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-950">No results found.</p>
                <p className="mt-1 text-sm text-slate-500">Try checking the spelling or adding more details.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </AppPage>
  );
};

export default Glossary;
