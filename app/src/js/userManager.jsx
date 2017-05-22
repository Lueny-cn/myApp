"use strict";
const React = require("react");
const Nav = require("../module/nav");
import {Form, Input, Select, Button, DatePicker,Radio, notification,Tabs, Icon, Link,Table } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const moment = require('moment');
const connectToStores = require("alt-utils/lib/connectToStores");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");
const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const AccBookAction = require('../action/accBookAction');
const AccBookStore = require('../store/accBookStore');


class personMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:undefined,
      gender:undefined,
      tel:undefined,
      birthday:undefined,
      defaultKey: "1",
      accBookList: [],
      isBookList: true,
      editBook: false,
      createBook: false,
      book_money: 0,
      book_detail: '',
      book_type: '',
      book_name: '我的钱包',
      old_psd:'',
      new_psd:'',
      new_psd_again:''

    }

    PerMsgStore.listen(this.getUserMsg())

  }

  static getStores() {
    return [PerMsgStore,LoginStore, AccBookStore];
  }

  static getPropsFromStores() {
    return {
      ...PerMsgStore.getState(),
      ...LoginStore.getState(),
      ...AccBookStore.getState()
    }
  }
    componentWillMount() {
      

			this.setState({
        defaultKey: window.location.href.indexOf("accBook") === -1 ? 
                    (window.location.href.indexOf("createBook") !== -1 ? "3":"1") :"3",
        createBook: window.location.href.indexOf("createBook") !== -1,
        isBookList: window.location.href.indexOf("createBook") === -1,
        editBookL: window.location.href.indexOf("createBook") === -1
      });

    }

  componentDidMount(){
    // LoginAction.isLogin();
    PerMsgAction.getUserDetail();
    AccBookAction.list();
  }

  componentWillUnmount(){
    PerMsgStore.unlisten(this.listener)
    AccBookStore.unlisten(this.listener)
  }

  getUserMsg(){
    return this.listener = (store)=>{
      console.log(store);
      let {gender,nickname,tel,birthday} = store.getUserMsg;
      this.setState({
        name:nickname,
        gender:gender,
        tel:tel,
        birthday:birthday
      })
    }
  }

  getBookrMsg(){
    return this.listener = (store)=>{
      console.log(store);
      let accBook = store.accbook;
      this.setState({
        accBookList: accBook
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let {name,gender,tel,birthday} = this.state;
    PerMsgAction.updateMsg(name,gender,tel,birthday);
  }

  handleSubmitBook(e) {
      e.preventDefault();
      let {book_name,book_detail,book_type,book_money} = this.state;
      let data = {
        name: book_name,
        type: book_type,
        money: book_money,
        detail: book_detail
      }
      AccBookAction.addAccBook(data)
      this.setState({
        isBookList: true,
        editBook: false,
        createBook: false,
      })
  }
  
  handleUpdateBook(e) {
      e.preventDefault();
      let {book_name,book_detail,book_type,book_money} = this.state;
      let data = {
        name: book_name,
        type: book_type,
        money: book_money,
        detail: book_detail
      }
      // AccBookAction.addAccBook(data)
      this.setState({
        isBookList: true,
        editBook: false,
        createBook: false,
      })
  }


  openNotification = () => {
    notification.open({
      message: '您还未登陆',
      description: '即将跳转到登陆页登陆',
      duration: 2,
    });
  };

  changePsdSubmit(){


  }

  onChangeEditBook(accbook) {
    console.log(accbook)
    this.setState({
      isBookList: false,
      editBook: true
    })
  }

  onChangeDelBook(accbook){
    debugger
    console.log("del accbook", accbook)
    console.log("del accbook", arguments)
    this.setState({
      isBookList: false,
      editBook: true
    })
  }

  handleChangePsdSubmit = (e) => {
    e.preventDefault();
    let {old_psd,new_psd,new_psd_again} = this.state;
    if(!old_psd || !new_psd || !new_psd_again ){
      message.error('三个输入框不能为空',3)
    }else if(new_psd != new_psd_again){
      message.error('两次密码输入不一致',3)
    }else if((old_psd.length < 6 && old_psd.length > 25)
            || (new_psd.length < 6 && new_psd.length > 25)
            || (new_psd_again.length < 6 && new_psd_again.length > 25)){
      message.error('密码长度应该在6~25个字符',3)
    }else{
      LoginAction.changePsd(old_psd,new_psd);
    }
    console.log('click ', e);
  }

  render() {
    let {accBook, getUserMsg} = this.props;
    const columns1 = [{
      title: ' ',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '余额',
      dataIndex: 'money',
      key: 'money',
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        console.log("record=====",record)
        if(record.index == "我的钱包") {
          return (
              <span>
                <a onClick={this.onChangeEditBook.bind(this,record)}>编辑</a>
              </span>
          )
        } else {
          return (
              <span>
                <a onClick={this.onChangeEditBook.bind(this,record)}>编辑</a>
                <span className="ant-divider" />
                <a onClick={this.onChangeDelBook.bind(this,record)}>删除</a>
              </span>
          )
        }
      },
    }];
    let accbookData = [];
    if( !accBook  ||( accBook && accBook.length == 0) ) {
      accbookData = [{
        key: '1',
        index: "我的钱包",
        money: 0,
        todo: <Link to="/user/account" className="btn_yu">
                 编辑
               </Link>
      }];
    } else {
     
      accbookData = accBook.map( (item,i)=> {

          return  {
            index: item.name,
            money: item.money,
            key: (i + 1 ) +''
          } 
      })
    }

    let personBirth = !this.state.birthday ? new Date() :this.state.birthday;

    return <div className="f-page userManger" ref="personalMsg">
        <Nav />
      <Tabs defaultActiveKey={this.state.defaultKey}>
        <TabPane tab={<span><Icon type="apple" />个人资料</span>} key="1">
          <Form onSubmit={this.handleSubmit.bind(this)}
                className="personMsg-Form"
                layout="inline">
            <FormItem label="账号邮箱"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}
                      required="true">
              <Input value={window._test_data.email} disabled={true}/>
            </FormItem>
            <FormItem label="用户名"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}
                      required="true">
              <Input value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}}/>
            </FormItem>
            <FormItem label="性别"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}>
              <RadioGroup onChange={(e)=>{this.setState({gender: e.target.value})}} value={this.state.gender}>
                <Radio value={0}>保密</Radio>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="绑定手机"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}>
              <Input value={this.state.tel} onChange={(e)=>{this.setState({tel: e.target.value})}}/>
            </FormItem>
            <FormItem label="生日"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}>
                      <DatePicker className="account-date-select"
                              onChange={(e)=>{this.setState({birthday: e._d})}}
                              defaultValue={moment(personBirth,'YYYY-MM-DD')} />
            </FormItem>
            <FormItem labelCol={{span: 5}}
                      wrapperCol={{span: 12}} className="submit-btn">
              <Button type="primary"
                      htmlType="submit"
                      className="change-sure" >确认修改</Button>
            </FormItem>

          </Form>
        </TabPane>
        <TabPane tab={<span><Icon type="android" />修改密码</span>} key="2">
          <Form onSubmit={this.handleChangePsdSubmit} className="change-psd">
            <FormItem label="输入旧密码"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}
                      required="true">
               <Input value={this.state.old_psd} onChange={(e)=>{this.setState({old_psd: e.target.value})}}/>
            </FormItem>
            <FormItem label="输入新密码"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}
                      required="true">
                <Input value={this.state.new_psd} onChange={(e)=>{this.setState({new_psd: e.target.value})}} placeholder="长度在6~25字符之间"/>
            </FormItem>
            <FormItem label="重复输入新密码"
                      labelCol={{span: 5}}
                      wrapperCol={{span: 12}}
                      required="true">
               <Input value={this.state.new_psd_again} onChange={(e)=>{this.setState({new_psd_again: e.target.value})}}/>

            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                确定
              </Button>
            </FormItem>
          </Form>
        </TabPane>

        <TabPane tab={<span><Icon type="android" />账本管理</span>} key="3">
            {
              this.state.isBookList && 
              <div className="book-list">
                 <Table columns={columns1} dataSource={accbookData} pagination={false} />
              </div>
            }
            {
              this.state.createBook &&
              <div className="book-edit">
                <h3>创建新账本</h3>
                  <Form onSubmit={this.handleSubmitBook.bind(this)}
                      className="accBook-Form"
                      layout="inline">
                      <FormItem label="账户类型"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                        <Select name="" id="" onChange={(value)=>{this.setState({book_type: value})}}>
                          <Option value="现金账户">现金账户</Option>
                          <Option value="电子账户">电子账户</Option>
                          <Option value="银行账户">银行账户</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="账户名称"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                        <Input defaultValue="我的钱包" onChange={(e)=>{this.setState({book_name: e.target.value})}}/>
                      </FormItem>
                      <FormItem label="初始金额"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                           <Input defaultValue="" onChange={(e)=>{this.setState({book_money: e.target.value})}} 
                           placeholder="直接输入数字"/>
                      </FormItem>
                      <FormItem label="说明"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}>
                         <textarea name="book_detail" id="" cols="80" rows="4"
                             onChange={(e)=>{this.setState({book_detail: e.target.value})}}
                         ></textarea>
                      </FormItem>
                      <FormItem labelCol={{span: 5}}
                                wrapperCol={{span: 12}} className="submit-btn">
                        <Button type="primary"
                                htmlType="submit"
                                className="change-sure" >添加</Button>
                      </FormItem>

                    </Form>
              </div>
            }

            {
              this.state.editBook &&
              <div className="book-edit">
                <h3>修改账本</h3>
                  <Form onSubmit={this.handleUpdateBook.bind(this)}
                      className="accBook-Form"
                      layout="inline">
                      <FormItem label="账户类型"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                        <Select name="" id="" onChange={(value)=>{this.setState({book_type: value})}}>
                          <Option value="现金账户">现金账户</Option>
                          <Option value="电子账户">电子账户</Option>
                          <Option value="银行账户">银行账户</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="账户名称"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                        <Input defaultValue="我的钱包" onChange={(e)=>{this.setState({book_name: e.target.value})}}/>
                      </FormItem>
                      <FormItem label="初始金额"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}
                                required="true">
                           <Input defaultValue="" onChange={(e)=>{this.setState({book_money: e.target.value})}} 
                           placeholder="直接输入数字"/>
                      </FormItem>
                      <FormItem label="说明"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 12}}>
                         <textarea name="book_detail" id="" cols="80" rows="4"
                             onChange={(e)=>{this.setState({book_detail: e.target.value})}}
                         ></textarea>
                      </FormItem>
                      <FormItem labelCol={{span: 5}}
                                wrapperCol={{span: 20}} className="submit-btn">
                        <Button type="primary"
                                htmlType="submit"
                                className="change-sure" 
                                onClick={this.onChangeEditBook.bind(this)}>修改</Button>
                        <Button type="default"
                                htmlType="submit"
                                className="change-sure" 
                                onClick={this.onChangeEditBook.bind(this)}>取消</Button>
                      </FormItem>

                    </Form>
              </div>
            }
        </TabPane>

        <TabPane tab={<span><Icon type="android" />数据初始化</span>} key="4">
          <div className="delete-database">
            <p>什么是网站初始化？</p>
            <p> 网站初始化是为了让用户重新开始记账，本操作会清空系统内所有财务数据！</p>
            <p> 正常记账的用户请 <strong>谨慎使用，一旦系统初始化，所有数据都会丢失</strong>
            </p>
            <Button type="danger" size='large'>网站初始化</Button>
          </div>
        </TabPane>
      </Tabs>

    </div>
  }
}

module.exports = connectToStores(personMsg);