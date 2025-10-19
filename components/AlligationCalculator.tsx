import React, { useState } from 'react';
import { View } from '../types';
import BackButton from './BackButton';

interface AlligationCalculatorProps {
  setView: (view: View) => void;
}

const AlligationCalculator: React.FC<AlligationCalculatorProps> = ({ setView }) => {
  const [desiredStrength, setDesiredStrength] = useState('');
  const [higherStrength, setHigherStrength] = useState('');
  const [lowerStrength, setLowerStrength] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [result, setResult] = useState<{ higher: number; lower: number } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
  };

  const resetForm = () => {
    setDesiredStrength('');
    setHigherStrength('');
    setLowerStrength('');
    setTotalQuantity('');
    setResult(null);
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BackButton setView={setView} />
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Alligation Calculator</h1>
        <p className="text-slate-600 mb-6">Use the tic-tac-toe method to calculate the amounts needed for a desired concentration.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Desired Strength (%)
            </label>
            <input
              type="number"
              value={desiredStrength}
              onChange={(e) => setDesiredStrength(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g., 5"
              min="0"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Higher Strength (%)
              </label>
              <input
                type="number"
                value={higherStrength}
                onChange={(e) => setHigherStrength(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., 10"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Lower Strength (%)
              </label>
              <input
                type="number"
                value={lowerStrength}
                onChange={(e) => setLowerStrength(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., 2"
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Total Quantity (mL)
            </label>
            <input
              type="number"
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="e.g., 100"
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              onClick={calculate}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={toggleExplanation}
              className="px-4 py-2 text-teal-600 hover:text-teal-800 focus:outline-none"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </button>
          </div>
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800 mb-2">How to Use the Tic-Tac-Toe Method</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Enter the desired strength percentage you want to achieve</li>
              <li>Enter the higher concentration percentage you have available</li>
              <li>Enter the lower concentration percentage you have available</li>
              <li>Enter the total quantity of the final mixture</li>
              <li>Click Calculate to see the required amounts of each concentration</li>
            </ol>
            <div className="mt-4 p-3 bg-white border border-slate-200 rounded-md">
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
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-md border border-green-100">
                <p className="text-sm text-slate-600">Higher Strength ({higherStrength}%)</p>
                <p className="text-xl font-bold text-green-700">{result.higher} mL</p>
              </div>
              <div className="p-3 bg-white rounded-md border border-green-100">
                <p className="text-sm text-slate-600">Lower Strength ({lowerStrength}%)</p>
                <p className="text-xl font-bold text-green-700">{result.lower} mL</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Total: <span className="font-medium">{(result.higher + result.lower).toFixed(2)} mL</span> (should match your desired total quantity)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlligationCalculator;
