import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

const { height } = Dimensions.get('window');

interface EmptyStateProps {
  onGeneratePress: (type: 'doctor' | 'insurance') => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onGeneratePress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle icon animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconRotate, {
          toValue: 0.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(iconRotate, {
          toValue: -0.02,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = iconRotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <Ionicons
            name="document-text-outline"
            size={64}
            color={Colors.borderMedium}
          />
          <View style={styles.iconBadge}>
            <Ionicons
              name="add-circle"
              size={24}
              color={Colors.black}
            />
          </View>
        </Animated.View>

        <Text style={styles.title}>Your health story starts here</Text>
        <Text style={styles.subtitle}>
          Generate your first report to begin{'\n'}tracking your medical journey
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => onGeneratePress('doctor')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="medical-outline"
              size={20}
              color={Colors.white}
              style={styles.buttonIcon}
            />
            <Text style={styles.primaryButtonText}>Generate Doctor Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => onGeneratePress('insurance')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={Colors.black}
              style={styles.buttonIcon}
            />
            <Text style={styles.secondaryButtonText}>Generate Insurance Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={Colors.textTertiary}
            />
            <Text style={styles.infoText}>Takes ~2 minutes</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Ionicons
              name="lock-closed-outline"
              size={16}
              color={Colors.textTertiary}
            />
            <Text style={styles.infoText}>Secure & Private</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    minHeight: height * 0.6,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  buttonIcon: {
    marginRight: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  infoDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
});

export default EmptyState;