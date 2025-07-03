
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlashCard } from '../types.ts';
import BackButton from './BackButton.tsx';
import { PTCB_FLASHCARDS } from '../constants.ts';

interface FlashCardsProps {
  setView: (view: View) => void;
}

const shuffleArray = (array: FlashCard[]): FlashCard[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const FlashCards: React.FC<FlashCardsProps> = ({ setView }) => {
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setShuffledCards(shuffleArray(PTCB_FLASHCARDS));
  }, []);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % shuffledCards.length);
    }, 200);
  }, [shuffledCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
    }, 200);
  }, [shuffledCards.length]);

  const currentCard = shuffledCards[currentCardIndex];

  if (shuffledCards.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500">Loading flash cards...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton setView={setView} />
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">PTCB Flash Cards</h2>
            <p className="text-slate-500">Test your knowledge for the exam.</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-600">
              Card {currentCardIndex + 1} of {shuffledCards.length}
            </p>
          </div>
        </div>
        
        <div className="mb-6 h-64 w-full">
            <div
              className={`flip-card w-full h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
              role="button"
              tabIndex={0}
              aria-live="polite"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">{currentCard.category}</p>
                        <p className="text-xl font-medium text-slate-800">{currentCard.question}</p>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div>
                        <p className="text-xl font-medium">{currentCard.answer}</p>
                    </div>
                </div>
              </div>
            </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-full sm:w-auto bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-md hover:bg-slate-300 transition duration-300 flex items-center justify-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Previous
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full sm:w-auto bg-white border border-teal-600 text-teal-600 font-semibold px-6 py-3 rounded-md hover:bg-teal-50 transition duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            Flip Card
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 flex items-center justify-center gap-2"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCards;