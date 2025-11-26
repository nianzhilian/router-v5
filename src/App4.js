import React, { Component } from 'react'
//首次渲染
//CompA 新建

//更新渲染
//分三步：1、创建新的节点 2、卸载掉旧的节点  3、挂载新的节点

//CompA 卸载
//CompA 新建

class CompA extends Component {

    componentDidMount() {
        console.log("CompA 新建")
    }

    componentWillUnmount() {
        console.log("CompA 卸载")
    }


    render() {
        return <h1>CompA</h1>
    }
}

export default class App extends Component {
    state = {
        visbile: true
    }
    render() {
        return (
            <div>
                <CompA key={Math.random()} />
                <button onClick={()=>{
                    this.setState({})
                }}>点击更新</button>
            </div>
        )
    }
}

