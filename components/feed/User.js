import React from 'react'
import {Button,Text} from 'react-native';
import axios from 'axios'

function User(props){
    const displayTitle = () =>{
        console.log(props)
    }
    return(
        <Text className='post'>
            <Text>{props.post.first_name} {props.post.last_name}{"\n"}</Text>
            <Text className='stuff'>{props.post.description}{"\n"}</Text>
            <Text className='stuff'>Skills: {props.post.skills.join(' ')}</Text>
            {"\n"}
        </Text>
    );
}

export default User;