import React, { useState } from 'react';
import { View } from '../types';

interface EducationProps {
  setView: (view: View) => void;
}

type IconName = 'cards' | 'calculator' | 'shield' | 'syringe' | 'clipboard' | 'snowflake' | 'external' | 'check' | 'alert' | 'pill';

interface NavItem {
  title: string;
  description: string;
  view: View;
  icon: IconName;
}

const quickAnswers = ['Once daily', 'Twice daily', 'Three times daily'];
const correctAnswer = 'Three times daily';

const todayStudyItems: NavItem[] = [
  {
    title: 'SIG Codes',
    description: '5 min practice',
    view: View.SigGlossary,
    icon: 'cards',
  },
  {
    title: 'Top 200 Drugs',
    description: 'Brand/generic matching',
    view: View.FlashCards,
    icon: 'pill',
  },
  {
    title: 'Pharmacy Math',
    description: 'Quick calculation review',
    view: View.HospitalCalculations,
    icon: 'calculator',
  },
];

const learningTopics: NavItem[] = [
  {
    title: 'SIG Codes',
    description: 'Practice common prescription directions.',
    view: View.SigGlossary,
    icon: 'cards',
  },
  {
    title: 'Top 200 Drugs',
    description: 'Brand/generic matching and common uses.',
    view: View.FlashCards,
    icon: 'pill',
  },
  {
    title: 'Pharmacy Math',
    description: 'Days supply, insulin, ratios, and conversions.',
    view: View.HospitalCalculations,
    icon: 'calculator',
  },
  {
    title: 'Billing & Insurance',
    description: 'Rejections, prior authorizations, and coverage terms.',
    view: View.BillingInsurance,
    icon: 'shield',
  },
  {
    title: 'Law & Safety',
    description: 'Controlled substances, HIPAA, and high-alert meds.',
    view: View.FlashCards,
    icon: 'alert',
  },
  {
    title: 'Injections',
    description: 'Sites, storage, administration, and counseling basics.',
    view: View.InjectionGuide,
    icon: 'syringe',
  },
];

const referenceItems: NavItem[] = [
  {
    title: 'Injection Guide',
    description: 'Sites, technique, storage, and counseling points.',
    view: View.InjectionGuide,
    icon: 'syringe',
  },
  {
    title: 'Insurance Rejections',
    description: 'Common rejection codes and what they mean.',
    view: View.BillingInsurance,
    icon: 'shield',
  },
  {
    title: 'Prior Authorization Helper',
    description: 'Common documentation prompts and PA categories.',
    view: View.PriorAuthHelper,
    icon: 'clipboard',
  },
  {
    title: 'Common SIG Codes',
    description: 'Fast searchable abbreviation reference.',
    view: View.SigGlossary,
    icon: 'cards',
  },
  {
    title: 'Storage Requirements',
    description: 'Fridge, room temp, beyond-use, and handling notes.',
    view: View.InjectionGuide,
    icon: 'snowflake',
  },
];

// Live CE scraping should not be added unless the provider permits it or offers an official API/feed.
const ceProviders = [
  {
    name: 'PTCB CE Directory',
    description: 'Find ACPE-accredited continuing education for pharmacy technicians.',
    url: 'https://ptcb.org/ce-directory/',
    category: 'Directory',
    trusted: true,
  },
  {
    name: 'PowerPak Pharmacy Technician CE',
    description: 'Pharmacy technician continuing education courses and certificates.',
    url: 'https://www.powerpak.com/courses/pharmacy-technicians',
    category: 'Technician CE',
    trusted: true,
  },
  {
    name: 'Pharmacy Times Continuing Education',
    description: 'Pharmacy CE articles, webinars, and learning resources.',
    url: 'https://www.pharmacytimes.org/',
    category: 'Pharmacy CE',
    trusted: true,
  },
  {
    name: 'NPTA Continuing Education',
    description: 'Technician-focused CE and career resources.',
    url: 'https://cpht.org/continuing-education/',
    category: 'Technician CE',
    trusted: true,
  },
];

const iconClass = 'h-5 w-5';

