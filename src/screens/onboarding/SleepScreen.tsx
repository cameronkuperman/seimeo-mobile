import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Sleep'>;

// Moon icon for sleep
const MoonIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="24" r="20" fill={Colors.lavender + '20'} />
    <Path
      d="M28 14C26.22 14 24.52 14.35 23 14.96C25.39 16.61 27 19.33 27 22.5C27 25.67 25.39 28.39 23 30.04C24.52 30.65 26.22 31 28 31C32.97 31 37 26.97 37 22C37 17.03 32.97 14 28 14Z"
      fill={Colors.lavender}
    />
  </Svg>
);

// Stars decoration
const StarsDecoration = () => (
  <Svg width={120} height={40} viewBox="0 0 120 40" fill="none" style={styles.stars}>
    <Circle cx="20" cy="20" r="2" fill={Colors.lavender} opacity={0.4} />
    <Circle cx="60" cy="10" r="3" fill={Colors.lavender} opacity={0.6} />
    <Circle cx="100" cy="25" r="2" fill={Colors.lavender} opacity={0.3} />
    <Circle cx="40" cy="30" r="1.5" fill={Colors.lavender} opacity={0.5} />
    <Circle cx="80" cy="35" r="2.5" fill={Colors.lavender} opacity={0.4} />
  </Svg>
);

// Sleep quality icons
const GoodSleepIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={Colors.health} opacity={0.2} />
    <Path d="M7 13C7 13 9 15 12 15C15 15 17 13 17 13" stroke={Colors.health} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="9" cy="9" r="1" fill={Colors.health} />
    <Circle cx="15" cy="9" r="1" fill={Colors.health} />
  </Svg>
);

const OkSleepIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={Colors.amber} opacity={0.2} />
    <Path d="M8 14H16" stroke={Colors.amber} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="9" cy="9" r="1" fill={Colors.amber} />
    <Circle cx="15" cy="9" r="1" fill={Colors.amber} />
  </Svg>
);

const PoorSleepIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={Colors.coral} opacity={0.2} />
    <Path d="M7 16C7 16 9 14 12 14C15 14 17 16 17 16" stroke={Colors.coral} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 9L9 11" stroke={Colors.coral} strokeWidth="2" strokeLinecap="round" />
    <Path d="M15 9L15 11" stroke={Colors.coral} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const LightbulbIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 2C7.24 2 5 4.24 5 7C5 9.02 6.2 10.77 7.9 11.58V14C7.9 14.55 8.35 15 8.9 15H11.1C11.65 15 12.1 14.55 12.1 14V11.58C13.8 10.77 15 9.02 15 7C15 4.24 12.76 2 10 2Z" fill={Colors.lavender} opacity={0.6} />
    <Rect x="8" y="16" width="4" height="2" rx="1" fill={Colors.lavender} opacity={0.6} />
  </Svg>
);

const SleepScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState<'good' | 'ok' | 'poor'>('ok');

  const hourOptions = [9, 8, 7, 6, 5];

  const getSleepMessage = () => {
    if (sleepHours < 6) return "Consider aiming for more sleep";
    if (sleepHours === 7 || sleepHours === 8) return "Perfect amount for most adults!";
    if (sleepHours >= 9) return "Great if you need extra recovery";
    return "";
  };

  const handleContinue = () => {
    // Store sleep data and navigate
    const nextScreen = getNextScreen('Sleep');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
        </View>

        {/* Header with Icon */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MoonIcon />
            <StarsDecoration />
          </View>
          <Text style={styles.title}>How many hours do you sleep?</Text>
          <Text style={styles.subtitle}>
            On a typical night
          </Text>
        </View>

        {/* Hours Selection */}
        <View style={styles.hoursContainer}>
          {hourOptions.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[
                styles.hourButton,
                sleepHours === hour && styles.hourButtonSelected,
                sleepHours === hour && {
                  backgroundColor: hour >= 7 && hour <= 8 ? Colors.health : Colors.lavender
                }
              ]}
              onPress={() => setSleepHours(hour)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.hourText,
                sleepHours === hour && styles.hourTextSelected
              ]}>
                {hour}{hour === 9 ? '+' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sleep Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{getSleepMessage()}</Text>
        </View>

        {/* Quality Selection */}
        <View style={styles.qualitySection}>
          <Text style={styles.qualityTitle}>Sleep quality:</Text>
          <View style={styles.qualityContainer}>
            <TouchableOpacity
              style={[
                styles.qualityButton,
                sleepQuality === 'good' && styles.qualityButtonSelected,
                sleepQuality === 'good' && { backgroundColor: Colors.health }
              ]}
              onPress={() => setSleepQuality('good')}
              activeOpacity={0.7}
            >
              <GoodSleepIcon />
              <Text style={[
                styles.qualityText,
                sleepQuality === 'good' && styles.qualityTextSelected
              ]}>
                Good
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.qualityButton,
                sleepQuality === 'ok' && styles.qualityButtonSelected,
                sleepQuality === 'ok' && { backgroundColor: Colors.amber }
              ]}
              onPress={() => setSleepQuality('ok')}
              activeOpacity={0.7}
            >
              <OkSleepIcon />
              <Text style={[
                styles.qualityText,
                sleepQuality === 'ok' && styles.qualityTextSelected
              ]}>
                OK
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.qualityButton,
                sleepQuality === 'poor' && styles.qualityButtonSelected,
                sleepQuality === 'poor' && { backgroundColor: Colors.coral }
              ]}
              onPress={() => setSleepQuality('poor')}
              activeOpacity={0.7}
            >
              <PoorSleepIcon />
              <Text style={[
                styles.qualityText,
                sleepQuality === 'poor' && styles.qualityTextSelected
              ]}>
                Poor
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Insight Card */}
        {sleepQuality === 'poor' && (
          <View style={[styles.insightCard, { backgroundColor: Colors.lavender + '10' }]}>
            <View style={styles.insightContent}>
              <LightbulbIcon />
              <Text style={[styles.insightText, { color: Colors.lavender }]}>
                Poor sleep quality can affect your health. We'll help you track patterns.
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  stars: {
    position: 'absolute',
    top: -10,
    left: -36,
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
  hoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  hourButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  hourButtonSelected: {
    borderColor: 'transparent',
    transform: [{ scale: 1.05 }],
  },
  hourText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  hourTextSelected: {
    color: Colors.white,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 24,
  },
  messageText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  qualitySection: {
    marginBottom: 32,
  },
  qualityTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  qualityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  qualityButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  qualityButtonSelected: {
    borderColor: 'transparent',
    transform: [{ scale: 1.02 }],
  },
  qualityText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginTop: 8,
  },
  qualityTextSelected: {
    color: Colors.white,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
});

export default SleepScreen;