import React from 'react'
import {Button,Text} from 'react-native';
import axios from 'axios'

function User(props){
    const displayTitle = () =>{
        console.log(props)
    }
    return(
        <Text className='post'>
            <Link to={{pathname: '/otherUser', state: props.post._id}} className='stuff'><Text>{props.post.first_name} {props.post.last_name}</Text></Link>
            <Text className='stuff'>{props.post.description}</Text>
            <Text className='stuff'>Skills: {props.post.skills.join(' ')}</Text>
            <Text className='stuff'><Button text='Not interested' onClick={displayTitle}></Button></Text>
        </Text>
    );
}

export default User;