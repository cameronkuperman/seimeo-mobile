import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Slider from '@react-native-community/slider';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, G } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Exercise'>;

// Sloth icon for minimal exercise
const SlothIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Circle cx="18" cy="18" r="16" fill={Colors.coral + '20'} />
    <G opacity="0.8">
      <Path
        d="M18 24C21.3137 24 24 21.3137 24 18C24 14.6863 21.3137 12 18 12C14.6863 12 12 14.6863 12 18C12 21.3137 14.6863 24 18 24Z"
        fill={Colors.coral}
      />
      <Circle cx="15" cy="17" r="1.5" fill={Colors.white} />
      <Circle cx="21" cy="17" r="1.5" fill={Colors.white} />
      <Path
        d="M15 20C15 20 16.5 21 18 21C19.5 21 21 20 21 20"
        stroke={Colors.white}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
  </Svg>
);

// Runner icon for daily exercise
const RunnerIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Circle cx="18" cy="18" r="16" fill={Colors.health + '20'} />
    <Path
      d="M21 11C21 12.1046 20.1046 13 19 13C17.8954 13 17 12.1046 17 11C17 9.89543 17.8954 9 19 9C20.1046 9 21 9.89543 21 11Z"
      fill={Colors.health}
    />
    <Path
      d="M14 15L16.5 17L19 14.5L21 16.5L23 14.5M11 25L14 22L16 24L19 21L21 23L24 20"
      stroke={Colors.health}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Activity ring visualization
const ActivityRing = ({ percentage }: { percentage: number }) => {
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Svg height={radius * 2} width={radius * 2} style={styles.activityRing}>
      <Circle
        stroke={Colors.borderLight}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <Circle
        stroke={percentage > 60 ? Colors.health : percentage > 30 ? Colors.amber : Colors.coral}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <Text style={[styles.ringText, { 
        position: 'absolute', 
        left: radius - 20, 
        top: radius - 12,
        color: percentage > 60 ? Colors.health : percentage > 30 ? Colors.amber : Colors.coral
      }]}>
        {Math.round(percentage)}%
      </Text>
    </Svg>
  );
};

const ExerciseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [exerciseFrequency, setExerciseFrequency] = useState(3);
  
  const getFrequencyText = (value: number) => {
    if (value === 0) return 'Never';
    if (value === 1) return 'Once a week';
    if (value === 2) return 'Twice a week';
    if (value === 3) return '3 times a week';
    if (value === 4) return '4 times a week';
    if (value === 5) return '5 times a week';
    if (value === 6) return '6 times a week';
    return 'Every day';
  };

  const getMotivationalText = (value: number) => {
    if (value === 0) return "Let's start small! 🌱";
    if (value < 3) return "Good start! Keep building 💪";
    if (value < 5) return "Nice routine! You're doing great 🎯";
    return "Amazing commitment! 🌟";
  };

  const handleContinue = () => {
    // Store exercise frequency and navigate
    const nextScreen = getNextScreen('Exercise');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>How often do you exercise?</Text>
          <Text style={styles.subtitle}>
            Any movement counts - walking, gym, sports, yoga
          </Text>
        </View>

        {/* Activity Ring Visualization */}
        <View style={styles.visualContainer}>
          <ActivityRing percentage={(exerciseFrequency / 7) * 100} />
          <Text style={styles.frequencyText}>{getFrequencyText(exerciseFrequency)}</Text>
          <Text style={styles.motivationalText}>{getMotivationalText(exerciseFrequency)}</Text>
        </View>

        {/* Slider Container */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderEndpoints}>
            <SlothIcon />
            <RunnerIcon />
          </View>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={7}
            step={1}
            value={exerciseFrequency}
            onValueChange={setExerciseFrequency}
            minimumTrackTintColor={exerciseFrequency > 4 ? Colors.health : Colors.amber}
            maximumTrackTintColor={Colors.borderLight}
            thumbTintColor={exerciseFrequency > 4 ? Colors.health : Colors.amber}
          />
          
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Never</Text>
            <Text style={styles.sliderLabel}>Daily</Text>
          </View>
        </View>

        {/* Achievement Badges */}
        {exerciseFrequency >= 3 && (
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, { backgroundColor: Colors.mint + '20' }]}>
              <Text style={[styles.badgeText, { color: Colors.mint }]}>
                💚 WHO Recommended
              </Text>
            </View>
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
    marginBottom: 48,
  },
  activityRing: {
    marginBottom: 20,
  },
  ringText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  frequencyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  motivationalText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderEndpoints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 16,
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
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
});

export default ExerciseScreen;