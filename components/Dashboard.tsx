
import React from 'react';
import { View } from '../types.ts';

interface DashboardProps {
  setView: (view: View) => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col items-start justify-between"
  >
    <div>
      <div className="bg-teal-100 text-teal-600 rounded-full p-3 w-12 h-12 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-1 text-sm">{description}</p>
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const features = [
    {
      title: 'DAYS SUPPLY CALCULATOR',
      description: 'Calculate supply duration for a prescription.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg>,
      view: View.DaysSupplyCalc,
    },
    {
      title: 'GLOSSARY',
      description: 'Quickly look up drug details using AI.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
      view: View.Glossary,
    },
    {
      title: 'PILL IDENTIFIER',
      description: 'Identify pills by shape, color, and imprint.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>,
      view: View.Counter,
    },
    {
      title: 'SIG GL',
      description: 'A quick reference for common Sig codes.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0v14.25" /></svg>,
      view: View.SigGlossary,
    },
     {
      title: 'PTCB LEARNING',
      description: 'Complete study system with guides, practice, and progress tracking.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443a55.381 55.381 0 015.25 2.882V15" /></svg>,
      view: View.FlashCards,
    },
    {
      title: 'INJECTION GUIDE',
      description: 'Reference guide for injection sites and techniques.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c.352.352.352.922 0 1.274l-1.402 1.402M5 14.5l-1.757.954A1.5 1.5 0 002 17.5v1.25c0 .828.672 1.5 1.5 1.5h1.25c.413 0 .787-.168 1.06-.44l2.44-2.44M5 14.5l2.44 2.44" /></svg>,
      view: View.InjectionGuide,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Tools & Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            onClick={() => setView(feature.view)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;