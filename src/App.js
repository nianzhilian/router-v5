import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";
import configs from "./routerConfig";
//只运行一次模块不做任何的导入
import "./app.css";

//路由动态配置

// 首页    新闻
//         新闻首页  新闻列表  新闻详情



function Nav(){
  return (
    <nav className="nav">
      <NavLink exact to="/">首页</NavLink>
      <NavLink to="/news">新闻页</NavLink>
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

export default function App(){
  return (
    <Router>
      <Nav />
      {/* 匹配网站的顶级页面 */}
      <RootRoute />
    </Router>
  )
}
