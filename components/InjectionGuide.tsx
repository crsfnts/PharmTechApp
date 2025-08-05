
import React, { useState } from 'react';
import { View } from '../types';
import BackButton from './BackButton';

interface InjectionGuideProps {
  setView: (view: View) => void;
}

interface InjectionSite {
  name: string;
  description: string;
  landmarks: string[];
  maxVolume: string;
  needleGauge: string;
  needleLength: string;
  angle: string;
  precautions: string[];
}

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

const INJECTION_SITES: InjectionSite[] = [
  {
    name: "Deltoid (Upper Arm)",
    description: "Most common site for vaccines and small volume injections",
    landmarks: ["Acromion process", "Lower edge of deltoid muscle", "2-3 finger widths below acromion"],
    maxVolume: "1 mL (adults), 0.5 mL (pediatric)",
    needleGauge: "22-25 gauge",
    needleLength: "1-1.5 inches (adults), 5/8-1 inch (pediatric)",
    angle: "90 degrees",
    precautions: ["Avoid radial nerve", "Check for adequate muscle mass", "Rotate sites for multiple injections"]
  },
  {
    name: "Vastus Lateralis (Thigh)",
    description: "Preferred site for infants and when larger volumes are needed",
    landmarks: ["Middle third of thigh", "Lateral aspect", "Between greater trochanter and knee"],
    maxVolume: "2 mL (adults), 1 mL (pediatric)",
    needleGauge: "22-25 gauge",
    needleLength: "1-1.5 inches (adults), 5/8-1 inch (pediatric)",
    angle: "90 degrees",
    precautions: ["Large muscle mass", "Good for pediatric patients", "Avoid medial area"]
  },
  {
    name: "Ventrogluteal (Hip)",
    description: "Safest site for adults, good for larger volumes",
    landmarks: ["Anterior superior iliac spine", "Iliac crest", "Palm on greater trochanter"],
    maxVolume: "3 mL (adults)",
    needleGauge: "20-23 gauge",
    needleLength: "1.5-3 inches (depending on body habitus)",
    angle: "90 degrees",
    precautions: ["Away from major nerves and vessels", "Good for viscous medications", "Not recommended for children under 3"]
  },
  {
    name: "Dorsogluteal (Upper Buttock)",
    description: "Traditional site, but higher risk of complications",
    landmarks: ["Upper outer quadrant", "Above imaginary line from PSIS to greater trochanter"],
    maxVolume: "3 mL (adults)",
    needleGauge: "20-23 gauge",
    needleLength: "1.5-3 inches",
    angle: "90 degrees",
    precautions: ["Risk of sciatic nerve injury", "Avoid in children", "Use ventrogluteal instead when possible"]
  }
];

const INJECTION_CHECKLIST: ChecklistItem[] = [
  // Pre-Administration
  { id: "step-1", text: "Verify patient identity, order, allergies, and medication (5 Rights)", category: "Pre-Administration" },
  { id: "step-2", text: "Perform hand hygiene and gather supplies", category: "Pre-Administration" },
  
  // Preparation
  { id: "step-3", text: "Prepare medication using aseptic technique and verify dosage", category: "Medication Preparation" },
  { id: "step-4", text: "Select appropriate needle/syringe and remove air bubbles", category: "Medication Preparation" },
  
  // Patient Preparation
  { id: "step-5", text: "Explain procedure, obtain consent, and position patient", category: "Patient Preparation" },
  { id: "step-6", text: "Locate injection site landmarks and assess for contraindications", category: "Patient Preparation" },
  
  // Administration
  { id: "step-7", text: "Don gloves, clean injection site, and allow to dry", category: "Administration" },
  { id: "step-8", text: "Insert needle at 90°, inject slowly, wait 10 seconds, then withdraw", category: "Administration" },
  
  // Post-Administration
  { id: "step-9", text: "Dispose of sharps safely and apply pressure/bandage", category: "Post-Administration" },
  { id: "step-10", text: "Monitor patient for reactions and document administration", category: "Post-Administration" },
];

