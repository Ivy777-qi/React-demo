import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import { formateDate } from '../../utlis/date';
import { CONV_TEMP, ICON_URL } from '../../utlis/constants';



export default class Forecast extends Component {
  state = {
    isloading: true
  }
  getWeather = () => {
    const { weatherList } = this.props;
    console.log(weatherList);
    return (
      weatherList && weatherList.map(item => {
        return (
          <Col className="gutter-row" span={8} key={item.dt}>
            <div>
              <div className='date'>{formateDate(item.dt)}</div>
              <img src={ICON_URL + item.weather[0].icon + ".png"} className='icons' /><br></br>
              <span>{(item.temp.min - CONV_TEMP).toFixed(0)}°C</span>
              <span> - </span>
              <span>{(item.temp.max - CONV_TEMP).toFixed(0)}°C</span>
              <div>{item.weather[0].main}</div>
            </div>
          </Col>
        )
      })
    )


  }

  render() {
    if (this.props.weatherList.length !== 0) { //空值的时候处理渲染
      if (this.state.isloading) {
        this.setState({ isloading: false });
      }
    }
    return (
      <>
        {
          this.state.isloading ? <Spin /> : <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {this.getWeather()}
          </Row>
        }
      </>
    )
  }
}
