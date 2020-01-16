import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";
import { connect } from "react-redux";

import { getCategoryListAsync, addCategoryAsync } from "$redux/actions";
import AddCategoryForm from "./add-category-form";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync
})
class Category extends Component {
  state = {
    isShowAddCategory: false // 是否展示对话框
  };
  componentDidMount() {
    this.props.getCategoryListAsync();
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

  /**
   * 添加分类
   */
  addCategory = () => {
    /*
      1. 校验表单
      2. 收集数据
        validateFields 校验表单同时收集数据
      3. 发送请求，更新后端数据
      4. 请求成功，就会更新前端数据
    */
    const { validateFields, resetFields } = this.addCategoryForm.props.form;
    validateFields((err, vaules) => {
      if (!err) {
        // 获取表单数据
        const { categoryName } = vaules;
        // 3. 发送请求，更新后端数据
        this.props
          .addCategoryAsync(categoryName)
          .then(() => {
            // 提示
            message.success("添加分类成功");
            // 清空表单数据 不写代表所有表单组件清空
            resetFields();
            // 隐藏对话框
            this.hiddenAddCategory();
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  /**
   * 隐藏添加分类对话框
   */
  hiddenAddCategory = () => {
    this.setState({
      isShowAddCategory: false
    });
    const { resetFields } = this.addCategoryForm.props.form;
    // 清空表单数据 不写代表所有表单组件清空
    resetFields();
  };

  /**
   * 显示添加分类对话框
   */
  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    });
  };

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

    const { categories } = this.props;
    const { isShowAddCategory } = this.state;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showAddCategory}>
            <Icon type="plus" />
            分类列表
          </Button>
        }
      >
        <Table
          columns={this.columns} // 列
          dataSource={categories} // 数据
          bordered
          pagination={{
            // 分页器
            defaultPageSize: 3, // 默认每页条数
            pageSizeOptions: ["3", "6", "9", "12"], // 指定每页可以显示多少条
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否可以快速跳转至某页
          }}
          rowKey="_id" // 根据api文档设置key
        />
        <Modal
          title="添加分类"
          visible={isShowAddCategory}
          onOk={this.addCategory}
          onCancel={this.hiddenAddCategory}
          width={300} // 设置宽度
        >
          <AddCategoryForm
            // 每个组件的form属性只能收集到自己的数据 要用子组件收集的数据就用以下官方提供的方法
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
