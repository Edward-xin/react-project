import React, { Component } from "react";

// 引入antd的表单组件
import { Button, Form, Input, Icon } from "antd";

// 图片必须引入，才会被webpack打包
import logo from "./logo.png";
// 引入样式文件
import "./index.less";

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统(我的)</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form className="login-form">
            <Form.Item>
              <Input
                // prefix 前缀（加个图标组件）
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="密码"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button className="login-form-btn" type="primary">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
