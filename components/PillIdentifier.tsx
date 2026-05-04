import React, { useEffect, useState } from 'react';
import { View } from '../types.ts';
import Spinner from './Spinner.tsx';
import { identifyPill } from './geminiService.ts';
import { AppPage, PageHeader, SectionCard, SectionLabel, inputClass, primaryButtonClass } from './AppLayout.tsx';

interface PillIdentifierProps {
  setView: (view: View) => void;
}

type FormType = 'Tablet' | 'Capsule' | 'Softgel' | 'Caplet' | 'Other' | '';

const colors = ['White', 'Blue', 'Pink', 'Yellow', 'Green', 'Orange', 'Red', 'Purple', 'Brown', 'Black', 'Clear', 'Other'];
const shapes = ['Round', 'Oval', 'Capsule', 'Oblong', 'Rectangle', 'Triangle', 'Diamond', 'Other'];
const forms: FormType[] = ['Tablet', 'Capsule', 'Softgel', 'Caplet', 'Other'];

const Icon = ({ type }: { type: 'info' | 'search' | 'pill' | 'check' }) => {
  if (type === 'search') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z" />
      </svg>
    );
  }

  if (type === 'check') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 4.5 4.5 10.5-10.5" />
      </svg>
    );
  }

  if (type === 'pill') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const SelectorChip: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ label, selected, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`min-h-10 rounded-xl px-3 py-2 text-sm font-semibold transition disabled:opacity-50 ${selected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200'}`}
  >
    {label}
  </button>
);

const PillIdentifier: React.FC<PillIdentifierProps> = () => {
  const [shape, setShape] = useState('');
  const [formType, setFormType] = useState<FormType>('Tablet');
  const [color, setColor] = useState('');
  const [imprint1, setImprint1] = useState('');
  const [imprint2, setImprint2] = useState('');
  const [score, setScore] = useState('None');
  const [size, setSize] = useState('');
  const [showOptional, setShowOptional] = useState(false);
  const [noImprint, setNoImprint] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hasAppearanceDetails = [color, shape, formType].filter(Boolean).length >= 2;
  const hasSearchInfo = !!imprint1.trim() || noImprint || hasAppearanceDetails;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSearchInfo) {
      setError('Enter an imprint or select appearance details.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const identification = await identifyPill({
        shape,
        form: formType === 'Capsule' ? 'capsule' : formType ? 'tablet' : '',
        color,
        imprint1: noImprint ? 'No imprint' : imprint1,
        imprint2,
      });
      setResult(identification);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppPage>
      <PageHeader
        title="Pill Identifier"
        subtitle="Search by imprint, color, shape, and form."
      />

      <div className="mb-4 flex items-start gap-3 rounded-3xl border border-indigo-100 bg-indigo-50 p-4 text-indigo-900">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-sm">
          <Icon type="info" />
        </span>
        <p className="text-sm leading-6">Always verify medication identity with official pharmacy resources and pharmacist review.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <SectionCard>
          <SectionLabel helper="Enter the letters or numbers printed on the tablet or capsule.">1. Imprint</SectionLabel>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Imprint on pill</label>
          <input
            type="text"
            value={imprint1}
            onChange={event => {
              setImprint1(event.target.value);
              setNoImprint(false);
            }}
            placeholder="e.g., L484, 54 733, M365"
            disabled={isLoading || noImprint}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => {
              setNoImprint(current => !current);
              setImprint1('');
            }}
            className={`mt-3 rounded-xl px-3 py-2 text-sm font-semibold ${noImprint ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200'}`}
          >
            No imprint
          </button>
        </SectionCard>

        <SectionCard>
          <SectionLabel>2. Appearance</SectionLabel>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map(item => (
                <SelectorChip key={item} label={item} selected={color === item} onClick={() => setColor(item)} disabled={isLoading} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-700">Shape</p>
            <div className="flex flex-wrap gap-2">
              {shapes.map(item => (
                <SelectorChip key={item} label={item} selected={shape === item} onClick={() => setShape(item)} disabled={isLoading} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-slate-700">Form</p>
            <div className="flex flex-wrap gap-2">
              {forms.map(item => (
                <SelectorChip key={item} label={item} selected={formType === item} onClick={() => setFormType(item)} disabled={isLoading} />
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <button
            type="button"
            onClick={() => setShowOptional(current => !current)}
            className="flex w-full items-center justify-between text-left"
          >
            <span>
              <span className="block text-sm font-semibold text-slate-900">3. Add optional details</span>
              <span className="mt-1 block text-sm leading-6 text-slate-500">Add these when the pill has marks on both sides or a score line.</span>
            </span>
            <span className="text-sm font-semibold text-indigo-700">{showOptional ? 'Hide' : 'Add'}</span>
          </button>

          {showOptional && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Second imprint</label>
                <input value={imprint2} onChange={event => setImprint2(event.target.value)} placeholder="e.g., 451" disabled={isLoading} className={inputClass} />
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Score</p>
                <div className="grid grid-cols-3 gap-2">
                  {['None', 'One side', 'Both sides'].map(item => (
                    <SelectorChip key={item} label={item} selected={score === item} onClick={() => setScore(item)} disabled={isLoading} />
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Size</label>
                <input value={size} onChange={event => setSize(event.target.value)} placeholder="e.g., 10 mm" disabled={isLoading} className={inputClass} />
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard>
          <SectionLabel helper="Results should always be checked against official references before use.">4. Search</SectionLabel>
          <button type="submit" className={primaryButtonClass} disabled={isLoading || !hasSearchInfo}>
            {isLoading ? <Spinner size="sm" /> : 'Search pill'}
          </button>
          {!hasSearchInfo && (
            <p className="mt-3 text-sm text-slate-500">Enter an imprint or select appearance details.</p>
          )}
        </SectionCard>
      </form>

      {error && (
        <div className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-800">
          {error}
        </div>
      )}

      {!result && !isLoading && !error && (
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
            <Icon type="pill" />
          </span>
          <p className="mt-3 text-sm font-semibold text-slate-950">Enter an imprint or appearance details to search.</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="mt-4 animate-fade-in rounded-3xl border border-indigo-100 bg-indigo-50 p-5 shadow-sm">
          <div className="mb-4 flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-700">
              <Icon type="check" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-950">Possible Matches</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">Verify with official resources before use.</p>
            </div>
          </div>
          <div
            className="space-y-2 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700 prose prose-sm max-w-none prose-strong:text-slate-950 prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>
      )}
    </AppPage>
  );
};

export default PillIdentifier;
