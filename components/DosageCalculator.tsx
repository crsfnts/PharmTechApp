
import React, { useState, useMemo, useRef } from 'react';
import { View, CalculatorType } from '../types.ts';
import { COMMON_INHALERS } from '../constants.ts';

interface DaysSupplyCalculatorProps {
  setView: (view: View) => void;
  initialType?: CalculatorType;
  allowTypeSwitch?: boolean;
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
type InjectableKind = 'insulinPen' | 'vial' | 'weeklyPen';
type InjectableDoseUnit = 'units' | 'mL';
type FrequencyPreset = 'onceDaily' | 'twiceDaily' | 'threeDaily' | 'weekly' | 'every28' | 'custom';
type SigTemplate = 'daily' | 'twiceDaily' | 'beforeMeals' | 'bedtime' | 'slidingScale';

type InjectableProduct = {
    id: string;
    label: string;
    volume: number;
    concentration: number;
    doseUnit: InjectableDoseUnit;
    concentrationLabel: string;
    autoFillLabel: string;
};

const injectableProducts: Record<InjectableKind, InjectableProduct[]> = {
    insulinPen: [
        { id: 'u100-pen', label: 'Insulin Pen 3 mL - U-100', volume: 3, concentration: 100, doseUnit: 'units', concentrationLabel: 'units/mL', autoFillLabel: '300 units per pen' },
        { id: 'u200-pen', label: 'Insulin Pen 3 mL - U-200', volume: 3, concentration: 200, doseUnit: 'units', concentrationLabel: 'units/mL', autoFillLabel: '600 units per pen' },
        { id: 'u300-pen', label: 'Insulin Pen 3 mL - U-300', volume: 3, concentration: 300, doseUnit: 'units', concentrationLabel: 'units/mL', autoFillLabel: '900 units per pen' },
        { id: 'custom-insulin', label: 'Custom insulin pen', volume: 3, concentration: 100, doseUnit: 'units', concentrationLabel: 'units/mL', autoFillLabel: 'Custom package details' },
    ],
    vial: [
        { id: 'testosterone-10ml', label: 'Testosterone Cypionate 10 mL - 200 mg/mL', volume: 10, concentration: 200, doseUnit: 'mL', concentrationLabel: 'mg/mL', autoFillLabel: '10 mL per vial' },
        { id: 'b12-10ml', label: 'B12 Multidose Vial 10 mL', volume: 10, concentration: 1, doseUnit: 'mL', concentrationLabel: 'mg/mL', autoFillLabel: '10 mL per vial' },
        { id: 'custom-vial', label: 'Custom vial injection', volume: 10, concentration: 1, doseUnit: 'mL', concentrationLabel: 'per mL', autoFillLabel: 'Custom package details' },
    ],
    weeklyPen: [
        { id: 'ozempic', label: 'Ozempic / Wegovy style pen', volume: 3, concentration: 1, doseUnit: 'mL', concentrationLabel: 'per mL', autoFillLabel: '3 mL per pen' },
        { id: 'single-weekly', label: 'Single-use weekly pen', volume: 0.5, concentration: 1, doseUnit: 'mL', concentrationLabel: 'per mL', autoFillLabel: '0.5 mL per pen' },
        { id: 'custom-weekly', label: 'Custom weekly pen', volume: 0.5, concentration: 1, doseUnit: 'mL', concentrationLabel: 'per mL', autoFillLabel: 'Custom package details' },
    ],
};

const frequencyLabels: Record<FrequencyPreset, string> = {
    onceDaily: 'Once daily',
    twiceDaily: 'Twice daily',
    threeDaily: 'Three times daily',
    weekly: 'Weekly',
    every28: 'Every 28 days',
    custom: 'Custom',
};

const formatNumber = (value: number) => Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '');

