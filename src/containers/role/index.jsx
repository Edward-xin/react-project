import React, { Component } from "react";
import { Card, Button, Radio, Table, message, Modal } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";

import { getRoleListAsync, addRoleAsync ,updateRoleAsync} from "$redux/actions";
import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";

const { Group } = Radio;

@connect(
  state => ({ roles: state.roles, username: state.user.user.username }),
  {
    getRoleListAsync,
    addRoleAsync,
    updateRoleAsync
  }
)
class Role extends Component {
  state = {
    isLoding: false,
    isShowAddRoleModal: false, //是否显示添加角色对话框Modal
    isShowUpdateRoleModal: false,
    role: {} // 选中的角色数据
  };
  // 缓存数据
  columns = [
    {
      dataIndex: "_id",
      render: id => {
        return <Radio key={id} value={id} />;
      }
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render: time => {
        // 没有设置角色权限时 还没有授权时间，不应该显示授权时间
        // 与运算 第一个没值就返回第一个  第一个有值 就返回第二个值
        return time && dayjs(time).format("YYYY/MM/DD HH:mm:ss");
      }
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  // 发送请求，获取角色数据 只需一次
  componentDidMount() {
    this.setState({
      isLoding: true
    });
    this.props
      .getRoleListAsync()
      .then(() => {
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
  }

  /* // 显示添加角色的对话框
  showAddRoleModal=()=>{
    this.setState({
      isShowAddRoleModal:true
    })
  }
  // 隐藏添加角色的对话框
  hiddenAddRoleModal=()=>{
    this.setState({
      isShowAddRoleModal:false
    })
  } */

  // 复用上面的代码 切换添加角色的对话框的隐藏或显示
  /*
    key 代表要更新的state的属性名 isShowAddRoleModal / isShowUpdateRoleModal
    value 代表要更新的state的属性值 true / false
  */
  switchModal = (key, value) => {
    return () => {
      // 判断是否是隐藏对话框(取消时) --> false就是隐藏对话框
      if (!value) {
        // 判断清空的是 创建角色 还是 设置角色权限
        if (key === "isShowAddRoleModal") {
          this.addRoleForm.props.form.resetFields();
        }
      }
      this.setState({
        [key]: value
      });
    };
  };

  // 添加角色
  addRole = () => {
    // 校验表单并收集数据
    // console.log(this.addRoleForm);
    const { validateFields, resetFields } = this.addRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        const { name } = values;
        // 发送请求，创建角色
        this.props
          .addRoleAsync(name)
          .then(() => {
            message.success("创建角色成功");
            // 隐藏对话框
            this.setState({
              isShowAddRoleModal: false
            });
            // 清空表单数据
            resetFields();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };
  // 处理单选按钮事件
  handleRadioChange = e => {
    // 但是这里只能得到id，否则会报错
    const id = e.target.value;
    // 查找角色数据
    const role = this.props.roles.find(role => role._id === id);
    // 更新成状态
    this.setState({
      role
    });
  };
  // 设置角色权限
  UpdateRole = () => {
    // 校验表单并收集数据
    const { validateFields, resetFields } = this.updateRoleForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        // 权限列表
        const { menus } = values;
        // 角色Id
        const roleId = this.state.role._id;
        // 授权人名称(用户名称)
        const authName= this.props.username;

        // 发送请求时，数组/对象数据需要转换成JSON才能发送过去
        this.props.updateRoleAsync({menus:JSON.stringify(menus),roleId,authName})
          .then((res)=>{
            message.success('更新角色权限成功~')
            // 隐藏对话框
            this.setState({
              isShowUpdateRoleModal: false,
              // 更新role组件自己的role状态才能更新UpdateRoleFormrole组件 因为role组件通过props方式传递给UpdateRoleFormrole状态
              role: res
            });
            // 清空表单数据
            resetFields();
            
          })
          .catch(err=>{
            message.error(err)
          })
      }
    });
  };

  render() {
    const {
      isLoding,
      isShowAddRoleModal,
      isShowUpdateRoleModal,
      role
    } = this.state;
    const { roles } = this.props;
    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("isShowAddRoleModal", true)}
            >
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={!role._id}
              onClick={this.switchModal("isShowUpdateRoleModal", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        {/* Group包住Table Table里有Radio  Radio就能变成单选 Group行内元素 是被Table撑开的*/}
        <Group style={{ width: "100%" }} onChange={this.handleRadioChange}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            loading={isLoding}
          />
        </Group>
        <Modal
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
        </Modal>
      </Card>
    );
  }
}

export default Role;
