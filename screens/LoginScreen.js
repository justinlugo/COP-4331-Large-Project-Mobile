import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';

global.loginName = '';
global.loginPassword = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.username = '';
global.email = '';
global.confirmPassword = '';


export default class Homescreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }

  /*
  Login = async () =>
  {
    try
    {
      var obj = {login:global.loginName,password:global.password};
      var js = JSON.stringify(obj);

      const response = await fetch('https://cop4331-10.herokuapp.com/api/login',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if( res.id <= 0 )
      {
        this.setState({message: "User/Password combination incorrect" });
      }
      else
      {
        global.firstName = res.firstName;
        global.lastName = res.lastName;
        global.userId = res.id;
        this.props.navigation.navigate('Card');
      }
    }
    catch(e)
    {
      this.setState({message: e.message });
    }
  }*/


  DoLogin = async () =>
  {
    var obj = {username:global.loginName,password:global.loginPassword};

    var js = JSON.stringify(obj);
    var storage = require('../tokenStorage.js');
    var bp = require('../components/Path.js');

    try
    {  
      // Retrieves token and error from server
      const response = await fetch(bp.buildPath('login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      // Convert response to JSON
      var res = JSON.parse(await response.text());

      storage.storeToken(res);
            
      // Decode the token and store in tokenData
      const tokenData = decodeToken(storage.retrieveToken());

      // Check if userId is valid
      if( tokenData.userId <= 0)
      {
          // Let user know error and end
          this.setState({message: 'userId is not valid.'});
          return;
      }

      // The user that is logging in is valid now check for errors
      // Store the user info locally
      var user = {firstName:tokenData.firstName,lastName:tokenData.lastName,id:tokenData.userId}
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));


      global.firstName = res.firstName;
      global.lastName = res.lastName;
      global.userId = res.id;

      // Checks the error message from server.
      // Lets the user know they must confirm their email before continuing
      if (res.error == 'Please confirm your email before logging in.')
      {
          // Move to /Verify
          this.props.navigation.navigate('Verify');         
      }
      else
      {
        // Valid user move to /Main
        this.props.navigation.navigate('Main');
      }
    }
    // JWT not received properly
    catch(e)
    {
      //console.log(e.toString());
      this.setState({message: 'Epic JWT Fail'})
      return;
    }
  }

  GoToRegister = async () =>
  {
    try
    {
      this.props.navigation.navigate('Register');
    }
    catch(e)
    {
      this.setState({message: e.message });
    }
  }
  
  changeLoginNameHandler = async (val) =>
  {
    global.loginName = val;
  }  

  changePasswordHandler = async (val) =>
  {
    global.loginPassword = val;
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
            Welcome! Login:
          </Text>

          <Text style={{fontSize:40}}> </Text>
          
          <View style={{alignItems: 'center'}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Username: </Text>
            <TextInput
              //style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              style={{height: 30, borderWidth: 1, padding: 4, borderColor: '#000000', width: 200, fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Username"
              onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>
          <Text style={{fontSize:20}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Password: </Text>
            <TextInput
              //style={{height: 30, borderWidth: 1, borderColor: '#000000', width: 200, fontSize:20, backgroundColor:'#ffffff'}}
              style={{height: 30, borderWidth: 1, padding: 4, borderColor: '#000000', width: 200, fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => { this.changePasswordHandler(val) }}
            />
          </View>
          <Text style={{fontSize:10}}> </Text>
          <Text style={{fontSize:20}}>{this.state.message} </Text>
          <Text style={{fontSize:10}}> </Text>
        </View>

        <Button
          title="Login"
          color='#001A5E'
          onPress={this.DoLogin}
        />

        <Text style={{fontSize:10}}> </Text>
        <Text style={{fontSize:20, textAlign: 'center'}}> Don't have an account?</Text>
        <Text style={{fontSize:20, textAlign: 'center'}}> Register below.</Text>
        <Text style={{fontSize:10}}> </Text>
        
        <Button 
          title="Register"
          color='#001A5E'
          onPress={this.GoToRegister}
        /> 

        <Text style={{fontSize:30}}> </Text>

        <Text style={{fontSize:10, color: '#000000', textDecorationLine: 'underline', textAlign: 'center'}}> © University of Central Florida</Text>

        </View>
      </View>
    );
  }
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
