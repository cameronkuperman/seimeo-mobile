import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { HeaderTypography } from '../../theme/typography';

interface GradientHeaderCardProps {
  score?: number;
  weeklyChange?: number;
  date?: Date;
}

const { width: screenWidth } = Dimensions.get('window');

const GradientHeaderCard: React.FC<GradientHeaderCardProps> = ({
  score = 85,
  weeklyChange = 2,
  date = new Date(),
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
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
        colors={['#6B9AE2', '#8B7FBA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.8 }}
        style={styles.gradientBackground}
      >
        <View style={styles.statusBarSpace} />
        
        {/* Date */}
        <Text style={styles.dateText}>
          {dateString.toUpperCase()}
        </Text>

        {/* Score */}
        <Animated.Text 
          style={[
            styles.scoreNumber,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          {score}
        </Animated.Text>
        
        <Text style={styles.scoreLabel}>
          Your health score
        </Text>

        {/* Trend indicator - always render container for consistent spacing */}
        <View style={styles.trendContainer}>
          {weeklyChange !== 0 && (
            <>
              <Icon 
                name={weeklyChange > 0 ? "arrow-up" : "arrow-down"} 
                size={16} 
                color={Colors.white} 
              />
              <Text style={styles.trendText}>
                {Math.abs(weeklyChange)} from last week
              </Text>
            </>
          )}
        </View>

        {/* CTA Button with wrapper for spacing */}
        <View style={styles.ctaWrapper}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaText}>View insights</Text>
            <Icon name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Extra spacer to ensure padding */}
        <View style={{ height: 15 }} />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    marginTop: -50, // Pull up to start from top
    marginBottom: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    width: screenWidth,
    paddingTop: 0,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  statusBarSpace: {
    height: Platform.OS === 'ios' ? 110 : 85,
  },
  dateText: {
    ...HeaderTypography.date,
    marginBottom: 12,
  },
  scoreNumber: {
    ...HeaderTypography.score,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 2,
  },
  scoreLabel: {
    ...HeaderTypography.scoreLabel,
    marginTop: 0,
    marginBottom: 8,
  },
  ctaWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    marginRight: 8,
    letterSpacing: -0.2,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
    marginBottom: 10,
    gap: 6,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: -0.2,
  },
});

export default GradientHeaderCard;