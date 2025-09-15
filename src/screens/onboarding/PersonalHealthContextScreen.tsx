import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';
import Svg, { Path, Circle, G, Ellipse } from 'react-native-svg';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'PersonalHealthContext'>;

// Thought bubble icon
const ThoughtBubbleIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <Ellipse cx="24" cy="20" rx="18" ry="14" fill={Colors.lavender + '20'} />
    <Circle cx="32" cy="32" r="3" fill={Colors.lavender + '30'} />
    <Circle cx="36" cy="36" r="2" fill={Colors.lavender + '40'} />
    <Circle cx="38" cy="40" r="1.5" fill={Colors.lavender + '50'} />
    <Path
      d="M15 20C15 20 17 22 21 22C25 22 27 20 27 20"
      stroke={Colors.lavender}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Circle cx="18" cy="18" r="1.5" fill={Colors.lavender} />
    <Circle cx="24" cy="18" r="1.5" fill={Colors.lavender} />
  </Svg>
);

// Lock icon for privacy
const PrivacyIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 1L3 3V7C3 10.55 5.84 13.74 8 14C10.16 13.74 13 10.55 13 7V3L8 1Z"
      fill={Colors.mint}
      opacity={0.3}
    />
    <Path
      d="M6 8L7 9L10 6"
      stroke={Colors.mint}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface ExampleChip {
  id: string;
  text: string;
  fullText: string;
}

const exampleChips: ExampleChip[] = [
  { 
    id: 'baby', 
    text: 'New parent', 
    fullText: "I recently had a baby and I'm adjusting to the changes in my body and sleep schedule." 
  },
  { 
    id: 'injury', 
    text: 'Recovering from injury', 
    fullText: "I'm recovering from an injury and working on getting back to my normal activity level." 
  },
  { 
    id: 'training', 
    text: 'Training for event', 
    fullText: "I'm training for a specific event and want to optimize my health and performance." 
  },
  { 
    id: 'stress', 
    text: 'Major life change', 
    fullText: "I'm going through a major life transition and focusing on maintaining my health." 
  },
  { 
    id: 'surgery', 
    text: 'Post-surgery', 
    fullText: "I recently had surgery and I'm in the recovery phase." 
  },
  { 
    id: 'career', 
    text: 'Career change', 
    fullText: "I've changed careers which has affected my stress levels and daily routine." 
  },
];

const PersonalHealthContextScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getNextScreen } = useOnboarding();
  const [context, setContext] = useState('');
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());

  const maxLength = 500;

  const handleChipPress = (chip: ExampleChip) => {
    if (selectedChips.has(chip.id)) {
      // Remove from context
      setSelectedChips(prev => {
        const newSet = new Set(prev);
        newSet.delete(chip.id);
        return newSet;
      });
      setContext(context.replace(chip.fullText, '').trim());
    } else {
      // Add to context
      setSelectedChips(prev => new Set(prev).add(chip.id));
      const newContext = context ? `${context}\n\n${chip.fullText}` : chip.fullText;
      setContext(newContext.substring(0, maxLength));
    }
  };

  const handleContinue = () => {
    // Store personal context
    const nextScreen = getNextScreen('PersonalHealthContext');
    navigation.navigate(nextScreen as any);
  };

  const handleSkip = () => {
    const nextScreen = getNextScreen('PersonalHealthContext');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '92%' }]} />
              </View>
            </View>

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <ThoughtBubbleIcon />
              </View>
              <Text style={styles.title}>Anything else we should know?</Text>
              <Text style={styles.subtitle}>
                Share important context about your health journey
              </Text>
            </View>

            {/* Example Chips */}
            <View style={styles.chipsContainer}>
              <Text style={styles.chipsLabel}>Common examples:</Text>
              <View style={styles.chipsGrid}>
                {exampleChips.map((chip) => (
                  <TouchableOpacity
                    key={chip.id}
                    style={[
                      styles.chip,
                      selectedChips.has(chip.id) && styles.chipSelected
                    ]}
                    onPress={() => handleChipPress(chip)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.chipText,
                      selectedChips.has(chip.id) && styles.chipTextSelected
                    ]}>
                      {chip.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Text Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Tell us about any recent health events, life changes, or specific goals you're working toward..."
                placeholderTextColor={Colors.textTertiary}
                value={context}
                onChangeText={(text) => setContext(text.substring(0, maxLength))}
                maxLength={maxLength}
                textAlignVertical="top"
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
              />
              <Text style={styles.charCounter}>
                {context.length}/{maxLength}
              </Text>
            </View>

            {/* Privacy Note */}
            <View style={styles.privacyContainer}>
              <PrivacyIcon />
              <Text style={styles.privacyText}>
                This helps our AI provide more personalized insights. Your information is always private and secure.
              </Text>
            </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },
  chipsContainer: {
    marginBottom: 24,
  },
  chipsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textTertiary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  chipSelected: {
    backgroundColor: Colors.lavender + '20',
    borderColor: Colors.lavender,
  },
  chipText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.lavender,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    minHeight: 140,
    fontSize: 16,
    color: Colors.textPrimary,
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
  charCounter: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: 'right',
    marginTop: 8,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mint + '10',
    borderRadius: 8,
    padding: 12,
    marginBottom: 32,
  },
  privacyText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 32,
    paddingBottom: 20,
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
});

export default PersonalHealthContextScreen;