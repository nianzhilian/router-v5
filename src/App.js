import React, { useDeferredValue } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import qs from "query-string";
//只运行一次该模块不做任何的导入
import './app.css'

//路由跳转2  history.replace() 方法

function A(props){
  console.log(props.history.location == props.location)
  return (
    <div>
      页面a
      <button onClick={()=>{
        // 注：虽然地址有参数  但匹配规则是按照路径去匹配的 不包括hash 和 参数 也不包括前面的域名 协议等信息
        props.history.replace('/b?name=1&age=2',{
          name:'张三',
          age:25,
          desc:'排序'
        })
      }}>跳转b</button>
    </div>
  )
}

function B({history,location}){
  const qsobj = qs.parse(location.search)
  console.log(location)
  return (
    <div>
      页面b
      <p>
        接收到的信息name:{qsobj.name}--年龄：{qsobj.age}
      </p>
      <button onClick={()=>{
        history.replace('/a')
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
          <Route path='/a' exact component={A}></Route>
          <Route path='/b' exact component={B}></Route>
          <Route component={Notfound}></Route>
        </Switch>
      </Router>
    )
  }
}

