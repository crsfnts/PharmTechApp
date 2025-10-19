import React, { useState } from 'react';
import { View } from '../types';

interface IVFlowRateCalculatorProps {
  setView: (view: View) => void;
}

const IVFlowRateCalculator: React.FC<IVFlowRateCalculatorProps> = ({ setView }) => {
  const [volume, setVolume] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [dropFactor, setDropFactor] = useState<string>('20');
  const [result, setResult] = useState<number | null>(null);
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('minutes');

  const calculateFlowRate = () => {
    if (!volume || !time) return;
    
    const volumeML = parseFloat(volume);
    const timeValue = parseFloat(time);
    const factor = parseFloat(dropFactor);
    
    if (isNaN(volumeML) || isNaN(timeValue) || isNaN(factor) || timeValue <= 0) {
      setResult(null);
      return;
    }
    
    const timeInMinutes = timeUnit === 'minutes' ? timeValue : timeValue * 60;
    const flowRate = (volumeML * factor) / timeInMinutes;
    
    setResult(flowRate);
  };

  const resetForm = () => {
    setVolume('');
    setTime('');
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setView(View.Dashboard)}
          className="mr-4 text-teal-600 hover:text-teal-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">IV Flow Rate Calculator</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Total Volume (mL)
              </label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., 1000"
                min="0.1"
                step="0.1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Time
              </label>
              <div className="flex">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-3/4 px-3 py-2 border border-slate-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., 60"
                  min="0.1"
                  step="0.1"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as 'minutes' | 'hours')}
                  className="w-1/4 border-t border-b border-r border-slate-300 rounded-r-md bg-white text-slate-700 px-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="minutes">minutes</option>
                  <option value="hours">hours</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Drop Factor (gtts/mL)
              </label>
              <select
                value={dropFactor}
                onChange={(e) => setDropFactor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="10">10 gtts/mL (Blood set)</option>
                <option value="15">15 gtts/mL</option>
                <option value="20" selected>20 gtts/mL (Standard)</option>
                <option value="60">60 gtts/mL (Microdrip)</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={calculateFlowRate}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Calculate
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Result</h3>
            {result !== null ? (
              <div className="text-center">
                <p className="text-4xl font-bold text-teal-600 mb-2">{result.toFixed(1)}</p>
                <p className="text-slate-600">drops per minute (gtts/min)</p>
                <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-md">
                  <h4 className="font-medium text-teal-800 mb-2">Calculation:</h4>
                  <p className="text-sm text-slate-700">
                    ({volume} mL × {dropFactor} gtts/mL) ÷ {time} {timeUnit}
                    {timeUnit === 'hours' && ' × 60 min/hour'} = {result.toFixed(1)} gtts/min
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M4.5 14.5h.008v.008H4.5v-.008z"
                  />
                </svg>
                <p className="mt-2 text-sm text-slate-500">
                  Enter the values and click 'Calculate' to see the flow rate
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-medium text-slate-800 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>Enter the total volume to be infused (in mL)</li>
            <li>Enter the time for infusion</li>
            <li>Select the appropriate drop factor (gtts/mL) for your IV set</li>
            <li>Click 'Calculate' to get the flow rate in drops per minute (gtts/min)</li>
          </ol>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Common Drop Factors:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 10 gtts/mL - Blood set</li>
              <li>• 15 gtts/mL - Standard set</li>
              <li>• 20 gtts/mL - Standard set</li>
              <li>• 60 gtts/mL - Microdrip or pediatric set</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVFlowRateCalculator;
