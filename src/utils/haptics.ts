import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Platform } from 'react-native';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const Haptics = {
  // Light impact for button presses and selections
  light: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactLight', options);
    } else {
      ReactNativeHapticFeedback.trigger('effectClick', options);
    }
  },

  // Medium impact for important actions
  medium: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactMedium', options);
    } else {
      ReactNativeHapticFeedback.trigger('effectHeavyClick', options);
    }
  },

  // Selection feedback for toggles and options
  selection: () => {
    ReactNativeHapticFeedback.trigger('selection', options);
  },

  // Success notification for completion states
  success: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationSuccess', options);
    } else {
      ReactNativeHapticFeedback.trigger('effectDoubleClick', options);
    }
  },

  // Error notification for validation failures
  error: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationError', options);
    } else {
      ReactNativeHapticFeedback.trigger('effectHeavyClick', options);
    }
  },
};