import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import { TransitionGroup,CSSTransition } from "react-transition-group";
import RouterGuard from "./RouterGuard";
//只运行一次模块不做任何的导入
import "./app.css";

//返回顶部三种实现方式
//高阶组件方式 自定义hook方式 路由守卫方式

//使用高阶组件使滚动条复位
function withScroll(Component){
  return class extends React.Component{
    constructor(props){
      super(props)
    }
    componentDidMount(){
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }
    render(){
      return (
        <Component {...this.props} />
      )
    }
  }
}

//使用自定义hook使滚动条复位
function useScroll(pathname){
  useEffect(() => {
    window.scrollTo({
        top:0,
        behavior:'smooth'
      })
  }, [pathname]);
}

function Home(props) {
  return <div className="page  home">这是首页</div>;
}

function Admin(props) {
  return <div className="page  admin">这是登录页</div>;
}

// Home = withScroll(Home);
// Admin = withScroll(Admin)

function Nav() {
  return (
    <div className="header">
      <nav className="nav">
        <NavLink to={{ pathname: "/" }} exact>
          首页
        </NavLink>
        <NavLink to={{ pathname: "/login" }} exact>
          登录页
        </NavLink>
      </nav>
    </div>
  );
}

//使用TransitionGroup  包括住Switch路由器
// 使用CSSTransition 包括住路由
class Animated extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <TransitionGroup className='transition-group'>
        <CSSTransition key={this.props.location.pathname} timeout={300} classNames='css-transition' unmountOnExit>
          {/* 这样写法 动画样式加载到switch上 没加载到div元素上 */}
          <Switch location={this.props.location}>
            <Route path="/login" component={Admin}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

Animated = withRouter(Animated);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <RouterGuard onBeforeChange={(prevLocation,newLocation,ac,cb,unblock,msg) => {
          console.log(`路由从${prevLocation.pathname}跳转到${newLocation.pathname},跳转方式：${ac},允许跳转`);
          cb(window.confirm(msg))
          //只阻塞一次后面不在阻塞
          //unblock();
        }} onPageChange={(prevLocation,newLocation,ac,unhistory) => {
          console.log(`日志2：路由从${prevLocation.pathname}跳转到${newLocation.pathname},跳转方式：${ac}`)

          //路由变化 使滚动条复位
          window.scrollTo({
            top:0,
            behavior:'smooth'
          })

          //仅仅监听一次
          //unhistory();
        }}>
          <div className="main">
            <Nav />
            <Animated />
          </div>
        </RouterGuard>
      </>
    );
  }
}

export default App;
