import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../theme/colors';

const ReportsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Reports</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Generate Report for Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Generate Insurance Report</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.placeholder}>
          Your medical reports will appear here
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  quickActions: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default ReportsScreen;