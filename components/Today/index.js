/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faCloud,
  faSun,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
library.add(faSun, faCloud, faCloudRain, faSnowflake);
import {View, Text} from 'react-native';

class Today extends React.Component {
  getBigIcon() {
    const newArray1 = this.props.dayInfo;
    console.log('newArray1', this.props.dayInfo);
    if (newArray1 === 'Rain') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloudRain} size={35} />
        </Text>
      );
    }
    if (newArray1 === 'Clouds') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloud} size={35} />
        </Text>
      );
    }
    if (newArray1 === 'Sunny') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={35} />
        </Text>
      );
    }
    if (newArray1 === 'Clear') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={35} />
        </Text>
      );
    }
    if (newArray1 === 'Snow') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSnowflake} size={35} />
        </Text>
      );
    }
  }

  getTemp(k) {
    let kelvin = k - 273.15;
    let farenheit = (kelvin * 9) / 5 + 32;
    let solution = Math.round(farenheit * 10) / 10;
    return solution;
  }

  render() {
    return (
      <View>
        <View style={{width: 30, height: 20}}>{this.getBigIcon()}</View>
      </View>
    );
  }
}


export default Today;
