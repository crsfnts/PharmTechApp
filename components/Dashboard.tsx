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
    className={`group relative w-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-neutral-200 hover:border-transparent hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] active:translate-y-0`}
    style={{
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }}
  >
    {/* Gradient Background Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

    {/* Subtle Pattern Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
      backgroundSize: '24px 24px'
    }} />

    {/* Content */}
    <div className="relative p-6 flex flex-col items-center justify-center min-h-[200px]">
      {/* Icon Container */}
      <div className={`flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br ${color} shadow-lg mb-4 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:rotate-6 group-hover:shadow-2xl`}>
        <div className="text-white transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-center text-sm text-neutral-900 group-hover:text-white transition-colors duration-300 mb-2 tracking-wide">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-neutral-600 group-hover:text-white/95 text-center transition-colors duration-300 leading-relaxed">
        {description}
      </p>

      {/* Arrow Indicator with enhanced animation */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-x-3 group-hover:translate-x-0 scale-75 group-hover:scale-100">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-full blur-md scale-150 animate-pulse" />
        </div>
      </div>

      {/* Top corner accent */}
      <div className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <div className="w-full h-full border-t-2 border-l-2 border-white rounded-tl-lg" />
      </div>
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const calculationFeatures = [
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          {/* Hospital Building Icon */}
          <path d="M12 2L3 6v4h18V6l-9-4z" opacity="0.9"/>
          <path d="M3 10v11h6v-5h6v5h6V10H3zm9 7h-2v-2h2v2zm0-3h-2v-2h2v2zm4 3h-2v-2h2v2zm0-3h-2v-2h2v2zm-8 3H6v-2h2v2zm0-3H6v-2h2v2z"/>
          {/* Medical Cross */}
          <rect x="10.5" y="3.5" width="3" height="2.5" fill="white"/>
          <rect x="9" y="5" width="6" height="1" fill="white"/>
        </svg>
      ),
      view: View.HospitalCalculations,
      color: 'from-teal-500 to-emerald-600',
    },
  ];

  const learningFeatures = [
    {
      title: 'SIG CODES',
      description: 'Practice prescription codes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          {/* Prescription Pad with Rx Symbol */}
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" opacity="0.9"/>
          <path d="M7.5 8h9v1.5h-9V8zm0 3h9v1.5h-9V11z" fill="white" opacity="0.7"/>
          {/* Stylized Rx */}
          <path d="M7 15h3v-1h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H10v1h1.5l1.5 2h1.5l-1.5-2c.83 0 1.5-.67 1.5-1.5V16c0-1.1-.9-2-2-2H9v-1H7v2z" fill="white"/>
          <path d="M8 17l-1 2h1.2l.8-2z" fill="white"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          {/* Professional Syringe Icon */}
          <path d="M20.5 3.5l-2-2-2.5 2.5-1.5-1.5-1 1L15 5l-9 9c-.6.6-1 1.4-1 2.2V19c0 1.1.9 2 2 2h2.8c.8 0 1.6-.4 2.2-1l9-9 1.5 1.5 1-1-1.5-1.5 2.5-2.5zm-5 5L8 16H7v-1l7.5-7.5 1 1z" opacity="0.95"/>
          {/* Plunger detail */}
          <rect x="16" y="4" width="1.5" height="4" transform="rotate(45 16.75 6)" fill="white" opacity="0.6"/>
          {/* Measurement marks */}
          <rect x="10" y="12" width="0.8" height="1.5" transform="rotate(45 10.4 12.75)" fill="white" opacity="0.5"/>
          <rect x="11.5" y="13.5" width="0.8" height="1.5" transform="rotate(45 11.9 14.25)" fill="white" opacity="0.5"/>
        </svg>
      ),
      view: View.InjectionGuide,
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const features = [
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          {/* Modern Pill/Capsule Icon */}
          <ellipse cx="12" cy="12" rx="9" ry="6.5" transform="rotate(45 12 12)" opacity="0.95"/>
          {/* Pill dividing line */}
          <path d="M6.3 6.3L17.7 17.7" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
          {/* Detail dots on one half */}
          <circle cx="9" cy="9" r="1" fill="white" opacity="0.7"/>
          <circle cx="10.5" cy="11.2" r="0.8" fill="white" opacity="0.6"/>
          {/* Detail marks on other half */}
          <rect x="13" y="13.5" width="2" height="0.8" transform="rotate(45 14 14)" fill="white" opacity="0.6"/>
          <rect x="14.5" y="15" width="1.5" height="0.8" transform="rotate(45 15.25 15.4)" fill="white" opacity="0.5"/>
        </svg>
      ),
      view: View.PillIdentifier,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'BILLING & INSURANCE',
      description: 'Insurance tools & resources',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      ),
      view: View.BillingInsurance,
      color: 'from-green-500 to-green-600',
    },
  ];

  const { primaryColor, textColor } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3 animate-fade-in" style={{ animationDelay: '0ms' }}>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            Professional Edition
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            8 Tools Available
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-3 leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
          Welcome to RxMate
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
          Your comprehensive suite of professional tools and learning resources designed for pharmacy technicians.
        </p>
      </div>

      {/* Calculations Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          Calculations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {calculationFeatures.map((feature, index) => (
            <div
              key={feature.title}
              style={{ animationDelay: `${350 + index * 80}ms` }}
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
      </div>

      {/* Learning Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningFeatures.map((feature, index) => (
            <div
              key={feature.title}
              style={{ animationDelay: `${550 + index * 80}ms` }}
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
      </div>

      {/* Tools & Resources Section */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          Tools & Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              style={{ animationDelay: `${750 + index * 80}ms` }}
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
      </div>

      {/* Info Section */}
      <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '900ms' }}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
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