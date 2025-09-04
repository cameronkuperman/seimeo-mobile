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
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'FamilyHistoryDetails'>;

interface FamilyMemberDetail {
  id: string;
  relationship: string;
  specificType?: string;
  ageAtDiagnosis?: string;
  additionalNotes?: string;
}

interface ConditionDetail {
  condition: string;
  members: FamilyMemberDetail[];
}

const FamilyIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="9" cy="6" r="2" stroke="#5B4FCF" strokeWidth="2"/>
    <Circle cx="15" cy="6" r="2" stroke="#5B4FCF" strokeWidth="2"/>
    <Path d="M9 8C6.79 8 5 9.79 5 12V16H7V22H11V16H13V22H17V16H19V12C19 9.79 17.21 8 15 8H9Z" stroke="#5B4FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const PlusIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Line x1="10" y1="4" x2="10" y2="16" stroke="#5B4FCF" strokeWidth="2" strokeLinecap="round"/>
    <Line x1="4" y1="10" x2="16" y2="10" stroke="#5B4FCF" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

const CheckIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M3 10L7 14L17 4" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const FamilyHistoryDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { getNextScreen } = useOnboarding();
  const conditions = route?.params?.conditions || ['Cancer', 'Heart Disease', 'Diabetes'];
  
  const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
  const [conditionDetails, setConditionDetails] = useState<ConditionDetail[]>(
    conditions.map(condition => ({ condition, members: [] }))
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMember, setCurrentMember] = useState<FamilyMemberDetail>({
    id: Date.now().toString(),
    relationship: '',
    specificType: '',
    ageAtDiagnosis: '',
    additionalNotes: '',
  });

  const relationships = [
    'Mother', 'Father', 
    'Maternal Grandmother', 'Maternal Grandfather',
    'Paternal Grandmother', 'Paternal Grandfather',
    'Sister', 'Brother',
    'Aunt', 'Uncle',
    'Cousin', 'Other',
  ];

  const cancerTypes = [
    'Breast', 'Lung', 'Prostate', 'Colorectal', 
    'Skin', 'Pancreatic', 'Liver', 'Blood',
    'Brain', 'Ovarian', 'Other',
  ];

  const heartDiseaseTypes = [
    'Coronary Artery Disease', 'Heart Attack',
    'Heart Failure', 'Arrhythmia',
    'Valve Disease', 'Congenital', 'Other',
  ];

  const diabetesTypes = [
    'Type 1', 'Type 2', 'Gestational', 'Other',
  ];

  const getSpecificTypes = (condition: string) => {
    if (condition.toLowerCase().includes('cancer')) return cancerTypes;
    if (condition.toLowerCase().includes('heart')) return heartDiseaseTypes;
    if (condition.toLowerCase().includes('diabetes')) return diabetesTypes;
    return [];
  };

  const handleAddMember = () => {
    setCurrentMember({
      id: Date.now().toString(),
      relationship: '',
      specificType: '',
      ageAtDiagnosis: '',
      additionalNotes: '',
    });
    setShowAddModal(true);
  };

  const handleSaveMember = () => {
    if (currentMember.relationship) {
      const updatedDetails = [...conditionDetails];
      updatedDetails[currentConditionIndex].members.push(currentMember);
      setConditionDetails(updatedDetails);
      setShowAddModal(false);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedDetails = [...conditionDetails];
    updatedDetails[currentConditionIndex].members = 
      updatedDetails[currentConditionIndex].members.filter(m => m.id !== memberId);
    setConditionDetails(updatedDetails);
  };

  const handleNext = () => {
    if (currentConditionIndex < conditions.length - 1) {
      setCurrentConditionIndex(currentConditionIndex + 1);
    } else {
      const nextScreen = getNextScreen('FamilyHistoryDetails');
      navigation.navigate(nextScreen as any);
    }
  };

  const handleSkip = () => {
    const nextScreen = getNextScreen('FamilyHistoryDetails');
    navigation.navigate(nextScreen as any);
  };

  const currentCondition = conditions[currentConditionIndex];
  const currentDetails = conditionDetails[currentConditionIndex];
  const specificTypes = getSpecificTypes(currentCondition);

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentConditionIndex + 1) / conditions.length) * 100}%` }]} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FamilyIcon />
          </View>
          <Text style={styles.title}>Family History Details</Text>
          <Text style={styles.subtitle}>
            Who in your family has {currentCondition}?
          </Text>
          <Text style={styles.hint}>
            {currentConditionIndex + 1} of {conditions.length} conditions
          </Text>
        </View>

        <View style={styles.membersSection}>
          {currentDetails.members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Text style={styles.memberRelationship}>{member.relationship}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveMember(member.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
              {member.specificType && (
                <Text style={styles.memberDetail}>Type: {member.specificType}</Text>
              )}
              {member.ageAtDiagnosis && (
                <Text style={styles.memberDetail}>Diagnosed at age {member.ageAtDiagnosis}</Text>
              )}
              {member.additionalNotes && (
                <Text style={styles.memberNote}>{member.additionalNotes}</Text>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMember}
          >
            <PlusIcon />
            <Text style={styles.addButtonText}>Add Family Member</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip all</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.continueButton, !currentDetails.members.length && styles.continueButtonDisabled]}
          onPress={handleNext}
        >
          <Text style={styles.continueText}>
            {currentConditionIndex < conditions.length - 1 ? 'Next Condition' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Family Member</Text>
            <Text style={styles.modalSubtitle}>with {currentCondition}</Text>

            <Text style={styles.inputLabel}>Relationship</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.relationshipScroll}
            >
              {relationships.map((rel) => (
                <TouchableOpacity
                  key={rel}
                  style={[
                    styles.relationshipChip,
                    currentMember.relationship === rel && styles.relationshipChipActive
                  ]}
                  onPress={() => setCurrentMember({...currentMember, relationship: rel})}
                >
                  <Text style={[
                    styles.relationshipChipText,
                    currentMember.relationship === rel && styles.relationshipChipTextActive
                  ]}>
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {specificTypes.length > 0 && (
              <>
                <Text style={styles.inputLabel}>Specific Type</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.typeScroll}
                >
                  {specificTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeChip,
                        currentMember.specificType === type && styles.typeChipActive
                      ]}
                      onPress={() => setCurrentMember({...currentMember, specificType: type})}
                    >
                      <Text style={[
                        styles.typeChipText,
                        currentMember.specificType === type && styles.typeChipTextActive
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            <Text style={styles.inputLabel}>Age at Diagnosis (optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 45"
              value={currentMember.ageAtDiagnosis}
              onChangeText={(text) => setCurrentMember({...currentMember, ageAtDiagnosis: text})}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />

            <Text style={styles.inputLabel}>Additional Notes (optional)</Text>
            <TextInput
              style={[styles.textInput, styles.notesInput]}
              placeholder="Any other relevant details..."
              value={currentMember.additionalNotes}
              onChangeText={(text) => setCurrentMember({...currentMember, additionalNotes: text})}
              multiline
              placeholderTextColor="#9CA3AF"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.saveButton, !currentMember.relationship && styles.saveButtonDisabled]}
                onPress={handleSaveMember}
                disabled={!currentMember.relationship}
              >
                <Text style={styles.saveText}>Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    backgroundColor: '#5B4FCF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#0A0A0A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  membersSection: {
    marginBottom: 24,
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F2',
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberRelationship: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  memberDetail: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  memberNote: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#5B4FCF',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5B4FCF',
    marginLeft: 8,
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 34,
    backgroundColor: '#FAFAFA',
  },
  skipButton: {
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#6B7280',
  },
  continueButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5B4FCF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5B4FCF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E7',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0A0A0A',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 16,
  },
  relationshipScroll: {
    maxHeight: 40,
    marginBottom: 8,
  },
  relationshipChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    marginRight: 8,
  },
  relationshipChipActive: {
    backgroundColor: '#F0EDFF',
    borderColor: '#5B4FCF',
    borderWidth: 2,
  },
  relationshipChipText: {
    fontSize: 14,
    color: '#6B7280',
  },
  relationshipChipTextActive: {
    color: '#5B4FCF',
    fontWeight: '500',
  },
  typeScroll: {
    maxHeight: 40,
    marginBottom: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    marginRight: 8,
  },
  typeChipActive: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  typeChipText: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeChipTextActive: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
  textInput: {
    height: 48,
    backgroundColor: '#F7F7F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A0A0A',
  },
  notesInput: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5B4FCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#E5E5E7',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default FamilyHistoryDetailsScreen;