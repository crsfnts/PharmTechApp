export enum View {
  Dashboard = 'DASHBOARD',
  DaysSupplyCalc = 'DAYS_SUPPLY_CALC',
  Glossary = 'GLOSSARY',
  PillIdentifier = 'PILL_IDENTIFIER',
  SigGlossary = 'SIG_GLOSSARY',
  FlashCards = 'FLASH_CARDS',
  InjectionGuide = 'INJECTION_GUIDE',
  HospitalCalculations = 'HOSPITAL_CALCULATIONS',
  IVFlowRate = 'IV_FLOW_RATE',
  Alligation = 'ALLIGATION',
}

export const viewColors: Record<View, string> = {
  [View.Dashboard]: 'bg-white',
  [View.DaysSupplyCalc]: 'bg-blue-500',
  [View.Glossary]: 'bg-purple-500',
  [View.PillIdentifier]: 'bg-amber-500',
  [View.SigGlossary]: 'bg-emerald-500',
  [View.FlashCards]: 'bg-rose-500',
  [View.InjectionGuide]: 'bg-indigo-500',
  [View.HospitalCalculations]: 'bg-teal-500',
  [View.IVFlowRate]: 'bg-cyan-500',
  [View.Alligation]: 'bg-fuchsia-500',
};

export enum CalculatorType {
  Oral = 'Oral',
  Inhaler = 'Inhaler',
  Injectable = 'Injectable',
}

export interface Inhaler {
  name: string;
  puffs: number;
}

export interface Injectable {
  name: string;
  totalVolume: number; // in mL
  defaultDose?: number; // in mL or units
}

export interface DrugInfo {
  genericName: string;
  brandNames: string[];
  commonUses: string[];
  dosageForms: string[];
  commonSideEffects: string[];
  pharmacology: string;
  schedule?: string; // DEA schedule classification (II, III, IV, V, or undefined for non-controlled)
}

export interface Abbreviation {
  term: string;
  definition: string;
}

export interface TopDrug {
  brand: string;
  generic: string;
  schedule?: string; // DEA schedule classification
}

export interface FlashCard {
  category: string;
  question: string;
  answer: string;
}
