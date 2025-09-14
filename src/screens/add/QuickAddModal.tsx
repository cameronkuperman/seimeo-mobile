import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
  Vibration,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface QuickAction {
  id: string;
  icon: string;
  iconFamily: 'ionicons' | 'feather' | 'material';
  title: string;
  subtitle?: string;
  route: string;
  time?: string;
  lastUsed?: string;
  color?: string;
}

interface QuickAddModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Primary AI Assessment Actions - 4 core features with strategic colors
  const primaryActions: QuickAction[] = [
    {
      id: 'general-assessment',
      icon: 'medical-outline',
      iconFamily: 'ionicons',
      title: 'General Assessment',
      subtitle: 'Health check',
      route: 'GeneralAssessment',
      time: '2 min',
      color: '#10B981', // Mint green
    },
    {
      id: 'body-scan',
      icon: 'body-outline',
      iconFamily: 'ionicons',
      title: '3D Body Scan',
      subtitle: 'Visual mapping',
      route: 'BodyScan',
      time: '1 min',
      color: '#F87171', // Soft coral
    },
    {
      id: 'photo',
      icon: 'camera-outline',
      iconFamily: 'ionicons',
      title: 'Photo Analysis',
      subtitle: 'AI vision',
      route: 'PhotoAnalysis',
      time: 'Instant',
      color: '#0EA5E9', // Ocean blue
    },
    {
      id: 'oracle',
      icon: 'sparkles',
      iconFamily: 'ionicons',
      title: 'Oracle Chat',
      subtitle: 'AI assistant',
      route: 'Oracle',
      time: 'Live',
      color: '#9B87F5', // Lavender
    },
  ];

  // Secondary Quick Actions
  const secondaryActions: QuickAction[] = [
    {
      id: 'dr-mei',
      icon: 'headset-outline',
      iconFamily: 'ionicons',
      title: 'Dr. Mei',
      route: 'DrMei',
    },
    {
      id: 'symptom',
      icon: 'add-circle-outline',
      iconFamily: 'ionicons',
      title: 'Log Symptom',
      route: 'SymptomLog',
    },
    {
      id: 'record',
      icon: 'mic-circle-outline',
      iconFamily: 'ionicons',
      title: 'Record Visit',
      route: 'RecordVisit',
    },
  ];

  useEffect(() => {
    if (visible) {
      // Entrance animation
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
      ]).start();
    }
  }, [visible]);

  const handleActionPress = (route: string) => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10);
    }
    
    // Animate out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      // Navigate to parent navigator for assessment screens
      const parentNav = navigation.getParent();
      if (parentNav) {
        parentNav.navigate(route as never);
      } else {
        navigation.navigate(route as never);
      }
    });
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const renderIcon = (action: QuickAction, size: number = 24, color?: string) => {
    const iconColor = color || Colors.black;
    const props = { size, color: iconColor };

    switch (action.iconFamily) {
      case 'feather':
        return <Feather name={action.icon} {...props} />;
      case 'material':
        return <MaterialIcons name={action.icon} {...props} />;
      default:
        return <Icon name={action.icon} {...props} />;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: backdropAnim },
        ]}
      >
        <TouchableOpacity 
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Minimal Handle */}
          <View style={styles.handle} />
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>What would you like to do?</Text>
          </View>

          {/* Primary AI Assessment Grid */}
          <View style={styles.primaryGrid}>
            {primaryActions.map((action) => (
              <Pressable
                key={action.id}
                style={({ pressed }) => [
                  styles.primaryCard,
                  pressed && styles.primaryCardPressed,
                  activeCard === action.id && styles.primaryCardActive,
                ]}
                onPress={() => handleActionPress(action.route)}
                onPressIn={() => setActiveCard(action.id)}
                onPressOut={() => setActiveCard(null)}
              >
                <View style={styles.timeIndicator}>
                  <Text style={[
                    styles.timeText,
                    activeCard === action.id && styles.timeTextActive
                  ]}>{action.time}</Text>
                </View>
                
                <View style={[
                  styles.primaryIconContainer,
                  { backgroundColor: activeCard === action.id ? 'rgba(255, 255, 255, 0.2)' : `${action.color}18` },
                ]}>
                  {renderIcon(action, 24, activeCard === action.id ? Colors.white : action.color)}
                </View>
                
                <Text style={[
                  styles.primaryTitle,
                  activeCard === action.id && styles.primaryTitleActive
                ]}>{action.title}</Text>
                
                <Text style={[
                  styles.primarySubtitle,
                  activeCard === action.id && styles.primarySubtitleActive
                ]}>{action.subtitle}</Text>
              </Pressable>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Secondary Actions Row */}
          <View style={styles.secondaryContainer}>
            {secondaryActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.secondaryItem}
                onPress={() => handleActionPress(action.route)}
                activeOpacity={0.7}
              >
                <View style={styles.secondaryIconCircle}>
                  {renderIcon(action, 20, Colors.black)}
                </View>
                <Text style={styles.secondaryLabel}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Voice Input Bar */}
          <TouchableOpacity 
            style={styles.voiceBar}
            activeOpacity={0.9}
          >
            <View style={styles.voiceContent}>
              <View style={styles.voiceIconContainer}>
                <Icon name="mic" size={18} color={Colors.white} />
              </View>
              <Text style={styles.voiceText}>Hold to describe symptoms</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: screenHeight * 0.75,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.15,
        shadowRadius: 40,
      },
      android: {
        elevation: 32,
      },
    }),
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
    letterSpacing: -0.5,
  },
  primaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  primaryCard: {
    width: (screenWidth - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    minHeight: 110,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  primaryCardPressed: {
    transform: [{ scale: 0.97 }],
  },
  primaryCardActive: {
    backgroundColor: Colors.black,
    borderColor: Colors.black,
  },
  timeIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  timeTextActive: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  primaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    letterSpacing: -0.4,
    marginBottom: 4,
    lineHeight: 20,
  },
  primaryTitleActive: {
    color: Colors.white,
  },
  primarySubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  primarySubtitleActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginBottom: 8,
  },
  secondaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  secondaryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  secondaryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  voiceBar: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  voiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: 24,
    paddingVertical: 16,
    gap: 10,
  },
  voiceIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.3,
  },
});

export default QuickAddModal;