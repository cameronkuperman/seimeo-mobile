import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import GradientHeaderCard from '../../components/home/GradientHeaderCard';
import QuickActionsGrid from '../../components/home/QuickActionsGrid';
import InsightCard from '../../components/home/InsightCard';
import TrackingCard from '../../components/home/TrackingCard';
import ToolsGrid from '../../components/home/ToolsGrid';
import OracleFloatingButton from '../../components/home/OracleFloatingButton';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState('');
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Mock data - replace with real data from context/API
  const hasInsight = true; // Example: check if there are any insights
  const hasActiveTracking = true; // Example: check if user is tracking something
  
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
  const timeString = currentDate.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Gradient Header that scrolls with content */}
        <GradientHeaderCard 
          score={85}
          weeklyChange={2}
          date={currentDate}
        />

        {/* Quick Actions Grid */}
        <QuickActionsGrid />

        {/* Conditional Insight Card */}
        {hasInsight && (
          <InsightCard
            title="Weekend migraine risk: 78%"
            description="Based on your patterns"
            actionText="Take preventive action"
            riskLevel="medium"
          />
        )}

        {/* Conditional Tracking Card */}
        {hasActiveTracking && (
          <TrackingCard
            title="Skin Rash"
            currentDay={3}
            totalDays={7}
          />
        )}

        {/* Tools Grid */}
        <ToolsGrid />
      </ScrollView>

      {/* Floating Oracle Button */}
      <OracleFloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC', // Olivia-style subtle gray
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for tab bar
  },
});

export default HomeScreen;