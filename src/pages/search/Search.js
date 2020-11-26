import React from 'react';
import { Select, Row, Col } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { History_NUM } from '../../utlis/constants';

import axios from "axios";
import './style.css';


const { Option } = Select;
let timeout;
let history = [];
const style = { background: 'rgb(192, 191, 191)', margin: '10px 3px', padding: '5px 0', textAlign: 'center' };
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  function data() {
    axios('/city/cityList.json')
      .then(res => {
        if (res.status === 200) {
          var arr = []
          arr = res.data.citys.filter((item) => (
            item.citysName.includes(value) || item.citysName.toLowerCase().includes(value)
          ))
          console.log(arr);
          callback(arr.slice(0, 10))
        }
      })
  }
  timeout = setTimeout(data, 300);
}
class Search extends React.Component {
  state = {
    data: [],
    value: undefined,
    hotList: [],
  };
  componentDidMount() {
    this.initHotCity();
  }
  initHotCity = () => {
    axios('/city/hotCity.json')
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ hotList: res.data.hotList })
        }
      })
  }
  handleSearch = value => {
    console.log(value);
    if (value) {
      fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
    console.log(this.state.data);
  };

  handleChange = value => {
    this.state.data.map(item => {
      console.log(item.id);
      console.log(Number(value));
      if (item.id === Number(value)) {
        const city = item.citysName.split(',')[0]
        console.log(city);
        this.handleHistory(city);
        this.setState({ data: [] });
        return;
      }
    })
    //this.setState({ value });
  };
  handleClose = () => {
    this.setState({ value: undefined });
  }
  handleHistory = (city) => {
    if (history.length === 0) {

      history.push(city);
    } else if (history.length < History_NUM) {
      history = JSON.parse(localStorage.getItem('history'));
      for (var key in history) {
        console.log(city);
        if (city === history[key]) { //筛查重复city
          this.props.history.push('/', city);
          return;
        }
      }
      history.push(city);
    } else {
      let arr = [];
      for (var key in history) {
        arr[key] = history[key];
        if (city === history[key]) { //筛查重复city
          this.props.history.push('/', city);
          return;
        }
      }
      arr.push(city); //不超过10个并进行循环
      for (let i = 0; i < History_NUM; i++) {
        history[i] = arr[i + 1];//删除第一个
      }
    }
    console.log(history);
    localStorage.setItem('history', JSON.stringify(history));
    this.props.history.push('/', city);

  }

  getHotcity = () => {
    console.log(1312313134214324);
    const { hotList } = this.state;
    console.log(hotList);
    return (
      hotList && hotList.map(city => {
        return (
          <Col className="gutter-row" span={8} key={city}>
            <div style={style} onClick={() => this.handleHistory(city)}>{city}</div>
          </Col>
        )
      })
    )
  }
  getHistory = () => {
    let arr = [];
    console.log(history);
    this.list = history;
    const num = this.list.length;
    for (let j = 0; j < num; j++) {
      arr.push(j);
    }
    //特地设置arr来进行map循环来赋值,for循环不行,localStorage返回的是对象,不能循环
    return (
      arr.map(i => {
        return (
          <Col className="gutter-row" span={8} key={i}>
            <div style={style} onClick={() => this.handleHistory(this.list[i])}>{this.list[i]}</div>
          </Col>
        )
      })
    )


  }

  render() {
    const options = this.state.data.map(d => <Option key={d.id}>{d.citysName}</Option>);

    return (

      <div className='searchWrapper'>
        <div className='search'>
          <Select
            showSearch
            value={this.state.value}
            placeholder='Find a city'
            style={{ width: '98%', borderBottom: '1px solid #172344' }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={null}
            bordered={false}
          >
            {options}
          </Select>
          <SearchOutlined className='icon' />
          <CloseOutlined className='close' onClick={this.handleClose} />
        </div>
        <div className='hotCity'>
          <div className='title'>Hot Cities</div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
              this.getHotcity()
            }
          </Row>
        </div>
        <div className='history'>
          <div className='title'>Recent searches</div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {
              this.getHistory()
            }
          </Row>
        </div>
      </div>

    )
  }
}
export default Search;