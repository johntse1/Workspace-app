import { AppRegistry, View} from 'react-native';
import { Button } from '@rneui/themed';
import CreatePost from './CreatePost'
import { Tab, Text, TabView } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import { API_BASE_URL, API_GET_ME, API_GET_ALL_JOBS_FILTER } from '../API_ENDPOINTS'
import UserFeed from '../components/feed/UserFeed.js'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

function Home() {
  const [items, setItems] = useState([]);
  const [currItems, setCurrItems] = useState([]);
  const [pageNum, setNum] = useState(0);
  let info = []
  useEffect(() => {
    const loadJob = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      const response = await axios.get('https://workspace.onrender.com/api/jobs/mytags', { headers: { "Authorization": `Bearer ${token}` } });
      info = response.data
      setItems(info)
    };
    loadJob();
  }, []);
  
  const renderItems = (items) => {
    return(
      <Text>
      <Text>{items.user}</Text>{"\n"}
      <Text>{items.title + '  $' + items.price}</Text>{"\n"}
      <Text>{items.text}</Text>
      {"\n"}
    </Text>
    )
  }


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LIST OF POSTS</Text>
        <View>
          {
            items.map((item) => { return renderItems(item)})
          }
        </View>
      </View>
    );
  }

  export default Home;