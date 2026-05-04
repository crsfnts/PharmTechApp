import React, { useState } from 'react';
import { View } from '../types';
import { AppPage, PageHeader, SectionCard, SectionLabel, inputClass, primaryButtonClass, secondaryButtonClass } from './AppLayout';

interface AlligationCalculatorProps {
  setView: (view: View) => void;
}

const AlligationCalculator: React.FC<AlligationCalculatorProps> = () => {
  const [desiredStrength, setDesiredStrength] = useState('');
  const [higherStrength, setHigherStrength] = useState('');
  const [lowerStrength, setLowerStrength] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [result, setResult] = useState<{ higher: number; lower: number } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMath, setShowMath] = useState(false);

  const calculate = () => {
    if (!desiredStrength || !higherStrength || !lowerStrength || !totalQuantity) return;

    const ds = parseFloat(desiredStrength);
    const hs = parseFloat(higherStrength);
    const ls = parseFloat(lowerStrength);
    const tq = parseFloat(totalQuantity);

    if (isNaN(ds) || isNaN(hs) || isNaN(ls) || isNaN(tq)) {
      setResult(null);
      return;
    }

    // Calculate parts
    const higherPart = Math.abs(ds - ls);
    const lowerPart = Math.abs(hs - ds);
    const totalParts = higherPart + lowerPart;

    // Calculate quantities
    const higherQuantity = (higherPart / totalParts) * tq;
    const lowerQuantity = (lowerPart / totalParts) * tq;

    setResult({
      higher: parseFloat(higherQuantity.toFixed(2)),
      lower: parseFloat(lowerQuantity.toFixed(2))
    });
    setShowMath(false);
  };

  const resetForm = () => {
    setDesiredStrength('');
    setHigherStrength('');
    setLowerStrength('');
    setTotalQuantity('');
    setResult(null);
    setShowExplanation(false);
    setShowMath(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <AppPage>
      <PageHeader
        title="Alligation"
        subtitle="Use the tic-tac-toe method to calculate amounts for a desired concentration."
      />
        
        <div className="space-y-4">
          <SectionCard>
            <SectionLabel>1. What strength do you need?</SectionLabel>
            <input
              type="number"
              value={desiredStrength}
              onChange={(e) => setDesiredStrength(e.target.value)}
              className={inputClass}
              placeholder="e.g., 5"
              min="0"
              step="0.1"
            />
          </SectionCard>

          <SectionCard>
            <SectionLabel helper="Enter the strengths available to mix.">2. What strengths do you have?</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Higher Strength (%)
              </label>
              <input
                type="number"
                value={higherStrength}
                onChange={(e) => setHigherStrength(e.target.value)}
                className={inputClass}
                placeholder="e.g., 10"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Lower Strength (%)
              </label>
              <input
                type="number"
                value={lowerStrength}
                onChange={(e) => setLowerStrength(e.target.value)}
                className={inputClass}
                placeholder="e.g., 2"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          </SectionCard>

          <SectionCard>
            <SectionLabel>3. How much final quantity?</SectionLabel>
            <input
              type="number"
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(e.target.value)}
              className={inputClass}
              placeholder="e.g., 100"
              min="0.1"
              step="0.1"
            />
          </SectionCard>

          <div className="grid grid-cols-[1fr_auto] gap-3 pt-2">
            <button
              onClick={calculate}
              className={primaryButtonClass}
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={resetForm}
              className={secondaryButtonClass}
            >
              Reset
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleExplanation}
          className="mt-4 text-sm font-semibold text-indigo-700"
        >
          {showExplanation ? 'Hide' : 'Show'} explanation
        </button>

        {showExplanation && (
          <SectionCard className="mt-4 bg-slate-50">
            <h3 className="text-base font-semibold text-slate-900 mb-2">How to Use the Tic-Tac-Toe Method</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Enter the desired strength percentage you want to achieve</li>
              <li>Enter the higher concentration percentage you have available</li>
              <li>Enter the lower concentration percentage you have available</li>
              <li>Enter the total quantity of the final mixture</li>
              <li>Click Calculate to see the required amounts of each concentration</li>
            </ol>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="font-medium text-slate-800 mb-2">Example:</p>
              <p className="text-sm text-slate-700">
                For 100mL of 5% solution using 10% and 2% solutions:
              </p>
              <pre className="mt-2 p-2 bg-slate-100 rounded text-sm overflow-x-auto">
{`  10%     3 parts (5 - 2 = 3)
    \   /
      5%
    /   \
   2%     5 parts (10 - 5 = 5)

Total parts = 8 (3 + 5)
10% solution needed: (3/8) × 100mL = 37.5mL
2% solution needed: (5/8) × 100mL = 62.5mL`}
              </pre>
            </div>
          </SectionCard>
        )}

        {result && (
          <SectionCard className="mt-4 border-emerald-100 bg-emerald-50">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Result</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-emerald-100 bg-white p-3">
                <p className="text-sm text-slate-600">Higher Strength ({higherStrength}%)</p>
                <p className="text-2xl font-bold text-emerald-700">{result.higher} mL</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white p-3">
                <p className="text-sm text-slate-600">Lower Strength ({lowerStrength}%)</p>
                <p className="text-2xl font-bold text-emerald-700">{result.lower} mL</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Total: <span className="font-medium">{(result.higher + result.lower).toFixed(2)} mL</span> (should match your desired total quantity)
            </p>
            <button onClick={() => setShowMath(current => !current)} className="mt-4 text-sm font-semibold text-indigo-700">
              {showMath ? 'Hide math' : 'How we calculated it'}
            </button>
            {showMath && (
              <div className="mt-3 rounded-2xl bg-white/80 p-3 text-sm leading-6 text-slate-700">
                <p>Higher part: {desiredStrength}% - {lowerStrength}% = {Math.abs(parseFloat(desiredStrength) - parseFloat(lowerStrength)).toFixed(2)} parts</p>
                <p>Lower part: {higherStrength}% - {desiredStrength}% = {Math.abs(parseFloat(higherStrength) - parseFloat(desiredStrength)).toFixed(2)} parts</p>
                <p>Apply those parts to {totalQuantity} mL total = {result.higher} mL higher strength and {result.lower} mL lower strength.</p>
              </div>
            )}
          </SectionCard>
        )}
    </AppPage>
  );
};

export default AlligationCalculator;
