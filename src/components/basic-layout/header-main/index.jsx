import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {injectIntl,FormattedMessage} from 'react-intl';
import dayjs from 'dayjs'

import { removeItem } from "$utils/storage";
import { removeUser, changeLanguage } from "$redux/actions";

import menus from '$conf/menus'
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
    isScreenfull: false, // 全屏标记 一开始不是全屏
    date:Date.now()
  };
  componentDidMount() {
    // 只需要绑定一次 所以在componentDidMount生命周期函数
    // 检测全屏变化
    screenfull.on("change", this.handleScreenFullChange);
    // 定时器 用来更新时间
    this.timeId= setInterval(() => {
      this.setState({
        date:Date.now()
      })
    }, 1000);
  }
  componentWillUnmount() {
    // 要解绑事件 上面的screenfull.on('change'不是react事件 所以要解绑
    screenfull.off("change", this.handleScreenFullChange);
    // 清空定时器
    clearInterval(this.timeId);
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
  // 退出功能(对话框)
  logout = () => {
    const { intl }=this.props;
    Modal.confirm({
      // 对话框不在root里 要国际化需以下操作
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

  findTitle=(menus,pathname)=>{
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      // 二级菜单
      if(menu.children){
        for (let index = 0; index < menu.children.length; index++) {
          const cMenu = menu.children[index];
          if(cMenu.path=== pathname){
            return cMenu.title
          }
          
        }
      }else{
        // 一级菜单
        if(menu.path=== pathname){
          return menu.title
        }

      }
      
    }
  }

  render() {
    const { isScreenfull,date} = this.state;
    const { username,language,location:{pathname}} = this.props;

    const title = this.findTitle(menus,pathname);

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
          <span className="header-main-left">
            <FormattedMessage id={title} />
            </span>
          <span className="header-main-right">
            {dayjs(date).format('YYYY/MM/DD HH:mm:ss')}
          </span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
