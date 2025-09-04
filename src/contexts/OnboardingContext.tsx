import React, { createContext, useContext, useState, ReactNode } from 'react';

type OnboardingPath = 'express' | 'regular' | 'complete';

interface OnboardingContextType {
  selectedPath: OnboardingPath;
  setSelectedPath: (path: OnboardingPath) => void;
  getNextScreen: (currentScreen: string) => string;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Define the navigation flow for each path
const navigationFlows: Record<OnboardingPath, string[]> = {
  express: [
    'HeroWelcome',
    'SetupPath',
    'Birthday',
    'Gender',
    'HeightWeight',
    'MedicalHistory',
    'HealthGoals',
    'Authentication',
    'Celebration',
    'PlanSelection',
    'AppleHealthSync', // Only shown if Premium selected
    'WelcomeHome',
  ],
  regular: [
    'HeroWelcome',
    'SetupPath',
    'Birthday',
    'Gender',
    'HeightWeight',
    'MedicalHistory',
    'Medications',
    'Hospitalizations',
    'Exercise',
    'Sleep',
    'Diet',
    'Stress',
    'Smoking',
    'Alcohol',
    'PersonalHealthContext',
    'HealthGoals',
    'Authentication',
    'Celebration',
    'PlanSelection',
    'AppleHealthSync', // Only shown if Premium selected
    'WelcomeHome',
  ],
  complete: [
    'HeroWelcome',
    'SetupPath',
    'Birthday',
    'Gender',
    'HeightWeight',
    'MedicalHistory',
    'Medications',
    'Hospitalizations',
    'Allergies',
    'Exercise',
    'Sleep',
    'Diet',
    'Stress',
    'Smoking',
    'Alcohol',
    'FamilyHistory',
    'FamilyHistoryDetails',
    'PersonalHealthContext',
    'HealthGoals',
    'Authentication',
    'Celebration',
    'PlanSelection',
    'AppleHealthSync', // Only shown if Premium selected
    'WelcomeHome',
  ],
};

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPath, setSelectedPath] = useState<OnboardingPath>('regular');

  const getNextScreen = (currentScreen: string): string => {
    // Special handling for detail screens that aren't in the main flow
    if (currentScreen === 'MedicalHistoryDetails') {
      // After medical history details, continue based on path
      const flow = navigationFlows[selectedPath];
      const medHistoryIndex = flow.indexOf('MedicalHistory');
      if (medHistoryIndex !== -1 && medHistoryIndex < flow.length - 1) {
        return flow[medHistoryIndex + 1];
      }
    }
    
    const flow = navigationFlows[selectedPath];
    const currentIndex = flow.indexOf(currentScreen);
    
    if (currentIndex === -1 || currentIndex === flow.length - 1) {
      return 'WelcomeHome'; // Default to home if not found or at end
    }
    
    return flow[currentIndex + 1];
  };

  return (
    <OnboardingContext.Provider
      value={{
        selectedPath,
        setSelectedPath,
        getNextScreen,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};