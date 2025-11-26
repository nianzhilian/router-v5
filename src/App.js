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

//阻止路由跳转

function Page1(){
  return (
    <div>
      page1
    </div>
  )
}

class Prompt extends React.Component{
  static defaultProps = {
    when:false,
    message:'有值是否允许跳转'
  }
  componentDidMount(){
    console.log('组件挂载完毕')
    this.handleBlock();
  }
  componentDidUpdate(){
    this.handleBlock();
  }
  handleBlock(){
    this.unBlock && this.unBlock()
    if(this.props.when){
      this.unBlock = this.props.history.block(this.props.message)
    }
  }
  componentWillUnmount(){
    console.log('组件将要卸载')
    this.unBlock && this.unBlock();
  }
  render(){
    return null;
  }
}

Prompt = withRouter(Prompt)

class Page2 extends React.Component{
  state = {
    val:''
  }
  constructor(props){
    super(props);
  }
  // handelBlock(val){
  //   //有值添加阻塞
  //   if(val){
  //     this.unBlock = this.props.history.block('文档有值确认要进行切换吗')
  //   }else{
  //     this.unBlock && this.unBlock();
  //   }
  // }
  // componentWillUnmount(){
  //   this.unBlock && this.unBlock();
  // }
  render(){
    return (
      <div>
        <Prompt when={this.state.val!=''} />
        <textarea value={this.state.val} onChange={(e)=>{
          this.setState({
            val:e.target.value
          })
          // this.handelBlock(e.target.value);
        }}>

        </textarea>
      </div>
    )
  }
}

function App(){
  return (
    <Router getUserConfirmation={(msg,cb)=>{
      cb(window.confirm(msg))
    }}>
      <nav>
        <NavLink to='/page1'>首页</NavLink>
        <NavLink to='/page2'>详情页</NavLink>
      </nav>
      {/* 5.x 按照组件的构造函数和类组件本身 去传 只有匹配到时才进行实例化的操作 */}
      {/* render 和 children 返回的都是jsx元素 */}
      {/* 6.x 只有一个element 属性 接收到的是 jsx元素 提前进行实例化，但是路由匹配不到时 不会渲染 */}
      <Route path='/page1' component={Page1}></Route>
      <Route path='/page2' component={Page2}></Route>
    </Router>
  )
}

export default App;
