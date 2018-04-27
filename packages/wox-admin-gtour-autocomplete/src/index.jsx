/**
 * urlFn[Function]					          // 数据请求url参数拼接函数
 * callback[Function]					        // 回调函数
 * initData[Array[Object]] : {key:xxx, vlabel: xxx}  	// 初始传入数据
 * keyName[String]  					        // 返回数据的key值
 * singleType[Boolean]					      // 是否单选模式，初始传入
 * disabled[Boolean]					        // 是否只读
 * formatDataFn[function]             // 格式化获取数据函数
 * formatLabelFn[function]            // 格式化展示数据函数
**/

import React, { Component } from 'react';
import { Select, Spin, Message } from 'antd';
import debounce from 'lodash.debounce';
import reqwest from 'reqwest';

const Option = Select.Option;

export default class WoxGtourAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.fetchData = debounce(this.fetchData, 500);
    this.state = { data: [], value: [], fetching: false };
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  fetchData(value) {
    if( !/^\s*$/.test( value ) ){
      this.setState({ fetching: true });
      const _this = this, { urlFn, formatDataFn } = this.props;
      reqwest({
        url: urlFn(value),
        contentType: 'application/json',
        success: function( res ){
          if( res.rs === 1 ){
            const formatData = formatDataFn ? formatDataFn(res.data, value) : res.data;
            _this.setState({ data: formatData, fetching: false });
          }else{
            Message.error('查询数据失败！', 3);
          }
        }
      })
    }
  }
  handleChange (value) {
    this.setState({data: [], fetching: false });
    const { singleType = false, formatLabelFn, callback } = this.props;
    if( singleType && value.length > 0 ){
      value = [ value[value.length - 1] ];
    }
    // 修改 label 展示方式
    const formatLabel = formatLabelFn ? formatLabelFn(value) : value;
    callback({ [this.props.keyName]: formatLabel});
  }
  render() {
    let { fetching, data } = this.state;
    return (
      <Select
        mode="multiple"
        labelInValue
        value={this.props.initData || []}
        placeholder={this.props.placeholder || '搜索'}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchData}
        onChange={this.handleChange}
        disabled={!!this.props.disabled}
        style={{width: '600px', ...( this.props.style || {} )}}
      >
        {data.map((d,i) => <Option key={d.key}>{d.label}</Option>)}
      </Select>
    );
  }
}
