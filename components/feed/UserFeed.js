import React from 'react'
import User from './User.js'
import Text from 'react-native'

function UserFeed(props){
    return(
        <Text className='feed'>
          {props.feed.map((item) => 
            <User post={item} key={item._id}></User>
          )}
        </Text>

    );
}

export default UserFeed;