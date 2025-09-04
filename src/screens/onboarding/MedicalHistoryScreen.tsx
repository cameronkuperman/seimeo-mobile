import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'MedicalHistory'>;

// Medical clipboard icon
const MedicalIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Rect x="10" y="8" width="28" height="36" rx="2" fill={Colors.ocean} opacity={0.1} />
    <Rect x="18" y="4" width="12" height="8" rx="1" fill={Colors.ocean} opacity={0.3} />
    <Path
      d="M24 20V28M20 24H28"
      stroke={Colors.coral}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

// Heart icon for cardiovascular
const HeartIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M17.367 3.842a4.583 4.583 0 0 0-6.483 0L10 4.725l-.884-.883a4.583 4.583 0 0 0-6.483 6.483l.884.883L10 17.692l6.483-6.484.884-.883a4.583 4.583 0 0 0 0-6.483z"
      fill={Colors.coral}
      opacity={0.6}
    />
  </Svg>
);

// Lungs icon for respiratory
const LungsIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 7C5 7 3 8 3 10C3 12 5 14 6 14C7 14 8 13.5 8 12V9C8 8 7 7 6 7H5Z"
      fill={Colors.mint}
      opacity={0.6}
    />
    <Path
      d="M15 7C15 7 17 8 17 10C17 12 15 14 14 14C13 14 12 13.5 12 12V9C12 8 13 7 14 7H15Z"
      fill={Colors.mint}
      opacity={0.6}
    />
    <Rect x="9" y="5" width="2" height="8" rx="1" fill={Colors.mint} opacity={0.6} />
  </Svg>
);

// Brain icon for neurological
const BrainIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2C7 2 4 4 4 7C4 9 5 10 5 11C5 13 4 14 6 16C8 18 9 18 10 18C11 18 12 18 14 16C16 14 15 13 15 11C15 10 16 9 16 7C16 4 13 2 10 2Z"
      fill={Colors.lavender}
      opacity={0.6}
    />
  </Svg>
);

// Stomach icon for digestive
const StomachIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 3C8 3 7 4 7 6C7 8 6 9 6 11C6 13 7 15 9 16C10 16.5 11 16.5 12 16C14 15 15 13 15 11C15 9 14 8 14 6C14 4 13 3 10 3Z"
      fill={Colors.amber}
      opacity={0.6}
    />
  </Svg>
);

// Bone icon for musculoskeletal
const BoneIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7 7C8 6 8 4 6 4C4 4 4 6 5 7L13 15C12 16 12 18 14 18C16 18 16 16 15 15L7 7Z"
      fill={Colors.ocean}
      opacity={0.6}
    />
    <Circle cx="6" cy="6" r="2" fill={Colors.ocean} opacity={0.6} />
    <Circle cx="14" cy="14" r="2" fill={Colors.ocean} opacity={0.6} />
  </Svg>
);

// Kidney icon for renal
const KidneyIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M7 6C5 6 4 8 4 10C4 12 5 14 7 14C8 14 9 13 9 11V9C9 7 8 6 7 6Z"
      fill={Colors.lavender}
      opacity={0.6}
    />
    <Path
      d="M13 6C15 6 16 8 16 10C16 12 15 14 13 14C12 14 11 13 11 11V9C11 7 12 6 13 6Z"
      fill={Colors.lavender}
      opacity={0.6}
    />
  </Svg>
);

// Cell icon for cancer
const CellIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="6" fill={Colors.coral} opacity={0.3} />
    <Circle cx="10" cy="10" r="3" fill={Colors.coral} opacity={0.6} />
    <Circle cx="7" cy="8" r="1.5" fill={Colors.coral} opacity={0.4} />
    <Circle cx="13" cy="12" r="1.5" fill={Colors.coral} opacity={0.4} />
  </Svg>
);

// DNA icon for genetic/autoimmune
const DNAIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2C10 2 7 5 7 10C7 15 10 18 10 18M10 2C10 2 13 5 13 10C13 15 10 18 10 18"
      stroke={Colors.ocean}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M7 7H13M7 13H13"
      stroke={Colors.ocean}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Cholesterol icon
const CholesterolIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="5" fill={Colors.amber} opacity={0.3} />
    <Path
      d="M6 10C6 10 8 7 10 7C12 7 14 10 14 10C14 10 12 13 10 13C8 13 6 10 6 10Z"
      fill={Colors.amber}
      opacity={0.6}
    />
  </Svg>
);

// Pain icon
const PainIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 3L8 8L12 8L10 17L12 12L8 12L10 3Z"
      fill={Colors.coral}
      opacity={0.6}
    />
  </Svg>
);

interface Condition {
  id: string;
  name: string;
  category: string;
  icon: JSX.Element;
  color: string;
}

