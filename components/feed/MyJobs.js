import axios from 'axios';
import React from 'react';
import Button from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View} from 'react-native';


function MyJobs(props){
    const displayTitle = () =>{
        console.log(props)
    }
    const removeJob = async() =>{
        let url = 'https://workspace.onrender.com/api/jobs/delete/' + props.post._id
        let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
        axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } }).then(function (response) {
            console.log(response)
            props.setRequestData(new Date());
          }).catch(function (error) {
            console.log(error)
        })
        return <Redirect to='/'></Redirect>

    }
    const completeJob = async() =>{
      let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
      console.log(token)
      console.log(props.post._id)
        axios.post('https://workspace.onrender.com/api/jobs/complete/' + props.post._id,
            {
            },{ headers: { "Authorization": `Bearer ${token}` } })   
        .then( function (response){
          console.log(response.data)
        }).catch(function (error){
          console.log(error.response.status)
        });
      }
    //let contBool = localStorage.getItem('contractor')
    let contBool = true;
    if(contBool){
      //complete jobs for contractor
      if(props.post.status == 'Complete')
        return(
          <div key={props.post._id}>
            <h1>{props.post.title}</h1>
            <Link to={{pathname: '/otherUser', state: props.post.user}} className='stuff'>{props.post.username}</Link>
            <div>{props.post.text}</div>
            <div>{props.post.price}</div>
            <div>{props.post.status}</div>
            <Link to={{pathname: '/review', state: props.post._id}}><Button text='Review' onClick={displayTitle}></Button></Link>
          </div>)
      //jobs that were accepted and in progress
      if(props.post.status == 'in progress')
        return(
          <View key={props.post._id}>
          <Text>{props.post.title}</Text>
          <Text>{props.post.user}</Text>
          <Text>{props.post.text}</Text>
          <Text>${props.post.price}</Text>
          <Text>{props.post.status}</Text>
          <Text onPress={completeJob}>Mark as complete{"\n"}</Text>
          </View>
          )
      else
      {
        return(
        <div key={props.post._id}>
            <h1>{props.post.title}</h1>
            <div>{props.post.user}</div>
            <div>{props.post.text}</div>
            <div>{props.post.price}</div>
            <div>{props.post.status}</div>
            <Button text='Remove Job' onClick={removeJob}></Button>
        </div>
        )
      }
    }
}

export default MyJobs;