import React, { useDeferredValue } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Coma() {
  return <div>这是组件a</div>;
}

function Comb() {
  return (
    <>
    <div>这是组件b</div>
    <Route path="/a/b/c" component={Comd}></Route>
    </>
  )
}

function Comc() {
  return (
    <>
        <div>404未找到页面</div>
        {/* 只要被渲染到dom中  其路径就会参与匹配  与他在哪个组件里面无关 */}
        <Route path="/a/b/c" exact component={Comd}></Route>
    </>
  );
}

function Comd() {
  return <div>组件d</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/a" exact component={Coma}></Route>
          <Route path="/a/b" exact component={Comb}></Route>
          {/* 接收的是组件的类型 不是react的元素 */}
          <Route component={Comc}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
