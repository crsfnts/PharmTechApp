import React from 'react';
import { View } from '../types';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
  setView: (view: View) => void;
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}> = ({ title, description, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-transparent hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]`}
  >
    {/* Gradient Background Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

    {/* Content */}
    <div className="relative p-6 flex flex-col items-center justify-center min-h-[200px]">
      {/* Icon Container */}
      <div className={`flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <div className="text-white">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-center text-sm text-neutral-900 group-hover:text-white transition-colors duration-300 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-neutral-600 group-hover:text-white/90 text-center transition-colors duration-300">
        {description}
      </p>

      {/* Arrow Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const features = [
    {
      title: 'DAYS SUPPLY',
      description: 'Calculate prescription duration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
        </svg>
      ),
      view: View.DaysSupplyCalc,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'HOSPITAL',
      description: 'IV and medication calculations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
      ),
      view: View.HospitalCalculations,
      color: 'from-teal-500 to-emerald-600',
    },
    {
      title: 'DRUG LOOKUP',
      description: 'Find drug information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      view: View.Glossary,
      color: 'from-violet-500 to-purple-600',
    },
    {
      title: 'PILL ID',
      description: 'Identify medications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5h13.5l-3.841-5.101a2.25 2.25 0 01-.659-1.591V3.104M9.75 3.104c0-.23.167-.438.397-.512a48.11 48.11 0 017.606 0c.23.074.397.283.397.512v5.714a2.25 2.25 0 01-.659 1.591L15 14.25M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5M9.75 3.104v5.714a2.25 2.25 0 00.659 1.591L9 12.5h6m-6 0v6.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-6.75m-6 0h6" />
        </svg>
      ),
      view: View.PillIdentifier,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'SIG CODES',
      description: 'Practice prescription codes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      view: View.SigGlossary,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'FLASHCARDS',
      description: 'Study PTCB material',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      view: View.FlashCards,
      color: 'from-rose-500 to-pink-600',
    },
    {
      title: 'INJECTIONS',
      description: 'Administration guide',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      view: View.InjectionGuide,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const { primaryColor, textColor } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            Professional Edition
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
            7 Tools Available
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-3 leading-tight">
          Welcome to RxMate
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl">
          Your comprehensive suite of professional tools and learning resources designed for pharmacy technicians.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-fade-in"
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              onClick={() => setView(feature.view)}
            />
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">Professional Disclaimer</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              All calculations and information provided should be verified by a licensed pharmacist before use. This tool is designed to assist pharmacy technicians in their daily workflow and learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;