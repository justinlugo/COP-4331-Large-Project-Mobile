import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";

export default class VerifyScreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }
  
  GoToFood = async () =>
  {
    try
    {
      this.props.navigation.navigate('Food');
    }
    catch(e)
    {
      this.setState({message: e.message})
    }
  }

  GoToActivity = async () =>
  {
    try
    {
      this.props.navigation.navigate('Activity');
    }
    catch(e)
    {
      this.setState({message: e.message})
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
            Let's get started!
          </Text>
          <Text style={{fontSize:20}}> </Text>

          
          <View style={{alignItems: 'center'}}>
            <View style={{ flexDirection:'row' }}>
              <Text style={{fontSize:20}}>What would you like to do? </Text>      
          </View>

          <Text style={{fontSize:20}}> </Text>
          
          <Text style={{fontSize:20}}>{this.state.message} </Text>
          <Text style={{fontSize:10}}> </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <View style = {{ flexDirection: "column", marginBottom: 10 }}>
              <Button
              title="Food"
              color='#001A5E'
              onPress={this.GoToFood}
              />

              <Text style={{fontSize:15}}> </Text>

              <Button
              title="Activity"
              color='#001A5E'
              onPress={this.GoToActivity}
              />

              <Text style={{fontSize:15}}> </Text>

              <Button
              title="Logout"
              color='#001A5E'
              onPress={this.GoToLogin}
              />
          </View>

          <Text style={{fontSize:10}}> </Text>

          <Text style={{fontSize:10, color: '#000000', textDecorationLine: 'underline', textAlign: 'center'}}> © University of Central Florida</Text>
        </View>


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
