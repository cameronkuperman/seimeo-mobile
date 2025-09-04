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

interface InsightCardProps {
  title: string;
  description: string;
  actionText?: string;
  riskLevel?: 'high' | 'medium' | 'low';
  onAction?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  actionText = 'Take action',
  riskLevel = 'medium',
  onAction,
}) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigation.navigate('InsightDetails' as never);
    }
  };

  const getBadgeColor = () => {
    switch (riskLevel) {
      case 'high':
        return Colors.coral;
      case 'medium':
        return Colors.amber;
      case 'low':
        return Colors.ocean;
      default:
        return Colors.amber;
    }
  };

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
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>INSIGHT</Text>
          <View style={[styles.badge, { backgroundColor: getBadgeColor() }]} />
        </View>

        {/* Content */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Action */}
        <TouchableOpacity onPress={handleAction} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: getBadgeColor() }]}>
            {actionText} →
          </Text>
        </TouchableOpacity>
      </View>
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
        shadowColor: Colors.shadowMedium,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    marginLeft: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});

export default InsightCard;