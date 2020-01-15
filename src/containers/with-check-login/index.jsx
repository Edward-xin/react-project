/**
 * 用来检测登录的高阶组件
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default function withCheckLogin(WrappedComponent) {
  // 传入redux的数据
  @connect(state => ({ user: state.user }), null)
  class checkLogin extends Component {
    // 给（新）包装组件命名
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    render() {
      /*
        判断是否登录过： redux --> user

        获取访问地址；location.pathname 
          将来会给Login/Home组件使用。所以向外暴露的是CheckLogin组件，
          CheckLogin组件应用在Route上，所有具体路由组件特点
        
        跳转网址有两种方式：
          Redirect 用于render方法中
          this.props.history.push/replace 用于非render方式中

        如果登录过，
          访问 / ，可以访问
          访问 /login, 跳转到 /
        如果没有登录过
          访问 / ，跳转到 /login
          访问 /login, 可以访问
      */
      const {
        user: { token },
        // 路由组件的属性 pathname是网址
        location: { pathname }
      } = this.props;

      if (token) {
        // 登录过
        if (pathname === "/login") {
          return <Redirect to="/" />;
        }
      } else {
        // 没登录过
        if (pathname === "/") {
          return <Redirect to="/login" />;
        }
      }

      // 接收新组件（路由组件）的三大属性
      return <WrappedComponent {...this.props} />;
    }
  }

  return checkLogin;
}
