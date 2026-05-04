import React, { useMemo } from 'react';
import { View } from '../types';
import { AppPage } from './AppLayout';

interface DashboardProps {
  setView: (view: View) => void;
}

type IconName = 'calculator' | 'search' | 'cards' | 'clipboard' | 'syringe' | 'book' | 'inhaler';

type DashboardAction = {
  title: string;
  subtitle: string;
  icon: IconName;
  tone: string;
  view: View;
};

type RecentItem = {
  title: string;
  time: string;
  icon: IconName;
  tone: string;
  view: View;
};

const ToolIcon = ({ icon, className = 'h-5 w-5' }: { icon: IconName; className?: string }) => {
  if (icon === 'search') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.04 6.04a7.5 7.5 0 0 0 10.61 10.61Z" />
      </svg>
    );
  }

  if (icon === 'cards') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 5.25h9A2.25 2.25 0 0 1 18.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-9A2.25 2.25 0 0 1 5.25 16.5v-9A2.25 2.25 0 0 1 7.5 5.25Zm2.25 3h4.5m-4.5 3h4.5m-4.5 3h2.25M3.75 8.25v9A3.75 3.75 0 0 0 7.5 21h9" />
      </svg>
    );
  }

  if (icon === 'clipboard') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25h6m-6 0A2.25 2.25 0 0 1 11.25 3h1.5A2.25 2.25 0 0 1 15 5.25m-6 0H7.5A2.25 2.25 0 0 0 5.25 7.5v11.25A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V7.5a2.25 2.25 0 0 0-2.25-2.25H15M8.25 11.25h7.5M8.25 15h4.5" />
      </svg>
    );
  }

  if (icon === 'syringe') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5.75-.75m-3 3 3-3 1.5 1.5-3 3m-1.5-1.5L6.75 16.5l-1.5 3.75L9 18.75 19.5 8.25l-3-3Zm-6 6 3 3m-5.25 2.25 3 3" />
      </svg>
    );
  }

  if (icon === 'book') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A8.25 8.25 0 0 0 5.25 3.5C4.45 3.5 3.69 3.62 3 3.85v14.5c.7-.23 1.45-.35 2.25-.35A8.25 8.25 0 0 1 12 21.25m0-14.5a8.25 8.25 0 0 1 6.75-3.25c.8 0 1.56.12 2.25.35v14.5a7.21 7.21 0 0 0-2.25-.35A8.25 8.25 0 0 0 12 21.25m0-14.5v14.5" />
      </svg>
    );
  }

  if (icon === 'inhaler') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5v4.25a3.75 3.75 0 0 1-7.5 0V4.5Zm1.5 8.25h4.5v6.75a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5v-6.75Zm-2.25 6h9" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Zm2.25 4.5h6m-6 4.5h.01m3 0h.01m3 0h.01m-6 3h.01m3 0h.01m3 0h.01" />
    </svg>
  );
};

const SectionHeader: React.FC<{ title: string; action?: string; onAction?: () => void }> = ({ title, action, onAction }) => (
  <div className="mb-3 flex items-center justify-between">
    <h2 className="text-base font-bold text-slate-950">{title}</h2>
    {action && (
      <button onClick={onAction} className="text-xs font-semibold text-slate-500">
        {action}
      </button>
    )}
  </div>
);

const QuickActionCard: React.FC<DashboardAction & { onClick: () => void }> = ({ title, subtitle, icon, tone, onClick }) => (
  <button
    onClick={onClick}
    className="min-h-[122px] rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition active:scale-[0.99]"
    aria-label={title}
  >
    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}>
      <ToolIcon icon={icon} />
    </span>
    <span className="mt-4 block text-sm font-bold leading-5 text-slate-950">{title}</span>
    <span className="mt-1 block text-xs leading-5 text-slate-500">{subtitle}</span>
  </button>
);

const RecentItemRow: React.FC<RecentItem & { onClick: () => void }> = ({ title, time, icon, tone, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-2xl bg-white px-3 py-3 text-left transition active:scale-[0.99]"
  >
    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
      <ToolIcon icon={icon} className="h-4 w-4" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-semibold text-slate-950">{title}</span>
    </span>
    <span className="shrink-0 text-xs font-medium text-slate-500">{time}</span>
  </button>
);

const ContinueLearningCard: React.FC<{ onResume: () => void }> = ({ onResume }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-600">12 flashcards left today</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
            <ToolIcon icon="cards" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950">Top 200 Drugs</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[40%] rounded-full bg-indigo-600" />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onResume}
        className="shrink-0 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-indigo-700 ring-1 ring-slate-200"
      >
        Resume
      </button>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! ☀️';
    if (hour < 17) return 'Good afternoon! ☀️';
    return 'Good evening! ✨';
  }, []);

  const quickActions: DashboardAction[] = [
    {
      title: 'Calculate Days Supply',
      subtitle: 'Oral, inhaler, injectable',
      icon: 'calculator',
      tone: 'bg-indigo-50 text-indigo-700',
      view: View.HospitalCalculations,
    },
    {
      title: 'Drug Lookup',
      subtitle: 'Brand, generic, class',
      icon: 'search',
      tone: 'bg-sky-50 text-sky-700',
      view: View.Glossary,
    },
    {
      title: 'Practice Flashcards',
      subtitle: 'SIG codes, drugs, PTCB prep',
      icon: 'cards',
      tone: 'bg-violet-50 text-violet-700',
      view: View.FlashCards,
    },
    {
      title: 'Reference at Work',
      subtitle: 'Insurance, injections, SIGs',
      icon: 'clipboard',
      tone: 'bg-emerald-50 text-emerald-700',
      view: View.Education,
    },
  ];

  const recentItems: RecentItem[] = [
    {
      title: 'Injectable Days Supply',
      time: 'Just now',
      icon: 'syringe',
      tone: 'bg-emerald-50 text-emerald-700',
      view: View.DaysSupplyInjectable,
    },
    {
      title: 'SIG Code Review',
      time: '12m ago',
      icon: 'book',
      tone: 'bg-violet-50 text-violet-700',
      view: View.SigGlossary,
    },
    {
      title: 'Inhaler Days Supply',
      time: '1h ago',
      icon: 'inhaler',
      tone: 'bg-sky-50 text-sky-700',
      view: View.DaysSupplyInhaler,
    },
  ];

  return (
    <AppPage>
      <section className="mb-5">
        <h1 className="text-xl font-bold tracking-normal text-slate-950">{greeting}</h1>
        <p className="mt-1 text-sm leading-6 text-slate-500">What do you need help with today?</p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {quickActions.map(action => (
          <QuickActionCard
            key={action.title}
            {...action}
            onClick={() => setView(action.view)}
          />
        ))}
      </section>

      <section className="mt-7">
        <SectionHeader title="Recently Used" action="See all" onAction={() => setView(View.HospitalCalculations)} />
        <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white p-1 shadow-sm">
          {recentItems.map(item => (
            <RecentItemRow
              key={item.title}
              {...item}
              onClick={() => setView(item.view)}
            />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <SectionHeader title="Continue Learning" />
        <ContinueLearningCard onResume={() => setView(View.FlashCards)} />
      </section>

      <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
        rxmate helps pharmacy technicians work smarter, learn faster, and feel confident every day.
      </p>
    </AppPage>
  );
};

export default Dashboard;
