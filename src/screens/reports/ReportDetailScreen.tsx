import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

interface MetricCardProps {
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, status, icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return Colors.health;
      case 'warning':
        return Colors.amber;
      case 'critical':
        return Colors.coral;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon} size={20} color={getStatusColor()} />
        <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricStatus, { color: getStatusColor() }]}>
        {status === 'normal' ? 'Normal' : status === 'warning' ? 'Monitor' : 'Alert'}
      </Text>
    </View>
  );
};

interface ChartBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ label, value, maxValue, color }) => {
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: (value / maxValue) * 100,
      duration: 800,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.chartBar}>
      <Text style={styles.chartLabel}>{label}</Text>
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: barWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={styles.chartValue}>{value}</Text>
    </View>
  );
};

const ReportDetailScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.black} />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
          Report Details
        </Animated.Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Report Header */}
        <View style={styles.reportHeader}>
          <Text style={styles.reportTitle}>Annual Physical Examination</Text>
          <Text style={styles.reportDate}>November 7, 2024 • 2:30 PM</Text>
          <View style={styles.providerRow}>
            <Ionicons name="medical" size={16} color={Colors.textTertiary} />
            <Text style={styles.providerText}>Dr. Sarah Chen • Seimeo Medical Center</Text>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              label="Blood Pressure"
              value="118/76"
              status="normal"
              icon="heart-outline"
            />
            <MetricCard
              label="Heart Rate"
              value="72 bpm"
              status="normal"
              icon="pulse-outline"
            />
            <MetricCard
              label="BMI"
              value="22.4"
              status="normal"
              icon="body-outline"
            />
            <MetricCard
              label="Temperature"
              value="98.6°F"
              status="normal"
              icon="thermometer-outline"
            />
          </View>
        </View>

        {/* Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Trends</Text>
          <View style={styles.chartContainer}>
            <ChartBar label="Cholesterol" value={185} maxValue={300} color={Colors.ocean} />
            <ChartBar label="HDL" value={62} maxValue={100} color={Colors.health} />
            <ChartBar label="LDL" value={98} maxValue={200} color={Colors.mint} />
            <ChartBar label="Glucose" value={92} maxValue={150} color={Colors.amber} />
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>
            Comprehensive health screening completed with all vital signs within normal ranges. 
            Patient shows excellent cardiovascular health with blood pressure at 118/76 mmHg and 
            resting heart rate of 72 bpm. BMI of 22.4 indicates healthy weight range.
          </Text>
          <Text style={styles.summaryText}>
            Laboratory results demonstrate healthy metabolic profile with fasting glucose at 92 mg/dL 
            and lipid panel showing favorable cholesterol distribution. No abnormalities detected in 
            complete blood count or comprehensive metabolic panel.
          </Text>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.health} />
            <Text style={styles.recommendationText}>Continue current exercise routine of 150 minutes weekly</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.health} />
            <Text style={styles.recommendationText}>Maintain balanced diet with emphasis on whole foods</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.health} />
            <Text style={styles.recommendationText}>Schedule follow-up appointment in 12 months</Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.health} />
            <Text style={styles.recommendationText}>Continue Vitamin D supplementation as prescribed</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryAction}>
            <Ionicons name="download-outline" size={20} color={Colors.white} />
            <Text style={styles.primaryActionText}>Download PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.secondaryActionText}>Email Report</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.black,
  },
  shareButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  reportHeader: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  reportTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  reportDate: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  providerText: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    width: (width - 52) / 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  metricStatus: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chartContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  chartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chartLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    width: 80,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.black,
    width: 40,
    textAlign: 'right',
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 15,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 12,
  },
  primaryAction: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryActionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryAction: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryActionText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportDetailScreen;