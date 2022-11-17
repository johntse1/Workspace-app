import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Login from './pages/Login'
import UHome from './pages/UserHome'
import UJobs from './pages/UserJobs'
import UProfile from './pages/UserProfile'





const Tab = createBottomTabNavigator();


const HomeStack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  let contractor = 0;
  let user = 1;
  let member = 0;
  alert('hello')
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
      {contractor ? (
        <Tab.Group independent={true}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Jobs" component={Jobs} />
        </Tab.Group>
        ) : (
          <Tab.Group>
          </Tab.Group>
        )}
        {member ? (
        <Tab.Group independent={true}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SignUp" component={Login} />
        </Tab.Group>
        ) : (
        <Tab.Group>
        </Tab.Group>
        )}
        {user ?  (
        <Tab.Group independent={true}>
          <Tab.Screen name="UserHome" component={UHome} />
          <Tab.Screen name="UserProfile" component={UProfile} />
          <Tab.Screen name="UserJobs" component={UJobs} />
        </Tab.Group>
        ) : (
        <Tab.Group>
        </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
