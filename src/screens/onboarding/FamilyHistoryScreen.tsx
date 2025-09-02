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
import Svg, { Path, Circle, G, Rect } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'FamilyHistory'>;

// Family tree icon
const FamilyTreeIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Circle cx="16" cy="8" r="3" fill={Colors.lavender} opacity={0.8} />
    <Circle cx="8" cy="20" r="3" fill={Colors.ocean} opacity={0.8} />
    <Circle cx="24" cy="20" r="3" fill={Colors.ocean} opacity={0.8} />
    <Path
      d="M16 11V14M16 14H8V17M16 14H24V17"
      stroke={Colors.textSecondary}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Heart icon for cardiovascular
const HeartIcon = ({ color = Colors.coral }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={color}
      opacity={0.3}
    />
  </Svg>
);

// DNA icon for genetic
const DNAIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22M12 2C12 2 16 6 16 12C16 18 12 22 12 22"
      stroke={Colors.lavender}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M8 8H16M8 16H16"
      stroke={Colors.lavender}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Brain icon for neurological
const BrainIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8 2 5 5 5 9C5 11 6 12 6 14C6 16 5 18 7 20C9 22 11 22 12 22C13 22 15 22 17 20C19 18 18 16 18 14C18 12 19 11 19 9C19 5 16 2 12 2Z"
      fill={Colors.ocean}
      opacity={0.3}
    />
    <Path
      d="M9 9C9 9 10 10 12 10C14 10 15 9 15 9"
      stroke={Colors.ocean}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Lung icon for respiratory
const LungIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 8C6 8 4 9 4 12C4 15 6 18 8 18C9 18 10 17.5 10 16V10C10 9 9 8 8 8H6Z"
      fill={Colors.mint}
      opacity={0.3}
    />
    <Path
      d="M18 8C18 8 20 9 20 12C20 15 18 18 16 18C15 18 14 17.5 14 16V10C14 9 15 8 16 8H18Z"
      fill={Colors.mint}
      opacity={0.3}
    />
    <Rect x="11" y="6" width="2" height="10" rx="1" fill={Colors.mint} />
  </Svg>
);

// Sugar cube icon for diabetes
const SugarIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="6" width="12" height="12" rx="2" fill={Colors.amber} opacity={0.3} />
    <Circle cx="10" cy="10" r="1" fill={Colors.amber} />
    <Circle cx="14" cy="10" r="1" fill={Colors.amber} />
    <Circle cx="10" cy="14" r="1" fill={Colors.amber} />
    <Circle cx="14" cy="14" r="1" fill={Colors.amber} />
  </Svg>
);

// Cell icon for cancer
const CellIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" fill={Colors.coral} opacity={0.3} />
    <Circle cx="12" cy="12" r="3" fill={Colors.coral} opacity={0.6} />
    <Circle cx="8" cy="10" r="1.5" fill={Colors.coral} opacity={0.4} />
    <Circle cx="16" cy="14" r="1.5" fill={Colors.coral} opacity={0.4} />
  </Svg>
);

interface FamilyCondition {
  id: string;
  name: string;
  icon: JSX.Element;
  category: string;
  color: string;
}

const familyConditions: FamilyCondition[] = [
  { id: 'heart_disease', name: 'Heart Disease', icon: <HeartIcon />, category: 'Cardiovascular', color: Colors.coral },
  { id: 'diabetes', name: 'Diabetes', icon: <SugarIcon />, category: 'Metabolic', color: Colors.amber },
  { id: 'cancer', name: 'Cancer', icon: <CellIcon />, category: 'Oncology', color: Colors.coral },
  { id: 'hypertension', name: 'High Blood Pressure', icon: <HeartIcon color={Colors.coral} />, category: 'Cardiovascular', color: Colors.coral },
  { id: 'alzheimers', name: "Alzheimer's", icon: <BrainIcon />, category: 'Neurological', color: Colors.ocean },
  { id: 'asthma', name: 'Asthma', icon: <LungIcon />, category: 'Respiratory', color: Colors.mint },
  { id: 'depression', name: 'Depression', icon: <BrainIcon />, category: 'Mental Health', color: Colors.ocean },
  { id: 'stroke', name: 'Stroke', icon: <HeartIcon color={Colors.coral} />, category: 'Cardiovascular', color: Colors.coral },
];

const FamilyHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(new Set());
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [otherCondition, setOtherCondition] = useState('');
  const [customConditions, setCustomConditions] = useState<string[]>([]);

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(conditionId)) {
        newSet.delete(conditionId);
      } else {
        newSet.add(conditionId);
      }
      return newSet;
    });
  };

  const handleAddOther = () => {
    if (otherCondition.trim()) {
      setCustomConditions([...customConditions, otherCondition.trim()]);
      setOtherCondition('');
      setShowOtherModal(false);
    }
  };

  const handleContinue = () => {
    // Store family history and navigate
    const nextScreen = getNextScreen('FamilyHistory');
    navigation.navigate(nextScreen as any);
  };

  const handleSkip = () => {
    const nextScreen = getNextScreen('FamilyHistory');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '90%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <FamilyTreeIcon />
              <Text style={styles.title}>Family medical history</Text>
            </View>
            <Text style={styles.subtitle}>
              Select conditions that run in your immediate family
            </Text>
            <Text style={styles.note}>
              This helps us identify potential genetic risks
            </Text>
          </View>

          {/* Condition Cards */}
          <View style={styles.conditionsContainer}>
            {familyConditions.map((condition) => (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.conditionCard,
                  selectedConditions.has(condition.id) && styles.conditionCardSelected,
                  selectedConditions.has(condition.id) && { borderColor: condition.color }
                ]}
                onPress={() => toggleCondition(condition.id)}
                activeOpacity={0.7}
              >
                <View style={styles.conditionIcon}>
                  {condition.icon}
                </View>
                <View style={styles.conditionInfo}>
                  <Text style={[
                    styles.conditionName,
                    selectedConditions.has(condition.id) && styles.conditionNameSelected
                  ]}>
                    {condition.name}
                  </Text>
                  <Text style={styles.conditionCategory}>
                    {condition.category}
                  </Text>
                </View>
                {selectedConditions.has(condition.id) && (
                  <View style={[styles.checkCircle, { backgroundColor: condition.color }]}>
                    <Svg width={16} height={16} viewBox="0 0 16 16">
                      <Path
                        d="M4 8L7 11L13 5"
                        stroke={Colors.white}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                )}
              </TouchableOpacity>
            ))}

            {/* Custom conditions */}
            {customConditions.map((condition, index) => (
              <View key={`custom-${index}`} style={[styles.conditionCard, styles.customConditionCard]}>
                <View style={styles.conditionIcon}>
                  <DNAIcon />
                </View>
                <View style={styles.conditionInfo}>
                  <Text style={styles.conditionName}>{condition}</Text>
                  <Text style={styles.conditionCategory}>Custom</Text>
                </View>
              </View>
            ))}

            {/* Add Other Button */}
            <TouchableOpacity
              style={styles.addOtherButton}
              onPress={() => setShowOtherModal(true)}
            >
              <View style={styles.addOtherIcon}>
                <Svg width={24} height={24} viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="10" fill={Colors.borderLight} />
                  <Path
                    d="M12 8V16M8 12H16"
                    stroke={Colors.textSecondary}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <Text style={styles.addOtherText}>Add other condition</Text>
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          {selectedConditions.size > 0 && (
            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <DNAIcon />
              </View>
              <Text style={styles.infoText}>
                We'll use this information to provide personalized risk assessments and preventive care recommendations
              </Text>
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="large"
              onPress={handleContinue}
              style={styles.continueButton}
            >
              Continue
            </Button>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>Skip this step</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Add Other Modal */}
      <Modal
        visible={showOtherModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOtherModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add family condition</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter condition name"
              placeholderTextColor={Colors.textTertiary}
              value={otherCondition}
              onChangeText={setOtherCondition}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowOtherModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleAddOther}
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
    paddingBottom: 40,
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 8,
  },
  note: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  conditionsContainer: {
    marginBottom: 24,
  },
  conditionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  conditionCardSelected: {
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  customConditionCard: {
    borderColor: Colors.lavender,
    borderWidth: 1.5,
  },
  conditionIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  conditionInfo: {
    flex: 1,
  },
  conditionName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  conditionNameSelected: {
    color: Colors.textPrimary,
  },
  conditionCategory: {
    fontSize: 13,
    color: Colors.textTertiary,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addOtherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addOtherIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addOtherText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lavender + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  continueButton: {
    width: '100%',
    marginBottom: 16,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textTertiary,
    textAlign: 'center',
    padding: 12,
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
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default FamilyHistoryScreen;