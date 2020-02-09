import React, { Component } from "react";
import { Card, Button, Radio, Table, message } from "antd";
import dayjs from 'dayjs'
import {connect} from 'react-redux'

import {getRoleListAsync} from '$redux/actions'

const { Group } = Radio;

@connect(
  (state)=>({roles:state.roles}),
  {
    getRoleListAsync
  }
)
class Role extends Component {
  state={
    isLoding:false
  }
  // 缓存数据
  columns = [
    {
      dataIndex:'_id',
      render: (id) => {
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
      render:(time)=> dayjs(time).format('YYYY/MM/DD HH:mm:ss')
      
    },
    {
      title: "授权时间",
      dataIndex: "authTime",
      render:(time)=> dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];

  // 发送请求，获取角色数据 只需一次
  componentDidMount(){
    this.setState({
      isLoding:true
    })
    this.props.getRoleListAsync()
      .then(()=>{
        message.success('获取角色列表数据成功');
      })
      .catch((err)=>{
        message.error(err)
      })
      .finally(()=>{
        this.setState({
          isLoding:false
        })
      })
  }

  render() {
    const {isLoding} = this.state;
    const {roles}=this.props;
    return (
      <Card
        title={
          <div>
            <Button type="primary">创建角色</Button> &nbsp;&nbsp;
            <Button type="primary" disabled>
              设置角色权限
            </Button>
          </div>
        }
      >
        {/* Group包住Table Table里有Radio  Radio就能变成单选 Group行内元素 是被Table撑开的*/}
        <Group style={{width:'100%'}}>
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            loading={isLoding}
          />
        </Group>
      </Card>
    );
  }
}

export default Role;
