"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexStore = require("../store/indexStore");
const AccountAction = require('../action/accountAction');
const AccountStore = require("../store/accountStore")
const IndexItem = require("../subItem/indexItem");
const AccBookAction = require('../action/accBookAction');
const AccBookStore = require("../store/accBookStore");
const monent = require('moment');


import {Carousel, Table, Icon, Button, Tabs} from 'antd';
const AccountForm = require("../module/accountForm");
const AccountListItem = require("../module/accountListItem");
const TabPane = Tabs.TabPane;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      money: 0,
      time: "",
      avatar: "",
      detail: "",
      user_id: "",
      accountbook_id: "",
      accBooklist:[]
    }
    AccountAction.list();
    AccBookAction.list();
  }

  static getStores() {
    return [AccountStore, AccBookStore];
  }

  static getPropsFromStores() {
    return {
      ...AccountStore.getState(),
      ...AccBookStore.getState()
    }
  }

  onChangeTabs(key) {
    console.log(key);
  }


  componentWillMount() {
     AccBookStore.listen(this.getListener());
  }

  componentWillUnmount() {
      AccBookStore.unlisten(this.listener);
  }

  setValue(key, value) {
    this.state[key] = value;
    this.setState(this.state);
  }

  getListener() {
        return this.listener = (store) => {
            let accBook = store.accBook;
            if (accBook && accBook.length !== 0) {
               this.setState({
                 accBooklist:  accBook
               })
            }

        }
    }



  render() {
    let {account, accBook} = this.props;
    let {accBooklist} = this.state;
console.log("account ====>>> ",accBook)
console.log("account ====>>>,this.state ",this.state)
    const accountType = ["out", "income", "debit", "transfer"]

    return <div className="f-page index">

      <Nav/>

      <div className="main-box">
        <div className="sideleft account-form-box">
          <Tabs onChange={this.onChangeTabs.bind(this)} type="card">
            <TabPane tab="支出" key="0">
              <AccountForm
                type={accountType[0]}
                accBook={accBooklist}
              />
            </TabPane>
            <TabPane tab="收入" key="1">
              <AccountForm
                type={accountType[1]}
                accBook={accBooklist}
              />
            </TabPane>
            {
              false && <TabPane tab="借入/借出" key="2">
                <AccountForm
                  type={accountType[2]}
                  accBook={accBooklist}
                />
              </TabPane> &&
              <TabPane tab="转账/提现" key="3">
                <AccountForm
                  type={accountType[3]}
                  accBook={accBooklist}
                />
              </TabPane>
            }
          </Tabs>


          <div className="account-list">
            <h3>账目清单</h3>
            <ul className="clearfix account-tb account-tb-title">
              <li className="l1">时间</li>
              <li className="l2">类型</li>
              <li className="l3">金额</li>
              <li className="l4">账本</li>
              <li className="l5 gray">备注</li>
            </ul>
            {
              account && account.map((item, index) => {
                return <AccountListItem key={index}
                                        accountItem={item}
                                        onClick={() => {
                                          this.showDetail()
                                        }}
                />
              })
            }

            <div className="account-list-bot">
              <div className="page">共 6 条记录</div>
              支出总计：<span className="green">¥19131.50</span>收入总计：<span className="orange">¥3520.00</span>
            </div>
          </div>

        </div>
        <div className="sideright">

        </div>
      </div>

    </div>;
  }
}

module.exports = connectToStores(Account);