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

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'HeroWelcome'>;

const HeroWelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 3,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for phone placeholder
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Authentication');
  };

  const handleSignIn = () => {
    // TODO: Navigate to sign in flow
    console.log('Sign in pressed');
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Phone Animation Placeholder */}
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.phonePlaceholder,
                {
                  transform: [{ rotateY: rotation }],
                },
              ]}
            >
              <View style={styles.phoneScreen}>
                <View style={styles.notch} />
                <Text style={styles.screenTitle}>Health Dashboard</Text>
                <View style={styles.metricRow}>
                  <View style={[styles.metricCard, { backgroundColor: Colors.mint }]}>
                    <Text style={styles.metricValue}>98.6°</Text>
                    <Text style={styles.metricLabel}>Temperature</Text>
                  </View>
                  <View style={[styles.metricCard, { backgroundColor: Colors.lavender }]}>
                    <Text style={styles.metricValue}>7.5h</Text>
                    <Text style={styles.metricLabel}>Sleep</Text>
                  </View>
                </View>
                <View style={[styles.metricCard, { backgroundColor: Colors.health, opacity: 0.1 }]}>
                  <Text style={[styles.metricValue, { color: Colors.health }]}>85</Text>
                  <Text style={[styles.metricLabel, { color: Colors.health }]}>Health Score</Text>
                </View>
              </View>
              <View style={styles.animationDots}>
                <View style={[styles.dot, { backgroundColor: Colors.health }]} />
                <View style={[styles.dot, { backgroundColor: Colors.coral }]} />
                <View style={[styles.dot, { backgroundColor: Colors.ocean }]} />
              </View>
            </Animated.View>
          </View>

          {/* Headline */}
          <View style={styles.textContainer}>
            <Text style={styles.headline}>
              Health intelligence that{'\n'}understands you
            </Text>
            <Text style={styles.subtext}>
              Medical-grade AI. Personal insights.
            </Text>
          </View>

          {/* CTAs */}
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="large"
              onPress={handleGetStarted}
              style={styles.primaryButton}
            >
              Get Started
            </Button>
            
            <Button
              variant="text"
              size="medium"
              onPress={handleSignIn}
              style={styles.secondaryButton}
            >
              Already have an account? Sign in
            </Button>
          </View>

          {/* Bottom indicator */}
          <View style={styles.indicator} />
        </Animated.View>
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
    justifyContent: 'space-between',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.4,
  },
  phonePlaceholder: {
    width: width * 0.65,
    height: height * 0.35,
    backgroundColor: Colors.black,
    borderRadius: 40,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 20,
    alignItems: 'center',
  },
  notch: {
    width: 120,
    height: 30,
    backgroundColor: Colors.black,
    borderRadius: 15,
    marginTop: -10,
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  metricLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  animationDots: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: -30,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtext: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  primaryButton: {
    width: '100%',
    marginBottom: 16,
  },
  secondaryButton: {
    alignSelf: 'center',
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: Colors.black,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HeroWelcomeScreen;