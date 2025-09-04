import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  // You could check if user has completed onboarding here
  // For now, we'll always start with onboarding
  const hasCompletedOnboarding = false;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={hasCompletedOnboarding ? "MainApp" : "Onboarding"}
    >
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="MainApp" 
        component={MainTabNavigator}
        options={{
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;