"use strict"
const React = require("react");
import {Form, Input, Button, Select, TreeSelect, DatePicker, Cascader} from 'antd';
import moment from "moment"
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const $ = require("jquery");
const TreeType = require("../config/tyeeType");
const monent = require('moment');

class AccountListItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: "餐饮饮食",
			accountDetail:false,
			isIncome: true,
			isOut: false,
			editMoney: 0,
			editAccount:"我的钱包",
			editType: "",
			editDetail: "",
			editTime: ""
			
		};
	}
	onChangeWay(value) {
		onChange = (value) => {
		// console.log(arguments);
		this.setState({ editType: value });
		}
	}

	handleToggle(e) {
		// console.log("target", e.target);
	}

	showDetail() {
	let detail = this.state.accountDetail;
	this.setState({accountDetail:!detail});
	}

	onClinkChange() {
		// console.log("(.............)", document.querySelector(".ant-input"));
	}
	componentWillMount() {
		let {accountItem, accBook} = this.props;
			// console.log("componentWillMount  this.props",this.props )

		this.setState({
			isIncome: accountItem.account_type === "income",
			isOut:  accountItem.account_type  === "out",
			editMoney: accountItem.money,
			editAccount:accountItem.accountbook_name,
			editType: accountItem.type,
			editDetail: accountItem.detail,
			editTime: accountItem.time
		})

	}

	onChangeMyAccount(value) {
		// console.log("onChangeMyAccount ", value)
	}
	onChangeMoney(value) {
		// console.log("onChangeMoney ", value)
	}
	onChangeDetail(value) {
		// console.log("onChangeDetail ", value)
	}
	onChangeTime(value) {
		// console.log("onChangeTime ", value)
	}
	onChangeType(value) {
		// console.log("onChangeType ", value)
	}

	render() {

	let { accountItem, editMoney,
		  editAccount,
		  editType,
		  editDetail,
		  editTime} = this.props;
	let detail = this.state.accountDetail;
	const displayRender = (labels, selectedOptions) => labels.map((label, i) => {
			const option = selectedOptions[i];
			if (i === labels.length - 1) {
				return (
				<span key={option.value}>
					{label}
				</span>
				);
			}
		});

	let typeList = accountItem.type.split(",");
	// console.log("accountItem     ", accountItem);
	
    return <div>
       <div className="account-edit" >
          <ul className="clearfix account-tb" onClick={()=>{this.showDetail()}}>
            <li className="l1">{moment(accountItem.time).format('YYYY-MM-DD')}</li>
            <li className="l2">{typeList[typeList.length -1]} </li>
            <li className="l3"><span className="green">{accountItem.money}</span></li>
            <li className="l4">{accountItem.accountbook_name}</li>
            <li className="l5 gray">{accountItem.detail}<span className="dropdowm"></span></li>
          </ul>

         {detail &&
         <div className="list-edit-box">
           <a href="#" className="type-avatar" >
             <div className="uploadImg"></div>
           </a>
           <div className="list-box-content">
             <ul className="list-box-ul">
               <li className="list-box-li">
                 <label >金　　额</label>
                 <input type="text" 
				 	value={editMoney}
					name="edit_money" 
					className="account-money edit-data"
					onChange={this.onChangeMoney.bind(this,editMoney)}></input>
               </li>
               <li className="list-box-li">
                 <Select defaultValue={editAccount}  
				 	calssName="account-select edit-data"
				 	onChange= {this.onChangeMyAccount.bind(this,editAccount)}
				 >
                   <Option value="我的钱包">我的钱包</Option>
                   <Option value="支付宝">支付宝</Option>
                 </Select>
               </li>
               <li className="list-box-li">
			   	   {	this.state.isIncome &&
						<Select defaultValue={editType} 
							onChange={this.onChangeType.bind(this,editType)}
							className="edit-data">
							<Option value="工资">工资</Option>
							<Option value="奖金">奖金</Option>
							<Option value="other">其它收入</Option>
                        </Select>
					}
					{	this.state.isOut &&
						 <Cascader defaultValue={typeList}
							options={TreeType}
							displayRender={displayRender}
							style={{ width: 290 }}
							onChange={this.onChangeType.bind(this,typeList)}
						/>	
					}
               </li>

             </ul>
             <ul className="list-box-ul">
               <li className="list-box-li">
                 <label >说　　明</label>
                 <input type="text" 
				 	value={editDetail} 
					 name="edit_detail" 
					 className="detail-input edit-data"
					 onChange={this.onChangeDetail.bind(this,editDetail)}></input>
               </li>
             </ul>
             <ul className="list-box-ul">
               <li className="list-box-li">
                 <label >时　　间</label>
                 <DatePicker className="account-date-select edit-data"
                             defaultValue={moment(editTime,'YYYY-MM-DD')} 
							 onChange={this.onChangeTime.bind(this,moment(editTime,'YYYY-MM-DD'))}/>
               </li>
             </ul>
           </div>
           <div className="list-box-btn">
             <Button className="delete-account-item">删除</Button>
             <Button calssName="edit-save-account-item" onClick={this.onClinkChange.bind(this)}>保存</Button>
           </div>
         </div>
         }

       </div>
    </div>
    
  }
}
module.exports = AccountListItem;