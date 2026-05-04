import React, { useMemo, useState } from 'react';
import { View } from '../types';
import { AppPage, PageHeader, SectionCard, SectionLabel, inputClass, secondaryButtonClass } from './AppLayout';

interface IVFlowRateCalculatorProps {
  setView: (view: View) => void;
}

type IvMode = 'mlhr' | 'gtt' | 'time';

const modeLabels: Record<IvMode, string> = {
  mlhr: 'mL/hr',
  gtt: 'gtt/min',
  time: 'Time',
};

const IVFlowRateCalculator: React.FC<IVFlowRateCalculatorProps> = () => {
  const [mode, setMode] = useState<IvMode>('mlhr');
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  const [rate, setRate] = useState('');
  const [dropFactor, setDropFactor] = useState('20');
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('hours');
  const [showMath, setShowMath] = useState(false);

  const calculation = useMemo(() => {
    const volumeML = parseFloat(volume);
    const timeValue = parseFloat(time);
    const rateValue = parseFloat(rate);
    const factor = parseFloat(dropFactor);
    const timeInHours = timeUnit === 'hours' ? timeValue : timeValue / 60;
    const timeInMinutes = timeUnit === 'minutes' ? timeValue : timeValue * 60;

    if (mode === 'mlhr') {
      if (!(volumeML > 0) || !(timeInHours > 0)) return null;
      return {
        value: volumeML / timeInHours,
        unit: 'mL/hr',
        label: 'Flow Rate',
        details: [`Total volume: ${volumeML} mL`, `Infusion time: ${timeInHours} hr`],
        math: `${volumeML} mL ÷ ${timeInHours} hr = ${(volumeML / timeInHours).toFixed(1)} mL/hr`,
      };
    }

    if (mode === 'gtt') {
      if (!(volumeML > 0) || !(timeInMinutes > 0) || !(factor > 0)) return null;
      return {
        value: (volumeML * factor) / timeInMinutes,
        unit: 'gtt/min',
        label: 'Drip Rate',
        details: [`Total volume: ${volumeML} mL`, `Drop factor: ${factor} gtt/mL`],
        math: `${volumeML} mL × ${factor} gtt/mL ÷ ${timeInMinutes} min = ${((volumeML * factor) / timeInMinutes).toFixed(1)} gtt/min`,
      };
    }

    if (!(volumeML > 0) || !(rateValue > 0)) return null;
    return {
      value: volumeML / rateValue,
      unit: 'hr',
      label: 'Infusion Time',
      details: [`Total volume: ${volumeML} mL`, `Flow rate: ${rateValue} mL/hr`],
      math: `${volumeML} mL ÷ ${rateValue} mL/hr = ${(volumeML / rateValue).toFixed(1)} hr`,
    };
  }, [dropFactor, mode, rate, time, timeUnit, volume]);

  const resetForm = () => {
    setVolume('');
    setTime('');
    setRate('');
    setDropFactor('20');
    setTimeUnit(mode === 'gtt' ? 'minutes' : 'hours');
    setShowMath(false);
  };

  const setModeAndDefaults = (nextMode: IvMode) => {
    setMode(nextMode);
    setTimeUnit(nextMode === 'gtt' ? 'minutes' : 'hours');
    setShowMath(false);
  };

  return (
    <AppPage>
      <PageHeader
        title="IV Flow Rate"
        subtitle="Calculate mL/hr, gtt/min, and infusion time."
      />

      <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-2">
        {(Object.keys(modeLabels) as IvMode[]).map(option => (
          <button
            key={option}
            onClick={() => setModeAndDefaults(option)}
            className={`h-11 rounded-xl text-sm font-semibold transition ${mode === option ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-600'}`}
          >
            {modeLabels[option]}
          </button>
        ))}
      </div>

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

        {mode !== 'time' ? (
          <SectionCard>
            <SectionLabel>2. How long will it infuse?</SectionLabel>
            <div className="flex">
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`${inputClass} rounded-r-none`}
                placeholder={mode === 'gtt' ? 'e.g., 60' : 'e.g., 8'}
                min="0.1"
                step="0.1"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'minutes' | 'hours')}
                className="h-14 w-32 rounded-l-none rounded-r-2xl border border-l-0 border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none"
              >
                <option value="hours">hours</option>
                <option value="minutes">minutes</option>
              </select>
            </div>
          </SectionCard>
        ) : (
          <SectionCard>
            <SectionLabel>2. What is the flow rate?</SectionLabel>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={inputClass}
              placeholder="e.g., 125"
              min="0.1"
              step="0.1"
            />
          </SectionCard>
        )}

        {mode === 'gtt' && (
          <SectionCard>
            <SectionLabel helper="Select the tubing drop factor printed on the IV set.">3. Drop factor</SectionLabel>
            <select
              value={dropFactor}
              onChange={(e) => setDropFactor(e.target.value)}
              className={inputClass}
            >
              <option value="10">10 gtt/mL (Blood set)</option>
              <option value="15">15 gtt/mL</option>
              <option value="20">20 gtt/mL (Standard)</option>
              <option value="60">60 gtt/mL (Microdrip)</option>
            </select>
          </SectionCard>
        )}

        <SectionCard className="border-sky-100 bg-sky-50">
          <h3 className="text-sm font-semibold text-slate-600">{calculation?.label || 'Result'}</h3>
          {calculation ? (
            <div>
              <p className="mt-1 text-4xl font-bold text-sky-700">{calculation.value.toFixed(1)} <span className="text-2xl">{calculation.unit}</span></p>
              <div className="mt-3 grid gap-1 text-sm text-slate-600">
                {calculation.details.map(detail => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
              <button onClick={() => setShowMath(current => !current)} className="mt-4 text-sm font-semibold text-indigo-700">
                {showMath ? 'Hide math' : 'How we calculated it'}
              </button>
              {showMath && (
                <div className="mt-3 rounded-2xl bg-white/80 p-3 text-sm leading-6 text-slate-700">
                  {calculation.math}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-1 text-lg font-semibold text-slate-900">Complete the fields above to calculate.</p>
          )}
        </SectionCard>

        <button onClick={resetForm} className={secondaryButtonClass}>
          Reset calculator
        </button>
      </div>
    </AppPage>
  );
};

export default IVFlowRateCalculator;
