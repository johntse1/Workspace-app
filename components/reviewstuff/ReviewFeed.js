import React from 'react'
//import Button from '../Button';
import ReviewPost from './ReviewPost'
import Text from 'react-native'

function ReviewFeed(props){
    const displayTitle = () =>{
        console.log(props)
    }
    return(
        <Text>
          {props.feed.map((item) => 
            <ReviewPost post={item} key={item._id}></ReviewPost>
          )}
        </Text>

    );
}

export default ReviewFeed;