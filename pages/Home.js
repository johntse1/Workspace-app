import { AppRegistry, View, ScrollView} from 'react-native';
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
import Posts from '../components/feed/Post.js'
import Contract from '../components/feed/User.js'
import { FlatList } from 'react-native-gesture-handler';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';





function NoPost({ navigation })
{

  const [items, setItems] = useState([]);
  const [currItems, setCurrItems] = useState([]);
  const [whichUi,setWhichUi] = useState([])
  const [pageNum, setNum] = useState(0);
  const [requestData, setRequestData] = useState(new Date());
  let ui;

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      const loadJob = async () => {
        let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
        ui = JSON.parse(await AsyncStorage.getItem('contractor'))
        console.log('ui is' + ui )
        if(ui == true )
          {
            const response = await axios.get('https://workspace.onrender.com/api/jobs/mytags', { headers: { "Authorization": `Bearer ${token}` } });
            setCurrItems(response.data)
            setWhichUi('1')
          }
        else
          {
            const response = await axios.get('https://workspace.onrender.com/api/users/gettag', { headers: { "Authorization": `Bearer ${token}` } });
            setItems(response.data)
            console.log(response.data)
            setWhichUi('0')
          }
        };
      loadJob();
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
  useEffect(() => {
    const loadJob = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      ui = JSON.parse(await AsyncStorage.getItem('contractor'))
      console.log('ui is' + ui )
      if(ui == true )
        {
          const response = await axios.get('https://workspace.onrender.com/api/jobs/mytags', { headers: { "Authorization": `Bearer ${token}` } });
          setCurrItems(response.data)
          setWhichUi('1')
        }
      else
        {
          const response = await axios.get('https://workspace.onrender.com/api/users/gettag', { headers: { "Authorization": `Bearer ${token}` } });
          setItems(response.data)
          console.log(response.data)
          setWhichUi('0')
        }
      };
    loadJob();
  }, []);



  if(whichUi == 1)
    {
      console.log('for contractors')
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }
        >
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={onRefresh}>Refresh</Button>
          <Text>LIST OF POSTS</Text>
            <View>
              {currItems.map((item) => 
              <Posts post={item} key={item._id} setRequestData={setRequestData}></Posts>
              )}
            </View>
        </View>
        </ScrollView>
       )
   }
  else
    {
      console.log('for users')
      return(
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={onRefresh}>Refresh</Button>
          <Button
            title="Make Post"
            onPress={() => navigation.navigate('Make a Post')}
          />
          <Text>LIST OF CONTRACTORS</Text>
          <View>
          {items.map((item) => 
              <Contract post={item} key={item._id} setRequestData={setRequestData}></Contract>
              )}
          </View>
        </View>
        </ScrollView>
          )
        }
}

function Home() {
  const Stack = createNativeStackNavigator();

return(
  
  <NavigationContainer independent={true}>
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={NoPost}/>
    <Stack.Screen name="Make a Post" component={CreatePost}/>
  </Stack.Navigator>
</NavigationContainer>
)}
export default Home;
