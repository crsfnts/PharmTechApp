
import React, { useState, useMemo } from 'react';
import { View, CalculatorType } from '../types.ts';
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
        <label className="block text-sm font-semibold text-neutral-700 mb-2">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder || "0"}
            min={min}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-neutral-900 placeholder:text-neutral-400 hover:border-neutral-400"
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
        <div className="space-y-5 animate-fade-in">
            <div>
                <label htmlFor="inhaler-select" className="block text-sm font-semibold text-neutral-700 mb-2">Select Inhaler</label>
                <select
                    id="inhaler-select"
                    onChange={handleInhalerChange}
                    value={selectedInhalerPuffs}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-neutral-900 hover:border-neutral-400"
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
        <div className="space-y-5 animate-fade-in">
            <div>
                <label htmlFor="injectable-select" className="block text-sm font-semibold text-neutral-700 mb-2">Select Injectable (Optional)</label>
                <select
                    id="injectable-select"
                    onChange={handleInjectableChange}
                    value={selectedInjectable}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-neutral-900 hover:border-neutral-400"
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
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Frequency</label>
                <div className="flex gap-3">
                    <input
                        type="number"
                        value={freqValue}
                        onChange={e => setFreqValue(e.target.value)}
                        placeholder="e.g., 1"
                        min="0"
                        className="w-1/3 px-4 py-3 bg-white border border-neutral-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-neutral-900 placeholder:text-neutral-400 hover:border-neutral-400"
                    />
                    <select
                        value={freqUnit}
                        onChange={e => setFreqUnit(e.target.value as any)}
                        className="w-2/3 px-4 py-3 bg-white border border-neutral-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 text-neutral-900 hover:border-neutral-400"
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
            className={`relative w-full py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-transparent text-neutral-600 hover:bg-neutral-100'}`}
        >
            {label}
        </button>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Days Supply Calculator</h2>
          <p className="text-neutral-600">Calculate the duration for different types of prescriptions with precision.</p>
        </div>

        <div className="flex gap-2 bg-neutral-100 p-2 rounded-2xl mb-8">
            <SegmentedControlButton label={CalculatorType.Oral} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Inhaler} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Injectable} current={calculatorType} setType={handleSetType} />
        </div>

        <div className="space-y-6">
            {renderCalculator()}
        </div>

        {result !== null && result > 0 && (
            <div className="mt-8 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl animate-fade-in shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-900">Calculated Days Supply</h3>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-bold text-emerald-700">{result}</p>
                    <span className="text-2xl font-semibold text-emerald-600">days</span>
                </div>
                <p className="text-sm text-emerald-700 mt-3">Remember to verify this calculation with a licensed pharmacist.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default DaysSupplyCalculator;