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
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import StatusBadge from './StatusBadge';

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
  actionText = 'Take preventive action',
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

  const getActionColor = () => {
    switch (riskLevel) {
      case 'high':
        return Colors.coral;
      case 'medium':
        return '#FF9800';
      case 'low':
        return Colors.ocean;
      default:
        return '#FF9800';
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
        <StatusBadge type="insight" />
        
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <TouchableOpacity onPress={handleAction} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: getActionColor() }]}>
            {actionText}
          </Text>
          <Icon name="arrow-forward" size={16} color={getActionColor()} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.03)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  content: {
    marginTop: 16,
  },
  title: {
    ...Typography.h3,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  actionButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...Typography.bodyBold,
    marginRight: 4,
  },
});

export default InsightCard;