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
//只运行一次模块不做任何的导入
import "./app.css";

//受保护的页面

const config = {
  isLogin: false,
  setLogin: function () {
    this.isLogin = true;
  },
};

function Login(props) {
  console.log(props);
  return (
    <div
      onClick={() => {
        config.setLogin();
        if (props.location.state) {
          props.history.push(props.location.state);
        }
      }}
    >
      登录
    </div>
  );
}

function Home() {
  return <div>首页</div>;
}

function User() {
  return <div>用户的主页面</div>;
}

function LoginRedirectWithCountdown({ targetPath }) {
  const [count, setcount] = useState(5);
  useEffect(() => {
    let timer = 0;
    if (count > 0) {
      timer = setTimeout(() => {
        setcount((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      console.log("组件销毁了");
      clearTimeout(timer);
    };
  }, [count]);
  return (
    <div style={{ lineHeight: "35px", marginTop: "20px" }}>
      您无权访问此页面请先登录之后再进行访问
      <p>
        倒计时<span style={{ fontSize: "20px", color: "red" }}>{count}s</span>
        即将跳转登录页
      </p>
      <NavLink
        to={{ pathname: "/login", state: targetPath }}
        style={{ color: "blue" }}
      >
        立即跳转
      </NavLink>
      {count == 0 && (
        <Redirect
          to={{
            pathname: "/login",
            state: targetPath,
          }}
        />
      )}
    </div>
  );
}

function PrototecdRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(values) => {
        console.log(values);
        //动态决定要渲染什么
        //和children的区别是：
        //children是不管匹配匹配不上 都渲染
        //render 只有匹配上才渲染  返回一个react节点
        //如果没登录直接跳转到登录界面登录成功会之后再回调到这个组件
        if (!config.isLogin) {
          return (
            <LoginRedirectWithCountdown targetPath={values.location.pathname} />
          );
          // return <Redirect to={{
          //   pathname:'/login',
          //   state:values.location.pathname
          // }} />
        }
        return <Component />;
      }}
    ></Route>
  );
}

function Nav() {
  return (
    <div className="nav">
      <NavLink to="/login">登录页</NavLink>
      <NavLink to="/admin">用户页面</NavLink>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/login" component={Login}></Route>
        <PrototecdRoute path="/admin" component={User}></PrototecdRoute>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
