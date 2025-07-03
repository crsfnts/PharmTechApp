
import React, { useState, useMemo } from 'react';
import { View, CalculatorType } from '../types.ts';
import BackButton from './BackButton.tsx';
import { COMMON_INHALERS, COMMON_INJECTABLES } from '../constants.ts';

interface DaysSupplyCalculatorProps {
  setView: (view: View) => void;
}

// --- Reusable Input Component ---
const CalculatorInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: string;
}> = ({ label, value, onChange, placeholder, type = "number", min = "0" }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder || "0"}
            min={min}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
    </div>
);


// --- Oral Calculator ---
const OralCalculator: React.FC<{ setResult: (res: number | null) => void }> = ({ setResult }) => {
    const [totalQuantity, setTotalQuantity] = useState('90');
    const [dosesPerDay, setDosesPerDay] = useState('1');

    useMemo(() => {
        const tq = parseFloat(totalQuantity);
        const dpd = parseFloat(dosesPerDay);
        if (tq > 0 && dpd > 0) {
            setResult(Math.floor(tq / dpd));
        } else {
            setResult(null);
        }
    }, [totalQuantity, dosesPerDay, setResult]);

    return (
        <div className="space-y-4 animate-fade-in">
            <CalculatorInput
                label="Total Quantity Dispensed (e.g., tablets)"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
                placeholder="e.g., 90"
            />
            <CalculatorInput
                label="Doses Per Day"
                value={dosesPerDay}
                onChange={(e) => setDosesPerDay(e.target.value)}
                placeholder="e.g., 1"
            />
        </div>
    );
};

// --- Inhaler Calculator ---
const InhalerCalculator: React.FC<{ setResult: (res: number | null) => void }> = ({ setResult }) => {
    const [selectedInhalerPuffs, setSelectedInhalerPuffs] = useState('0');
    const [numInhalers, setNumInhalers] = useState('1');
    const [puffsPerUse, setPuffsPerUse] = useState('');
    const [usesPerDay, setUsesPerDay] = useState('');

    const handleInhalerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedInhalerPuffs(e.target.value);
    };

    useMemo(() => {
        const puffsPerInhaler = parseInt(selectedInhalerPuffs, 10);
        const totalInhalers = parseInt(numInhalers, 10);
        const puffsDose = parseInt(puffsPerUse, 10);
        const usesDay = parseInt(usesPerDay, 10);

        if (puffsPerInhaler > 0 && totalInhalers > 0 && puffsDose > 0 && usesDay > 0) {
            const totalPuffs = puffsPerInhaler * totalInhalers;
            const puffsPerDay = puffsDose * usesDay;
            setResult(Math.floor(totalPuffs / puffsPerDay));
        } else {
            setResult(null);
        }
    }, [selectedInhalerPuffs, numInhalers, puffsPerUse, usesPerDay, setResult]);

    return (
        <div className="space-y-4 animate-fade-in">
            <div>
                <label htmlFor="inhaler-select" className="block text-sm font-medium text-slate-700 mb-1">Select Inhaler</label>
                <select
                    id="inhaler-select"
                    onChange={handleInhalerChange}
                    value={selectedInhalerPuffs}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                >
                    {COMMON_INHALERS.map(inhaler => (
                        <option key={inhaler.name} value={inhaler.puffs}>{inhaler.name} ({inhaler.puffs > 0 ? `${inhaler.puffs} puffs` : '...'})</option>
                    ))}
                </select>
            </div>
            <CalculatorInput label="Number of Inhalers Dispensed" value={numInhalers} onChange={(e) => setNumInhalers(e.target.value)} />
            <CalculatorInput label="Puffs per Use" value={puffsPerUse} onChange={(e) => setPuffsPerUse(e.target.value)} placeholder="e.g., 2" />
            <CalculatorInput label="Uses per Day" value={usesPerDay} onChange={(e) => setUsesPerDay(e.target.value)} placeholder="e.g., 4" />
        </div>
    );
};


