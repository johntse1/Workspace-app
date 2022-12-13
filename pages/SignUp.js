import { Button, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';



function SignUp({ navigation }) {
  const [USER_EMAIL, setUSER_EMAIL] = useState('')
  const [USER_PASSWORD, setUSER_PASSWORD] = useState('')
  const [USER_FIRST_NAME, setUSER_FIRST_NAME] = useState('')
  const [USER_LAST_NAME, setUSER_LAST_NAME] = useState('')
  const [USER_BIRTHDAY, setUSER_BIRTHDAY] = useState('')
  const [USER_DESCRIPTION, setUSER_DESCRIPTION] = useState('')
  const [USER_SKILLS, setUSER_SKILLS] = useState([])
  const [USER_CONTRACTOR, setUSER_CONTRACTOR] = useState(false)
  const [USER_IMAGES, setUSER_IMAGES] = useState()


  const [Contractor, setContractor] = useState([
    { label: 'Contractor', value: true },
    { label: 'User', value: false }
  ]);

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



  const [openCon, setOpenCon] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setUSER_BIRTHDAY(date)
    hideDatePicker();
  };

  const temp = () => {
    console.log("email" + USER_EMAIL)
    console.log("pass" + USER_PASSWORD)
    console.log("first" + USER_FIRST_NAME)
    console.log("last" + USER_LAST_NAME)
    console.log("bortj " + USER_BIRTHDAY)
    console.log("desc " + USER_DESCRIPTION)
    console.log("skill" + USER_SKILLS)
    console.log("con" + USER_CONTRACTOR)
    console.log(USER_IMAGES)
  }
  const registerUser = async () => {
    var formdata = new FormData()
    formdata.append("image", USER_IMAGES)
    formdata.append("first_name", USER_FIRST_NAME)
    formdata.append("last_name", USER_LAST_NAME)
    formdata.append("email", USER_EMAIL)
    formdata.append("password", USER_PASSWORD)
    // formdata.append("birthday", USER_BIRTHDAY)
    formdata.append("description", USER_DESCRIPTION)
    formdata.append("skills", USER_SKILLS)
    formdata.append("contractor", USER_CONTRACTOR)

    console.log(USER_BIRTHDAY)

    await axios({
      method: "post",
      url: "https://workspace.onrender.com/api/users/register",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    }).then((response) => {
      console.log(response)
      console.log("acc creation worked")
    }).catch((error) => {
      console.log(error)
      console.log("failed")
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setUSER_IMAGES(result.assets[0].uri);
      // let file = {uri: result.assets[0].uri,name:'image.jpg',type:result.assets[0].type}
      // imageuri = {uri : result.assets[0].uri}
      setUSER_IMAGES({ uri: result.assets[0].uri, name: 'image.jpg', type: 'image/jpeg' })
    }
  }

  const printimage = () => {
    console.log(USER_IMAGES)
  }


  return (
    <View>
      <TextInput
        placeholder="Enter your first name"
        onChangeText={(USER_FIRST_NAME) => setUSER_FIRST_NAME(USER_FIRST_NAME)}
      />
      <TextInput
        placeholder="Enter your last name"
        onChangeText={(USER_LAST_NAME) => setUSER_LAST_NAME(USER_LAST_NAME)}
      />

      <TextInput
        placeholder="Email"
        onChangeText={(USER_EMAIL) => setUSER_EMAIL(USER_EMAIL)}
      />

      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(USER_PASSWORD) => setUSER_PASSWORD(USER_PASSWORD)}
      />
      <Text> What are you?</Text>
      <DropDownPicker
        open={openCon}
        value={USER_CONTRACTOR}
        items={Contractor}
        setOpen={setOpenCon}
        setValue={setUSER_CONTRACTOR}
        setItems={setContractor}
        onChangeValue={(value) => {
          console.log(value);
        }}
      />

      <Button title="Select your birthday" onPress={showDatePicker} color={"black"} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />


      <Text>Description</Text>

      <TextInput
        numberOfLines={5}
        multiline={true}
        placeholder="Enter a description"
        onChangeText={(USER_DESCRIPTION) => setUSER_DESCRIPTION(USER_DESCRIPTION)}
      />


      <Text>Skills</Text>

      <DropDownPicker
        multiple={true}
        open={openSkills}
        value={USER_SKILLS}
        items={Skills}
        setOpen={setOpenSkills}
        setValue={setUSER_SKILLS}
        setItems={setSkills}
        onChangeValue={(value) => {
          console.log(value);
        }}
      />

      <Button title="Upload a profile picture" onPress={pickImage} />
      <Button title="print file data" onPress={printimage} />
      <Button color='black' title='Register' onPress={registerUser} />
      <Button color='black' title='print all' onPress={temp} />

    </View>
  );
}

export default SignUp;