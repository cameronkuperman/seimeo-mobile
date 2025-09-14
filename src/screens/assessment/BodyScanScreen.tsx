import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface BodyPart {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Symptom {
  id: string;
  bodyPart: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
}

const BodyScanScreen: React.FC = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [scanMode, setScanMode] = useState<'quick' | 'deep'>('quick');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [showSymptomModal, setShowSymptomModal] = useState(false);

  // Simplified body parts for demonstration
  const frontBodyParts: BodyPart[] = [
    { id: 'head', name: 'Head', x: 0.42, y: 0.05, width: 0.16, height: 0.08 },
    { id: 'chest', name: 'Chest', x: 0.35, y: 0.18, width: 0.3, height: 0.15 },
    { id: 'abdomen', name: 'Abdomen', x: 0.37, y: 0.33, width: 0.26, height: 0.12 },
    { id: 'left-arm', name: 'Left Arm', x: 0.15, y: 0.2, width: 0.15, height: 0.25 },
    { id: 'right-arm', name: 'Right Arm', x: 0.7, y: 0.2, width: 0.15, height: 0.25 },
    { id: 'left-leg', name: 'Left Leg', x: 0.35, y: 0.45, width: 0.12, height: 0.35 },
    { id: 'right-leg', name: 'Right Leg', x: 0.53, y: 0.45, width: 0.12, height: 0.35 },
  ];

  const backBodyParts: BodyPart[] = [
    { id: 'head-back', name: 'Head (Back)', x: 0.42, y: 0.05, width: 0.16, height: 0.08 },
    { id: 'upper-back', name: 'Upper Back', x: 0.35, y: 0.18, width: 0.3, height: 0.15 },
    { id: 'lower-back', name: 'Lower Back', x: 0.37, y: 0.33, width: 0.26, height: 0.12 },
    { id: 'left-arm-back', name: 'Left Arm (Back)', x: 0.15, y: 0.2, width: 0.15, height: 0.25 },
    { id: 'right-arm-back', name: 'Right Arm (Back)', x: 0.7, y: 0.2, width: 0.15, height: 0.25 },
    { id: 'left-leg-back', name: 'Left Leg (Back)', x: 0.35, y: 0.45, width: 0.12, height: 0.35 },
    { id: 'right-leg-back', name: 'Right Leg (Back)', x: 0.53, y: 0.45, width: 0.12, height: 0.35 },
  ];

  const currentBodyParts = viewMode === 'front' ? frontBodyParts : backBodyParts;

  const handleBodyPartPress = (part: BodyPart) => {
    setSelectedPart(part.id);
    setShowSymptomModal(true);
  };

  const addSymptom = (severity: 'mild' | 'moderate' | 'severe', description: string) => {
    if (!selectedPart) return;
    
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      bodyPart: selectedPart,
      severity,
      description,
    };
    
    setSymptoms([...symptoms, newSymptom]);
    setShowSymptomModal(false);
    setSelectedPart(null);
  };

  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild': return '#FEF3C7';
      case 'moderate': return '#FED7AA';
      case 'severe': return '#FCA5A5';
    }
  };

  const startScan = () => {
    navigation.navigate('BodyScanResults' as never, { 
      symptoms, 
      mode: scanMode 
    } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>3D Body Scan</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Scan Mode Selector */}
        <View style={styles.modeContainer}>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeOption, scanMode === 'quick' && styles.modeActive]}
              onPress={() => setScanMode('quick')}
            >
              <Text style={[styles.modeText, scanMode === 'quick' && styles.modeTextActive]}>
                Quick Scan
              </Text>
              <Text style={[styles.modeSubtext, scanMode === 'quick' && styles.modeSubtextActive]}>
                1 minute
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeOption, scanMode === 'deep' && styles.modeActive]}
              onPress={() => setScanMode('deep')}
            >
              <Text style={[styles.modeText, scanMode === 'deep' && styles.modeTextActive]}>
                Deep Dive
              </Text>
              <Text style={[styles.modeSubtext, scanMode === 'deep' && styles.modeSubtextActive]}>
                5 minutes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Body Visualization */}
        <View style={styles.bodyContainer}>
          <View style={styles.bodyVisualization}>
            {/* Simplified body outline */}
            <View style={styles.bodyOutline}>
              <Icon 
                name={viewMode === 'front' ? 'person' : 'person'} 
                size={280} 
                color="#E5E5E7" 
              />
              
              {/* Body part touch areas */}
              {currentBodyParts.map((part) => {
                const hasSymptom = symptoms.find(s => s.bodyPart === part.id);
                return (
                  <TouchableOpacity
                    key={part.id}
                    style={[
                      styles.bodyPartTouchArea,
                      {
                        left: `${part.x * 100}%`,
                        top: `${part.y * 100}%`,
                        width: `${part.width * 100}%`,
                        height: `${part.height * 100}%`,
                      },
                      hasSymptom && {
                        backgroundColor: getSeverityColor(hasSymptom.severity),
                        borderColor: getSeverityColor(hasSymptom.severity),
                      },
                    ]}
                    onPress={() => handleBodyPartPress(part)}
                    activeOpacity={0.7}
                  />
                );
              })}
            </View>
          </View>

          {/* View Toggle */}
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewOption, viewMode === 'front' && styles.viewOptionActive]}
              onPress={() => setViewMode('front')}
            >
              <Text style={[styles.viewText, viewMode === 'front' && styles.viewTextActive]}>
                Front
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewOption, viewMode === 'back' && styles.viewOptionActive]}
              onPress={() => setViewMode('back')}
            >
              <Text style={[styles.viewText, viewMode === 'back' && styles.viewTextActive]}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Icon name="hand-left-outline" size={20} color={Colors.black} />
          <Text style={styles.instructionText}>
            Tap on body parts to mark symptoms
          </Text>
        </View>

        {/* Symptoms List */}
        {symptoms.length > 0 && (
          <View style={styles.symptomsSection}>
            <Text style={styles.symptomsTitle}>Marked Symptoms</Text>
            {symptoms.map((symptom) => (
              <View key={symptom.id} style={styles.symptomItem}>
                <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(symptom.severity) }]} />
                <View style={styles.symptomContent}>
                  <Text style={styles.symptomPart}>
                    {currentBodyParts.find(p => p.id === symptom.bodyPart)?.name}
                  </Text>
                  <Text style={styles.symptomDescription}>{symptom.description}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSymptoms(symptoms.filter(s => s.id !== symptom.id))}
                >
                  <Icon name="close-circle" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Start Scan Button */}
        <TouchableOpacity
          style={[styles.startButton, symptoms.length === 0 && styles.startButtonDisabled]}
          onPress={startScan}
          disabled={symptoms.length === 0}
          activeOpacity={0.9}
        >
          <Text style={styles.startButtonText}>
            {symptoms.length > 0 ? 'Analyze Symptoms' : 'Mark symptoms to continue'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Symptom Modal */}
      <Modal
        visible={showSymptomModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSymptomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Describe Symptom</Text>
            
            <View style={styles.severityOptions}>
              <TouchableOpacity
                style={[styles.severityOption, { backgroundColor: '#FEF3C7' }]}
                onPress={() => addSymptom('mild', 'Mild discomfort')}
              >
                <Text style={styles.severityText}>Mild</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.severityOption, { backgroundColor: '#FED7AA' }]}
                onPress={() => addSymptom('moderate', 'Moderate pain')}
              >
                <Text style={styles.severityText}>Moderate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.severityOption, { backgroundColor: '#FCA5A5' }]}
                onPress={() => addSymptom('severe', 'Severe pain')}
              >
                <Text style={styles.severityText}>Severe</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowSymptomModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  modeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  modeOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeActive: {
    backgroundColor: Colors.black,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  modeTextActive: {
    color: Colors.white,
  },
  modeSubtext: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  modeSubtextActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bodyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  bodyVisualization: {
    width: screenWidth - 40,
    height: 400,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  bodyOutline: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyPartTouchArea: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  viewToggle: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  viewOption: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 17,
  },
  viewOptionActive: {
    backgroundColor: Colors.black,
  },
  viewText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  viewTextActive: {
    color: Colors.white,
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  symptomsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  symptomsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  severityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  symptomContent: {
    flex: 1,
  },
  symptomPart: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  symptomDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  startButton: {
    backgroundColor: Colors.black,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.3,
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  severityOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  severityOption: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  modalCancel: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6B7280',
    letterSpacing: -0.3,
  },
});

export default BodyScanScreen;