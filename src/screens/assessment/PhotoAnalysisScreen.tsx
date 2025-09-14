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
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

interface PreviousSession {
  id: string;
  title: string;
  date: Date;
  photoCount: number;
  status: 'tracking' | 'completed';
  progress?: number;
  accentColor?: string;
}

const PhotoAnalysisScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState<'continue' | 'new' | null>(null);

  const previousSessions: PreviousSession[] = [
    {
      id: '1',
      title: 'Skin Rash Tracking',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      photoCount: 3,
      status: 'tracking',
      progress: 43,
      accentColor: '#F87171', // Soft coral
    },
    {
      id: '2',
      title: 'Wound Healing',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      photoCount: 7,
      status: 'completed',
      accentColor: '#10B981', // Mint green
    },
    {
      id: '3',
      title: 'Acne Progress',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      photoCount: 14,
      status: 'tracking',
      progress: 71,
      accentColor: '#9B87F5', // Lavender
    },
  ];

  const handleContinueSession = (session: PreviousSession) => {
    navigation.navigate('PhotoCapture' as never, { 
      sessionId: session.id,
      mode: 'continue' 
    } as never);
  };

  const handleNewAnalysis = () => {
    navigation.navigate('PhotoCapture' as never, { 
      mode: 'new' 
    } as never);
  };

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
          <Text style={styles.headerTitle}>Photo Analysis</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Main Options */}
        <View style={styles.mainOptions}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'continue' && styles.optionCardActive,
            ]}
            onPress={() => setSelectedOption('continue')}
            activeOpacity={0.9}
          >
            <View style={[
              styles.optionIconContainer,
              selectedOption === 'continue' && { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
              selectedOption !== 'continue' && { backgroundColor: '#0EA5E915' }
            ]}>
              <Icon 
                name="layers-outline" 
                size={24} 
                color={selectedOption === 'continue' ? Colors.white : '#0EA5E9'} 
              />
            </View>
            <Text style={[
              styles.optionTitle,
              selectedOption === 'continue' && styles.optionTitleActive,
            ]}>
              Continue Tracking
            </Text>
            <Text style={[
              styles.optionSubtitle,
              selectedOption === 'continue' && styles.optionSubtitleActive,
            ]}>
              Add to existing analysis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === 'new' && styles.optionCardActive,
            ]}
            onPress={() => setSelectedOption('new')}
            activeOpacity={0.9}
          >
            <View style={[
              styles.optionIconContainer,
              selectedOption === 'new' && { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
              selectedOption !== 'new' && { backgroundColor: '#10B98115' }
            ]}>
              <Icon 
                name="add-circle-outline" 
                size={24} 
                color={selectedOption === 'new' ? Colors.white : '#10B981'} 
              />
            </View>
            <Text style={[
              styles.optionTitle,
              selectedOption === 'new' && styles.optionTitleActive,
            ]}>
              New Analysis
            </Text>
            <Text style={[
              styles.optionSubtitle,
              selectedOption === 'new' && styles.optionSubtitleActive,
            ]}>
              Start fresh tracking
            </Text>
          </TouchableOpacity>
        </View>

        {/* Previous Sessions (shown when continue is selected) */}
        {selectedOption === 'continue' && (
          <View style={styles.sessionsSection}>
            <Text style={styles.sessionsTitle}>Previous Sessions</Text>
            {previousSessions.map((session) => (
              <TouchableOpacity
                key={session.id}
                style={[
                  styles.sessionCard,
                  { borderLeftColor: session.accentColor, borderLeftWidth: 2 }
                ]}
                onPress={() => handleContinueSession(session)}
                activeOpacity={0.9}
              >
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>{session.title}</Text>
                  <View style={styles.sessionMeta}>
                    <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
                    <Text style={styles.sessionDot}>•</Text>
                    <Text style={styles.sessionPhotos}>{session.photoCount} photos</Text>
                    {session.status === 'completed' && (
                      <View style={[
                        styles.completedBadge,
                        { backgroundColor: `${session.accentColor}15` }
                      ]}>
                        <Icon name="checkmark" size={12} color={session.accentColor} />
                      </View>
                    )}
                  </View>
                  {session.status === 'tracking' && session.progress && (
                    <View style={styles.progressContainer}>
                      <View style={[
                        styles.progressBar,
                        { backgroundColor: `${session.accentColor}20` }
                      ]}>
                        <View 
                          style={[
                            styles.progressFill,
                            { 
                              width: `${session.progress}%`,
                              backgroundColor: session.accentColor 
                            },
                          ]} 
                        />
                      </View>
                      <Text style={[
                        styles.progressText,
                        { color: session.accentColor }
                      ]}>{session.progress}%</Text>
                    </View>
                  )}
                </View>
                <Icon name="chevron-forward" size={20} color={session.accentColor || '#9CA3AF'} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* New Analysis Options (shown when new is selected) */}
        {selectedOption === 'new' && (
          <View style={styles.newAnalysisSection}>
            <Text style={styles.newAnalysisTitle}>What would you like to track?</Text>
            <View style={styles.trackingOptions}>
              {[
                { name: 'Skin Condition', color: '#F87171' },
                { name: 'Wound Healing', color: '#10B981' },
                { name: 'Rash/Irritation', color: '#FFA756' },
                { name: 'Other', color: '#9B87F5' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.name}
                  style={[
                    styles.trackingOption,
                    { borderLeftColor: option.color, borderLeftWidth: 2 }
                  ]}
                  onPress={handleNewAnalysis}
                  activeOpacity={0.9}
                >
                  <Text style={styles.trackingOptionText}>{option.name}</Text>
                  <Icon name="arrow-forward" size={18} color={option.color} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Icon name="camera-outline" size={20} color={Colors.black} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>AI-Powered Analysis</Text>
            <Text style={styles.infoText}>
              Our AI compares photos over time to track changes and identify patterns. 
              Best results with consistent lighting and angles.
            </Text>
          </View>
        </View>

        {/* Bottom Action */}
        {selectedOption && (
          <TouchableOpacity
            style={styles.bottomAction}
            onPress={selectedOption === 'new' ? handleNewAnalysis : undefined}
            activeOpacity={0.9}
          >
            <Text style={styles.bottomActionText}>
              {selectedOption === 'new' ? 'Start New Analysis' : 'Select a session above'}
            </Text>
          </TouchableOpacity>
        )}
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
  mainOptions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  optionCardActive: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  optionTitleActive: {
    color: Colors.white,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  optionSubtitleActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sessionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sessionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDate: {
    fontSize: 13,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  sessionDot: {
    fontSize: 13,
    color: '#9CA3AF',
    marginHorizontal: 6,
  },
  sessionPhotos: {
    fontSize: 13,
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  newAnalysisSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  newAnalysisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  trackingOptions: {
    gap: 8,
  },
  trackingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  trackingOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
    letterSpacing: -0.3,
  },
  infoCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  bottomAction: {
    backgroundColor: Colors.black,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  bottomActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.3,
  },
});

export default PhotoAnalysisScreen;