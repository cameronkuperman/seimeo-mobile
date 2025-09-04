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

interface TrackingCardProps {
  title: string;
  currentDay: number;
  totalDays: number;
  onAddPhoto?: () => void;
}

const TrackingCard: React.FC<TrackingCardProps> = ({
  title,
  currentDay,
  totalDays,
  onAddPhoto,
}) => {
  const navigation = useNavigation();

  const handleAddPhoto = () => {
    if (onAddPhoto) {
      onAddPhoto();
    } else {
      navigation.navigate('PhotoAnalysis' as never);
    }
  };

  const renderProgressDots = () => {
    const dots = [];
    for (let i = 0; i < totalDays; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.progressDot,
            i < currentDay && styles.progressDotFilled,
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>TRACKING</Text>
          <View style={styles.badge} />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {title} • Day {currentDay} of {totalDays}
        </Text>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDots}>{renderProgressDots()}</View>
          <TouchableOpacity onPress={handleAddPhoto} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Photo</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  badge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.mint,
    marginLeft: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textPrimary,
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressDots: {
    flexDirection: 'row',
    gap: 6,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
  },
  progressDotFilled: {
    backgroundColor: Colors.mint,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mint,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.mint,
  },
});

export default TrackingCard;