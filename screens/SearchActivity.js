import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";
import {SearchBar } from "react-native-elements";

export default class VerifyScreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' ',
       searchValue: ""
    }
  }
  
  SearchActivities = async (val) =>
  {
    try
    {
      this.props.navigation.navigate('Main');
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
            <Text style={{fontSize:10}}> </Text>
          <Text style = {{fontSize:25, padding: 4, color:'#feffdc'}}>
            LetsDoThings
          </Text>
        </View>
        
        <View style = {styles.center}>
          <Text style = {{height: 30,fontSize:20}}>
            Search Activities
          </Text>
          <Text style={{fontSize:5}}> </Text>

          {/* Search Bar*/}
            <SearchBar
                placeholder="Your Address Here..."
                round
                lightTheme
                value={this.state.searchValue}
                onChangeText={(val) => { this.SearchActivities(val) }}
            /> 
          
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize:5}}> </Text>
                <Text style={{fontSize:10}}>{this.state.message} </Text>
                <Text style={{fontSize:5}}> </Text>
                <Button
                    title="Find me something to do!"
                    color='#001A5E'
                    onPress={this.SearchActivities}
                />
                <Text style={{fontSize:5}}> </Text>
            </View>

            {/*Cards Load Under Here*/}
            <View style = {styles.footer}>
            
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#001A5E',
  },
  header: {
    flex: 1, 
    justifyContent: 'center',
    alignContent: 'center',
  },
  center: {
    flex: 1,
    backgroundColor: '#7cbde9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#7ce2e9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
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
