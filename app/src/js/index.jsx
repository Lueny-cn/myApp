"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");


const IndexItem = require("../subItem/indexItem");

import { Carousel, Table, Icon, Button } from 'antd';



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getStores() {
        return [IndexStore];
    }

    static getPropsFromStores() {
        return IndexStore.getState();
    }



    render() {
        let state = this.state,
            title = '';
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
            week: 32,
            month: 60,
            year: 6000
            }, {
            key: '2',
            index: '支出',
            week: 600,
            month: 3000,
            year: 6000
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

        const data1 = [{
            key: '1',
            index: '支付宝',
            money: 6000
        }];
        return <div className="f-page index">
            
            <Nav/>

            <div className="main-box">
                <div className="sideleft">
                 <div className="topbar-title tb" >
                    <span className="titright">本月预算支出<strong>￥0</strong>元， 已经支出<strong>￥7.50</strong>元    
                        <a href="/user/budget" class="btn_yu" hidefocus="ture">建立预算</a>
                    </span>
                    <h3>收支情况</h3>
                </div>
                <Table columns={columns} dataSource={data} pagination={false} />

                <div className="topbar-title tb" >
                    <span className="titright">
                        <a href="/user/budget" class="btn_yu" hidefocus="ture">详细报表</a>
                    </span>
                    <h3>消费比例</h3>
                </div>
                <Table columns={columns1} dataSource={data1} pagination={false} />
            </div>

            <div className="sidelright">
                <Button className="lg-button addAccont" type="primary" icon="add" size="large">记一笔</Button>
                <div className="myaccountBox">
                    <div className="myaccount-title">
                        我的账户
                        <a href="">
                            <Icon type="setting" />
                        </a>
                    </div>
                    <Table columns={columns1} dataSource={data1} pagination={false} />
                    <Button type="default" icon="plus" className="add-account-btn"></Button>
                </div>
            </div>
            </div>
               




        </div>;
    }
}

module.exports = connectToStores(Index);