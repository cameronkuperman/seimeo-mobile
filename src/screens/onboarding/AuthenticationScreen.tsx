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
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Authentication'>;

const AuthenticationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    navigation.navigate('SetupPath');
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`${provider} auth`);
    // TODO: Implement social auth
    navigation.navigate('SetupPath');
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
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Let's get to know you</Text>
              <Text style={styles.subtitle}>
                Your personal health journey starts here
              </Text>
            </View>

            {/* Form Card */}
            <Card style={styles.formCard}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.textTertiary}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor={Colors.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Continue Button */}
              <Button
                variant="primary"
                size="large"
                onPress={handleContinue}
                style={styles.continueButton}
              >
                Continue
              </Button>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or start with</Text>
                <View style={styles.divider} />
              </View>

              {/* Social Auth Buttons */}
              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={() => handleSocialAuth('Apple')}
              >
                <View style={styles.appleLogo}>
                  <Text style={styles.appleLogoText}></Text>
                </View>
                <Text style={[styles.socialButtonText, styles.appleButtonText]}>Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialAuth('Google')}
              >
                <View style={styles.googleLogo}>
                  <View style={[styles.googleG, styles.googleBlue]} />
                  <View style={[styles.googleG, styles.googleRed]} />
                  <View style={[styles.googleG, styles.googleYellow]} />
                  <View style={[styles.googleG, styles.googleGreen]} />
                </View>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </Card>

            {/* Privacy Note */}
            <View style={styles.privacyContainer}>
              <View style={styles.lockIcon}>
                <View style={styles.lockBody} />
                <View style={styles.lockShackle} />
              </View>
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
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  continueButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textTertiary,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  appleButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  socialButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  appleButtonText: {
    color: Colors.white,
  },
  appleLogo: {
    width: 20,
    height: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleLogoText: {
    fontSize: 24,
    color: Colors.white,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
    position: 'relative',
  },
  googleG: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  googleBlue: {
    backgroundColor: '#4285F4',
    top: 0,
    left: 0,
  },
  googleRed: {
    backgroundColor: '#EA4335',
    top: 0,
    right: 0,
  },
  googleYellow: {
    backgroundColor: '#FBBC04',
    bottom: 0,
    left: 0,
  },
  googleGreen: {
    backgroundColor: '#34A853',
    bottom: 0,
    right: 0,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  lockIcon: {
    width: 16,
    height: 20,
    marginRight: 8,
    position: 'relative',
  },
  lockBody: {
    position: 'absolute',
    bottom: 0,
    width: 16,
    height: 12,
    backgroundColor: Colors.mint,
    borderRadius: 2,
  },
  lockShackle: {
    position: 'absolute',
    top: 0,
    left: 3,
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: Colors.mint,
    borderRadius: 5,
    borderBottomWidth: 0,
  },
  privacyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default AuthenticationScreen;