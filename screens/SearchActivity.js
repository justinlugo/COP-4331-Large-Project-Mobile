import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";
import {SearchBar } from "react-native-elements";
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

global.myAddress = '';
global.latitude = '';
global.longitude = '';
global.isError = 0;

export default class SearchActivity extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' ',
       attractionList: [],
       bowlingList: [],
       theaterList: []

    }
  }
  
  SearchActivities = async () =>
  {
    // Translate Address into Lat/Long. For sure works.
    var shortAddress = global.myAddress.trim();
    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + shortAddress + '&key=AIzaSyB1yyBh87O0jJdpFOvYqrBxXjIpFoJnLas'; 


    await axios.get(geoUrl)
    .then(function (geoResponse)
    {
      global.latitude = geoResponse.data.results[0].geometry.location.lat;
      global.longitude = geoResponse.data.results[0].geometry.location.lng;
    })
    .catch(function()
    {
      this.setState({message: 'Invalid Address.'});
      global.isError = 1;
    });

    // Gets nearby Activities.
    if (isError == 0)
    {
      var searchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + global.latitude + '%2C' + global.longitude + '&radius=15000&keyword=tourist_attraction&key=AIzaSyB1yyBh87O0jJdpFOvYqrBxXjIpFoJnLas';

      //await axios.get(searchUrl)
      fetch (searchUrl)
        .then(response => response.json())
        .then(result => this.setState({attractionList: result}))
        .catch(function()
        {
          this.setState({message: 'Search Error.'});
          global.isError = 1;
        });

        
        //|bowling_alley|movie_theater
        var searchUrl2 = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + global.latitude + '%2C' + global.longitude + '&radius=15000&keyword=bowling_alley&key=AIzaSyB1yyBh87O0jJdpFOvYqrBxXjIpFoJnLas';

        //await axios.get(searchUrl)
        fetch (searchUrl2)
          .then(response => response.json())
          .then(result => this.setState({bowlingList: result}))
          .catch(function()
          {
            this.setState({message: 'Search Error.'});
            global.isError = 1;
          });
        

        var searchUrl3 = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + global.latitude + '%2C' + global.longitude + '&radius=15000&keyword=movie_theater&key=AIzaSyB1yyBh87O0jJdpFOvYqrBxXjIpFoJnLas';

        //await axios.get(searchUrl)
        fetch (searchUrl3)
          .then(response => response.json())
          .then(result => this.setState({theaterList: result}))
          .catch(function()
          {
            this.setState({message: 'Search Error.'});
            global.isError = 1;
          });
          
    }
  }

  changeAddressHandler = async (val) =>
  {
    global.myAddress = val;
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

          <TextInput
              //style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              style={{height: 30, borderWidth: 1, padding: 4, borderColor: '#000000', borderRadius: 15, width: 375, fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Your Address Here..."
              onChangeText={(val) => { this.changeAddressHandler(val) }}
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
              
            <Text> Tourist Attractions: </Text>

              <FlatList  
                  data={this.state.attractionList.results}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({item}) => (
                    <Text>{item.name}{'\n'}{item.vicinity}{'\n--------------------------------------------------------------------------'}</Text>
                  )}
                />

              <Text> Bowling Alleys: </Text>

                <FlatList  
                  data={this.state.bowlingList.results}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({item}) => (
                    <Text>{item.name}{'\n'}{item.vicinity}{'\n--------------------------------------------------------------------------'}</Text>
                  )}
                />
                
                <Text> Movie Theaters: </Text>
                
                <FlatList  
                  data={this.state.theaterList.results}
                  keyExtractor={(item) => item.place_id}
                  renderItem={({item}) => (
                    <Text>{item.name}{'\n'}{item.vicinity}{'\n--------------------------------------------------------------------------'}</Text>
                  )}
                />
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
