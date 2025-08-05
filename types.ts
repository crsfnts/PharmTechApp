export enum View {
  Dashboard = 'DASHBOARD',
  DaysSupplyCalc = 'DAYS_SUPPLY_CALC',
  Glossary = 'GLOSSARY',
  Counter = 'COUNTER',
  SigGlossary = 'SIG_GLOSSARY',
  FlashCards = 'FLASH_CARDS',
  InjectionGuide = 'INJECTION_GUIDE',
}

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
}

export interface Abbreviation {
  term: string;
  definition: string;
}

export interface TopDrug {
  brand: string;
  generic: string;
}

export interface FlashCard {
  category: string;
  question: string;
  answer: string;
}
