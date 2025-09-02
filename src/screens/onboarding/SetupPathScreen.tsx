import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { Colors } from '../../theme/colors';
import { useOnboarding } from '../../contexts/OnboardingContext';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'SetupPath'>;

const SetupPathScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setSelectedPath, getNextScreen } = useOnboarding();
  const [localPath, setLocalPath] = useState<'express' | 'regular' | 'complete'>('regular');

  const handleContinue = () => {
    // Save to context
    setSelectedPath(localPath);
    // Navigate to next screen based on path
    const nextScreen = getNextScreen('SetupPath');
    navigation.navigate(nextScreen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>How much time do you have?</Text>
          <Text style={styles.subtitle}>
            Choose your setup depth
          </Text>
        </View>

        {/* Option Cards - Cal AI Style */}
        <View style={styles.optionsContainer}>
          {/* Express Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              localPath === 'express' && styles.optionCardSelected
            ]}
            onPress={() => setLocalPath('express')}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <Text style={[
                  styles.optionTitle,
                  localPath === 'express' && styles.optionTitleSelected
                ]}>Express</Text>
                <Text style={styles.optionTime}>3 min</Text>
              </View>
              <Text style={[
                styles.optionDescription,
                localPath === 'express' && styles.optionDescriptionSelected
              ]}>
                Just the essentials to get started
              </Text>
            </View>
            <View style={[
              styles.radioButton,
              localPath === 'express' && styles.radioButtonSelected
            ]}>
              {localPath === 'express' && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          {/* Regular Option - Recommended */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              localPath === 'regular' && styles.optionCardSelected,
              styles.recommendedCard
            ]}
            onPress={() => setLocalPath('regular')}
            activeOpacity={0.7}
          >
            {localPath === 'regular' && (
              <View style={styles.selectedIndicator} />
            )}
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <View style={styles.titleRow}>
                  <Text style={[
                    styles.optionTitle,
                    localPath === 'regular' && styles.optionTitleSelected
                  ]}>Regular</Text>
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>RECOMMENDED</Text>
                  </View>
                </View>
                <Text style={styles.optionTime}>5 min</Text>
              </View>
              <Text style={[
                styles.optionDescription,
                localPath === 'regular' && styles.optionDescriptionSelected
              ]}>
                Personalized AI recommendations
              </Text>
            </View>
            <View style={[
              styles.radioButton,
              localPath === 'regular' && styles.radioButtonSelected
            ]}>
              {localPath === 'regular' && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>

          {/* Complete Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              localPath === 'complete' && styles.optionCardSelected
            ]}
            onPress={() => setLocalPath('complete')}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <Text style={[
                  styles.optionTitle,
                  localPath === 'complete' && styles.optionTitleSelected
                ]}>Complete</Text>
                <Text style={styles.optionTime}>10 min</Text>
              </View>
              <Text style={[
                styles.optionDescription,
                localPath === 'complete' && styles.optionDescriptionSelected
              ]}>
                Full medical profile with family history
              </Text>
            </View>
            <View style={[
              styles.radioButton,
              localPath === 'complete' && styles.radioButtonSelected
            ]}>
              {localPath === 'complete' && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionCardSelected: {
    borderColor: Colors.black,
    borderWidth: 2,
  },
  recommendedCard: {
    position: 'relative',
  },
  selectedIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  optionContent: {
    flex: 1,
    marginRight: 16,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  optionTitleSelected: {
    color: Colors.black,
  },
  recommendedBadge: {
    backgroundColor: Colors.health,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  optionTime: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  optionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  optionDescriptionSelected: {
    color: Colors.textPrimary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.black,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.black,
  },
  footer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  continueButton: {
    height: 56,
    backgroundColor: Colors.black,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default SetupPathScreen;