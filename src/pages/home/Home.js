import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CaretDownOutlined } from '@ant-design/icons';
import LineChart from '../../components/lineCharts/LineChart';
import Forecast from '../../components/forecast/Forecast';
import { reqweather, reqLocation, reqForecastweather } from '../../api/api';
import { CONV_TEMP, CONV_WIND, ICON_URL } from '../../utlis/constants';
import './style.css';

class Home extends Component {
  state = {
    city: '',
    temp: 0,
    weather: '',
    icon: '',
    wind: 0,
    humidity: 0,
    pressure: 0,
    feels_like: 0,
    weatherList: [],
    forecastList: [],
  }
  componentDidMount() {
    //Promise异步调用两个函数，前一个函数结束后执行另一个函数
    const city = this.props.location.state;
    if (city) {
      this.getWeather(city);
      this.getForecast(city);//7天预报
    } else {
      this.getLocation().then(() => {
        console.log(this.city);
        this.getWeather(this.city);
        this.getForecast(this.city);//7天预报
      })
    }

  }
  getLocation = async () => {
    const result = await reqLocation();
    this.city = result.city;
    return this.city;
  }
  getForecast = async (city) => {
    const result = await reqForecastweather(city);
    console.log(result);
    this.setState({
      weatherList: result.list.slice(1, 4),
      forecastList: result.list.slice(1, 8)
    })

  }
  getWeather = async (city) => {
    const result = await reqweather(city);
    console.log(result);
    this.setState({
      temp: (result.main.temp - CONV_TEMP).toFixed(1),//取到小数点后一位
      weather: result.weather[0].main,
      humidity: result.main.humidity,
      pressure: result.main.pressure,
      feels_like: (result.main.feels_like - CONV_TEMP).toFixed(1),
      icon: result.weather[0].icon,
      wind: (result.wind.speed * CONV_WIND).toFixed(0),//取整
    })
  }
  render() {
    console.log(111111111111);
    let city = this.props.location.state;
    if (city) {
      this.city = city;
    }
    const { temp, weather, icon, wind, humidity, pressure, feels_like, weatherList, forecastList } = this.state;
    return (
      <div className='homeWrapper'>
        <div className='city'>{this.city}
          <Link to="/search">
            <CaretDownOutlined />
          </Link>
        </div>
        <div className='temperature'>
          <div className='temp'>{temp}°C</div>
          <img src={ICON_URL + icon + ".png"} className='icon' alt='weather' />
          <span>{weather}</span><span> | </span>
          <span > Feels like: {feels_like}°C</span>
          <div className='extra'>
            <dl>
              <dt>Wind: {wind}km/h  |  Humidity: {humidity}%  |  pressure: {pressure}hPa</dt>
            </dl>
          </div>
        </div>
        <Forecast weatherList={weatherList} style={{ marginBottom: '15px', height: '20vh' }} />
        <LineChart forecastList={forecastList} />
      </div>
    )
  }
}

export default Home;