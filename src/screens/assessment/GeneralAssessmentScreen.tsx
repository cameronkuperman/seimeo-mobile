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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

interface AssessmentType {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  duration: string;
  lastCompleted?: string;
  route: string;
  accentColor?: string;
}

const GeneralAssessmentScreen: React.FC = () => {
  const navigation = useNavigation();
  const [mode, setMode] = useState<'quick' | 'deep'>('quick');

  const assessmentTypes: AssessmentType[] = [
    {
      id: 'symptom',
      icon: 'body-outline',
      title: 'Symptom Checker',
      subtitle: 'Identify potential conditions',
      duration: mode === 'quick' ? '2 min' : '5 min',
      route: 'SymptomChecker',
      accentColor: '#F87171', // Soft coral
    },
    {
      id: 'wellness',
      icon: 'heart-outline',
      title: 'Wellness Check',
      subtitle: 'Overall health assessment',
      duration: mode === 'quick' ? '1 min' : '3 min',
      route: 'WellnessCheck',
      accentColor: '#10B981', // Mint green
    },
    {
      id: 'mental',
      icon: 'happy-outline',
      title: 'Mental Health',
      subtitle: 'Mood and stress evaluation',
      duration: mode === 'quick' ? '2 min' : '5 min',
      route: 'MentalHealth',
      accentColor: '#9B87F5', // Lavender
    },
    {
      id: 'preventive',
      icon: 'shield-checkmark-outline',
      title: 'Preventive Screening',
      subtitle: 'Risk factor analysis',
      duration: mode === 'quick' ? '3 min' : '8 min',
      route: 'PreventiveScreening',
      accentColor: '#0EA5E9', // Ocean blue
    },
    {
      id: 'pain',
      icon: 'pulse-outline',
      title: 'Pain Assessment',
      subtitle: 'Track and analyze pain',
      duration: mode === 'quick' ? '1 min' : '3 min',
      route: 'PainAssessment',
      accentColor: '#FFA756', // Amber
    },
    {
      id: 'sleep',
      icon: 'moon-outline',
      title: 'Sleep Analysis',
      subtitle: 'Sleep quality evaluation',
      duration: mode === 'quick' ? '2 min' : '4 min',
      route: 'SleepAnalysis',
      accentColor: '#6366F1', // Indigo
    },
  ];

  const handleAssessmentPress = (assessment: AssessmentType) => {
    navigation.navigate(assessment.route as never, { mode } as never);
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
          <Text style={styles.headerTitle}>General Assessment</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Mode Selector */}
        <View style={styles.modeContainer}>
          <Text style={styles.modeTitle}>Choose your assessment depth</Text>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[
                styles.modeOption,
                mode === 'quick' && styles.modeOptionActive,
                mode === 'quick' && { borderColor: '#10B981' }
              ]}
              onPress={() => setMode('quick')}
              activeOpacity={0.8}
            >
              <Icon 
                name="flash-outline" 
                size={20} 
                color={mode === 'quick' ? Colors.white : '#10B981'} 
              />
              <Text style={[
                styles.modeLabel,
                mode === 'quick' && styles.modeLabelActive,
              ]}>
                Quick Scan
              </Text>
              <Text style={[
                styles.modeTime,
                mode === 'quick' && styles.modeTimeActive,
              ]}>
                1-3 minutes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeOption,
                mode === 'deep' && styles.modeOptionActive,
                mode === 'deep' && { borderColor: '#9B87F5' }
              ]}
              onPress={() => setMode('deep')}
              activeOpacity={0.8}
            >
              <Icon 
                name="analytics-outline" 
                size={20} 
                color={mode === 'deep' ? Colors.white : '#9B87F5'} 
              />
              <Text style={[
                styles.modeLabel,
                mode === 'deep' && styles.modeLabelActive,
              ]}>
                Deep Dive
              </Text>
              <Text style={[
                styles.modeTime,
                mode === 'deep' && styles.modeTimeActive,
              ]}>
                3-8 minutes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Assessment Types Grid */}
        <View style={styles.assessmentGrid}>
          {assessmentTypes.map((assessment) => (
            <TouchableOpacity
              key={assessment.id}
              style={[
                styles.assessmentCard,
                { borderLeftColor: assessment.accentColor, borderLeftWidth: 2 }
              ]}
              onPress={() => handleAssessmentPress(assessment)}
              activeOpacity={0.9}
            >
              <View style={[
                styles.assessmentIconContainer,
                { backgroundColor: `${assessment.accentColor}15` }
              ]}>
                <Icon name={assessment.icon} size={24} color={assessment.accentColor} />
              </View>
              <Text style={styles.assessmentTitle}>{assessment.title}</Text>
              <Text style={styles.assessmentSubtitle}>{assessment.subtitle}</Text>
              <View style={styles.assessmentFooter}>
                <View style={styles.durationContainer}>
                  <Icon name="time-outline" size={14} color="#9CA3AF" />
                  <Text style={styles.durationText}>{assessment.duration}</Text>
                </View>
                <Icon name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Icon name="information-circle-outline" size={20} color={Colors.black} />
          <Text style={styles.infoText}>
            {mode === 'quick' 
              ? 'Quick scans provide rapid insights for immediate concerns'
              : 'Deep dives offer comprehensive analysis for thorough evaluation'}
          </Text>
        </View>
      </ScrollView>
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
    paddingVertical: 24,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  modeOption: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  modeOptionActive: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 8,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  modeLabelActive: {
    color: Colors.white,
  },
  modeTime: {
    fontSize: 13,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  modeTimeActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  assessmentGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  assessmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  assessmentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FAFBFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  assessmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  assessmentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  assessmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 13,
    color: '#9CA3AF',
    letterSpacing: -0.2,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
});

export default GeneralAssessmentScreen;