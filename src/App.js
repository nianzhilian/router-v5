import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";
import BatterLink from "./BatterLink";
import configs from "./routerConfig";
//只运行一次模块不做任何的导入
import "./app.css";

//路由动态配置

// 首页    新闻
//         新闻首页  新闻列表  新闻详情

function Nav(){
  return (
    <nav className="nav">
      <BatterLink exact to={{name:'home'}}>首页</BatterLink>
      <BatterLink to={{name:'news'}}>新闻页</BatterLink>
    </nav>
  )
}

function getConfigs(routes,url){
  if(!Array.isArray(routes)){
    return null;
  }
  let purl = url || '';
  const rs = routes.map((rt,i)=>{
      let baseUrl = purl + rt.path;
      const {name,component:Component,children,...rest} = rt;
      console.log(baseUrl)
      // render 动态决定渲染什么
      return (
          <Route key={i} {...rest} path={baseUrl} render={
            (values)=>{
              return <Component {...values} >
                {getConfigs(rt.children,baseUrl)}
              </Component>
            }
          }>
          </Route>
      )
  })
  console.log(rs)
  return (
    <Switch>
      {
        rs
      }
    </Switch>
  );
}

function RootRoute(props){
  return (
    <>
    {getConfigs(configs)}
    </>
  )
}

class ErrorBoundary extends React.Component{
  state = {
    hasError:false
  }
  //从错误信息中获取状态
  static getDerivedStateFromError(){
    return {
      hasError:true
    }
  }
  constructor(props){
    super(props);
  }
  componentDidCatch(error){
    console.error(error)
  }
  render(){
    if(this.state.hasError){
      return (
        <div>加载组件发生错误请重试</div>
      )
    }
    return this.props.children
  }
}

export default function App(){
  return (
    <Router>
      <Nav />
      {/* 匹配网站的顶级页面 */}
      <ErrorBoundary>
        <React.Suspense fallback={<div style={{textAlign:'center',marginTop:'50px'}}>正在加载中请稍后</div>}>
          <RootRoute />
        </React.Suspense>
      </ErrorBoundary>
    </Router>
  )
}
