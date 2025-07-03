
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M9 13a1 1 0 011-1h0a1 1 0 110 2H9a1 1 0 01-1-1zm2 0a1 1 0 011-1h0a1 1 0 110 2h-1a1 1 0 01-1-1z" />
        </svg>
        <h1 className="text-2xl font-bold text-slate-800 ml-3">
          Pharm-Assist Tech
        </h1>
      </div>
    </header>
  );
};

export default Header;
