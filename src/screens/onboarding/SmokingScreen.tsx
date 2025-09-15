import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Smoking'>;

// Clean lungs icon for never smoked
const LungsIcon = ({ clean = true }: { clean?: boolean }) => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <G opacity={clean ? 1 : 0.6}>
      <Path
        d="M12 16C12 16 8 18 8 24C8 30 12 36 16 36C18 36 20 35 20 32V20C20 18 18 16 16 16H12Z"
        fill={clean ? Colors.mint : Colors.coral}
        opacity={0.3}
      />
      <Path
        d="M36 16C36 16 40 18 40 24C40 30 36 36 32 36C30 36 28 35 28 32V20C28 18 30 16 32 16H36Z"
        fill={clean ? Colors.mint : Colors.coral}
        opacity={0.3}
      />
      <Rect x="22" y="12" width="4" height="20" rx="2" fill={clean ? Colors.mint : Colors.coral} />
    </G>
    {!clean && (
      <>
        <Circle cx="15" cy="25" r="2" fill={Colors.coral} opacity={0.5} />
        <Circle cx="33" cy="27" r="1.5" fill={Colors.coral} opacity={0.5} />
        <Circle cx="18" cy="30" r="1" fill={Colors.coral} opacity={0.4} />
      </>
    )}
  </Svg>
);

// Cigarette icon with smoke
const CigaretteIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Defs>
      <LinearGradient id="smoke" x1="0%" y1="100%" x2="0%" y2="0%">
        <Stop offset="0%" stopColor={Colors.textTertiary} stopOpacity={0} />
        <Stop offset="100%" stopColor={Colors.textTertiary} stopOpacity={0.3} />
      </LinearGradient>
    </Defs>
    <Rect x="12" y="28" width="24" height="6" rx="3" fill={Colors.white} stroke={Colors.borderMedium} strokeWidth="1" />
    <Rect x="28" y="28" width="8" height="6" rx="3" fill={Colors.coral} />
    <Path
      d="M32 28C32 28 31 24 33 20C35 16 34 12 34 12"
      stroke="url(#smoke)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M35 28C35 28 34 24 36 20C38 16 37 12 37 12"
      stroke="url(#smoke)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

// Vape icon
const VapeIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Rect x="16" y="24" width="16" height="8" rx="4" fill={Colors.lavender} opacity={0.3} />
    <Rect x="28" y="26" width="8" height="4" rx="2" fill={Colors.lavender} />
    <Circle cx="34" cy="28" r="6" fill={Colors.lavender} opacity={0.2} />
    <Path
      d="M40 28C40 28 42 26 42 24C42 22 40 20 40 20"
      stroke={Colors.lavender}
      strokeWidth="2"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

