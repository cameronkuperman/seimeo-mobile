import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Gender'>;

const GenderScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | null>(null);

  const handleContinue = () => {
    if (selectedGender) {
      navigation.navigate('HeightWeight');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '30%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose your Gender</Text>
          <Text style={styles.subtitle}>
            This will be used to calibrate your custom plan.
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
              onPress={() => setSelectedGender(option.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.optionText,
                selectedGender === option.value && styles.optionTextSelected,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedGender && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={selectedGender ? 0.8 : 1}
            disabled={!selectedGender}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.black,
    borderRadius: 2,
  },
  header: {
    marginBottom: 40,
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
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  optionCardSelected: {
    borderColor: Colors.black,
    borderWidth: 2,
    backgroundColor: Colors.backgroundSecondary,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: Colors.black,
  },
  footer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    backgroundColor: Colors.black,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueButtonDisabled: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default GenderScreen;