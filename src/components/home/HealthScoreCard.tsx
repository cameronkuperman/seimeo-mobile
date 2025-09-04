import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const HealthScoreCard: React.FC = () => {
  const navigation = useNavigation();
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const healthScore = 85;
  const maxScore = 100;
  const lastScanDays = 3;

  useEffect(() => {
    // Animate score counting up
    Animated.timing(scoreAnim, {
      toValue: healthScore,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    // Animate progress bar fill
    Animated.timing(progressAnim, {
      toValue: healthScore / maxScore,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    // Scale animation for entrance
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedScore = scoreAnim.interpolate({
    inputRange: [0, healthScore],
    outputRange: ['0', healthScore.toString()],
  });

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
        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Animated.Text style={styles.scoreNumber}>
            {animatedScore}
          </Animated.Text>
          <Text style={styles.scoreLabel}>Health Score</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressWidth,
                },
              ]}
            >
              {/* Gradient effect using multiple views */}
              <View style={styles.gradientSegment1} />
              <View style={styles.gradientSegment2} />
              <View style={styles.gradientSegment3} />
            </Animated.View>
          </View>
          {/* Progress segments markers */}
          <View style={styles.segmentMarkers}>
            {[...Array(20)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.marker,
                  i < (healthScore / 5) && styles.markerFilled,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Text style={styles.statusText}>
            {healthScore >= 80 ? '↑' : healthScore >= 60 ? '→' : '↓'} 
            {' '}Based on 14 data points
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewDetailsText}>View Analysis ›</Text>
          </TouchableOpacity>
        </View>

        {/* Last Scan Info */}
        <View style={styles.lastScanContainer}>
          <View style={styles.lastScanDot} />
          <Text style={styles.lastScanText}>
            Last scan: {lastScanDays} {lastScanDays === 1 ? 'day' : 'days'} ago
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreNumber: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  scoreLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  progressContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.health,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gradientSegment1: {
    flex: 1,
    backgroundColor: Colors.mint,
    opacity: 0.8,
  },
  gradientSegment2: {
    flex: 1,
    backgroundColor: Colors.health,
    opacity: 0.9,
  },
  gradientSegment3: {
    flex: 1,
    backgroundColor: Colors.health,
  },
  segmentMarkers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  marker: {
    width: 2,
    height: 8,
    backgroundColor: 'transparent',
  },
  markerFilled: {
    backgroundColor: Colors.white,
    opacity: 0.3,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: -0.1,
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.ocean,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  lastScanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  lastScanDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.health,
    marginRight: 8,
  },
  lastScanText: {
    fontSize: 13,
    color: Colors.textTertiary,
    letterSpacing: -0.1,
  },
});

export default HealthScoreCard;