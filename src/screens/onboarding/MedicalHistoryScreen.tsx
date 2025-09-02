import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'MedicalHistory'>;

interface Condition {
  id: string;
  name: string;
  selected: boolean;
}

const MedicalHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 'diabetes', name: 'Diabetes', selected: false },
    { id: 'high_bp', name: 'High blood pressure', selected: false },
    { id: 'heart_disease', name: 'Heart disease', selected: false },
    { id: 'cancer', name: 'Cancer', selected: false },
    { id: 'asthma', name: 'Asthma', selected: false },
    { id: 'mental_health', name: 'Mental health condition', selected: false },
    { id: 'none', name: 'None of these', selected: false },
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [customCondition, setCustomCondition] = useState('');

  const toggleCondition = (id: string) => {
    if (id === 'none') {
      // If "None" is selected, deselect all others
      setConditions(conditions.map(c => ({
        ...c,
        selected: c.id === 'none' ? !c.selected : false
      })));
    } else {
      // If any condition is selected, deselect "None"
      setConditions(conditions.map(c => ({
        ...c,
        selected: c.id === id ? !c.selected : (c.id === 'none' ? false : c.selected)
      })));
    }
  };

  const addCustomCondition = () => {
    if (customCondition.trim()) {
      const newCondition: Condition = {
        id: `custom_${Date.now()}`,
        name: customCondition.trim(),
        selected: true
      };
      
      // Add new condition and deselect "None"
      setConditions(conditions.map(c => 
        c.id === 'none' ? { ...c, selected: false } : c
      ).concat(newCondition));
      
      setCustomCondition('');
      setShowAddModal(false);
    }
  };

  const handleContinue = () => {
    // Store selected conditions and navigate
    const selectedConditions = conditions.filter(c => c.selected && c.id !== 'none');
    
    // Navigate to next screen based on selected path
    const nextScreen = getNextScreen('MedicalHistory');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Any of these run in your family?</Text>
          <Text style={styles.subtitle}>
            This helps our AI understand your health risks
          </Text>
        </View>

        {/* Conditions List */}
        <View style={styles.conditionsContainer}>
          {conditions.map((condition) => (
            <TouchableOpacity
              key={condition.id}
              style={styles.conditionItem}
              onPress={() => toggleCondition(condition.id)}
              activeOpacity={0.7}
            >
              <View style={styles.checkboxContainer}>
                <View style={[
                  styles.checkbox,
                  condition.selected && styles.checkboxSelected
                ]}>
                  {condition.selected && (
                    <View style={styles.checkmark} />
                  )}
                </View>
                <Text style={[
                  styles.conditionText,
                  condition.id === 'none' && styles.noneText
                ]}>
                  {condition.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Add Custom Condition */}
          <TouchableOpacity
            style={styles.addConditionButton}
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.addConditionText}>+ Add other condition</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="large"
            onPress={handleContinue}
            style={styles.continueButton}
          >
            Continue
          </Button>
        </View>
      </ScrollView>

      {/* Add Condition Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a condition</Text>
            <TextInput
              style={styles.modalInput}
              value={customCondition}
              onChangeText={setCustomCondition}
              placeholder="Enter condition name"
              placeholderTextColor={Colors.textPlaceholder}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={addCustomCondition}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setShowAddModal(false);
                  setCustomCondition('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={addCustomCondition}
              >
                <Text style={styles.modalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 2,
    backgroundColor: Colors.borderLight,
    borderRadius: 1,
  },
  progressFill: {
    height: 2,
    backgroundColor: Colors.health,
    borderRadius: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  conditionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  conditionItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.health,
    borderColor: Colors.health,
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  conditionText: {
    fontSize: 17,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  noneText: {
    color: Colors.textSecondary,
  },
  addConditionButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  addConditionText: {
    fontSize: 17,
    color: Colors.health,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
  },
  continueButton: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    height: 56,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colors.backgroundSecondary,
  },
  modalCancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  modalAddButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colors.black,
  },
  modalAddText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default MedicalHistoryScreen;