// --- Injectable Calculator ---
const InjectableCalculator: React.FC<{ setResult: (res: number | null) => void }> = ({ setResult }) => {
    const [totalVolume, setTotalVolume] = useState('');
    const [doseVolume, setDoseVolume] = useState('');
    const [freqValue, setFreqValue] = useState('');
    const [freqUnit, setFreqUnit] = useState<'day' | 'week' | 'month'>('day');
    const [selectedInjectable, setSelectedInjectable] = useState('');

    const handleInjectableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedInjectable(val);
        if (val) {
            try {
                const injectable = JSON.parse(val);
                setTotalVolume(String(injectable.totalVolume || ''));
                setDoseVolume(String(injectable.defaultDose || ''));
            } catch (error) {
                console.error("Failed to parse injectable data", error);
                setTotalVolume('');
                setDoseVolume('');
            }
        } else {
            setTotalVolume('');
            setDoseVolume('');
        }
    };


    useMemo(() => {
        const tv = parseFloat(totalVolume);
        const dv = parseFloat(doseVolume);
        const fv = parseFloat(freqValue);

        if (tv > 0 && dv > 0 && fv > 0) {
            const totalDoses = tv / dv;
            let days = 0;
            switch(freqUnit) {
                case 'day':
                    days = totalDoses / fv;
                    break;
                case 'week':
                    days = (totalDoses / fv) * 7;
                    break;
                case 'month':
                    days = (totalDoses / fv) * 30; // Using 30 days as a standard month
                    break;
            }
            setResult(Math.floor(days));
        } else {
            setResult(null);
        }
    }, [totalVolume, doseVolume, freqValue, freqUnit, setResult]);

    return (
        <div className="space-y-4 animate-fade-in">
            <div>
                <label htmlFor="injectable-select" className="block text-sm font-medium text-slate-700 mb-1">Select Injectable (Optional)</label>
                <select
                    id="injectable-select"
                    onChange={handleInjectableChange}
                    value={selectedInjectable}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                >
                    {COMMON_INJECTABLES.map(injectable => (
                        <option key={injectable.name} value={injectable.totalVolume > 0 ? JSON.stringify(injectable) : ''}>
                           {injectable.name}
                        </option>
                    ))}
                </select>
            </div>
            <CalculatorInput label="Total Volume Dispensed (mL)" value={totalVolume} onChange={e => setTotalVolume(e.target.value)} placeholder="e.g., 10 for a vial" />
            <CalculatorInput label="Dose per Injection (mL)" value={doseVolume} onChange={e => setDoseVolume(e.target.value)} placeholder="e.g., 0.5" />
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frequency</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={freqValue}
                        onChange={e => setFreqValue(e.target.value)}
                        placeholder="e.g., 1"
                        min="0"
                        className="w-1/3 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <select
                        value={freqUnit}
                        onChange={e => setFreqUnit(e.target.value as any)}
                        className="w-2/3 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                    >
                        <option value="day">time(s) per day</option>
                        <option value="week">time(s) per week</option>
                        <option value="month">time(s) per month</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


// --- Main Component ---
const DaysSupplyCalculator: React.FC<DaysSupplyCalculatorProps> = ({ setView }) => {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>(CalculatorType.Oral);
  const [result, setResult] = useState<number | null>(90); // Default to 90 for oral calc

  const handleSetType = (type: CalculatorType) => {
      setCalculatorType(type);
      setResult(null); // Reset result when switching
      if (type === CalculatorType.Oral) {
        // Pre-calculate for default oral values
        setResult(90);
      }
  }
  
  const renderCalculator = () => {
    switch (calculatorType) {
      case CalculatorType.Inhaler:
        return <InhalerCalculator setResult={setResult} />;
      case CalculatorType.Injectable:
        return <InjectableCalculator setResult={setResult} />;
      case CalculatorType.Oral:
      default:
        return <OralCalculator setResult={setResult} />;
    }
  };

  const SegmentedControlButton: React.FC<{label: CalculatorType, current: CalculatorType, setType: (type: CalculatorType) => void}> = ({label, current, setType}) => {
    const isActive = label === current;
    return (
        <button
            onClick={() => setType(label)}
            className={`w-full py-2 px-4 text-sm font-semibold rounded-md transition-all duration-300 ${isActive ? 'bg-teal-600 text-white shadow' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
        >
            {label}
        </button>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton setView={setView} />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Days Supply Calculator</h2>
        <p className="text-slate-500 mb-6">Calculate the duration for different types of prescriptions.</p>

        <div className="grid grid-cols-3 gap-2 bg-slate-200 p-1 rounded-lg mb-6">
            <SegmentedControlButton label={CalculatorType.Oral} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Inhaler} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Injectable} current={calculatorType} setType={handleSetType} />
        </div>
        
        <div className="space-y-4">
            {renderCalculator()}
        </div>

        {result !== null && result > 0 && (
            <div className="mt-8 p-6 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg animate-fade-in">
                <h3 className="text-sm font-semibold text-teal-800">Calculated Days Supply</h3>
                <p className="text-4xl font-bold text-teal-600">{result} <span className="text-2xl font-medium">days</span></p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DaysSupplyCalculator;