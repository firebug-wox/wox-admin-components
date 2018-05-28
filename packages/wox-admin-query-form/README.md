# Query Form [![image](https://img.shields.io/npm/v/wox-admin-query-form.svg)](https://www.npmjs.com/package/wox-admin-query-form)

> 表单参数联动高阶组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| handleHocSubmit | 将请求数据拼接到 URL | Function | 无 |

## Usage

#### 详情案例请看 app.js

```
import woxAdminQueryFrom from 'wox-admin-query-form';

class ProductList extends Component {
  handleSubmit = (values) => {
    this.props.handleHocSubmit(Object.assign({},...values,));    // 高阶组件内部方法 将请求数据拼接到 URL
  }

   return (
     const { name } = this.props;    //从高阶组件 woxAdminQueryFrom 拿到URL 的参数

      <Form onSubmit={this.handleSubmit} style={{paddingTop: '20px'}}>
        <Row>
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="名字"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name || ''
                })(
                  <Input />
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row span={8}>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Row>
      </Form>
    );
}

const QueryForm = woxAdminQueryFrom(Form);   //使用高阶组件包裹
export default QueryForm; 
```
