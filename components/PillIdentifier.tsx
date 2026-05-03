import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';
import Spinner from './Spinner.tsx';
import { identifyPill } from './geminiService.ts';
import { AppPage, PageHeader, SectionCard, SectionLabel, inputClass, primaryButtonClass } from './AppLayout.tsx';

interface PillIdentifierProps {
  setView: (view: View) => void;
}

const FormInput: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, disabled: boolean }> = ({ label, value, onChange, placeholder, disabled }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={inputClass}
    />
  </div>
);

const PillIdentifier: React.FC<PillIdentifierProps> = ({ setView }) => {
  const [shape, setShape] = useState('');
  const [formType, setFormType] = useState<'tablet' | 'capsule' | ''>('tablet');
  const [color, setColor] = useState('');
  const [imprint1, setImprint1] = useState('');
  const [imprint2, setImprint2] = useState('');
  const [score, setScore] = useState('');

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!color || !imprint1) {
      setError('Please fill in at least the color and one imprint to start the identification.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const identification = await identifyPill({ shape, form: formType, color, imprint1, imprint2 });
      setResult(identification);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during identification.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormIncomplete = !color || !imprint1;

  return (
    <AppPage>
      <PageHeader
        title="Pill Identifier"
        subtitle="Search by the physical characteristics printed on the medication."
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <SectionCard>
          <SectionLabel>1. Imprint</SectionLabel>
          <FormInput label="Imprint on pill" value={imprint1} onChange={e => setImprint1(e.target.value)} placeholder="e.g., LUPIN, 10" disabled={isLoading} />
        </SectionCard>

        <SectionCard>
          <SectionLabel>2. Appearance</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Shape</label>
              <select value={shape} onChange={e => setShape(e.target.value)} disabled={isLoading} className={inputClass}>
                <option value="">Select</option>
                <option>Round</option>
                <option>Oval</option>
                <option>Capsule-shaped</option>
                <option>Oblong</option>
                <option>Square</option>
                <option>Triangle</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Color</label>
              <select value={color} onChange={e => setColor(e.target.value)} disabled={isLoading} className={inputClass}>
                <option value="">Select</option>
                <option>White</option>
                <option>Blue</option>
                <option>Pink</option>
                <option>Yellow</option>
                <option>Green</option>
                <option>Orange</option>
                <option>Brown</option>
                <option>Red</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-700">Form</p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2">
              {(['tablet', 'capsule'] as const).map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormType(option)}
                  disabled={isLoading}
                  className={`h-12 rounded-xl text-sm font-semibold capitalize transition ${formType === option ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <SectionLabel helper="Add these when the pill has marks on both sides or a score line.">3. Optional details</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Second imprint" value={imprint2} onChange={e => setImprint2(e.target.value)} placeholder="e.g., 451" disabled={isLoading} />
            <FormInput label="Score" value={score} onChange={e => setScore(e.target.value)} placeholder="e.g., Yes" disabled={isLoading} />
          </div>
        </SectionCard>

        <button
          type="submit"
          className={primaryButtonClass}
          disabled={isLoading || isFormIncomplete}
        >
          {isLoading ? <Spinner size="sm" /> : 'Search pill'}
        </button>
      </form>

        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-red-700">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {result && !isLoading && (
          <div className="mt-4 animate-fade-in rounded-3xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-950">Identification Results</h3>
            </div>
            <div
              className="text-slate-700 space-y-2 prose prose-sm max-w-none prose-strong:text-slate-950 prose-li:text-slate-700"
              dangerouslySetInnerHTML={{ __html: result }}
            >
            </div>
          </div>
        )}
    </AppPage>
  );
};

export default PillIdentifier;
