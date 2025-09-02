import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'HealthGoals'>;

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const healthGoals: HealthGoal[] = [
  {
    id: 'vitals',
    title: 'Track vital signs',
    description: 'Monitor blood pressure, heart rate, and more',
    icon: '❤️',
  },
  {
    id: 'conditions',
    title: 'Manage conditions',
    description: 'Stay on top of chronic health conditions',
    icon: '📋',
  },
  {
    id: 'preventive',
    title: 'Preventive care',
    description: 'Get reminders for checkups and screenings',
    icon: '🛡️',
  },
  {
    id: 'family',
    title: 'Family health',
    description: 'Track health history and genetic factors',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 'wellness',
    title: 'Overall wellness',
    description: 'Improve sleep, nutrition, and fitness',
    icon: '🌟',
  },
];

const HealthGoalsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    // Navigate to next screen based on selected path
    const nextScreen = getNextScreen('HealthGoals');
    navigation.navigate(nextScreen as any);
  };

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
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What brings you to Seimeo?</Text>
          <Text style={styles.subtitle}>
            Select all that apply. This helps us{' '}
            <Text style={styles.subtitleEmphasis}>personalize your experience</Text>.
          </Text>
        </View>

        {/* Goals List */}
        <View style={styles.goalsContainer}>
          {healthGoals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  isSelected && styles.goalCardSelected,
                ]}
                onPress={() => toggleGoal(goal.id)}
                activeOpacity={0.7}
              >
                <View style={styles.goalContent}>
                  <Text style={styles.goalIcon}>{goal.icon}</Text>
                  <View style={styles.goalTextContainer}>
                    <Text style={[
                      styles.goalTitle,
                      isSelected && styles.goalTitleSelected,
                    ]}>
                      {goal.title}
                    </Text>
                    <Text style={[
                      styles.goalDescription,
                      isSelected && styles.goalDescriptionSelected,
                    ]}>
                      {goal.description}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected,
                ]}>
                  {isSelected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedGoals.length === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={selectedGoals.length === 0}
          >
            <Text style={styles.continueButtonText}>
              {selectedGoals.length === 0 ? 'Select at least one' : 'Continue'}
            </Text>
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
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  subtitleEmphasis: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  goalsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  goalCardSelected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '08',
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  goalTitleSelected: {
    color: Colors.textPrimary,
  },
  goalDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  goalDescriptionSelected: {
    color: Colors.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  checkboxSelected: {
    backgroundColor: Colors.health,
    borderColor: Colors.health,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 50 : 40,
  },
  continueButton: {
    height: 58,
    backgroundColor: Colors.black,
    borderRadius: 29,
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

export default HealthGoalsScreen;