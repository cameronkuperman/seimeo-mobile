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
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Hospitalizations'>;

// Hospital icon
const HospitalIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Rect x="6" y="8" width="20" height="20" rx="2" fill={Colors.coral + '20'} />
    <Rect x="14" y="12" width="4" height="12" fill={Colors.coral} />
    <Rect x="10" y="16" width="12" height="4" fill={Colors.coral} />
  </Svg>
);

// Surgery icon (scalpel)
const SurgeryIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4L14 10L10 14L4 20C4 20 6 18 8 16L14 10L20 4Z"
      stroke={Colors.ocean}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Circle cx="19" cy="5" r="2" fill={Colors.ocean} opacity={0.3} />
  </Svg>
);

// Emergency icon
const EmergencyIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L14.09 8.26L20.9 8.27L15.81 12.14L17.89 18.41L12 14.54L6.11 18.41L8.19 12.14L3.1 8.27L9.91 8.26L12 2Z"
      fill={Colors.coral}
      opacity={0.3}
    />
  </Svg>
);

// Calendar icon
const CalendarIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Rect x="2" y="4" width="12" height="10" rx="1" stroke={Colors.textTertiary} strokeWidth="1" />
    <Path d="M5 2V5M11 2V5" stroke={Colors.textTertiary} strokeWidth="1" strokeLinecap="round" />
    <Path d="M2 7H14" stroke={Colors.textTertiary} strokeWidth="1" />
  </Svg>
);

interface Hospitalization {
  id: string;
  type: 'surgery' | 'emergency' | 'stay';
  reason: string;
  year: string;
  outcome?: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

const HospitalizationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Hospitalization, 'id'>>({
    type: 'surgery',
    reason: '',
    year: currentYear.toString(),
    outcome: '',
  });

  const handleAdd = () => {
    setFormData({
      type: 'surgery',
      reason: '',
      year: currentYear.toString(),
      outcome: '',
    });
    setEditingId(null);
    setShowAddModal(true);
  };

  const handleEdit = (hosp: Hospitalization) => {
    setFormData({
      type: hosp.type,
      reason: hosp.reason,
      year: hosp.year,
      outcome: hosp.outcome,
    });
    setEditingId(hosp.id);
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (formData.reason.trim()) {
      if (editingId) {
        setHospitalizations(hospitalizations.map(h => 
          h.id === editingId 
            ? { ...formData, id: editingId }
            : h
        ));
      } else {
        const newHosp: Hospitalization = {
          ...formData,
          id: Date.now().toString(),
        };
        setHospitalizations([...hospitalizations, newHosp]);
      }
      setShowAddModal(false);
    }
  };

  const handleDelete = (id: string) => {
    setHospitalizations(hospitalizations.filter(h => h.id !== id));
  };

  const handleContinue = () => {
    const nextScreen = getNextScreen('Hospitalizations');
    navigation.navigate(nextScreen as any);
  };

