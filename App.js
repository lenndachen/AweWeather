import React, {Component} from 'react';
import Weather from './components/Weather';
import AppContainer from './components/AppContainer';
import {View} from 'react-native';
class App extends Component {
  render() {
    return (
      <View>
        <View>
          <AppContainer />
        </View>
        <View>
          <Weather />
        </View>
      </View>
    );
  }
}

export default App;
