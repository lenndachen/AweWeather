/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Today from '../Today';
import Week from '../Week';
import moment from 'moment';
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      date: '',
      temperature: '',
      humidity: '',
      error: '',
      location: '',
      currentInput: '',
      weather: '',
      city: '',
      map: '',
      todaysDate: '',
      zipcodes: [{lat: 47.49855629475769, lng: -122.14184416996333}],
      renderedData: [],
    };
  }

  // setUserInput = e => {
  //   this.setState({currentInput: e.target.value});
  //   console.log('currentInput', this.state.currentInput);
  // };

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
        console.log('data5', responseData);
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

  get5day = async () => {
    const apikey = '1d80f33d31919cc397f2bf782026d6c3';
    let zip = this.state.setUserInput;
    const url =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      zip +
      '&APPID=' +
      apikey;
    console.log('forecast data', url);
    fetch(url)
      .then(res => res.json())
      .then(forecastData => {
        console.log('forecast data', forecastData);
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

  getTemp(k) {
    let kelvin = k - 273.15;
    let farenheit = (kelvin * 9) / 5 + 32;
    let solution = Math.round(farenheit * 10) / 10;
    return solution;
  }

  render() {
    const {temperature, dayInfo, city, country} = this.state;
    return (
      <View>
        <Text>Hello</Text>
        <Text>ZipCode</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({setUserInput: text})}
          value={this.state.setUserInput}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.getWeather();
            this.get5day();
          }}
        />

        <View>
          <View style={styles.section1}>
            <View style={styles.flexyglass}>
              <Text>
                Temperature:
                {this.state.temperature && (
                  <Text>{this.getTemp(temperature)}</Text>
                )}{' '}
                {''} {''}
              </Text>
              <Today dayInfo={dayInfo} />
            </View>
            <View>
              <Text>Description: {dayInfo}</Text>
              <Text>City: {city}</Text>
              <Text>Country: {country}</Text>
            </View>
          </View>
          <View>
            {this.state.isForecast && (
              <Week
                today={this.state.today}
                day2={this.state.day2}
                day3={this.state.day3}
                day4={this.state.day4}
                day5={this.state.day5}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default Weather;

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
  section1: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,

  },
  flexyglass: {
    flexDirection: 'row',
  },
});
