import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'AppleHealthSync'>;

// Apple Health icon reimagined
const HealthIcon = () => (
  <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
    <Circle cx="36" cy="36" r="34" fill={Colors.coral + '15'} />
    <Path 
      d="M36 22C33.5 19 29.5 17 25 17C18 17 12 23 12 30C12 40 36 58 36 58C36 58 60 40 60 30C60 23 54 17 47 17C42.5 17 38.5 19 36 22Z" 
      fill={Colors.coral}
    />
  </Svg>
);

// Data visualization icon
const DataIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Rect x="8" y="20" width="8" height="20" rx="2" fill={Colors.mint} />
    <Rect x="20" y="12" width="8" height="28" rx="2" fill={Colors.ocean} />
    <Rect x="32" y="16" width="8" height="24" rx="2" fill={Colors.lavender} />
  </Svg>
);

// Shield check icon
const SecurityIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Path 
      d="M24 4L8 12V22C8 32 14.42 41.44 24 44C33.58 41.44 40 32 40 22V12L24 4Z" 
      fill={Colors.health + '20'}
      stroke={Colors.health}
      strokeWidth="2"
    />
    <Path 
      d="M18 24L22 28L30 20" 
      stroke={Colors.health}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AppleHealthSyncScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();

  const handleConnect = () => {
    // TODO: Request Apple Health permissions
    const nextScreen = getNextScreen('AppleHealthSync');
    navigation.navigate(nextScreen as any, nextScreen === 'WelcomeHome' ? { name: 'User' } : undefined);
  };

  const handleSkip = () => {
    const nextScreen = getNextScreen('AppleHealthSync');
    navigation.navigate(nextScreen as any, nextScreen === 'WelcomeHome' ? { name: 'User' } : undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '95%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <HealthIcon />
          </View>
          <Text style={styles.title}>Sync with Apple Health</Text>
          <Text style={styles.subtitle}>
            Import your existing health data for{'\n'}
            <Text style={styles.subtitleEmphasis}>personalized insights</Text>
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitCard}>
            <DataIcon />
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Comprehensive Analysis</Text>
              <Text style={styles.benefitDescription}>
                Combine vitals, activity, and sleep data for complete health picture
              </Text>
            </View>
          </View>

          <View style={styles.benefitCard}>
            <SecurityIcon />
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Privacy First</Text>
              <Text style={styles.benefitDescription}>
                You control what data to share. Revoke access anytime
              </Text>
            </View>
          </View>
        </View>

        {/* Data Types */}
        <View style={styles.dataTypesContainer}>
          <Text style={styles.dataTypesTitle}>We'll sync:</Text>
          <View style={styles.dataTypesList}>
            <View style={styles.dataTypeRow}>
              <View style={[styles.dataTypeDot, { backgroundColor: Colors.coral }]} />
              <Text style={styles.dataTypeText}>Heart Rate & Blood Pressure</Text>
            </View>
            <View style={styles.dataTypeRow}>
              <View style={[styles.dataTypeDot, { backgroundColor: Colors.mint }]} />
              <Text style={styles.dataTypeText}>Steps & Activity</Text>
            </View>
            <View style={styles.dataTypeRow}>
              <View style={[styles.dataTypeDot, { backgroundColor: Colors.lavender }]} />
              <Text style={styles.dataTypeText}>Sleep Patterns</Text>
            </View>
            <View style={styles.dataTypeRow}>
              <View style={[styles.dataTypeDot, { backgroundColor: Colors.ocean }]} />
              <Text style={styles.dataTypeText}>Nutrition & Water</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
            activeOpacity={0.8}
          >
            <Text style={styles.connectButtonText}>Connect Apple Health</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>I'll do this later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 2,
    backgroundColor: Colors.borderLight,
    borderRadius: 1,
  },
  progressFill: {
    height: 2,
    backgroundColor: Colors.health,
    borderRadius: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  subtitleEmphasis: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  benefitTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  benefitTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  benefitDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  dataTypesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dataTypesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dataTypesList: {
    gap: 14,
  },
  dataTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  dataTypeText: {
    fontSize: 16,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  buttonsContainer: {
    marginTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  connectButton: {
    height: 56,
    backgroundColor: Colors.black,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  connectButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  skipButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: -0.3,
  },
});

export default AppleHealthSyncScreen;