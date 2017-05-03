"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox ,Icon, Upload, DatePicker,
        Select, TreeSelect
} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const TreeType = require("../config/tyeeType")
const AccountAction = require('../action/accountAction');
const AccountStore = require("../store/accountStore")


class AccountForm extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
          value: "餐饮饮食",
          type: "",
          money: 0,
          time: "",
          avatar: "",
          detail: "",
          accountbook_id: "",
        };
    }
  
    static getStores() {
        return [AccountStore];
    }

    static getPropsFromStores() {
        return AccountStore.getState();
    }


    addSubmit() {
       
    }

   

    setValue(key, value) {
        this.state[key] = value;
        this.setState(this.state);
    }


  handleSubmit(e) {
      e.preventDefault();
      let { type } = this.props
          , value;


      this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }

          // Should format date value before submit.
          const rangeValue = fieldsValue['range-picker'];
          const values = {
            ...fieldsValue,
            'time': fieldsValue['time'].format('YYYY-MM-DD')
            // 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
          };
        
          console.log('Received values of form: ', values);

  
          let  data = {
              type: values.way,
              money: values.money,
              time: values.time,
              avatar: "",
              detail: values.detail,
              accountbook_name: values.accoountbook,
              account_type: this.props.type
          }

            AccountAction.addAccount(data);
      });
  
  }

  // handleToggle() {
  //   $('#stateBut').on('click',function(){
  //   $('#class1content').toggle();
  //   })
  // }

  onChangeWay(value) {
     onChange = (value) => {
      console.log(arguments);
      this.setState({ value });
    }
  }

  render() {
    // let {} = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
    };

    const config = {
      rules: [{ type: 'object', required: true, message: '请选择时间!' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择时间!' }],
    };
    
    const formUploaddLayout = {
      labelCol: { span: 6, offset: 10 },
      wrapperCol: { span: 10 },
    };

    console.info("AccountForm ", this.props)
    return <Form className="acountForm"
              onSubmit={this.handleSubmit.bind(this) } key="5">
            <FormItem 
              label="金额"
              {...formItemLayout}
            >
              {getFieldDecorator('money', {
                rules: [{ required: true, message: '金额为空' }],
              })(
                <Input placeholder="金额" />
              )}
            </FormItem>
            <FormItem
              label="时间"
              {...formItemLayout}
            >
              {getFieldDecorator('time', config)(
              <DatePicker />
            )}
            </FormItem>
            <FormItem 
              label="账户"
              {...formItemLayout}
            >
              {getFieldDecorator('accoountbook', {
                rules: [
                  { required: true, message: '选择你的账户!' },
                ],
              })(
                <Select placeholder="请选择账户">
                  <Option value="mypocket">我的钱包</Option>
                  <Option value="alipay">支付宝</Option>
            </Select>
          )}
            </FormItem>
            <FormItem 
              label="用途"
              {...formItemLayout}
            >
              {getFieldDecorator('way', {
                  rules: [{ required: true, message: '用途为空,请输入' }],
                })(
                  <TreeSelect
                    placeholder={"比如: 餐饮饮食"}
                    style={{ width: 300 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={TreeType}
                    treeDefaultExpandAll={false}
                    onChangeWay={this.onChangeWay.bind(this)}
                  />
                )}
              
            </FormItem>
            <FormItem 
              label="备注"
              {...formItemLayout}
            >
              {getFieldDecorator('detail', {
                rules: [{ required: true, message: '备注为空' }],
              })(
                <Input placeholder="限20个汉字" />
              )}
            </FormItem>
            <FormItem className="dropbox-item"
              {...formUploaddLayout}
              layout={"horizontal"}
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="camera-o" />
                    </p>
                    <p className="ant-upload-text">点击上传图片</p>
                  </Upload.Dragger>
                )}
             </div>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" className="account-submit" key="5">
                添加
              </Button>
            </FormItem>
          </Form>;
  }
}
module.exports = CreateForm()(AccountForm);