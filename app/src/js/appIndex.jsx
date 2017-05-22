"use strict"
const React = require("react");
const {Link} = require("react-router");
// const connectToStores = require("alt-utils/lib/connectToStores");

class AppIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	setValue(key, value) {
		this.state[key] = value;
		this.setState(this.state);
	}

	render() {

		return <div className="f-page index">
			<div className="m-main">
							<h2>题 目：基于React和NodeJs实现的记账本系统</h2>
							<h3>班 级：13级计算机科学与技术2班</h3>
							<h3>姓 名：卢文友</h3>
							<h3>指导老师：李胜莲</h3>
							<Link to="/" className="btn_yu">
											进入记账系统
							</Link>
			</div>
		</div>;
	}
}

module.exports = AppIndex;