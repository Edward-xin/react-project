import React, { Component } from "react";
import { Card, Button, Radio, Table, message, Modal } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";

import { reqGetUser } from "$api";
import {getRoleListAsync} from "$redux/actions";

@connect(state => ({ roles: state.roles }), { getRoleListAsync })
class User extends Component {
  state = {
    users: [],
    isLoding: false
  };
  // 缓存数据
  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "手机号",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId",
      render: roleId => {
        const role = this.props.roles.find(role => role._id === roleId);
        return role && role.name;
      }
    },
    {
      title: "操作",
      // dataIndex: 'roleId',
      render: () => {
        return (
          <div>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
          </div>
        );
      }
    }
  ];

  // 发送请求，获取角色数据 只需一次
  componentDidMount() {
    this.setState({
      isLoding: true
    });

    reqGetUser()
      .then(res => {
        this.setState({
          users: res
        });
        message.success("获取角色列表数据成功");
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        this.setState({
          isLoding: false
        });
      });

      if (!this.props.roles.length) {
        this.props
          .getRoleListAsync()
          .then(() => {
            message.success('获取角色列表数据成功~');
          })
          .catch(err => {
            message.error(err);
          });
      }
  }

  render() {
    const { isLoding, users } = this.state;
    return (
      <Card
        title={
          <div>
            <Button type="primary">添加用户</Button>
          </div>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          loading={isLoding}
        />
        {/* <Modal
          title="创建角色"
          visible={isShowAddRoleModal}
          onOk={this.addRole}
          onCancel={this.switchModal("isShowAddRoleModal", false)}
        >
          <AddRoleForm
            // 获取AddRoleForm组件的form属性
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModal}
          onOk={this.UpdateRole}
          onCancel={this.switchModal("isShowUpdateRoleModal", false)}
        >
          <UpdateRoleForm
            role={role}
            // 获取UpdateRoleForm组件的form属性
            wrappedComponentRef={form => (this.updateRoleForm = form)}
          />
        </Modal> */}
      </Card>
    );
  }
}

export default User;
