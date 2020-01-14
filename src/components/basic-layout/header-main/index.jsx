import React, { Component } from "react";
import { Button, Icon } from "antd";
import screenfull from "screenfull";

import "./index.less";

export default class HeaderMain extends Component {
  state = {
    isScreenfull: false // 全屏标记 一开始不是全屏
  };
  componentDidMount() {
    // 只需要绑定一次 所以在componentDidMount生命周期函数
    // 检测全屏变化
    screenfull.on("change", this.handleScreenFullChange);
  }
  componentWillUnmount() {
    // 卸载组件要解绑事件 上面的screenfull.on('change'不是react事件 所以要解绑
    screenfull.off("change", this.handleScreenFullChange);
  }
  // 解绑事件的回调函数
  handleScreenFullChange = () => {
    const { isScreenfull } = this.state;
    this.setState({
      isScreenfull: !isScreenfull
    });
  };

  // 切换全屏的功能
  screenFull = () => {
    screenfull.toggle();
  };

  render() {
    const { isScreenfull } = this.state;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button size="small">English</Button>
          <span className="header-main-lang">hello,admin</span>
          <Button size="small">退出</Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-right">2020/01/14 15:58:37</span>
        </div>
      </div>
    );
  }
}
