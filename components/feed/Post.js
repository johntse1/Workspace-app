import React from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View,ScrollView,Button,Image} from 'react-native';

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
      const returnImage = () =>{
        if(typeof props.post.images === 'undefined'){
            // return <Image source = {{uri:props.post.image}} style = {{ width: 10, height: 10 }} />
            // }
            return <Text>No image{"\n"}</Text>
        }
        else{
                //<View> className='images'>{props.post.images.map(image => <img src={image} className='postImg'/>)}</View>
                return <View>{props.post.images.map(image => <Image source = {{uri: image}} style = {{ width: 100, height: 100 }} key={image}/>)}</View>

        }
    }
    return(
        
        <View key={props.post._id} className='post' style={{borderWidth:3,borderRadius:30,paddingTop:15,marginBottom:20,justifyContent:'center',alignItems:'center'}}>
            {returnImage()}
            <Text style={{fontWeight:'bold'}}>{props.post.title}</Text>
            <Text>{props.post.username}</Text>
            <Text>{props.post.text}</Text>
            <Text>Price: ${props.post.price}</Text>
            <Button 
            title='Accept Job'
            color='black'
            onPress={acceptJob}></Button>
            <Text>{"\n"}</Text>
        </View>

    );
}

export default Post;