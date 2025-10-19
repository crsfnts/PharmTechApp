import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { COMMON_ABBREVIATIONS } from '../constants';

interface SIGTrainerProps {
  setView: (view: View) => void;
}

interface Score {
  correct: number;
  total: number;
}

type Mode = 'sig-to-text' | 'text-to-sig';

const SIGTrainer: React.FC<SIGTrainerProps> = ({ setView }) => {
  const [mode, setMode] = useState<Mode>('sig-to-text');
  const [currentTerm, setCurrentTerm] = useState<{ term: string; definition: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [hint, setHint] = useState('');

  // Get a random term from the abbreviations list
  const getRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_ABBREVIATIONS.length);
    return COMMON_ABBREVIATIONS[randomIndex];
  };

  // Set a new random term
  const newTerm = () => {
    setCurrentTerm(getRandomTerm());
    setUserInput('');
    setShowAnswer(false);
    setIsCorrect(null);
    setHint('');
  };

  // Initialize with first term
  useEffect(() => {
    newTerm();
  }, [mode]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTerm) return;

    const userAnswer = userInput.trim().toLowerCase();
    let correctAnswer = '';
    
    if (mode === 'sig-to-text') {
      correctAnswer = currentTerm.definition.toLowerCase();
    } else {
      correctAnswer = currentTerm.term.toLowerCase();
    }

    const isAnswerCorrect = userAnswer === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
    
    // Update score
    setScore(prev => ({
      correct: isAnswerCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1
    }));

    // Update streak
    if (isAnswerCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  // Handle next button click
  const handleNext = () => {
    newTerm();
  };

  // Toggle between modes
  const toggleMode = () => {
    setMode(prev => prev === 'sig-to-text' ? 'text-to-sig' : 'sig-to-text');
  };

  // Get a hint (first letter of the answer)
  const getHint = () => {
    if (!currentTerm) return;
    
    const answer = mode === 'sig-to-text' 
      ? currentTerm.definition 
      : currentTerm.term;
    
    if (!hint) {
      // Show first letter
      setHint(answer.substring(0, 1).toUpperCase());
    } else {
      // Show one more letter
      setHint(prev => answer.substring(0, prev.length + 1).toUpperCase());
    }
  };

  if (!currentTerm) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">SIG Trainer</h1>
            <p className="text-slate-600">
              {mode === 'sig-to-text' 
                ? 'Translate the SIG code to patient-friendly text'
                : 'Write the SIG code for the given instruction'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">
              Score: {score.correct}/{score.total}
            </span>
            {streak > 1 && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                🔥 {streak} in a row!
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-slate-800">
              {mode === 'sig-to-text' ? 'SIG Code' : 'Patient Instruction'}
            </h2>
            <button
              onClick={toggleMode}
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              Switch to {mode === 'sig-to-text' ? 'Text → SIG' : 'SIG → Text'}
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
            <p className="text-2xl font-mono text-center py-4">
              {mode === 'sig-to-text' ? currentTerm.term : currentTerm.definition}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-slate-700 mb-1">
                {mode === 'sig-to-text' ? 'Enter the meaning' : 'Enter the SIG code'}
              </label>
              <input
                type="text"
                id="answer"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder={mode === 'sig-to-text' ? 'e.g., before meals' : 'e.g., ac'}
                disabled={showAnswer}
                autoComplete="off"
              />
              
              {hint && (
                <p className="mt-1 text-sm text-slate-500">
                  Hint: {hint}
                  {Array((mode === 'sig-to-text' ? currentTerm.definition.length : currentTerm.term.length) - hint.length)
                    .fill('_')
                    .join(' ')}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={!userInput.trim() || showAnswer}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Check Answer
              </button>
              
              <button
                type="button"
                onClick={getHint}
                disabled={showAnswer}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Get Hint
              </button>
              
              {showAnswer && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-white border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Next Question
                </button>
              )}
            </div>
          </form>
        </div>

        {showAnswer && (
          <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <div className="mt-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">SIG:</span> {currentTerm.term}
                  </p>
                  <p>
                    <span className="font-medium">Meaning:</span> {currentTerm.definition}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIGTrainer;
