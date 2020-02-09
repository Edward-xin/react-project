import React, { Component } from "react";
import { Card, Button, Radio, Table, message, Modal } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";

import { getRoleListAsync ,addRoleAsync} from "$redux/actions";
import AddRoleForm from "./add-role-form";

const { Group } = Radio;

@connect(state => ({ roles: state.roles }), {
  getRoleListAsync,
  addRoleAsync
})
class Role extends Component {
  state = {
    isLoding: false,
    isShowAddRoleModal: false //是否显示添加角色对话框Modal
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
        return time && dayjs(time).format('YYYY/MM/DD HH:mm:ss');
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
  switchAddRoleModal = isShowAddRoleModal => {
    return () => {
      if(!isShowAddRoleModal){
        // 如果隐藏对话框(取消时)，需要将用户输入给清空
        this.addRoleForm.props.form.resetFields();
      }
      this.setState({
        isShowAddRoleModal
      });
    };
  };

  // 添加角色
  addRole = () => {
    // 校验表单并收集数据
    // console.log(this.addRoleForm);
    const {validateFields,resetFields} = this.addRoleForm.props.form
    validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        const { name } = values;
        // 发送请求，创建角色
        this.props.addRoleAsync(name)
          .then(()=>{
            message.success('创建角色成功');
            // 隐藏对话框
            this.setState({
              isShowAddRoleModal:false
            })
            // 清空表单数据
            resetFields();
          })
          .catch((err)=>{
            message.error(err)
          })
      }
    });
  };
  render() {
    const { isLoding, isShowAddRoleModal } = this.state;
    const { roles } = this.props;
    return (
      <Card
        title={
          <div>
            <Button type="primary" onClick={this.switchAddRoleModal(true)}>
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button type="primary" disabled>
              设置角色权限
            </Button>
          </div>
        }
      >
        {/* Group包住Table Table里有Radio  Radio就能变成单选 Group行内元素 是被Table撑开的*/}
        <Group style={{ width: "100%" }}>
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
          onCancel={this.switchAddRoleModal(false)}
        >
          <AddRoleForm
            // 获取AddRoleForm组件的form属性
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
