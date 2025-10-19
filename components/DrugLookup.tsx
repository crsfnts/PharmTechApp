
import React, { useState, useCallback, useMemo } from 'react';
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
    <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">{title}</h3>
        {children}
    </div>
);

const Glossary: React.FC<GlossaryProps> = ({ setView }) => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'brand' | 'generic'>('generic');


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

      // 1) Try local fallback (deterministic)
      const local = findDrugLocally(searchQuery, brandsForQuery);
      if (local) {
        setDrugInfo(local);
        return;
      }

      // 2) Fallback to AI
      const info = await fetchDrugInfo(searchQuery);
      setDrugInfo(info);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to find this drug right now. Please try another or pick from the list.'
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
    const sorted = [...TOP_DRUGS_LIST].sort((a, b) => {
      if (sortKey === 'generic') {
        return a.generic.localeCompare(b.generic);
      }
      return a.brand.localeCompare(b.brand);
    });

    const lowercasedFilter = drugName.toLowerCase();
    if (!lowercasedFilter) {
      return sorted;
    }
    return sorted.filter(
      (drug) =>
        drug.brand.toLowerCase().includes(lowercasedFilter) ||
        drug.generic.toLowerCase().includes(lowercasedFilter)
    );
  }, [drugName, sortKey]);


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Glossary</h2>
        <p className="text-slate-500 mb-6">Enter a drug name, or select from the list below.</p>

        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2 mb-8">
          <input
            type="text"
            value={drugName}
            onChange={handleInputChange}
            placeholder="e.g., Lisinopril or Zestril"
            className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            disabled={isLoading || !!drugInfo}
          />
          <button
            type="submit"
            className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading || !drugName || !!drugInfo}
          >
            {isLoading ? <Spinner size="sm" /> : 'Search'}
          </button>
        </form>

        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">{error}</div>}

        {drugInfo && !isLoading && (
          <div className="animate-fade-in">
             <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 mb-4 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to List
            </button>
            <h2 className="text-3xl font-bold text-slate-900 capitalize">{drugInfo.genericName}</h2>
            <p className="text-slate-600 mb-6">Brand Names: {drugInfo.brandNames.join(', ')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Common Uses">
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {drugInfo.commonUses.map(use => <li key={use}>{use}</li>)}
                </ul>
              </InfoCard>
              <InfoCard title="Common Side Effects">
                 <ul className="list-disc list-inside text-slate-700 space-y-1">
                  {drugInfo.commonSideEffects.map(effect => <li key={effect}>{effect}</li>)}
                </ul>
              </InfoCard>
              <InfoCard title="Dosage Forms">
                <p className="text-slate-700">{drugInfo.dosageForms.join(', ')}</p>
              </InfoCard>
              <InfoCard title="Pharmacology (Mechanism of Action)">
                <p className="text-slate-700 text-sm">{drugInfo.pharmacology}</p>
              </InfoCard>
            </div>
          </div>
        )}

        {!drugInfo && !isLoading && (
            <div className="animate-fade-in">
                <div className="flex items-baseline justify-between border-b pb-2 mb-4">
                    <div className="flex items-center gap-2">
                         <button
                            onClick={() => setSortKey('generic')}
                            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${sortKey === 'generic' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        >
                            Generic Name
                        </button>
                        <button
                            onClick={() => setSortKey('brand')}
                            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${sortKey === 'brand' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        >
                            Brand Name
                        </button>
                    </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-2">
                    {sortedAndFilteredDrugs.map(drug => (
                        <button 
                            key={drug.brand + drug.generic}
                            onClick={() => handleDrugItemClick(drug.generic)}
                            className="w-full text-left p-3 bg-slate-50 hover:bg-teal-50 hover:shadow-md rounded-lg transition-all duration-200 border border-slate-200"
                        >
                            <p className="font-semibold text-slate-800">{drug.generic}</p>
                            <p className="text-sm text-slate-500">{drug.brand}</p>
                        </button>
                    ))}
                 </div>
                 {sortedAndFilteredDrugs.length === 0 && (
                    <p className="text-center text-slate-500 py-8">No matching drugs found in the list.</p>
                 )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;