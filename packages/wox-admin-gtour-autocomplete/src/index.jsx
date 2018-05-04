import React, { Component } from 'react';
import { Select, Spin, Message } from 'antd';
import debounce from 'lodash.debounce';
import reqwest from 'reqwest';

const Option = Select.Option;

export default class WoxGtourAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.fetchData = debounce(this.fetchData, 500);
    this.state = {
      data: [],
      value: [],
      fetching: false
    };
  }

  fetchData = (value) => {
    if (!/^\s*$/.test(value)) {
      const { urlFn, formatDataFn } = this.props;

      this.setState({
        fetching: true
      });
      reqwest({
        url: urlFn(value),
        contentType: 'application/json',
        success: (res) => {
          if (res.rs === 1) {
            const formatData = formatDataFn ? formatDataFn(res.data, value) : res.data;
            this.setState({
              data: formatData,
              fetching: false
            });
          } else {
            Message.error('查询数据失败！', 3);
          }
        }
      })
    }
  }

  handleChange = (value) => {
    const { singleType = false, formatLabelFn, callback } = this.props;

    this.setState({
      data: [],
      fetching: false
    });
    if (singleType && value.length > 0) {
      value = [value[value.length - 1]];
    }
    const formatLabel = formatLabelFn ? formatLabelFn(value) : value; // 修改 label 展示方式
    callback({
      [this.props.keyName]: formatLabel
    });
  }

  render() {
    const { fetching, data } = this.state;

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
        {
          data.map((item, index) => {
            return (
              <Option key={item.key}>{teim.label}</Option>
            );
          })
        }
      </Select>
    );
  }
}
