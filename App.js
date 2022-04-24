import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import CardScreen from './screens/CardScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyScreen from './screens/VerifyScreen';
import MainScreen from './screens/MainScreen';
import SearchActivity from './screens/SearchActivity';
import SearchFood from './screens/SearchFood';
import 'react-native-gesture-handler';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false // Will hide header for HomePage
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Verify: {
    screen: VerifyScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Activity: {
    screen: SearchActivity,
    navigationOptions: {
      headerShown: false
    }
  },
  Food: {
    screen: SearchFood,
    navigationOptions: {
      headerShown: false
    }
  }
},{
  initialRouteName: "Activity"
});
const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
