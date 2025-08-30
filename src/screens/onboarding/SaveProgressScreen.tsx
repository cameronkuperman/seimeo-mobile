import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'SaveProgress'>;

const SaveProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    navigation.navigate('WelcomeHome', { name: 'User' });
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google Sign In
    navigation.navigate('WelcomeHome', { name: 'User' });
  };

  const handleSkip = () => {
    navigation.navigate('WelcomeHome', { name: 'Guest' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
          <Text style={styles.title}>Secure your health journey</Text>
          <Text style={styles.subtitle}>
            Your data syncs across devices,{'\n'}
            <Text style={styles.subtitleEmphasis}>encrypted and private</Text>
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>☁️</Text>
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Automatic backup</Text>
              <Text style={styles.benefitDescription}>Never lose your health data</Text>
            </View>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>📱</Text>
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>Multi-device sync</Text>
              <Text style={styles.benefitDescription}>Access from phone, tablet, or web</Text>
            </View>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>🛡️</Text>
            <View style={styles.benefitTextContainer}>
              <Text style={styles.benefitTitle}>HIPAA compliant</Text>
              <Text style={styles.benefitDescription}>Medical-grade security standards</Text>
            </View>
          </View>
        </View>

        {/* Sign In Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.signInButton, styles.appleButton]}
            onPress={handleAppleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.appleIcon}>🍎</Text>
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInButton, styles.googleButton]}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <View style={styles.googleIconContainer}>
              <Text style={styles.googleIcon}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Continue without account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
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
    height: 3,
    backgroundColor: Colors.borderLight,
    borderRadius: 1.5,
  },
  progressFill: {
    height: 3,
    backgroundColor: Colors.health,
    borderRadius: 1.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.ocean + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lockIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  subtitleEmphasis: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  benefitsContainer: {
    marginBottom: 40,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  benefitDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  signInButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appleButton: {
    backgroundColor: Colors.black,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  appleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.borderMedium,
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  dividerText: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginHorizontal: 16,
  },
  skipButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderMedium,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  footerText: {
    fontSize: 13,
    color: Colors.textTertiary,
    textAlign: 'center',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    lineHeight: 18,
  },
  linkText: {
    color: Colors.ocean,
    fontWeight: '600',
  },
});

export default SaveProgressScreen;