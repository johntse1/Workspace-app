import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Tab, Text, TabView } from '@rneui/themed';
import { Button } from '@rneui/themed';
import React from 'react';
import axios from 'axios'
import { API_BASE_URL, API_GET_ME } from '../API_ENDPOINTS'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyJobs from '../components/feed/MyJobs.js'

//const Tab = createMaterialTopTabNavigator();
function UserJobs() {

  const [my_profile, setmy_profile] = useState([
    {
      "first_name": "john",
      "last_name": "tse",
      "email": "placeholder@gmail.com",
      "id": "placeholderid"
    }
  ]);
  const [index, setIndex] = React.useState(0);
  const [got_profile,setgot_profile] = useState(null)
  const [active_jobs, setActive_Jobs] = useState([])
  const [requestData, setRequestData] = useState(new Date());
  const [previous_jobs, setPrevious_Jobs] = useState([])
  const [incomplete_jobs, setIncomplete_Jobs] = useState([])

  const renderIncomplete = (items) => {
    return(
      <Text key = {items._id}>
        <Text>{items.user}</Text>{"\n"}
      <Text>{items.title}  ${items.price}</Text>{"\n"}
      <Text>{items.text}</Text>{"\n"}
      <Text>{items.status}</Text>{"\n"}
    </Text>
    )
  }

  const renderInprogress = (items) => {
    return(
      <Text key = {items._id}>
      <Text>{items.user}</Text>{"\n"}
    <Text>{items.title}  ${items.price}</Text>{"\n"}
    <Text>{items.text}</Text>{"\n"}
    <Text>{items.status}</Text>{"\n"}
  </Text>
    )
  }

  const renderComplete = (items) => {
    return(
      <Text key = {items._id}>
      <Text>{items.user}</Text>{"\n"}
    <Text>{items.title}  ${items.price}</Text>{"\n"}
    <Text>{items.text}</Text>{"\n"}
    <Text>{items.status}</Text>{"\n"}
  </Text>
    )
  }


  useEffect(() => {
    const fetchData = async () => {
      let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
      const response = await axios.get(API_BASE_URL + API_GET_ME, { headers: { "Authorization": `Bearer ${token}` } });
      const jobsList = await axios.get('https://workspace.onrender.com/api/jobs/getcurrent', { headers: { "Authorization": `Bearer ${token}` } })
      setmy_profile(response.data)
      setgot_profile(true)
      setActive_Jobs(jobsList.data)
      const prevjobsList = await axios.get('https://workspace.onrender.com/api/jobs/getpast', { headers: { "Authorization": `Bearer ${token}` } })
      setPrevious_Jobs(prevjobsList.data)
      //console.log(prevjobsList.data)
      const incompletejobList = await axios.get('https://workspace.onrender.com/api/jobs/getincomplete ', { headers: { "Authorization": `Bearer ${token}` } })
      setIncomplete_Jobs(incompletejobList.data)
      console.log(jobsList.data)
      //console.log(previous_jobs)
      console.log('as')
    };
    fetchData();
  }, [requestData]);









    return (
      <>
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
        title="Listed Jobs"
        titleStyle={{ fontSize: 12 }}
      />
      <Tab.Item
        title="Ongoing Jobs"
        titleStyle={{ fontSize: 12 }}
      />
       <Tab.Item
        title="Past Jobs"
        titleStyle={{ fontSize: 12 }}
      />
    </Tab>
    

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <View>
          {
            incomplete_jobs.map((item) => { return renderIncomplete(item)})
          }
        </View>

      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <View>
      {active_jobs.map((jobs) => 
        <MyJobs post={jobs} key={jobs._id} setRequestData={setRequestData}></MyJobs>
      )}
        </View>


      </TabView.Item>

      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <View>
          {
            previous_jobs.map((item) => { return renderComplete(item)})
          }
        </View>

      </TabView.Item>
    </TabView>
  </>
    );
  }

  export default UserJobs;

  