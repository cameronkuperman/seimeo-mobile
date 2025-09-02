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
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, G, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Alcohol'>;

// Wine glass icon for minimal
const WineGlassIcon = ({ filled = false }: { filled?: boolean }) => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Path
      d="M18 6C14 6 12 10 12 14C12 18 15 20 18 20C21 20 24 18 24 14C24 10 22 6 18 6Z"
      fill={filled ? Colors.coral : Colors.mint}
      opacity={filled ? 0.3 : 0.2}
    />
    <Path
      d="M18 20V28M14 28H22"
      stroke={filled ? Colors.coral : Colors.mint}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {filled && (
      <Circle cx="18" cy="14" r="3" fill={Colors.coral} opacity={0.6} />
    )}
  </Svg>
);

// Water drop icon for abstinence
const WaterDropIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Path
      d="M18 8C18 8 12 16 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 16 22 8 18 8Z"
      fill={Colors.ocean}
      opacity={0.2}
    />
    <Path
      d="M16 22C16 22 16 24 18 24"
      stroke={Colors.ocean}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Glass visualization showing fill level
const GlassVisualization = ({ level }: { level: number }) => {
  const fillHeight = 80 * (level / 4);
  const fillColor = level === 0 ? Colors.mint : 
                    level <= 1 ? Colors.health :
                    level <= 2 ? Colors.amber : Colors.coral;

  return (
    <Svg width={100} height={100} viewBox="0 0 100 100" style={styles.glassViz}>
      {/* Glass outline */}
      <Path
        d="M30 20 L35 80 L65 80 L70 20 Z"
        stroke={Colors.borderMedium}
        strokeWidth="2"
        fill="transparent"
      />
      {/* Liquid fill */}
      <Rect
        x="35"
        y={80 - fillHeight}
        width="30"
        height={fillHeight}
        fill={fillColor}
        opacity={0.4}
      />
      {/* Bubbles for higher consumption */}
      {level > 2 && (
        <>
          <Circle cx="45" cy={75 - fillHeight/2} r="2" fill={fillColor} opacity={0.6} />
          <Circle cx="55" cy={70 - fillHeight/2} r="1.5" fill={fillColor} opacity={0.5} />
          <Circle cx="50" cy={77 - fillHeight/2} r="1" fill={fillColor} opacity={0.4} />
        </>
      )}
    </Svg>
  );
};

const AlcoholScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [alcoholFrequency, setAlcoholFrequency] = useState(0);

  const getFrequencyText = () => {
    if (alcoholFrequency === 0) return 'Never';
    if (alcoholFrequency === 1) return 'Occasionally';
    if (alcoholFrequency === 2) return 'Weekly';
    if (alcoholFrequency === 3) return 'Few times a week';
    return 'Daily';
  };

  const getHealthMessage = () => {
    if (alcoholFrequency === 0) return "Great choice for your health! 💚";
    if (alcoholFrequency === 1) return "Moderate consumption is key 🎯";
    if (alcoholFrequency === 2) return "Within healthy guidelines ✓";
    if (alcoholFrequency === 3) return "Consider moderating for optimal health";
    return "Let's work on healthier habits together";
  };

  const getMessageColor = () => {
    if (alcoholFrequency <= 1) return Colors.health;
    if (alcoholFrequency <= 2) return Colors.amber;
    return Colors.coral;
  };

  const handleContinue = () => {
    // Store alcohol frequency and navigate
    const nextScreen = getNextScreen('Alcohol');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '85%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>How often do you drink?</Text>
          <Text style={styles.subtitle}>
            This helps us understand lifestyle factors
          </Text>
        </View>

        {/* Glass Visualization */}
        <View style={styles.visualContainer}>
          <GlassVisualization level={alcoholFrequency} />
          <Text style={[styles.frequencyText, { color: getMessageColor() }]}>
            {getFrequencyText()}
          </Text>
        </View>

        {/* Slider Section */}
        <View style={styles.sliderSection}>
          <View style={styles.sliderEndpoints}>
            <WaterDropIcon />
            <WineGlassIcon filled={true} />
          </View>

          <LinearGradient
            colors={[Colors.mint, Colors.health, Colors.amber, Colors.coral]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTrack}
          >
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={4}
              step={1}
              value={alcoholFrequency}
              onValueChange={setAlcoholFrequency}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor={Colors.white}
            />
          </LinearGradient>

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>Never</Text>
            <Text style={styles.sliderLabel}>Daily</Text>
          </View>
        </View>

        {/* Health Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.messageText, { color: getMessageColor() }]}>
            {getHealthMessage()}
          </Text>
        </View>

        {/* Info Cards based on frequency */}
        {alcoholFrequency === 0 && (
          <View style={[styles.infoCard, { backgroundColor: Colors.mint + '10' }]}>
            <Text style={[styles.infoTitle, { color: Colors.mint }]}>
              Alcohol-free benefits:
            </Text>
            <Text style={[styles.infoText, { color: Colors.mint }]}>
              • Better sleep quality{'\n'}
              • Improved liver health{'\n'}
              • Enhanced mental clarity
            </Text>
          </View>
        )}

        {alcoholFrequency >= 3 && (
          <View style={[styles.infoCard, { backgroundColor: Colors.coral + '10' }]}>
            <Text style={[styles.infoTitle, { color: Colors.coral }]}>
              Health consideration:
            </Text>
            <Text style={[styles.infoText, { color: Colors.coral }]}>
              Regular alcohol consumption can affect sleep, liver function, and overall health. 
              We'll help you track and optimize.
            </Text>
          </View>
        )}

        {/* Guidelines */}
        <View style={styles.guidelinesContainer}>
          <Text style={styles.guidelinesTitle}>Healthy guidelines:</Text>
          <View style={styles.guidelineRow}>
            <Circle cx="4" cy="4" r="2" fill={Colors.health} />
            <Text style={styles.guidelineText}>Women: ≤1 drink per day</Text>
          </View>
          <View style={styles.guidelineRow}>
            <Circle cx="4" cy="4" r="2" fill={Colors.health} />
            <Text style={styles.guidelineText}>Men: ≤2 drinks per day</Text>
          </View>
        </View>

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
  visualContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  glassViz: {
    marginBottom: 16,
  },
  frequencyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
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
    fontStyle: 'italic',
    textAlign: 'center',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  guidelinesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
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
  guidelinesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
});

export default AlcoholScreen;