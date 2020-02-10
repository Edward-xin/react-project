import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";

import Login from "./containers/login";
import BasicLyout from "./components/basic-layout";
import ErrorBoundary from "./components/error-boundary";
import routes from "./config/routes";
import { en, zhCN } from "./locales";

import zh_CN from "antd/es/locale/zh_CN";
import en_US from "antd/es/locale/en_US";

@connect(state => ({ language: state.language, user: state.user.user }), null)
class App extends Component {
  render() {
    // 获取语言
    const { language, user } = this.props;
    const isEn = language === "en";

    /*
      登录过，才有user数据，才需要对其权限管理
      没有登录过，访问 /login 页面，并本地没有user数据
        没有user数据就没有roleMenus，就不需要对其权限管理。
      
      判断有没有登录过？ 判断redux中是否有user数据
    */
    let filterRoutes = [];

    if (user) {
      // 获取用户的角色权限数据
      const roleMenus = user.menus;
      /*
        获取到所有routes（所有路由），获取到用户权限（roleMenus）
        只有用户权限（roleMenus）允许访问的路由才能加载，所以过滤到没有权限的路由
          正常情况：用户权限（roleMenus）中的值和 routes中的path值 一一对应  （一对一）
          特殊情况：/product --> /product/update/xxx  /product/xxx /product/add ...（一对多）
      */
      /*
        对路由进行权限管理
        使用filter过滤不属于roleMenus中的路由
          返回true，保留
          返回false，过滤
      */
      filterRoutes = routes.filter(route => {
        return roleMenus.find(menu => {
          /* // 正常情况：路径相等 保留
           if (route.path === menu) {
             return true
           };
           // 特殊情况
           // 权限菜单有 /product权限 应该允许访问/product /product/add /product/update/:id....
           // route.path如果是 /product开头 保留 只要menu没有 /product , 就过滤掉
           if (menu === '/product' && route.path.startsWith(menu)) {
             return true
           }
           return false */

          return (
            route.path === menu ||
            (menu === "/product" && route.path.startsWith(menu))
          );
        });
      });
    }

    return (
      // ConfigProvider设置antd组件的国际化
      // IntlProvider设置自己文字的国际化
      <ConfigProvider locale={isEn ? en_US : zh_CN}>
        <IntlProvider
          locale={language} // 选择语言
          messages={isEn ? en : zhCN} // 选择语言包
        >
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              {/* exact 全匹配 否则会命中两个地址 */}
              <BasicLyout>
                {filterRoutes.map(route => {
                  // return <Route path={route.path} exact={route.exact} component={route.component} />
                  return (
                    <ErrorBoundary>
                      <Route {...route} key={route.path} />
                    </ErrorBoundary>
                  );
                })}
              </BasicLyout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

export default App;
