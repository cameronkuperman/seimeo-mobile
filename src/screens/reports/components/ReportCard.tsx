import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Colors } from '../../../theme/colors';

interface Report {
  id: string;
  title: string;
  date: string;
  preview: string;
  provider: string;
  location?: string;
  type: 'physical' | 'lab' | 'insurance' | 'specialist' | 'prescription' | 'imaging' | 'mental';
  status?: 'ready' | 'processing';
}

interface ReportCardProps {
  report: Report;
  onPress: () => void;
  onLongPress: () => void;
  isSelected: boolean;
  index: number;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onPress,
  onLongPress,
  isSelected,
  index,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const getTypeColor = () => {
    switch (report.type) {
      case 'physical':
        return Colors.health;
      case 'lab':
        return Colors.ocean;
      case 'insurance':
        return Colors.amber;
      case 'specialist':
        return Colors.lavender;
      case 'prescription':
        return Colors.mint;
      case 'imaging':
        return Colors.coral;
      case 'mental':
        return Colors.lavender;
      default:
        return Colors.textSecondary;
    }
  };

  const getTypeLabel = () => {
    switch (report.type) {
      case 'physical':
        return 'Physical';
      case 'lab':
        return 'Lab Results';
      case 'insurance':
        return 'Insurance';
      case 'specialist':
        return 'Specialist';
      case 'prescription':
        return 'Prescription';
      case 'imaging':
        return 'Imaging';
      case 'mental':
        return 'Mental Health';
      default:
        return 'Report';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: translateY },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          isSelected && styles.selectedCard,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {report.title}
            </Text>
            <Text style={styles.date}>{report.date}</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor()}15` }]}>
            <Text style={[styles.typeLabel, { color: getTypeColor() }]}>
              {getTypeLabel()}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.preview} numberOfLines={3}>
          {report.preview}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.provider}>
            {report.provider}
            {report.location && ` • ${report.location}`}
          </Text>
          {report.status === 'processing' && (
            <View style={styles.processingBadge}>
              <Text style={styles.processingText}>Processing</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedCard: {
    borderColor: Colors.black,
    borderWidth: 1.5,
  },
  cardHeader: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
    marginRight: 12,
    letterSpacing: -0.2,
  },
  date: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '400',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 12,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  preview: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  provider: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '400',
  },
  processingBadge: {
    backgroundColor: Colors.amber,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  processingText: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: '600',
  },
});

export default ReportCard;