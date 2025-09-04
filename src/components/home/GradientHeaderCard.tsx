import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../theme/colors';

interface GradientHeaderCardProps {
  score?: number;
  weeklyChange?: number;
  date?: Date;
}

const { width } = Dimensions.get('window');

const GradientHeaderCard: React.FC<GradientHeaderCardProps> = ({
  score = 85,
  weeklyChange = 2,
  date = new Date(),
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(progressAnim, {
        toValue: score / 100,
        duration: 1000,
        delay: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={[Colors.ocean, Colors.lavender]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientBackground}
      >
        {/* Date */}
        <Text style={styles.dateText}>{dateString}</Text>

        {/* Score */}
        <Text style={styles.scoreNumber}>{score}</Text>
        <Text style={styles.scoreLabel}>Your health score</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressWidth,
                },
              ]}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>
        </View>

        {/* Weekly Change */}
        {weeklyChange !== 0 && (
          <Text style={styles.changeText}>
            {weeklyChange > 0 ? '↑' : '↓'} {Math.abs(weeklyChange)} from last week
          </Text>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    marginLeft: -16, // Negative margin to go edge-to-edge
    marginRight: -16,
  },
  gradientBackground: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  scoreNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: -2,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.95)',
    marginBottom: 20,
    letterSpacing: -0.2,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 12,
  },
  progressBackground: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressGradient: {
    flex: 1,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#A8E6A3', // Light green for positive change
    letterSpacing: -0.2,
  },
});

export default GradientHeaderCard;