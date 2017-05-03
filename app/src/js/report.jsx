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

class Report extends React.Component {
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
	

			return <div className="f-page index">
					
					<Nav/>

							
			</div>;
	}
}

module.exports = connectToStores(Index);