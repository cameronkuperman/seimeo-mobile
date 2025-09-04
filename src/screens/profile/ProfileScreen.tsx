import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - replace with context/API
const mockUserData = {
  name: 'Jenny Chen',
  age: 55,
  location: 'New York City',
  height: "5'6\"",
  weight: '145 lbs',
  bloodType: 'O+',
  memberSince: '2024',
  credits: 47,
  totalCredits: 100,
  plan: 'Premium',
  summaries: {
    clinical: "Jenny is a 55-year-old woman living in New York City. She was recently diagnosed with Stage III HR-/HER2+ Invasive Breast Cancer. Non-smoker, lives a moderately-active lifestyle. No known allergies. Current treatment includes chemotherapy regimen with regular monitoring of tumor markers and cardiac function.",
    lifestyle: "Jenny maintains an active lifestyle despite her diagnosis, walking 30 minutes daily and practicing yoga twice weekly. She follows a Mediterranean diet with emphasis on anti-inflammatory foods. Sleep quality has improved with consistent 7-8 hour schedule. Stress management through meditation and support group participation.",
    risk: "High priority: Cardiac monitoring due to chemotherapy cardiotoxicity risk. Moderate priority: Bone density screening for treatment-related osteoporosis. Low priority: Routine vaccinations with oncologist approval. Genetic counseling recommended for family members given HER2+ status."
  },
  lastUpdated: new Date('2024-10-25'),
  lastSynced: new Date(),
  diagnoses: [
    { id: 1, name: 'Breast cancer', detail: 'Stage III HR-/HER2+', date: '01/15/2024', status: 'active' },
    { id: 2, name: 'Hypertension', detail: 'Controlled', date: '03/12/2023', status: 'managed' },
  ],
  medications: [
    { id: 1, name: 'Metformin', dose: '500mg', frequency: 'Twice daily' },
    { id: 2, name: 'Lisinopril', dose: '10mg', frequency: 'Once daily' },
    { id: 3, name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily' },
    { id: 4, name: 'Aspirin', dose: '81mg', frequency: 'Once daily' },
    { id: 5, name: 'Levothyroxine', dose: '50mcg', frequency: 'Once daily' },
  ],
  integrations: [
    { id: 1, name: 'Apple Health', icon: 'fitness', connected: true },
    { id: 2, name: 'Google Fit', icon: 'logo-google', connected: false },
    { id: 3, name: 'Fitbit', icon: 'watch', connected: false },
    { id: 4, name: 'MyChart', icon: 'medical', connected: true },
  ],
};

const ProfileScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedPerspective, setSelectedPerspective] = useState<'clinical' | 'lifestyle' | 'risk'>('clinical');
  const [regenerating, setRegenerating] = useState(false);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [showCreditsDetail, setShowCreditsDetail] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const morphAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Animate perspective switch
    Animated.sequence([
      Animated.timing(morphAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(morphAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selectedPerspective]);

  const onRefresh = () => {
    setRefreshing(true);
    // Show last synced time
    setTimeout(() => setRefreshing(false), 1500);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const regenerateSummary = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
    }, 2000);
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#000000', '#1A1A1C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientHeader}
    >
      <View style={styles.safeAreaTop} />
      <View style={styles.headerContent}>
        {/* Settings Button */}
        <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
          <Icon name="settings-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Subscription + Credits Pill - Right aligned */}
        <TouchableOpacity 
          style={styles.subscriptionPill} 
          activeOpacity={0.8}
          onPress={() => setShowCreditsDetail(true)}
        >
          <Text style={styles.planText}>{mockUserData.plan}</Text>
          <View style={styles.creditsDot} />
          <Text style={styles.creditsText}>{mockUserData.credits}</Text>
        </TouchableOpacity>
      </View>
      
      {/* User Name - Centered with more space */}
      <View style={styles.nameRow}>
        <Text style={styles.userName}>{mockUserData.name}</Text>
      </View>
    </LinearGradient>
  );

  const renderPerspectiveLens = () => {
    const perspectives = ['clinical', 'lifestyle', 'risk'] as const;
    const perspectiveLabels = {
      clinical: 'Clinical',
      lifestyle: 'Lifestyle',
      risk: 'Risk',
    };

    return (
      <View style={styles.perspectiveLens}>
        <View style={styles.perspectivePills}>
          {perspectives.map((perspective, index) => (
            <TouchableOpacity
              key={perspective}
              style={[
                styles.perspectivePill,
                selectedPerspective === perspective && styles.perspectivePillActive,
              ]}
              onPress={() => setSelectedPerspective(perspective)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.perspectiveText,
                  selectedPerspective === perspective && styles.perspectiveTextActive,
                ]}
              >
                {perspectiveLabels[perspective]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderHealthSummary = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Health Summary</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={regenerateSummary}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      {renderPerspectiveLens()}
      
      <Animated.View 
        style={[
          styles.summaryContent,
          {
            opacity: morphAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Text style={styles.lastUpdated}>
          Updated {mockUserData.lastUpdated.toLocaleDateString()}
        </Text>
        
        {regenerating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={Colors.lavender} />
            <Text style={styles.loadingText}>Regenerating {selectedPerspective} view...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.summaryText} numberOfLines={3}>
              {mockUserData.summaries[selectedPerspective]}
            </Text>
          </>
        )}

        <TouchableOpacity 
          style={styles.showFullButton}
          onPress={() => setShowFullAnalysis(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.showFullText}>Show full analysis</Text>
          <Icon name="arrow-forward" size={16} color={Colors.black} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  const renderQuickInfoGrid = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Personal Information</Text>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>AGE</Text>
          <Text style={styles.infoValue}>{mockUserData.age}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>LOCATION</Text>
          <Text style={styles.infoValue}>{mockUserData.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>HEIGHT</Text>
          <Text style={styles.infoValue}>{mockUserData.height}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>WEIGHT</Text>
          <Text style={styles.infoValue}>{mockUserData.weight}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>BLOOD TYPE</Text>
          <Text style={styles.infoValue}>{mockUserData.bloodType}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>MEMBER</Text>
          <Text style={styles.infoValue}>Since {mockUserData.memberSince}</Text>
        </View>
      </View>
    </View>
  );

  const renderMedicalSnapshot = () => (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.expandableHeader}
        onPress={() => toggleSection('medical')}
        activeOpacity={0.7}
      >
        <Text style={styles.cardTitle}>Medical Snapshot</Text>
        <Icon 
          name={expandedSections.has('medical') ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={Colors.textSecondary} 
        />
      </TouchableOpacity>

      {/* Always visible primary info */}
      <View style={styles.medicalSummary}>
        <View style={styles.diagnosisPill}>
          <Text style={styles.diagnosisText}>
            {mockUserData.diagnoses[0].name}
          </Text>
        </View>
        <View style={styles.medicationPill}>
          <Icon name="medical" size={14} color={Colors.amber} />
          <Text style={styles.medicationText}>
            {mockUserData.medications.length} medications
          </Text>
        </View>
      </View>

      {expandedSections.has('medical') && (
        <Animated.View style={styles.expandedContent}>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>DIAGNOSES</Text>
            {mockUserData.diagnoses.map((diagnosis) => (
              <View key={diagnosis.id} style={styles.detailRow}>
                <View>
                  <Text style={styles.detailTitle}>{diagnosis.name}</Text>
                  <Text style={styles.detailSubtext}>
                    {diagnosis.date} • {diagnosis.detail}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>MEDICATIONS</Text>
            {mockUserData.medications.map((med) => (
              <View key={med.id} style={styles.detailRow}>
                <View>
                  <Text style={styles.detailTitle}>{med.name}</Text>
                  <Text style={styles.detailSubtext}>
                    {med.dose} • {med.frequency}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderIntegrations = () => (
    <View style={styles.integrationsSection}>
      <Text style={styles.sectionTitle}>Integrations</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.integrationsScroll}
      >
        {mockUserData.integrations.map((integration) => (
          <TouchableOpacity 
            key={integration.id}
            style={[
              styles.integrationCard,
              integration.connected && styles.integrationConnected,
            ]}
            activeOpacity={0.7}
          >
            <Icon 
              name={integration.icon} 
              size={28} 
              color={integration.connected ? Colors.health : Colors.textTertiary} 
            />
            <Text style={styles.integrationName}>{integration.name}</Text>
            <Text style={[
              styles.integrationStatus,
              integration.connected && styles.integrationStatusConnected,
            ]}>
              {integration.connected ? 'Connected' : 'Connect'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={styles.settingsItemText}>Account</Text>
          <Icon name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={styles.settingsItemText}>Privacy & Security</Text>
          <Icon name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={styles.settingsItemText}>Export Health Data</Text>
          <Icon name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={styles.settingsItemText}>Support</Text>
          <Icon name="chevron-forward" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <View style={styles.dangerZone}>
        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={[styles.settingsItemText, styles.dangerText]}>Clear All Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
          <Text style={[styles.settingsItemText, styles.dangerText]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFullAnalysisModal = () => (
    <Modal
      visible={showFullAnalysis}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowFullAnalysis(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Health Analysis</Text>
          <TouchableOpacity onPress={() => setShowFullAnalysis(false)}>
            <Text style={styles.modalClose}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={['clinical', 'lifestyle', 'risk'] as const}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.analysisPage}>
              <View style={styles.analysisBadge}>
                <Text style={styles.analysisPerspective}>{item.toUpperCase()}</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.analysisText}>
                  {mockUserData.summaries[item]}
                </Text>
              </ScrollView>
              <TouchableOpacity 
                style={styles.regenerateButton}
                onPress={regenerateSummary}
                activeOpacity={0.8}
              >
                <Icon name="refresh" size={18} color={Colors.white} />
                <Text style={styles.regenerateText}>Regenerate</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.lavender}
          />
        }
      >
        {renderHeader()}
        <View style={styles.scrollContent}>
          {renderHealthSummary()}
          {renderQuickInfoGrid()}
          {renderMedicalSnapshot()}
          {renderIntegrations()}
          {renderSettings()}
        </View>
      </ScrollView>

      {renderFullAnalysisModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  gradientHeader: {
    width: screenWidth + 40,
    marginHorizontal: -20,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  safeAreaTop: {
    height: Platform.OS === 'ios' ? 60 : 35,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  settingsButton: {
    padding: 8,
    marginLeft: -8,
  },
  nameRow: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subscriptionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 5,
  },
  planText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  creditsDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  creditsText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: -0.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  editButton: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  perspectiveLens: {
    marginBottom: 16,
  },
  perspectivePills: {
    flexDirection: 'row',
    gap: 8,
  },
  perspectivePill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
  },
  perspectivePillActive: {
    backgroundColor: Colors.black,
  },
  perspectiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  perspectiveTextActive: {
    color: Colors.white,
  },
  summaryContent: {
    position: 'relative',
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.lavender,
    letterSpacing: -0.2,
  },
  showFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  showFullText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginHorizontal: -8,
  },
  infoItem: {
    width: '33.333%',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicalSummary: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  diagnosisPill: {
    backgroundColor: Colors.coral + '15',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  diagnosisText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.coral,
    letterSpacing: -0.2,
  },
  medicationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.amber + '10',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  medicationText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  expandedContent: {
    marginTop: 16,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textTertiary,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  detailRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  detailSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
  integrationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  integrationsScroll: {
    paddingRight: 20,
  },
  integrationCard: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  integrationConnected: {
    borderColor: Colors.health,
    backgroundColor: Colors.health + '05',
  },
  integrationName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
    marginTop: 6,
    textAlign: 'center',
  },
  integrationStatus: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  integrationStatusConnected: {
    color: Colors.health,
    fontWeight: '600',
  },
  settingsSection: {
    marginTop: 10,
  },
  settingsList: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    flex: 1,
  },
  dangerZone: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dangerText: {
    color: Colors.error,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  modalClose: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.2,
  },
  analysisPage: {
    width: screenWidth,
    padding: 20,
    paddingTop: 30,
  },
  analysisBadge: {
    backgroundColor: Colors.lavender + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  analysisPerspective: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.lavender,
    letterSpacing: 0.8,
  },
  analysisText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  regenerateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 30,
  },
  regenerateText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
});

export default ProfileScreen;