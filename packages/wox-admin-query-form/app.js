import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Input, Select, Row, Col, Button, DatePicker } from 'antd';
import WoxQueryForm from './src/index';
import WoxGtourAutoComplete from 'wox-admin-gtour-autocomplete';
import { utils } from './util.js'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

/**
 * Form 业务组件
 */
class InfosForm extends Component {
  constructor (props) {
    super(props)
    try {
      this.includeScenes = this.props.includeScenes ? JSON.parse(this.props.includeScenes) : []
    } catch (error) {
      console.log(error)
    }
    this.state = {
      includeScenes: this.includeScenes
    }
  }

  componentDidMount () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('componentDidMount', values);
      }
    });
  }

  handleSubmit = (e) => {
    const { handleHocSubmit } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.operatTimeStart = values.operatTimeStart.format('YYYY-MM-DD')

        handleHocSubmit(Object.assign({}, values, {
          includeScenes: this.state.includeScenes 
         }));
        console.log('Received values of form: ', values);
      }
    });
  }
 
  poiSearchCallback = (val) => {
    this.setState(val)
  }

  render() {
    const { form, name, sex, operatTimeStart} = this.props;
    const { includeScenes } = this.state
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
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
          <Col span={8}>
            <FormItem
              {...formItemLayout}
              label="性别"
            >
              {
                getFieldDecorator('sex', {
                  initialValue: sex || ''
                })(
                  <Select allowClear>
                    <Option value="male">男性</Option>
                    <Option value="female">女性</Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={'包含景点'}  {...formItemLayout}>
              <WoxGtourAutoComplete 
                urlFn={(v)=>`//192.168.0.19:2001/poi/query/suggest2?keyword=${v}&count=10&dataType=CITY,ISLAND,SCENIC,SIGHT_SPOT`}
                callback={this.poiSearchCallback} 
                initData={includeScenes} 
                keyName='includeScenes'
                formatDataFn={utils.formatPoiDataFn} 
                formatLabelFn={utils.formatPoiLabelFn}
                style={{width: '100%'}}
              />  
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem  {...formItemLayout} label={'操作时间'}>
              {getFieldDecorator('operatTimeStart', {
                initialValue: operatTimeStart ? moment(operatTimeStart, 'YYYY-MM-DD') : ''
              })(
                <DatePicker placeholder='开始时间' format={ 'YYYY-MM-DD' } allowClear/>
              )}
            </FormItem>
          </Col>
            
          <Col span={8}>
              <Button type="primary" htmlType="submit">搜索</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const WrappedInfosForm = Form.create()(InfosForm);

/**
 * 使用高阶组件包裹返回
 */
const QueryForm = WoxQueryForm(WrappedInfosForm);

render(
  <QueryForm />,
  document.getElementById('app')
);
