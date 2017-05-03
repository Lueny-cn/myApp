"use strict"
const React = require("react");
import {Form, Input, Button, Select, TreeSelect, DatePicker} from 'antd';
import moment from "moment"
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const $ = require("jquery");

const TreeType = require("../config/tyeeType")

class AccountListItem extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
          value: "餐饮饮食",
        };
  }
  onChangeWay(value) {
     onChange = (value) => {
      console.log(arguments);
      this.setState({ value });
    }
  }

  handleToggle(e) {
      console.log("target", e.target);
  }

  render() {

    let { accountItem } = this.props;
    console.info("accountItem===>", accountItem);

    return <div>
       <div className="account-list">
          <ul className="clearfix account-tb" onClick={this.handleToggle.bind(this)}>
            <li className="l1">{accountItem.date}</li>
            <li className="l2">{accountItem.type} </li>
            <li className="l3"><span className="green">{accountItem.money}</span></li>
            <li className="l4">{accountItem.account}</li>
            <li className="l5 gray" title="神仙水">{accountItem.detail}<span className="dropdowm"></span></li>
          </ul>
          <div className="list-edit-box">
            <a rel="" href="#" className="type-avatar" >
              <div className="uploadImg"></div>
            </a>
            <div className="list-box-content">
              <ul className="list-box-ul">
                <li className="list-box-li">
                  <label >金　　额</label>
                  <input type="text" value={accountItem.money} name="edit_money" className="account-money"></input>
                </li>
                <li className="list-box-li">
                  <Select defaultValue="我的钱包" calssName="account-select">
                    <Option value="mypocket">我的钱包</Option>
                    <Option value="alipay">支付宝</Option>
                  </Select>
                </li>
                <li className="list-box-li">
                  <TreeSelect
                    className="way-select"
                    defaultValue={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={TreeType}
                    treeDefaultExpandAll={false}
                    onChangeWay={this.onChangeWay.bind(this)}
                  />
                </li>

              </ul>
              <ul className="list-box-ul">
                <li className="list-box-li">
                  <label >说　　明</label>
                  <input type="text" value={accountItem.detail} name="edit_detail" className="detail-input"></input>
                </li>
              </ul>
              <ul className="list-box-ul">
                 <li className="list-box-li">
                  <label >时　　间</label>
                  <DatePicker className="account-date-select"
                  defaultValue={moment(accountItem.date,'YYYY-MM-DD')} />
                </li>
              </ul>
            </div>
            <div className="list-box-btn">
              <Button className="delete-account-item">删除</Button>
              <Button calssName="edit-save-account-item">保存</Button>
            </div>
          </div>
       </div>
    </div>
    
  }
}
module.exports = AccountListItem;