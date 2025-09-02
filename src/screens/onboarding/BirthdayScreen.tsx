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
import { useOnboarding } from '../../contexts/OnboardingContext';
import DateTimePicker from '@react-native-community/datetimepicker';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Birthday'>;

const BirthdayScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [date, setDate] = useState(new Date(1995, 0, 1));
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const handleContinue = () => {
    const nextScreen = getNextScreen('Birthday');
    navigation.navigate(nextScreen as any);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '20%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>When were you born?</Text>
          <Text style={styles.subtitle}>
            This will be used to calibrate your custom plan.
          </Text>
        </View>

        {/* Date Display */}
        <View style={styles.dateContainer}>
          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(date)}</Text>
              <Text style={styles.ageText}>{calculateAge(date)} years old</Text>
            </TouchableOpacity>
          )}

          {(Platform.OS === 'ios' || showPicker) && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                maximumDate={new Date()}
                minimumDate={new Date(1920, 0, 1)}
                style={styles.datePicker}
              />
            </View>
          )}

          {Platform.OS === 'ios' && (
            <View style={styles.selectedDateContainer}>
              <Text style={styles.selectedDateLabel}>Selected date</Text>
              <Text style={styles.selectedDateText}>{formatDate(date)}</Text>
              <Text style={styles.ageText}>{calculateAge(date)} years old</Text>
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
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  ageText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  datePicker: {
    height: 200,
  },
  selectedDateContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  selectedDateLabel: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginBottom: 8,
  },
  selectedDateText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
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

export default BirthdayScreen;