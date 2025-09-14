import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../theme/colors';
import HomeScreen from '../screens/home/HomeScreen';
import TimelineScreen from '../screens/timeline/TimelineScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import QuickAddModalComponent from '../screens/add/QuickAddModal';

const Tab = createBottomTabNavigator();

// Custom tab bar with center add button
const CustomTabBar = ({ state, descriptors, navigation, onAddPress }: any) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;
        const isAddButton = route.name === 'Add';

        const onPress = () => {
          if (isAddButton) {
            // Call the onAddPress prop for the Add button
            onAddPress && onAddPress();
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Special styling for center Add button
        if (isAddButton) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.addButtonContainer}
              activeOpacity={0.8}
            >
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          );
        }

        // Icon mapping
        const getIconName = () => {
          switch (route.name) {
            case 'Home': return 'home-outline';
            case 'Timeline': return 'calendar-outline';
            case 'Reports': return 'document-text-outline';
            case 'Profile': return 'person-outline';
            default: return 'ellipse-outline';
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <Icon
              name={getIconName()}
              size={24}
              color={isFocused ? Colors.textPrimary : Colors.textTertiary}
              style={[styles.tabIcon, isFocused && styles.tabIconFocused]}
            />
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTabNavigator = () => {
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} onAddPress={() => setShowQuickAddModal(true)} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen 
          name="Timeline" 
          component={TimelineScreen}
          options={{ tabBarLabel: 'Timeline' }}
        />
        <Tab.Screen 
          name="Add" 
          component={View} // Dummy component, never actually rendered
          options={{ tabBarLabel: '' }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setShowQuickAddModal(true);
            },
          }}
        />
        <Tab.Screen 
          name="Reports" 
          component={ReportsScreen}
          options={{ tabBarLabel: 'Reports' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
      
      {showQuickAddModal && (
        <QuickAddModalComponent 
          visible={showQuickAddModal}
          onClose={() => setShowQuickAddModal(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? 83 : 60,
    paddingBottom: Platform.OS === 'ios' ? 34 : 10,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowLight,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    fontSize: 28,
    color: Colors.white,
    fontWeight: '300',
  },
});

export default MainTabNavigator;