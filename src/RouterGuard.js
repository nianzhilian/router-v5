import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route, Link,useHistory,useLocation } from 'react-router-dom'
let _prevLocation,_newLocation,_action,_unblock;
function GuardHelp(props){
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        //添加路由跳转阻塞
        let unblock = history.block((newLocation,ac)=>{
            _prevLocation = location;
            _newLocation = newLocation;
            _action = ac;
            _unblock = unblock;
            return '是否允许跳转'
        })
        //添加路由跳转监听
        let unhistory = history.listen((newLocation,ac)=>{
            console.log(newLocation,ac)
            if(props.onPageChange){
                props.onPageChange(location,newLocation,ac,unhistory)
            }
        })
        return () => {
            unhistory();
            unblock();
        };
    }, [history]);
    return null;
}

class RouterGuard extends React.Component{
    constructor(props){
        super(props);
    }
    handleConfirm = (msg,cb)=>{
        if(this.props.onBeforeChange){
            this.props.onBeforeChange(_prevLocation,_newLocation,_action,cb,_unblock,msg);
        }else{
            cb(true)
        }
    }
    render(){
        return (
            <Router getUserConfirmation={this.handleConfirm}>
                <GuardHelp onPageChange={this.props.onPageChange} />
                {this.props.children}
            </Router>
        )
    }
}

export default RouterGuard;