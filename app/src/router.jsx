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
const Login = require("./js/login");
// const Profile = require("./js/");
const Account = require("./js/account");
const Report = require("./js/report");
const Budget = require("./js/budget");
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
            replace({nextState: nextState}, '/user/login');
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
        <Route path="user/login" component={Login} />
        {/*<Route path="user/profile" componen={Profile} />*/}
        <Route path="user/account" component={Account} onEnter={requireLogin}/>
        <Route path="user/report" component={Report} onEnter={requireLogin}/>
        <Route path="user/budget" component={Budget} onEnter={requireLogin}/>
    </Route>
</Router>;
ReactDom.render(routes,document.getElementById("App"));
