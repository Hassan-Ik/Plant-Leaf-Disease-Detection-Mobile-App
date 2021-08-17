import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  LibraryScreen,
  SettingsScreen,
  PredictionScreen,
  HelperScreen,
  LeafDetailsScreen,
} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStack = ({theme, isThemeDark, toggleTheme}) => {
  const MyHomeScreen = props => (
    <HomeScreen
      {...props}
      isThemeDark={isThemeDark}
      toggleTheme={toggleTheme}
    />
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Prediction"
        component={PredictionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Helper"
        component={HelperScreen}
        options={{headerShown: false, title: ''}}
      />
    </Stack.Navigator>
  );
};

const LibraryStack = ({theme, isThemeDark, toggleTheme}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={LeafDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Navigation = ({theme, isThemeDark, toggleTheme}) => {
  const MyHomeStack = props => (
    <HomeStack {...props} isThemeDark={isThemeDark} toggleTheme={toggleTheme} />
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'ios-library' : 'ios-library-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          inactiveBackgroundColor: theme.colors.bg.primary,
          activeBackgroundColor: theme.colors.bg.primary,
          activeTintColor: theme.colors.brand.primary,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Home"
          component={MyHomeStack}
          // options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="Library" component={LibraryStack} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
