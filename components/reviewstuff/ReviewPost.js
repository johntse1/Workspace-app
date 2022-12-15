import React from 'react'
//import Button from '../Button';
import axios from 'axios'
import { View,Text } from 'react-native'

function ReviewPost(props){
    const displayTitle = () =>{
        console.log(props.post._id)
    }

    return(
        <View key={props.post._id}>
            <Text style={{fontWeight:'bold',fontSize:25}}>{props.post.username}</Text>
            <Text style ={{fontWeight:'bold',fontSize:15}}>{props.post.title}</Text>
            <Text style={{fontWeight:'bold',fontSize:15}}>{props.post.rating}/5</Text>
            <Text>{props.post.text}</Text>
            <Text>{"\n"}</Text>
        </View>
    );
}

export default ReviewPost;