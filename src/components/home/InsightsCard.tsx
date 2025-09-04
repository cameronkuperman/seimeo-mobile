import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const InsightsCard: React.FC = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = new Animated.Value(0);

  const insights = [
    'Your sleep patterns correlate with headache frequency',
    'Hydration levels may be affecting your energy',
    'Consider vitamin D supplementation based on recent patterns',
  ];

  const toggleExpanded = () => {
    setExpanded(!expanded);
    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.95}
        onPress={() => navigation.navigate('Insights' as never)}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>💡</Text>
            <Text style={styles.title}>New Insights Available</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Personalized patterns from your health data
          </Text>
        </View>

        {/* Preview of first insight */}
        <View style={styles.insightPreview}>
          <Text style={styles.insightText} numberOfLines={2}>
            "{insights[0]}"
          </Text>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Insights' as never)}
        >
          <Text style={styles.viewButtonText}>View all insights</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* AI Powered Badge */}
        <View style={styles.aiBadgeContainer}>
          <Text style={styles.aiBadge}>Powered by Medical AI</Text>
          <Text style={styles.aiBadgeDot}> · </Text>
        </View>
      </TouchableOpacity>
    </View>
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
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.ocean + '20',
    ...Platform.select({
      ios: {
        shadowColor: Colors.ocean,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    letterSpacing: -0.2,
  },
  badge: {
    backgroundColor: Colors.ocean,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    letterSpacing: -0.1,
  },
  insightPreview: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  insightText: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 20,
    fontStyle: 'italic',
    letterSpacing: -0.2,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  viewButtonText: {
    fontSize: 15,
    color: Colors.ocean,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  chevron: {
    fontSize: 20,
    color: Colors.ocean,
  },
  aiBadgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
  },
  aiBadge: {
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 0,
  },
  aiBadgeDot: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
});

export default InsightsCard;