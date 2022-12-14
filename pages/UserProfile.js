import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Tab, Text, TabView } from '@rneui/themed';
import React from 'react';
import { API_BASE_URL, API_GET_ME } from '../API_ENDPOINTS'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import axios from 'axios'
import ReviewFeed from '../components/reviewstuff/ReviewFeed'
/*
const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
    console.log(keys)
  } catch(e) {
    // read key error
  }

  console.log(keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}*/
//const Tab = createMaterialTopTabNavigator();
function UserProfile() {
  //getAllKeys()
  const [index, setIndex] = React.useState(0);
  const [my_profile, setmy_profile] = useState([
    {
      "first_name": "john",
      "last_name": "tse",
      "email": "placeholder@gmail.com",
      "id": "placeholderid"
    }
  ]);
  
  const [got_profile,setgot_profile] = useState(null)
  const [reviews, setReviews] = useState()
  const url = 'https://workspace.onrender.com/api/reviews/get'

  useEffect(() => {
    const fetchData = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      const response = await axios.get(API_BASE_URL + API_GET_ME, { headers: { "Authorization": `Bearer ${token}` } });
      const reviewResponse = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
      setmy_profile(response.data)
      setReviews(reviewResponse.data)
      console.log(response.data)
      //console.log(reviewResponse.data)
      setgot_profile(true)
      console.log('good')
      console.log(my_profile["description"])
    };
    fetchData();
  }, []);
    return (
      <>
      <Text>{my_profile["first_name"]}</Text>
      <Text>{my_profile["email"]}</Text>
      <Text>{my_profile["id"]}</Text>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="About"
        titleStyle={{ fontSize: 12 }}
      />
      <Tab.Item
        title="Reviews"
        titleStyle={{ fontSize: 12 }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <Text h1>{my_profile["description"]}</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      
      </TabView.Item>
    </TabView>
  </>
    );
  }

  export default UserProfile;

  