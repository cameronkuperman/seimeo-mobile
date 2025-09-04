import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

interface QuickAddModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ visible, onClose }) => {
  const [selectedType, setSelectedType] = useState<string>('symptom');
  const [symptomName, setSymptomName] = useState('');
  const [painLevel, setPainLevel] = useState(3);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 12,
          bounciness: 8,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSave = () => {
    // TODO: Save the symptom/interaction
    console.log({
      type: selectedType,
      symptomName,
      painLevel,
      location,
      notes,
    });
    
    // Reset form
    setSymptomName('');
    setPainLevel(3);
    setLocation('');
    setNotes('');
    onClose();
  };

  const quickAddTypes = [
    { id: 'symptom', label: 'Log Symptom', color: Colors.mint },
    { id: 'photo', label: 'Add Photo', color: Colors.coral },
    { id: 'assessment', label: 'Quick Scan', color: Colors.ocean },
    { id: 'medication', label: 'Log Medication', color: Colors.amber },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modal,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <Text style={styles.title}>Add New Record</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Quick Add Type Selection */}
            <View style={styles.typeGrid}>
              {quickAddTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    selectedType === type.id && styles.typeCardActive,
                    selectedType === type.id && { borderColor: type.color },
                  ]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.typeDot,
                      { backgroundColor: type.color },
                      selectedType === type.id && styles.typeDotActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.typeLabel,
                      selectedType === type.id && styles.typeLabelActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Symptom Form */}
            {selectedType === 'symptom' && (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Symptom Name</Text>
                  <TextInput
                    style={styles.input}
                    value={symptomName}
                    onChangeText={setSymptomName}
                    placeholder="e.g., Headache, Fever, Fatigue"
                    placeholderTextColor={Colors.textPlaceholder}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Location</Text>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="e.g., Left temple, Lower back"
                    placeholderTextColor={Colors.textPlaceholder}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Severity Level</Text>
                  <View style={styles.severityScale}>
                    {[1, 2, 3, 4, 5].map(level => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.severityItem,
                          painLevel >= level && styles.severityItemActive,
                        ]}
                        onPress={() => setPainLevel(level)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.severityNumber,
                            painLevel >= level && styles.severityNumberActive,
                          ]}
                        >
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.severityLabels}>
                    <Text style={styles.severityLabel}>Mild</Text>
                    <Text style={styles.severityLabel}>Moderate</Text>
                    <Text style={styles.severityLabel}>Severe</Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Additional Notes</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Any additional details..."
                    placeholderTextColor={Colors.textPlaceholder}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            )}

            {/* Placeholder for other types */}
            {selectedType !== 'symptom' && (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                  {selectedType === 'photo' && 'Photo capture coming soon'}
                  {selectedType === 'assessment' && 'Quick scan coming soon'}
                  {selectedType === 'medication' && 'Medication tracking coming soon'}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!symptomName || selectedType !== 'symptom') && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
              disabled={!symptomName || selectedType !== 'symptom'}
            >
              <Text style={styles.saveButtonText}>Add to Timeline</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    paddingBottom: Platform.OS === 'ios' ? 34 : 0,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 1,
        shadowRadius: 16,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  typeCard: {
    flex: 1,
    minWidth: (width - 52) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardActive: {
    backgroundColor: Colors.white,
  },
  typeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  typeDotActive: {
    transform: [{ scale: 1.2 }],
  },
  typeLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  typeLabelActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  form: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  severityScale: {
    flexDirection: 'row',
    gap: 8,
  },
  severityItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  severityItemActive: {
    backgroundColor: Colors.amber,
    borderColor: Colors.amber,
  },
  severityNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textTertiary,
  },
  severityNumberActive: {
    color: Colors.white,
  },
  severityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  severityLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  placeholder: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
  },
  saveButton: {
    backgroundColor: Colors.black,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default QuickAddModal;