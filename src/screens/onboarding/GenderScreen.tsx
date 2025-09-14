import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Haptics } from '../../utils/haptics';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Gender'>;

const GenderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [otherGenderOption, setOtherGenderOption] = useState<'not_specify' | 'non_binary' | 'custom' | null>(null);
  const [customGender, setCustomGender] = useState('');

  const handleContinue = () => {
    if (selectedGender) {
      Haptics.light();
      // Store gender data for 3D model assignment
      // For 'other' options, use neutral/unisex 3D model
      const genderData = {
        gender: selectedGender,
        displayGender: selectedGender === 'other' 
          ? (otherGenderOption === 'custom' ? customGender : otherGenderOption)
          : selectedGender,
      };
      // TODO: Store genderData for 3D model assignment
      const nextScreen = getNextScreen('Gender');
      navigation.navigate(nextScreen as any);
    }
  };

  const canContinue = () => {
    if (!selectedGender) return false;
    if (selectedGender === 'other') {
      if (!otherGenderOption) return false;
      if (otherGenderOption === 'custom' && !customGender.trim()) return false;
    }
    return true;
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ] as const;

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
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your gender</Text>
            <Text style={styles.subtitle}>
              This helps us provide{' '}
              <Text style={styles.subtitleEmphasis}>personalized insights</Text>.
            </Text>
          </View>

          {/* Gender Options */}
          <View style={styles.optionsContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  selectedGender === option.value && styles.optionCardSelected,
                ]}
                onPress={() => {
                  Haptics.selection();
                  setSelectedGender(option.value);
                  if (option.value !== 'other') {
                    setOtherGenderOption(null);
                    setCustomGender('');
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  selectedGender === option.value && styles.optionTextSelected,
                ]}>
                  {option.label}
                </Text>
                <View style={[
                  styles.radioButton,
                  selectedGender === option.value && styles.radioButtonSelected,
                ]}>
                  {selectedGender === option.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* Other Gender Options */}
            {selectedGender === 'other' && (
              <View style={styles.otherOptionsContainer}>
                <Text style={styles.otherOptionsTitle}>Please specify:</Text>
                
                <TouchableOpacity
                  style={[
                    styles.subOptionCard,
                    otherGenderOption === 'not_specify' && styles.subOptionCardSelected,
                  ]}
                  onPress={() => {
                    Haptics.selection();
                    setOtherGenderOption('not_specify');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.subOptionText,
                    otherGenderOption === 'not_specify' && styles.subOptionTextSelected,
                  ]}>
                    Prefer not to specify
                  </Text>
                  <View style={[
                    styles.radioButton,
                    otherGenderOption === 'not_specify' && styles.radioButtonSelected,
                  ]}>
                    {otherGenderOption === 'not_specify' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.subOptionCard,
                    otherGenderOption === 'non_binary' && styles.subOptionCardSelected,
                  ]}
                  onPress={() => {
                    Haptics.selection();
                    setOtherGenderOption('non_binary');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.subOptionText,
                    otherGenderOption === 'non_binary' && styles.subOptionTextSelected,
                  ]}>
                    Non-binary
                  </Text>
                  <View style={[
                    styles.radioButton,
                    otherGenderOption === 'non_binary' && styles.radioButtonSelected,
                  ]}>
                    {otherGenderOption === 'non_binary' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.subOptionCard,
                    otherGenderOption === 'custom' && styles.subOptionCardSelected,
                  ]}
                  onPress={() => {
                    Haptics.selection();
                    setOtherGenderOption('custom');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.subOptionText,
                    otherGenderOption === 'custom' && styles.subOptionTextSelected,
                  ]}>
                    Custom
                  </Text>
                  <View style={[
                    styles.radioButton,
                    otherGenderOption === 'custom' && styles.radioButtonSelected,
                  ]}>
                    {otherGenderOption === 'custom' && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                {otherGenderOption === 'custom' && (
                  <TextInput
                    style={styles.customInput}
                    placeholder="Enter your gender identity"
                    placeholderTextColor={Colors.textPlaceholder}
                    value={customGender}
                    onChangeText={setCustomGender}
                    returnKeyType="done"
                    autoCapitalize="none"
                  />
                )}
              </View>
            )}
          </View>

          {/* Continue Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue() && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              activeOpacity={canContinue() ? 0.8 : 1}
              disabled={!canContinue()}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
    marginBottom: 35,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  subtitleEmphasis: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  optionsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  optionCardSelected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '08',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.health,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.health,
  },
  otherOptionsContainer: {
    marginTop: 20,
    paddingLeft: 20,
  },
  otherOptionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subOptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  subOptionCardSelected: {
    borderColor: Colors.ocean,
    backgroundColor: Colors.ocean + '08',
  },
  subOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  subOptionTextSelected: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  customInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1.5,
    borderColor: Colors.ocean,
  },
  footer: {
    position: 'absolute',
    bottom: 45,
    left: 20,
    right: 20,
  },
  continueButton: {
    height: 58,
    backgroundColor: Colors.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default GenderScreen;