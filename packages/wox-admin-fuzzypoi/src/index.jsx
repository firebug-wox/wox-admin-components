import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Spin, Message } from 'antd';
import debounce from 'lodash.debounce';
import reqwest from 'reqwest';
import './style.mod.less';

/**
 * 组件名遵循 `Wox` 前缀的规范
 */
const Option = Select.Option;
class WoxFuzzPoi extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchData = debounce(this.fetchData, 500);
    this.state = {
      data: [],
      value: [],
      fetching: false,
    }
  }
  fetchData (value) {
    if( /^\s*$/.test( value ) ){
      this.setState({
        data: [],
        fetching: false,
      });
      return;
    }
    this.setState({ fetching: true });
    var _this = this;
    reqwest({
      url:`${this.props.host}/poi/query/suggest?keyword=${ value }&count=${this.props.count || 10}&dataType=${this.props.dataType || ''}`,
      success: function( res ){
        if( res.rs === 1 ){
          let data = res.data.map( v => ({
            key: v.code,
            label: `${v.code} | ${v.cnName}`,
          }));
          _this.setState({ data, fetching: false });
        }else{
          Message.error('查询数据失败！', 3);
        }
      }
    })
  }
  handleChange (value) {
    this.setState({data: [], fetching: false });
    if( this.props.singleType && value.length > 0 ){
      value = [ value[value.length - 1] ];
    }
    this.props.callback({ [this.props.keyName]: value});
  }
  render() {
    let { fetching, data } = this.state;
    return (
      <Select
        mode='multiple'
        labelInValue
        value={this.props.initData || []}
        placeholder={this.props.placeholder || '搜索'}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchData.bind(this)}
        onChange={this.handleChange.bind(this)}
        disabled={!!this.props.disabled}
        style={{width: '600px', ...( this.props.style  )}}
      >
        {data.map((d,i) => <Option key={d.key}>{d.label}</Option>)} 
      </Select>
    );
  }
}

WoxFuzzPoi.propTypes = {
  callback: PropTypes.func.isRequired,
  dataType: PropTypes.string,
  count: PropTypes.number,
  initData: PropTypes.arrayOf(PropTypes.object),
  singleType: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  host: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
};

WoxFuzzPoi.defaultProps = {
  dataType: [],
  initData: [],
  count: 10,
  singleType: false,
  disabled: false,
  style: {},
  placeholder: '搜索',
};

export default WoxFuzzPoi;
