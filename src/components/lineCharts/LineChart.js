import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { formateDate } from '../../utlis/date';
import { CONV_TEMP } from '../../utlis/constants';
import echarts from 'echarts/lib/echarts' //必须引入echarts插件
// 引入饼状图\线形图、柱状图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { Spin } from 'antd';


export default class LineChart extends Component {
  state = {
    days: [],
    minTemp: [],
    maxTemp: [],
    isloading: true
  }
  // componentWillMount() {
  //   this.getdata();
  // }
  // getdata = () => {
  //   const days = [];
  //   const minTemp = [];
  //   const maxTemp = [];
  //   const { forecastList } = this.props;
  //   forecastList && forecastList.map(item => {
  //     days.push(formateDate(item.dt));
  //     minTemp.push(parseInt(item.temp.min - CONV_TEMP));
  //     maxTemp.push(parseInt(item.temp.max - CONV_TEMP));

  //   })
  //   this.setState({
  //     days,
  //     minTemp,
  //     maxTemp,
  //     isloading: false
  //   })
  // }
  getOption = () => {
    const days = [];
    const minTemp = [];
    const maxTemp = [];
    const { forecastList } = this.props;
    forecastList && forecastList.map(item => {
      console.log();
      days.push(formateDate(item.dt));
      minTemp.push(parseInt(item.temp.min - CONV_TEMP));
      maxTemp.push(parseInt(item.temp.max - CONV_TEMP));

    })
    console.log(days, minTemp, maxTemp);
    const option = {
      title: {
        text: '7 DAY FORECAST',
        left: 'center',
        padding: 25,
        textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
          "color": "#fff",
          'fontSize': "20px",
          'fontWeight': '700',
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: days, //不能{}
        //设置坐标轴字体颜色和宽度
        axisLine: {
          lineStyle: {
            color: "#fff",
          }
        }
      },
      yAxis: {
        min: 5,
        max: 25,
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        },
        //设置坐标轴字体颜色和宽度
        axisLine: {
          lineStyle: {
            color: "#fff",
          }
        }

      },
      series: [
        {
          name: 'Highest',
          type: 'line',
          data: maxTemp,
        },
        {
          name: 'Lowest',
          type: 'line',
          data: minTemp,
        }
      ]
    };
    return option;
  };
  render() {
    return (

      <ReactEcharts
        option={this.getOption()}
        style={{ height: '40vh', width: '100%', paddingLeft: '20px' }}
      />
    )
  }
}