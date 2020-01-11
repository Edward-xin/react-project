import React, { Component } from "react";

// 引入antd的表单组件
import { Button, Form, Input, Icon } from "antd";

// 图片必须引入，才会被webpack打包
import logo from "./logo.png";
// 引入样式文件
import "./index.less";

// 高阶组件 给Login组件传递form属性
@Form.create()
class Login extends Component {
  // 自定义校验 传入三个参数 callback必须被调用
  validator = (rule, value, callback) => {
    /**
     * rule.field 获取表单key
     * value 获取表单输入的内容
     */
    // console.log(rule, value);

    const name = rule.field === "username" ? "用户名" : "密码";

    /**
     * callback()调用不传参 表单校验成功
     * callback(message)调用传参 表单校验失败 提示message错误
     */
    const reg = /^\w+$/;
    if (!value) {
      // 输入值为空
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }

    // 必须要调用
    callback();
  };

  render() {
    // 传进来的form属性 有getFieldDecorator方法 这个方法是用来做表单校验的 它也是高阶组件
    const { getFieldDecorator } = this.props.form;

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
              {/* 第一个括号里的第一个参数 username作为将来收集表单数据的key */}
              {getFieldDecorator("username", {
                rules: [
                  /* // 这种方法不好 因为他不满足多个条件会同时报多个错误
                  {
                    required: true,
                    message: "Please input your username!"
                  },
                  {
                    min: 4,
                    message: "用户名必须大于3位"
                  },
                  {
                    max: 15,
                    message: "用户名必须小于15位"
                  },
                  {
                    pattern: /^\w+$/,
                    message: "用户名只能包含英文、数字、下划线"
                  } */
                  // 使用自定义校验 callback必须被调用 这种方法不会同时报多个错误并且可以复用代码
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  // prefix 前缀（加个图标组件）
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码"
                />
              )}
              
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

export default Login;
