import React, { createContext, useContext, ReactNode } from 'react';
import { View, viewColors } from '../types';

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
};

const defaultTheme: ThemeContextType = {
  primaryColor: 'bg-teal-500',
  secondaryColor: 'bg-teal-100',
  textColor: 'text-white',
  bgColor: 'bg-white',
  borderColor: 'border-teal-500',
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const ThemeProvider: React.FC<{ view: View; children: ReactNode }> = ({ view, children }) => {
  // Get the base color from the view
  const baseColor = viewColors[view] || 'teal-500';
  
  // Remove the 'bg-' prefix if it exists
  const colorName = baseColor.replace('bg-', '');
  
  const theme: ThemeContextType = {
    primaryColor: `bg-${colorName}`,
    secondaryColor: `bg-${colorName.split('-')[0]}-100`,
    textColor: 'text-white',
    bgColor: 'bg-white',
    borderColor: `border-${colorName}`,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
