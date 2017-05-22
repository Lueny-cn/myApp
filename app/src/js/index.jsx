"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const AccBookAction = require('../action/accBookAction');
const AccBookStore = require("../store/accBookStore");
// const ReactEcharts  = require('echarts-for-react');
const AccountStore = require("../store/accountStore");
const AccountAction = require("../action/accountAction");
const echarts = require("./echart");


const IndexItem = require("../subItem/indexItem");

import { Carousel, Table, Icon, Button } from 'antd';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    IndexAction.getConsumState();
    IndexAction.getEachMonthIncome();
    IndexAction.getEachMonthOut();
    AccBookAction.list();
    AccountAction.list()
  }

  static getStores() {
    return [IndexStore, AccBookStore];
  }

  static getPropsFromStores() {
    return {
      ...IndexStore.getState(),
      ...AccBookStore.getState()
    }
  }

  componentWillMount() {
      let {result, accBook} = this.props;

  }

  componentDidUpdate() {

       let {outMList, incomeMList, account} = this.props;

       var myChart_line = echarts.init(document.getElementById('echarts_line'));
       var myChart_pie = echarts.init(document.getElementById('echarts_pie'));
       
        // 指定图表的配置项和数据
        var option_line = {
            title: {
                text: '2017年收支折线图'
            },
            tooltip: {},
            legend: {
                data:['收入',"支出"]
            },
            xAxis: {
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} ¥'
                }
            },
            series: [
               {
                  name:'收入',
                  type:'line',
                  data:[0,20121, 8000, 8100, 7800, 9000, 9000, 9200, 10000],
              },
              {
                  name:'支出',
                  type:'line',
                  data:[5000, 6250, 5220, 5655, 4230, 1232, 3120, 3230]
                 
              }



            ]
        };

        var option_pie = {
           title : {
                text: '消费情况',
                subtext: '2017',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
               	data: ['旅游娱乐','餐饮饮食','水果零食','日常用品','交通通讯']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                       	{value:3100, name:'旅游娱乐'},
                        {value:5006, name:'餐饮饮食'},
                        {value:234, name:'水果零食'},
                        {value:504, name:'日常用品'},
                        {value:200, name:'交通通讯'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart_line.setOption(option_line);
        myChart_pie.setOption(option_pie);
  }


  getOption() {
	  	option = {
			title : {
				text: '消费情况',
				subtext: '模拟',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['旅游娱乐','餐饮饮食','水果零食','日常用品','交通通讯']
			},
			series : [
				{
					name: '访问来源',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:[
						{value:3100, name:'旅游娱乐'},
						{value:5006, name:'餐饮饮食'},
						{value:234, name:'水果零食'},
						{value:504, name:'日常用品'},
						{value:200, name:'交通通讯'}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		return option;
  }


  render() {
    let {result, accBook} = this.props;

      console.log("result   --- render",result )
      console.log("accBook   --- render",accBook )
    let state = this.state,
      title = '';
    if (!result) {
      return null;
    }
    let income = result.income, out = result.out;
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
      week: income.week,
      month: income.month,
      year: income.year
    }, {
      key: '2',
      index: '支出',
      week: out.week,
      month: out.month,
      year: out.year
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

    let accbookData = [];
	if( !accBook  ||( accBook && accBook.length == 0) ) {
		accbookData = [{
			key: '1',
			index: "我的钱包",
			money: 0
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

    return <div className="f-page index">

      <Nav />

      <div className="main-box">
        <div className="sideleft">
          <div className="topbar-title tb" >
            <span className="titright">本月预算支出<strong>{income.year}</strong>元， 已经支出<strong>{income.month}</strong>元
            </span>
            <h3>收支情况</h3>
          </div>
          <Table columns={columns} dataSource={data} pagination={false} />

          <div className="topbar-title tb" >
            <span className="titright">
              <a href="/user/budget" className="btn_yu" hidefocus="ture">详细报表</a>
            </span>
            <h3>消费比例</h3>
          </div>
           <div id="echarts_line" style={{width:700,height: 450, marginTop: 20 }}></div>
           <div id="echarts_pie" style={{width:700,height: 450, marginTop: 20 }}></div>
        </div>

        <div className="sidelright">
          <Link to="/user/account">
            <Button className="lg-button addAccont" type="primary" icon="add" size="large">记一笔</Button>
          </Link>
          <div className="myaccountBox">
            <div className="myaccount-title">
              我的账本
			  <Link to="/user/usermanager?accBook">
					<Icon type="setting" />
				</Link>
            </div>
            <Table columns={columns1} dataSource={accbookData} pagination={false} />
            <Link to="/user/usermanager?createBook">
              <Button type="default" icon="plus" className="add-account-btn"></Button>
            </Link>
          </div>
        </div>
      </div>





    </div>;
  }
}

module.exports = connectToStores(Index);