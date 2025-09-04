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
import Icon from 'react-native-vector-icons/Ionicons';
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
    { id: 'quick', icon: 'flash-outline', label: 'Quick', route: 'QuickScan', color: Colors.mint },
    { id: 'photo', icon: 'camera-outline', label: 'Photo', route: 'PhotoAnalysis', color: Colors.ocean },
    { id: 'deep', icon: 'pulse-outline', label: 'Deep', route: 'DeepDive', color: Colors.lavender },
    { id: 'log', icon: 'add-circle-outline', label: 'Log', route: 'SymptomLog', color: Colors.coral },
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
                  <Icon name={action.icon} size={28} color={action.color} />
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
    paddingHorizontal: 20,
    marginTop: 0,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 20,
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
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: -0.2,
  },
});

export default QuickActionsGrid;