// Badge icon for quit achievement
const BadgeIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Circle cx="16" cy="16" r="12" fill={Colors.health} opacity={0.2} />
    <Path
      d="M11 16L14 19L21 12"
      stroke={Colors.health}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SmokingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [smokingStatus, setSmokingStatus] = useState<'never' | 'former' | 'current' | 'vape' | null>(null);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleSelection = (status: 'never' | 'former' | 'current' | 'vape') => {
    setSmokingStatus(status);
    
    // Subtle animation on selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinue = () => {
    // Store smoking status and navigate
    const nextScreen = getNextScreen('Smoking');
    navigation.navigate(nextScreen as any);
  };

  const getStatusMessage = () => {
    switch(smokingStatus) {
      case 'never':
        return "Excellent! Your lungs thank you 🌱";
      case 'former':
        return "Great job quitting! Every day counts 💪";
      case 'current':
        return "We're here to support your health journey";
      case 'vape':
        return "Let's track and optimize your health together";
      default:
        return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Smoking history</Text>
          <Text style={styles.subtitle}>
            This helps us understand your lung health
          </Text>
        </View>

        {/* Status Cards */}
        <View style={styles.cardsContainer}>
          {/* Never Smoked */}
          <TouchableOpacity
            style={[
              styles.statusCard,
              smokingStatus === 'never' && styles.statusCardSelected,
              smokingStatus === 'never' && { borderColor: Colors.mint }
            ]}
            onPress={() => handleSelection('never')}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: smokingStatus === 'never' ? scaleAnim : 1 }] }}>
              <LungsIcon clean={true} />
            </Animated.View>
            <View style={styles.cardContent}>
              <Text style={[
                styles.cardTitle,
                smokingStatus === 'never' && styles.cardTitleSelected
              ]}>
                Never smoked
              </Text>
              <Text style={styles.cardSubtext}>
                Clean lungs
              </Text>
            </View>
            {smokingStatus === 'never' && (
              <View style={styles.checkmark}>
                <BadgeIcon />
              </View>
            )}
          </TouchableOpacity>

          {/* Former Smoker */}
          <TouchableOpacity
            style={[
              styles.statusCard,
              smokingStatus === 'former' && styles.statusCardSelected,
              smokingStatus === 'former' && { borderColor: Colors.health }
            ]}
            onPress={() => handleSelection('former')}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: smokingStatus === 'former' ? scaleAnim : 1 }] }}>
              <LungsIcon clean={true} />
            </Animated.View>
            <View style={styles.cardContent}>
              <Text style={[
                styles.cardTitle,
                smokingStatus === 'former' && styles.cardTitleSelected
              ]}>
                I quit
              </Text>
              <Text style={styles.cardSubtext}>
                Former smoker
              </Text>
            </View>
            {smokingStatus === 'former' && (
              <View style={styles.checkmark}>
                <BadgeIcon />
              </View>
            )}
          </TouchableOpacity>

          {/* Current Smoker */}
          <TouchableOpacity
            style={[
              styles.statusCard,
              smokingStatus === 'current' && styles.statusCardSelected,
              smokingStatus === 'current' && { borderColor: Colors.coral }
            ]}
            onPress={() => handleSelection('current')}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: smokingStatus === 'current' ? scaleAnim : 1 }] }}>
              <CigaretteIcon />
            </Animated.View>
            <View style={styles.cardContent}>
              <Text style={[
                styles.cardTitle,
                smokingStatus === 'current' && styles.cardTitleSelected
              ]}>
                Current
              </Text>
              <Text style={styles.cardSubtext}>
                Still smoking
              </Text>
            </View>
            {smokingStatus === 'current' && (
              <View style={styles.checkmark}>
                <Circle cx="16" cy="16" r="8" fill={Colors.coral} />
              </View>
            )}
          </TouchableOpacity>

          {/* Vape Only */}
          <TouchableOpacity
            style={[
              styles.statusCard,
              smokingStatus === 'vape' && styles.statusCardSelected,
              smokingStatus === 'vape' && { borderColor: Colors.lavender }
            ]}
            onPress={() => handleSelection('vape')}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: smokingStatus === 'vape' ? scaleAnim : 1 }] }}>
              <VapeIcon />
            </Animated.View>
            <View style={styles.cardContent}>
              <Text style={[
                styles.cardTitle,
                smokingStatus === 'vape' && styles.cardTitleSelected
              ]}>
                Vape only
              </Text>
              <Text style={styles.cardSubtext}>
                E-cigarettes
              </Text>
            </View>
            {smokingStatus === 'vape' && (
              <View style={styles.checkmark}>
                <Circle cx="16" cy="16" r="8" fill={Colors.lavender} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Status Message */}
        {smokingStatus && (
          <View style={styles.messageContainer}>
            <Text style={[
              styles.messageText,
              { color: smokingStatus === 'never' || smokingStatus === 'former' ? Colors.health : Colors.textSecondary }
            ]}>
              {getStatusMessage()}
            </Text>
          </View>
        )}

        {/* Info Card for smokers */}
        {(smokingStatus === 'current' || smokingStatus === 'vape') && (
          <View style={[styles.infoCard, { backgroundColor: Colors.lavender + '10' }]}>
            <Text style={[styles.infoText, { color: Colors.lavender }]}>
              💡 We'll provide personalized tips to support your health goals
            </Text>
          </View>
        )}

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={[
              styles.continueButton,
              !smokingStatus && styles.continueButtonDisabled
            ]}
            disabled={!smokingStatus}
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statusCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    position: 'relative',
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
  statusCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    alignItems: 'center',
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardTitleSelected: {
    color: Colors.textPrimary,
  },
  cardSubtext: {
    fontSize: 13,
    color: Colors.textTertiary,
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
});

export default SmokingScreen;