const InjectableCalculator: React.FC<{ setResult: (res: number | null) => void }> = ({ setResult }) => {
    const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
    const [injectableKind, setInjectableKind] = useState<InjectableKind>('insulinPen');
    const [selectedProductId, setSelectedProductId] = useState('u100-pen');
    const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
    const [volume, setVolume] = useState('3');
    const [concentration, setConcentration] = useState('100');
    const [doseUnit, setDoseUnit] = useState<InjectableDoseUnit>('units');
    const [quantity, setQuantity] = useState('');
    const [dose, setDose] = useState('');
    const [frequency, setFrequency] = useState<FrequencyPreset>('onceDaily');
    const [customTimes, setCustomTimes] = useState('1');
    const [customDays, setCustomDays] = useState('1');
    const [sigTemplate, setSigTemplate] = useState<SigTemplate | null>(null);
    const [waste, setWaste] = useState('0');
    const [showMath, setShowMath] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const products = injectableProducts[injectableKind];
    const selectedProduct = products.find(product => product.id === selectedProductId) || products[0];
    const advancedOpen = mode === 'advanced' || showAdvancedDetails;
    const isSlidingScale = sigTemplate === 'slidingScale';

    const selectKind = (kind: InjectableKind) => {
        const nextProduct = injectableProducts[kind][0];
        setInjectableKind(kind);
        setSelectedProductId(nextProduct.id);
        setVolume(String(nextProduct.volume));
        setConcentration(String(nextProduct.concentration));
        setDoseUnit(nextProduct.doseUnit);
        setShowAdvancedDetails(false);
        setDose('');
        setFrequency(kind === 'weeklyPen' ? 'weekly' : 'onceDaily');
        setSigTemplate(null);
        setResult(null);
    };

    const selectProduct = (productId: string) => {
        const product = products.find(item => item.id === productId) || products[0];
        setSelectedProductId(product.id);
        setVolume(String(product.volume));
        setConcentration(String(product.concentration));
        setDoseUnit(product.doseUnit);
        setShowAdvancedDetails(false);
    };

    const applyTemplate = (template: SigTemplate) => {
        setSigTemplate(template);
        if (template === 'daily' || template === 'bedtime') setFrequency('onceDaily');
        if (template === 'twiceDaily') setFrequency('twiceDaily');
        if (template === 'beforeMeals') setFrequency('threeDaily');
    };

    const frequencyMath = useMemo(() => {
        if (isSlidingScale) {
            return { times: 1, days: 1, label: 'maximum expected daily use' };
        }

        if (frequency === 'custom') {
            const times = parseFloat(customTimes);
            const days = parseFloat(customDays);
            return { times, days, label: `${customTimes || '0'} time(s) every ${customDays || '0'} day(s)` };
        }

        const presets: Record<Exclude<FrequencyPreset, 'custom'>, { times: number; days: number; label: string }> = {
            onceDaily: { times: 1, days: 1, label: '1 time daily' },
            twiceDaily: { times: 2, days: 1, label: '2 times daily' },
            threeDaily: { times: 3, days: 1, label: '3 times daily' },
            weekly: { times: 1, days: 7, label: '1 time every 7 days' },
            every28: { times: 1, days: 28, label: '1 time every 28 days' },
        };
        return presets[frequency];
    }, [customDays, customTimes, frequency, isSlidingScale]);

    const calculation = useMemo(() => {
        const packageVolume = parseFloat(volume);
        const packageCount = parseFloat(quantity);
        const productConcentration = parseFloat(concentration);
        const doseAmount = parseFloat(dose);
        const wasteAmount = parseFloat(waste) || 0;
        const times = frequencyMath.times;
        const days = frequencyMath.days;

        const missing: string[] = [];
        if (!(packageCount > 0)) missing.push('Enter quantity dispensed.');
        if (!(doseAmount > 0)) missing.push(isSlidingScale ? 'Enter maximum expected units per day.' : 'Enter dose per injection.');
        if (!(times > 0 && days > 0)) missing.push('Choose a frequency.');
        if (!(packageVolume > 0)) missing.push('Enter package volume.');
        if (doseUnit === 'units' && !(productConcentration > 0)) missing.push('Enter concentration.');

        if (missing.length > 0) {
            return { missing, daysSupply: null as number | null };
        }

        const amountPerPackage = doseUnit === 'units' ? packageVolume * productConcentration : packageVolume;
        const totalDispensed = (packageCount * amountPerPackage) - wasteAmount;
        const usedPerDay = isSlidingScale ? doseAmount : (doseAmount * times) / days;
        const rawDays = totalDispensed / usedPerDay;
        const daysSupply = Math.floor(rawDays);

        return {
            missing,
            amountPerPackage,
            totalDispensed,
            usedPerDay,
            rawDays,
            daysSupply,
            packageCount,
            doseAmount,
            times,
            days,
        };
    }, [concentration, dose, doseUnit, frequencyMath, isSlidingScale, quantity, volume, waste]);

    const amountLabel = doseUnit === 'units' ? 'units' : 'mL';
    const typeCards = [
        { id: 'insulinPen' as const, title: 'Insulin Pen', subtitle: 'KwikPen, FlexPen, SoloStar, etc.' },
        { id: 'vial' as const, title: 'Vial Injection', subtitle: 'Testosterone, B12, multidose vials' },
        { id: 'weeklyPen' as const, title: 'Weekly Pen', subtitle: 'Ozempic, Mounjaro, Trulicity, Wegovy' },
    ];
    const sigTemplates: Array<{ id: SigTemplate; label: string }> = [
        { id: 'daily', label: 'Inject ___ units daily' },
        { id: 'twiceDaily', label: 'Inject ___ units twice daily' },
        { id: 'beforeMeals', label: 'Inject ___ units before meals' },
        { id: 'bedtime', label: 'Inject ___ units at bedtime' },
        { id: 'slidingScale', label: 'Sliding scale / variable dose' },
    ];
    const steps = [
        { label: 'Type', helper: 'What did the prescription say?' },
        { label: 'Device', helper: 'Confirm the package details.' },
        { label: 'Quantity', helper: 'What did we dispense?' },
        { label: 'SIG', helper: 'Build the directions.' },
        { label: 'Result', helper: 'Here is the days supply.' },
    ];
    const canGoBack = activeStep > 0;
    const canGoNext = activeStep < steps.length - 1;
    const goBack = () => setActiveStep(step => Math.max(0, step - 1));
    const goNext = () => setActiveStep(step => Math.min(steps.length - 1, step + 1));
    const resetCalculator = () => {
        setQuantity('');
        setDose('');
        setShowMath(false);
        setActiveStep(0);
    };
    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    };
    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return;
        const deltaX = touchStartX.current - (event.changedTouches[0]?.clientX ?? touchStartX.current);
        touchStartX.current = null;
        if (Math.abs(deltaX) < 45) return;
        if (deltaX > 0) goNext();
        if (deltaX < 0) goBack();
    };

    const typeStep = (
        <section className="space-y-3">
            {typeCards.map(card => {
                const selected = injectableKind === card.id;
                return (
                    <button
                        key={card.id}
                        onClick={() => selectKind(card.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100' : 'border-neutral-200 bg-white'}`}
                    >
                        <span className="block text-base font-semibold text-neutral-900">{card.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-neutral-500">{card.subtitle}</span>
                    </button>
                );
            })}
        </section>
    );

    const deviceStep = (
        <section>
            <label htmlFor="injectable-product" className="block text-sm font-semibold text-neutral-700">Medication / device</label>
            <select
                id="injectable-product"
                value={selectedProductId}
                onChange={event => selectProduct(event.target.value)}
                className="mt-3 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm"
            >
                {products.map(product => (
                    <option key={product.id} value={product.id}>{product.label}</option>
                ))}
            </select>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm">
                <span className="font-semibold text-indigo-900">Auto-filled: {selectedProduct.autoFillLabel}</span>
                <button onClick={() => setShowAdvancedDetails(current => !current)} className="shrink-0 font-semibold text-indigo-700">
                    {advancedOpen ? 'Hide details' : 'Edit details'}
                </button>
            </div>

            {advancedOpen && (
                <div className="mt-4 space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="grid grid-cols-2 gap-3">
                        <CalculatorInput label="Volume per pen/vial" value={volume} onChange={event => setVolume(event.target.value)} placeholder="e.g., 3" />
                        <CalculatorInput label="Concentration" value={concentration} onChange={event => setConcentration(event.target.value)} placeholder="e.g., 100" />
                    </div>
                    <p className="text-xs text-neutral-500">Concentration unit: {selectedProduct.concentrationLabel}</p>
                    <div>
                        <p className="mb-2 text-sm font-semibold text-neutral-700">Dose written in</p>
                        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2">
                            {(['units', 'mL'] as InjectableDoseUnit[]).map(unit => (
                                <button
                                    key={unit}
                                    onClick={() => setDoseUnit(unit)}
                                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${doseUnit === unit ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-neutral-600'}`}
                                >
                                    {unit}
                                </button>
                            ))}
                        </div>
                    </div>
                    {mode === 'advanced' && (
                        <CalculatorInput label="Optional priming/waste amount" value={waste} onChange={event => setWaste(event.target.value)} placeholder="e.g., 2" />
                    )}
                </div>
            )}
        </section>
    );

    const quantityStep = (
        <section>
            <CalculatorInput label="Number of pens/vials dispensed" value={quantity} onChange={event => setQuantity(event.target.value)} placeholder="e.g., 5" />
            <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                Enter the package count from the prescription fill. For insulin pens, this is usually the number of pens dispensed.
            </div>
        </section>
    );

    const sigStep = (
        <section>
            {injectableKind === 'insulinPen' && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {sigTemplates.map(template => (
                        <button
                            key={template.id}
                            onClick={() => applyTemplate(template.id)}
                            className={`min-w-max rounded-xl border px-3 py-2 text-sm font-semibold ${sigTemplate === template.id ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-neutral-200 bg-white text-neutral-600'}`}
                        >
                            {template.label}
                        </button>
                    ))}
                </div>
            )}
            {isSlidingScale && (
                <div className="mt-2 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-800">
                    For variable doses, enter the maximum expected units per day.
                </div>
            )}
            <div className="mt-4 flex items-end gap-3">
                <div className="flex-1">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                        {isSlidingScale ? 'Maximum expected units per day' : 'Inject'}
                    </label>
                    <input
                        type="number"
                        value={dose}
                        onChange={event => setDose(event.target.value)}
                        placeholder={doseUnit === 'units' ? 'e.g., 10' : 'e.g., 1'}
                        min="0"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm"
                    />
                </div>
                {!isSlidingScale && (
                    <select
                        value={doseUnit}
                        onChange={event => setDoseUnit(event.target.value as InjectableDoseUnit)}
                        className="w-28 rounded-xl border border-neutral-300 bg-white px-3 py-3 text-neutral-900 shadow-sm"
                    >
                        <option value="units">units</option>
                        <option value="mL">mL</option>
                    </select>
                )}
            </div>

            {!isSlidingScale && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {(Object.keys(frequencyLabels) as FrequencyPreset[]).map(preset => (
                        <button
                            key={preset}
                            onClick={() => setFrequency(preset)}
                            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${frequency === preset ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-neutral-200 bg-white text-neutral-600'}`}
                        >
                            {frequencyLabels[preset]}
                        </button>
                    ))}
                </div>
            )}

            {frequency === 'custom' && !isSlidingScale && (
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
                    <CalculatorInput label="Times" value={customTimes} onChange={event => setCustomTimes(event.target.value)} placeholder="1" />
                    <span className="pb-3 text-sm font-medium text-neutral-500">every</span>
                    <CalculatorInput label="Days" value={customDays} onChange={event => setCustomDays(event.target.value)} placeholder="1" />
                </div>
            )}
        </section>
    );

    const resultStep = (
        <section className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-xl shadow-indigo-950/10">
            <p className="text-sm font-semibold text-neutral-500">Days supply</p>
            {calculation.daysSupply === null ? (
                <div>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">Complete the fields above to calculate.</p>
                    {calculation.missing.length > 0 && (
                        <p className="mt-2 text-sm text-amber-700">{calculation.missing[0]}</p>
                    )}
                </div>
            ) : (
                <div>
                    <p className="mt-1 text-4xl font-bold text-indigo-700">{calculation.daysSupply} days</p>
                    <div className="mt-4 grid gap-2 text-sm text-neutral-600">
                        <p>Total dispensed: <span className="font-semibold text-neutral-900">{formatNumber(calculation.totalDispensed || 0)} {amountLabel}</span></p>
                        <p>Used per day: <span className="font-semibold text-neutral-900">{formatNumber(calculation.usedPerDay || 0)} {amountLabel}/day</span></p>
                    </div>
                    <button onClick={() => setShowMath(current => !current)} className="mt-4 text-sm font-semibold text-indigo-700">
                        {showMath ? 'Hide math' : 'How we calculated it'}
                    </button>
                    {showMath && (
                        <div className="mt-3 space-y-1 rounded-xl bg-neutral-50 p-3 text-sm leading-6 text-neutral-700">
                            <p>{formatNumber(calculation.packageCount || 0)} {injectableKind === 'vial' ? 'vial(s)' : 'pen(s)'} × {formatNumber(calculation.amountPerPackage || 0)} {amountLabel} each = {formatNumber(calculation.totalDispensed || 0)} {amountLabel}</p>
                            {isSlidingScale ? (
                                <p>{formatNumber(calculation.doseAmount || 0)} {amountLabel} maximum expected daily use = {formatNumber(calculation.usedPerDay || 0)} {amountLabel}/day</p>
                            ) : (
                                <p>{formatNumber(calculation.doseAmount || 0)} {amountLabel} × {frequencyMath.label} = {formatNumber(calculation.usedPerDay || 0)} {amountLabel}/day</p>
                            )}
                            <p>{formatNumber(calculation.totalDispensed || 0)} {amountLabel} ÷ {formatNumber(calculation.usedPerDay || 0)} {amountLabel}/day = {formatNumber(calculation.rawDays || 0)} days</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );

    const stepContent = [typeStep, deviceStep, quantityStep, sigStep, resultStep][activeStep];

    return (
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-md flex-col space-y-5 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-neutral-900">Injectable Calculator</h2>
                <p className="mt-2 text-base leading-7 text-neutral-600">Calculate days supply for insulin pens, vials, and weekly injectables.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-neutral-100 p-2">
                {(['simple', 'advanced'] as const).map(option => (
                    <button
                        key={option}
                        onClick={() => setMode(option)}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold capitalize transition ${mode === option ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-neutral-600'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Step {activeStep + 1} of {steps.length}</p>
                        <h3 className="mt-1 text-xl font-bold text-neutral-900">{steps[activeStep].label}</h3>
                        <p className="mt-1 text-sm leading-6 text-neutral-500">{steps[activeStep].helper}</p>
                    </div>
                    <button onClick={resetCalculator} className="rounded-xl px-3 py-2 text-sm font-semibold text-neutral-500">
                        Reset
                    </button>
                </div>

                <div className="flex gap-2 pb-4">
                    {steps.map((step, index) => (
                        <button
                            key={step.label}
                            onClick={() => setActiveStep(index)}
                            aria-label={`Go to ${step.label}`}
                            className={`h-2 flex-1 rounded-full transition ${index <= activeStep ? 'bg-indigo-600' : 'bg-neutral-200'}`}
                        />
                    ))}
                </div>

                <div
                    className="min-h-[390px] touch-pan-y select-none"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {stepContent}
                </div>
            </div>

            <div className="sticky bottom-24 z-10 mt-auto rounded-3xl border border-neutral-200 bg-white/95 p-3 shadow-xl shadow-indigo-950/10 backdrop-blur">
                <div className="flex items-center gap-3">
                    <button
                        onClick={goBack}
                        disabled={!canGoBack}
                        className="h-12 flex-1 rounded-2xl border border-neutral-200 px-4 text-sm font-semibold text-neutral-600 transition disabled:opacity-40"
                    >
                        Back
                    </button>
                    <button
                        onClick={goNext}
                        disabled={!canGoNext}
                        className="h-12 flex-[1.4] rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition disabled:opacity-40"
                    >
                        {canGoNext ? 'Next' : 'Done'}
                    </button>
                </div>
                <p className="mt-2 text-center text-xs text-neutral-400">Swipe left or right to move between steps.</p>
            </div>
        </div>
    );
};


// --- Main Component ---
const calculatorContent: Record<CalculatorType, { title: string; description: string }> = {
  [CalculatorType.Oral]: {
    title: 'Oral Days Supply',
    description: 'Calculate duration for tablets, capsules, and standard quantity directions.',
  },
  [CalculatorType.Inhaler]: {
    title: 'Inhaler Days Supply',
    description: 'Calculate duration from puffs, daily use, and number of inhalers dispensed.',
  },
  [CalculatorType.Injectable]: {
    title: 'Injectable Days Supply',
    description: 'Calculate duration from total volume, dose volume, and dosing frequency.',
  },
};

const DaysSupplyCalculator: React.FC<DaysSupplyCalculatorProps> = ({ setView, initialType = CalculatorType.Oral, allowTypeSwitch = true }) => {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>(initialType);
  const [result, setResult] = useState<number | null>(initialType === CalculatorType.Oral ? 90 : null);
  const content = calculatorContent[calculatorType];

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

  if (calculatorType === CalculatorType.Injectable) {
    return (
      <div className="mx-auto w-full max-w-md px-5 py-5">
        <InjectableCalculator setResult={setResult} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">{allowTypeSwitch ? 'Days Supply Calculator' : content.title}</h2>
          <p className="text-neutral-600">{allowTypeSwitch ? 'Calculate the duration for different types of prescriptions with precision.' : content.description}</p>
        </div>

        {allowTypeSwitch && <div className="flex gap-2 bg-neutral-100 p-2 rounded-2xl mb-8">
            <SegmentedControlButton label={CalculatorType.Oral} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Inhaler} current={calculatorType} setType={handleSetType} />
            <SegmentedControlButton label={CalculatorType.Injectable} current={calculatorType} setType={handleSetType} />
        </div>}

        <div className="space-y-6">
            {renderCalculator()}
        </div>

        {calculatorType !== CalculatorType.Injectable && result !== null && result > 0 && (
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
