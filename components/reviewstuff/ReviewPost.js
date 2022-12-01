import React from 'react'
//import Button from '../Button';
import axios from 'axios'
import Text from 'react-native'

function ReviewPost(props){
    const displayTitle = () =>{
        console.log(props.post._id)
    }

    return(
        <Text key={props.post._id}>
            <Text>{props.post.reviewer}</Text>
            <Text>{props.post.title}</Text>
            <Text>{props.post.rating}/5</Text>
            <Text>{props.post.text}</Text>
        </Text>
    );
}

export default ReviewPost;