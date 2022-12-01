import { Button, View, Text } from 'react-native';

function SignUp({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SignUp!</Text>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }

  export default SignUp;