"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const AccBookAction = require('../action/accBookAction');
const AccBookStore = require("../store/accBookStore")

// const AccountStore = require("../store/accountStore")



const IndexItem = require("../subItem/indexItem");

import { Carousel, Table, Icon, Button } from 'antd';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    IndexAction.getConsumState();
    AccBookAction.loadList();
  }

  static getStores() {
    return [IndexStore, AccBookStore];
  }

  static getPropsFromStores() {
    return {
      ...IndexStore.getState(),
      ...AccBookStore.getState()
    }
  }

  componentWillMount() {
    
  }


  render() {
    let {result, accBook} = this.props;
    console.log("result   ---",result )
     console.log("accBook   --- index",accBook )
    let state = this.state,
      title = '';
    if (!result) {
      return null;
    }
    let income = result.income, out = result.out;
    const columns = [{
      title: ' ',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '本周',
      dataIndex: 'week',
      key: 'week',
    }, {
      title: '本月',
      dataIndex: 'month',
      key: 'month',
    }, {
      title: '本年',
      dataIndex: 'year',
      key: 'year',
    }];

    const data = [{
      key: '1',
      index: '收入',
      week: income.week,
      month: income.month,
      year: income.year
    }, {
      key: '2',
      index: '支出',
      week: out.week,
      month: out.month,
      year: out.year
    }];


    const columns1 = [{
      title: ' ',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '余额',
      dataIndex: 'money',
      key: 'money',
    }];
    //TODO： 需要转化数据
    const accbookData = [{
      key: '1',
      index: accBook[0].name,
      money: accBook[0].money
    }];
    return <div className="f-page index">

      <Nav />

      <div className="main-box">
        <div className="sideleft">
          <div className="topbar-title tb" >
            <span className="titright">本月预算支出<strong>￥0</strong>元， 已经支出<strong>￥7.50</strong>元
                        <Link to="/user/budget" className="btn_yu">
                建立预算
                        </Link>
            </span>
            <h3>收支情况</h3>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />

          <div className="topbar-title tb" >
            <span className="titright">
              <a href="/user/budget" className="btn_yu" hidefocus="ture">详细报表</a>
            </span>
            <h3>消费比例</h3>
          </div>
          <Table columns={columns1} dataSource={accbookData} pagination={false} />
        </div>

        <div className="sidelright">
          <Link to="/user/account">
            <Button className="lg-button addAccont" type="primary" icon="add" size="large">记一笔</Button>
          </Link>
          <div className="myaccountBox">
            <div className="myaccount-title">
              我的账本
                        <a href="">
                <Icon type="setting" />
              </a>
            </div>
            <Table columns={columns1} dataSource={accbookData} pagination={false} />
            <Button type="default" icon="plus" className="add-account-btn"></Button>
          </div>
        </div>
      </div>





    </div>;
  }
}

module.exports = connectToStores(Index);