import React from 'react'
import {Button,Text,StyleSheet,View,Image} from 'react-native';
import axios from 'axios'

function User(props){
    const displayTitle = () =>{
        console.log(props)
    }
    const returnImage = () =>{
        if(typeof props.post.image === 'undefined'){
            // return <Image source = {{uri:props.post.image}} style = {{ width: 10, height: 10 }} />
            // }
            return <Text>No image{"\n"}</Text>
        }
        else{
            if(props.post.image.length > 1)
            {
                return <Image source = {{uri:props.post.image}} style = {{ width: 50, height: 50 }} />
            }
            else
            {
                return <Text>{props.post.image}</Text>
            }
        }
    }
    return(
        <View style={{borderWidth:3,borderRadius:30,paddingTop:15,marginBottom:20,justifyContent:'center',alignItems:'center'}}>
            {returnImage()
                }
            <Text className='post' style={{textAlign:'center'}}>
                
            
                <Text style={{}}>{props.post.first_name} {props.post.last_name} {"\n"}</Text>
                <Text style={styles.post}>{props.post.description}{"\n"}</Text>
                <Text style={styles.post}>Skills: {props.post.skills.join(' ')}</Text>
                {"\n"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        textAlign:'center',
        paddingLeft:100
    }
});
export default User;