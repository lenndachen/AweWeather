/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Today from '../Today';

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
          },
          () => {},
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  // getData() {
  //   const {humidity, country, city} = this.state;
  //   return (
  //     <View>
  //       <Text h3>City</Text>
  //       <Text>{city}</Text>
  //       <Text h3>Humidity</Text>
  //       <Text>{humidity}</Text>
  //       <Text h3>Country</Text>
  //       <Text>{country}</Text>
  //     </View>
  //   );
  // }

  render() {
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
          }}
        />

        {this.state.temperature.length > 0 && (
          <Today
            temperature={this.state.temperature}
            dayInfo={this.state.dayInfo}
          />
        )}
      </View>
    );
  }
}

export default Weather;

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
});
