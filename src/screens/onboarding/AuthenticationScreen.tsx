import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import GoogleLogo from '../../components/icons/GoogleLogo';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Authentication'>;

const LockIcon = () => (
  <Svg width={16} height={20} viewBox="0 0 16 20" fill="none">
    <Path 
      d="M8 0C5.24 0 3 2.24 3 5V8H2C0.9 8 0 8.9 0 10V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V10C16 8.9 15.1 8 14 8H13V5C13 2.24 10.76 0 8 0ZM8 2C9.66 2 11 3.34 11 5V8H5V5C5 3.34 6.34 2 8 2ZM8 14C9.1 14 10 13.1 10 12C10 10.9 9.1 10 8 10C6.9 10 6 10.9 6 12C6 13.1 6.9 14 8 14Z" 
      fill={Colors.mint}
    />
  </Svg>
);

const AuthenticationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);

  const handleContinue = () => {
    // Save user data and navigate to next screen
    const nextScreen = getNextScreen('Authentication');
    navigation.navigate(nextScreen as any);
  };

  const handleAppleSignIn = async () => {
    // TODO: Implement Apple Sign In
    setShowEmailInput(false); // Hide email input when using social auth
    navigation.navigate('AppleHealthSync');
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google Sign In
    setShowEmailInput(false); // Hide email input when using social auth
    navigation.navigate('AppleHealthSync');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '90%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Let's get to know you</Text>
            <Text style={styles.subtitle}>
              Your personal health journey starts here
            </Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Your name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={Colors.textPlaceholder}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* Email Input - Optional if using social auth */}
            {showEmailInput && (
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.textPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                />
              </View>
            )}

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                (!name || (showEmailInput && !email)) && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={!name || (showEmailInput && !email)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or start with</Text>
              <View style={styles.divider} />
            </View>

            {/* Apple Sign In Button */}
            {Platform.OS === 'ios' ? (
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.CONTINUE}
                style={styles.appleAuthButton}
                onPress={handleAppleSignIn}
              />
            ) : (
              <TouchableOpacity
                style={styles.appleButton}
                onPress={handleAppleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.appleButtonText}>Continue with Apple</Text>
              </TouchableOpacity>
            )}

            {/* Google Sign In Button */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.8}
            >
              <GoogleLogo width={18} height={18} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Note */}
          <View style={styles.privacyContainer}>
            <LockIcon />
            <Text style={styles.privacyText}>
              Your data is encrypted end-to-end
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  formContainer: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 56,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingHorizontal: 16,
    fontSize: 17,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  continueButton: {
    height: 56,
    backgroundColor: Colors.black,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
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
  continueButtonDisabled: {
    backgroundColor: Colors.borderMedium,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textTertiary,
    letterSpacing: -0.1,
  },
  appleAuthButton: {
    height: 54,
    marginBottom: 10,
  },
  appleButton: {
    height: 54,
    backgroundColor: Colors.black,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  appleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  googleButton: {
    height: 54,
    backgroundColor: Colors.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 12,
    letterSpacing: -0.2,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
  },
  privacyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    letterSpacing: -0.1,
  },
});

export default AuthenticationScreen;