const InjectionGuide: React.FC<InjectionGuideProps> = ({ setView }) => {
  const [selectedSite, setSelectedSite] = useState<InjectionSite | null>(null);
  const [activeTab, setActiveTab] = useState<'sites' | 'techniques' | 'checklist'>('sites');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleChecklistItem = (itemId: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const resetChecklist = () => {
    setCompletedItems(new Set());
  };

  const groupedChecklist = INJECTION_CHECKLIST.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const completedCount = completedItems.size;
  const totalCount = INJECTION_CHECKLIST.length;

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton setView={setView} />
      
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Injection Guide</h2>
          <p className="text-slate-500">Reference for intramuscular injection sites, techniques, and procedures</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('sites')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'sites'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Injection Sites
          </button>
          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'techniques'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Key Points
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'checklist'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Procedure Checklist
          </button>
        </div>

        {activeTab === 'sites' && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {INJECTION_SITES.map((site, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSite(selectedSite?.name === site.name ? null : site)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSite?.name === site.name
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="font-semibold text-slate-800">{site.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{site.description}</p>
                </button>
              ))}
            </div>

            {selectedSite && (
              <div className="bg-slate-50 p-6 rounded-lg animate-fade-in">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{selectedSite.name}</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Landmarks</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {selectedSite.landmarks.map((landmark, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {landmark}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Specifications</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p><strong>Max Volume:</strong> {selectedSite.maxVolume}</p>
                      <p><strong>Needle Gauge:</strong> {selectedSite.needleGauge}</p>
                      <p><strong>Needle Length:</strong> {selectedSite.needleLength}</p>
                      <p><strong>Injection Angle:</strong> {selectedSite.angle}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-slate-700 mb-2">Precautions</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {selectedSite.precautions.map((precaution, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {precaution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'techniques' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Five Rights of Medication Administration</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• <strong>Right Patient:</strong> Use two identifiers (name, DOB, MRN)</li>
                  <li>• <strong>Right Drug:</strong> Verify medication name and formulation</li>
                  <li>• <strong>Right Dose:</strong> Confirm correct strength and amount</li>
                  <li>• <strong>Right Route:</strong> Ensure proper administration method</li>
                  <li>• <strong>Right Time:</strong> Administer at prescribed intervals</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Infection Control Principles</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Perform hand hygiene before and after procedure</li>
                  <li>• Use aseptic technique throughout</li>
                  <li>• Never touch needle or injection site after cleaning</li>
                  <li>• Single-use needles and syringes only</li>
                  <li>• Proper disposal in sharps containers</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3">Documentation Requirements</h3>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Date and time of administration</li>
                  <li>• Medication name, dose, and lot number</li>
                  <li>• Route and injection site used</li>
                  <li>• Patient's response to injection</li>
                  <li>• Signature and credentials of administrator</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Emergency Preparedness</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Know location of emergency medications</li>
                  <li>• Understand anaphylaxis signs and symptoms</li>
                  <li>• Have emergency contact numbers readily available</li>
                  <li>• Monitor patient for 15-30 minutes post-injection</li>
                  <li>• Know when to activate emergency response</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Critical Safety Reminders</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Always follow your institution's policies and procedures</li>
                <li>• Never leave medications unattended</li>
                <li>• Double-check calculations with another qualified person</li>
                <li>• Report all adverse events immediately</li>
                <li>• Maintain professional competency through continuing education</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Injection Procedure Checklist</h3>
                <p className="text-sm text-slate-600">
                  Progress: {completedCount}/{totalCount} completed ({Math.round((completedCount/totalCount) * 100)}%)
                </p>
              </div>
              <button
                onClick={resetChecklist}
                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                Reset All
              </button>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount/totalCount) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedChecklist).map(([category, items]) => (
                <div key={category} className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-3">{category}</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`flex items-start p-3 rounded-lg border-2 transition-all text-left w-full ${
                          completedItems.has(item.id)
                            ? 'border-green-400 bg-green-50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          completedItems.has(item.id)
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300'
                        }`}>
                          {completedItems.has(item.id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${
                          completedItems.has(item.id)
                            ? 'line-through text-slate-500'
                            : 'text-slate-700'
                        }`}>
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InjectionGuide;
