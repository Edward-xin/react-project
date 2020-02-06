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
import { connect } from "react-redux";
import { getCategoryListAsync } from "$redux/actions";
import { reqAddProduct } from "$api";

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
class AddProduct extends Component {
  // 因为数据只要请求一次
  componentDidMount() {
    // 如果已经redux里已经有分类数据 就不需要再请求一次
    if (!this.props.categories.length) {
      // 不存在 就发送请求获取数据
      this.props.getCategoryListAsync();
    }
  }

  submit = e => {
    e.preventDefault();
    // 校验表单并收集数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        const { name, desc, categoryId, price, datail } = values;
        // console.log(detail.toHTML()); // <p>ccc</p> 带标签
        // console.log(detail.toText()); // ccc

        // 发送请求
        reqAddProduct({ name, desc, categoryId, price, datail })
          .then(() => {
            message.success("添加商品成功~");
            // 跳转到商品管理页面(可供用户查看)
            this.props.history.push('/product');
          })
          .catch(err => {
            message.error(err);
          });
      }
    });
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
      categories
    } = this.props;

    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" className="go-back" />
            添加商品
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
              ]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              rules: [
                {
                  required: true,
                  message: "请输入商品描述"
                }
              ]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId", {
              rules: [
                {
                  required: true,
                  message: "请选择商品分类"
                }
              ]
              // initialValue: 1, // 默认值
            })(
              <Select placeholder="请选择商品分类">
                {categories.map(category => {
                  return (
                    <Option keye={category._id} value={category._id}>
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
              ]
            })(
              <InputNumber
                // defaultValue={1000} // 默认值
                // 格式化，当输入值的时候，通过formatter进行格式化。 加上 ，号
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                // 输入时如果不是数字（是字母/中文），删除掉
                parser={value => value.replace(/\￥\s?|(,*)/g, "")}
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
              ]
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

export default AddProduct;
