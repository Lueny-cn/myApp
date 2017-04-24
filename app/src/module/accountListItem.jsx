"use strict"
const React = require("react");
import {Form, Input, Button, Select, TreeSelect, DatePicker} from 'antd';
import moment from "moment"
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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


  render() {

    let { accountItem } = this.props;
    console.info("accountItem===>", accountItem);

    //Todo:  独立出来
    const treeData = [{
      label: '基本生活',
      value: '0-0',
      key: '0-0',
      children: [{
        label: '餐饮饮食',
        value: '0-0-1',
        key: '0-0-1',
      }, {
        label: '水果零食',
        value: '0-0-2',
        key: '0-0-2',
      }, {
        label: '日常用品',
        value: '0-0-3',
        key: '0-0-3',
      }, {
        label: '柴米油盐',
        value: '0-0-4',
        key: '0-0-4',
      }, {
        label: '物业水电',
        value: '0-0-5',
        key: '0-0-5',
      }, {
        label: '医药保健',
        value: '0-0-6',
        key: '0-0-6',
      }],
      }, {
        label: '交通通讯',
        value: '0-1',
        key: '0-1',
        children: [{
          label: '交通费',
          value: '0-1-1',
          key: '0-1-1',
      }, {
          label: '话费网费',
          value: '0-1-2',
          key: '0-1-2',
      },{
         label: '养车费',
         value: '0-1-3',
         key: '0-1-3',
      }],
      }, {
        label: '文化娱乐',
        value: '0-2',
        key: '0-2',
        children: [{
          label: '旅游娱乐',
          value: '0-2-1',
          key: '0-2-1',
      }, {
          label: '博乐彩票',
          value: '0-2-2',
          key: '0-2-2',
      },{
         label: '书籍音像',
         value: '0-2-3',
         key: '0-2-3',
      },{
         label: '数码产品',
         value: '0-2-4',
         key: '0-2-4',
      },{
         label: '教育培训',
         value: '0-2-5',
         key: '0-2-5',
      }],
      },{
        label: '美容装扮',
        value: '0-3',
        key: '0-3',
        children: [{
          label: '服饰装扮',
          value: '0-3-1',
          key: '0-3-1',
      },{
          label: '化妆品美容',
          value: '0-3-2',
          key: '0-3-2',
      }],
      },{
        label: '人情往来',
        value: '0-4',
        key: '0-4',
        children: [{
          label: '人际往来',
          value: '0-4-1',
          key: '0-4-1',
      },{
          label: '礼品礼金',
          value: '0-4-2',
          key: '0-4-2',
      },{
          label: '孝敬长辈',
          value: '0-4-3',
          key: '0-4-3',
      }],
      },{
        label: '其他',
        value: '0-5',
        key: '0-5',
        children: [{
          label: '房产车产',
          value: '0-5-1',
          key: '0-5-1',
      },{
          label: '投资亏损',
          value: '0-5-2',
          key: '0-5-2',
      },{
          label: '电器家居',
          value: '0-5-3',
          key: '0-5-3',
      },{
          label: '其它杂项',
          value: '0-5-4',
          key: '0-5-4',
      }]
    }];

    return <div>
       <div className="account-list">
          <ul className="clearfix account-tb">
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
                    treeData={treeData}
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