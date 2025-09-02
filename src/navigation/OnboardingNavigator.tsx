import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

// Import screens
import HeroWelcomeScreen from '../screens/onboarding/HeroWelcomeScreen';
import AuthenticationScreen from '../screens/onboarding/AuthenticationScreen';
import SetupPathScreen from '../screens/onboarding/SetupPathScreen';
import BirthdayScreen from '../screens/onboarding/BirthdayScreen';
import GenderScreen from '../screens/onboarding/GenderScreen';
import HeightWeightScreen from '../screens/onboarding/HeightWeightScreen';
import CoreVitalsScreen from '../screens/onboarding/CoreVitalsScreen';
import MedicalHistoryScreen from '../screens/onboarding/MedicalHistoryScreen';
import MedicationsScreen from '../screens/onboarding/MedicationsScreen';
import ExerciseScreen from '../screens/onboarding/ExerciseScreen';
import SleepScreen from '../screens/onboarding/SleepScreen';
import DietScreen from '../screens/onboarding/DietScreen';
import StressScreen from '../screens/onboarding/StressScreen';
import SmokingScreen from '../screens/onboarding/SmokingScreen';
import AlcoholScreen from '../screens/onboarding/AlcoholScreen';
import FamilyHistoryScreen from '../screens/onboarding/FamilyHistoryScreen';
import LifestyleScreen from '../screens/onboarding/LifestyleScreen';
import MentalHealthScreen from '../screens/onboarding/MentalHealthScreen';
import HealthGoalsScreen from '../screens/onboarding/HealthGoalsScreen';
import AIDemoScreen from '../screens/onboarding/AIDemoScreen';
import PremiumDecisionScreen from '../screens/onboarding/PremiumDecisionScreen';
import PermissionsScreen from '../screens/onboarding/PermissionsScreen';
import AppleHealthSyncScreen from '../screens/onboarding/AppleHealthSyncScreen';
import WelcomeHomeScreen from '../screens/onboarding/WelcomeHomeScreen';
import CelebrationScreen from '../screens/onboarding/CelebrationScreen';
import PlanSelectionScreen from '../screens/onboarding/PlanSelectionScreen';

export type OnboardingStackParamList = {
  HeroWelcome: undefined;
  SetupPath: undefined;
  Birthday: undefined;
  Gender: undefined;
  HeightWeight: undefined;
  HealthGoals: undefined;
  MedicalHistory: undefined;
  Medications: undefined;
  Exercise: undefined;
  Sleep: undefined;
  Diet: undefined;
  Stress: undefined;
  Smoking: undefined;
  Alcohol: undefined;
  FamilyHistory: undefined;
  Authentication: undefined;
  Celebration: undefined;
  PlanSelection: undefined;
  AppleHealthSync: undefined;
  WelcomeHome: { name: string };
  // Legacy screens (to be implemented)
  CoreVitals: undefined;
  Lifestyle: undefined;
  MentalHealth: undefined;
  AIDemo: undefined;
  PremiumDecision: undefined;
  Permissions: undefined;
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
        name="MedicalHistory" 
        component={MedicalHistoryScreen}
      />
      <Stack.Screen 
        name="Medications" 
        component={MedicationsScreen}
      />
      <Stack.Screen 
        name="Exercise" 
        component={ExerciseScreen}
      />
      <Stack.Screen 
        name="Sleep" 
        component={SleepScreen}
      />
      <Stack.Screen 
        name="Diet" 
        component={DietScreen}
      />
      <Stack.Screen 
        name="Stress" 
        component={StressScreen}
      />
      <Stack.Screen 
        name="Smoking" 
        component={SmokingScreen}
      />
      <Stack.Screen 
        name="Alcohol" 
        component={AlcoholScreen}
      />
      <Stack.Screen 
        name="Authentication" 
        component={AuthenticationScreen}
      />
      <Stack.Screen 
        name="Celebration" 
        component={CelebrationScreen}
      />
      <Stack.Screen 
        name="PlanSelection" 
        component={PlanSelectionScreen}
      />
      <Stack.Screen 
        name="AppleHealthSync" 
        component={AppleHealthSyncScreen}
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