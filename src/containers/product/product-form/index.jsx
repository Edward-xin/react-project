import React, { Component } from "react";
import {
  Card,
  Icon,
  Form,
  Button,
  Select,
  Input,
  InputNumber,
  message
} from "antd";
// 引入富文本编辑器组件
import BraftEditor from "braft-editor";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategoryListAsync } from "$redux/actions";
import { reqAddProduct, reqUpdateProduct, reqGetProduct } from "$api";

import "./index.less";
// 引入富文本编辑器组件的样式
import "braft-editor/dist/index.css";

const { Item } = Form;
const { Option } = Select;

/*
  问题：
    1. 要不要redux状态数据：看组件要不要使用状态数据展示
      因为需要商品分类进行展示，需要分类数据
    2. 要不要更新状态数据的方法：看组件要不要对数据进行操作
      因为一上来分类数据是[], 需要异步action请求更新分类数据
*/
@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync
})
@Form.create()
class ProductForm extends Component {
  state = {
    // 商品数据
    product: {}
  };
  // 因为数据只要请求一次
  componentDidMount() {
    // 如果已经redux里已经有分类数据 就不需要再请求一次
    if (!this.props.categories.length) {
      // 不存在 就发送请求获取数据
      this.props.getCategoryListAsync();
    }
    // 判断当前是否是修改商品 并且 是否有state数据
    if (!this.isAddProduct() && !this.props.location.state) {
      // 在修改商品页面且state没有值，需要请求数据
      // 获取商品id
      const productId = this.props.match.params.id;
      reqGetProduct(productId)
        .then(res => {
          // 请求完数据之后，数据要展示：更新状态
          // (只有单个组件，就是单个组件state。如果多个组件用，就是redux)
          this.setState({
            product: res
          });
        })
        .catch(err => {
          message.error(err);
        });
    }
  }

  // 判断当前是添加商品/修改商品
  isAddProduct = () => {
    return this.props.location.pathname.indexOf("/update/") === -1;
  };

  submit = e => {
    e.preventDefault();
    // 校验表单并收集数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        const { name, desc, categoryId, price, detail } = values;
        // console.log(detail.toHTML()); // <p>ccc</p> 带标签
        // console.log(detail.toText()); // ccc

        let promise = null;
        const isAddProduct = this.isAddProduct();

        if (isAddProduct) {
          // 发送添加商品请求请求
          promise = reqAddProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML()
          });
        } else {
          // 发送修改商品请求请求
          promise = reqUpdateProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML(),
            // productId: this.props.location.state._id // 问题：如果是直接访问，没有state
            productId: this.props.match.params.id
          });
        }

        promise
          .then(() => {
            message.success(`${isAddProduct ? "添加" : "修改"}商品成功~`);
            // 跳转到商品管理页面(可供用户查看)
            this.props.history.push("/product");
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
  };

  // 处理分类id的问题
  handleCategoryId = (isAddProduct, product) => {
    // 如果是添加商品页面 显示暂无分类
    if (isAddProduct) {
      return "0";
    }
    // 获取redux中所有的分类数据categories
    const { categories } = this.props;
    const {categoryId}=product;

    // 去所有分类数据中查找是否有指定商品的分类数据
    // find() 返回是一个ture的元素 只要有一个找到 就不会继续遍历数组
    const category = categories.find(category => {
      /*
        category._id 指的是分类数据中的id
        categoryId 指的是路由传参的商品数据的分类id
      */
      return category._id === categoryId;
    });

    if (category) {
      // 如果找到了，说明商品数据的分类是存在的
      return categoryId;
    }
    // 没有值，没有找到，说明商品分类被删除掉了
    return "0";
  };

  render() {
    const formItemLayout = {
      labelCol: {
        // 左边文字占有的区域大小
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        // 右边区域占有的大小
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };

    const {
      form: { getFieldDecorator },
      categories,
      location
    } = this.props;

    // 获取路由传递的数据: state 商品数据
    const routeData = location.state;

    const { product } = this.state;

    /*
      数据可以来源于两个方面：
        路由传递的参数： routeData（有值：说明传参了，是对象， 没有值：说明没有传参，是undefined）
        组件请求回来的数据：属于this.state.product
          值为{}（为了避免一上来没有数据时state.name报错，所以初始化为空对象）。说明没有数据
          值为{name, categoryId},才说明数据请求回来了
    */
    // 选择使用：有数据的变量（如果数据不存在就是{}，如果数据存在就是具体数据）
    const state = routeData || product;

    /*
      需要判断当前操作是：添加商品还是修改商品
        1. 如果是添加商品，什么都不操作   /product/add
        2. 如果是修改商品，/product/update/商品id
          需要将Card的title显示成修改商品
          表单需要显示商品内容
      怎么判断？
        通过state判断？ 因为添加商品state是undefined，而修改商品state是{}
          问题: 如果直接访问 修改商品 页面，而不是从商品页面点击修改按钮进来的，state就没有数据
                原因：之所有有state数据，是因为通过点击修改按钮push(xxx, 传参)
        
        最终解决：判断请求地址!
    */
    // 标识：是否是添加商品
    const isAddProduct = this.isAddProduct();

    /* if (pathname.indexOf("/update/") !== -1) {
      isAddProduct = false;
    } */

    return (
      <Card
        title={
          <div>
            <Link to="/product">
              <Icon type="arrow-left" className="go-back" />
            </Link>
            {isAddProduct ? "添加商品" : "修改商品"}
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入商品名称"
                }
              ],
              // 表单的初始值
              initialValue: isAddProduct ? "" : state.name
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ],
              initialValue: isAddProduct ? "" : state.desc
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ],
              initialValue: this.handleCategoryId(isAddProduct,state)
            })(
              <Select placeholder="请选择商品分类">
                <Option key="0" value="0">
                  暂无分类
                </Option>
                {categories.map(category => {
                  return (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "请输入商品价格"
                }
              ],
              initialValue: isAddProduct ? "" : state.price
            })(
              <InputNumber
                // defaultValue={1000} // 默认值
                // 格式化，当输入值的时候，通过formatter进行格式化。 加上 ，号
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                // 输入时如果不是数字（是字母/中文），删除掉
                parser={value => value.replace(/￥\s?|(,*)/g, "")}
                className="product-price"
              />
            )}
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("detail", {
              rules: [
                {
                  required: true,
                  message: "请输入商品详情"
                }
              ],
              // 纯文本 BraftEditor 组件是不能显示的。需要转换成 EditorState。(通过createEditorState)
              initialValue: isAddProduct
                ? ""
                : BraftEditor.createEditorState(state.detail)
            })(<BraftEditor className="product-detail" />)}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default ProductForm;
