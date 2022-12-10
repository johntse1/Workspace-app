import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react"
import { RefreshControl, SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'


import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SignUp from './pages/SignUp'





const Tab = createBottomTabNavigator();


const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function loginTest()
{
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
    const [refreshing, setRefreshing] = React.useState(false);
    const [islogin, setIslogin] = useState([])
    
    const onRefresh = React.useCallback(() => {
      const fetchData = async () => {
        if(JSON.parse(await AsyncStorage.getItem('contractor')))
        {
          setIslogin('true')
        }
        else
        {
          setIslogin('false')
        }
      };
      fetchData();
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
}

export default function App() {
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
    const [refreshing, setRefreshing] = React.useState(false);
    const [islogin, setIslogin] = useState([])
    
    const onRefresh = React.useCallback(() => {
      const fetchData = async () => {
        if(JSON.parse(await AsyncStorage.getItem('contractor')) != null)
        {
          setIslogin(true)
        }
        else
        {
          setIslogin(false)
        }
      };
      fetchData();
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    //let interval = useRef(null);
    useEffect(() => {
      const fetchData = async () => {
        if(JSON.parse(await AsyncStorage.getItem('contractor')) != null)
        {
          setIslogin(true)
        }
        else
        {
          setIslogin(false)
        }
      };
      fetchData();
    }, []);
const MINUTE_MS = 5000;
useEffect(() => {
  const interval = setInterval(() => {
    onRefresh()
    console.log('Checking if logged in');
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [])

  return (
    
    <NavigationContainer independent={true}>
      <Tab.Navigator> 
      {!islogin ? (
        <Tab.Group independent={true}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="SignUp" component={SignUp} />
        </Tab.Group>
        ) : (
          <Tab.Group independent={true}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Jobs" component={Jobs} />
          </Tab.Group>
        )}

      </Tab.Navigator>
    </NavigationContainer>
  );
}
