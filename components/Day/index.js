import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faCloud,
  faSun,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import {Text, View, StyleSheet} from 'react-native';

library.add(faSun, faCloud, faCloudRain);

class Day extends React.Component {
  getIcon() {
    const newArray = Object.assign(this.props.dayInfo);
    console.log(newArray[0]);
    const forecast = newArray[0].weather[0].main;
    console.log('whole day', forecast);

    if (forecast === 'Rain') {
      return (
        <View>
          <FontAwesomeIcon icon={faCloudRain} size={20}/> Rain
        </View>
      );
    }
    if (forecast === 'Clouds') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloud} size={20}/> Cloudy
        </Text>
      );
    }
    if (forecast === 'sunny') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={20}/> Sunny
        </Text>
      );
    }
    if (forecast === 'Clear') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={20} /> Clear
        </Text>
      );
    }
    if (forecast === 'Snow') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSnowflake} size={20} /> Snow
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.level}>
        <View style={styles.icons}>
          <Text>{moment(this.props.day).format('MMMM Do YYYY')}</Text>
          <Text>{this.getIcon()}</Text>
          <Text>High:{this.props.todayHigh} ℉ </Text>
          <Text>Low:{this.props.todayLow}℉ </Text>
        </View>
      </View>
    );
  }
}

export default Day;

const styles = StyleSheet.create({
  icons: {
    width: '75%',
    borderWidth: .5,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
  },
  fontsize: {
    fontSize: 18,
  },
});
