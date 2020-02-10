import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";
import { connect } from "react-redux";

import {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
} from './store';
import AddCategoryForm from "./add-category-form";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
  state = {
    isShowCategoryModal: false, // 是否展示对话框
    // isUpdateCategory:false,
    category: {}
  };
  componentDidMount() {
    // 如果已经redux里已经有分类数据 就不需要再请求一次
    if(!this.props.categories.length){
      // 不存在 就发送请求获取数据
      this.props.getCategoryListAsync();
    }
  }
  // 可以直接当做实例对象的属性 避免重复渲染
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      // dataIndex: "name",
      // 因为这个地方是固定 可以直接写死
      render: category => {
        /*
            render方法参数的值看 dataIndex
            如果 dataIndex 没有，得到就是整个数据
        */
        return (
          <div>
            <Button type="link" onClick={this.showCategoryModal(category)}>
              修改分类
            </Button>
            <Button type="link" onClick={this.delCategory(category)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];
  /**
   * 删除分类
   */
  delCategory = category => {
    return () => {
      Modal.confirm({
        title: `您确认要删除${category.name}分类吗?`,
        onOk: () => {
          this.props
            .deleteCategoryAsync(category._id)
            .then(() => {
              message.success("删除分类成功~");
            })
            .catch(err => {
              message.error(err);
            });
        }
      });
    };
  };

  /**
   * 添加/修改分类
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
    const {
      category: { name, _id }
    } = this.state;

    validateFields((err, vaules) => {
      if (!err) {
        // 获取表单数据
        const { categoryName } = vaules;
        // 3. 发送请求，更新后端数据
        // 添加 / 修改 --> category.name
        let promise = null;
        if (name) {
          // 修改
          promise = this.props.updateCategoryAsync(_id, categoryName);
        } else {
          // 添加
          promise = this.props.addCategoryAsync(categoryName);
        }
        promise
          .then(() => {
            // 提示
            message.success(`${name ? "修改" : "添加"}分类成功`);
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
    const { resetFields } = this.addCategoryForm.props.form;
    // 清空表单数据 不写代表所有表单组件清空
    resetFields();

    this.setState({
      isShowCategoryModal: false
    });
  };

  /**
   * 显示添加/修改分类对话框
   */
  showCategoryModal = (category = {}) => {
    return () => {
      this.setState({
        isShowCategoryModal: true,
        category
        // isUpdateCategory:category.name
      });
    };
  };

  /* showAddCategoryModal=()=>{
    return ()=>{
      this.setState({
        isUpdateCategory:false,
        category:{}
      })
      this.showCategoryModal();
    }

  }
  
  showUpdateCategoryModal=(category)=>{
    return ()=>{
      this.setState({
        isUpdateCategory:true,
        category
      })
      this.showCategoryModal();
    }

  } */

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
    const { isShowCategoryModal, category } = this.state;

    return (
      <Card
        title="分类列表"
        extra={
          <Button type="primary" onClick={this.showCategoryModal()}>
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
          title={category.name ? "修改分类" : "添加分类"}
          visible={isShowCategoryModal}
          onOk={this.addCategory}
          onCancel={this.hiddenAddCategory}
          width={300} // 设置宽度
        >
          <AddCategoryForm
            categoryName={category.name}
            // 每个组件的form属性只能收集到自己的数据 要用子组件收集的数据就用以下官方提供的方法
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
