import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Celebration'>;

const { width, height } = Dimensions.get('window');

// Confetti particle component
const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(Math.random() * width)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height + 50,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 3000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [delay, translateY, rotate, opacity]);

  return (
    <Animated.View
      style={[
        styles.confettiPiece,
        {
          backgroundColor: color,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotate.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
            })},
          ],
          opacity,
        },
      ]}
    />
  );
};

// Trophy icon
const TrophyIcon = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, rotate]);

  return (
    <Animated.View
      style={{
        transform: [
          { scale },
          { rotate: rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          })},
        ],
      }}
    >
      <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
        <Path
          d="M30 30C30 30 30 45 45 50C50 52 55 52 60 52C65 52 70 52 75 50C90 45 90 30 90 30H30Z"
          fill={Colors.amber}
          opacity={0.9}
        />
        <Rect x="55" y="52" width="10" height="20" fill={Colors.amber} opacity={0.8} />
        <Rect x="45" y="72" width="30" height="8" rx="4" fill={Colors.amber} opacity={0.7} />
        <Path
          d="M25 30C25 35 28 38 32 38M95 30C95 35 92 38 88 38"
          stroke={Colors.amber}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Circle cx="60" cy="45" r="3" fill={Colors.white} opacity={0.8} />
      </Svg>
    </Animated.View>
  );
};

// Checkmark with circle animation
const CheckmarkIcon = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const pathAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(scale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
        <Circle cx="40" cy="40" r="36" fill={Colors.health} opacity={0.15} />
        <Circle cx="40" cy="40" r="30" fill={Colors.health} opacity={0.25} />
        <Path
          d="M25 40L35 50L55 30"
          stroke={Colors.health}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

const CelebrationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen, selectedPath } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleContinue = () => {
    const nextScreen = getNextScreen('Celebration');
    navigation.navigate(nextScreen as any);
  };

  const getPathMessage = () => {
    switch(selectedPath) {
      case 'express':
        return "Quick setup complete!";
      case 'regular':
        return "Personalized profile ready!";
      case 'complete':
        return "Comprehensive health profile created!";
      default:
        return "Setup complete!";
    }
  };

  const confettiColors = [
    Colors.health,
    Colors.coral,
    Colors.ocean,
    Colors.lavender,
    Colors.mint,
    Colors.amber,
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Confetti Background */}
      <View style={styles.confettiContainer}>
        {[...Array(20)].map((_, i) => (
          <ConfettiPiece
            key={i}
            delay={i * 100}
            color={confettiColors[i % confettiColors.length]}
          />
        ))}
      </View>

      <View style={styles.content}>
        {/* Trophy/Success Icon */}
        <View style={styles.iconContainer}>
          <TrophyIcon />
          <View style={styles.checkmarkOverlay}>
            <CheckmarkIcon />
          </View>
        </View>

        {/* Success Message */}
        <Animated.View
          style={[
            styles.messageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>{getPathMessage()}</Text>
          <Text style={styles.description}>
            Your health journey begins now. Let's choose your plan.
          </Text>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Profile Complete</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>AI</Text>
            <Text style={styles.statLabel}>Ready to Help</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Health Tracking</Text>
          </View>
        </Animated.View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Choose Your Plan
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
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    position: 'relative',
  },
  checkmarkOverlay: {
    position: 'absolute',
    bottom: -20,
    right: -20,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.health,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    minWidth: 90,
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    right: 20,
  },
  continueButton: {
    width: '100%',
  },
});

export default CelebrationScreen;