import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import menus from "$conf/menus";

const { SubMenu, Item } = Menu;

@connect(state => ({ roleMenus: state.user.user.menus }))
// withRouter高阶组件 提供路由组件的三大属性
@withRouter
class LeftNav extends Component {
  // 遍历菜单项文件创建菜单
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        // 二级菜单
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>
                  <FormattedMessage id={menu.title} />
                </span>
              </span>
            }
          >
            {menu.children.map(cMenu => this.createMenuItem(cMenu))};
          </SubMenu>
        );
      } else {
        // 一级菜单
        return this.createMenuItem(menu);
      }
    });
  };
  // 给上面复用代码
  createMenuItem = menu => {
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>
            <FormattedMessage id={menu.title} />
          </span>
        </Link>
      </Item>
    );
  };

  // 找到需要展开的二级以上的菜单
  findOpenKey = (pathname, menus) => {
    const menu = menus.find(menu => {
      /* if (menu.children) {
        // 二级菜单 返回找到相同地址的菜单项
        return menu.children.find(cMenu => cMenu.path === pathname);
      } */
      return (
        menu.children && menu.children.find(cMenu => cMenu.path === pathname)
      );
    });
    if (menu) {
      // 如果找得到 就返回这个菜单项的父级菜单的地址
      return menu.path;
    }
  };

  render() {
    let { pathname } = this.props.location;
    // pathname 可能是 /product/add
    // 如果pathname包含/product，就改成/product
    if (pathname.indexOf("/product") !== -1) {
      pathname = "/product";
    }

    // 获取用户的权限（redux里）
    const roleMenus = this.props.roleMenus;

    const filterMenus = menus.reduce((p, c) => {
      // 对c --> 遍历出来的菜单，进行深度克隆 --> 后面操作就不会影响原数据
      c = JSON.parse(JSON.stringify(c));

      // 如果一级菜单不属于权限列表，并也没有二级菜单
      // if (roleMenus.indexOf(c.path) === -1 && !c.children) {
      if (roleMenus.indexOf(c.path) !== -1 || c.children) {

        // 二级菜单
        if (c.children) {

          // 如果子菜单path在roleMenus中，返回值true, 就不会过滤
          // 如果子菜单path不在roleMenus中，返回值false, 就会被过滤掉
          const children = c.children.filter(item => {
            return roleMenus.indexOf(item.path) !== -1;
          });

          // 如果子菜单过滤后是空数组，是会显示菜单的，但是实际上是不需要的
          // 不需要整个菜单都不需要添加
          if (!children.length) {
            return p;
          }

          // c.children直接赋值 --> 修改了原数组 --> menus数组
          // jiaming测试时，将menus数组的 /product 删掉了
          // peihua测试时，此时menus数组中就没有 /product。
          // 解决：不能修改原数组
          // 在外面深度克隆一份
          c.children = children;
        }

        // 统一添加
        p.push(c);
      }

      return p;
    }, []);


    const openKey = this.findOpenKey(pathname, filterMenus);
    return (
      <Menu
        theme="dark" // 主题颜色
        defaultSelectedKeys={[pathname]} // 默认选中的菜单
        defaultOpenKeys={[openKey]} // 默认展开的菜单
        mode="inline" // 展开子菜单方式
      >
        {this.createMenus(filterMenus)}
      </Menu>
    );
  }
}
export default LeftNav;
