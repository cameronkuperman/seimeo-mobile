import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Haptics } from '../../utils/haptics';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'WelcomeHome'>;
type RouteProps = RouteProp<OnboardingStackParamList, 'WelcomeHome'>;

const WelcomeHomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const userName = route.params?.name || 'there';

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Play success haptic when animation completes
      Haptics.success();
    });
  }, []);

  const handleContinue = () => {
    Haptics.light();
    // Navigate to main app dashboard
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.centerContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Success Icon */}
          <View style={styles.successIcon}>
            <Icon name="checkmark-circle" size={48} color={Colors.health} />
          </View>

          {/* Welcome Message */}
          <Text style={styles.title}>Welcome, {userName}!</Text>
          <Text style={styles.subtitle}>
            Your health journey starts now
          </Text>

          {/* Feature Highlights */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Icon name="medkit-outline" size={28} color={Colors.health} />
              </View>
              <Text style={styles.featureText}>AI Health Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Icon name="stats-chart" size={28} color={Colors.ocean} />
              </View>
              <Text style={styles.featureText}>Smart Tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Icon name="chatbubbles-outline" size={28} color={Colors.lavender} />
              </View>
              <Text style={styles.featureText}>24/7 Dr. Mei</Text>
            </View>
          </View>

          {/* Continue Button */}
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Go to Dashboard
          </Button>
        </Animated.View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  centerContent: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.health + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 30,
  },
});

export default WelcomeHomeScreen;
