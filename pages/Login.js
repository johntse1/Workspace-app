import { Button, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const [USER_EMAIL, setUSER_EMAIL] = useState('')
    const [USER_PASSWORD, setUSER_PASSWORD] = useState('')

    
    
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
          //AsyncStorage.setItem('contractor', JSON.stringify(response.data.contractor))
          //AsyncStorage.setItem('image', JSON.stringify(response.data.image))
          //const jsonValue = JSON.stringify(response.data.token)
        }).catch(function (error) {
          console.log(error.response.status)
        })

        
    }

      

    return (
      <View>
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
    
    </View>
    );
  }

  export default Login;