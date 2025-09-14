import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Haptics } from '../../utils/haptics';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'PlanSelection'>;

// Crown icon for premium
const CrownIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Path
      d="M4 20L7 10L14 15L21 10L24 20H4Z"
      fill={Colors.amber}
      opacity={0.9}
    />
    <Circle cx="7" cy="8" r="2" fill={Colors.amber} />
    <Circle cx="14" cy="6" r="2" fill={Colors.amber} />
    <Circle cx="21" cy="8" r="2" fill={Colors.amber} />
  </Svg>
);

// Check icon
const CheckIcon = ({ color = Colors.health }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="9" fill={color} opacity={0.2} />
    <Path
      d="M6 10L9 13L14 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Sparkles icon
const SparklesIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L13.09 8.26L19 7L15.45 11.82L21 16L14.81 16L12 22L9.19 16L3 16L8.55 11.82L5 7L10.91 8.26L12 2Z"
      fill={Colors.amber}
      opacity={0.3}
    />
    <Path
      d="M18 3L18.5 5L20.5 5.5L18.5 6L18 8L17.5 6L15.5 5.5L17.5 5L18 3Z"
      fill={Colors.amber}
    />
    <Path
      d="M6 18L6.5 20L8.5 20.5L6.5 21L6 23L5.5 21L3.5 20.5L5.5 20L6 18Z"
      fill={Colors.amber}
    />
  </Svg>
);

interface PlanFeature {
  text: string;
  included: boolean;
  premium?: boolean;
}

const PlanSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');

  const freeFeatures: PlanFeature[] = [
    { text: 'Basic health tracking', included: true },
    { text: 'Daily health tips', included: true },
    { text: 'Simple reminders', included: true },
    { text: 'Limited AI insights', included: true },
    { text: 'Advanced AI analysis', included: false, premium: true },
    { text: 'Apple Health sync', included: false, premium: true },
    { text: 'Personalized recommendations', included: false, premium: true },
  ];

  const premiumFeatures: PlanFeature[] = [
    { text: 'Everything in Free', included: true },
    { text: 'Advanced AI health analysis', included: true },
    { text: 'Apple Health & wearables sync', included: true },
    { text: 'Personalized recommendations', included: true },
    { text: 'Priority support', included: true },
    { text: 'Family health tracking', included: true },
    { text: 'Export health reports', included: true },
  ];

  const handleContinue = () => {
    Haptics.light();
    // Store selected plan
    // If premium, navigate to AppleHealthSync, otherwise skip to WelcomeHome
    const nextScreen = selectedPlan === 'premium' ? 'AppleHealthSync' : 'WelcomeHome';
    navigation.navigate(nextScreen as any, nextScreen === 'WelcomeHome' ? { name: 'User' } : undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Choose your plan</Text>
            <Text style={styles.subtitle}>
              Unlock the full potential of your health
            </Text>
          </View>

          {/* Premium Card - Featured */}
          <TouchableOpacity
            style={[
              styles.planCard,
              styles.premiumCard,
              selectedPlan === 'premium' && styles.planCardSelected
            ]}
            onPress={() => {
              Haptics.selection();
              setSelectedPlan('premium');
            }}
            activeOpacity={0.9}
          >
            {/* Most Popular Badge */}
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>MOST POPULAR</Text>
            </View>

            {/* Card Content */}
            <View style={styles.cardHeader}>
              <View style={styles.planTitleRow}>
                <CrownIcon />
                <Text style={styles.premiumTitle}>Seimeo Premium</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>$9.99</Text>
                <Text style={styles.priceUnit}>/month</Text>
              </View>
              <Text style={styles.trialText}>Start with 7-day free trial</Text>
            </View>

            {/* Features List */}
            <View style={styles.featuresList}>
              {premiumFeatures.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <CheckIcon color={Colors.amber} />
                  <Text style={styles.premiumFeatureText}>{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* Selection Indicator */}
            {selectedPlan === 'premium' && (
              <View style={styles.selectionIndicator}>
                <SparklesIcon />
              </View>
            )}
          </TouchableOpacity>

          {/* Free Plan Card */}
          <TouchableOpacity
            style={[
              styles.planCard,
              styles.freeCard,
              selectedPlan === 'free' && styles.planCardSelected
            ]}
            onPress={() => {
              Haptics.selection();
              setSelectedPlan('free');
            }}
            activeOpacity={0.9}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.freeTitle}>Seimeo Free</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>$0</Text>
                <Text style={styles.priceUnit}>/forever</Text>
              </View>
            </View>

            {/* Features List */}
            <View style={styles.featuresList}>
              {freeFeatures.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  {feature.included ? (
                    <CheckIcon color={Colors.health} />
                  ) : (
                    <View style={styles.crossIcon}>
                      <Path
                        d="M6 6L14 14M6 14L14 6"
                        stroke={Colors.textTertiary}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </View>
                  )}
                  <Text style={[
                    styles.featureText,
                    !feature.included && styles.featureTextDisabled,
                    feature.premium && styles.featureTextPremium
                  ]}>
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>

            {/* Selection Indicator */}
            {selectedPlan === 'free' && (
              <View style={styles.selectionIndicator}>
                <CheckIcon color={Colors.health} />
              </View>
            )}
          </TouchableOpacity>

          {/* Benefits Section */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>Why go Premium?</Text>
            <View style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <Circle cx="20" cy="20" r="18" fill={Colors.health} opacity={0.2} />
                <Path
                  d="M20 10V30M10 20H30"
                  stroke={Colors.health}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>AI Health Assistant</Text>
                <Text style={styles.benefitDescription}>
                  Get personalized insights and recommendations powered by advanced AI
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="large"
              onPress={handleContinue}
              style={[
                styles.continueButton,
                selectedPlan === 'premium' && styles.premiumButton
              ]}
            >
              {selectedPlan === 'premium' ? 'Start Free Trial' : 'Continue with Free'}
            </Button>
            
            {selectedPlan === 'premium' && (
              <Text style={styles.disclaimer}>
                Cancel anytime. No credit card required for trial.
              </Text>
            )}
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  premiumCard: {
    borderColor: Colors.amber,
    backgroundColor: Colors.white,
  },
  freeCard: {
    borderColor: Colors.borderMedium,
  },
  planCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: 24,
    backgroundColor: Colors.amber,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  cardHeader: {
    marginBottom: 20,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  freeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  priceUnit: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  trialText: {
    fontSize: 14,
    color: Colors.health,
    fontWeight: '600',
  },
  featuresList: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  premiumFeatureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  featureTextDisabled: {
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  featureTextPremium: {
    fontWeight: '600',
    color: Colors.amber,
  },
  crossIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  benefitsSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.health + '10',
    borderRadius: 12,
    padding: 16,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  continueButton: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 30,
  },
  premiumButton: {
    backgroundColor: Colors.amber,
  },
  disclaimer: {
    fontSize: 13,
    color: Colors.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PlanSelectionScreen;