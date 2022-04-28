import React, { Component, useState } from 'react';
import { ActivityIndicator, Dimensions, Button, View, Text, TextInput, Image, StyleSheet, Linking} from 'react-native';

export default class VerifyScreen extends Component {

  constructor() 
  {
    super()
    this.state = 
    {
       message: ' '
    }
  }

  // Verified id: 3
  // Unverified id: 274

  // Test Login/Password: VerifyTest1, 1234

  /*
  CheckConfirm = async () => 
  {
    var bp = require('../components/Path.js');

    const confirmObj = {id: global.userId};

    try
    {
      const checkConfirm = await fetch(bp.buildPath('checkConfirm'), {method:'POST',body:JSON.stringify(confirmObj),headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await checkConfirm.text());

      if (global.emailConfirm == 1)
      {
        // Valid user move to /Main
        this.props.navigation.navigate('Main');
      }
      else
      {
        this.DoVerify();
      }

    }

    catch(e)
    {
      this.setState({message: 'Test3'}); //e.message});
      return;
    }
  }

  

  DoVerify = async () =>
  {
    //this.setState({message: 'Sending email.'});

    const obj = {userId: global.userId};

    var js = JSON.stringify(obj);
    
    var bp = require('../components/Path.js');

    try
    {
      const response = await fetch(bp.buildPath('sendtestmail'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error && res.error.length > 0 )
      {
        this.setState({message: 'API Error'});
      }
      if (res.error == '')
      {
        
      }
      else 
      {
        this.setState({message: 'Error 1'});
        return;
      }

    }
    catch(e)
    {
      this.setState({message: 'Error 2'});
      return;
    }
  }
  */
  
  
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
            Verify your account to get started!
          </Text>

          <Text style={{fontSize:40}}> </Text>
          
          <View style={{alignItems: 'center'}}>
          <View style={{ flexDirection:'row' }}>
            <Text style={{fontSize:20}}>Click Below to Verify: </Text>      
          </View>
          <Text style={{fontSize:20}}> </Text>
          <Text style={{fontSize:10}}> </Text>
          <Text style={{fontSize:20}}>{this.state.message} </Text>
          <Text style={{fontSize:10}}> </Text>
        </View>

        <Button
          title="Verify"
          color='#001A5E'
          //onPress={this.CheckConfirm}
          onPress={() => Linking.openURL('https://letsdothings.herokuapp.com/Login')}
        />

        <Text style={{fontSize:70}}> </Text>

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
