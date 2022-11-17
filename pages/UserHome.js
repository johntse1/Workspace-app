import { AppRegistry, View} from 'react-native';
import { Button } from '@rneui/themed';
import CreatePost from './CreatePost'
import { Tab, Text, TabView } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'

function NoPost({ navigation })
{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LIST OF CONTRACTORS</Text>
        <Button
          title="Make Post"
          onPress={() => navigation.navigate('Make a Post')}
        />
      </View>
    )
}
function change()
{
    let dontPost = 1;
    let makePost = 0;
    reUserHome()
}
const Stack = createNativeStackNavigator();

function UserHome() {
    return (
      <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={NoPost} />
        <Stack.Screen name="Make a Post" component={CreatePost} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }

  export default UserHome;

/*
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button 
        title = "Create Post"
        onPress={() => navigation.navigate(CreatePost)}
        />
        <Text>LIST OF CONTRACTORS</Text>
        
      </View>
      */