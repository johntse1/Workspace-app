import { Button, View, Text, TextInput,StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

let enteredSklls = []
function CreatePost() {
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

      let url = 'https://workspace.onrender.com/api/jobs/set'

      let skills = [ "Construction", "Plumbing", "Electrical","Mechanical","Home","Logging","Technical","Roof"]
    


      const setJobs = async () => {
        let token = JSON.parse(await AsyncStorage.getItem("JWT_TOKEN"))
        const formdata = new FormData()
        // formdata.append("images", USER_IMAGES)
        if(USER_IMAGES.length>=1)
        {
          let files = USER_IMAGES
          for (let i = 0; i < files.length; i++) {
            formdata.append("images", files.item(i))
          }
        }
       
    
        formdata.append("title", USER_TITLE)
        formdata.append("user", USER_ID)
        formdata.append("text", USER_POST_DESCRIPTION)
        formdata.append("price", USER_PRICE)
        formdata.append("tags", USER_TAGS)
        formdata.append("address", USER_ADDRESS)
    
    
        axios({
          method: "post",
          url: "https://workspace.onrender.com/api/jobs/set",
          data: formdata,
          headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
        }).then(function (response) {
          console.log(response)
          history.push('/userjobs')
    
        }).catch(function (error) {
          console.log(error)
          if (error.response.status == 400) {
            toast.error("Please enter another address")
          }
    
          if (error.response.status == 401) {
            toast.error("Please add a text field")
          }
          if (error.response.status == 402) {
            toast.error("Please add a title")
          }
          if (error.response.status == 403) {
            toast.error("Please enter a price field")
          }
          if (error.response.status == 404) {
            toast.error("Failed to upload to imgur")
          }
        })
    
    
      }




    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <Text>Hi{USER_TAGS.toString()}</Text>
        </View>
        <SelectDropdown
	        data={skills}
	        onSelect={(selectedItem, index) => {
		      //console.log(selectedItem, index)
          enteredSklls.push(selectedItem)
          console.log(enteredSklls)
          setUSER_TAGS(enteredSklls)
	      }}
	        buttonTextAfterSelection={(selectedItem, index) => {
		      return selectedItem
	      }}
	        rowTextForSelection={(item, index) => {
		      return item
	      }}
        />
        <View>

        </View>
      </View>
    );
  }

  export default CreatePost;