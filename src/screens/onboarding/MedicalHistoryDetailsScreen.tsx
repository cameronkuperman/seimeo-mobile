import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Colors } from '../../theme/colors';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'MedicalHistoryDetails'>;

interface ConditionDetail {
  conditionId: string;
  conditionName: string;
  specificType?: string;
  yearDiagnosed?: string;
  currentStatus?: 'active' | 'managed' | 'remission' | 'monitoring';
  medications?: string;
  notes?: string;
}

// Check icon
const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M3 10L7 14L17 4" stroke={Colors.health} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

// Medical icon
const MedicalDetailIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Rect x="6" y="4" width="20" height="24" rx="2" fill={Colors.ocean} opacity={0.1} />
    <Rect x="12" y="2" width="8" height="4" rx="1" fill={Colors.ocean} opacity={0.3} />
    <Path d="M16 12V20M12 16H20" stroke={Colors.coral} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="11" cy="11" r="1" fill={Colors.ocean} opacity={0.5} />
    <Circle cx="21" cy="11" r="1" fill={Colors.ocean} opacity={0.5} />
    <Circle cx="11" cy="21" r="1" fill={Colors.ocean} opacity={0.5} />
    <Circle cx="21" cy="21" r="1" fill={Colors.ocean} opacity={0.5} />
  </Svg>
);

const MedicalHistoryDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { getNextScreen } = useOnboarding();
  const conditions = route?.params?.conditions || [];
  
  const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
  const [conditionDetails, setConditionDetails] = useState<ConditionDetail[]>(
    conditions.map(c => ({
      conditionId: c.id,
      conditionName: c.name,
      specificType: '',
      yearDiagnosed: '',
      currentStatus: undefined,
      medications: '',
      notes: '',
    }))
  );

  const currentCondition = conditions[currentConditionIndex];
  const currentDetail = conditionDetails[currentConditionIndex];

  // Specific types for different conditions
  const getSpecificTypes = (conditionId: string): string[] => {
    switch (conditionId) {
      case 'cancer_current':
      case 'cancer_past':
        return ['Breast', 'Lung', 'Prostate', 'Colorectal', 'Skin', 'Blood', 'Brain', 'Pancreatic', 'Liver', 'Other'];
      case 'diabetes':
        return ['Type 1', 'Type 2', 'Gestational', 'Prediabetes'];
      case 'heart_disease':
        return ['Coronary Artery', 'Heart Failure', 'Arrhythmia', 'Valve Disease', 'Congenital'];
      case 'arthritis':
        return ['Rheumatoid', 'Osteoarthritis', 'Psoriatic', 'Gout'];
      case 'thyroid':
        return ['Hypothyroidism', 'Hyperthyroidism', 'Hashimotos', 'Graves Disease'];
      case 'autoimmune':
        return ['Lupus', 'Multiple Sclerosis', 'Crohns Disease', 'Ulcerative Colitis', 'Rheumatoid Arthritis', 'Psoriasis', 'Other'];
      case 'kidney':
        return ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5 (Dialysis)'];
      case 'stroke':
        return ['Ischemic', 'Hemorrhagic', 'TIA (Mini-stroke)'];
      default:
        return [];
    }
  };

  const statusOptions = ['active', 'managed', 'remission', 'monitoring'];
  const specificTypes = getSpecificTypes(currentCondition?.id);

  const updateCurrentDetail = (updates: Partial<ConditionDetail>) => {
    const newDetails = [...conditionDetails];
    newDetails[currentConditionIndex] = { ...currentDetail, ...updates };
    setConditionDetails(newDetails);
  };

  const handleNext = () => {
    if (currentConditionIndex < conditions.length - 1) {
      setCurrentConditionIndex(currentConditionIndex + 1);
    } else {
      // Navigate to next screen
      const nextScreen = getNextScreen('MedicalHistoryDetails');
      navigation.navigate(nextScreen as any);
    }
  };

  const handleSkip = () => {
    if (currentConditionIndex < conditions.length - 1) {
      setCurrentConditionIndex(currentConditionIndex + 1);
    } else {
      const nextScreen = getNextScreen('MedicalHistoryDetails');
      navigation.navigate(nextScreen as any);
    }
  };

  const handleSkipAll = () => {
    const nextScreen = getNextScreen('MedicalHistoryDetails');
    navigation.navigate(nextScreen as any);
  };

  if (!currentCondition) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentConditionIndex + 1) / conditions.length) * 100}%` }]} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MedicalDetailIcon />
          </View>
          <Text style={styles.title}>Tell us more about your</Text>
          <Text style={styles.conditionTitle}>{currentCondition.name}</Text>
          <Text style={styles.hint}>
            {currentConditionIndex + 1} of {conditions.length} conditions
          </Text>
        </View>

        {/* Specific Type Selection */}
        {specificTypes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentCondition.id === 'kidney' ? 'Stage' : 'Type'}
            </Text>
            <View style={styles.typeGrid}>
              {specificTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeChip,
                    currentDetail.specificType === type && styles.typeChipActive
                  ]}
                  onPress={() => updateCurrentDetail({ specificType: type })}
                >
                  <Text style={[
                    styles.typeChipText,
                    currentDetail.specificType === type && styles.typeChipTextActive
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Year Diagnosed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Year Diagnosed</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., 2020"
            value={currentDetail.yearDiagnosed}
            onChangeText={(text) => updateCurrentDetail({ yearDiagnosed: text })}
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        {/* Current Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Status</Text>
          <View style={styles.statusContainer}>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  currentDetail.currentStatus === status && styles.statusButtonActive
                ]}
                onPress={() => updateCurrentDetail({ currentStatus: status as any })}
              >
                <Text style={[
                  styles.statusText,
                  currentDetail.currentStatus === status && styles.statusTextActive
                ]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Medications (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Metformin, Insulin"
            value={currentDetail.medications}
            onChangeText={(text) => updateCurrentDetail({ medications: text })}
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            placeholder="Any other relevant details..."
            value={currentDetail.notes}
            onChangeText={(text) => updateCurrentDetail({ notes: text })}
            multiline
            placeholderTextColor={Colors.textTertiary}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>
            {currentConditionIndex < conditions.length - 1 ? 'Skip this condition' : 'Skip'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.skipAllButton}
          onPress={handleSkipAll}
        >
          <Text style={styles.skipAllText}>Skip all details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNext}
        >
          <Text style={styles.continueText}>
            {currentConditionIndex < conditions.length - 1 ? 'Next Condition' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F2',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.health,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 160,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  conditionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  hint: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    margin: 4,
  },
  typeChipActive: {
    backgroundColor: Colors.ocean,
    borderColor: Colors.ocean,
  },
  typeChipText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  typeChipTextActive: {
    color: Colors.white,
    fontWeight: '500',
  },
  textInput: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  notesInput: {
    height: 100,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statusButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    margin: 4,
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: Colors.health,
    borderColor: Colors.health,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusTextActive: {
    color: Colors.white,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    backgroundColor: '#FAFAFA',
  },
  skipButton: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 4,
  },
  skipText: {
    fontSize: 15,
    color: Colors.textTertiary,
  },
  skipAllButton: {
    alignItems: 'center',
    padding: 8,
    marginBottom: 12,
  },
  skipAllText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  continueButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },
});

export default MedicalHistoryDetailsScreen;