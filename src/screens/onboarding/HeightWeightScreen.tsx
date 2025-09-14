import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Haptics } from '../../utils/haptics';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'HeightWeight'>;

const HeightWeightScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(6);
  const [cm, setCm] = useState(170);
  const [weightLbs, setWeightLbs] = useState(120);
  const [weightKg, setWeightKg] = useState(55);
  
  // Generate picker values
  const feetValues = useMemo(() => Array.from({length: 6}, (_, i) => i + 3), []); // 3-8 ft
  const inchesValues = useMemo(() => Array.from({length: 12}, (_, i) => i), []); // 0-11 in
  const cmValues = useMemo(() => Array.from({length: 131}, (_, i) => i + 120), []); // 120-250 cm
  const lbsValues = useMemo(() => Array.from({length: 401}, (_, i) => i + 50), []); // 50-450 lbs
  const kgValues = useMemo(() => Array.from({length: 181}, (_, i) => i + 20), []); // 20-200 kg

  const handleContinue = () => {
    Haptics.light();
    const nextScreen = getNextScreen('HeightWeight');
    navigation.navigate(nextScreen as any);
  };

  const calculateBMI = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (unit === 'imperial') {
      // Convert feet and inches to meters
      const totalInches = feet * 12 + inches;
      heightInMeters = totalInches * 0.0254;
      // Convert pounds to kg
      weightInKg = weightLbs * 0.453592;
    } else {
      // Convert cm to meters
      heightInMeters = cm / 100;
      weightInKg = weightKg;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: Colors.amber };
    if (bmi < 25) return { text: 'Healthy range', color: Colors.health };
    if (bmi < 30) return { text: 'Above optimal', color: Colors.amber };
    return { text: 'Health risk', color: Colors.coral };
  };

  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Height & weight</Text>
          <Text style={styles.subtitle}>
            This will be used to calibrate your{' '}
            <Text style={styles.subtitleEmphasis}>custom plan</Text>.
          </Text>
        </View>

          {/* Unit Toggle */}
          <View style={styles.unitToggle}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === 'imperial' && styles.unitButtonActive,
              ]}
              onPress={() => {
                Haptics.selection();
                setUnit('imperial');
              }}
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
              onPress={() => {
                Haptics.selection();
                setUnit('metric');
              }}
            >
              <Text style={[
                styles.unitButtonText,
                unit === 'metric' && styles.unitButtonTextActive,
              ]}>
                Metric
              </Text>
            </TouchableOpacity>
          </View>

          {/* Picker Section */}
          <View style={styles.pickerContainer}>
            {/* Combined Height & Weight Label */}
            <Text style={styles.pickerLabel}>Height & Weight</Text>
            <Text style={styles.pickerSublabel}>Scroll to select your measurements</Text>
            
            {/* Inline Pickers Row */}
            {unit === 'imperial' ? (
              <View style={styles.inlinePickerRow}>
                {/* Feet Picker */}
                <View style={styles.inlinePickerWrapper}>
                  <Picker
                    selectedValue={feet}
                    onValueChange={(value) => setFeet(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {feetValues.map(value => (
                      <Picker.Item key={value} label={`${value} ft`} value={value} />
                    ))}
                  </Picker>
                </View>
                
                {/* Inches Picker */}
                <View style={styles.inlinePickerWrapper}>
                  <Picker
                    selectedValue={inches}
                    onValueChange={(value) => setInches(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {inchesValues.map(value => (
                      <Picker.Item key={value} label={`${value} in`} value={value} />
                    ))}
                  </Picker>
                </View>
                
                {/* Weight Picker */}
                <View style={styles.inlinePickerWrapper}>
                  <Picker
                    selectedValue={weightLbs}
                    onValueChange={(value) => setWeightLbs(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {lbsValues.map(value => (
                      <Picker.Item key={value} label={`${value} lbs`} value={value} />
                    ))}
                  </Picker>
                </View>
              </View>
            ) : (
              <View style={styles.inlinePickerRow}>
                {/* CM Picker */}
                <View style={styles.inlinePickerWrapperLarge}>
                  <Picker
                    selectedValue={cm}
                    onValueChange={(value) => setCm(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {cmValues.map(value => (
                      <Picker.Item key={value} label={`${value} cm`} value={value} />
                    ))}
                  </Picker>
                </View>
                
                {/* KG Picker */}
                <View style={styles.inlinePickerWrapperLarge}>
                  <Picker
                    selectedValue={weightKg}
                    onValueChange={(value) => setWeightKg(value)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {kgValues.map(value => (
                      <Picker.Item key={value} label={`${value} kg`} value={value} />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            {/* BMI Display */}
            {bmi && bmiStatus && (
              <View style={styles.bmiContainer}>
                <View style={styles.bmiHeader}>
                  <Text style={styles.bmiLabel}>Your BMI</Text>
                  <Text style={styles.bmiNumber}>{bmi}</Text>
                </View>
                <View style={styles.bmiStatusContainer}>
                  <View style={[styles.bmiStatusBadge, { backgroundColor: bmiStatus.color + '20' }]}>
                    <Text style={[styles.bmiStatus, { color: bmiStatus.color }]}>
                      {bmiStatus.text}
                    </Text>
                  </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    padding: 3,
    marginBottom: 35,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 11,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.shadowLight,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  unitButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  unitButtonTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  pickerContainer: {
    flex: 1,
    marginTop: 15,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pickerSublabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  inlinePickerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  inlinePickerWrapper: {
    flex: 1,
    height: 140,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  inlinePickerWrapperLarge: {
    flex: 1,
    height: 140,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  picker: {
    width: '100%',
    height: 140,
  },
  pickerItem: {
    fontSize: 18,
    height: 140,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  bmiContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bmiLabel: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  bmiNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  bmiStatusContainer: {
    flexDirection: 'row',
  },
  bmiStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bmiStatus: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
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
  continueButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
});

export default HeightWeightScreen;