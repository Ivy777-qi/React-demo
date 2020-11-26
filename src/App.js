import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import Home from './pages/home/Home'
import Search from './pages/search/Search'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/search' component={Search}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
