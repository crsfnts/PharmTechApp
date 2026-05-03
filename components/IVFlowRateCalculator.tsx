import React, { useState } from 'react';
import { View } from '../types';
import { AppPage, PageHeader, SectionCard, SectionLabel, inputClass, primaryButtonClass, secondaryButtonClass } from './AppLayout';

interface IVFlowRateCalculatorProps {
  setView: (view: View) => void;
}

const IVFlowRateCalculator: React.FC<IVFlowRateCalculatorProps> = () => {
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
    <AppPage>
      <PageHeader
        title="IV Flow Rate"
        subtitle="Calculate drops per minute from volume, time, and tubing drop factor."
      />

      <div className="space-y-4">
        <SectionCard>
          <SectionLabel>1. What is the total volume?</SectionLabel>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className={inputClass}
                placeholder="e.g., 1000"
                min="0.1"
                step="0.1"
              />
        </SectionCard>

        <SectionCard>
          <SectionLabel>2. How long will it run?</SectionLabel>
              <div className="flex">
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`${inputClass} rounded-r-none`}
                  placeholder="e.g., 60"
                  min="0.1"
                  step="0.1"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as 'minutes' | 'hours')}
                  className="h-14 w-32 rounded-l-none rounded-r-2xl border border-l-0 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none"
                >
                  <option value="minutes">minutes</option>
                  <option value="hours">hours</option>
                </select>
              </div>
        </SectionCard>

        <SectionCard>
          <SectionLabel helper="Select the tubing drop factor printed on the IV set.">3. Drop factor</SectionLabel>
              <select
                value={dropFactor}
                onChange={(e) => setDropFactor(e.target.value)}
                className={inputClass}
              >
                <option value="10">10 gtts/mL (Blood set)</option>
                <option value="15">15 gtts/mL</option>
                <option value="20">20 gtts/mL (Standard)</option>
                <option value="60">60 gtts/mL (Microdrip)</option>
              </select>
        </SectionCard>

            <div className="grid grid-cols-[1fr_auto] gap-3">
              <button
                onClick={calculateFlowRate}
                className={primaryButtonClass}
              >
                Calculate
              </button>
              <button
                onClick={resetForm}
                className={secondaryButtonClass}
              >
                Reset
              </button>
            </div>

          <SectionCard className="border-sky-100 bg-sky-50">
            <h3 className="text-sm font-semibold text-slate-600">Flow rate</h3>
            {result !== null ? (
              <div>
                <p className="mt-1 text-4xl font-bold text-sky-700">{result.toFixed(1)}</p>
                <p className="mt-1 text-sm text-slate-600">drops per minute (gtts/min)</p>
                <details className="mt-4 rounded-2xl bg-white/80 p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-indigo-700">How we calculated it</summary>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    ({volume} mL × {dropFactor} gtts/mL) ÷ {time} {timeUnit}
                    {timeUnit === 'hours' && ' × 60 min/hour'} = {result.toFixed(1)} gtts/min
                  </p>
                </details>
              </div>
            ) : (
              <p className="mt-1 text-lg font-semibold text-slate-900">Enter the values above to calculate.</p>
            )}
          </SectionCard>
      </div>
    </AppPage>
  );
};

export default IVFlowRateCalculator;
