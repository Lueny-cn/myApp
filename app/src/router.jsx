"use strict"
//const Router = require("react-router/Router");
//const Route = require("react-router/Route");
require("./css/style.scss");
const React = require("react");
const {IndexRoute,Route,Router} = require("react-router");
const ReactDom = require("react-dom");
const createHashHistory = require( 'history/lib/createHashHistory');

const App = require("./app.jsx");
const Index = require("./js/index");
const personMsg = require("./js/personalMsg");
const Personal = require("./js/personal");
const Login = require("./js/login");
const Exam = require("./js/exam");
const Test = require("./js/test");
const Admin = require("./js/admin");

// const LoginAction = require('./action/loginAction');
// const LoginStore = require('./store/loginStore');
// const connectToStores = require("alt-utils/lib/connectToStores");


function requireLogin(nextState, replace){
    let data = window._test_data;
    let isLogin = !!data;

    if(!isLogin){
        if(window.__needReloadForLogin){
            // replace(null, nextState.location.pathname);
            window.location.reload();
        } else {
            replace({nextState: nextState}, '/login');
        }
    }
}

// function isLogin(nextState, replace){

    // let sUrl = 'http://localhost:3000/user/isLogin';
    // $.ajax({
    //     url: sUrl,
    //     type: 'get',
    //     dataType:"json",
    //     xhrFields: {withCredentials : true},
    //     crossDomain: true,
    //     success: (result)=> {
    //         if (result.type !==1 ){
    //             requireLogin(nextState, replace);
    //             return false;
    //         }
    //     },
    //     error: ()=> {
    //         requireLogin(nextState, replace);
    //         return false;
    //     }
    // });
//
// }


// onEnter={requireLogin}

let routes = <Router history={createHashHistory()}>
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="login" components={Login} />
        <Route path="personMsg" component={personMsg} onEnter={requireLogin}/>
        <Route path="exam" component={Exam}/>
        <Route path="test" component={Test}/>
        <Route path="personal" component={Personal} onEnter={requireLogin}/>
        <Route path="admin" component={Admin} onEnter={requireLogin}/>
    </Route>
</Router>;
ReactDom.render(routes,document.getElementById("App"));
