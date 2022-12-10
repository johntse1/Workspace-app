import { Button, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl, SafeAreaView, StyleSheet,ScrollView } from 'react-native';

function Login({ navigation }) {
    const [USER_EMAIL, setUSER_EMAIL] = useState('')
    const [USER_PASSWORD, setUSER_PASSWORD] = useState('')

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
  
      const [refreshing, setRefreshing] = React.useState(false);
    
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    
    let API_BASE_URL = 'https://workspace.onrender.com/api/'
    let API_SIGN_IN_URL = 'users/login'



    const signin = () => {
      let url = API_BASE_URL + API_SIGN_IN_URL
      axios.post(url,
        {
          email: USER_EMAIL,
          password: USER_PASSWORD
        })
        .then(async function (response) {
          //setJWT_TOKEN(JSON.stringify(response.data.token))
          AsyncStorage.setItem('JWT_TOKEN', JSON.stringify(response.data.token))
          alert('done')
          const jsonValue = await AsyncStorage.getItem('JWT_TOKEN')
          alert(jsonValue != null ? JSON.parse(jsonValue) : null)
          AsyncStorage.setItem('contractor', JSON.stringify(response.data.contractor))
          console.log('Are you a contractor? '+ await AsyncStorage.getItem('contractor'))
          AsyncStorage.setItem('image', JSON.stringify(response.data.image))
          //const jsonValue = JSON.stringify(response.data.token)
        }).catch(function (error) {
          console.log(error.response.status)
        })

        
    }

      

    return (
      <ScrollView
          refreshControl={
            <RefreshControl
              refreshing = {refreshing}
              onRefresh={onRefresh}
           />
          }
        >
      <View>
        <TextInput 
          placeholder="Email" 
          onChangeText={(USER_EMAIL) => setUSER_EMAIL(USER_EMAIL)}
          />
          
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(USER_PASSWORD) => setUSER_PASSWORD(USER_PASSWORD)}
        />
        <Button color='black' title='Sign in' onPress={signin} />
    </View>
    
    </ScrollView>
    );
  }

  export default Login;