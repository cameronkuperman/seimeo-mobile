import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  route: string;
  badge?: string;
}

const QuickActionsCard: React.FC = () => {
  const navigation = useNavigation();

  const actions: QuickAction[] = [
    {
      id: 'scan',
      icon: '🩺',
      title: 'Quick Body Scan',
      subtitle: 'Tell us what\'s bothering you',
      route: 'QuickScan',
    },
    {
      id: 'deep',
      icon: '🧠',
      title: 'Deep Assessment',
      subtitle: 'Comprehensive health analysis',
      route: 'DeepDive',
    },
    {
      id: 'photo',
      icon: '📸',
      title: 'Track with Photo',
      subtitle: 'Visual symptom tracking',
      route: 'PhotoAnalysis',
    },
    {
      id: 'oracle',
      icon: '💬',
      title: 'Ask Dr. Mei Oracle',
      subtitle: 'AI health assistant',
      route: 'Oracle',
      badge: '● Online',
    },
  ];

  const handleActionPress = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What would you like to do?</Text>
        
        <View style={styles.actionsList}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionItem,
                index === actions.length - 1 && styles.lastActionItem,
              ]}
              onPress={() => handleActionPress(action.route)}
              activeOpacity={0.7}
            >
              <View style={styles.actionContent}>
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <View style={styles.actionTextContainer}>
                  <View style={styles.actionTitleRow}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    {action.badge && (
                      <Text style={styles.actionBadge}>{action.badge}</Text>
                    )}
                  </View>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    letterSpacing: -0.2,
  },
  actionsList: {
    paddingHorizontal: 16,
  },
  actionItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  lastActionItem: {
    borderBottomWidth: 0,
    paddingBottom: 16,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  actionBadge: {
    fontSize: 11,
    color: Colors.health,
    fontWeight: '600',
  },
  actionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  chevron: {
    fontSize: 22,
    color: Colors.textTertiary,
    marginLeft: 8,
  },
});

export default QuickActionsCard;