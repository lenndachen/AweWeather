import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Setting from '../screens/Setting';
import Home from '../screens/Home';

const AppNavigator = createStackNavigator({
  SettingScreen: {screen: Setting},
  HomeScreen: { screen: Home },
});

const AppCo = createAppContainer(AppNavigator);

export default class AppContainer extends Component {
  render() {
    return <AppCo />;
  }
}
