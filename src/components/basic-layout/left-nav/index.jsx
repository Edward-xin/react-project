import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import menus from "$conf/menus";

const { SubMenu, Item } = Menu;

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
                <span>{menu.title} </span>
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
          <span>{menu.title}</span>
        </Link>
      </Item>
    );
  };

  // 找到需要展开的二级以上的菜单
  findOpenKey = (pathname, menus) => {
    const menu = menus.find(menu => {
      if (menu.children) {
        // 二级菜单 返回找到相同地址的菜单项
        return menu.children.find(cMenu => cMenu.path === pathname);
      }
    });
    if (menu) {
      // 如果找得到 就返回这个菜单项的地址
      return menu.path;
    }
  };

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKey(pathname, menus);
    return (
      <Menu
        theme="dark" // 主题颜色
        defaultSelectedKeys={[pathname]} // 默认选中的菜单
        defaultOpenKeys={[openKey]} // 默认展开的菜单
        mode="inline" // 展开子菜单方式
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}
export default LeftNav;
