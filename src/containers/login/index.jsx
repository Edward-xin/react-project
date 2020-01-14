import React, { Component } from "react";
// 引入antd的表单组件
import { Button, Form, Input, Icon, message } from "antd";
import { connect } from "react-redux";

import { savaUserAsync } from "../../redux/actions";
import withCheckLogin from '../with-check-login'

// 图片必须引入，才会被webpack打包
import logo from '../../assets/imgs/logo.png';
// 引入样式文件
import "./index.less";

const { Item } = Form;

@withCheckLogin
@connect(null, { savaUserAsync })
@Form.create() // 高阶组件 给Login组件传递form属性
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

    // 必须要调用haiyou
    callback();
  };

  login = e => {
    e.preventDefault();

    // 传进来的form属性上有个方法 用来表单校验并收集数据
    this.props.form.validateFields((err, values) => {
      /**
       * err 表示错误对象 即表单校验失败
       * values 表单数据
       */
      // 表单校验成功
      if (!err) {
        // 收集表单数据
        const { username, password } = values;
        // 发送请求，请求登录 这里要解决跨域问题
        //#region
        /* axios
          .post("/api/login", { username, password })
          .then(response => {
            // 请求成功
            // console.log(response);
            // 判断是否登录成功
            if (response.data.status === 0) {
              // 登录成功就跳转到home页面
              // 这里不能用<Redirect />这个组件(只能用于render方法中)
              // 编程式导航用于(非render方法中) 路由组件的history属性 replace方法 取代当前的历史记录 不能回退
              this.props.history.replace("/");
            } else {
              // 登录失败 提示错误 antd的对象message
              message.error(response.data.msg);
              // 清空密码 form属性上的重置表单项的方法(不写会重置所有组件)
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(err => {
            // 请求失败 提示错误
            // console.log(err);
            message.error("网络异常");
            // 清空密码
            this.props.form.resetFields(["password"]);
          }); */
        //#endregion

        // 得到登录成功/失败
        this.props
          .savaUserAsync(username, password)
          .then(() => {
            // 登录成功 跳转到home页面
            // 编程式导航用于(非render方法中) 路由组件的history属性 replace方法 取代当前的历史记录 不能回退
            this.props.history.replace("/");
          })
          .catch(err => {
            // 登录失败
            message.error(err);
            // 清空密码
            this.props.form.resetFields(["password"]);
          });
      }
    });
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
          <Form className="login-form" onSubmit={this.login}>
            <Item>
              {/* 第一个括号里的第一个参数 username作为将来收集表单数据的key */}
              {getFieldDecorator("username", {
                rules: [
                  //#region
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
                  //#endregion
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
            </Item>
            <Item>
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
                  type="password"
                />
              )}
            </Item>
            <Item>
            <Button
              className="login-form-btn"
              type="primary"
              // button上的原生type值
              htmlType="submit"
            >
              登录
            </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
