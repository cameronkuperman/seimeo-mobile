import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../theme/colors';

interface QuickActionsProps {
  onPress: (type: 'doctor' | 'insurance') => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onPress }) => {
  const doctorScale = useRef(new Animated.Value(1)).current;
  const insuranceScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (scaleAnim: Animated.Value) => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleAnim: Animated.Value) => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: doctorScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPress('doctor')}
          onPressIn={() => handlePressIn(doctorScale)}
          onPressOut={() => handlePressOut(doctorScale)}
          activeOpacity={0.9}
        >
          <Ionicons
            name="add"
            size={18}
            color={Colors.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Generate Doctor Report</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: insuranceScale }] },
        ]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPress('insurance')}
          onPressIn={() => handlePressIn(insuranceScale)}
          onPressOut={() => handlePressOut(insuranceScale)}
          activeOpacity={0.9}
        >
          <Ionicons
            name="add"
            size={18}
            color={Colors.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Generate Insurance Report</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  actionButton: {
    backgroundColor: Colors.black,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

export default QuickActions;