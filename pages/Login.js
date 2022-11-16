import { Button, View, Text } from 'react-native';

function Login({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Login!</Text>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  export default Login;