const ToolIcon = ({ icon }: { icon: IconName }) => {
  if (icon === 'shield') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 5.25 6v5.25c0 4.2 2.7 7.91 6.75 9 4.05-1.09 6.75-4.8 6.75-9V6L12 3.75Z" />
      </svg>
    );
  }

  if (icon === 'syringe') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5.75-.75m-3 3 3-3 1.5 1.5-3 3m-1.5-1.5L6.75 16.5l-1.5 3.75L9 18.75 19.5 8.25l-3-3Z" />
      </svg>
    );
  }

  if (icon === 'calculator') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75h10.5A2.25 2.25 0 0 1 19.5 6v12a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V6a2.25 2.25 0 0 1 2.25-2.25Zm2.25 4.5h6m-6 4.5h.01m3 0h.01m3 0h.01m-6 3h.01m3 0h.01m3 0h.01" />
      </svg>
    );
  }

  if (icon === 'clipboard') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5h6m-7.5 3h9A1.5 1.5 0 0 1 18 9v9.75a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.75V9a1.5 1.5 0 0 1 1.5-1.5Zm2.25-3h4.5v4.5h-4.5V4.5Zm-.75 8.25h6m-6 3h6m-6 3h3" />
      </svg>
    );
  }

  if (icon === 'snowflake') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-9 6.25-3.6M12 12 5.75 8.4M12 12l6.25 3.6M12 12l-6.25 3.6M8.25 5.25 12 7.5l3.75-2.25M8.25 18.75 12 16.5l3.75 2.25" />
      </svg>
    );
  }

  if (icon === 'external') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18v4.5M18 6l-7.5 7.5M7.5 7.5H6A1.5 1.5 0 0 0 4.5 9v9A1.5 1.5 0 0 0 6 19.5h9A1.5 1.5 0 0 0 16.5 18v-1.5" />
      </svg>
    );
  }

  if (icon === 'check') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 4.5 4.5 10.5-10.5" />
      </svg>
    );
  }

  if (icon === 'alert') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v4.5m0 3h.01M10.3 4.7 3.6 18a1.5 1.5 0 0 0 1.34 2.17h14.12A1.5 1.5 0 0 0 20.4 18L13.7 4.7a1.5 1.5 0 0 0-2.68 0Z" />
      </svg>
    );
  }

  if (icon === 'pill') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21a6 6 0 0 1-4.24-10.24l4.5-4.5a6 6 0 1 1 8.48 8.48l-4.5 4.5A5.98 5.98 0 0 1 10.5 21Zm-1.24-11.24 4.98 4.98" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75A8.25 8.25 0 0 0 5.25 3.5C4.45 3.5 3.69 3.62 3 3.85v14.5c.7-.23 1.45-.35 2.25-.35A8.25 8.25 0 0 1 12 21.25m0-14.5a8.25 8.25 0 0 1 6.75-3.25c.8 0 1.56.12 2.25.35v14.5a7.21 7.21 0 0 0-2.25-.35A8.25 8.25 0 0 0 12 21.25m0-14.5v14.5" />
    </svg>
  );
};

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
  </svg>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-3">
    <h2 className="text-base font-semibold text-slate-950">{title}</h2>
    {subtitle && <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>}
  </div>
);

