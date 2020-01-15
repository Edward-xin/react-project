import React, { Component } from "react";
import { Card, Button, Icon, Table } from "antd";
import {connect} from 'react-redux'

import {getCategoryAsync} from '$redux/actions'

@connect(
  state=>({categories:state.categories}),
  {getCategoryAsync}
)
class Category extends Component {
  componentDidMount(){
    this.props.getCategoryAsync();
  }
  // 可以直接当做实例对象的属性 避免重复渲染
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      dataIndex: "operation",
      // 因为这个地方是固定 可以直接写死
      render() {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];
  render() {
    

    /* const data = [
      { // 这里的内容要和上面的列dataIndex一样
        // 根据api文档设置属性
        name: "aaa",
        _id: 1
      },
      {
        name: "bbb",
        _id: 2
      },
      {
        name: "aaa",
        _id: 3
      },
      {
        name: "bbb",
        _id: 4
      }
    ]; */

    const {categories} = this.props;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary">
            <Icon type="plus" />
            分类列表
          </Button>
        }
      >
        <Table
          columns={this.columns} // 列
          dataSource={categories} // 数据
          bordered
          pagination={{ // 分页器
            defaultPageSize: 3,// 默认每页条数
            pageSizeOptions: ["3", "6", "9", "12"],// 指定每页可以显示多少条
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否可以快速跳转至某页
          }}
          rowKey="_id" // 根据api文档设置key
        />
        ,
      </Card>
    );
  }
}

export default Category;
