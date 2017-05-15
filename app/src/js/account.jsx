"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexStore = require("../store/indexStore");
const AccountAction = require('../action/accountAction');
const AccountStore = require("../store/accountStore")
const IndexItem = require("../subItem/indexItem");

import { Carousel, Table, Icon, Button, Tabs } from 'antd';
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
			}
	}

	static getStores() {
			return [IndexStore];
	}

	static getPropsFromStores() {
			return IndexStore.getState();
	}

	onChangeTabs(key) {
		console.log(key);
	}


	componentWillMount(){

    }

   

    componentWillUnmount(){
		
    }

    static getStores() {
        return [AccountStore];
    }

    static getPropsFromStores() {
        return AccountStore.getState();
    }

    setValue(key, value) {
        this.state[key] = value;
        this.setState(this.state);
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

			const columns2 = [{
					title: ' ',
					dataIndex: 'index',
					key: 'index',
					}, {
					title: '金额',
					dataIndex: 'money',
					key: 'money',
			}];

			const data2 = [{
					key: '1',
					index: '餐饮',
					money: 7.5
			}];



			const accountType = ["out", "income","debit","transfer"]

			const accountList = [{
				date: "2017-04-22",
				type: "餐饮饮食",
				money: "7",
				account: "我的钱包",
				detail: "广工暖男炒饭"
    		}, {
				date: "2017-04-21",
				type: "餐饮饮食",
				money: "12",
				account: "我的钱包",
				detail: "广工暖男炒饭 + 喝汤"
			}, {
				date: "2017-04-21",
				type: "餐饮饮食",
				money: "6",
				account: "我的钱包",
				detail: "早餐"
			}, {
				date: "2017-04-21",
				type: "交通",
				money: "6",
				account: "我的钱包",
				detail: "去大学城"
			}]

			return <div className="f-page index">
					
					<Nav/>

					<div className="main-box">
							<div className="sideleft account-form-box">
									<Tabs onChange={this.onChangeTabs.bind(this)} type="card">
											<TabPane tab="支出" key="1">
												<AccountForm 
													type={accountType[1]}
												/>
											</TabPane>
											<TabPane tab="收入" key="2">
												<AccountForm 
													type={accountType[2]}
												/>
											</TabPane>
											<TabPane tab="借入/借出" key="3">
												<AccountForm 
														type={accountType[3]}
													/>
											</TabPane>
											<TabPane tab="转账/提现" key="4">
												<AccountForm 
														type={accountType[4]}
													/>
											</TabPane>
									</Tabs>


									<div className="account-list">
										<h3>账目清单</h3>
										<ul className="clearfix account-tb account-tb-title">
											<li className="l1">时间</li>
											<li className="l2">类型</li>
											<li className="l3">金额</li>
											<li className="l4">账本</li>
											<li className="l5 gray" >备注</li>
										</ul>
										{
											accountList.map( (item,index) => {
											return  <AccountListItem key = {index}
																		accountItem = {item} 
														/>	
											})
										}
										
										<div className="account-list-bot">
											<div className="page">共 6 条记录 </div>
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