import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';

global.loginName = '';
global.loginPassword = '';
global.userId = -1;
global.firstName = '';
global.lastName = '';
global.email = '';
global.confirmPassword = '';

export default class RegisterScreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }

  doRegister = async () => 
  {
      // Creates object for all form fields
      var obj = {firstName:global.firstName, lastName:global.lastName, username:global.loginName, 
                  email:global.email, password:global.loginPassword, confirmPassword:global.confirmPassword};

      // Might not need.
      // Loop through the object and check to make sure the value are not empty
      for(const [key, value] of Object.entries(obj)) 
      {
          // Use string trim function to remove leading and trailing whitespace
          //obj[key] = value.trim();
          obj[key] = value;
          // Check if any entry field is empty and stop the submission and let the user know
          if (obj[key] == "") {
              this.setState({message: 'One or more fields is empty.'})
              //setMessage(`${key} is empty`);
              return;
          }
      }

      // Check if passwords match
      if(obj.password != obj.confirmPassword)
      {
          this.setState({message: 'Passwords do not match.'});
          //setMessage('Passwords do not match');
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
              this.setState({message: e.message});
              //setMessage(res.error);
              return;
          }

          // Account has been created go to verification page
          this.props.navigation.navigate('Verify');
      }
      catch(e)
      {
          this.setState({message: e.message});
          return;
      }
  }

  GoToLogin = async () =>
  {
    try
    {
      this.props.navigation.navigate('Login');
    }
    catch(e)
    {
      this.setState({message: e.message})
    }
  }

  changeFirstNameHandler = async (val) =>
  {
    global.firstName = val;
  }  

  changeLastNameHandler = async (val) =>
  {
    global.lastName = val;
  }

  changeLoginNameHandler = async (val) =>
  {
    global.loginName = val;
  }  

  changeEmailHandler = async (val) =>
  {
    global.email = val;
  }
  
  changePasswordHandler = async (val) =>
  {
    global.loginPassword = val;
  }  

  changeConfirmPasswordHandler = async (val) =>
  {
    global.confirmPassword = val;
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
              onChangeText={(val) => { this.changeFirstNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Last Name: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Last Name"
              onChangeText={(val) => { this.changeLastNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Username: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Username"
              onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Email: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Email"
              onChangeText={(val) => { this.changeEmailHandler(val) }}
            />        
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Password: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(val) => { this.changePasswordHandler(val) }}
            />
          </View>

          <Text style={{fontSize:5}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Confirm Password: </Text>
            <TextInput
              style={{height: 30,borderWidth: 1, padding: 4, borderColor: '#000000', width: 200,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(val) => { this.changeConfirmPasswordHandler(val) }}
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

        <Text style={{fontSize:10}}> </Text>

        <Button 
          title="Go Back"
          color='#001A5E'
          onPress={this.GoToLogin}
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
  }
});