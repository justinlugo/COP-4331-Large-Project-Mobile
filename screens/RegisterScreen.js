import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";

export default class RegisterScreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }

  // RegEx for checking email
  // Valid email must have: (1char)@(2char).(2char)
  validEmail = new RegExp(
      '(.+)@((.+){2,})\.((.+){2,})'
  );

  doRegister = async () => 
  {
      // Creates object for all form fields
      var obj = {firstName:firstName.value, lastName:lastName.value, username:username.value, 
                  email:email.value, password:password.value, confirmPassword:confirmPassword.value};

      // Loop through the object and check to make sure the value are not empty
      for(const [key, value] of Object.entries(obj)) 
      {
          // Use string trim function to remove leading and trailing whitespace
          obj[key] = value.trim();

          // Check if any entry field is empty and stop the submission and let the user know
          if (obj[key] == "") {
              setMessage(`${key} is empty`);
              return;
          }
      }

      // Check if passwords match
      if(obj.password != obj.confirmPassword)
      {
          setMessage('Passwords do not match');
          return;
      }
      
      // Check if the email is valid based on RegEx
      if(!validEmail.test(email.value))
      {
          setMessage('Email is not valid');
          return;
      }
      
      // Remove the confirm password from the object
      delete obj.confirmPassword;

      // Turn object into JSON
      var js = JSON.stringify(obj);

      // Build path for website
      var bp = require('../components/Path.js');

      try
      {  
          // Send object to register
          const response = await fetch(bp.buildPath('register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // Response
          var res = JSON.parse(await response.text());

          // Check if error is not empty
          if(res.error != '')
          {
              setMessage(res.error);
              return;
          }

          // Store the JWT and the user_data
          var storage = require('../tokenStorage.js');
          storage.storeToken(res);
          // Decode the token and store in tokenData
          const tokenData = decodeToken(storage.retrieveToken());
          var user = {firstName:tokenData.firstName,lastName:tokenData.lastName,id:tokenData.userId}
          localStorage.setItem('user_data', JSON.stringify(user));

          // Account has been created go to verification page
          this.props.navigation.navigate('Verify');
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }
  }

  changeSearchHandler = async (val) =>
  {
    global.search = val;
  }  

  changeCardHandler = async (val) =>
  {
    global.card = val;
  }
  
  
  render(){
    return(
      <View style = {styles.container}>
        <View styles = {styles.header}>
          <Text style = {{fontSize:25, padding: 4, color:'#feffdc'}}>
            LetsDoThings
            <Image
            style={styles.image}
                source={require('../assets/LG_logo.png')}
            />
          </Text>
        </View>

        <View style = {styles.footer}>
          <Text style = {{height: 30,fontSize:20}}>
            Register Here:
          </Text>

          <Text style={{fontSize:40}}> </Text>
          
          <View style={{alignItems: 'center'}}>
         
          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>First Name: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200, fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="First Name"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Last Name: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Last Name"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Username: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Username"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Email: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Email"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Password: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Password"
              secureTextEntry={true}
              //onChangeText={(val) => { this.changePasswordHandler(val) }}
            />
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Confirm Password: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Confirm Password"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:10}}> </Text>
          <Text style={{fontSize:20}}>{this.state.message} </Text>
          <Text style={{fontSize:10}}> </Text>
        </View>
        
        <Button 
          title="Register"
          color='#001A5E'
          onPress={this.doRegister}
        /> 

        <Text style={{fontSize:30}}> </Text>

        <Text style={{fontSize:10, color: '#000000', textDecorationLine: 'underline', textAlign: 'center'}}> © University of Central Florida</Text>

        </View>
      </View>
    );
  };
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: '#001A5E',
  },
  header: {
    flex: 5, 
    justifyContent: 'center',
    alignContent: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#7ce2e9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  image: {
    width: height_logo,
    height: height_logo,
    //marginBottom: 40,
  },
  title: {
    color: '#001A5E',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});