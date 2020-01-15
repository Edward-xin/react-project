import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {injectIntl} from 'react-intl'

import { removeItem } from "$utils/storage";
import { removeUser, changeLanguage } from "$redux/actions";

import "./index.less";

// 获得intl属性
@injectIntl
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
@withRouter
class HeaderMain extends Component {
  state = {
    isScreenfull: false // 全屏标记 一开始不是全屏
  };
  componentDidMount() {
    // 只需要绑定一次 所以在componentDidMount生命周期函数
    // 检测全屏变化
    screenfull.on("change", this.handleScreenFullChange);
  }
  componentWillUnmount() {
    // 要解绑事件 上面的screenfull.on('change'不是react事件 所以要解绑
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
  // 退出功能
  logout = () => {
    const { intl }=this.props;
    Modal.confirm({
      // 对话框不在App组件里 要国际化需以下操作
      title: intl.formatMessage({id:'logout'}),
      // content: "",
      onOk: () => {
        // 清空数据 localStorage 和redux都要清
        removeItem("user");
        this.props.removeUser();
        // 跳转到login页面
        this.props.history.replace("/login");
      }
      /* onCancel:()=>{
        console.log("Cancel");
      } */
    });
  };

  // 点击切换语言
  changeLange = () => {
    const language = this.props.language === "en" ? "zh-CH" : "en";
    this.props.changeLanguage(language);
  };

  render() {
    const { isScreenfull } = this.state;
    const { username,language} = this.props;
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button
            className="header-main-lang"
            size="small"
            onClick={this.changeLange}
          >
            {language === 'en' ? '中文' : 'English'}
          </Button>
          <span>hello,{username}~~ </span>
          <Button size="small" onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">商品管理</span>
          <span className="header-main-right">2020/01/14 15:58:37</span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
