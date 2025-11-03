import React, { useState } from 'react';
import { View } from '../types.ts';

interface PriorAuthHelperProps {
  setView: (view: View) => void;
}

interface DrugCategory {
  name: string;
  commonDrugs: string[];
  requirements: string[];
  tips: string[];
}

const PriorAuthHelper: React.FC<PriorAuthHelperProps> = ({ setView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const drugCategories: DrugCategory[] = [
    {
      name: 'Specialty Medications',
      commonDrugs: ['Humira', 'Enbrel', 'Stelara', 'Dupixent', 'Otezla'],
      requirements: [
        'Medical documentation of diagnosis',
        'Failed trial of preferred alternatives',
        'Specialist consultation notes',
        'Lab results or imaging studies',
      ],
      tips: [
        'Start PA process immediately upon prescription',
        'Typical processing time: 2-7 business days',
        'May require peer-to-peer review with prescriber',
      ],
    },
    {
      name: 'Brand Name vs Generic',
      commonDrugs: ['Synthroid vs Levothyroxine', 'Lipitor vs Atorvastatin', 'Nexium vs Esomeprazole'],
      requirements: [
        'Documentation of allergy to generic formulation',
        'Tried and failed generic with documented issues',
        'Medical necessity letter from prescriber',
        'Inactive ingredient intolerance documentation',
      ],
      tips: [
        'Most plans require generic trial first',
        'Document specific reactions to generic',
        'Include lot numbers if allergy suspected',
      ],
    },
    {
      name: 'High-Cost Medications',
      commonDrugs: ['Eliquis', 'Januvia', 'Lyrica', 'Celebrex', 'Vyvanse'],
      requirements: [
        'Step therapy completion (tried preferred alternatives)',
        'Clinical documentation supporting need',
        'Contraindications to preferred drugs documented',
        'Treatment history and outcomes',
      ],
      tips: [
        'Check formulary for preferred alternatives first',
        'Document reasons why preferred drugs won\'t work',
        'Consider manufacturer copay cards if available',
      ],
    },
    {
      name: 'Controlled Substances',
      commonDrugs: ['Adderall', 'Oxycodone', 'Morphine', 'Fentanyl patches', 'Suboxone'],
      requirements: [
        'Pain management or specialist documentation',
        'Treatment agreement/contract',
        'Previous medication trial documentation',
        'Diagnosis codes supporting need (ICD-10)',
        'Urine drug screening results',
      ],
      tips: [
        'Quantities often strictly limited',
        'May require monthly refills only',
        'Some plans require specialty pharmacy',
      ],
    },
    {
      name: 'Quantity Limits',
      commonDrugs: ['Insulin pens', 'Inhalers', 'ED medications', 'Migraine medications', 'Test strips'],
      requirements: [
        'Medical necessity for higher quantities',
        'Prescriber documentation of need',
        'Diagnosis supporting increased usage',
        'Failed trial at standard dosing',
      ],
      tips: [
        'Vacation overrides may be available',
        '90-day supplies may have different limits',
        'Some plans allow one-time overrides',
      ],
    },
    {
      name: 'Compounded Medications',
      commonDrugs: ['Custom hormone preparations', 'Dermatology compounds', 'Pain creams', 'Pediatric formulations'],
      requirements: [
        'Commercial alternative unavailable or unsuitable',
        'Medical necessity documentation',
        'Allergy to commercial products documented',
        'Specific ingredient list and rationale',
      ],
      tips: [
        'Many plans do not cover compounds',
        'Document why commercial product cannot be used',
        'May need to use specialty compounding pharmacy',
      ],
    },
  ];

  const paProcess = [
    {
      step: '1',
      title: 'Identify PA Requirement',
      description: 'Rejection code 75 indicates prior authorization needed',
      color: 'bg-blue-500',
    },
    {
      step: '2',
      title: 'Gather Information',
      description: 'Collect patient info, prescriber details, medication specifics, and diagnosis codes',
      color: 'bg-purple-500',
    },
    {
      step: '3',
      title: 'Contact Prescriber',
      description: 'Inform prescriber and request necessary clinical documentation',
      color: 'bg-pink-500',
    },
    {
      step: '4',
      title: 'Submit PA Request',
      description: 'Submit via insurance portal, fax, or phone with all required documentation',
      color: 'bg-orange-500',
    },
    {
      step: '5',
      title: 'Follow Up',
      description: 'Track request status and follow up if not processed within expected timeframe',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Prior Authorization Helper</h2>
          <p className="text-neutral-600">Guide for common prior authorization requirements and processes</p>
        </div>

        {/* PA Process Steps */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Prior Authorization Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paProcess.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 p-5 rounded-xl h-full">
                  <div className={`${item.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-3`}>
                    {item.step}
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2 text-sm">{item.title}</h4>
                  <p className="text-xs text-neutral-600">{item.description}</p>
                </div>
                {index < paProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Drug Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Common PA Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drugCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                className={`text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-500 shadow-lg'
                    : 'bg-white border-neutral-200 hover:border-sky-300 hover:shadow-md'
                }`}
              >
                <h4 className="font-bold text-neutral-900 mb-2">{category.name}</h4>
                <p className="text-xs text-neutral-600 mb-2">
                  {category.commonDrugs.slice(0, 3).join(', ')}
                  {category.commonDrugs.length > 3 && '...'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sky-600 font-semibold">
                    {selectedCategory === category.name ? 'Hide Details' : 'View Details'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-sky-600 transition-transform ${
                      selectedCategory === category.name ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Details */}
        {selectedCategory && (
          <div className="mb-8 animate-fade-in">
            {drugCategories
              .filter((cat) => cat.name === selectedCategory)
              .map((category, index) => (
                <div key={index} className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-300 p-6 rounded-xl">
                  <h4 className="text-xl font-bold text-neutral-900 mb-4">{category.name}</h4>

                  <div className="mb-4">
                    <h5 className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Common Medications
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {category.commonDrugs.map((drug, dIndex) => (
                        <span key={dIndex} className="bg-white px-3 py-1 rounded-full text-sm text-neutral-700 border border-sky-200">
                          {drug}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Typical Requirements
                    </h5>
                    <ul className="space-y-2">
                      {category.requirements.map((req, rIndex) => (
                        <li key={rIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                          <span className="text-orange-600 font-bold mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Tips & Best Practices
                    </h5>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tIndex) => (
                        <li key={tIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                          <span className="text-green-600 font-bold mt-1">✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Quick Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl">
            <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Information Typically Needed
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Patient demographics and insurance info
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Prescriber name, NPI, contact information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Medication name, strength, quantity, directions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Diagnosis code (ICD-10) and clinical notes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Previous medication trials and outcomes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                Lab results or supporting documentation
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 p-6 rounded-xl">
            <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Typical Processing Times
            </h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Standard PA:</strong> 72 hours (3 business days)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Expedited PA:</strong> 24 hours (urgent cases)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Appeal:</strong> 30 days for standard appeal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Peer-to-Peer:</strong> May add 1-3 days</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-xs text-red-800">
                <strong>Emergency Override:</strong> If patient needs medication immediately, ask prescriber to call insurance for emergency supply authorization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorAuthHelper;
