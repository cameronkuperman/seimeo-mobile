import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Colors } from '../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'CoreVitals'>;

const CoreVitalsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [age, setAge] = useState('25');
  const [sex, setSex] = useState<'male' | 'female' | null>(null);
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');

  const handleContinue = () => {
    navigation.navigate('MedicalHistory');
  };

  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '30%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Core health information</Text>
            <Text style={styles.subtitle}>
              This helps us provide accurate health insights
            </Text>
          </View>

          {/* Age Selection */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Age Range</Text>
            <View style={styles.ageGrid}>
              {ageRanges.map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.ageButton,
                    age === range && styles.ageButtonActive,
                  ]}
                  onPress={() => setAge(range)}
                >
                  <Text
                    style={[
                      styles.ageButtonText,
                      age === range && styles.ageButtonTextActive,
                    ]}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Biological Sex */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Biological Sex</Text>
            <Text style={styles.cardSubtitle}>For medical accuracy</Text>
            <View style={styles.sexContainer}>
              <TouchableOpacity
                style={[
                  styles.sexButton,
                  sex === 'male' && styles.sexButtonActive,
                ]}
                onPress={() => setSex('male')}
              >
                <Text style={styles.sexIcon}>♂</Text>
                <Text
                  style={[
                    styles.sexButtonText,
                    sex === 'male' && styles.sexButtonTextActive,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sexButton,
                  sex === 'female' && styles.sexButtonActive,
                ]}
                onPress={() => setSex('female')}
              >
                <Text style={styles.sexIcon}>♀</Text>
                <Text
                  style={[
                    styles.sexButtonText,
                    sex === 'female' && styles.sexButtonTextActive,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Height & Weight */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Height & Weight</Text>
            <View style={styles.measurementContainer}>
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Height</Text>
                <View style={styles.measurementInput}>
                  <Text style={styles.measurementValue}>{height}</Text>
                  <Text style={styles.measurementUnit}>cm</Text>
                </View>
              </View>
              <View style={styles.measurementDivider} />
              <View style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>Weight</Text>
                <View style={styles.measurementInput}>
                  <Text style={styles.measurementValue}>{weight}</Text>
                  <Text style={styles.measurementUnit}>kg</Text>
                </View>
              </View>
            </View>
            <Text style={styles.bmiText}>BMI: 24.2 (Normal)</Text>
          </Card>

          {/* Continue Button */}
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continue
          </Button>

          {/* Skip Option */}
          <TouchableOpacity onPress={() => navigation.navigate('PremiumDecision')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
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
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  ageButton: {
    width: '30%',
    margin: '1.66%',
    paddingVertical: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ageButtonActive: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  ageButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  ageButtonTextActive: {
    color: Colors.textInverse,
  },
  sexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sexButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sexButtonActive: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  sexIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sexButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  sexButtonTextActive: {
    color: Colors.textInverse,
  },
  measurementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  measurementItem: {
    flex: 1,
    alignItems: 'center',
  },
  measurementLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  measurementInput: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  measurementValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.black,
  },
  measurementUnit: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  measurementDivider: {
    width: 1,
    height: 60,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
  bmiText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.success,
  },
  continueButton: {
    marginTop: 20,
    marginBottom: 16,
  },
  skipText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.textSecondary,
    paddingVertical: 12,
  },
});

export default CoreVitalsScreen;