import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"

//history 跟window.history不一样 是由react重新封装了下  作用是用来跳转路由用的

//location  获取地址信息的 包含参数 

//match 获取匹配到的路由信息

ReactDOM.render(<App/>, document.getElementById('root'));
