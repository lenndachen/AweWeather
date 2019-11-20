import React, {Component} from 'react';
import {View, Button, TextInput, StyleSheet, Text} from 'react-native';
import moment from 'moment';

export class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
    };
  }
  get5day = async () => {
    const apikey = '1d80f33d31919cc397f2bf782026d6c3';
    let zip = this.state.setUserInput;
    const url =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      zip +
      '&APPID=' +
      apikey;
    console.log('setting2', url);
    fetch(url)
      .then(res => res.json())
      .then(forecastData => {
        console.log('setting3', forecastData);
        this.setState(
          {
            hourlyForecast: forecastData.list,
            coord1: forecastData.city.coord,
            date1: forecastData.list[0].dt_text,
          },
          () => {
            this.getForecastData();
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  getWeather = async () => {
    const apikey = '1d80f33d31919cc397f2bf782026d6c3';
    let zip = this.state.setUserInput;
    const url =
      'https://api.openweathermap.org/data/2.5/weather?zip=' +
      zip +
      '&APPID=' +
      apikey;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        console.log('setting1', responseData);
        this.setState(
          {
            temperature: responseData.main.temp,
            humidity: responseData.main.humidity,
            city: responseData.name,
            lat: responseData.coord.lat,
            lng: responseData.coord.lon,
            country: responseData.sys.country,
            dayInfo: responseData.weather[0].main,
            country: responseData.sys.country,
          },
          () => {},
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  getForecastData() {
    let weatherData = this.state.hourlyForecast;
    let today = [];
    let day2 = [];
    let day3 = [];
    let day4 = [];
    let day5 = [];
    weatherData.map((weatherIncrement, i) => {
      const forecastDate = moment(weatherIncrement.dt * 1000).format(
        'MMMM Do YYYY',
      );

      if (
        forecastDate ===
        moment()
          .add(0, 'days')
          .format('MMMM Do YYYY')
      ) {
        today.push(weatherIncrement);
      }
      if (
        forecastDate ===
        moment()
          .add(1, 'days')
          .format('MMMM Do YYYY')
      ) {
        day2.push(weatherIncrement);
      }
      if (
        forecastDate ===
        moment()
          .add(2, 'days')
          .format('MMMM Do YYYY')
      ) {
        day3.push(weatherIncrement);
      }
      if (
        forecastDate ===
        moment()
          .add(3, 'days')
          .format('MMMM Do YYYY')
      ) {
        day4.push(weatherIncrement);
      }
      if (
        forecastDate ===
        moment()
          .add(4, 'days')
          .format('MMMM Do YYYY')
      ) {
        day5.push(weatherIncrement);
      }

      return console.log('every 3 hours the weather is', weatherIncrement, i);
    });
    console.log('weatherIncrement', today);
    console.log('weather day 2', day2);
    console.log('weather day 3', day3);
    console.log('weather day 4', day4);
    console.log('weather day 5', day5);
    this.setState({
      today: today,
      day2: day2,
      day3: day3,
      day4: day4,
      day5: day5,
      isForecast: true,
    });
  }

  render() {
    return (
      <View style={styles.home}>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({setUserInput: text})}
          value={this.state.setUserInput}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.props.navigation.navigate('HomeScreen', {
              user: this.state.setUserInput,
            });
          }}
        />
      </View>
    );
  }
}

export default Setting;

const styles = StyleSheet.create({
  input: {
    height: 40,
    position: 'relative',
  },
  home: {

  },
});
