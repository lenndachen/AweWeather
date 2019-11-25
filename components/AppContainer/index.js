import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Setting from '../screens/Setting';
import Home from '../screens/Home';

const AppNavigator = createStackNavigator(
  {
    SettingScreen: {screen: Setting},
    HomeScreen: {screen: Home},
  },
  {
    initialRouteName: 'SettingScreen',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#B8E4F9',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppCo = createAppContainer(AppNavigator);

export default class AppContainer extends Component {
  render() {
    return <AppCo />;
  }
}
