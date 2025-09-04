import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

interface HealthIntelligenceCardProps {
  score?: number;
  weeklyChange?: number;
  velocity?: number;
  patternsDetected?: number;
}

const HealthIntelligenceCard: React.FC<HealthIntelligenceCardProps> = ({
  score = 85,
  weeklyChange = 2,
  velocity = 0.3,
  patternsDetected = 2,
}) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Animate progress fill
    Animated.timing(progressAnim, {
      toValue: score / 100,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => navigation.navigate('HealthDetails' as never)}
      >
        {/* Header with badge */}
        <View style={styles.header}>
          <Text style={styles.headerText}>HEALTH</Text>
          <View style={styles.badge} />
        </View>

        {/* Score Section */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreNumber}>{score}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View style={{ width: progressWidth }}>
                <LinearGradient
                  colors={[Colors.mint, Colors.ocean]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressFill}
                />
              </Animated.View>
            </View>
          </View>
          {weeklyChange > 0 && (
            <Text style={styles.changeText}>↑{weeklyChange} from last week</Text>
          )}
        </View>

        {/* Bottom info */}
        {patternsDetected > 0 && (
          <Text style={styles.patternsText}>
            {patternsDetected} patterns detected
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  badge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ocean,
    marginLeft: 8,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  changeText: {
    fontSize: 13,
    color: Colors.health,
    marginTop: 4,
  },
  patternsText: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 12,
  },
});

export default HealthIntelligenceCard;