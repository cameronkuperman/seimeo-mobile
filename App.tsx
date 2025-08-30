/**
 * Seimeo Mobile - Health Intelligence Platform
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <NavigationContainer>
        <OnboardingNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
