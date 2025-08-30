import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface CardProps {
  variant?: 'default' | 'mint' | 'coral' | 'purple';
  elevated?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  elevated = false,
  onPress,
  children,
  style,
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    elevated && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.95}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Variants
  default: {
    backgroundColor: Colors.surface,
    borderColor: Colors.borderLight,
  },
  mint: {
    backgroundColor: Colors.mint,
    borderColor: Colors.mintActive,
  },
  coral: {
    backgroundColor: Colors.coralMuted,
    borderColor: Colors.coral,
  },
  purple: {
    backgroundColor: Colors.primaryMuted,
    borderColor: Colors.primaryLight,
  },

  // Elevated state
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowMedium,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});