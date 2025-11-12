
import React from 'react'
import { BrowserRouter as Router, Route,NavLink } from 'react-router-dom'

function Home(){
  return (
    <div>
      首页
    </div>
  )
}

function News(props){
  return (
    <div>
        <nav className="nav">
            <NavLink to="/news/">新闻首页</NavLink>
            <NavLink to="/news/list">新闻列表</NavLink>
            <NavLink to="/news/detail">新闻详情</NavLink>
        </nav>
      {
        props.children
      }
    </div>
  )
}

function NewsHome(props){
    console.log(props)
    return (
        <div>
            这是新闻首页
        </div>
    )
}

function NewsList(){
    return (
        <div>
            这是新闻列表
        </div>
    )
}

function NewDetail(){
    return (
        <div>
            这是新闻详情页
        </div>
    )
}

const configs = [
    {
        path:'/news',
        component:News,
        children:[
            {
                path:'/',
                component:NewsHome,
                exact:true,
            },
            {
                path:'/list',
                component:NewsList,
                exact:true,
            },
            {
                path:'/detail',
                component:NewDetail,
                exact:true
            }
        ]
    },
    {
        path:'/',
        component:Home,
    }
]

export default configs;