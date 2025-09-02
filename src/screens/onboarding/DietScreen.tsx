import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Diet'>;

// Salad icon for healthy
const SaladIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill={Colors.health + '20'} />
    <Path
      d="M20 10C20 10 25 15 25 20C25 25 20 30 20 30C20 30 15 25 15 20C15 15 20 10 20 10Z"
      fill={Colors.health}
    />
    <Path
      d="M17 18C17 18 19 16 20 16C21 16 23 18 23 18"
      stroke={Colors.white}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Balance icon
const BalanceIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill={Colors.amber + '20'} />
    <G>
      <Rect x="12" y="18" width="16" height="2" fill={Colors.amber} rx="1" />
      <Circle cx="14" cy="14" r="3" fill={Colors.amber} />
      <Circle cx="26" cy="14" r="3" fill={Colors.amber} />
      <Rect x="19" y="20" width="2" height="6" fill={Colors.amber} />
    </G>
  </Svg>
);

// Burger icon for needs work
const BurgerIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="18" fill={Colors.coral + '20'} />
    <Path
      d="M12 18H28M12 22H28M14 26H26"
      stroke={Colors.coral}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M14 14C14 14 16 12 20 12C24 12 26 14 26 14V18H14V14Z"
      fill={Colors.coral}
    />
  </Svg>
);

// Water drop icon
const WaterIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C12 2 7 9 7 14C7 17.31 9.69 20 13 20C16.31 20 19 17.31 19 14C19 9 14 2 12 2Z"
      fill={Colors.ocean}
      opacity={0.8}
    />
  </Svg>
);

const DietScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [dietType, setDietType] = useState<'healthy' | 'balanced' | 'needs-work'>('balanced');
  const [waterIntake, setWaterIntake] = useState(6);

  const waterOptions = [
    { value: 2, label: '2-3' },
    { value: 4, label: '4-5' },
    { value: 6, label: '6-7' },
    { value: 8, label: '8+' },
  ];

  const getDietMessage = () => {
    switch(dietType) {
      case 'healthy': return "Great! A healthy diet is key to wellness 🥗";
      case 'balanced': return "Good balance! Room for improvement 🎯";
      case 'needs-work': return "No judgment! We'll help you improve 💪";
    }
  };

  const handleContinue = () => {
    // Store diet data and navigate
    const nextScreen = getNextScreen('Diet');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '70%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>How's your diet?</Text>
          <Text style={styles.subtitle}>
            Be honest - we're here to help, not judge
          </Text>
        </View>

        {/* Diet Type Cards */}
        <View style={styles.dietCardsContainer}>
          <TouchableOpacity
            style={[
              styles.dietCard,
              dietType === 'healthy' && styles.dietCardSelected,
              dietType === 'healthy' && { borderColor: Colors.health }
            ]}
            onPress={() => setDietType('healthy')}
            activeOpacity={0.7}
          >
            <SaladIcon />
            <Text style={[
              styles.dietCardText,
              dietType === 'healthy' && styles.dietCardTextSelected
            ]}>
              Healthy
            </Text>
            <Text style={styles.dietCardSubtext}>
              Lots of veggies & fruits
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dietCard,
              dietType === 'balanced' && styles.dietCardSelected,
              dietType === 'balanced' && { borderColor: Colors.amber }
            ]}
            onPress={() => setDietType('balanced')}
            activeOpacity={0.7}
          >
            <BalanceIcon />
            <Text style={[
              styles.dietCardText,
              dietType === 'balanced' && styles.dietCardTextSelected
            ]}>
              Balanced
            </Text>
            <Text style={styles.dietCardSubtext}>
              Mix of everything
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dietCard,
              dietType === 'needs-work' && styles.dietCardSelected,
              dietType === 'needs-work' && { borderColor: Colors.coral }
            ]}
            onPress={() => setDietType('needs-work')}
            activeOpacity={0.7}
          >
            <BurgerIcon />
            <Text style={[
              styles.dietCardText,
              dietType === 'needs-work' && styles.dietCardTextSelected
            ]}>
              Needs work
            </Text>
            <Text style={styles.dietCardSubtext}>
              Too much junk food
            </Text>
          </TouchableOpacity>
        </View>

        {/* Diet Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{getDietMessage()}</Text>
        </View>

        {/* Water Intake Section */}
        <View style={styles.waterSection}>
          <View style={styles.waterHeader}>
            <WaterIcon />
            <Text style={styles.waterTitle}>Water intake (glasses/day)</Text>
          </View>
          
          <View style={styles.waterOptionsContainer}>
            {waterOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.waterOption,
                  waterIntake === option.value && styles.waterOptionSelected,
                  waterIntake === option.value && {
                    backgroundColor: option.value >= 8 ? Colors.ocean : Colors.ocean + '80'
                  }
                ]}
                onPress={() => setWaterIntake(option.value)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.waterOptionText,
                  waterIntake === option.value && styles.waterOptionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Hydration Visual */}
          <View style={styles.hydrationVisual}>
            {[...Array(waterIntake)].map((_, i) => (
              <WaterIcon key={i} />
            ))}
          </View>
        </View>

        {/* Tip Card */}
        {waterIntake >= 8 && (
          <View style={[styles.tipCard, { backgroundColor: Colors.ocean + '10' }]}>
            <Text style={[styles.tipText, { color: Colors.ocean }]}>
              💧 Excellent hydration! This supports all body functions
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
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
    marginBottom: 32,
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
  dietCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dietCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
  dietCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  dietCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  dietCardTextSelected: {
    color: Colors.textPrimary,
  },
  dietCardSubtext: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  messageText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  waterSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  waterTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  waterOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  waterOption: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
  },
  waterOptionSelected: {
    transform: [{ scale: 1.05 }],
  },
  waterOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  waterOptionTextSelected: {
    color: Colors.white,
  },
  hydrationVisual: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
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

export default DietScreen;