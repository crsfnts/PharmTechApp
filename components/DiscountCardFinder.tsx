import React, { useState } from 'react';
import { View } from '../types.ts';
import Spinner from './Spinner.tsx';

interface DiscountCardFinderProps {
  setView: (view: View) => void;
}

interface DiscountCard {
  name: string;
  website: string;
  description: string;
  features: string[];
}

const DiscountCardFinder: React.FC<DiscountCardFinderProps> = ({ setView }) => {
  const [medication, setMedication] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Common discount card programs
  const discountCards: DiscountCard[] = [
    {
      name: 'GoodRx',
      website: 'www.goodrx.com',
      description: 'One of the most popular prescription discount services',
      features: ['Free to use', 'Compare prices across pharmacies', 'Mobile app available', 'Up to 80% savings'],
    },
    {
      name: 'RxSaver by RetailMeNot',
      website: 'www.rxsaver.com',
      description: 'Free prescription savings tool from RetailMeNot',
      features: ['No sign-up required', 'Price comparison', 'Digital coupons', 'Works at major chains'],
    },
    {
      name: 'SingleCare',
      website: 'www.singlecare.com',
      description: 'Free prescription savings card accepted nationwide',
      features: ['Free card', 'Instant discounts', 'No membership fees', 'Pet medications included'],
    },
    {
      name: 'WellRx',
      website: 'www.wellrx.com',
      description: 'Free prescription discount card program',
      features: ['No registration needed', 'Accepted at 65,000+ pharmacies', 'Price comparison tool', 'Save on pet meds'],
    },
    {
      name: 'ScriptSave WellRx',
      website: 'www.scriptsave.com',
      description: 'Nationwide prescription savings program',
      features: ['Free card', 'Average savings of 65%', 'Mobile app', 'No activation required'],
    },
    {
      name: 'America\'s Pharmacy',
      website: 'www.americaspharmacy.com',
      description: 'Free prescription discount card',
      features: ['Free enrollment', 'Save up to 85%', 'Works nationwide', 'Family coverage'],
    },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSearching(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setMedication('');
    setZipCode('');
    setPharmacy('');
    setShowResults(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-neutral-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Discount Card Finder</h2>
          <p className="text-neutral-600">Find the best prescription discount cards for your patients</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Medication Name</label>
              <input
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                placeholder="e.g., Atorvastatin"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-neutral-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">ZIP Code</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="e.g., 90210"
                maxLength={5}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-neutral-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Pharmacy (Optional)</label>
              <input
                type="text"
                value={pharmacy}
                onChange={(e) => setPharmacy(e.target.value)}
                placeholder="e.g., CVS, Walgreens"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-neutral-400"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSearching || !medication || !zipCode}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 disabled:from-neutral-300 disabled:to-neutral-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 flex items-center justify-center"
            >
              {isSearching ? <Spinner size="sm" /> : 'Search Discount Cards'}
            </button>
            {showResults && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-4 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors duration-200"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-5 rounded-xl mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-neutral-900 mb-1">How to Use Discount Cards</h4>
              <p className="text-sm text-neutral-700">
                Discount cards are NOT insurance. They can be used when patients don't have insurance or when the discount price is lower than their copay.
                Most are free and accepted at major pharmacy chains nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Discount Card Results */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {showResults ? `Available Discount Cards ${medication ? `for ${medication}` : ''}` : 'Popular Discount Card Programs'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discountCards.map((card, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-bold text-neutral-900">{card.name}</h4>
                  <a
                    href={`https://${card.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <p className="text-sm text-neutral-700 mb-3">{card.description}</p>
                <p className="text-xs text-orange-600 font-mono mb-3">{card.website}</p>
                <ul className="space-y-1">
                  {card.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-neutral-700">
                      <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-6 rounded-xl">
          <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Additional Resources
          </h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>Manufacturer Coupons:</strong> Check drug manufacturer websites for patient assistance programs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>NeedyMeds:</strong> Free resource for patient assistance programs and discount cards (needymeds.org)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span><strong>340B Programs:</strong> Some qualifying patients may access discounted medications through 340B covered entities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiscountCardFinder;
