import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {
  faCloud,
  faSun,
  faCloudRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';

library.add(faSun, faCloud, faCloudRain, faSnowflake);
export class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
    };
  }

  getIcons() {
    const hello = <FontAwesomeIcon icon={faSun} size={60} />;
    return hello;
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
        <View>
          <Text style={styles.sun}>
            <FontAwesomeIcon style={styles.icon1} icon={faSun} size={200} />
          </Text>
        </View>
        <View>
          <Text style={styles.center}>
            Where in the world do you want weather for today? Please Enter the
            zipcode.
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="ZIPCODE"
            onChangeText={text => this.setState({setUserInput: text})}
            value={this.state.setUserInput}
          />
          <View>
          <TouchableOpacity
            style={styles.submitbutton}
            title="Submit"
            onPress={() => {
              this.props.navigation.navigate('HomeScreen', {
                user: this.state.setUserInput,
              });
            }}
            ><Text style={styles.textytaxi}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.konk}>
          <Text>
            <FontAwesomeIcon icon={faSnowflake} size={70} />
          </Text>
          <Text>
            <FontAwesomeIcon icon={faCloud} size={70} />
          </Text>
          <Text>
            <FontAwesomeIcon icon={faCloudRain} size={70} />
          </Text>
          <Text>
            <FontAwesomeIcon icon={faSun} size={70} />
          </Text>
        </View>
      </View>
    );
  }
}

export default Setting;

const styles = StyleSheet.create({
  input: {
    height: 80,
    position: 'relative',
    width: 180,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  home: {
    height: 700,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A3F5FF',
  },
  submitbutton: {
    borderRadius: 10,
    width: 205,
    height: 50,
    backgroundColor: 'black',
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
    fontSize: 28,
  },
  icon1: {},
  konk: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  sun: {
    paddingTop: 30, 
  },
  textytaxi: {
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
  },
});