const commonConditions: Condition[] = [
  { id: 'hypertension', name: 'High Blood Pressure', category: 'Cardiovascular', icon: <HeartIcon />, color: Colors.coral },
  { id: 'high_cholesterol', name: 'High Cholesterol', category: 'Cardiovascular', icon: <CholesterolIcon />, color: Colors.amber },
  { id: 'diabetes', name: 'Diabetes', category: 'Metabolic', icon: <StomachIcon />, color: Colors.amber },
  { id: 'cancer_current', name: 'Cancer (Current)', category: 'Oncology', icon: <CellIcon />, color: Colors.coral },
  { id: 'cancer_past', name: 'Cancer (Past)', category: 'Oncology', icon: <CellIcon />, color: Colors.coral },
  { id: 'heart_disease', name: 'Heart Disease', category: 'Cardiovascular', icon: <HeartIcon />, color: Colors.coral },
  { id: 'stroke', name: 'Stroke', category: 'Cardiovascular', icon: <HeartIcon />, color: Colors.coral },
  { id: 'asthma', name: 'Asthma', category: 'Respiratory', icon: <LungsIcon />, color: Colors.mint },
  { id: 'copd', name: 'COPD', category: 'Respiratory', icon: <LungsIcon />, color: Colors.mint },
  { id: 'sleep_apnea', name: 'Sleep Apnea', category: 'Respiratory', icon: <LungsIcon />, color: Colors.mint },
  { id: 'anxiety', name: 'Anxiety', category: 'Mental Health', icon: <BrainIcon />, color: Colors.lavender },
  { id: 'depression', name: 'Depression', category: 'Mental Health', icon: <BrainIcon />, color: Colors.lavender },
  { id: 'arthritis', name: 'Arthritis', category: 'Musculoskeletal', icon: <BoneIcon />, color: Colors.ocean },
  { id: 'chronic_pain', name: 'Chronic Pain', category: 'Pain', icon: <PainIcon />, color: Colors.coral },
  { id: 'thyroid', name: 'Thyroid Disorder', category: 'Endocrine', icon: <StomachIcon />, color: Colors.amber },
  { id: 'pcos', name: 'PCOS', category: 'Endocrine', icon: <StomachIcon />, color: Colors.amber },
  { id: 'kidney', name: 'Kidney Disease', category: 'Renal', icon: <KidneyIcon />, color: Colors.lavender },
  { id: 'autoimmune', name: 'Autoimmune Disorder', category: 'Immune', icon: <DNAIcon />, color: Colors.ocean },
  { id: 'epilepsy', name: 'Epilepsy', category: 'Neurological', icon: <BrainIcon />, color: Colors.lavender },
  { id: 'ibs', name: 'IBS', category: 'Digestive', icon: <StomachIcon />, color: Colors.amber },
];

const MedicalHistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [selectedConditions, setSelectedConditions] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

  const conditionsNeedingDetails = [
    'cancer_current',
    'cancer_past',
    'diabetes',
    'heart_disease',
    'stroke',
    'autoimmune',
    'kidney',
    'arthritis',
    'thyroid'
  ];

  const handleContinue = () => {
    // Check if any selected conditions need details
    const needsDetails = Array.from(selectedConditions).some(id => 
      conditionsNeedingDetails.includes(id)
    );

    if (needsDetails) {
      // Navigate to details screen with selected conditions
      const selectedConditionData = commonConditions.filter(c => 
        selectedConditions.has(c.id) && conditionsNeedingDetails.includes(c.id)
      );
      navigation.navigate('MedicalHistoryDetails' as any, { 
        conditions: selectedConditionData 
      });
    } else {
      // Store medical history and navigate to next screen
      const nextScreen = getNextScreen('MedicalHistory');
      navigation.navigate(nextScreen as any);
    }
  };

  const filteredConditions = commonConditions.filter(condition =>
    condition.name.toLowerCase().includes(searchText.toLowerCase()) ||
    condition.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '45%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MedicalIcon />
            </View>
            <Text style={styles.title}>Your medical history</Text>
            <Text style={styles.subtitle}>
              Select any conditions you currently have or are being treated for
            </Text>
          </View>

          {/* Search Bar */}
          {showSearch && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search conditions..."
                placeholderTextColor={Colors.textTertiary}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
              <TouchableOpacity onPress={() => {
                setShowSearch(false);
                setSearchText('');
              }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* No Conditions Option */}
          <TouchableOpacity
            style={[
              styles.noConditionsCard,
              selectedConditions.size === 0 && styles.noConditionsCardSelected
            ]}
            onPress={() => setSelectedConditions(new Set())}
            activeOpacity={0.7}
          >
            <View style={styles.checkCircle}>
              {selectedConditions.size === 0 && (
                <Svg width={16} height={16} viewBox="0 0 16 16">
                  <Path
                    d="M4 8L7 11L13 5"
                    stroke={Colors.health}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </View>
            <Text style={styles.noConditionsText}>
              I don't have any chronic conditions
            </Text>
          </TouchableOpacity>

          {/* Condition Grid */}
          <View style={styles.conditionsGrid}>
            {filteredConditions.map((condition) => (
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
                <Text style={[
                  styles.conditionName,
                  selectedConditions.has(condition.id) && styles.conditionNameSelected
                ]}>
                  {condition.name}
                </Text>
                <Text style={styles.conditionCategory}>
                  {condition.category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add Other Button */}
          <TouchableOpacity
            style={styles.addOtherButton}
            onPress={() => setShowSearch(true)}
          >
            <Svg width={20} height={20} viewBox="0 0 20 20">
              <Circle cx="10" cy="10" r="9" fill={Colors.borderLight} />
              <Path
                d="M10 6V14M6 10H14"
                stroke={Colors.textSecondary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.addOtherText}>Add other condition</Text>
          </TouchableOpacity>

          {/* Info Message */}
          {selectedConditions.size > 0 && (
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                This helps us provide personalized health recommendations and check for medication interactions
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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
    paddingBottom: 100,
  },
  progressContainer: {
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: 32,
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
  iconContainer: {
    marginBottom: 20,
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
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.ocean,
    marginLeft: 12,
  },
  noConditionsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.borderLight,
  },
  noConditionsCardSelected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '08',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  noConditionsText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  conditionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
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
    transform: [{ scale: 1.02 }],
  },
  conditionIcon: {
    marginBottom: 8,
  },
  conditionName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  conditionNameSelected: {
    color: Colors.textPrimary,
  },
  conditionCategory: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  addOtherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addOtherText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: Colors.ocean + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    backgroundColor: Colors.background,
  },
  continueButton: {
    width: '100%',
  },
});

export default MedicalHistoryScreen;