import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Tab, Text, TabView } from '@rneui/themed';
import React from 'react';
import { Button } from '@rneui/themed';

//const Tab = createMaterialTopTabNavigator();
function UserProfile() {
  const [index, setIndex] = React.useState(0);
    return (
      <>
      <Text>NAME</Text>
      <Text>EMAIL</Text>
      <Text>ID</Text>
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
        <Text h1>Cool Guy</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <Text h1>Good Host</Text>
      </TabView.Item>
    </TabView>
  </>
    );
  }

  export default UserProfile;

  