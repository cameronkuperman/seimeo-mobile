import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, G, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Stress'>;

// Calm face icon
const CalmIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill={Colors.mint + '20'} />
    <Circle cx="14" cy="18" r="2" fill={Colors.mint} />
    <Circle cx="26" cy="18" r="2" fill={Colors.mint} />
    <Path
      d="M14 24C14 24 16 26 20 26C24 26 26 24 26 24"
      stroke={Colors.mint}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Stressed face icon
const StressedIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill={Colors.coral + '20'} />
    <Circle cx="14" cy="18" r="2" fill={Colors.coral} />
    <Circle cx="26" cy="18" r="2" fill={Colors.coral} />
    <Path
      d="M14 26C14 26 16 24 20 24C24 24 26 26 26 26"
      stroke={Colors.coral}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M12 14L16 15M28 14L24 15"
      stroke={Colors.coral}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Breathing exercise visual
const BreathingCircle = ({ scale }: { scale: number }) => (
  <Svg width={120} height={120} viewBox="0 0 120 120" style={{ transform: [{ scale }] }}>
    <Defs>
      <SvgGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={Colors.mint} stopOpacity={0.3} />
        <Stop offset="100%" stopColor={Colors.ocean} stopOpacity={0.1} />
      </SvgGradient>
    </Defs>
    <Circle
      cx="60"
      cy="60"
      r="50"
      fill="url(#breathGradient)"
    />
    <Circle
      cx="60"
      cy="60"
      r="30"
      fill={Colors.mint}
      opacity={0.2}
    />
  </Svg>
);

const StressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [stressLevel, setStressLevel] = useState(5);

  const getStressMessage = () => {
    if (stressLevel <= 3) return "Great! Low stress is excellent for health 🌱";
    if (stressLevel <= 6) return "Moderate stress - manageable with good habits 💪";
    if (stressLevel <= 8) return "High stress - let's work on coping strategies 🧘";
    return "Very high stress - your health is our priority ❤️";
  };

  const getStressColor = () => {
    if (stressLevel <= 3) return Colors.mint;
    if (stressLevel <= 6) return Colors.amber;
    return Colors.coral;
  };

  const handleContinue = () => {
    // Store stress data and navigate
    const nextScreen = getNextScreen('Stress');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Stress check-in</Text>
          <Text style={styles.subtitle}>
            How stressed do you feel lately?
          </Text>
        </View>

        {/* Stress Visual */}
        <View style={styles.visualContainer}>
          <View style={styles.breathingContainer}>
            <BreathingCircle scale={0.8 + (stressLevel / 10) * 0.4} />
          </View>
          
          <View style={styles.stressIndicator}>
            <Text style={[styles.stressNumber, { color: getStressColor() }]}>
              {stressLevel}
            </Text>
            <Text style={styles.stressLabel}>out of 10</Text>
          </View>
        </View>

        {/* Gradient Slider Container */}
        <View style={styles.sliderSection}>
          <View style={styles.sliderEndpoints}>
            <CalmIcon />
            <StressedIcon />
          </View>

          <LinearGradient
            colors={[Colors.mint, Colors.amber, Colors.coral]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTrack}
          >
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={stressLevel}
              onValueChange={setStressLevel}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={Colors.white}
            />
          </LinearGradient>

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Calm</Text>
            <Text style={styles.sliderLabel}>Stressed</Text>
          </View>
        </View>

        {/* Stress Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{getStressMessage()}</Text>
        </View>

        {/* Stress Management Tip */}
        {stressLevel > 6 && (
          <View style={[styles.tipCard, { backgroundColor: Colors.lavender + '10' }]}>
            <Text style={[styles.tipTitle, { color: Colors.lavender }]}>
              Quick tip for stress relief:
            </Text>
            <Text style={[styles.tipText, { color: Colors.lavender }]}>
              Try the 4-7-8 breathing technique: Breathe in for 4, hold for 7, out for 8
            </Text>
          </View>
        )}

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continue
          </Button>
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
    marginBottom: 40,
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  visualContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: 120,
    position: 'relative',
  },
  breathingContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stressIndicator: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  stressNumber: {
    fontSize: 48,
    fontWeight: '700',
  },
  stressLabel: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginTop: -4,
  },
  sliderSection: {
    marginBottom: 32,
  },
  sliderEndpoints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  gradientTrack: {
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  messageText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
});

export default StressScreen;