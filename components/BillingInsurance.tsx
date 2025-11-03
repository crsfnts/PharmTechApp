import React, { useState } from 'react';
import { View } from '../types.ts';

interface BillingInsuranceProps {
  setView: (view: View) => void;
}

const BillingInsurance: React.FC<BillingInsuranceProps> = ({ setView }) => {
  const toolCards = [
    {
      title: 'Discount Card Finder',
      description: 'Find discount cards for medications by pharmacy and location',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      shadowColor: 'shadow-orange-500/25 hover:shadow-orange-500/30',
      onClick: () => setView(View.DiscountCardFinder),
    },
    {
      title: 'Prior Authorization Helper',
      description: 'Guide for common prior authorization requirements',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-sky-500 to-sky-600',
      hoverColor: 'hover:from-sky-600 hover:to-sky-700',
      shadowColor: 'shadow-sky-500/25 hover:shadow-sky-500/30',
      onClick: () => setView(View.PriorAuthHelper),
    },
  ];

  const insuranceInfoCards = [
    {
      title: 'BIN Number',
      description: 'Bank Identification Number - Identifies the insurance processor',
      example: 'Example: 610020',
    },
    {
      title: 'PCN',
      description: 'Processor Control Number - Routes claims to correct benefit plan',
      example: 'Example: ADV',
    },
    {
      title: 'Group Number',
      description: 'Identifies the specific insurance plan/employer group',
      example: 'Example: RX1234',
    },
    {
      title: 'Member ID',
      description: 'Unique identifier for the individual insured member',
      example: 'Example: ABC123456789',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Billing & Insurance Tools</h2>
          <p className="text-neutral-600">Essential resources for pharmacy billing and insurance processing</p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {toolCards.map((card, index) => (
            <button
              key={index}
              onClick={card.onClick}
              className={`bg-gradient-to-r ${card.color} ${card.hoverColor} text-white p-6 rounded-xl shadow-lg ${card.shadowColor} hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-left`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/90 text-sm">{card.description}</p>
                </div>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Insurance Information Reference */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Insurance Card Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insuranceInfoCards.map((card, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-5 rounded-xl">
                <h4 className="text-lg font-bold text-neutral-900 mb-2">{card.title}</h4>
                <p className="text-sm text-neutral-700 mb-2">{card.description}</p>
                <p className="text-xs text-neutral-500 font-mono bg-white/60 px-2 py-1 rounded">{card.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Rejection Codes */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Common Rejection Codes
          </h3>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 p-6 rounded-xl">
            <div className="space-y-3">
              {[
                { code: '70', meaning: 'Product/Service Not Covered', action: 'Check formulary or try alternative' },
                { code: '75', meaning: 'Prior Authorization Required', action: 'Initiate PA process or use discount card' },
                { code: '76', meaning: 'Refill Too Soon', action: 'Check days supply or vacation override' },
                { code: '79', meaning: 'Refill Too Late', action: 'May need new prescription' },
                { code: 'M6', meaning: 'Plan Limitations Exceeded', action: 'Check quantity or day supply limits' },
              ].map((rejection, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/60 p-3 rounded-lg">
                  <span className="font-mono font-bold text-red-600 bg-red-100 px-2 py-1 rounded text-sm min-w-[3rem] text-center">
                    {rejection.code}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 text-sm">{rejection.meaning}</p>
                    <p className="text-xs text-neutral-600 mt-1">Action: {rejection.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInsurance;
