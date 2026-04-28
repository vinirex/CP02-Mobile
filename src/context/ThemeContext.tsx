import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { taskStorage } from '../services/taskStorage';

type ThemeType = 'light' | 'dark';

interface ThemeContextData {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    danger: string;
    success: string;
    warning: string;
    border: string;
  };
}

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const lightColors = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#121212',
  textSecondary: '#666666',
  primary: '#4361EE',
  danger: '#EF233C',
  success: '#2A9D8F',
  warning: '#F4A261',
  border: '#E0E0E0',
};

const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F8F9FA',
  textSecondary: '#A0A0A0',
  primary: '#4361EE', // Keep primary vibrant
  danger: '#EF233C',
  success: '#2A9D8F',
  warning: '#F4A261',
  border: '#333333',
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('dark'); // default to dark
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await taskStorage.getTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    taskStorage.saveTheme(newTheme);
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  if (loading) return null; // Or a loading screen

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
