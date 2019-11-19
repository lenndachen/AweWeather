import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCloud, faSun, faCloudRain, faSnowflake} from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faCloudRain} /> Rain
        </View>
      );
    }
    if (forecast === 'Clouds') {
      return (
        <Text>
          <FontAwesomeIcon icon={faCloud} /> Cloudy
        </Text>
      );
    }
    if (forecast === 'sunny') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} /> Sunny
        </Text>
      );
    }
    if (forecast === 'Clear') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSun} size={35} />
        </Text>
      );
    }
    if (forecast === 'Snow') {
      return (
        <Text>
          <FontAwesomeIcon icon={faSnowflake} size={35} />
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.icons}>
        <Text>{moment(this.props.day).format('MMMM Do YYYY')}</Text>
        <Text>{this.getIcon()}</Text>
        <Text>High:{this.props.todayHigh} ℉ </Text>
        <Text>Low:{this.props.todayLow}℉ </Text>
      </View>
    );
  }
}

export default Day;

const styles = StyleSheet.create({
  icons: {
    width: 395,
    height: 100,
    margin: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
  },
});
