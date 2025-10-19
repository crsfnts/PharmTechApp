
import React, { useState, useMemo } from 'react';
import { View } from '../types.ts';
import { COMMON_ABBREVIATIONS } from '../constants.ts';

interface SigGlossaryProps {
  setView: (view: View) => void;
}

const SigGlossary: React.FC<SigGlossaryProps> = ({ setView }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAbbreviations = useMemo(() => {
    if (!searchTerm.trim()) {
      return COMMON_ABBREVIATIONS;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return COMMON_ABBREVIATIONS.filter(
      (abbr) =>
        abbr.term.toLowerCase().includes(lowercasedFilter) ||
        abbr.definition.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Sig Glossary</h2>
        <p className="text-slate-500 mb-6">A quick reference for common prescription sigs.</p>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search abbreviations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Term
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Definition
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredAbbreviations.length > 0 ? (
                filteredAbbreviations.map((abbr) => (
                  <tr key={abbr.term} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{abbr.term}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{abbr.definition}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-sm text-slate-500">
                    No abbreviations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SigGlossary;