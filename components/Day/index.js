import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import moment from 'moment';
import {
  faCloud,
  faSun,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import {Text, View, StyleSheet} from 'react-native';

library.add(faSun, faCloud, faCloudRain, faSnowflake);

class Day extends React.Component {
  getIcon() {
    const newArray = Object.assign(this.props.dayInfo);
    console.log(newArray[0]);
    const forecast = newArray[0].weather[0].main;
    console.log('whole day', forecast);

    if (forecast === 'Rain') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloudRain} size={20} /> Rain
        </Text>
      );
    }
    if (forecast === 'Clouds') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloud} size={20} /> Cloudy
        </Text>
      );
    }
    if (forecast === 'sunny') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={20} /> Sunny
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
      <View>
        <View style={styles.icons}>
          <Text style={styles.level}>
            {moment(this.props.day).format('MMM Do')}
          </Text>
          <Text style={styles.level}>{this.getIcon()}</Text>
          <Text style={styles.level}>High:{this.props.todayHigh} ℉ </Text>
          <Text style={styles.level}>Low:{this.props.todayLow}℉ </Text>
        </View>
      </View>
    );
  }
}

export default Day;

const styles = StyleSheet.create({
  icons: {
    width: '100%',
  },
  level: {
    fontSize: 18,
  },
});
