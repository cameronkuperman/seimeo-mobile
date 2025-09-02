import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect, G, Ellipse } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Allergies'>;

// Alert icon
const AlertIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Path
      d="M16 4L2 28H30L16 4Z"
      fill={Colors.coral + '20'}
      stroke={Colors.coral}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path
      d="M16 12V18M16 22V23"
      stroke={Colors.coral}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Food icon
const FoodIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={Colors.amber + '30'} />
    <Path
      d="M8 12C8 12 10 8 12 8C14 8 16 12 16 12C16 12 14 16 12 16C10 16 8 12 8 12Z"
      fill={Colors.amber}
    />
  </Svg>
);

// Pill icon for medications
const PillIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect
      x="8" y="6" width="8" height="12" rx="4"
      fill={Colors.lavender + '30'}
      stroke={Colors.lavender}
      strokeWidth="1.5"
    />
    <Path d="M8 12H16" stroke={Colors.lavender} strokeWidth="1.5" />
  </Svg>
);

// Tree/pollen icon for environmental
const EnvironmentIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8 2 5 5 5 9C5 13 12 22 12 22C12 22 19 13 19 9C19 5 16 2 12 2Z"
      fill={Colors.mint + '30'}
      stroke={Colors.mint}
      strokeWidth="1.5"
    />
    <Path
      d="M12 9V15"
      stroke={Colors.mint}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Severity indicator
const SeverityIndicator = ({ level }: { level: 'mild' | 'moderate' | 'severe' }) => {
  const color = level === 'mild' ? Colors.health : level === 'moderate' ? Colors.amber : Colors.coral;
  return (
    <View style={styles.severityContainer}>
      <Circle cx="4" cy="4" r="3" fill={color} />
      {(level === 'moderate' || level === 'severe') && (
        <Circle cx="12" cy="4" r="3" fill={color} opacity={level === 'moderate' ? 0.5 : 1} />
      )}
      {level === 'severe' && (
        <Circle cx="20" cy="4" r="3" fill={color} />
      )}
    </View>
  );
};

interface Allergy {
  id: string;
  name: string;
  category: 'food' | 'medication' | 'environmental' | 'other';
  severity: 'mild' | 'moderate' | 'severe';
  reaction?: string;
}

const commonAllergies = {
  food: ['Peanuts', 'Tree nuts', 'Milk', 'Eggs', 'Shellfish', 'Fish', 'Wheat', 'Soy'],
  medication: ['Penicillin', 'Aspirin', 'Ibuprofen', 'Sulfa drugs', 'Morphine', 'Anesthesia'],
  environmental: ['Pollen', 'Dust mites', 'Pet dander', 'Mold', 'Latex', 'Insect stings'],
};

const AllergiesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'food' | 'medication' | 'environmental' | 'other'>('food');
  const [customAllergy, setCustomAllergy] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [reaction, setReaction] = useState('');
  const [noAllergies, setNoAllergies] = useState(false);

  const handleQuickAdd = (name: string, category: 'food' | 'medication' | 'environmental') => {
    const newAllergy: Allergy = {
      id: Date.now().toString(),
      name,
      category,
      severity: 'moderate',
    };
    setAllergies([...allergies, newAllergy]);
    setNoAllergies(false);
  };

  const handleAddCustom = () => {
    if (customAllergy.trim()) {
      const newAllergy: Allergy = {
        id: Date.now().toString(),
        name: customAllergy.trim(),
        category: selectedCategory,
        severity: selectedSeverity,
        reaction: reaction.trim(),
      };
      setAllergies([...allergies, newAllergy]);
      setCustomAllergy('');
      setReaction('');
      setShowAddModal(false);
      setNoAllergies(false);
    }
  };

  const handleRemove = (id: string) => {
    setAllergies(allergies.filter(a => a.id !== id));
  };

  const handleNoAllergies = () => {
    setNoAllergies(true);
    setAllergies([]);
  };

  const handleContinue = () => {
    const nextScreen = getNextScreen('Allergies');
    navigation.navigate(nextScreen as any);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <FoodIcon />;
      case 'medication': return <PillIcon />;
      case 'environmental': return <EnvironmentIcon />;
      default: return <AlertIcon />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <AlertIcon />
            <Text style={styles.title}>Do you have any allergies?</Text>
            <Text style={styles.subtitle}>
              This is critical for your safety
            </Text>
          </View>

          {/* Selected Allergies */}
          {allergies.length > 0 && (
            <View style={styles.selectedContainer}>
              <Text style={styles.sectionTitle}>Your allergies</Text>
              {allergies.map((allergy) => (
                <View key={allergy.id} style={styles.allergyCard}>
                  <View style={styles.allergyIcon}>
                    {getCategoryIcon(allergy.category)}
                  </View>
                  <View style={styles.allergyInfo}>
                    <Text style={styles.allergyName}>{allergy.name}</Text>
                    <View style={styles.allergyMeta}>
                      <Text style={styles.allergyCategory}>
                        {allergy.category.charAt(0).toUpperCase() + allergy.category.slice(1)}
                      </Text>
                      <Text style={styles.allergySeverity}>
                        {allergy.severity}
                      </Text>
                    </View>
                    {allergy.reaction && (
                      <Text style={styles.allergyReaction}>{allergy.reaction}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(allergy.id)}
                  >
                    <Svg width={20} height={20} viewBox="0 0 20 20">
                      <Path
                        d="M5 5L15 15M5 15L15 5"
                        stroke={Colors.textTertiary}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Quick Add Categories */}
          {!noAllergies && (
            <View style={styles.categoriesContainer}>
              {/* Food Allergies */}
              <View style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <FoodIcon />
                  <Text style={styles.categoryTitle}>Food</Text>
                </View>
                <View style={styles.quickAddGrid}>
                  {commonAllergies.food.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.quickAddButton,
                        allergies.some(a => a.name === item) && styles.quickAddButtonSelected
                      ]}
                      onPress={() => !allergies.some(a => a.name === item) && handleQuickAdd(item, 'food')}
                      disabled={allergies.some(a => a.name === item)}
                    >
                      <Text style={[
                        styles.quickAddText,
                        allergies.some(a => a.name === item) && styles.quickAddTextSelected
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Medication Allergies */}
              <View style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <PillIcon />
                  <Text style={styles.categoryTitle}>Medications</Text>
                </View>
                <View style={styles.quickAddGrid}>
                  {commonAllergies.medication.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.quickAddButton,
                        allergies.some(a => a.name === item) && styles.quickAddButtonSelected
                      ]}
                      onPress={() => !allergies.some(a => a.name === item) && handleQuickAdd(item, 'medication')}
                      disabled={allergies.some(a => a.name === item)}
                    >
                      <Text style={[
                        styles.quickAddText,
                        allergies.some(a => a.name === item) && styles.quickAddTextSelected
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Environmental Allergies */}
              <View style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <EnvironmentIcon />
                  <Text style={styles.categoryTitle}>Environmental</Text>
                </View>
                <View style={styles.quickAddGrid}>
                  {commonAllergies.environmental.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.quickAddButton,
                        allergies.some(a => a.name === item) && styles.quickAddButtonSelected
                      ]}
                      onPress={() => !allergies.some(a => a.name === item) && handleQuickAdd(item, 'environmental')}
                      disabled={allergies.some(a => a.name === item)}
                    >
                      <Text style={[
                        styles.quickAddText,
                        allergies.some(a => a.name === item) && styles.quickAddTextSelected
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Add Custom Button */}
          {!noAllergies && (
            <TouchableOpacity
              style={styles.addCustomButton}
              onPress={() => setShowAddModal(true)}
            >
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="10" fill={Colors.coral + '20'} />
                <Path
                  d="M12 8V16M8 12H16"
                  stroke={Colors.coral}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={styles.addCustomText}>Add other allergy</Text>
            </TouchableOpacity>
          )}

          {/* No Allergies Option */}
          {allergies.length === 0 && !noAllergies && (
            <TouchableOpacity
              style={styles.noAllergiesButton}
              onPress={handleNoAllergies}
            >
              <Text style={styles.noAllergiesText}>No known allergies</Text>
            </TouchableOpacity>
          )}

          {/* No Allergies Confirmation */}
          {noAllergies && (
            <View style={styles.noAllergiesCard}>
              <Svg width={48} height={48} viewBox="0 0 48 48">
                <Circle cx="24" cy="24" r="20" fill={Colors.health + '20'} />
                <Path
                  d="M16 24L21 29L32 18"
                  stroke={Colors.health}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.noAllergiesConfirmText}>No known allergies recorded</Text>
              <TouchableOpacity onPress={() => setNoAllergies(false)}>
                <Text style={styles.changeText}>Change</Text>
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
        </View>
      </ScrollView>

      {/* Add Custom Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Allergy</Text>

            {/* Category Selection */}
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoryButtons}>
              {(['food', 'medication', 'environmental', 'other'] as const).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.categoryButtonSelected
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === cat && styles.categoryButtonTextSelected
                  ]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Allergy Name */}
            <Text style={styles.fieldLabel}>Allergy</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter allergy name"
              placeholderTextColor={Colors.textTertiary}
              value={customAllergy}
              onChangeText={setCustomAllergy}
            />

            {/* Severity */}
            <Text style={styles.fieldLabel}>Severity</Text>
            <View style={styles.severityButtons}>
              {(['mild', 'moderate', 'severe'] as const).map((sev) => (
                <TouchableOpacity
                  key={sev}
                  style={[
                    styles.severityButton,
                    selectedSeverity === sev && styles.severityButtonSelected
                  ]}
                  onPress={() => setSelectedSeverity(sev)}
                >
                  <Text style={[
                    styles.severityButtonText,
                    selectedSeverity === sev && styles.severityButtonTextSelected
                  ]}>
                    {sev.charAt(0).toUpperCase() + sev.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Reaction (optional) */}
            <Text style={styles.fieldLabel}>Reaction (optional)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Hives, difficulty breathing"
              placeholderTextColor={Colors.textTertiary}
              value={reaction}
              onChangeText={setReaction}
            />

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleAddCustom}
              >
                <Text style={styles.modalButtonText}>Add</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressContainer: {
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 30,
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
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  selectedContainer: {
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
  allergyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.coral + '30',
  },
  allergyIcon: {
    marginRight: 12,
  },
  allergyInfo: {
    flex: 1,
  },
  allergyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  allergyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allergyCategory: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  allergySeverity: {
    fontSize: 13,
    color: Colors.coral,
    fontWeight: '600',
  },
  allergyReaction: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  removeButton: {
    padding: 4,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  quickAddButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    margin: 4,
    backgroundColor: Colors.white,
  },
  quickAddButtonSelected: {
    backgroundColor: Colors.coral + '10',
    borderColor: Colors.coral,
  },
  quickAddText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quickAddTextSelected: {
    color: Colors.coral,
    fontWeight: '600',
  },
  addCustomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.coral,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  addCustomText: {
    fontSize: 16,
    color: Colors.coral,
    fontWeight: '600',
    marginLeft: 8,
  },
  noAllergiesButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.health + '20',
    marginBottom: 16,
  },
  noAllergiesText: {
    fontSize: 15,
    color: Colors.health,
    fontWeight: '600',
  },
  noAllergiesCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.health + '30',
  },
  noAllergiesConfirmText: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  changeText: {
    fontSize: 14,
    color: Colors.textTertiary,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
  },
  continueButton: {
    width: '100%',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 16,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    margin: 4,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.coral + '10',
    borderColor: Colors.coral,
  },
  categoryButtonText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  categoryButtonTextSelected: {
    color: Colors.coral,
    fontWeight: '600',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  severityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginHorizontal: 4,
  },
  severityButtonSelected: {
    backgroundColor: Colors.coral + '10',
    borderColor: Colors.coral,
  },
  severityButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  severityButtonTextSelected: {
    color: Colors.coral,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 6,
  },
  modalButtonPrimary: {
    backgroundColor: Colors.black,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

export default AllergiesScreen;