const QuickFlashcardCard: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-700 p-5 text-white shadow-lg shadow-indigo-500/25">
      <div className="absolute right-4 top-4 h-20 w-16 rotate-6 rounded-2xl bg-white/12 ring-1 ring-white/20" />
      <div className="absolute right-9 top-10 h-20 w-16 -rotate-3 rounded-2xl bg-white/18 ring-1 ring-white/25" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15">
            <ToolIcon icon="cards" />
            Quick Practice
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/15">
            12 left
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-4 text-slate-950 shadow-xl shadow-indigo-950/10">
          <p className="text-sm font-semibold text-indigo-700">SIG Code Review</p>
          <p className="mt-3 text-xl font-bold leading-7">What does "TID" mean?</p>

          <div className="mt-4 space-y-2">
            {quickAnswers.map(answer => {
              const selected = selectedAnswer === answer;
              const answerIsCorrect = answer === correctAnswer;
              const selectedClass = selected
                ? answerIsCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200'
                  : 'border-rose-300 bg-rose-50 text-rose-800 ring-2 ring-rose-200'
                : 'border-slate-200 bg-slate-50 text-slate-700';

              return (
                <button
                  key={answer}
                  onClick={() => setSelectedAnswer(answer)}
                  className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${selectedClass}`}
                >
                  <span>{answer}</span>
                  {selected && <ToolIcon icon={answerIsCorrect ? 'check' : 'alert'} />}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
              {isCorrect ? 'Correct!' : 'Not quite - TID means three times daily.'}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-white/85">
          <span>12 cards left today</span>
          {selectedAnswer && (
            <button onClick={() => setSelectedAnswer(null)} className="font-semibold text-white underline decoration-white/40 underline-offset-4">
              Reset
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <button
            onClick={onStart}
            className="min-h-12 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
          >
            Start practice
          </button>
          <button
            onClick={onStart}
            className="min-h-12 rounded-2xl px-3 py-3 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 sm:text-right"
          >
            Open full flashcard trainer
          </button>
        </div>
      </div>
    </section>
  );
};

const TodayStudyCard: React.FC<NavItem & { onClick: (view: View) => void }> = ({ title, description, view, icon, onClick }) => (
  <button
    onClick={() => onClick(view)}
    className="flex w-[176px] shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40 sm:w-full"
  >
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
      <ToolIcon icon={icon} />
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-semibold text-slate-950">{title}</span>
      <span className="mt-1 block text-sm leading-5 text-slate-500">{description}</span>
    </span>
  </button>
);

const LearningTopicCard: React.FC<NavItem & { onClick: (view: View) => void }> = ({ title, description, view, icon, onClick }) => (
  <button
    onClick={() => onClick(view)}
    className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
  >
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
      <ToolIcon icon={icon} />
    </span>
    <span className="mt-3 block text-base font-semibold text-slate-950">{title}</span>
    <span className="mt-1 block text-sm leading-6 text-slate-500">{description}</span>
  </button>
);

const ReferenceCard: React.FC<NavItem & { onClick: (view: View) => void }> = ({ title, description, view, icon, onClick }) => (
  <button
    onClick={() => onClick(view)}
    className="flex min-h-20 w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
  >
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600">
      <ToolIcon icon={icon} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-semibold text-slate-950">{title}</span>
      <span className="mt-1 block text-sm leading-5 text-slate-500">{description}</span>
    </span>
    <ChevronIcon />
  </button>
);

const CEProviderCard: React.FC<(typeof ceProviders)[number]> = ({ name, description, url, category, trusted }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold leading-6 text-slate-950">{name}</h3>
          {trusted && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Trusted
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
        {category}
      </span>
    </div>
    <button
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-700 sm:w-auto"
    >
      Open provider
      <ToolIcon icon="external" />
    </button>
  </article>
);

const Education: React.FC<EducationProps> = ({ setView }) => {
  return (
    <div className="mx-auto w-full max-w-md px-5 py-5 md:max-w-2xl">
      <section className="mb-6">
        <p className="text-3xl font-semibold tracking-normal text-slate-950">Education</p>
        <p className="mt-2 text-base leading-7 text-slate-600">
          Learn pharmacy faster, one small lesson at a time.
        </p>
      </section>

      <QuickFlashcardCard onStart={() => setView(View.FlashCards)} />

      <section className="mt-8">
        <SectionHeader title="Today's Study" />
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {todayStudyItems.map(item => (
            <TodayStudyCard key={item.title} {...item} onClick={setView} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Learn by Topic" />
        <div className="grid gap-3 sm:grid-cols-2">
          {learningTopics.map(topic => (
            <LearningTopicCard key={topic.title} {...topic} onClick={setView} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader title="Reference at work" />
        <div className="space-y-3">
          {referenceItems.map(item => (
            <ReferenceCard key={item.title} {...item} onClick={setView} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeader
          title="Trusted CE Resources"
          subtitle="Trusted CE resources for pharmacy technicians. Always confirm your state, employer, and PTCB renewal requirements before completing a course."
        />
        <div className="space-y-3">
          {ceProviders.map(provider => (
            <CEProviderCard key={provider.name} {...provider} />
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
          rxmate links to trusted CE resources only. Always verify that a course meets your renewal requirements before completing it.
        </p>
      </section>
    </div>
  );
};

export default Education;
