import React from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View,ScrollView} from 'react-native';

function Post(props){
    const displayTitle = () =>{
        console.log(props.post._id)
    }
    const acceptJob = async() =>{
        console.log('button clicked')
        let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
        axios.post('https://workspace.onrender.com/api/jobs/accept/' + props.post._id,
            {
            },{ headers: { "Authorization": `Bearer ${token}` } })   
        .then( function (response){
          console.log(response.data)
          Alert("Job Accepted")
        }).catch(function (error){
          console.log(error.response)
        });
      }
    return(
        
        <View key={props.post._id} className='post'>
            <Text className='stuff'>{props.post.title}</Text>
            <Text>{props.post.text}</Text>
            <Text>Price: ${props.post.price}</Text>
            <Text 
            style={{
                borderWidth: 3,
                borderColor: "black",
                borderRadius: 5,
              }}
            onPress={acceptJob}>Accept Job</Text>
            <Text>{"\n"}</Text>

        </View>

    );
}

export default Post;