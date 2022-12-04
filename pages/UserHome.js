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

function NoPost({ navigation })
{
  const [items, setItems] = useState([]);
  const [currItems, setCurrItems] = useState([]);
  const [pageNum, setNum] = useState(0);
  let info = []
  useEffect(() => {
    const loadJob = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      const response = await axios.get('https://workspace.onrender.com/api/users/gettag', { headers: { "Authorization": `Bearer ${token}` } });
      info = response.data
      setItems(info)
      console.log(info)
    };
    loadJob();
  }, []);
  
  const renderItems = (items) => {
    return(
      <Text>
      <Text>{items.first_name + ' ' + items.last_name}</Text>{"\n"}
      <Text>{items.description}</Text>{"\n"}
      <Text>{items.skills}</Text>{"\n"}
      {"\n"}
    </Text>
    )
  }
  

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Make Post"
          onPress={() => navigation.navigate('Make a Post')}
        />
        <Text>LIST OF CONTRACTORS</Text>
        <View>
          {
            items.map((item) => { return renderItems(item)})
          }
        </View>
      </View>
    )
}


const Stack = createNativeStackNavigator();

function UserHome() {
  const [items, setItems] = useState([]);
  const [currItems, setCurrItems] = useState([]);
  const [pageNum, setNum] = useState(0);
  /*
console.log('good')
  useEffect(() =>{
    loadJob();
  }, []);
  const loadJob = async () =>{
    console.log('button clicked')
    let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
    //axios.get('https://workspace.onrender.com/api/users/gettag', { headers: { "Authorization": `Bearer ${token}` } })
    .then( function (response){
      console.log('then')
      //console.log(response.data)
      //makePages(response.data)
    }).catch(function (error){
      console.log(error.response.status)
    });
  }
*/

















    return (
      
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NoPost}/>
        <Stack.Screen name="Make a Post" component={CreatePost}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }

  export default UserHome;
