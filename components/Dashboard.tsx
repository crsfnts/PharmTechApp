import React from 'react';
import { View } from '../types';

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const features = [
    {
      title: 'DAYS SUPPLY',
      description: 'Calculate prescription duration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
        </svg>
      ),
      view: View.DaysSupplyCalc,
      color: 'bg-blue-500',
    },
    {
      title: 'HOSPITAL',
      description: 'IV and medication calculations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
        </svg>
      ),
      view: View.HospitalCalculations,
      color: 'bg-teal-500',
    },
    {
      title: 'DRUG LOOKUP',
      description: 'Find drug information',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
      view: View.Glossary,
      color: 'bg-purple-500',
    },
    {
      title: 'PILL ID',
      description: 'Identify medications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5h13.5l-3.841-5.101a2.25 2.25 0 01-.659-1.591V3.104M9.75 3.104c0-.23.167-.438.397-.512a48.11 48.11 0 017.606 0c.23.074.397.283.397.512v5.714a2.25 2.25 0 01-.659 1.591L15 14.25M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5M9.75 3.104v5.714a2.25 2.25 0 00.659 1.591L9 12.5h6m-6 0v6.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-6.75m-6 0h6" />
        </svg>
      ),
      view: View.PillIdentifier,
      color: 'bg-amber-500',
    },
    {
      title: 'SIG CODES',
      description: 'Practice prescription codes',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      view: View.SigGlossary,
      color: 'bg-emerald-500',
    },
    {
      title: 'FLASHCARDS',
      description: 'Study PTCB material',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      view: View.FlashCards,
      color: 'bg-rose-500',
    },
    {
      title: 'INJECTIONS',
      description: 'Administration guide',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      view: View.InjectionGuide,
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Pharm-Assist Tech</h1>
        <p className="text-slate-600">Essential tools for pharmacy technicians</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'DAYS SUPPLY',
            description: 'Calculate prescription duration',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
              </svg>
            ),
            view: View.DaysSupplyCalc,
            color: 'bg-blue-500',
          },
          {
            title: 'HOSPITAL',
            description: 'IV and medication calcs',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
              </svg>
            ),
            view: View.HospitalCalculations,
            color: 'bg-teal-500',
          },
          {
            title: 'DRUG LOOKUP',
            description: 'Find drug information',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            ),
            view: View.Glossary,
            color: 'bg-purple-500',
          },
          {
            title: 'PILL ID',
            description: 'Identify medications',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5h13.5l-3.841-5.101a2.25 2.25 0 01-.659-1.591V3.104M9.75 3.104c0-.23.167-.438.397-.512a48.11 48.11 0 017.606 0c.23.074.397.283.397.512v5.714a2.25 2.25 0 01-.659 1.591L15 14.25M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.25 15.5m0 0l3.841-5.101a2.25 2.25 0 00.659-1.591V3.104" />
              </svg>
            ),
            view: View.PillIdentifier,
            color: 'bg-amber-500',
          },
          {
            title: 'SIG CODES',
            description: 'Practice prescription codes',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            ),
            view: View.SigGlossary,
            color: 'bg-emerald-500',
          },
          {
            title: 'FLASHCARDS',
            description: 'Study PTCB material',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-2.625-4.5h.008v.008M12 12h.008v.008M12 16.5h.008v.008M12 12.75h.008v.008m0 2.25h.008v.008m0-4.5h.008v.008m-3.6 3.6c0 .994.84 1.8 1.875 1.8h7.5c1.036 0 1.875-.806 1.875-1.8v-7.5c0-.994-.84-1.8-1.875-1.8h-7.5c-1.036 0-1.875.806-1.875 1.8v7.5z" />
              </svg>
            ),
            view: View.FlashCards,
            color: 'bg-rose-500',
          },
          {
            title: 'INJECTIONS',
            description: 'Administration guide',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            ),
            view: View.InjectionGuide,
            color: 'bg-indigo-500',
          }
        ].map((feature) => (
          <button
            key={feature.title}
            onClick={() => setView(feature.view)}
            className={`aspect-square flex flex-col items-center justify-center p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${feature.color} text-white hover:opacity-90`}
          >
            <div className="bg-white/20 p-3 rounded-full mb-3">
              {feature.icon}
            </div>
            <h3 className="font-bold text-center text-sm">{feature.title}</h3>
            <p className="text-xs text-white/80 text-center mt-1">{feature.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;