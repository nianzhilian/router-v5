import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  withRouter,
  useHistory
} from "react-router-dom";

//只运行一次模块不做任何的导入
import "./app.css";

//路由导航守卫


function Home(){
  return (
    <div className="page home">
      这是首页
    </div>
  )
}

function Admin(){
  return (
    <div className="page admin">
      这是登录页
    </div>
  )
}

function Nav(){
  return (
    <div className="header">
      <nav className="nav">
        <NavLink to={{pathname:'/'}} exact>首页</NavLink>
        <NavLink to={{pathname:'/login'}} exact>登录页</NavLink>
      </nav>
    </div>
  )
}

class RouterGuard extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
    //添加路由跳转监听器
    //返回的是取消监听的函数
    // newLocation 将要跳转的location    POP移动指针  PUSH 新增条目
    //只是做监听跳转 不做管理是否能够跳转的控制
    this.unlisten = this.props.history.listen((newLocation,action)=>{
      if(this.props.onPageChange){
        this.props.onPageChange(this.props.location,newLocation,action);
      }
    })

    //只能添加一个阻塞
    //添加阻塞 是否能够跳转 返回一个取消阻塞的函数
    //回调参数跟listen一样
    this.unblock = this.props.history.block((newLocation,ac)=>{
      console.log(newLocation,ac);
      return '是否允许跳转';
    })
  }
  componentWillUnmount(){
    //取消监听
    this.unlisten();
    //取消阻塞
    this.unblock();
  }
  render(){
    console.log(this.props)
    return <>
    {this.props.children}
    </>
  }
}

RouterGuard = withRouter(RouterGuard);


function Test(props){
  let history = useHistory();
  console.log(history)
  return <>
    <div>
      张三李四
    </div>
  </>
}

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <>
        <Router getUserConfirmation={(msg,cb)=>{
          console.log(msg,cb)
          cb(window.confirm(msg))
        }}>
          <RouterGuard onPageChange={(prevLocation,newLocation,action)=>{
            console.log(`页面从${prevLocation.pathname}跳转到${newLocation.pathname},其行为:${action}`)
          }}>
            <div className="main">
              <Nav />
              <Switch>
                <Route path="/login" component={Admin}></Route>
                <Route path="/" component={Home}></Route>
              </Switch>
            </div>
          </RouterGuard>
        </Router>
      </>
      
    )
  }
}

export default App;

