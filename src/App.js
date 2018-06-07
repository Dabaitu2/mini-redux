import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './MyOwnRedux/learn-redux'
import Demo from "./MyOwnRedux/context.demo";
import {connect} from "./MyOwnRedux/small-react-redux";
import {addOne, addOneAsync, subOne} from "./MyOwnRedux/learn-redux";
import {createSelector} from 'reselect';

// 装饰器的用法实际上是把装饰器下方的那个类作为高阶组件的WrapComponent
// 使用reselect可以对state进行快速运算

const numSelector = createSelector(
    state=>state,
    // 这个参数是第一个的返回值
    state=>({num:state*2})
);
@connect(
    state => numSelector(state),
    {addOne, subOne, addOneAsync}
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DEMO FOR MINI-REDUX</h1>
        </header>
          <Demo />
          <div>现在有机枪{this.props.num}</div>
        <button onClick={this.props.addOne}>PLUS ONE</button>
        <button onClick={this.props.subOne}>SUB ONE</button>
        <button onClick={this.props.addOneAsync}>ASYNC PLUS</button>
      </div>
    );
  }
}

export default App;
