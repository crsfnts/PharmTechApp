
import React, { useState } from 'react';
import { View } from '../types.ts';
import BackButton from './BackButton.tsx';
import Spinner from './Spinner.tsx';
import { identifyPill } from './geminiService.ts';

interface CounterProps {
  setView: (view: View) => void;
}

const FormInput: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, disabled: boolean }> = ({ label, value, onChange, placeholder, disabled }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition disabled:bg-slate-50"
        />
    </div>
);

const Counter: React.FC<CounterProps> = ({ setView }) => {
  const [shape, setShape] = useState('');
  const [formType, setFormType] = useState<'tablet' | 'capsule' | ''>('tablet');
  const [color, setColor] = useState('');
  const [imprint1, setImprint1] = useState('');
  const [imprint2, setImprint2] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!color || !imprint1) {
      setError("Please fill in at least the color and one imprint to start the identification.");
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
    <div className="max-w-2xl mx-auto">
      <BackButton setView={setView} />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Pill Identifier</h2>
        <p className="text-slate-500 mb-6">Enter the physical characteristics of a pill to identify it.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Shape" value={shape} onChange={e => setShape(e.target.value)} placeholder="e.g., Round, Oval" disabled={isLoading} />
                <FormInput label="Color" value={color} onChange={e => setColor(e.target.value)} placeholder="e.g., White, Blue" disabled={isLoading} />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Form</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input type="radio" name="formType" value="tablet" checked={formType === 'tablet'} onChange={() => setFormType('tablet')} className="h-4 w-4 text-teal-600 border-slate-300 focus:ring-teal-500" disabled={isLoading} />
                        <span className="ml-2 text-sm text-slate-600">Tablet</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="formType" value="capsule" checked={formType === 'capsule'} onChange={() => setFormType('capsule')} className="h-4 w-4 text-teal-600 border-slate-300 focus:ring-teal-500" disabled={isLoading} />
                        <span className="ml-2 text-sm text-slate-600">Capsule</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Imprint (Side 1)" value={imprint1} onChange={e => setImprint1(e.target.value)} placeholder="e.g., LUPIN, 10" disabled={isLoading} />
                <FormInput label="Imprint (Side 2 - Optional)" value={imprint2} onChange={e => setImprint2(e.target.value)} placeholder="e.g., 451" disabled={isLoading} />
            </div>
          
            <button
                type="submit"
                className="w-full bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading || isFormIncomplete}
            >
                {isLoading ? <Spinner size="sm" /> : 'Identify Pill'}
            </button>
        </form>

        {error && <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">{error}</div>}
        
        {result && !isLoading && (
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg animate-fade-in">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Identification Results</h3>
                <div 
                  className="text-slate-700 space-y-2 prose prose-sm max-w-none" 
                  dangerouslySetInnerHTML={{ __html: result }}
                >
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Counter;