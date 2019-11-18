import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Setting from './components/screens/Setting';
import Home from './components/screens/Home';

const AppNavigator = createStackNavigator({
  SettingScreen: {screen: Setting},
  HomeScreen: {screen: Home},
});

const AppContainer = createAppContainer(AppNavigator);

export default class AppContainer extends Component {
    render() {
      return <AppContainer />;
    }
  }