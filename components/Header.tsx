
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-teal-50 text-teal-600 ring-1 ring-teal-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1zm2 0a1 1 0 011-1h0a1 1 0 110 2h-1a1 1 0 01-1-1z" />
            </svg>
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold leading-tight text-slate-900">Pharm-Assist Tech</h1>
            <p className="text-xs text-slate-500">Tools and learning resources for pharmacy technicians</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
