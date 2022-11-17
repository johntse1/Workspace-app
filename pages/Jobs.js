import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Tab, Text, TabView } from '@rneui/themed';
import { Button } from '@rneui/themed';
import React from 'react';

//const Tab = createMaterialTopTabNavigator();
function Jobs() {
  const [index, setIndex] = React.useState(0);
  let test = 'Job 1a'
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
        title="Current Jobs"
        titleStyle={{ fontSize: 12 }}
      />
      <Tab.Item
        title="Past Jobs"
        titleStyle={{ fontSize: 12 }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <Text h1>{test}  <Button>Mark as complete</Button></Text>

      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <Text h1>Job2</Text>
      </TabView.Item>
    </TabView>
  </>
    );
  }

  export default Jobs;

  