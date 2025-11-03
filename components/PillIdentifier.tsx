import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';
import Spinner from './Spinner.tsx';
import { identifyPill } from './geminiService.ts';

interface PillIdentifierProps {
  setView: (view: View) => void;
}

const FormInput: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, disabled: boolean }> = ({ label, value, onChange, placeholder, disabled }) => (
  <div>
    <label className="block text-sm font-semibold text-neutral-700 mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200 hover:border-neutral-400 disabled:bg-neutral-100 disabled:cursor-not-allowed"
    />
  </div>
);

const PillIdentifier: React.FC<PillIdentifierProps> = ({ setView }) => {
  const [shape, setShape] = useState('');
  const [formType, setFormType] = useState<'tablet' | 'capsule' | ''>('tablet');
  const [color, setColor] = useState('');
  const [imprint1, setImprint1] = useState('');
  const [imprint2, setImprint2] = useState('');

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Pill Identifier</h2>
          <p className="text-neutral-600">Enter the physical characteristics of the medication to identify it using AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Shape" value={shape} onChange={e => setShape(e.target.value)} placeholder="e.g., Round, Oval" disabled={isLoading} />
            <FormInput label="Color" value={color} onChange={e => setColor(e.target.value)} placeholder="e.g., White, Blue" disabled={isLoading} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Form</label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer group">
                <input type="radio" name="formType" value="tablet" checked={formType === 'tablet'} onChange={() => setFormType('tablet')} className="h-4 w-4 text-amber-600 border-neutral-300 focus:ring-amber-500 focus:ring-offset-2" disabled={isLoading} />
                <span className="ml-2 text-sm font-medium text-neutral-700 group-hover:text-amber-600 transition-colors">Tablet</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="radio" name="formType" value="capsule" checked={formType === 'capsule'} onChange={() => setFormType('capsule')} className="h-4 w-4 text-amber-600 border-neutral-300 focus:ring-amber-500 focus:ring-offset-2" disabled={isLoading} />
                <span className="ml-2 text-sm font-medium text-neutral-700 group-hover:text-amber-600 transition-colors">Capsule</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Imprint (Side 1)" value={imprint1} onChange={e => setImprint1(e.target.value)} placeholder="e.g., LUPIN, 10" disabled={isLoading} />
            <FormInput label="Imprint (Side 2 - Optional)" value={imprint2} onChange={e => setImprint2(e.target.value)} placeholder="e.g., 451" disabled={isLoading} />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-6 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 flex items-center justify-center"
            disabled={isLoading || isFormIncomplete}
          >
            {isLoading ? <Spinner size="sm" /> : 'Identify Pill'}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-5 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {result && !isLoading && (
          <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow-sm animate-fade-in">
            <div className="flex items-start gap-3 mb-4">
              <svg className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-neutral-900">Identification Results</h3>
            </div>
            <div
              className="text-neutral-700 space-y-2 prose prose-sm max-w-none prose-strong:text-neutral-900 prose-li:text-neutral-700"
              dangerouslySetInnerHTML={{ __html: result }}
            >
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillIdentifier;
