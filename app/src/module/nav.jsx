"use strict"
const React = require("react");
const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: "dark"
    };

  }

  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState();
  }

  componentWillMount() {
    LoginAction.isLogin();
  }


  handleClick = (e) => {
    if(e.key === 'out'){
      LoginAction.logOut();
      LoginAction.isLogin();
    }
  }



  render() {
    let {isLogin} = this.props,user;
    if(isLogin && isLogin.type == 1){
      user = isLogin.user.email;
      window._test_data = isLogin.user;
    }

    return <div className="w-categories">
      <Menu onClick={this.handleClick}

            theme={this.state.theme}
            mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/">首页</Link>
        </Menu.Item>
        <SubMenu title={<Link to="/user/account">
          <Icon type="appstore"/>记账
        </Link>}>
        </SubMenu>
        <SubMenu title={<Link to="/user/usermanager">
          <Icon type="appstore"/>管理
        </Link>}>
        </SubMenu>

        {isLogin && isLogin.type==1 ?
          <SubMenu className="li-personal"
                   title={
                     <Link to="/user/profile">
                       <Icon type="user"/>{user}
                     </Link>}>

            <Menu.Item key="personal">
              <Link to="/user/usermanager">
                <Icon type="user"/>个人中心
              </Link>
            </Menu.Item>
            <Menu.Item key="out">
              <Icon type="poweroff"/>退出登录</Menu.Item>
          </SubMenu>
          :
          <Menu.Item key="login" className="li-login">
            <Link to="/user/login">
              <Icon type="user"/>登录
            </Link>
          </Menu.Item>

        }
      </Menu>
      </div>;
    /**/
  }
}
module.exports = connectToStores(Nav);