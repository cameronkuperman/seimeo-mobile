import React, { useRef } from 'react';
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

interface ActionItem {
  id: string;
  icon: string;
  label: string;
  route: string;
  color: string;
}

const QuickActionsGrid: React.FC = () => {
  const navigation = useNavigation();
  const scaleAnims = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const actions: ActionItem[] = [
    { id: 'quick', icon: '⚡', label: 'Quick', route: 'QuickScan', color: Colors.mint },
    { id: 'photo', icon: '📷', label: 'Photo', route: 'PhotoAnalysis', color: Colors.ocean },
    { id: 'deep', icon: '🧠', label: 'Deep', route: 'DeepDive', color: Colors.lavender },
    { id: 'log', icon: '➕', label: 'Log', route: 'SymptomLog', color: Colors.coral },
  ];

  const handlePressIn = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scaleAnims[index], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Log your symptoms</Text>
        <View style={styles.grid}>
          {actions.map((action, index) => (
            <Animated.View
              key={action.id}
              style={[
                styles.actionWrapper,
                { transform: [{ scale: scaleAnims[index] }] },
              ]}
            >
              <TouchableOpacity
                style={styles.actionButton}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
                onPress={() => handlePress(action.route)}
                activeOpacity={0.9}
              >
                <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
                  <Text style={styles.icon}>{action.icon}</Text>
                </View>
                <Text style={styles.label}>{action.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
});

export default QuickActionsGrid;