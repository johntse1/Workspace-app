import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Login from './pages/Login'





const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Tab.Group>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Jobs" component={Jobs} />
      </Tab.Group>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  let contractor = 1;
  let user = 0;
  let member = 0;

  return (
    <NavigationContainer>
      <Tab.Navigator>
      {contractor ? (
        <Tab.Group>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Jobs" component={Jobs} />
        </Tab.Group>
        ) : (
          <Tab.Group>
          </Tab.Group>
        )}
        {member ? (
        <Tab.Group>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SignUp" component={Login} />
        </Tab.Group>
        ) : (
        <Tab.Group>
        </Tab.Group>
        )}
        {user ?  (
        <Tab.Group>
          <Tab.Screen name="UserHome" component={Home} />
          <Tab.Screen name="UserProfile" component={Profile} />
          <Tab.Screen name="UserJobs" component={Jobs} />
        </Tab.Group>
        ) : (
        <Tab.Group>
        </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
