import React, { Component, useState } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { isExpired, decodeToken } from "react-jwt";
export default class PassReset extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       searchCriteria: '\n ',
       newCard: '\n '
    }
  }

  render() {
    return(

        <View style = {styles.container}>
          <View styles = {styles.header}>
            <Text style = {{fontSize:25, color:'#feffdc'}}>
              LetsDoThings
              <Image
              style={styles.image}
                  source={require('../assets/LG_logo.png')}
              />
            </Text>
          </View>
  
          <View style = {styles.footer}>
            <Text style = {{height: 30,fontSize:20}}>
              Password Reset.
            </Text>
  
            <Text style={{fontSize:40}}> </Text>
            
            <View style={{alignItems: 'center'}}>
            <View style={{ flexDirection:'row' }}>
              <Text style={{fontSize:20}}>Reset Your Password: </Text>      
            </View>
            <Text style={{fontSize:20}}> </Text>

            <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Password: </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Password"
              secureTextEntry={true}
              //onChangeText={(val) => { this.changePasswordHandler(val) }}
            />
          </View>

          <Text style={{fontSize:19}}> </Text>

          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Confirm Password: </Text>
            <TextInput
              style={{height: 30,fontSize:20, backgroundColor:'#ffffff'}}
              placeholder="Confirm Password"
              //onChangeText={(val) => { this.changeLoginNameHandler(val) }}
            />        
          </View>

            <Text style={{fontSize:10}}> </Text>


            <Text style={{fontSize:20}}>{this.state.message} </Text>
            <Text style={{fontSize:10}}> </Text>
          </View>
  
          <Button
            title="Reset"
            color='#001A5E'
            onPress={this.DoLogin}
          />
  
          </View>
        </View>
      );
  }

  handleCardClick = async () => 
  {
    var obj = {userId:global.userId,card:global.card};
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch('https://cop4331-10.herokuapp.com/api/addcard', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      this.setState({newCard: "Your card has been added" });
   }
    catch(e)
    {
      this.setState({newCard: e.message });
    }
  }  

  handleSearchClick = async () => 
  {
    var obj = {userId:global.userId,search:global.search};
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch('https://cop4331-10.herokuapp.com/api/searchcards',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      var _results = res.results;

      var resultText = '';
      for( var i=0; i<_results.length; i++ )
      {
          resultText += _results[i];
          if( i < _results.length - 1 )
          {
              resultText += '\n';
          }
      }
      resultText += '\n';

      this.setState({searchCriteria: resultText });
    }
    catch(e)
    {
      this.setState({searchCriteria: e.message });
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
