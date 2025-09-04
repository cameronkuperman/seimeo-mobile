import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface StatusBadgeProps {
  type: 'insight' | 'tracking' | 'medical' | 'lab' | 'appointment';
  text?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, text }) => {
  const getStylesByType = () => {
    switch (type) {
      case 'insight':
        return {
          backgroundColor: '#FFF3E0',
          color: '#E65100',
          defaultText: 'INSIGHT',
        };
      case 'tracking':
        return {
          backgroundColor: '#E8F5E9',
          color: '#2E7D32',
          defaultText: 'TRACKING',
        };
      case 'medical':
        return {
          backgroundColor: '#E8EAF6',
          color: '#283593',
          defaultText: 'MEDICAL IMAGING',
        };
      case 'lab':
        return {
          backgroundColor: '#F3E5F5',
          color: '#6A1B9A',
          defaultText: 'LAB RESULT',
        };
      case 'appointment':
        return {
          backgroundColor: '#E0F2F1',
          color: '#00695C',
          defaultText: 'APPOINTMENT',
        };
      default:
        return {
          backgroundColor: '#F5F5F5',
          color: '#616161',
          defaultText: 'STATUS',
        };
    }
  };

  const { backgroundColor, color, defaultText } = getStylesByType();

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>
        {text || defaultText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default StatusBadge;