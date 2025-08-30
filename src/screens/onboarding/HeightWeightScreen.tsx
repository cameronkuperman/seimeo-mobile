import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'HeightWeight'>;

const HeightWeightScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [weight, setWeight] = useState('');
  
  const inchesRef = useRef<TextInput>(null);
  const weightRef = useRef<TextInput>(null);

  const handleContinue = () => {
    navigation.navigate('MedicalHistory');
  };

  const calculateBMI = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unit === 'imperial') {
      // Convert feet and inches to meters
      const totalInches = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
      heightInMeters = totalInches * 0.0254;
      // Convert pounds to kg
      weightInKg = (parseFloat(weight) || 0) * 0.453592;
    } else {
      // Convert cm to meters
      heightInMeters = (parseInt(cm) || 0) / 100;
      weightInKg = parseFloat(weight) || 0;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: Colors.amber };
    if (bmi < 25) return { text: 'Normal', color: Colors.health };
    if (bmi < 30) return { text: 'Overweight', color: Colors.amber };
    return { text: 'Obese', color: Colors.coral };
  };

  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;

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
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Height & weight</Text>
            <Text style={styles.subtitle}>
              This will be used to calibrate your custom plan.
            </Text>
          </View>

          {/* Unit Toggle */}
          <View style={styles.unitToggle}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'imperial' && styles.unitButtonActive,
              ]}
              onPress={() => setUnit('imperial')}
            >
              <Text style={[
                styles.unitButtonText,
                unit === 'imperial' && styles.unitButtonTextActive,
              ]}>
                Imperial
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'metric' && styles.unitButtonActive,
              ]}
              onPress={() => setUnit('metric')}
            >
              <Text style={[
                styles.unitButtonText,
                unit === 'metric' && styles.unitButtonTextActive,
              ]}>
                Metric
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {/* Height Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Height</Text>
              {unit === 'imperial' ? (
                <View style={styles.imperialHeight}>
                  <View style={styles.imperialInput}>
                    <TextInput
                      style={styles.input}
                      value={feet}
                      onChangeText={setFeet}
                      placeholder="5"
                      placeholderTextColor={Colors.textPlaceholder}
                      keyboardType="number-pad"
                      maxLength={1}
                      returnKeyType="next"
                      onSubmitEditing={() => inchesRef.current?.focus()}
                    />
                    <Text style={styles.unitText}>ft</Text>
                  </View>
                  <View style={styles.imperialInput}>
                    <TextInput
                      ref={inchesRef}
                      style={styles.input}
                      value={inches}
                      onChangeText={setInches}
                      placeholder="10"
                      placeholderTextColor={Colors.textPlaceholder}
                      keyboardType="number-pad"
                      maxLength={2}
                      returnKeyType="next"
                      onSubmitEditing={() => weightRef.current?.focus()}
                    />
                    <Text style={styles.unitText}>in</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.metricInput}>
                  <TextInput
                    style={styles.input}
                    value={cm}
                    onChangeText={setCm}
                    placeholder="175"
                    placeholderTextColor={Colors.textPlaceholder}
                    keyboardType="number-pad"
                    maxLength={3}
                    returnKeyType="next"
                    onSubmitEditing={() => weightRef.current?.focus()}
                  />
                  <Text style={styles.unitText}>cm</Text>
                </View>
              )}
            </View>

            {/* Weight Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Weight</Text>
              <View style={styles.metricInput}>
                <TextInput
                  ref={weightRef}
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder={unit === 'imperial' ? '150' : '70'}
                  placeholderTextColor={Colors.textPlaceholder}
                  keyboardType="decimal-pad"
                  maxLength={5}
                  returnKeyType="done"
                />
                <Text style={styles.unitText}>{unit === 'imperial' ? 'lb' : 'kg'}</Text>
              </View>
            </View>

            {/* BMI Display */}
            {bmi && bmiStatus && (
              <View style={styles.bmiContainer}>
                <Text style={styles.bmiLabel}>BMI</Text>
                <View style={styles.bmiValue}>
                  <Text style={styles.bmiNumber}>{bmi}</Text>
                  <Text style={[styles.bmiStatus, { color: bmiStatus.color }]}>
                    {bmiStatus.text}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Continue Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
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
    marginBottom: 30,
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
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  unitButtonTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  inputContainer: {
    flex: 1,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  imperialHeight: {
    flexDirection: 'row',
    gap: 12,
  },
  imperialInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  metricInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  unitText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  bmiContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  bmiLabel: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
  bmiValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  bmiNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bmiStatus: {
    fontSize: 18,
    fontWeight: '600',
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
  continueButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default HeightWeightScreen;