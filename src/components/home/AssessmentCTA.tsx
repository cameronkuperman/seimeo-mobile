import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

const AssessmentCTA: React.FC = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate('QuickScan' as never);
  };

  const handleQuickScan = () => {
    navigation.navigate('QuickScan' as never);
  };

  const handleDeepDive = () => {
    navigation.navigate('DeepDive' as never);
  };

  const handlePhotoAnalysis = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('PhotoAnalysis' as never);
    } else {
      navigation.navigate('PhotoAnalysis' as never);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.question}>How are you feeling?</Text>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
          >
            <LinearGradient
              colors={[Colors.ocean, Colors.lavender]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>Start Assessment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={handleQuickScan}>
            <Text style={styles.optionText}>Quick</Text>
          </TouchableOpacity>
          <Text style={styles.optionDivider}>•</Text>
          <TouchableOpacity onPress={handleDeepDive}>
            <Text style={styles.optionText}>Deep</Text>
          </TouchableOpacity>
          <Text style={styles.optionDivider}>•</Text>
          <TouchableOpacity onPress={handlePhotoAnalysis}>
            <Text style={styles.optionText}>Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  question: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  mainButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: -0.2,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  optionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    paddingHorizontal: 8,
  },
  optionDivider: {
    fontSize: 15,
    color: Colors.textTertiary,
  },
});

export default AssessmentCTA;