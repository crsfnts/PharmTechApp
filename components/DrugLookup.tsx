
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View } from '../types.ts';
import type { DrugInfo } from '../types.ts';
import { fetchDrugInfo } from './geminiService.ts';
import { findDrugLocally } from './drugData.ts';
import Spinner from './Spinner.tsx';
import { TOP_DRUGS_LIST } from '../constants.ts';

interface GlossaryProps {
  setView: (view: View) => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gradient-to-br from-neutral-50 to-white p-5 rounded-xl border border-neutral-200 hover:border-violet-200 hover:shadow-md transition-all duration-300">
        <h3 className="text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wide">{title}</h3>
        {children}
    </div>
);

const Glossary: React.FC<GlossaryProps> = ({ setView }) => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'brand' | 'generic' | 'schedule'>('generic');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'II' | 'III' | 'IV' | 'V'>('all');

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const executeSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Please enter a drug name.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      // Build brand name hints from our curated top list for better local matching
      const q = searchQuery.trim().toLowerCase();
      const brandsForQuery: string[] = [];
      TOP_DRUGS_LIST.forEach((d) => {
        if (d.generic.toLowerCase() === q || d.brand.toLowerCase() === q) {
          brandsForQuery.push(d.brand);
        }
      });

      // Search local database only - no AI
      const local = findDrugLocally(searchQuery, brandsForQuery);
      if (local) {
        setDrugInfo(local);
        return;
      }

      // Drug not found in local database
      setError(
        `"${searchQuery}" was not found in our database. Please select a drug from the list below or try a different search term.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while searching. Please try another drug from the list.'
      );
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
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDrugName(e.target.value);
      if (drugInfo) {
          setDrugInfo(null);
          setError(null);
      }
  }
  
  const handleBackToList = () => {
    setDrugInfo(null);
    setDrugName(''); // Clear search to show the full list
    setError(null);
  };

  const sortedAndFilteredDrugs = useMemo(() => {
    let filtered = [...TOP_DRUGS_LIST];

    // Apply schedule filter when DEA Schedule sort is active
    if (sortKey === 'schedule') {
      if (scheduleFilter === 'all') {
        // Show only controlled substances (drugs with a schedule)
        filtered = filtered.filter(drug => drug.schedule);
      } else {
        // Show only drugs with the specific schedule
        filtered = filtered.filter(drug => drug.schedule === scheduleFilter);
      }
    }

    // Apply search filter
    const lowercasedFilter = drugName.toLowerCase();
    if (lowercasedFilter) {
      filtered = filtered.filter(
        (drug) =>
          drug.brand.toLowerCase().includes(lowercasedFilter) ||
          drug.generic.toLowerCase().includes(lowercasedFilter)
      );
    }

    // Sort the filtered results
    const sorted = filtered.sort((a, b) => {
      if (sortKey === 'generic') {
        return a.generic.localeCompare(b.generic);
      } else if (sortKey === 'brand') {
        return a.brand.localeCompare(b.brand);
      } else if (sortKey === 'schedule') {
        // Sort by schedule: II, III, IV, V, then non-controlled
        const scheduleOrder: Record<string, number> = { 'II': 1, 'III': 2, 'IV': 3, 'V': 4 };
        const aOrder = a.schedule ? scheduleOrder[a.schedule] || 999 : 999;
        const bOrder = b.schedule ? scheduleOrder[b.schedule] || 999 : 999;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // Within same schedule, sort by generic name
        return a.generic.localeCompare(b.generic);
      }
      return a.brand.localeCompare(b.brand);
    });

    return sorted;
  }, [drugName, sortKey, scheduleFilter]);


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Drug Lookup</h2>
          <p className="text-neutral-600">Search for detailed drug information or browse our comprehensive database.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={drugName}
            onChange={handleInputChange}
            placeholder="Search by generic or brand name (e.g., Lisinopril or Zestril)"
            className="flex-grow w-full px-5 py-3.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 hover:border-neutral-400"
            disabled={isLoading || !!drugInfo}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:from-violet-700 hover:to-purple-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center min-w-[120px]"
            disabled={isLoading || !drugName || !!drugInfo}
          >
            {isLoading ? <Spinner size="sm" /> : 'Search'}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 flex items-start gap-3 animate-fade-in">
            <svg className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {drugInfo && !isLoading && (
          <div className="animate-fade-in">
             <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-violet-600 hover:text-violet-800 mb-6 px-4 py-2 rounded-xl hover:bg-violet-50 transition-all duration-200 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Drug List
            </button>

            {/* Drug Header */}
            <div className="mb-8 pb-6 border-b border-neutral-200">
              <h2 className="text-4xl font-bold text-neutral-900 capitalize mb-2">{drugInfo.genericName}</h2>
              <div className="flex items-center gap-2 text-neutral-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium">Brand Names:</span>
                <span>{drugInfo.brandNames.join(', ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard title="Common Uses">
                <ul className="space-y-2 text-neutral-700">
                  {drugInfo.commonUses.map(use => (
                    <li key={use} className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="Common Side Effects">
                 <ul className="space-y-2 text-neutral-700">
                  {drugInfo.commonSideEffects.map(effect => (
                    <li key={effect} className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard title="Dosage Forms">
                <p className="text-neutral-700 leading-relaxed">{drugInfo.dosageForms.join(', ')}</p>
              </InfoCard>

              <InfoCard title="Pharmacology">
                <p className="text-neutral-700 text-sm leading-relaxed">{drugInfo.pharmacology}</p>
              </InfoCard>
            </div>
          </div>
        )}

        {!drugInfo && !isLoading && (
            <div className="animate-fade-in">
                {/* Sort Tabs */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-600">Sort by:</span>
                        <div className="inline-flex bg-neutral-100 p-1 rounded-xl">
                            <button
                                onClick={() => {
                                    setSortKey('generic');
                                    setScheduleFilter('all');
                                }}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${sortKey === 'generic' ? 'bg-white text-violet-700 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
                            >
                                Generic Name
                            </button>
                            <button
                                onClick={() => {
                                    setSortKey('brand');
                                    setScheduleFilter('all');
                                }}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${sortKey === 'brand' ? 'bg-white text-violet-700 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
                            >
                                Brand Name
                            </button>
                            <button
                                onClick={() => setSortKey('schedule')}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${sortKey === 'schedule' ? 'bg-white text-violet-700 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
                            >
                                DEA Schedule
                            </button>
                        </div>
                    </div>

                    {/* Schedule Filter - Only visible when DEA Schedule sort is active */}
                    {sortKey === 'schedule' && (
                        <div className="flex items-center gap-2 animate-fade-in">
                            <span className="text-sm font-medium text-neutral-600">Filter by:</span>
                            <div className="inline-flex bg-red-50 p-1 rounded-xl border border-red-200">
                                <button
                                    onClick={() => setScheduleFilter('all')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${scheduleFilter === 'all' ? 'bg-white text-red-700 shadow-sm' : 'text-red-600 hover:text-red-800'}`}
                                >
                                    All Controlled
                                </button>
                                <button
                                    onClick={() => setScheduleFilter('II')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${scheduleFilter === 'II' ? 'bg-white text-red-700 shadow-sm' : 'text-red-600 hover:text-red-800'}`}
                                >
                                    C-II
                                </button>
                                <button
                                    onClick={() => setScheduleFilter('III')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${scheduleFilter === 'III' ? 'bg-white text-red-700 shadow-sm' : 'text-red-600 hover:text-red-800'}`}
                                >
                                    C-III
                                </button>
                                <button
                                    onClick={() => setScheduleFilter('IV')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${scheduleFilter === 'IV' ? 'bg-white text-red-700 shadow-sm' : 'text-red-600 hover:text-red-800'}`}
                                >
                                    C-IV
                                </button>
                                <button
                                    onClick={() => setScheduleFilter('V')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${scheduleFilter === 'V' ? 'bg-white text-red-700 shadow-sm' : 'text-red-600 hover:text-red-800'}`}
                                >
                                    C-V
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Drug Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto pr-2">
                    {sortedAndFilteredDrugs.map(drug => (
                        <button
                            key={drug.brand + drug.generic}
                            onClick={() => handleDrugItemClick(drug.generic)}
                            className="group w-full text-left p-4 bg-neutral-50 hover:bg-gradient-to-br hover:from-violet-50 hover:to-purple-50 rounded-xl transition-all duration-200 border border-neutral-200 hover:border-violet-300 hover:shadow-md active:scale-[0.98]"
                        >
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="font-bold text-neutral-900 group-hover:text-violet-700 transition-colors flex-1 min-w-0 break-words leading-tight">{drug.generic}</p>
                                {drug.schedule && (
                                    <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-700 border border-red-200 whitespace-nowrap">
                                        C-{drug.schedule}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-neutral-600 group-hover:text-violet-600 transition-colors break-words">{drug.brand}</p>
                        </button>
                    ))}
                 </div>

                 {sortedAndFilteredDrugs.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                        <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-neutral-600 font-medium">No matching drugs found</p>
                      <p className="text-sm text-neutral-500 mt-1">Try a different search term</p>
                    </div>
                 )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;