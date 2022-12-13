import axios from 'axios';
import React,{useState} from 'react';
import Button from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text,View, Modal,Pressable} from 'react-native';
import { Alert, StyleSheet } from "react-native";
import { TextInput } from 'react-native-gesture-handler';


function MyJobs(props){
  const [modalVisible, setModalVisible] = useState(false);
  const [REVIEW_TITLE, setREVIEW_TITLE] = useState('')
  const [REVIEW_DESCRIPTION, setREVIEW_DESCRIPTION] = useState('')
  const [rate, setRate] = useState(1);

  let url = 'https://workspace.onrender.com/api/reviews/create/'
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
      console.log(displayTitle)
        axios.post('https://workspace.onrender.com/api/jobs/complete/' + props.post._id,
            {
            },{ headers: { "Authorization": `Bearer ${token}` } })   
        .then( function (response){
          console.log(response.data)
        }).catch(function (error){
          console.log(error.response.status)
        });
      }



      const setReview = async() => {
        let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
        console.log(props.post._id)
        axios.post(url + props.post._id,
        {
            title: REVIEW_TITLE,
            text: REVIEW_DESCRIPTION,
            rating: rate
        }, { headers: { "Authorization": `Bearer ${token}` } })
        .then(function (response) {
            console.log(response)
            history.goBack()
        }).catch(function (error) {
            console.log(error.response)
        })
      }
    //let contBool = localStorage.getItem('contractor')

      //complete jobs for contractor
      if(props.post.status == 'Complete')
        return(
          <View key={props.post._id}>
            <Text>{props.post.title}</Text>
            <Text>{props.post.username}</Text>
            <Text>{props.post.text}</Text>
            <Text>{props.post.price}</Text>
            <Text>{props.post.status}</Text>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Close{"\n"}</Text>
            </Pressable>
            <Text>Review for "{props.post.title}"{"\n"}</Text>
            <TextInput 
              placeholder="Title" 
              onChangeText={(REVIEW_TITLE) => setREVIEW_TITLE(REVIEW_TITLE)}
            />
            <TextInput 
              placeholder="Description" 
              onChangeText={(REVIEW_DESCRIPTION) => setREVIEW_DESCRIPTION(REVIEW_DESCRIPTION)}
            />
            <TextInput 
              placeholder="Rating" 
              onChangeText={(rate) => setRate(rate)}
              
            />
            
            <Pressable
              onPress={() => setReview() + setModalVisible(!modalVisible)}
            >
              <Text>{"\n"}Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Text>Make Review?{"\n"}</Text>
      </Pressable>
          </View>
          )
      //jobs that were accepted and in progress
      else if(props.post.status == 'in progress')
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
        <View key={props.post._id}>
            <Text>{props.post.title}</Text>
            <Text>{props.post.user}</Text>
            <Text>{props.post.text}</Text>
            <Text>{props.post.price}</Text>
            <Text>{props.post.status}</Text>
            <Text onPress={removeJob}>Remove Job{"\n"}</Text>
        </View>
        )
      }
    }


export default MyJobs;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