  const handleSkip = () => {
    const nextScreen = getNextScreen('Hospitalizations');
    navigation.navigate(nextScreen as any);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'surgery': return <SurgeryIcon />;
      case 'emergency': return <EmergencyIcon />;
      default: return <HospitalIcon />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'surgery': return 'Surgery';
      case 'emergency': return 'Emergency';
      default: return 'Hospital Stay';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '35%' }]} />
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <HospitalIcon />
            </View>
            <Text style={styles.title}>Any surgeries or hospital stays?</Text>
            <Text style={styles.subtitle}>
              This helps us understand your medical history
            </Text>
          </View>

          {/* Hospitalizations List */}
          {hospitalizations.length > 0 && (
            <View style={styles.listContainer}>
              {hospitalizations.map((hosp) => (
                <TouchableOpacity
                  key={hosp.id}
                  style={styles.hospCard}
                  onPress={() => handleEdit(hosp)}
                  activeOpacity={0.7}
                >
                  <View style={styles.hospIcon}>
                    {getTypeIcon(hosp.type)}
                  </View>
                  <View style={styles.hospInfo}>
                    <Text style={styles.hospTitle}>{hosp.reason}</Text>
                    <View style={styles.hospMeta}>
                      <Text style={styles.hospType}>{getTypeLabel(hosp.type)}</Text>
                      <Text style={styles.hospYear}>{hosp.year}</Text>
                    </View>
                    {hosp.outcome && (
                      <Text style={styles.hospOutcome}>{hosp.outcome}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(hosp.id)}
                  >
                    <Path
                      d="M6 6L14 14M6 14L14 6"
                      stroke={Colors.textTertiary}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Add Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            activeOpacity={0.7}
          >
            <View style={styles.addIcon}>
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="10" fill={Colors.health + '20'} />
                <Path
                  d="M12 8V16M8 12H16"
                  stroke={Colors.health}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <Text style={styles.addText}>
              {hospitalizations.length === 0 ? 'Add surgery or hospital stay' : 'Add another'}
            </Text>
          </TouchableOpacity>

          {/* No History Option */}
          {hospitalizations.length === 0 && (
            <View style={styles.noHistoryContainer}>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity
                style={styles.noHistoryButton}
                onPress={handleSkip}
                activeOpacity={0.7}
              >
                <Text style={styles.noHistoryText}>I haven't had any surgeries or hospital stays</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Continue Button */}
          {hospitalizations.length > 0 && (
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
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingId ? 'Edit Entry' : 'Add Surgery or Hospital Stay'}
            </Text>

            {/* Type Selection */}
            <Text style={styles.fieldLabel}>Type</Text>
            <View style={styles.typeSelection}>
              {(['surgery', 'emergency', 'stay'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    formData.type === type && styles.typeButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, type })}
                >
                  {getTypeIcon(type)}
                  <Text style={[
                    styles.typeButtonText,
                    formData.type === type && styles.typeButtonTextSelected
                  ]}>
                    {getTypeLabel(type)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Reason/Procedure */}
            <Text style={styles.fieldLabel}>Reason or Procedure</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Appendectomy, Broken leg, Pneumonia"
              placeholderTextColor={Colors.textTertiary}
              value={formData.reason}
              onChangeText={(text) => setFormData({ ...formData, reason: text })}
            />

            {/* Year */}
            <Text style={styles.fieldLabel}>Year</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.yearScroll}
            >
              {years.slice(0, 20).map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.yearButton,
                    formData.year === year && styles.yearButtonSelected
                  ]}
                  onPress={() => setFormData({ ...formData, year })}
                >
                  <Text style={[
                    styles.yearText,
                    formData.year === year && styles.yearTextSelected
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Outcome (optional) */}
            <Text style={styles.fieldLabel}>Outcome (optional)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Full recovery, Ongoing treatment"
              placeholderTextColor={Colors.textTertiary}
              value={formData.outcome}
              onChangeText={(text) => setFormData({ ...formData, outcome: text })}
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
                onPress={handleSave}
              >
                <Text style={styles.modalButtonText}>Save</Text>
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  listContainer: {
    marginBottom: 20,
  },
  hospCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
  hospIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hospInfo: {
    flex: 1,
  },
  hospTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  hospMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospType: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  hospYear: {
    fontSize: 13,
    color: Colors.textTertiary,
  },
  hospOutcome: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  deleteButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.health,
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addIcon: {
    marginRight: 12,
  },
  addText: {
    fontSize: 16,
    color: Colors.health,
    fontWeight: '600',
  },
  noHistoryContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  orText: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginBottom: 12,
  },
  noHistoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
  },
  noHistoryText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    marginTop: 20,
  },
  continueButton: {
    width: '100%',
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
    maxHeight: '80%',
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
  typeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginHorizontal: 4,
  },
  typeButtonSelected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '10',
  },
  typeButtonText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  typeButtonTextSelected: {
    color: Colors.health,
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
  yearScroll: {
    maxHeight: 40,
    marginBottom: 8,
  },
  yearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginRight: 8,
  },
  yearButtonSelected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '10',
  },
  yearText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  yearTextSelected: {
    color: Colors.health,
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

export default HospitalizationsScreen;