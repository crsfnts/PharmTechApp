import React from 'react';

export const pageShellClass = 'mx-auto w-full max-w-md px-5 py-5 pb-32 md:max-w-2xl md:px-6';
export const pageTitleClass = 'text-3xl font-semibold tracking-normal text-slate-950';
export const pageSubtitleClass = 'mt-2 text-base leading-7 text-slate-600';
export const cardClass = 'rounded-3xl border border-slate-200 bg-white p-4 shadow-sm';
export const inputClass = 'h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-100 disabled:text-slate-400';
export const primaryButtonClass = 'h-14 w-full rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:shadow-none';
export const secondaryButtonClass = 'h-14 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 shadow-sm transition active:scale-[0.99]';

export const AppPage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`${pageShellClass} ${className}`}>{children}</div>
);

export const PageHeader: React.FC<{ title: string; subtitle?: string; className?: string }> = ({ title, subtitle, className = '' }) => (
  <section className={`mb-6 ${className}`}>
    <h1 className={pageTitleClass}>{title}</h1>
    {subtitle && <p className={pageSubtitleClass}>{subtitle}</p>}
  </section>
);

export const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <section className={`${cardClass} ${className}`}>{children}</section>
);

export const SectionLabel: React.FC<{ children: React.ReactNode; helper?: string }> = ({ children, helper }) => (
  <div className="mb-3">
    <p className="text-sm font-semibold text-slate-900">{children}</p>
    {helper && <p className="mt-1 text-sm leading-6 text-slate-500">{helper}</p>}
  </div>
);
