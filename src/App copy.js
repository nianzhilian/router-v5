import React, { useDeferredValue } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//只运行一次该模块不做任何的导入
import './app.css'

//路由跳转1  history.push() 方法

function A(props){
  console.log(props)
  return (
    <div>
      页面a
      <button onClick={()=>{
        props.history.push('/b',{
          name:'张三',
          age:25,
          desc:'排序'
        })
      }}>跳转b</button>
    </div>
  )
}

function B(props){
  console.log(props)
  return (
    <div>
      页面b
      <button onClick={()=>{
        props.history.push('/a')
      }}>跳转a</button>
    </div>
  )
}

function Notfound(){
  return (
    <div>
      404页面
    </div>
  )
}

export default class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Router>
        <Switch>
          <Route path='/a' component={A}></Route>
          <Route path='/b' component={B}></Route>
          <Route component={Notfound}></Route>
        </Switch>
      </Router>
    )
  }
}

