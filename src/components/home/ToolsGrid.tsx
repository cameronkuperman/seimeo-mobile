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

interface Tool {
  id: string;
  title: string;
  subtitle: string;
  route: string;
}

const ToolsGrid: React.FC = () => {
  const navigation = useNavigation();

  const tools: Tool[] = [
    { id: '3d', title: '3D Body', subtitle: 'Scan', route: 'BodyScan' },
    { id: 'chat', title: 'Chat', subtitle: 'AI', route: 'Oracle' },
    { id: 'reports', title: 'Reports', subtitle: 'PDF', route: 'Reports' },
    { id: 'voice', title: 'Voice', subtitle: 'Call', route: 'DrMei' },
  ];

  const handlePress = (route: string) => {
    navigation.navigate(route as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Tools</Text>
        <View style={styles.grid}>
          {tools.map((tool, index) => (
            <TouchableOpacity
              key={tool.id}
              style={[
                styles.toolItem,
                index % 2 === 1 && styles.toolItemRight,
                index >= 2 && styles.toolItemBottom,
              ]}
              onPress={() => handlePress(tool.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
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
    marginBottom: 100, // Space for tab bar
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
  header: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toolItem: {
    flex: 1,
    minWidth: '50%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  toolItemRight: {
    borderRightWidth: 0,
  },
  toolItemBottom: {
    borderBottomWidth: 0,
  },
  toolTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  toolSubtitle: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginTop: 2,
  },
});

export default ToolsGrid;