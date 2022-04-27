import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';

global.loginName = '';
global.loginPassword = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.email = '';
global.emailConfirm = -1;
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

  DoLogin = async () =>
  {
    var obj = {username:global.loginName,password:global.loginPassword};

    var js = JSON.stringify(obj);
    var bp = require('../components/Path.js');

    try
    {  
      // Retrieves token and error from server
      const response = await fetch(bp.buildPath('login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      // Convert response to JSON
      var res = JSON.parse(await response.text());

      // Working Login: jenkins, password
      // Unverified Login: InValidLogin, 1234
      if( res.userId <= 0)
      {
          // Let user know error and end
          this.setState({message: 'Invalid ID'});
          return;
      }

      // The user that is logging in is valid now check for errors
      var user = {firstName:res.firstName,lastName:res.lastName,id:res.userId,confirmEmail:res.emailConfirm}

      global.firstName = res.firstName;
      global.lastName = res.lastName;
      global.userId = res.userId;
      global.emailConfirm = res.email.Confirm;

      // Checks the error message from server.
      // Lets the user know they must confirm their email before continuing
      if (res.error == 'Please confirm your email before logging in.')
      {
          // Move to /Verify
          this.props.navigation.navigate('Verify');         
      }
      else if ( res.error == '')
      {
        // Valid user move to /Main
        this.props.navigation.navigate('Main');
      }
      else
      {
        // Incorrect Login
        this.setState({message: 'Incorrect Username/Password'});
        return;
      }
    }
    // JWT not received properly
    catch(e)
    {
      //console.log(e.toString());
      this.setState({message: e.message})
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
  }
});
