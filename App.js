import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react"
import { RefreshControl, SafeAreaView, StyleSheet,ScrollView } from 'react-native';

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Login from './pages/Login'
import UHome from './pages/UserHome'
import UJobs from './pages/UserJobs'
import UProfile from './pages/UserProfile'
import SignUp from './pages/SignUp'





const Tab = createBottomTabNavigator();


const HomeStack = createNativeStackNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
    const [userToken, setUserToken] = React.useState(null);
  
    const [refresh,setRefresh] = useState(false)

    const pullDown = () =>{
      setRefresh(true)
  
      setTimeout(()=>{
        setRefresh(false)
      },5000)
    }






  let contractor =1;
  let user = 0;
  let member = 0;
  return (
    
    <NavigationContainer independent={true}>
      <Tab.Navigator>
      {contractor ? (
        <Tab.Group independent={true}>
          
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SignUp" component={SignUp} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Jobs" component={Jobs} />
          
        </Tab.Group>
        ) : (
          <Tab.Group>
          </Tab.Group>
        )}

      </Tab.Navigator>
    </NavigationContainer>
  );
}
