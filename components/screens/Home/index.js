import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import Today from '../../Today';
import Week from '../../Week';
import moment from 'moment';
import Setting from '../Setting';
import LinearGradient from 'react-native-linear-gradient';
export class Home extends Component {
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

  componentDidMount() {
    const nami = this.props.navigation.getParam('user');
    this.get5day(nami);
    this.getWeather(nami);
  }

  getWeather = async zip => {
    const apikey = '1d80f33d31919cc397f2bf782026d6c3';
    //let zip = this.state.setUserInput;
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

  get5day = async zip => {
    const apikey = '1d80f33d31919cc397f2bf782026d6c3';
    //let zip = this.state.setUserInput;
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
    const nami = this.props.navigation.getParam('user');
    console.log('hello', nami);
    return (
      <ScrollView>
        <LinearGradient start={{ x: 0, y: 0 }} colors={['rgba(75,208,173,1)', 'rgba(31,155,203,0.449438202247191)', 'rgba(210,230,47,1)']} style={styles.linearGradient}>
        <View style={styles.background}>
          <View>
            <Button style={styles.buttonback}
              onPress={() => this.props.navigation.navigate('SettingScreen')}
              title="Back to Zipcode Entry"
            />
          </View>
          <View style={styles.parentcontainer}>
            <View style={styles.section1}>
              <View style={styles.icon}>
                <Today dayInfo={dayInfo} />
              </View>
              <View style={styles.flexyglass} />
              <View>
                <Text style={styles.elephant}>
                  {this.state.temperature && (
                    <Text>{this.getTemp(temperature)}</Text>
                  )}
                  <Text style={styles.hot}>℉</Text>
                </Text>
                <Text style={styles.big}>Description: {dayInfo}</Text>
                <Text style={styles.big}>City: {city}</Text>
                <Text style={styles.big}>Country: {country}</Text>
              </View>
            </View>
            <View style={styles.candid}>
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
        </LinearGradient>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  section1: {
    height: 450,
  },
  flexyglass: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1,
  },
  big: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
  },
  parentcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  candid: {
    width: 400,
  },
  elephant: {
    justifyContent: 'center',
    fontSize: 100,
    textAlign: 'center',
  },
  hot: {
    fontSize: 40,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: 750,
  },
  buttonback: {
    justifyContent: 'flex-start',
  }
});
