import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker';


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'50%',
    textAlign:'center'
  },
});

let enteredSklls = []
function CreatePost({navigation:{goBack}}) {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const [got_profile, setgot_profile] = useState(null)
  const [JWT_TOKEN, setJWT_TOKEN] = useState('')
  const [POST_ID, setPOST_ID] = useState('')
  const [USER_ID, setUSER_ID] = useState('')
  const [USER_TITLE, setUSER_TITLE] = useState('')
  const [USER_PRICE, setUSER_PRICE] = useState('')
  const [USER_POST_DESCRIPTION, setUSER_POST_DESCRIPTION] = useState('')
  const [USER_TAGS, setUSER_TAGS] = useState([])
  const [USER_ADDRESS, setUSER_ADDRESS] = useState('')
  const [USER_IMAGES, setUSER_IMAGES] = useState([])
  const [openSkills, setOpenSkills] = useState(false);
  const [Skills, setSkills] = useState([
    { label: "Construction", value: "Construction" },
    { label: "Plumbing", value: "Plumbing" },
    { label: "Electrical", value: "Electrical" },
    { label: "Mechanical", value: "Mechanical" },
    { label: "Home", value: "Home" },
    { label: "Logging", value: "Logging" },
    { label: "Technical", value: "Technical" },
    { label: "Roof", value: "Roof" },
  ]);


  let url = 'https://workspace.onrender.com/api/jobs/set'

  let skills = ["Construction", "Plumbing", "Electrical", "Mechanical", "Home", "Logging", "Technical", "Roof"]



  const setJobs = async () => {
    let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
    const formdata = new FormData()
    if(USER_IMAGES.length>=1)
    {
      let files = USER_IMAGES
      for (let i = 0; i < files.length; i++) {
        formdata.append("images", files[i])
      }
    }
    else {
      formdata.append("images",USER_IMAGES[0])
    }
    // formdata.append("images", USER_IMAGES)
    formdata.append("title", USER_TITLE)
    formdata.append("user", USER_ID)
    formdata.append("text", USER_POST_DESCRIPTION)
    formdata.append("price", USER_PRICE)
    formdata.append("tags", USER_TAGS)
    formdata.append("address", USER_ADDRESS)

    


    await axios({
      method: "post",
      url: "https://workspace.onrender.com/api/jobs/set",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
    }).then(function (response) {
      console.log(response)
      Toast.show({ type: 'success', text1: 'Please enter another address' })
      goBack()
    }).catch(function (error) {
      console.log(error)
      if (error.response.status == 400) {
        Toast.show({ type: 'error', text1: 'Please enter another address' })
      }
      if (error.response.status == 401) {
        Toast.show({ type: 'error', text1: 'Please add a text field' })
      }
      if (error.response.status == 402) {
        Toast.show({ type: 'error', text1: 'Please add a title' })
      }
      if (error.response.status == 403) {
        Toast.show({ type: 'error', text1: 'Please enter a price field' })
      }
      if (error.response.status == 404) {
        Toast.show({ type: 'error', text1: 'Failed to upload to imgur' })
      }
      if (error.response.status == 406) {
        Toast.show({ type: 'error', text1: 'Failed to upload to imgur' })
      }
    })
  }

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection:true
    });

    console.log(result);

    if (!result.canceled) {
      let temparray = []
      for (var i = 0;i< result.assets.length; i++)
      {
        temparray.push({uri: result.assets[i].uri, name: 'image.jpg', type: 'image/jpeg' })
      }
      setUSER_IMAGES(temparray)
    }
  }

  return (

    <View style={{ width:'100%', justifyContent: 'center', alignItems: 'center'}}>
      <Text></Text>
      <Text>MAKE A POST</Text>
      <TextInput
        style={styles.input}
        placeholder="Job Name"
        onChangeText={(USER_TITLE) => setUSER_TITLE(USER_TITLE)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={(USER_PRICE) => setUSER_PRICE(USER_PRICE)}

      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        onChangeText={(USER_ADDRESS) => setUSER_ADDRESS(USER_ADDRESS)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(USER_POST_DESCRIPTION) => setUSER_POST_DESCRIPTION(USER_POST_DESCRIPTION)}
      />
      <View>
        <Text>{USER_TAGS.toString()}</Text>
      {/* <SelectDropdown
        data={skills}
        onSelect={(selectedItem, index) => {
          //console.log(selectedItem, index)
          enteredSklls.push(selectedItem)
          console.log(enteredSklls)
          setUSER_TAGS(enteredSklls)
          onRefresh()
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      /> */}
      </View>
      <DropDownPicker
        multiple={true}
        open={openSkills}
        value={USER_TAGS}
        items={Skills}
        setOpen={setOpenSkills}
        setValue={setUSER_TAGS}
        setItems={setSkills}
        onChangeValue={(value) => {
          console.log(value);
        }}
        style={{maxWidth:250,alignSelf:'center'}}
      />

      <Text></Text>

      <Button title="Upload images" onPress={pickImage} />
      

      <Toast />
      <Text></Text>
      <View>
        <Button color='black' title='Create Post' onPress={setJobs} size="md"/>
      </View>
    </View>
  );


}

export default CreatePost;