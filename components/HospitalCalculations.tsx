import React from 'react';
import { View } from '../types';
import BackButton from './BackButton';

interface HospitalCalculationsProps {
  setView: (view: View) => void;
}

const HospitalCalculations: React.FC<HospitalCalculationsProps> = ({ setView }) => {
  const features = [
    {
      title: 'IV FLOW RATE',
      description: 'Calculate IV infusion rates and drop rates.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      view: View.IVFlowRate,
    },
    {
      title: 'ALLIGATION',
      description: 'Calculate mixture ratios using the tic-tac-toe method.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 4.996 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      view: View.Alligation,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton setView={setView} />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hospital Calculations</h1>
        <p className="text-slate-600">Select a calculator to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <button
            key={feature.title}
            onClick={() => setView(feature.view)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-teal-100 p-3 rounded-lg text-teal-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{feature.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HospitalCalculations;
