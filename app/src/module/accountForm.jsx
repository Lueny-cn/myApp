"use strict"
const React = require("react");
import {
  Form,
  Input,
  Button,
  Checkbox,
  Icon,
  Upload,
  DatePicker,
  Select,
  TreeSelect,
  Cascader
} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const TreeType = require("../config/tyeeType")
const AccountAction = require('../action/accountAction');
const AccountStore = require("../store/accountStore")
const AccBookAction = require('../action/accBookAction');
const AccBookStore = require("../store/accBookStore");

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
			isIncome: true,
			isOut: false,
			isDebit: false,
			isTransfer: false,
			accBookName: []
		};
	}

	static getStores() {
			return [AccountStore];
	}

	static getPropsFromStores() {
			return AccountStore.getState();
	}
	addSubmit() {}

	setValue(key, value) {
		this.state[key] = value;
		this.setState(this.state);
	}

	handleSubmit(e) {
		e.preventDefault();
		let {type} = this.props,
		value;

		this.props.form.validateFields((err, fieldsValue) => {
			if (err) {
				return;
			}

			// Should format date value before submit.
			const rangeValue = fieldsValue['range-picker'];
			const values = {
			...fieldsValue,
			'time': fieldsValue['time'].format('YYYY-MM-DD')
			// 'range-picker': [rangeValue[0].format('YYYY-MM-DD'),
			// rangeValue[1].format('YYYY-MM-DD')]
			};

			// console.log('Received values of form: ', values);

			let data = {
				type: values.way,
				money: values.money,
				time: values.time,
				avatar: "",
				detail: values.detail,
				accountbook_name: values.accountbook_name,
				account_type: this.props.type
			}

			  AccountAction.addAccount(data);
      });
	}

	// handleToggle() {   $('#stateBut').on('click',function(){
	// $('#class1content').toggle();   }) }

	onChangeWay(value) {
		onChange = (value) => {
		// console.log(arguments);
		this.setState({value});
		}
	}

	handleChangeIncome(value) {
		// console.log(`selected ${value}`);
	}

	handleChangeBook(value) {
		// console.log(`selected ${value}`);
	}

	handleChangeUpload (e) {
		// console.log("upload------------------",)
	}
	normFile = (e) => {
		// console.log('Upload event:', e);
		if (Array.isArray(e)) {
		return e;
		}
		return e && e.fileList;
	}

    componentDidMount() {
      let {type} = this.props;

      this.setState({
          isIncome: type === "income",
          isOut: type === "out",
          isDebit: type === "debit",
          isTransfer: type === "transfer"
      });
    }

    disabledEndDate = (endValue) => {
      const startValue = new Date();
      if (!endValue || !startValue) {
          return false;
      }
      return endValue.valueOf() > startValue.valueOf();
    }

    render() {
      let {accBook} = this.props;
      let accbookName = [];

      if(!accBook) {
          accbookName=["我的钱包"];
       } else {
         accBook.map((item)=>{
            accbookName.push(item.name)
          });
       }
        console.log(" state " ,this.state)
        console.log(" state " ,this.state)
        const { getFieldDecorator, } = this.props.form;
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
                    <DatePicker disabledDate={this.disabledEndDate}
                      
                    />
                  )}
                  </FormItem>
                  <FormItem 
                        label="账户"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('accountbook_name', {
                          rules: [
                            { required: true, message: '选择你的账户!' },
                          ],
                        })(
                        <Select placeholder="请选择账户" onChange={this.handleChangeBook.bind(this)}>
                            {
                              accbookName.map((item)=> {
                                return  <Option value={item}>{item}</Option>
                              })
                            }
                        </Select>
                    )}
                    </FormItem>
                  {
                    this.state.isOut &&
                    <FormItem 
                      label="用途"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('value', {
                          rules: [{ required: true, message: '用途为空,请输入' }],
                        })(
                        
                          <Cascader
                            onChange={this.onChangeCascader}
                            options={TreeType}
                            displayRender={displayRender}
                            style={{ width: 290 }}
                          />
                        )}
                      
                      </FormItem>
                    }
                    {
                      this.state.isIncome &&
                      <FormItem 
                        label="用途"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('way', {
                            rules: [{ required: true, message: '用途为空,请输入' }],
                          })(
                          
                            <Select placeholder="请选择账户">
                                <Option value="工资">工资</Option>
                                <Option value="奖金">奖金</Option>
                                <Option value="other">其它收入</Option>
                            </Select>
                          )}
                        
                        </FormItem>
                    }
                    {
                      this.state.isDebit &&
                      <FormItem 
                        label="用途"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('way', {
                            rules: [{ required: true, message: '用途为空,请输入' }],
                          })(
                          
                            <Select placeholder="请选择账户" >
                                <Option value="工资">工资</Option>
                                <Option value="奖金">奖金</Option>
                                <Option value="other">其它收入</Option>
                            </Select>
                          )}
                        
                        </FormItem>
                    }
                    {
                      this.state.isTransfer &&
                      <FormItem 
                        label="用途"
                        {...formItemLayout}
                      >
                        {getFieldDecorator('way', {
                            rules: [{ required: true, message: '用途为空,请输入' }],
                          })(
                          
                            <Select placeholder="请选择账户" onChange={this.handleChangeIncome.bind(this)}>
                                <Option value="工资">工资</Option>
                                <Option value="奖金">奖金</Option>
                                <Option value="other">其它收入</Option>
                            </Select>
                          )}
                        
                        </FormItem>
                    }
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

                          <Upload.Dragger name="files" action="http://localhost:3000/upload">
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