import type { DrugInfo } from '../types.ts';

// Minimal curated dataset for reliable offline fallback
// Keys are lowercased generic names
export const DRUG_DETAILS: Record<string, Omit<DrugInfo, 'brandNames'> & { brandNames?: string[] }> = {
  'lisinopril': {
    genericName: 'Lisinopril',
    brandNames: ['Zestril', 'Prinivil'],
    commonUses: ['Hypertension', 'Heart failure', 'Post-MI management'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Cough', 'Dizziness', 'Hyperkalemia', 'Hypotension'],
    pharmacology: 'ACE inhibitor that blocks conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion.'
  },
  'metformin': {
    genericName: 'Metformin',
    brandNames: ['Glucophage'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Tablet', 'Extended-release tablet'],
    commonSideEffects: ['GI upset (nausea, diarrhea)', 'Metallic taste', 'Rare: lactic acidosis'],
    pharmacology: 'Decreases hepatic glucose production and increases peripheral insulin sensitivity.'
  },
  'atorvastatin': {
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    commonUses: ['Hyperlipidemia', 'Prevention of cardiovascular disease'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Myalgia', 'Elevated liver enzymes'],
    pharmacology: 'HMG-CoA reductase inhibitor that reduces cholesterol synthesis.'
  },
  'sertraline': {
    genericName: 'Sertraline',
    brandNames: ['Zoloft'],
    commonUses: ['Depression', 'Anxiety disorders', 'OCD', 'PTSD'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Headache'],
    pharmacology: 'SSRI that selectively inhibits reuptake of serotonin in the CNS.'
  },
  'omeprazole': {
    genericName: 'Omeprazole',
    brandNames: ['Prilosec'],
    commonUses: ['GERD', 'Peptic ulcer disease'],
    dosageForms: ['Delayed-release capsule', 'Tablet'],
    commonSideEffects: ['Headache', 'Abdominal pain', 'Nausea'],
    pharmacology: 'Proton pump inhibitor that irreversibly inhibits gastric H+/K+ ATPase.'
  },
  'amlodipine': {
    genericName: 'Amlodipine',
    brandNames: ['Norvasc'],
    commonUses: ['Hypertension', 'Angina'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Peripheral edema', 'Dizziness', 'Flushing'],
    pharmacology: 'Dihydropyridine calcium channel blocker causing vasodilation.'
  },
  'hydrochlorothiazide': {
    genericName: 'Hydrochlorothiazide',
    brandNames: ['Microzide'],
    commonUses: ['Hypertension', 'Edema'],
    dosageForms: ['Tablet', 'Capsule'],
    commonSideEffects: ['Hypokalemia', 'Hyponatremia', 'Photosensitivity'],
    pharmacology: 'Thiazide diuretic that inhibits Na+/Cl- reabsorption in the distal convoluted tubule.'
  },
  'simvastatin': {
    genericName: 'Simvastatin',
    brandNames: ['Zocor'],
    commonUses: ['Hyperlipidemia'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Myalgia', 'Elevated liver enzymes'],
    pharmacology: 'HMG-CoA reductase inhibitor that reduces cholesterol synthesis.'
  },
  'clopidogrel': {
    genericName: 'Clopidogrel',
    brandNames: ['Plavix'],
    commonUses: ['Prevention of thrombotic events post-MI or stroke', 'ACS management'],
    dosageForms: ['Tablet'],
    commonSideEffects: ['Bleeding', 'Bruising'],
    pharmacology: 'Irreversible P2Y12 receptor antagonist that inhibits platelet aggregation.'
  },
  'gabapentin': {
    genericName: 'Gabapentin',
    brandNames: ['Neurontin'],
    commonUses: ['Neuropathic pain', 'Seizure adjunct'],
    dosageForms: ['Capsule', 'Tablet', 'Solution'],
    commonSideEffects: ['Dizziness', 'Somnolence', 'Ataxia'],
    pharmacology: 'Modulates voltage-gated calcium channels; GABA analog without direct GABAergic activity.'
  },
  'albuterol': {
    genericName: 'Albuterol',
    brandNames: ['ProAir HFA', 'Ventolin HFA', 'Proventil HFA'],
    commonUses: ['Bronchospasm in asthma/COPD'],
    dosageForms: ['Inhaler', 'Nebulizer solution'],
    commonSideEffects: ['Tremor', 'Tachycardia', 'Nervousness'],
    pharmacology: 'Short-acting beta-2 agonist causing bronchial smooth muscle relaxation.'
  },
  'fluticasone/salmeterol': {
    genericName: 'Fluticasone/Salmeterol',
    brandNames: ['Advair Diskus', 'Advair HFA'],
    commonUses: ['Asthma', 'COPD (selected products)'],
    dosageForms: ['Inhaler (Diskus, HFA)'],
    commonSideEffects: ['Oral thrush', 'Hoarseness', 'Headache'],
    pharmacology: 'Combination of inhaled corticosteroid (anti-inflammatory) and long-acting beta-2 agonist (bronchodilation).'
  }
};

export function findDrugLocally(name: string, brands: string[]): DrugInfo | null {
  const q = name.trim().toLowerCase();
  const keysToTry = new Set<string>([q, q.replace(/\s+/g, ' ')]);
  for (const key of keysToTry) {
    if (DRUG_DETAILS[key]) {
      const details = DRUG_DETAILS[key];
      // Ensure brand names include provided options too
      const mergedBrands = Array.from(new Set([...(details.brandNames || []), ...brands])).filter(Boolean);
      return {
        genericName: details.genericName,
        brandNames: mergedBrands,
        commonUses: details.commonUses,
        dosageForms: details.dosageForms,
        commonSideEffects: details.commonSideEffects,
        pharmacology: details.pharmacology,
      };
    }
  }
  return null;
}
