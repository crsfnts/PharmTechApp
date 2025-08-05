
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlashCard } from '../types.ts';
import BackButton from './BackButton.tsx';
import { PTCB_FLASHCARDS } from '../constants.ts';

interface PTCBLearningProps {
  setView: (view: View) => void;
}

interface StudySection {
  title: string;
  subsections: StudySubsection[];
}

interface StudySubsection {
  subtitle: string;
  content: string[];
}

interface QuestionResult {
  card: FlashCard;
  isCorrect: boolean;
  timestamp: Date;
}

const STUDY_SECTIONS: StudySection[] = [
  {
    title: "Top 200 Drugs & Pharmacology",
    subsections: [
      {
        subtitle: "Drug Classification & Recognition",
        content: [
          "Brand and generic name recognition is crucial for the PTCB exam",
          "Focus on therapeutic classes: ACE inhibitors, statins, antibiotics, antidepressants, antihistamines",
          "Common drug endings: -pril (ACE inhibitors), -statin (cholesterol), -cillin (antibiotics), -zole (proton pump inhibitors)",
          "Learn drug families: beta blockers (-olol), calcium channel blockers (-dipine), NSAIDs (-profen)",
          "Memorize controlled substance schedules for common drugs"
        ]
      },
      {
        subtitle: "Cardiovascular Medications",
        content: [
          "ACE Inhibitors: Lisinopril, Enalapril, Ramipril - treat hypertension, heart failure",
          "ARBs: Losartan, Valsartan, Olmesartan - alternative to ACE inhibitors",
          "Beta Blockers: Metoprolol, Atenolol, Propranolol - treat hypertension, arrhythmias",
          "Calcium Channel Blockers: Amlodipine, Nifedipine, Diltiazem - treat hypertension, angina",
          "Statins: Atorvastatin, Simvastatin, Rosuvastatin - lower cholesterol",
          "Diuretics: Furosemide (loop), HCTZ (thiazide), Spironolactone (potassium-sparing)",
          "Anticoagulants: Warfarin, Apixaban, Rivaroxaban - prevent blood clots"
        ]
      },
      {
        subtitle: "CNS & Psychiatric Medications",
        content: [
          "SSRIs: Sertraline, Fluoxetine, Escitalopram - treat depression, anxiety",
          "SNRIs: Venlafaxine, Duloxetine - treat depression, neuropathic pain",
          "Benzodiazepines: Alprazolam, Lorazepam, Clonazepam - treat anxiety (Schedule IV)",
          "Anticonvulsants: Phenytoin, Carbamazepine, Gabapentin - treat seizures, neuropathic pain",
          "ADHD medications: Methylphenidate, Amphetamine salts (Schedule II)",
          "Antipsychotics: Risperidone, Quetiapine, Aripiprazole - treat schizophrenia, bipolar disorder",
          "Sleep aids: Zolpidem, Eszopiclone (Schedule IV)"
        ]
      },
      {
        subtitle: "Endocrine & Metabolic Drugs",
        content: [
          "Insulin types: Rapid-acting (Humalog, Novolog), Long-acting (Lantus, Levemir)",
          "Oral antidiabetics: Metformin, Glipizide, Sitagliptin, Empagliflozin",
          "Thyroid medications: Levothyroxine (Synthroid), Liothyronine",
          "Osteoporosis: Alendronate, Risedronate, Denosumab",
          "Hormone replacement: Estradiol, Testosterone, Progesterone"
        ]
      },
      {
        subtitle: "Respiratory & Allergy Medications",
        content: [
          "Bronchodilators: Albuterol (SABA), Salmeterol (LABA), Tiotropium (LAMA)",
          "Corticosteroids: Fluticasone, Budesonide, Prednisone",
          "Combination inhalers: Advair (fluticasone/salmeterol), Symbicort (budesonide/formoterol)",
          "Antihistamines: Loratadine, Cetirizine, Fexofenadine",
          "Cough suppressants: Dextromethorphan, Codeine"
        ]
      }
    ]
  },
  {
    title: "Pharmacy Law & Regulations",
    subsections: [
      {
        subtitle: "Controlled Substances Act",
        content: [
          "Schedule I: No accepted medical use, high abuse potential (heroin, LSD, marijuana)",
          "Schedule II: High abuse potential, severe dependence (morphine, oxycodone, methylphenidate)",
          "Schedule III: Moderate abuse potential (codeine combinations, testosterone)",
          "Schedule IV: Low abuse potential (alprazolam, zolpidem, tramadol)",
          "Schedule V: Lowest abuse potential (cough syrups with codeine)",
          "DEA registration required for all controlled substance activities",
          "Schedule II prescriptions: 90-day validity, no refills, written or electronic only",
          "Schedule III-V: 6-month validity, maximum 5 refills"
        ]
      },
      {
        subtitle: "DEA Forms & Procedures",
        content: [
          "DEA Form 222: Ordering Schedule II controlled substances",
          "DEA Form 106: Reporting theft or significant loss of controlled substances",
          "DEA Form 224: Application for pharmacy registration",
          "DEA Form 41: Destruction of controlled substances",
          "Biennial inventory required for all controlled substances",
          "Perpetual inventory required for Schedule II drugs",
          "Record keeping: Schedule II (2 years), Schedule III-V (2 years)"
        ]
      },
      {
        subtitle: "Federal Pharmacy Laws",
        content: [
          "OBRA '90: Requires drug utilization review and patient counseling for Medicaid",
          "HIPAA: Protects patient health information privacy",
          "Poison Prevention Packaging Act: Child-resistant containers required",
          "Durham-Humphrey Amendment: Distinguishes prescription vs OTC drugs",
          "Kefauver-Harris Amendment: Requires proof of efficacy and safety",
          "Medicare Modernization Act: Created Medicare Part D",
          "Combat Methamphetamine Epidemic Act: Restricts pseudoephedrine sales"
        ]
      },
      {
        subtitle: "Prescription Requirements",
        content: [
          "Patient information: Name, address, date of birth",
          "Prescriber information: Name, address, DEA number, signature",
          "Drug information: Name, strength, dosage form, quantity, directions",
          "Date written and number of refills authorized",
          "Prescription validity periods vary by state and drug schedule",
          "Transfer rules: Schedule III-V can be transferred once between pharmacies",
          "Refill limitations: Schedule II (no refills), III-V (max 5 refills or 6 months)"
        ]
      }
    ]
  },
  {
    title: "Pharmacy Calculations",
    subsections: [
      {
        subtitle: "Unit Conversions",
        content: [
          "Metric system: 1 kg = 1000 g, 1 g = 1000 mg, 1 mg = 1000 mcg",
          "Volume: 1 L = 1000 mL, 1 mL = 1 cc",
          "Household measurements: 1 tsp = 5 mL, 1 tbsp = 15 mL, 1 fl oz = 30 mL",
          "Weight conversions: 1 kg = 2.2 lbs, 1 oz = 28.35 g",
          "Temperature: C = (F-32) × 5/9, F = (C × 9/5) + 32"
        ]
      },
      {
        subtitle: "Concentration Calculations",
        content: [
          "Percentage strength: w/w, w/v, v/v calculations",
          "Parts per million (ppm) and parts per billion (ppb)",
          "Milligrams per milliliter (mg/mL) concentrations",
          "Molarity and milliosmoles for IV solutions",
          "Stock solution dilutions: C1V1 = C2V2",
          "Isotonic solutions and sodium chloride equivalents"
        ]
      },
      {
        subtitle: "Dosage Calculations",
        content: [
          "Dose = Body weight × Dose per kg",
          "Pediatric and geriatric dosing considerations",
          "Body surface area (BSA) calculations for chemotherapy",
          "Creatinine clearance and renal dosing adjustments",
          "Loading dose vs maintenance dose calculations",
          "Bioavailability and bioequivalence factors"
        ]
      },
      {
        subtitle: "Business Mathematics",
        content: [
          "Insurance copays and deductibles",
          "AWP (Average Wholesale Price) calculations",
          "Markup and discount percentages",
          "Days supply calculations for various dosage forms",
          "Inventory turnover and ordering calculations",
          "Profit margin and cost analysis"
        ]
      },
      {
        subtitle: "IV Flow Rate Calculations",
        content: [
          "mL/hr = Total volume ÷ Time in hours",
          "Drops per minute = (mL/hr × Drop factor) ÷ 60",
          "Units per hour for insulin and heparin drips",
          "Concentration calculations for continuous infusions",
          "Electrolyte replacement calculations"
        ]
      }
    ]
  },
  {
    title: "Medication Safety & Quality Assurance",
    subsections: [
      {
        subtitle: "High-Alert Medications",
        content: [
          "Insulin: Different types, concentrations, and administration methods",
          "Anticoagulants: Warfarin, heparin, DOACs - monitoring requirements",
          "Chemotherapy agents: Cytotoxic handling and preparation",
          "Opioids: Risk of respiratory depression and addiction",
          "Electrolyte concentrates: Potassium, sodium, magnesium",
          "Neuromuscular blocking agents: Risk of paralysis"
        ]
      },
      {
        subtitle: "Look-Alike/Sound-Alike (LASA) Drugs",
        content: [
          "Celebrex (celecoxib) vs Celexa (citalopram)",
          "Hydralazine vs Hydroxyzine",
          "Clonazepam vs Clorazepate vs Clonidine",
          "Prednisone vs Prednisolone",
          "Quinidine vs Quinine",
          "Vincristine vs Vinblastine",
          "Use of tall man lettering: DOPamine vs DOBUTamine"
        ]
      },
      {
        subtitle: "Error Prevention Strategies",
        content: [
          "Five rights of medication administration",
          "Independent double checks for high-alert medications",
          "Barcode scanning technology",
          "Automated dispensing systems",
          "Clinical decision support systems",
          "Standardized concentrations and dosing protocols",
          "Failure mode and effects analysis (FMEA)"
        ]
      },
      {
        subtitle: "Medication Storage & Handling",
        content: [
          "Room temperature: 15-25°C (59-77°F)",
          "Refrigeration: 2-8°C (36-46°F)",
          "Freezer: -25 to -10°C (-13 to 14°F)",
          "Controlled room temperature: 20-25°C (68-77°F)",
          "Light-sensitive medications: Store in amber containers",
          "Hazardous drug handling: USP <800> requirements",
          "Cytotoxic drug preparation in biological safety cabinets"
        ]
      }
    ]
  },
  {
    title: "Sterile & Non-Sterile Compounding",
    subsections: [
      {
        subtitle: "USP Standards",
        content: [
          "USP <795>: Non-sterile compounding standards",
          "USP <797>: Sterile compounding standards",
          "USP <800>: Hazardous drug handling requirements",
          "Beyond use dating (BUD) requirements",
          "Environmental monitoring and testing",
          "Personnel training and competency validation"
        ]
      },
      {
        subtitle: "Sterile Compounding Procedures",
        content: [
          "Primary engineering controls: Laminar airflow workbench, biological safety cabinet",
          "Secondary engineering controls: Buffer area, ante area",
          "Aseptic technique and hand hygiene",
          "Garbing procedures and PPE requirements",
          "Media fill testing and surface sampling",
          "Risk levels: Low, medium, high, immediate use"
        ]
      },
      {
        subtitle: "Non-Sterile Compounding",
        content: [
          "Capsule filling techniques and calculations",
          "Ointment and cream preparation",
          "Solution and suspension compounding",
          "Suppository preparation methods",
          "Powder blending and trituration",
          "Quality control testing and documentation"
        ]
      }
    ]
  },
  {
    title: "Pharmacy Operations & Management",
    subsections: [
      {
        subtitle: "Prescription Processing Workflow",
        content: [
          "Prescription receipt and data entry",
          "Drug utilization review (DUR)",
          "Insurance adjudication and prior authorization",
          "Product selection and preparation",
          "Pharmacist verification and clinical review",
          "Patient counseling and medication dispensing",
          "Documentation and record keeping"
        ]
      },
      {
        subtitle: "Insurance & Third-Party Billing",
        content: [
          "BIN (Bank Identification Number) and PCN (Processor Control Number)",
          "DAW codes: 0-9 and their meanings",
          "Prior authorization (PA) and step therapy requirements",
          "MAC (Maximum Allowable Cost) pricing",
          "Copay, coinsurance, and deductible calculations",
          "Medicare Part D and coverage gap (donut hole)",
          "Medicaid and state assistance programs"
        ]
      },
      {
        subtitle: "Inventory Management",
        content: [
          "FIFO (First In, First Out) rotation principles",
          "ABC analysis for inventory classification",
          "Reorder points and economic order quantity (EOQ)",
          "Wholesaler purchasing and contracts",
          "Controlled substance ordering and receiving",
          "Expired and recalled product handling",
          "Automated dispensing cabinet management"
        ]
      },
      {
        subtitle: "Quality Improvement & Compliance",
        content: [
          "Medication error reporting and analysis",
          "Continuous quality improvement (CQI) programs",
          "Joint Commission and regulatory compliance",
          "Pharmacy and therapeutics (P&T) committee participation",
          "Drug shortage management strategies",
          "Environmental monitoring and cleaning procedures",
          "Staff training and competency assessment"
        ]
      }
    ]
  },
  {
    title: "Communication & Patient Care",
    subsections: [
      {
        subtitle: "Patient Counseling Requirements",
        content: [
          "OBRA '90 counseling requirements for Medicaid patients",
          "New prescription counseling points",
          "Refill counseling for changes or concerns",
          "Medication therapy management (MTM) services",
          "Adverse drug reaction identification and reporting",
          "Drug interaction and contraindication counseling"
        ]
      },
      {
        subtitle: "Health Literacy & Communication",
        content: [
          "Plain language principles in patient education",
          "Cultural competency in healthcare delivery",
          "Interpreter services and language barriers",
          "Visual aids and demonstration techniques",
          "Teach-back method for confirmation",
          "Written materials at appropriate reading levels"
        ]
      },
      {
        subtitle: "Special Populations",
        content: [
          "Pediatric dosing and administration considerations",
          "Geriatric medication management and polypharmacy",
          "Pregnancy and lactation drug safety categories",
          "Patients with disabilities and accommodation needs",
          "Mental health considerations and medication adherence",
          "Chronic disease management and monitoring"
        ]
      }
    ]
  }
];

