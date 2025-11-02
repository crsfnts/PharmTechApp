import type { DrugInfo } from '../types.ts';

// Comprehensive drug database for offline drug lookup
// Keys are lowercased generic names
export const DRUG_DETAILS: Record<string, Omit<DrugInfo, 'brandNames'> & { brandNames?: string[] }> = {
  'atorvastatin': {
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    commonUses: ['Hyperlipidemia (LDL reduction)', 'Primary and secondary prevention of cardiovascular disease'],
    dosageForms: ['Oral tablets (10, 20, 40, 80 mg)'],
    commonSideEffects: ['Myalgia', 'Elevated liver enzymes', 'GI upset', 'Headache'],
    pharmacology: 'Competitive inhibitor of HMG-CoA reductase in the cholesterol biosynthesis pathway; reduces hepatic cholesterol synthesis and upregulates LDL receptors to increase LDL clearance.'
  },
  'metformin': {
    genericName: 'Metformin',
    brandNames: ['Glucophage'],
    commonUses: ['First-line therapy for type 2 diabetes mellitus', 'Insulin resistance management'],
    dosageForms: ['Oral immediate-release tablets', 'Extended-release tablets', 'Oral solution'],
    commonSideEffects: ['GI upset (nausea, diarrhea)', 'Metallic taste', 'B12 deficiency with long-term use', 'Rare lactic acidosis'],
    pharmacology: 'Decreases hepatic gluconeogenesis, increases peripheral insulin sensitivity and glucose uptake, and reduces intestinal glucose absorption.'
  },
  'levothyroxine': {
    genericName: 'Levothyroxine',
    brandNames: ['Synthroid', 'Levoxyl', 'Tirosint'],
    commonUses: ['Hypothyroidism replacement therapy', 'TSH suppression in certain thyroid cancers or nodules'],
    dosageForms: ['Oral tablets', 'Oral solution', 'Intravenous formulation'],
    commonSideEffects: ['Palpitations', 'Tremor', 'Weight loss', 'Insomnia (symptoms of over-replacement)'],
    pharmacology: 'Synthetic thyroxine (T4) converted peripherally to active T3; binds nuclear thyroid hormone receptors to modulate gene expression and increase metabolic rate.'
  },
  'lisinopril': {
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    commonUses: ['Hypertension', 'Heart failure', 'Post-myocardial infarction therapy', 'Diabetic nephropathy protection'],
    dosageForms: ['Oral tablets (2.5-40 mg strengths)'],
    commonSideEffects: ['Cough (class effect)', 'Hyperkalemia', 'Hypotension', 'Dizziness', 'Rare angioedema'],
    pharmacology: 'Inhibits angiotensin-converting enzyme (ACE), reducing conversion of angiotensin I to angiotensin II, decreasing vasoconstriction and aldosterone secretion.'
  },
  'amlodipine': {
    genericName: 'Amlodipine',
    brandNames: ['Norvasc'],
    commonUses: ['Hypertension', 'Chronic stable angina', 'Vasospastic angina'],
    dosageForms: ['Oral tablets (2.5, 5, 10 mg)'],
    commonSideEffects: ['Peripheral edema', 'Dizziness', 'Flushing', 'Palpitations'],
    pharmacology: 'Blocks L-type calcium channels in vascular smooth muscle causing arterial vasodilation and reduction in blood pressure.'
  },
  'metoprolol': {
    genericName: 'Metoprolol',
    brandNames: ['Lopressor (tartrate)', 'Toprol-XL (succinate)'],
    commonUses: ['Hypertension', 'Angina', 'Heart failure (succinate)', 'Rate control in atrial fibrillation', 'Post-MI management'],
    dosageForms: ['Oral immediate-release (tartrate)', 'Extended-release (succinate)', 'Injectable'],
    commonSideEffects: ['Fatigue', 'Bradycardia', 'Hypotension', 'Dizziness', 'May worsen bronchospasm'],
    pharmacology: 'Selective β1 adrenoceptor antagonist reducing heart rate, contractility, and myocardial oxygen demand.'
  },
  'albuterol': {
    genericName: 'Albuterol',
    brandNames: ['ProAir HFA', 'Ventolin HFA', 'Proventil HFA', 'Accuneb'],
    commonUses: ['Acute bronchospasm relief in asthma and COPD (rescue inhaler)'],
    dosageForms: ['Metered-dose inhaler (MDI)', 'Dry powder inhaler (DPI)', 'Nebulized solution', 'Oral tablets/syrup'],
    commonSideEffects: ['Tremor', 'Tachycardia', 'Palpitations', 'Nervousness', 'Throat irritation'],
    pharmacology: 'Stimulates β2 receptors in bronchial smooth muscle, activating adenylate cyclase to increase cAMP and cause bronchodilation.'
  },
  'losartan': {
    genericName: 'Losartan',
    brandNames: ['Cozaar'],
    commonUses: ['Hypertension', 'Diabetic nephropathy', 'Heart failure adjunct', 'Stroke risk reduction'],
    dosageForms: ['Oral tablets (various strengths)'],
    commonSideEffects: ['Dizziness', 'Hyperkalemia', 'Fatigue', 'Contraindicated in pregnancy'],
    pharmacology: 'Selective AT1 receptor antagonist, preventing angiotensin II-mediated vasoconstriction and aldosterone secretion.'
  },
  'gabapentin': {
    genericName: 'Gabapentin',
    brandNames: ['Neurontin', 'Gralise (ER)'],
    commonUses: ['Neuropathic pain (postherpetic neuralgia, diabetic neuropathy)', 'Adjunctive therapy for partial seizures', 'Off-label: anxiety, restless legs'],
    dosageForms: ['Capsules', 'Tablets', 'Extended-release tablets', 'Oral solution'],
    commonSideEffects: ['Dizziness', 'Somnolence', 'Peripheral edema', 'Ataxia', 'Weight gain'],
    pharmacology: 'Binds α2δ subunit of voltage-gated calcium channels, modulating calcium influx and reducing excitatory neurotransmitter release.'
  },
  'omeprazole': {
    genericName: 'Omeprazole',
    brandNames: ['Prilosec'],
    commonUses: ['GERD', 'Peptic ulcer disease', 'Erosive esophagitis', 'Zollinger-Ellison syndrome', 'H. pylori regimens'],
    dosageForms: ['Delayed-release oral capsules/tablets', 'Oral suspension', 'IV formulations'],
    commonSideEffects: ['Headache', 'GI upset', 'Long-term: B12 deficiency, hypomagnesemia, increased fracture risk'],
    pharmacology: 'Irreversibly inhibits H⁺/K⁺ ATPase in gastric parietal cells, reducing gastric acid secretion.'
  },
  'sertraline': {
    genericName: 'Sertraline',
    brandNames: ['Zoloft'],
    commonUses: ['Major depressive disorder', 'PTSD', 'Panic disorder', 'OCD', 'Social anxiety disorder'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Nausea', 'Sexual dysfunction', 'Insomnia or somnolence', 'Dry mouth', 'Diarrhea', 'Risk of serotonin syndrome'],
    pharmacology: 'Inhibits presynaptic serotonin transporter (SERT), increasing serotonin concentrations in the synaptic cleft.'
  },
  'rosuvastatin': {
    genericName: 'Rosuvastatin',
    brandNames: ['Crestor'],
    commonUses: ['Hyperlipidemia (LDL reduction)', 'Cardiovascular risk reduction'],
    dosageForms: ['Oral tablets (5, 10, 20, 40 mg)'],
    commonSideEffects: ['Myalgia', 'Elevated liver enzymes', 'GI upset', 'Rare myopathy'],
    pharmacology: 'Inhibits HMG-CoA reductase leading to decreased cholesterol synthesis and increased LDL receptor expression.'
  },
  'pantoprazole': {
    genericName: 'Pantoprazole',
    brandNames: ['Protonix'],
    commonUses: ['GERD', 'Erosive esophagitis', 'Acid-related disorders'],
    dosageForms: ['Delayed-release oral tablets', 'IV formulation'],
    commonSideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Long-term PPI risks'],
    pharmacology: 'Irreversibly inhibits gastric H⁺/K⁺ ATPase in parietal cells, decreasing acid secretion.'
  },
  'escitalopram': {
    genericName: 'Escitalopram',
    brandNames: ['Lexapro'],
    commonUses: ['Major depressive disorder', 'Generalized anxiety disorder'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Sexual dysfunction', 'Nausea', 'Somnolence or insomnia', 'Dry mouth', 'Possible QT prolongation at high doses'],
    pharmacology: 'Highly selective SERT inhibitor, increasing synaptic serotonin.'
  },
  'amphetamine/dextroamphetamine': {
    genericName: 'Amphetamine/Dextroamphetamine',
    brandNames: ['Adderall', 'Mydayis'],
    commonUses: ['Attention-deficit/hyperactivity disorder (ADHD)', 'Narcolepsy'],
    dosageForms: ['Immediate-release and extended-release oral capsules/tablets'],
    commonSideEffects: ['Decreased appetite', 'Insomnia', 'Tachycardia', 'Elevated blood pressure', 'Anxiety', 'Abuse/dependence potential'],
    pharmacology: 'Increases presynaptic release and inhibits reuptake of dopamine and norepinephrine, enhancing central adrenergic/dopaminergic activity.'
  },
  'hydrochlorothiazide': {
    genericName: 'Hydrochlorothiazide',
    brandNames: ['Microzide'],
    commonUses: ['Hypertension', 'Mild edema'],
    dosageForms: ['Oral tablets (12.5, 25, 50 mg)', 'Often in combination products'],
    commonSideEffects: ['Electrolyte disturbances (hypokalemia, hyponatremia)', 'Hyperuricemia', 'Hyperglycemia', 'Dizziness'],
    pharmacology: 'Inhibits Na⁺/Cl⁻ cotransporter in distal convoluted tubule, increasing sodium and water excretion and reducing plasma volume.'
  },
  'bupropion': {
    genericName: 'Bupropion',
    brandNames: ['Wellbutrin', 'Zyban'],
    commonUses: ['Major depressive disorder', 'Seasonal affective disorder', 'Smoking cessation (Zyban)'],
    dosageForms: ['Immediate-release', 'Sustained-release', 'Extended-release oral tablets'],
    commonSideEffects: ['Insomnia', 'Dry mouth', 'Agitation', 'Headache', 'Risk of seizures at high doses'],
    pharmacology: 'Inhibits reuptake of dopamine and norepinephrine; minimal serotonergic effects.'
  },
  'fluoxetine': {
    genericName: 'Fluoxetine',
    brandNames: ['Prozac'],
    commonUses: ['Depression', 'OCD', 'Bulimia nervosa', 'Panic disorder'],
    dosageForms: ['Tablets', 'Capsules', 'Liquid formulations'],
    commonSideEffects: ['Insomnia', 'Sexual dysfunction', 'GI upset', 'Agitation', 'Long half-life impacts switching regimens'],
    pharmacology: 'Inhibits serotonin reuptake via SERT blockade, increasing serotonergic neurotransmission.'
  },
  'semaglutide': {
    genericName: 'Semaglutide',
    brandNames: ['Ozempic (diabetes)', 'Wegovy (weight management)'],
    commonUses: ['Type 2 diabetes mellitus (glycemic control)', 'Chronic weight management (higher doses)'],
    dosageForms: ['Subcutaneous injection pens (weekly dosing)'],
    commonSideEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Decreased appetite', 'Possible pancreatitis risk'],
    pharmacology: 'GLP-1 receptor agonist that enhances glucose-dependent insulin secretion, suppresses glucagon, slows gastric emptying, and reduces appetite.'
  },
  'montelukast': {
    genericName: 'Montelukast',
    brandNames: ['Singulair'],
    commonUses: ['Asthma maintenance (especially allergic asthma)', 'Allergic rhinitis'],
    dosageForms: ['Oral tablets', 'Chewable tablets', 'Oral granules'],
    commonSideEffects: ['Headache', 'Abdominal pain', 'Rare neuropsychiatric events (mood changes, sleep disturbances)'],
    pharmacology: 'Antagonizes cysteinyl leukotriene receptor (CysLT1), reducing leukotriene-mediated bronchoconstriction and inflammation.'
  },
  'trazodone': {
    genericName: 'Trazodone',
    brandNames: ['Desyrel', 'Oleptro'],
    commonUses: ['Depression (approved)', 'Insomnia (off-label at lower doses)'],
    dosageForms: ['Immediate-release and extended-release oral tablets'],
    commonSideEffects: ['Sedation', 'Dizziness', 'Orthostatic hypotension', 'Rare priapism'],
    pharmacology: 'Antagonizes certain serotonin receptor subtypes and inhibits serotonin reuptake, producing antidepressant and sedative effects.'
  },
  'simvastatin': {
    genericName: 'Simvastatin',
    brandNames: ['Zocor'],
    commonUses: ['Hyperlipidemia (LDL reduction)', 'Cardiovascular risk reduction'],
    dosageForms: ['Oral tablets (various strengths)'],
    commonSideEffects: ['Myalgia', 'Elevated liver enzymes', 'GI upset', 'Increased myopathy risk with drug interactions'],
    pharmacology: 'Inhibits HMG-CoA reductase, decreasing cholesterol synthesis and upregulating LDL receptors.'
  },
  'amoxicillin': {
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Moxatag (ER)'],
    commonUses: ['Otitis media', 'Sinusitis', 'Respiratory tract infections', 'Skin infections', 'H. pylori adjunct therapy'],
    dosageForms: ['Capsules', 'Chewable tablets', 'Oral suspension', 'Extended-release tablets'],
    commonSideEffects: ['Diarrhea', 'Rash', 'Nausea', 'Hypersensitivity reactions in penicillin-allergic patients'],
    pharmacology: 'Binds penicillin-binding proteins inhibiting bacterial cell wall synthesis leading to cell lysis.'
  },
  'tamsulosin': {
    genericName: 'Tamsulosin',
    brandNames: ['Flomax'],
    commonUses: ['Symptomatic benign prostatic hyperplasia (BPH) to improve urinary flow'],
    dosageForms: ['Oral capsules (0.4 mg, 0.8 mg)'],
    commonSideEffects: ['Dizziness', 'Orthostatic hypotension', 'Ejaculatory dysfunction', 'Rhinitis'],
    pharmacology: 'Selective blockade of alpha-1A receptors in prostate and bladder neck smooth muscle, leading to relaxation and improved urine flow.'
  },
  'hydrocodone/acetaminophen': {
    genericName: 'Hydrocodone/Acetaminophen',
    brandNames: ['Vicodin', 'Norco', 'Lortab'],
    commonUses: ['Moderate to severe pain management (short-term)'],
    dosageForms: ['Oral tablets/capsules (various strengths)', 'Liquid formulations'],
    commonSideEffects: ['Drowsiness', 'Constipation', 'Nausea', 'Respiratory depression risk', 'Hepatotoxicity risk from acetaminophen overdosing'],
    pharmacology: 'Hydrocodone is a mu-opioid receptor agonist producing analgesia and sedation; acetaminophen is an analgesic/antipyretic, combined for additive analgesic effect.'
  },
  'fluticasone': {
    genericName: 'Fluticasone',
    brandNames: ['Flonase (nasal)', 'Flovent (inhaled)'],
    commonUses: ['Allergic rhinitis (nasal spray)', 'Asthma maintenance (inhaled)'],
    dosageForms: ['Nasal spray', 'Metered-dose inhaler', 'Topical cream/ointment'],
    commonSideEffects: ['Nasal irritation', 'Sore throat', 'Headache', 'Oral candidiasis (inhaled)'],
    pharmacology: 'Binds glucocorticoid receptors, modulating gene transcription to reduce inflammation.'
  },
  'meloxicam': {
    genericName: 'Meloxicam',
    brandNames: ['Mobic'],
    commonUses: ['Osteoarthritis', 'Rheumatoid arthritis', 'Musculoskeletal pain'],
    dosageForms: ['Oral tablets', 'Oral suspension'],
    commonSideEffects: ['GI upset', 'Edema', 'Hypertension', 'Headache', 'Increased cardiovascular and GI risks with long-term use'],
    pharmacology: 'Inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis, leading to anti-inflammatory and analgesic effects.'
  },
  'apixaban': {
    genericName: 'Apixaban',
    brandNames: ['Eliquis'],
    commonUses: ['Stroke prevention in atrial fibrillation', 'Treatment and prevention of DVT/PE'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bleeding', 'Anemia', 'Nausea'],
    pharmacology: 'Selectively inhibits factor Xa, preventing conversion of prothrombin to thrombin, reducing clot formation.'
  },
  'furosemide': {
    genericName: 'Furosemide',
    brandNames: ['Lasix'],
    commonUses: ['Edema associated with heart failure, liver disease, renal disease', 'Hypertension'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV injection'],
    commonSideEffects: ['Electrolyte imbalances (hypokalemia, hyponatremia)', 'Dehydration', 'Hypotension', 'Ototoxicity at high doses'],
    pharmacology: 'Inhibits Na⁺-K⁺-2Cl⁻ symporter in the thick ascending loop of Henle, promoting diuresis.'
  },
  'insulin glargine': {
    genericName: 'Insulin Glargine',
    brandNames: ['Lantus', 'Basaglar', 'Toujeo'],
    commonUses: ['Type 1 and type 2 diabetes mellitus for basal insulin coverage'],
    dosageForms: ['Subcutaneous injection pens and vials'],
    commonSideEffects: ['Hypoglycemia', 'Injection site reactions', 'Weight gain'],
    pharmacology: 'Long-acting insulin analog with slow, steady release; binds insulin receptors to facilitate glucose uptake and inhibit hepatic glucose production.'
  },
  'duloxetine': {
    genericName: 'Duloxetine',
    brandNames: ['Cymbalta'],
    commonUses: ['Major depressive disorder', 'Generalized anxiety disorder', 'Neuropathic pain', 'Fibromyalgia'],
    dosageForms: ['Delayed-release capsules'],
    commonSideEffects: ['Nausea', 'Dry mouth', 'Dizziness', 'Somnolence', 'Hypertension'],
    pharmacology: 'Inhibits presynaptic reuptake of serotonin and norepinephrine, increasing their levels in the synaptic cleft.'
  },
  'ibuprofen': {
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin'],
    commonUses: ['Pain', 'Inflammation', 'Fever'],
    dosageForms: ['Oral tablets', 'Capsules', 'Liquid suspension', 'IV injection'],
    commonSideEffects: ['GI upset', 'Bleeding risk', 'Renal impairment', 'Dizziness'],
    pharmacology: 'Non-selectively inhibits COX-1 and COX-2, reducing prostaglandin synthesis for analgesic, anti-inflammatory, and antipyretic effects.'
  },
  'famotidine': {
    genericName: 'Famotidine',
    brandNames: ['Pepcid'],
    commonUses: ['GERD', 'Peptic ulcer disease', 'Zollinger-Ellison syndrome'],
    dosageForms: ['Oral tablets', 'Oral suspension', 'IV injection'],
    commonSideEffects: ['Headache', 'Dizziness', 'Constipation', 'Diarrhea'],
    pharmacology: 'Competitively inhibits H₂ receptors on gastric parietal cells, reducing acid secretion.'
  },
  'empagliflozin': {
    genericName: 'Empagliflozin',
    brandNames: ['Jardiance'],
    commonUses: ['Type 2 diabetes mellitus', 'Cardiovascular risk reduction in T2DM patients'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Genital mycotic infections', 'Urinary tract infections', 'Hypotension', 'Dehydration'],
    pharmacology: 'Inhibits sodium-glucose co-transporter 2 in renal proximal tubules, increasing urinary glucose excretion.'
  },
  'carvedilol': {
    genericName: 'Carvedilol',
    brandNames: ['Coreg'],
    commonUses: ['Hypertension', 'Heart failure', 'Post-MI management'],
    dosageForms: ['Oral tablets', 'Extended-release capsules'],
    commonSideEffects: ['Fatigue', 'Hypotension', 'Dizziness', 'Bradycardia'],
    pharmacology: 'Blocks β1, β2, and α1 adrenergic receptors, reducing heart rate, contractility, and systemic vascular resistance.'
  },
  'tramadol': {
    genericName: 'Tramadol',
    brandNames: ['Ultram', 'ConZip'],
    commonUses: ['Moderate to moderately severe pain'],
    dosageForms: ['Immediate-release tablets', 'Extended-release tablets', 'Oral suspension'],
    commonSideEffects: ['Nausea', 'Dizziness', 'Constipation', 'Somnolence', 'Risk of dependence and serotonin syndrome'],
    pharmacology: 'Weak μ-opioid receptor agonist and inhibits norepinephrine and serotonin reuptake, providing analgesic effects.'
  },
  'alprazolam': {
    genericName: 'Alprazolam',
    brandNames: ['Xanax'],
    commonUses: ['Anxiety disorders', 'Panic disorder'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets', 'Extended-release tablets'],
    commonSideEffects: ['Sedation', 'Dizziness', 'Impaired coordination', 'Dependence'],
    pharmacology: 'Enhances GABAergic neurotransmission by binding to GABA-A receptor, producing anxiolytic, sedative, and muscle-relaxant effects.'
  },
  'prednisone': {
    genericName: 'Prednisone',
    brandNames: ['Deltasone', 'Rayos'],
    commonUses: ['Inflammatory and autoimmune conditions', 'Asthma exacerbations', 'Allergic reactions'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Weight gain', 'Hyperglycemia', 'Mood changes', 'Osteoporosis with chronic use'],
    pharmacology: 'Binds cytoplasmic glucocorticoid receptors, modulating gene transcription to suppress inflammation and immune responses.'
  },
  'hydroxyzine': {
    genericName: 'Hydroxyzine',
    brandNames: ['Vistaril', 'Atarax'],
    commonUses: ['Anxiety', 'Pruritus', 'Sedation', 'Antiemetic adjunct'],
    dosageForms: ['Oral tablets', 'Capsules', 'Syrup', 'IM/IV injection'],
    commonSideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Headache'],
    pharmacology: 'Competes with histamine at H1 receptors, producing antihistaminic and sedative effects.'
  },
  'buspirone': {
    genericName: 'Buspirone',
    brandNames: ['Buspar'],
    commonUses: ['Generalized anxiety disorder (GAD)'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Dizziness', 'Headache', 'Nausea', 'Nervousness'],
    pharmacology: 'Partial agonist at 5-HT1A receptors; modulates serotonergic activity without significant sedation or dependence.'
  },
  'clopidogrel': {
    genericName: 'Clopidogrel',
    brandNames: ['Plavix'],
    commonUses: ['Acute coronary syndrome', 'Post-stent placement', 'Secondary prevention of stroke and MI'],
    dosageForms: ['Oral tablets (75 mg, 300 mg loading)'],
    commonSideEffects: ['Bleeding', 'Bruising', 'GI upset'],
    pharmacology: 'Irreversibly inhibits P2Y12 ADP receptors on platelets, preventing platelet aggregation.'
  },
  'glipizide': {
    genericName: 'Glipizide',
    brandNames: ['Glucotrol'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Immediate-release tablets', 'Extended-release tablets'],
    commonSideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea'],
    pharmacology: 'Stimulates pancreatic β-cells to secrete insulin; may increase insulin sensitivity in peripheral tissues.'
  },
  'citalopram': {
    genericName: 'Citalopram',
    brandNames: ['Celexa'],
    commonUses: ['Major depressive disorder'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Nausea', 'Sexual dysfunction', 'Somnolence or insomnia', 'QT prolongation at high doses'],
    pharmacology: 'Inhibits serotonin reuptake at presynaptic neurons, increasing synaptic serotonin.'
  },
  'potassium chloride': {
    genericName: 'Potassium Chloride',
    brandNames: ['Klor-Con', 'Micro-K'],
    commonUses: ['Hypokalemia prevention/treatment'],
    dosageForms: ['Oral tablets', 'Extended-release tablets', 'Oral solution', 'IV injection'],
    commonSideEffects: ['GI irritation', 'Nausea', 'Hyperkalemia if overdosed'],
    pharmacology: 'Provides potassium ions to restore normal serum potassium levels, essential for cardiac, neuromuscular, and metabolic function.'
  },
  'allopurinol': {
    genericName: 'Allopurinol',
    brandNames: ['Zyloprim'],
    commonUses: ['Gout prophylaxis', 'Hyperuricemia management'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Rash', 'GI upset', 'Rarely severe hypersensitivity reactions (Stevens-Johnson syndrome)'],
    pharmacology: 'Inhibits xanthine oxidase, reducing production of uric acid and preventing crystal deposition.'
  },
  'aspirin': {
    genericName: 'Aspirin',
    brandNames: ['Bayer', 'Ecotrin'],
    commonUses: ['Pain', 'Inflammation', 'Fever', 'Prevention of cardiovascular events'],
    dosageForms: ['Oral tablets (regular, enteric-coated)', 'Chewable tablets'],
    commonSideEffects: ['GI bleeding', 'Dyspepsia', 'Hypersensitivity reactions'],
    pharmacology: 'Irreversibly inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis and platelet aggregation.'
  },
  'cyclobenzaprine': {
    genericName: 'Cyclobenzaprine',
    brandNames: ['Flexeril'],
    commonUses: ['Muscle spasm associated with acute musculoskeletal conditions'],
    dosageForms: ['Oral tablets', 'Extended-release capsules'],
    commonSideEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Fatigue'],
    pharmacology: 'Centrally acting muscle relaxant, structurally related to tricyclic antidepressants; reduces somatic motor activity in spinal cord.'
  },
  'ergocalciferol': {
    genericName: 'Ergocalciferol (Vitamin D2)',
    brandNames: ['Drisdol'],
    commonUses: ['Vitamin D deficiency', 'Rickets', 'Osteomalacia'],
    dosageForms: ['Oral capsules', 'Oral solution'],
    commonSideEffects: ['Hypercalcemia', 'GI upset (rare at therapeutic doses)'],
    pharmacology: 'Converted to active vitamin D metabolites (calcitriol), regulating calcium and phosphate homeostasis and promoting bone mineralization.'
  },
  'oxycodone': {
    genericName: 'Oxycodone',
    brandNames: ['OxyContin', 'Roxicodone'],
    commonUses: ['Moderate to severe pain'],
    dosageForms: ['Immediate-release tablets', 'Extended-release tablets', 'Oral solution'],
    commonSideEffects: ['Constipation', 'Sedation', 'Nausea', 'Respiratory depression', 'High abuse potential'],
    pharmacology: 'μ-opioid receptor agonist; modulates pain perception at the spinal and supraspinal level.'
  },
  'methylphenidate': {
    genericName: 'Methylphenidate',
    brandNames: ['Ritalin', 'Concerta', 'Metadate'],
    commonUses: ['ADHD', 'Narcolepsy'],
    dosageForms: ['Immediate-release tablets', 'Extended-release tablets/capsules', 'Transdermal patch'],
    commonSideEffects: ['Insomnia', 'Decreased appetite', 'Anxiety', 'Elevated blood pressure'],
    pharmacology: 'Blocks reuptake of dopamine and norepinephrine into presynaptic neurons, increasing catecholamine levels in the synaptic cleft.'
  },
  'venlafaxine': {
    genericName: 'Venlafaxine',
    brandNames: ['Effexor XR'],
    commonUses: ['Major depressive disorder', 'Generalized anxiety disorder', 'Panic disorder', 'Social anxiety disorder'],
    dosageForms: ['Extended-release capsules', 'Immediate-release tablets'],
    commonSideEffects: ['Nausea', 'Headache', 'Insomnia', 'Dizziness', 'Hypertension', 'Risk of serotonin syndrome'],
    pharmacology: 'Inhibits reuptake of serotonin and norepinephrine, increasing their levels in the synaptic cleft.'
  },
  'glimepiride': {
    genericName: 'Glimepiride',
    brandNames: ['Amaryl'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets (1, 2, 4 mg)'],
    commonSideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea'],
    pharmacology: 'Stimulates pancreatic β-cells to release insulin; may enhance peripheral glucose uptake.'
  },
  'propranolol': {
    genericName: 'Propranolol',
    brandNames: ['Inderal', 'Inderal LA'],
    commonUses: ['Hypertension', 'Angina', 'Arrhythmias', 'Migraine prophylaxis', 'Essential tremor'],
    dosageForms: ['Oral tablets', 'Extended-release capsules', 'Oral solution', 'IV injection'],
    commonSideEffects: ['Bradycardia', 'Hypotension', 'Fatigue', 'Dizziness', 'Bronchospasm in susceptible patients'],
    pharmacology: 'Non-selectively blocks β1 and β2 adrenergic receptors, reducing heart rate, cardiac output, and blood pressure.'
  },
  'naproxen': {
    genericName: 'Naproxen',
    brandNames: ['Aleve', 'Naprosyn'],
    commonUses: ['Pain', 'Inflammation', 'Osteoarthritis', 'Rheumatoid arthritis', 'Gout'],
    dosageForms: ['Oral tablets', 'Oral suspension'],
    commonSideEffects: ['GI upset', 'Dizziness', 'Headache', 'Increased cardiovascular risk with long-term use'],
    pharmacology: 'Non-selectively inhibits COX-1 and COX-2, decreasing prostaglandin synthesis for analgesic and anti-inflammatory effects.'
  },
  'sildenafil': {
    genericName: 'Sildenafil',
    brandNames: ['Viagra', 'Revatio'],
    commonUses: ['Erectile dysfunction', 'Pulmonary arterial hypertension'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Headache', 'Flushing', 'Dyspepsia', 'Visual disturbances', 'Hypotension'],
    pharmacology: 'Inhibits PDE5, increasing cGMP in smooth muscle, causing vasodilation in pulmonary vasculature or corpus cavernosum.'
  },
  'clonazepam': {
    genericName: 'Clonazepam',
    brandNames: ['Klonopin'],
    commonUses: ['Seizure disorders', 'Panic disorder', 'Anxiety'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets'],
    commonSideEffects: ['Sedation', 'Dizziness', 'Ataxia', 'Dependence', 'Cognitive impairment'],
    pharmacology: 'Enhances GABAergic neurotransmission via GABA-A receptor binding, producing anticonvulsant and anxiolytic effects.'
  },
  'dexamethasone': {
    genericName: 'Dexamethasone',
    brandNames: ['Decadron', 'DexPak'],
    commonUses: ['Inflammatory disorders', 'Autoimmune diseases', 'Cerebral edema', 'Antiemetic adjunct'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV/IM injection', 'Topical formulations'],
    commonSideEffects: ['Hyperglycemia', 'Insomnia', 'Weight gain', 'Mood changes', 'Osteoporosis with chronic use'],
    pharmacology: 'Binds glucocorticoid receptors, modulating gene expression to suppress inflammation and immune responses.'
  },
  'esomeprazole': {
    genericName: 'Esomeprazole',
    brandNames: ['Nexium'],
    commonUses: ['GERD', 'Erosive esophagitis', 'Zollinger-Ellison syndrome', 'H. pylori eradication regimens'],
    dosageForms: ['Delayed-release oral capsules', 'Oral suspension', 'IV injection'],
    commonSideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Long-term PPI risks (B12 deficiency, hypomagnesemia)'],
    pharmacology: 'Irreversibly inhibits H⁺/K⁺ ATPase in gastric parietal cells, decreasing acid secretion.'
  },
  'latanoprost': {
    genericName: 'Latanoprost',
    brandNames: ['Xalatan'],
    commonUses: ['Open-angle glaucoma', 'Ocular hypertension'],
    dosageForms: ['Ophthalmic solution'],
    commonSideEffects: ['Eye redness', 'Eyelash growth', 'Iris pigmentation changes', 'Ocular irritation'],
    pharmacology: 'Increases aqueous humor outflow via uveoscleral pathway, lowering intraocular pressure.'
  },
  'paroxetine': {
    genericName: 'Paroxetine',
    brandNames: ['Paxil'],
    commonUses: ['Depression', 'Anxiety disorders', 'OCD', 'PTSD', 'Panic disorder'],
    dosageForms: ['Oral tablets', 'Oral suspension', 'Extended-release tablets'],
    commonSideEffects: ['Sexual dysfunction', 'Nausea', 'Somnolence', 'Weight gain', 'Risk of serotonin syndrome'],
    pharmacology: 'Inhibits serotonin reuptake at presynaptic neurons, increasing synaptic serotonin.'
  },
  'mometasone': {
    genericName: 'Mometasone',
    brandNames: ['Nasonex', 'Asmanex'],
    commonUses: ['Allergic rhinitis', 'Asthma maintenance'],
    dosageForms: ['Nasal spray', 'Inhaled powder', 'Topical cream'],
    commonSideEffects: ['Nasal irritation', 'Headache', 'Oral candidiasis (inhaled)'],
    pharmacology: 'Binds glucocorticoid receptors, modulating gene expression to reduce inflammation.'
  },
  'tadalafil': {
    genericName: 'Tadalafil',
    brandNames: ['Cialis', 'Adcirca'],
    commonUses: ['Erectile dysfunction', 'Benign prostatic hyperplasia', 'Pulmonary hypertension'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Headache', 'Flushing', 'Dyspepsia', 'Back pain'],
    pharmacology: 'Inhibits PDE5, increasing cGMP, leading to smooth muscle relaxation.'
  },
  'quetiapine': {
    genericName: 'Quetiapine',
    brandNames: ['Seroquel'],
    commonUses: ['Schizophrenia', 'Bipolar disorder', 'Major depressive disorder adjunct'],
    dosageForms: ['Immediate-release tablets', 'Extended-release tablets'],
    commonSideEffects: ['Sedation', 'Weight gain', 'Metabolic syndrome', 'Orthostatic hypotension'],
    pharmacology: 'Antagonist at dopamine D2 and serotonin 5-HT2A receptors, modulating neurotransmission.'
  },
  'risperidone': {
    genericName: 'Risperidone',
    brandNames: ['Risperdal'],
    commonUses: ['Schizophrenia', 'Bipolar disorder', 'Irritability in autism'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets', 'Solution', 'IM injection'],
    commonSideEffects: ['Weight gain', 'Sedation', 'Extrapyramidal symptoms', 'Hyperprolactinemia'],
    pharmacology: 'Antagonist at dopamine D2 and serotonin 5-HT2A receptors.'
  },
  'lorazepam': {
    genericName: 'Lorazepam',
    brandNames: ['Ativan'],
    commonUses: ['Anxiety', 'Status epilepticus', 'Preoperative sedation'],
    dosageForms: ['Oral tablets', 'Sublingual tablets', 'IV/IM injection'],
    commonSideEffects: ['Sedation', 'Dizziness', 'Respiratory depression', 'Dependence'],
    pharmacology: 'Enhances GABAergic neurotransmission via GABA-A receptor binding.'
  },
  'insulin aspart': {
    genericName: 'Insulin Aspart',
    brandNames: ['Novolog'],
    commonUses: ['Type 1 and 2 diabetes mellitus (mealtime coverage)'],
    dosageForms: ['Subcutaneous injection pens and vials'],
    commonSideEffects: ['Hypoglycemia', 'Injection site reactions', 'Weight gain'],
    pharmacology: 'Rapid-onset insulin analog, binds insulin receptors to promote glucose uptake.'
  },
  'dulaglutide': {
    genericName: 'Dulaglutide',
    brandNames: ['Trulicity'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Subcutaneous injection weekly'],
    commonSideEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'Decreased appetite'],
    pharmacology: 'Activates GLP-1 receptors, enhancing glucose-dependent insulin secretion.'
  },
  'lisinopril/hydrochlorothiazide': {
    genericName: 'Lisinopril/Hydrochlorothiazide',
    brandNames: ['Zestoretic', 'Prinzide'],
    commonUses: ['Hypertension'],
    dosageForms: ['Oral tablets (various strengths)'],
    commonSideEffects: ['Cough', 'Hyperkalemia', 'Hypotension', 'Dizziness'],
    pharmacology: 'Lisinopril inhibits ACE; hydrochlorothiazide promotes sodium/water excretion.'
  },
  'insulin detemir': {
    genericName: 'Insulin Detemir',
    brandNames: ['Levemir'],
    commonUses: ['Type 1 and 2 diabetes mellitus (basal insulin)'],
    dosageForms: ['Subcutaneous injection pens'],
    commonSideEffects: ['Hypoglycemia', 'Weight gain', 'Injection site reactions'],
    pharmacology: 'Long-acting insulin analog providing steady basal insulin coverage.'
  },
  'pioglitazone': {
    genericName: 'Pioglitazone',
    brandNames: ['Actos'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Weight gain', 'Edema', 'Risk of heart failure exacerbation', 'Risk of bladder cancer (long-term)'],
    pharmacology: 'Activates PPAR-γ receptors, increasing insulin sensitivity in adipose tissue, muscle, and liver.'
  },
  'levofloxacin': {
    genericName: 'Levofloxacin',
    brandNames: ['Levaquin'],
    commonUses: ['Respiratory tract infections', 'Urinary tract infections', 'Skin infections'],
    dosageForms: ['Oral tablets', 'IV solution'],
    commonSideEffects: ['GI upset', 'Tendonitis/tendon rupture', 'QT prolongation', 'CNS effects'],
    pharmacology: 'Inhibits bacterial DNA gyrase and topoisomerase IV, preventing DNA replication and cell division.'
  },
  'metoclopramide': {
    genericName: 'Metoclopramide',
    brandNames: ['Reglan'],
    commonUses: ['Gastroparesis', 'Nausea and vomiting', 'GERD adjunct'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV/IM injection'],
    commonSideEffects: ['Drowsiness', 'Restlessness', 'Diarrhea', 'Extrapyramidal symptoms'],
    pharmacology: 'Dopamine D2 receptor antagonist; enhances gastric motility and increases lower esophageal sphincter tone.'
  },
  'warfarin': {
    genericName: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    commonUses: ['Prevention and treatment of venous thromboembolism', 'Atrial fibrillation stroke prevention'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bleeding', 'Bruising', 'Skin necrosis (rare)', 'Interactions with foods and drugs'],
    pharmacology: 'Inhibits vitamin K epoxide reductase, reducing synthesis of vitamin K-dependent clotting factors II, VII, IX, X.'
  },
  'oxybutynin': {
    genericName: 'Oxybutynin',
    brandNames: ['Ditropan', 'Oxytrol'],
    commonUses: ['Overactive bladder', 'Urinary incontinence'],
    dosageForms: ['Oral tablets', 'Extended-release tablets', 'Transdermal patch', 'Topical gel'],
    commonSideEffects: ['Dry mouth', 'Constipation', 'Dizziness', 'Blurred vision', 'Urinary retention'],
    pharmacology: 'Blocks muscarinic receptors in bladder smooth muscle, reducing detrusor contractions.'
  },
  'loratadine': {
    genericName: 'Loratadine',
    brandNames: ['Claritin'],
    commonUses: ['Allergic rhinitis', 'Urticaria'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets', 'Syrup'],
    commonSideEffects: ['Headache', 'Somnolence (rare)', 'Fatigue'],
    pharmacology: 'Selectively blocks peripheral H1 receptors, reducing allergic symptoms without significant sedation.'
  },
  'clindamycin': {
    genericName: 'Clindamycin',
    brandNames: ['Cleocin'],
    commonUses: ['Skin and soft tissue infections', 'Respiratory infections', 'Anaerobic infections'],
    dosageForms: ['Oral capsules', 'Oral solution', 'Topical cream/gel', 'IV/IM injection'],
    commonSideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Risk of Clostridioides difficile infection'],
    pharmacology: 'Inhibits bacterial protein synthesis by binding to 50S ribosomal subunit.'
  },
  'sitagliptin': {
    genericName: 'Sitagliptin',
    brandNames: ['Januvia'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Upper respiratory infection', 'Headache', 'Pancreatitis (rare)'],
    pharmacology: 'Inhibits dipeptidyl peptidase-4, prolonging incretin activity and enhancing glucose-dependent insulin secretion.'
  },
  'temazepam': {
    genericName: 'Temazepam',
    brandNames: ['Restoril'],
    commonUses: ['Short-term insomnia treatment'],
    dosageForms: ['Oral capsules'],
    commonSideEffects: ['Drowsiness', 'Dizziness', 'Confusion', 'Dependence'],
    pharmacology: 'Enhances GABA-A receptor activity, producing sedation and sleep induction.'
  },
  'clonidine': {
    genericName: 'Clonidine',
    brandNames: ['Catapres', 'Kapvay'],
    commonUses: ['Hypertension', 'ADHD', 'Opioid withdrawal support'],
    dosageForms: ['Oral tablets', 'Transdermal patch'],
    commonSideEffects: ['Drowsiness', 'Dry mouth', 'Hypotension', 'Bradycardia'],
    pharmacology: 'Stimulates central alpha-2 receptors, reducing sympathetic outflow and lowering blood pressure.'
  },
  'metformin/sitagliptin': {
    genericName: 'Metformin/Sitagliptin',
    brandNames: ['Janumet'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['GI upset', 'Diarrhea', 'Lactic acidosis (rare)', 'Upper respiratory infection'],
    pharmacology: 'Metformin decreases hepatic glucose production; sitagliptin prolongs incretin activity.'
  },
  'alendronate': {
    genericName: 'Alendronate',
    brandNames: ['Fosamax'],
    commonUses: ['Osteoporosis', 'Paget\'s disease'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['GI upset', 'Esophageal irritation', 'Musculoskeletal pain'],
    pharmacology: 'Inhibits osteoclast-mediated bone resorption, increasing bone density.'
  },
  'fentanyl': {
    genericName: 'Fentanyl',
    brandNames: ['Duragesic', 'Sublimaze'],
    commonUses: ['Severe pain management', 'Anesthesia adjunct'],
    dosageForms: ['Transdermal patch', 'IV injection', 'Lozenge', 'Buccal tablets'],
    commonSideEffects: ['Respiratory depression', 'Sedation', 'Constipation', 'Nausea', 'High abuse potential'],
    pharmacology: 'Potent μ-opioid receptor agonist; modulates pain perception in CNS.'
  },
  'diazepam': {
    genericName: 'Diazepam',
    brandNames: ['Valium'],
    commonUses: ['Anxiety', 'Seizures', 'Muscle spasm', 'Alcohol withdrawal'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV/IM injection', 'Rectal gel'],
    commonSideEffects: ['Sedation', 'Dizziness', 'Dependence', 'Respiratory depression'],
    pharmacology: 'Enhances GABAergic neurotransmission via GABA-A receptor binding.'
  },
  'hydrocortisone': {
    genericName: 'Hydrocortisone',
    brandNames: ['Cortef', 'Solu-Cortef'],
    commonUses: ['Inflammatory and autoimmune conditions', 'Adrenal insufficiency', 'Dermatologic disorders'],
    dosageForms: ['Oral tablets', 'IV/IM injection', 'Topical cream', 'Rectal preparation'],
    commonSideEffects: ['Hyperglycemia', 'Mood changes', 'Weight gain', 'Osteoporosis with chronic use'],
    pharmacology: 'Binds glucocorticoid receptors, modulating gene expression to suppress inflammation.'
  },
  'levocetirizine': {
    genericName: 'Levocetirizine',
    brandNames: ['Xyzal'],
    commonUses: ['Allergic rhinitis', 'Chronic urticaria'],
    dosageForms: ['Oral tablets', 'Oral solution'],
    commonSideEffects: ['Drowsiness (minimal)', 'Headache', 'Fatigue'],
    pharmacology: 'Selectively blocks peripheral H1 receptors, reducing allergic symptoms.'
  },
  'levetiracetam': {
    genericName: 'Levetiracetam',
    brandNames: ['Keppra'],
    commonUses: ['Seizure disorders (partial, myoclonic, tonic-clonic)'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV solution'],
    commonSideEffects: ['Dizziness', 'Somnolence', 'Irritability', 'Fatigue'],
    pharmacology: 'Binds synaptic vesicle protein 2A (SV2A), modulating neurotransmitter release and reducing excitability.'
  },
  'pravastatin': {
    genericName: 'Pravastatin',
    brandNames: ['Pravachol'],
    commonUses: ['Hypercholesterolemia', 'Cardiovascular risk reduction'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Myalgia', 'Headache', 'GI upset'],
    pharmacology: 'Inhibits HMG-CoA reductase, decreasing cholesterol synthesis.'
  },
  'atenolol': {
    genericName: 'Atenolol',
    brandNames: ['Tenormin'],
    commonUses: ['Hypertension', 'Angina', 'Post-MI management'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bradycardia', 'Hypotension', 'Fatigue', 'Dizziness'],
    pharmacology: 'Selectively blocks β1 adrenergic receptors, decreasing heart rate, cardiac output, and blood pressure.'
  },
  'fexofenadine': {
    genericName: 'Fexofenadine',
    brandNames: ['Allegra'],
    commonUses: ['Seasonal allergic rhinitis', 'Chronic urticaria'],
    dosageForms: ['Oral tablets', 'Oral suspension'],
    commonSideEffects: ['Headache', 'Nausea', 'Drowsiness (rare)'],
    pharmacology: 'Selectively blocks peripheral H1 receptors, reducing histamine-mediated symptoms.'
  },
  'cetirizine': {
    genericName: 'Cetirizine',
    brandNames: ['Zyrtec'],
    commonUses: ['Allergic rhinitis', 'Urticaria'],
    dosageForms: ['Oral tablets', 'Chewable tablets', 'Syrup'],
    commonSideEffects: ['Drowsiness (mild)', 'Headache', 'Fatigue'],
    pharmacology: 'Selectively antagonizes peripheral H1 receptors.'
  },
  'olanzapine': {
    genericName: 'Olanzapine',
    brandNames: ['Zyprexa'],
    commonUses: ['Schizophrenia', 'Bipolar disorder', 'Depression adjunct'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets', 'IM injection'],
    commonSideEffects: ['Weight gain', 'Sedation', 'Metabolic syndrome', 'Orthostatic hypotension'],
    pharmacology: 'Antagonist at dopamine D2 and serotonin 5-HT2A receptors.'
  },
  'aripiprazole': {
    genericName: 'Aripiprazole',
    brandNames: ['Abilify'],
    commonUses: ['Schizophrenia', 'Bipolar disorder', 'Depression adjunct', 'Irritability in autism'],
    dosageForms: ['Oral tablets', 'Orally disintegrating tablets', 'Oral solution', 'IM injection'],
    commonSideEffects: ['Akathisia', 'Insomnia', 'Weight gain', 'Nausea'],
    pharmacology: 'Partial agonist at dopamine D2 and serotonin 5-HT1A receptors; antagonist at serotonin 5-HT2A receptors.'
  },
  'doxycycline': {
    genericName: 'Doxycycline',
    brandNames: ['Vibramycin', 'Doryx'],
    commonUses: ['Respiratory tract infections', 'Acne', 'Lyme disease', 'Malaria prophylaxis'],
    dosageForms: ['Oral capsules', 'Oral tablets', 'Oral suspension', 'IV injection'],
    commonSideEffects: ['Photosensitivity', 'GI upset', 'Tooth discoloration in children', 'Esophageal irritation'],
    pharmacology: 'Inhibits bacterial protein synthesis by binding to 30S ribosomal subunit.'
  },
  'amoxicillin/clavulanate': {
    genericName: 'Amoxicillin/Clavulanate',
    brandNames: ['Augmentin'],
    commonUses: ['Bacterial infections (respiratory, skin, urinary)'],
    dosageForms: ['Oral tablets', 'Chewable tablets', 'Oral suspension'],
    commonSideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Allergic reactions'],
    pharmacology: 'Amoxicillin inhibits bacterial cell wall synthesis; clavulanate inhibits beta-lactamase enzymes.'
  },
  'cephalexin': {
    genericName: 'Cephalexin',
    brandNames: ['Keflex'],
    commonUses: ['Skin infections', 'Respiratory infections', 'Bone infections', 'Urinary tract infections'],
    dosageForms: ['Oral capsules', 'Oral tablets', 'Oral suspension'],
    commonSideEffects: ['Diarrhea', 'Nausea', 'Rash', 'Allergic reactions'],
    pharmacology: 'Inhibits bacterial cell wall synthesis by binding penicillin-binding proteins.'
  },
  'azithromycin': {
    genericName: 'Azithromycin',
    brandNames: ['Zithromax'],
    commonUses: ['Respiratory infections', 'Sexually transmitted infections', 'Skin infections'],
    dosageForms: ['Oral tablets', 'Oral suspension', 'IV solution'],
    commonSideEffects: ['GI upset', 'Diarrhea', 'QT prolongation', 'Hepatotoxicity (rare)'],
    pharmacology: 'Inhibits bacterial protein synthesis by binding 50S ribosomal subunit.'
  },
  'spironolactone': {
    genericName: 'Spironolactone',
    brandNames: ['Aldactone'],
    commonUses: ['Heart failure', 'Hypertension', 'Edema', 'Hyperaldosteronism'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Hyperkalemia', 'Gynecomastia', 'Dizziness', 'Menstrual irregularities'],
    pharmacology: 'Antagonizes aldosterone receptors in distal nephron, promoting sodium excretion and potassium retention.'
  },
  'diltiazem': {
    genericName: 'Diltiazem',
    brandNames: ['Cardizem', 'Tiazac'],
    commonUses: ['Hypertension', 'Angina', 'Atrial fibrillation/flutter'],
    dosageForms: ['Oral tablets', 'Extended-release capsules', 'IV injection'],
    commonSideEffects: ['Bradycardia', 'Hypotension', 'Edema', 'Dizziness'],
    pharmacology: 'Inhibits calcium influx in cardiac and smooth muscle, reducing contractility and vascular resistance.'
  },
  'verapamil': {
    genericName: 'Verapamil',
    brandNames: ['Calan', 'Verelan'],
    commonUses: ['Hypertension', 'Angina', 'Supraventricular tachycardia', 'Atrial fibrillation/flutter'],
    dosageForms: ['Oral tablets', 'Extended-release tablets', 'IV injection'],
    commonSideEffects: ['Bradycardia', 'Hypotension', 'Constipation', 'Dizziness', 'Edema'],
    pharmacology: 'Inhibits calcium influx in cardiac and vascular smooth muscle, decreasing heart rate, contractility, and vascular resistance.'
  },
  'valsartan': {
    genericName: 'Valsartan',
    brandNames: ['Diovan'],
    commonUses: ['Hypertension', 'Heart failure', 'Post-MI left ventricular dysfunction'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Dizziness', 'Hypotension', 'Hyperkalemia'],
    pharmacology: 'Blocks angiotensin II type 1 receptors, leading to vasodilation and decreased blood pressure.'
  },
  'rivaroxaban': {
    genericName: 'Rivaroxaban',
    brandNames: ['Xarelto'],
    commonUses: ['Prevention of stroke in atrial fibrillation', 'Treatment and prevention of venous thromboembolism'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bleeding', 'Anemia', 'GI upset'],
    pharmacology: 'Selectively inhibits factor Xa, preventing thrombin formation and thrombus development.'
  },
  'prasugrel': {
    genericName: 'Prasugrel',
    brandNames: ['Effient'],
    commonUses: ['Prevention of thrombotic cardiovascular events in patients undergoing PCI'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bleeding', 'Hypertension', 'Nausea'],
    pharmacology: 'Irreversibly inhibits platelet P2Y12 receptor, reducing platelet aggregation.'
  },
  'ticagrelor': {
    genericName: 'Ticagrelor',
    brandNames: ['Brilinta'],
    commonUses: ['Acute coronary syndrome', 'Prevention of thrombotic events post-PCI'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Bleeding', 'Dyspnea', 'Bradyarrhythmia'],
    pharmacology: 'Reversibly inhibits platelet P2Y12 receptor, preventing ADP-mediated platelet activation.'
  },
  'digoxin': {
    genericName: 'Digoxin',
    brandNames: ['Lanoxin', 'Digitek'],
    commonUses: ['Heart failure', 'Atrial fibrillation'],
    dosageForms: ['Oral tablets', 'Oral solution', 'IV injection'],
    commonSideEffects: ['Nausea', 'Vomiting', 'Bradycardia', 'Arrhythmias', 'Visual disturbances'],
    pharmacology: 'Inhibits Na⁺/K⁺-ATPase, increasing intracellular calcium in cardiac cells, improving contractility and slowing AV conduction.'
  },
  'amiodarone': {
    genericName: 'Amiodarone',
    brandNames: ['Pacerone', 'Cordarone'],
    commonUses: ['Ventricular arrhythmias', 'Atrial fibrillation'],
    dosageForms: ['Oral tablets', 'IV injection'],
    commonSideEffects: ['Pulmonary toxicity', 'Thyroid dysfunction', 'Liver enzyme elevations', 'Photosensitivity'],
    pharmacology: 'Blocks potassium channels, prolonging repolarization; also affects sodium, calcium channels, and beta-adrenergic receptors.'
  },
  'sotalol': {
    genericName: 'Sotalol',
    brandNames: ['Betapace'],
    commonUses: ['Ventricular arrhythmias', 'Atrial fibrillation/flutter'],
    dosageForms: ['Oral tablets', 'IV injection'],
    commonSideEffects: ['Bradycardia', 'Fatigue', 'Dizziness', 'QT prolongation'],
    pharmacology: 'Non-selectively blocks β-adrenergic receptors and prolongs action potential duration.'
  },
  'dapagliflozin': {
    genericName: 'Dapagliflozin',
    brandNames: ['Farxiga'],
    commonUses: ['Type 2 diabetes mellitus', 'Heart failure', 'Chronic kidney disease'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Genital infections', 'Urinary tract infections', 'Hypotension', 'Ketoacidosis (rare)'],
    pharmacology: 'Inhibits SGLT2 in proximal renal tubules, reducing glucose reabsorption and promoting glucosuria.'
  },
  'linagliptin': {
    genericName: 'Linagliptin',
    brandNames: ['Tradjenta'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Nasopharyngitis', 'Headache', 'Hypersensitivity reactions'],
    pharmacology: 'Inhibits dipeptidyl peptidase-4, increasing incretin levels and enhancing glucose-dependent insulin secretion.'
  },
  'saxagliptin': {
    genericName: 'Saxagliptin',
    brandNames: ['Onglyza'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Upper respiratory infection', 'Headache', 'Hypoglycemia (with sulfonylureas)'],
    pharmacology: 'Inhibits DPP-4 enzyme, prolonging incretin activity and promoting insulin secretion.'
  },
  'glyburide': {
    genericName: 'Glyburide',
    brandNames: ['Diabeta', 'Micronase'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Hypoglycemia', 'Weight gain', 'GI upset'],
    pharmacology: 'Stimulates insulin secretion from pancreatic beta cells.'
  },
  'rosiglitazone': {
    genericName: 'Rosiglitazone',
    brandNames: ['Avandia'],
    commonUses: ['Type 2 diabetes mellitus'],
    dosageForms: ['Oral tablets'],
    commonSideEffects: ['Weight gain', 'Edema', 'Increased risk of heart failure'],
    pharmacology: 'Activates PPARγ, improving insulin sensitivity in peripheral tissues.'
  },
  'insulin lispro': {
    genericName: 'Insulin Lispro',
    brandNames: ['Humalog'],
    commonUses: ['Type 1 and type 2 diabetes mellitus'],
    dosageForms: ['Subcutaneous injection', 'Insulin pump'],
    commonSideEffects: ['Hypoglycemia', 'Injection site reactions', 'Weight gain'],
    pharmacology: 'Rapidly lowers blood glucose by facilitating cellular glucose uptake after meals.'
  },
  'pregabalin': {
    genericName: 'Pregabalin',
    brandNames: ['Lyrica'],
    commonUses: ['Neuropathic pain', 'Fibromyalgia', 'Seizure adjunct'],
    dosageForms: ['Capsule', 'Solution'],
    commonSideEffects: ['Dizziness', 'Somnolence', 'Peripheral edema', 'Weight gain'],
    pharmacology: 'Binds to voltage-gated calcium channels, modulating neurotransmitter release.'
  },
  'zolpidem': {
    genericName: 'Zolpidem',
    brandNames: ['Ambien'],
    commonUses: ['Insomnia'],
    dosageForms: ['Tablet', 'Extended-release tablet', 'Spray'],
    commonSideEffects: ['Drowsiness', 'Dizziness', 'Headache', 'Diarrhea'],
    pharmacology: 'Non-benzodiazepine sedative-hypnotic that selectively binds to GABA-A receptors.'
  },
  'diphenhydramine': {
    genericName: 'Diphenhydramine',
    brandNames: ['Benadryl'],
    commonUses: ['Allergic reactions', 'Insomnia', 'Motion sickness'],
    dosageForms: ['Oral tablets', 'Capsules', 'Liquid', 'IM/IV injection'],
    commonSideEffects: ['Drowsiness', 'Dry mouth', 'Urinary retention', 'Dizziness'],
    pharmacology: 'Blocks H1 receptors and crosses the blood-brain barrier, producing sedative effects.'
  },
  'ciprofloxacin': {
    genericName: 'Ciprofloxacin',
    brandNames: ['Cipro'],
    commonUses: ['Bacterial infections (urinary, respiratory, skin, GI)'],
    dosageForms: ['Tablet', 'Extended-release tablet', 'Suspension', 'Injection'],
    commonSideEffects: ['Nausea', 'Diarrhea', 'Tendon rupture risk', 'Photosensitivity'],
    pharmacology: 'Fluoroquinolone antibiotic that inhibits bacterial DNA gyrase and topoisomerase IV.'
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
