import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import GeneralAssessmentScreen from '../screens/assessment/GeneralAssessmentScreen';
import BodyScanScreen from '../screens/assessment/BodyScanScreen';
import PhotoAnalysisScreen from '../screens/assessment/PhotoAnalysisScreen';
import OracleScreen from '../screens/assessment/OracleScreen';
import PhotoCaptureScreen from '../screens/assessment/PhotoCaptureScreen';
import BodyScanResultsScreen from '../screens/assessment/BodyScanResultsScreen';
import QuickScanScreen from '../screens/assessment/QuickScanScreen';
import DeepDiveScreen from '../screens/assessment/DeepDiveScreen';
import SymptomCheckerScreen from '../screens/assessment/types/SymptomCheckerScreen';
import WellnessCheckScreen from '../screens/assessment/types/WellnessCheckScreen';
import MentalHealthScreen from '../screens/assessment/types/MentalHealthScreen';
import PreventiveScreeningScreen from '../screens/assessment/types/PreventiveScreeningScreen';
import PainAssessmentScreen from '../screens/assessment/types/PainAssessmentScreen';
import SleepAnalysisScreen from '../screens/assessment/types/SleepAnalysisScreen';
import TimelineScreen from '../screens/timeline/TimelineScreen';
import HealthDetailsScreen from '../screens/health/HealthDetailsScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import InsightDetailsScreen from '../screens/insights/InsightDetailsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
  GeneralAssessment: undefined;
  BodyScan: undefined;
  PhotoAnalysis: undefined;
  Oracle: undefined;
  PhotoCapture: undefined;
  BodyScanResults: undefined;
  QuickScan: undefined;
  DeepDive: undefined;
  SymptomChecker: undefined;
  WellnessCheck: undefined;
  MentalHealth: undefined;
  PreventiveScreening: undefined;
  PainAssessment: undefined;
  SleepAnalysis: undefined;
  Timeline: undefined;
  HealthDetails: undefined;
  Insights: undefined;
  InsightDetails: undefined;
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
      <Stack.Screen 
        name="GeneralAssessment" 
        component={GeneralAssessmentScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="BodyScan" 
        component={BodyScanScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="PhotoAnalysis" 
        component={PhotoAnalysisScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="Oracle" 
        component={OracleScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="PhotoCapture" 
        component={PhotoCaptureScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen 
        name="BodyScanResults" 
        component={BodyScanResultsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="QuickScan" 
        component={QuickScanScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="DeepDive" 
        component={DeepDiveScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="SymptomChecker" 
        component={SymptomCheckerScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="WellnessCheck" 
        component={WellnessCheckScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="MentalHealth" 
        component={MentalHealthScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="PreventiveScreening" 
        component={PreventiveScreeningScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="PainAssessment" 
        component={PainAssessmentScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="SleepAnalysis" 
        component={SleepAnalysisScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="Timeline" 
        component={TimelineScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="HealthDetails" 
        component={HealthDetailsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="Insights" 
        component={InsightsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen 
        name="InsightDetails" 
        component={InsightDetailsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;