import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  ActivityIndicator,
  Animated,
  TouchableOpacityProps,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useHaptic } from '../../hooks/useHaptic';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  onPress,
  disabled,
  style,
  textStyle,
  ...props
}) => {
  const { triggerHaptic } = useHaptic();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      if (Platform.OS === 'ios') {
        triggerHaptic('impactLight');
      }
      onPress();
    }
  };

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={buttonStyles}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? Colors.textInverse : Colors.black}
            size="small"
          />
        ) : (
          <Text style={textStyles}>{children}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },

  // Variants
  primary: {
    backgroundColor: Colors.black,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  text: {
    backgroundColor: 'transparent',
  },

  // Sizes
  small: {
    minHeight: 36,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  medium: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  large: {
    minHeight: 56,
    paddingVertical: 18,
    paddingHorizontal: 36,
  },

  // States
  disabled: {
    opacity: 0.4,
  },

  // Text styles
  text: {
    fontFamily: Platform.select({
      ios: 'SF Pro Text',
      android: 'Roboto',
    }),
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  text_primary: {
    color: Colors.textInverse,
  },
  text_secondary: {
    color: Colors.textPrimary,
  },
  text_ghost: {
    color: Colors.textPrimary,
  },
  text_text: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  text_small: {
    fontSize: 14,
    lineHeight: 20,
  },
  text_medium: {
    fontSize: 16,
    lineHeight: 22,
  },
  text_large: {
    fontSize: 17,
    lineHeight: 24,
  },
  textDisabled: {
    opacity: 0.7,
  },
});