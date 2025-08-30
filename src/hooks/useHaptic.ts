import { Platform } from 'react-native';

export type HapticType = 
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'
  | 'selection';

export const useHaptic = () => {
  const triggerHaptic = async (type: HapticType = 'impactLight') => {
    // Haptic feedback temporarily disabled - will be implemented with react-native-haptic-feedback
    // For now, this is a no-op to allow the app to run
    if (Platform.OS !== 'ios') return;
    
    // TODO: Implement with react-native-haptic-feedback
    // npm install react-native-haptic-feedback
    console.log(`Haptic feedback: ${type}`);
  };

  return { triggerHaptic };
};