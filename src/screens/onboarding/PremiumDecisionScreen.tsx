import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../theme/colors';

const PremiumDecisionScreen = () => {
  const navigation = useNavigation<any>();
  
  return (
    <LinearGradient
      colors={[Colors.background, Colors.primaryMuted, Colors.mint]}
      locations={[0, 0.7, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>PremiumDecision</Text>
          <Text style={styles.subtitle}>Beautiful screen coming soon</Text>
          <Button
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('WelcomeHome', { name: 'User' })}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  button: {
    width: '100%',
  },
});

export default PremiumDecisionScreen;
