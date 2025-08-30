import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

// Import screens (to be created)
import HeroWelcomeScreen from '../screens/onboarding/HeroWelcomeScreen';
import AuthenticationScreen from '../screens/onboarding/AuthenticationScreen';
import SetupPathScreen from '../screens/onboarding/SetupPathScreen';
import BirthdayScreen from '../screens/onboarding/BirthdayScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import HeightWeightScreen from '../screens/onboarding/HeightWeightScreen';
import CoreVitalsScreen from '../screens/onboarding/CoreVitalsScreen';
import MedicalHistoryScreen from '../screens/onboarding/MedicalHistoryScreen';
import FamilyHistoryScreen from '../screens/onboarding/FamilyHistoryScreen';
import LifestyleScreen from '../screens/onboarding/LifestyleScreen';
import MentalHealthScreen from '../screens/onboarding/MentalHealthScreen';
import HealthGoalsScreen from '../screens/onboarding/HealthGoalsScreen';
import AIDemoScreen from '../screens/onboarding/AIDemoScreen';
import PremiumDecisionScreen from '../screens/onboarding/PremiumDecisionScreen';
import PermissionsScreen from '../screens/onboarding/PermissionsScreen';
import SaveProgressScreen from '../screens/onboarding/SaveProgressScreen';
import WelcomeHomeScreen from '../screens/onboarding/WelcomeHomeScreen';

export type OnboardingStackParamList = {
  HeroWelcome: undefined;
  Authentication: undefined;
  SetupPath: undefined;
  Birthday: undefined;
  Gender: undefined;
  HeightWeight: undefined;
  CoreVitals: undefined;
  MedicalHistory: undefined;
  FamilyHistory: undefined;
  Lifestyle: undefined;
  MentalHealth: undefined;
  HealthGoals: undefined;
  AIDemo: undefined;
  PremiumDecision: undefined;
  Permissions: undefined;
  SaveProgress: undefined;
  WelcomeHome: { name: string };
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade_from_bottom',
        animationDuration: 300,
        contentStyle: {
          backgroundColor: '#FAFAFA',
        },
        // Enable gesture navigation
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // Native feel
        customAnimationOnGesture: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="HeroWelcome" 
        component={HeroWelcomeScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen 
        name="Authentication" 
        component={AuthenticationScreen}
      />
      <Stack.Screen 
        name="SetupPath" 
        component={SetupPathScreen}
      />
      <Stack.Screen 
        name="Birthday" 
        component={BirthdayScreen}
      />
      <Stack.Screen 
        name="Gender" 
        component={GenderScreen}
      />
      <Stack.Screen 
        name="HeightWeight" 
        component={HeightWeightScreen}
      />
      <Stack.Screen 
        name="CoreVitals" 
        component={CoreVitalsScreen}
      />
      <Stack.Screen 
        name="MedicalHistory" 
        component={MedicalHistoryScreen}
      />
      <Stack.Screen 
        name="FamilyHistory" 
        component={FamilyHistoryScreen}
      />
      <Stack.Screen 
        name="Lifestyle" 
        component={LifestyleScreen}
      />
      <Stack.Screen 
        name="MentalHealth" 
        component={MentalHealthScreen}
      />
      <Stack.Screen 
        name="HealthGoals" 
        component={HealthGoalsScreen}
      />
      <Stack.Screen 
        name="AIDemo" 
        component={AIDemoScreen}
      />
      <Stack.Screen 
        name="PremiumDecision" 
        component={PremiumDecisionScreen}
      />
      <Stack.Screen 
        name="Permissions" 
        component={PermissionsScreen}
      />
      <Stack.Screen 
        name="SaveProgress" 
        component={SaveProgressScreen}
      />
      <Stack.Screen 
        name="WelcomeHome" 
        component={WelcomeHomeScreen}
        options={{
          animation: 'fade',
          gestureEnabled: false, // Can't swipe back from home
        }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;