## account web

api: 后台逻辑


pre =  http://localhost:3000

### 获取年月周消费情况 (get) http://localhost:3000/user/account/consumStat


### 获取记账记录 （get）  http://localhost:3000/user/account/list
必须先记帐才有数据 前端页面足够生成数据


### 获取记账本（账户）信息    http://localhost:3000/user/accountBook/list
注册的时候会自动生成一个默认账本
{
    _id: "5919b6e07bd4ea4b0c64cd13",
    user_email: "test222@qq.com",
    __v: 0,
    updated: "2017-05-15T14:10:40.562Z",
    created: "2017-05-15T14:10:40.560Z",
    history: null,
    detail: "",
    money: -170,
    type: "现金账户",
    name: "我的钱包"
}

app: 前端页面