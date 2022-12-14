import { View, Image,RefreshControl,ScrollView } from 'react-native';
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
import ReviewPost from '../components/reviewstuff/ReviewPost.js'
import Toast from 'react-native-toast-message'

//const Tab = createMaterialTopTabNavigator();
function Profile() {
  const logout =() => {
    Toast.show({type:'info',text1:'Logging out...'})
    AsyncStorage.removeItem("JWT_TOKEN")
    AsyncStorage.removeItem("contractor")
    console.log('Logged out')
    onRefresh();
    
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    const loadJob = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      const response = await axios.get(API_BASE_URL + API_GET_ME, { headers: { "Authorization": `Bearer ${token}` } });
      const reviewResponse = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
      if(JSON.parse(await AsyncStorage.getItem('contractor')))
      {
        setWhichUi('1')
      }
      else
      {
        setWhichUi('0')
      }
      setmy_profile(response.data)
      setReviews(reviewResponse.data)
      console.log(reviews)
      //console.log(reviewResponse.data)
      setgot_profile(true)
    };
    loadJob();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [index, setIndex] = React.useState(0);
  
  const [my_profile, setmy_profile] = useState([
    {
      "first_name": "john",
      "last_name": "tse",
      "email": "placeholder@gmail.com",
      "id": "placeholderid"
    }
  ]);
  const [whichUi,setWhichUi] = useState([]);
  const [requestData, setRequestData] = useState(new Date());
  const [got_profile,setgot_profile] = useState(null)
  const [reviews, setReviews] = useState([])
  const url = 'https://workspace.onrender.com/api/reviews/get'
  useEffect(() => {
    const fetchData = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('JWT_TOKEN'))
      const response = await axios.get(API_BASE_URL + API_GET_ME, { headers: { "Authorization": `Bearer ${token}` } });
      const reviewResponse = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
      if(JSON.parse(await AsyncStorage.getItem('contractor')))
      {
        setWhichUi('1')
      }
      else
      {
        setWhichUi('0')
      }
      setmy_profile(response.data)
      setReviews(reviewResponse.data)
      console.log(reviews)
      //console.log(reviewResponse.data)
      setgot_profile(true)
    };
    fetchData();
  }, []);
  console.log(my_profile["description"])
let link = my_profile['image']
  if(whichUi == 1)
  {
    return (
      
      <
        > 
      
      <View style={{}}>
      <Button onPress={logout} color='darkred'>Logout</Button>
      </View>
      <Image source={{uri: link}}
      
       style={{width: 200, height: 200}} />   
       <Toast />    
      <Text style={{fontSize:25}}>{my_profile["first_name"] + " " + my_profile["last_name"]}</Text>
      
      <Text style={{fontSize:25}}>{my_profile["email"]}</Text>
      {//<Text>{my_profile["id"]}</Text>
      }
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
        title="Skills"
        titleStyle={{ fontSize: 12 }}
      />
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
      <ScrollView refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }>
        <Text h1>
        {my_profile["skills"]}
        </Text>
        </ScrollView>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <ScrollView refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }>
      <Text h1>{my_profile["description"]}</Text>
      </ScrollView>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <ScrollView refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }>
        <View>
        {reviews.map((item) => 
              <ReviewPost post={item} key={item._id} setRequestData={setRequestData}></ReviewPost>
              )}
          </View>
        </ScrollView>
      </TabView.Item>  
    </TabView>
    </>
    );
  }
  else
  {
    console.log(reviews)
    return (
      <>
      <Button color='darkred' onPress={logout}>Logout</Button>
      <Image source={{uri: link}}
       style={{width: 200, height: 200}} />  
       <Toast />    
      <Text style={{fontSize:25}}>{my_profile["first_name"] + " " + my_profile['last_name']}</Text>
      <Text style={{fontSize:25}}>{my_profile["email"]}</Text>
      {//<Text>{my_profile["id"]}</Text>
  }
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
      <ScrollView 
          refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }
        >
      <Text h1>
      {my_profile["description"]}
        </Text>
        </ScrollView>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <ScrollView refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }>
          <View>
              {reviews.map((item) => 
              <ReviewPost post={item} key={item._id} setRequestData={setRequestData}></ReviewPost>
              )}
          </View>
          </ScrollView>
      </TabView.Item>
    </TabView>
  </>
    );
  }
}

  export default Profile;

  