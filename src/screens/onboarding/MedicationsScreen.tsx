import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Medications'>;

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time?: string;
}

// Pill icon
const PillIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect
      x="4"
      y="8"
      width="16"
      height="8"
      rx="4"
      fill={Colors.health}
      opacity={0.2}
    />
    <Path
      d="M8 8V16M8 8C8 6 10 4 12 4C14 4 16 6 16 8M8 16C8 18 10 20 12 20C14 20 16 18 16 16"
      stroke={Colors.health}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Search icon
const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle
      cx="9"
      cy="9"
      r="6"
      stroke={Colors.textTertiary}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M13 13L17 17"
      stroke={Colors.textTertiary}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Common medications list
const commonMedications = [
  'Metformin',
  'Lisinopril',
  'Atorvastatin',
  'Levothyroxine',
  'Metoprolol',
  'Amlodipine',
  'Omeprazole',
  'Losartan',
  'Simvastatin',
  'Albuterol',
];

const MedicationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [noMedications, setNoMedications] = useState(false);

  const filteredSuggestions = commonMedications.filter(med =>
    med.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMedication = () => {
    if (medicationName.trim() && dosage.trim()) {
      const newMedication: Medication = {
        id: Date.now().toString(),
        name: medicationName,
        dosage: dosage,
        frequency: frequency === 'once' ? 'Once daily' :
                  frequency === 'twice' ? 'Twice daily' :
                  frequency === 'three' ? 'Three times daily' : 'As needed',
      };
      
      setMedications([...medications, newMedication]);
      setNoMedications(false);
      
      // Reset form
      setMedicationName('');
      setDosage('');
      setFrequency('once');
      setSearchQuery('');
      setShowAddModal(false);
    }
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleNoMedications = () => {
    setNoMedications(true);
    setMedications([]);
  };

  const handleContinue = () => {
    // Navigate to next screen based on path
    const nextScreen = getNextScreen('Medications');
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
            <View style={[styles.progressFill, { width: '55%' }]} />
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What medications do you take?</Text>
          <Text style={styles.subtitle}>
            Include prescriptions and supplements
          </Text>
        </View>

        {/* Medications List */}
        {medications.length > 0 && (
          <View style={styles.medicationsContainer}>
            <Text style={styles.sectionTitle}>Your medications</Text>
            {medications.map((medication) => (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationIcon}>
                  <PillIcon />
                </View>
                <View style={styles.medicationInfo}>
                  <Text style={styles.medicationName}>{medication.name}</Text>
                  <Text style={styles.medicationDetails}>
                    {medication.dosage} • {medication.frequency}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveMedication(medication.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Add Medication Button */}
        {!noMedications && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+ Add Medication</Text>
          </TouchableOpacity>
        )}

        {/* No Medications Option */}
        {medications.length === 0 && !noMedications && (
          <TouchableOpacity
            style={styles.noMedicationsButton}
            onPress={handleNoMedications}
            activeOpacity={0.7}
          >
            <Text style={styles.noMedicationsText}>I don't take any medications</Text>
          </TouchableOpacity>
        )}

        {/* Selected No Medications */}
        {noMedications && (
          <View style={styles.noMedicationsCard}>
            <Text style={styles.noMedicationsSelectedText}>
              ✓ No medications selected
            </Text>
            <TouchableOpacity
              onPress={() => setNoMedications(false)}
              style={styles.changeMindButton}
            >
              <Text style={styles.changeMindText}>Add medication</Text>
            </TouchableOpacity>
          </View>
        )}

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

      {/* Add Medication Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Medication</Text>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <SearchIcon />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setMedicationName(text);
                }}
                placeholder="Search medications..."
                placeholderTextColor={Colors.textPlaceholder}
                autoFocus
              />
            </View>

            {/* Common Medications */}
            {searchQuery.length > 0 && filteredSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredSuggestions.slice(0, 3).map((med) => (
                  <TouchableOpacity
                    key={med}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setMedicationName(med);
                      setSearchQuery(med);
                    }}
                  >
                    <Text style={styles.suggestionText}>{med}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Dosage Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dosage</Text>
              <TextInput
                style={styles.modalInput}
                value={dosage}
                onChangeText={setDosage}
                placeholder="e.g., 500mg"
                placeholderTextColor={Colors.textPlaceholder}
              />
            </View>

            {/* Frequency Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>How often?</Text>
              <View style={styles.frequencyOptions}>
                {[
                  { value: 'once', label: 'Once daily' },
                  { value: 'twice', label: 'Twice daily' },
                  { value: 'three', label: '3 times' },
                  { value: 'needed', label: 'As needed' },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.frequencyOption,
                      frequency === option.value && styles.frequencyOptionSelected
                    ]}
                    onPress={() => setFrequency(option.value)}
                  >
                    <Text style={[
                      styles.frequencyText,
                      frequency === option.value && styles.frequencyTextSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setShowAddModal(false);
                  setSearchQuery('');
                  setMedicationName('');
                  setDosage('');
                  setFrequency('once');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalAddButton,
                  (!medicationName || !dosage) && styles.modalAddButtonDisabled
                ]}
                onPress={handleAddMedication}
                disabled={!medicationName || !dosage}
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
  medicationsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  medicationIcon: {
    marginRight: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    fontSize: 24,
    color: Colors.textTertiary,
  },
  addButton: {
    backgroundColor: Colors.health + '10',
    borderWidth: 2,
    borderColor: Colors.health,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.health,
  },
  noMedicationsButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  noMedicationsText: {
    fontSize: 17,
    color: Colors.textSecondary,
  },
  noMedicationsCard: {
    backgroundColor: Colors.mint + '10',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  noMedicationsSelectedText: {
    fontSize: 17,
    color: Colors.mint,
    fontWeight: '600',
    marginBottom: 8,
  },
  changeMindButton: {
    paddingVertical: 4,
  },
  changeMindText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 17,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  suggestionsContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    marginBottom: 20,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  suggestionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalInput: {
    height: 48,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  frequencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  frequencyOptionSelected: {
    backgroundColor: Colors.health + '20',
    borderColor: Colors.health,
  },
  frequencyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  frequencyTextSelected: {
    color: Colors.health,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
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
  modalAddButtonDisabled: {
    backgroundColor: Colors.borderMedium,
  },
  modalAddText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default MedicationsScreen;