const shuffleArray = (array: FlashCard[]): FlashCard[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PTCBLearning: React.FC<PTCBLearningProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'study' | 'flashcards' | 'wrong'>('study');
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<QuestionResult[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Only reshuffle when switching to flashcards tab, not when questions are completed
    if (activeTab === 'flashcards') {
      const availableCards = PTCB_FLASHCARDS.filter((_, index) => !completedQuestions.has(index));
      setShuffledCards(shuffleArray(availableCards));
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  }, [activeTab]); // Only reshuffle when switching to flashcards tab
  
  useEffect(() => {
    if (activeTab === 'flashcards') {
      const availableCards = PTCB_FLASHCARDS.filter((_, index) => !completedQuestions.has(index));
      setShuffledCards(shuffleArray(availableCards));
    }
  }, []);

  const handleAnswerResponse = useCallback((isCorrect: boolean) => {
    const currentCard = shuffledCards[currentCardIndex];
    const result: QuestionResult = {
      card: currentCard,
      isCorrect,
      timestamp: new Date()
    };

    setTotalAnswered(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, result]);
    }

    // Mark this question as completed by finding its original index
    const originalIndex = PTCB_FLASHCARDS.findIndex(card => 
      card.question === currentCard.question && card.answer === currentCard.answer
    );
    if (originalIndex !== -1) {
      setCompletedQuestions(prev => new Set([...prev, originalIndex]));
    }

    // Move to next card after a short delay
    setTimeout(() => {
      setIsFlipped(false);
      setShowAnswer(false);
      
      // Find next available card that hasn't been completed
      let nextIndex = currentCardIndex + 1;
      const availableCards = PTCB_FLASHCARDS.filter((_, index) => !completedQuestions.has(index));
      
      if (nextIndex < shuffledCards.length) {
        setCurrentCardIndex(nextIndex);
      } else {
        // Update shuffled cards to exclude completed questions
        setShuffledCards(shuffleArray(availableCards));
        setCurrentCardIndex(0);
      }
    }, 1000);
  }, [shuffledCards, currentCardIndex]);

  const resetStats = () => {
    setCorrectAnswers(0);
    setTotalAnswered(0);
    setWrongAnswers([]);
    setCompletedQuestions(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  const groupWrongAnswersByCategory = () => {
    const grouped = wrongAnswers.reduce((acc, result) => {
      const category = result.card.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    }, {} as Record<string, QuestionResult[]>);
    return grouped;
  };

  const currentCard = shuffledCards[currentCardIndex];
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  const renderStudyGuide = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-2">PTCB Study Guide</h3>
        <p className="text-slate-600">Comprehensive review of key pharmacy technician concepts</p>
        <p className="text-sm text-slate-500 mt-2">Click on any section to expand and view detailed content</p>
      </div>
      
      {STUDY_SECTIONS.map((section, index) => {
        const isExpanded = expandedSections.has(section.title);
        return (
          <div key={index} className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between"
            >
              <h4 className="text-lg font-semibold text-teal-700">{section.title}</h4>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isExpanded && (
              <div className="px-6 pb-6 space-y-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="bg-slate-50 p-4 rounded-lg">
                    <h5 className="text-md font-semibold text-slate-800 mb-3 border-b border-slate-300 pb-2">
                      {subsection.subtitle}
                    </h5>
                    <ul className="space-y-2">
                      {subsection.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">•</span>
                          <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Study Tips</h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Focus on one section at a time and take notes</li>
          <li>• Use the flash cards to test your knowledge after studying each section</li>
          <li>• Review your wrong answers regularly to identify weak areas</li>
          <li>• Practice calculations daily - they make up a significant portion of the exam</li>
          <li>• Memorize the top 200 drugs with brand/generic names and therapeutic classes</li>
          <li>• Understand the rationale behind pharmacy laws and regulations</li>
        </ul>
      </div>
    </div>
  );

  const renderFlashCards = () => {
    if (shuffledCards.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">All Questions Completed!</h3>
            <p className="text-slate-600 mb-4">You've answered all {PTCB_FLASHCARDS.length} questions.</p>
            <button
              onClick={resetStats}
              className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Start Over
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Practice Questions</h3>
            <p className="text-slate-500">Test your knowledge and track your progress</p>
          </div>
          <div className="text-right">
            <div className="bg-teal-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-teal-700">
                Score: {correctAnswers}/{totalAnswered} ({accuracy}%)
              </p>
              <p className="text-xs text-slate-600">
                Question {currentCardIndex + 1} of {shuffledCards.length} remaining
              </p>
              <p className="text-xs text-slate-500">
                Completed: {completedQuestions.size}/{PTCB_FLASHCARDS.length} total
              </p>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <div
            className={`flip-card w-full h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}
            onClick={() => {
              setIsFlipped(!isFlipped);
              setShowAnswer(true);
            }}
            role="button"
            tabIndex={0}
            aria-live="polite"
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">
                    {currentCard.category}
                  </p>
                  <p className="text-xl font-medium text-slate-800">{currentCard.question}</p>
                  {!showAnswer && (
                    <p className="text-sm text-slate-500 mt-4">Click to reveal answer</p>
                  )}
                </div>
              </div>
              <div className="flip-card-back">
                <div>
                  <p className="text-xl font-medium">{currentCard.answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAnswer && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswerResponse(false)}
              className="bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Incorrect
            </button>
            <button
              onClick={() => handleAnswerResponse(true)}
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Correct
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setIsFlipped(!isFlipped);
              setShowAnswer(true);
            }}
            className="bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-md hover:bg-slate-300 transition duration-300"
          >
            Flip Card
          </button>
          <button
            onClick={resetStats}
            className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Reset Stats
          </button>
        </div>
      </div>
    );
  };

  const renderWrongAnswers = () => {
    const groupedWrong = groupWrongAnswersByCategory();
    const categories = Object.keys(groupedWrong);

    if (wrongAnswers.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Wrong Answers Yet!</h3>
          <p className="text-slate-600">Start practicing with flash cards to see your areas for improvement here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Areas for Improvement</h3>
          <p className="text-slate-600">Review questions you got wrong, organized by category</p>
          <div className="mt-4 bg-red-50 p-3 rounded-lg inline-block">
            <p className="text-red-700 font-semibold">
              Total Wrong: {wrongAnswers.length} questions
            </p>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm">
                {groupedWrong[category].length}
              </span>
              {category}
            </h4>
            <div className="space-y-3">
              {groupedWrong[category].map((result, index) => (
                <div key={index} className="bg-white p-4 rounded border border-red-100">
                  <p className="font-medium text-slate-800 mb-2">
                    Q: {result.card.question}
                  </p>
                  <p className="text-green-700 mb-1">
                    <strong>Answer:</strong> {result.card.answer}
                  </p>
                  <p className="text-xs text-slate-500">
                    Missed on: {result.timestamp.toLocaleDateString()} at{' '}
                    {result.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton setView={setView} />
      
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">PTCB Learning</h2>
          <p className="text-slate-500">Comprehensive study system for pharmacy technician certification</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('study')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'study'
                ? 'border-b-2 border-teal-500 text-teal-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Study Guide
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'flashcards'
                ? 'border-b-2 border-teal-500 text-teal-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Flash Cards
          </button>
          <button
            onClick={() => setActiveTab('wrong')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'wrong'
                ? 'border-b-2 border-teal-500 text-teal-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Review Mistakes
            {wrongAnswers.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {wrongAnswers.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'study' && renderStudyGuide()}
        {activeTab === 'flashcards' && renderFlashCards()}
        {activeTab === 'wrong' && renderWrongAnswers()}
      </div>
    </div>
  );
};

export default PTCBLearning;
