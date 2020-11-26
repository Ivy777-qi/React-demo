import { message } from 'antd';
import axios from "axios";

//获得定位
//https://ipstack.com/quickstart
export const reqLocation = () => {
  var ip = window.sessionStorage.getItem('ip');
  return new Promise((resolve, reject) => {
    axios({
      "method": "GET",
      "url": `http://api.ipstack.com/${ip}?access_key=8f412b53219c9bcf5c886dd6a4197f00`,
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.data.message);
      }
    })
      .catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      }).catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      })
  })
}
//获得weather和图标
//https://rapidapi.com/community/api/open-weather-map/endpoints
export const reqweather = (city) => {
  return new Promise((resolve, reject) => {

    axios({
      "method": "GET",
      "url": "https://community-open-weather-map.p.rapidapi.com/weather",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "8d050a1c2cmshca8ecbc3e9644d1p108fffjsn0cebef399b2f"
      }, "params": {
        "q": city + ",nz"
      }
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.data.message);
      }
    })
      .catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      }).catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      })
  })
}
//获得weather和图标
//https://rapidapi.com/community/api/open-weather-map/endpoints
export const reqForecastweather = (city) => {
  return new Promise((resolve, reject) => {

    axios({
      "method": "GET",
      "url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "8d050a1c2cmshca8ecbc3e9644d1p108fffjsn0cebef399b2f"
      }, "params": {
        "q": city + ",nz",
        cnt: '8'
      }
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response.data.message);
      }
    })
      .catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      }).catch(error => {
        // reject(error)
        message.error('error: ' + error.message)
      })
  })
}