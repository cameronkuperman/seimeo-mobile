import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

interface TimelineEntry {
  id: string;
  type: 'quickScan' | 'deepDive' | 'photoSession' | 'symptom' | 'report' | 'oracleChat';
  title: string;
  description?: string;
  timestamp: Date;
  data?: any;
  severity?: 'low' | 'medium' | 'high';
  hasFollowUp?: boolean;
  isExpanded?: boolean;
}

interface TimelineItemProps {
  item: TimelineEntry;
  isFirst: boolean;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    if (newExpanded) {
      Animated.parallel([
        Animated.spring(animatedHeight, {
          toValue: 1,
          useNativeDriver: false,
          speed: 12,
          bounciness: 6,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const getTypeConfig = () => {
    switch (item.type) {
      case 'quickScan':
        return {
          color: Colors.black,
          badge: 'MEDICAL IMAGING',
          dotSize: 12,
        };
      case 'deepDive':
        return {
          color: Colors.ocean,
          badge: 'DEEP ASSESSMENT',
          dotSize: 12,
        };
      case 'photoSession':
        return {
          color: Colors.coral,
          badge: 'PHOTO ANALYSIS',
          dotSize: 12,
        };
      case 'symptom':
        const severityColors = {
          low: Colors.mint,
          medium: Colors.amber,
          high: Colors.coral,
        };
        return {
          color: severityColors[item.severity || 'low'],
          badge: item.severity?.toUpperCase() || 'SYMPTOM',
          dotSize: 10,
        };
      case 'report':
        return {
          color: Colors.lavender,
          badge: 'LAB RESULT',
          dotSize: 12,
        };
      case 'oracleChat':
        return {
          color: Colors.black,
          badge: 'AI ORACLE',
          dotSize: 12,
        };
      default:
        return {
          color: Colors.gray,
          badge: 'ENTRY',
          dotSize: 10,
        };
    }
  };

  const typeConfig = getTypeConfig();
  const formatTimestamp = () => {
    const date = item.timestamp;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    if (isToday) {
      return `Today • ${time}`;
    } else if (isYesterday) {
      return `Yesterday • ${time}`;
    } else {
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
      });
      return `${dateStr} • ${time}`;
    }
  };

  const renderMiniPreview = () => {
    if (item.type === 'symptom' && item.data?.painLevel) {
      const level = item.data.painLevel;
      return (
        <View style={styles.severityDots}>
          {[1, 2, 3, 4, 5].map(i => (
            <View
              key={i}
              style={[
                styles.severityDot,
                {
                  backgroundColor: i <= level ? typeConfig.color : Colors.borderLight,
                  opacity: i <= level ? 1 : 0.3,
                },
              ]}
            />
          ))}
        </View>
      );
    }

    if (item.type === 'photoSession' && item.data?.photos) {
      return (
        <View style={styles.photoStrip}>
          {Array.from({ length: Math.min(3, item.data.photos) }).map((_, i) => (
            <View key={i} style={styles.photoThumb}>
              <View style={styles.photoPlaceholder} />
            </View>
          ))}
          {item.data.photos > 3 && (
            <Text style={styles.morePhotos}>+{item.data.photos - 3}</Text>
          )}
        </View>
      );
    }

    if ((item.type === 'deepDive' || item.type === 'quickScan') && item.data?.risk) {
      return (
        <View style={styles.riskPreview}>
          <Text style={[styles.riskText, { color: item.data.risk > 60 ? Colors.coral : Colors.mint }]}>
            Risk: {item.data.risk}%
          </Text>
        </View>
      );
    }

    if (item.type === 'report' && item.data?.status) {
      return (
        <View style={[styles.statusBadge, { backgroundColor: Colors.lavender + '20' }]}>
          <Text style={[styles.statusText, { color: Colors.lavender }]}>
            Ready for doctor
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderExpandedContent = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      {item.type === 'symptom' && (
        <View style={styles.expandedSection}>
          <Text style={styles.expandedLabel}>Location</Text>
          <Text style={styles.expandedValue}>{item.data?.location || 'Not specified'}</Text>
          <Text style={styles.expandedLabel}>Pain Level</Text>
          <View style={styles.painScale}>
            {[1, 2, 3, 4, 5].map(i => (
              <View
                key={i}
                style={[
                  styles.painScaleItem,
                  {
                    backgroundColor: i <= (item.data?.painLevel || 0) 
                      ? typeConfig.color 
                      : Colors.borderLight,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {(item.type === 'deepDive' || item.type === 'quickScan') && (
        <View style={styles.expandedSection}>
          <Text style={styles.expandedLabel}>Assessment Details</Text>
          <View style={styles.metricRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{item.data?.risk || 0}%</Text>
              <Text style={styles.metricLabel}>Risk Level</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{item.data?.recommendations || 0}</Text>
              <Text style={styles.metricLabel}>Actions</Text>
            </View>
          </View>
        </View>
      )}

      {item.type === 'report' && (
        <View style={styles.expandedSection}>
          <Text style={styles.expandedLabel}>Test Results</Text>
          <View style={styles.resultRow}>
            <Text style={styles.resultName}>WBC</Text>
            <Text style={[styles.resultValue, { color: Colors.coral }]}>
              {item.data?.wbc || 'N/A'} Thou/uL
            </Text>
          </View>
          <Text style={styles.abnormalNote}>Abnormally high result</Text>
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {item.hasFollowUp && (
          <TouchableOpacity style={[styles.actionButton, styles.followUpButton]}>
            <Text style={[styles.actionButtonText, styles.followUpText]}>Follow Up</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.timelineRow}>
        <View style={styles.connectorSection}>
          {!isFirst && <View style={styles.connectorTop} />}
          <View
            style={[
              styles.dot,
              {
                backgroundColor: typeConfig.color,
                width: typeConfig.dotSize,
                height: typeConfig.dotSize,
                borderRadius: typeConfig.dotSize / 2,
              },
            ]}
          />
          {!isLast && <View style={styles.connectorBottom} />}
        </View>

        <TouchableOpacity
          style={styles.cardSection}
          onPress={toggleExpand}
          activeOpacity={0.7}
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.timestampRow}>
                <Text style={styles.timestamp}>{formatTimestamp()}</Text>
                <View style={[styles.typeBadge, { backgroundColor: typeConfig.color + '15' }]}>
                  <Text style={[styles.typeBadgeText, { color: typeConfig.color }]}>
                    {typeConfig.badge}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
              {renderMiniPreview()}
            </View>

            <Animated.View
              style={[
                styles.expandedContainer,
                {
                  maxHeight: animatedHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  }),
                },
              ]}
            >
              {isExpanded && renderExpandedContent()}
            </Animated.View>

            {item.hasFollowUp && !isExpanded && (
              <View style={styles.followUpIndicator}>
                <View style={styles.followUpDot} />
                <Text style={styles.followUpText}>Follow-up available</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  connectorSection: {
    width: 20,
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 28,
  },
  connectorTop: {
    width: 1.5,
    height: 28,
    backgroundColor: Colors.borderLight,
    position: 'absolute',
    top: 0,
  },
  connectorBottom: {
    width: 1.5,
    flex: 1,
    backgroundColor: Colors.borderLight,
    position: 'absolute',
    top: 36,
    bottom: -30,
  },
  dot: {
    marginVertical: 4,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowMedium,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardSection: {
    flex: 1,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowCard,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    gap: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  severityDots: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  photoStrip: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  photoThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  morePhotos: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  riskPreview: {
    marginTop: 8,
  },
  riskText: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  expandedContainer: {
    overflow: 'hidden',
  },
  expandedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
  },
  expandedLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  expandedValue: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  painScale: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  painScaleItem: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  resultName: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  resultValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  abnormalNote: {
    fontSize: 13,
    color: Colors.coral,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.black,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  followUpButton: {
    backgroundColor: Colors.ocean,
  },
  followUpIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  followUpDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ocean,
  },
  followUpText: {
    fontSize: 13,
    color: Colors.ocean,
    fontWeight: '500',
  },
});

export default TimelineItem;