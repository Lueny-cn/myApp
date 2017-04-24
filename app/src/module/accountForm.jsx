"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox ,Icon, Upload, DatePicker,
        Select, TreeSelect
} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const RangePicker = DatePicker.RangePicker;

class AccountForm extends React.Component {

   constructor(props) {
        super(props);
        this.state = {
          value: "餐饮饮食"
        };
  }


  handleSubmit(e) {
      e.preventDefault();
      let { type } = this.props
          , value;

      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
      };
      this.props.form.validateFields((err, values) => {
      if (!err) {
          console.log('Received values of form: ', values);
      }
      value = values;
      });

  }

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
              {getFieldDecorator('date-picker', config)(
              <DatePicker />
            )}
            </FormItem>
            <FormItem 
              label="账户"
              {...formItemLayout}
            >
              <Select defaultValue="我的钱包">
                <Option value="mypocket">我的钱包</Option>
                <Option value="alipay">支付宝</Option>
              </Select>
            </FormItem>
            <FormItem 
              label="用途"
              {...formItemLayout}
            >
              <TreeSelect
                style={{ width: 300 }}
                defaultValue={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                treeDefaultExpandAll={false}
                onChangeWay={this.onChangeWay.bind(this)}
              />
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