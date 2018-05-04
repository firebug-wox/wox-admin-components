import React, { Component } from 'react';
import { Select, Form, Badge, DatePicker, Checkbox, Icon, Message, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import moment from 'moment';
import { fromJS } from 'immutable';

const cx = classNames.bind(styles);
const Option = Select.Option;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const weekDays = [
  {
    label: '周一', value: 1
  },
  {
    label: '周二', value: 2
  },
  {
    label: '周三', value: 3
  },
  {
    label: '周四', value: 4
  },
  {
    label: '周五', value: 5
  },
  {
    label: '周六', value: 6
  },
  {
    label: '周日', value: 7
  }
];

/**
 * 组件名遵循 `Wox` 前缀的规范
 */
class ItemRuleCom extends Component {
  constructor(props) {
    super(props);

    this.state={
      endOpen: false
    };
  }

  onTypeChange = (type) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let index = this.props.num;
	  let dateRule = fromJS( this.props.dateRule ).toJS();
	  dateRule.type = type;

    switch(type) {
    case '1':
	    dateRule.includeDates = null;
	    dateRule.excludeDates = null;
	    dateRule.startDate = '';
	    dateRule.endDate = '';
	    dateRule.weekDays = [];
	    break;
	  case '2':
	    dateRule.startDate = null;
	    dateRule.endDate = null;
	    dateRule.weekDays = null;
	    dateRule.excludeDates = null;
	    dateRule.includeDates = [];
	    break;
	  case '3':
	    dateRule.startDate = null;
	    dateRule.endDate = null;
	    dateRule.weekDays = null;
	    dateRule.includeDates = null;
	    dateRule.excludeDates = [];
	    break;
	  }
	  dateExpressions = fromJS(dateExpressions).set(index, dateRule).toJS();
	  this.props.handleCallBack({ dateExpressions });
  }

  onRangeDateChange = (key, dateString) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let index = this.props.num;
	  dateExpressions = fromJS(dateExpressions).setIn([index, key], dateString).toJS();
	  this.props.handleCallBack({ dateExpressions });
  }

  disabledStartDate = (startValue) => {
    const endValue = this.props.dateRule.endDate;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > (new Date(endValue)).getTime();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.props.dateRule.startDate;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= (new Date(startValue)).getTime();
  }

  handleStartOpenChange = (status) => {
    if (!status) {
      this.setState({
        endOpen: true
      });
    }
  }

  handleEndOpenChange = (status) => {
    this.setState({
      endOpen: status
    });
  }

  onIncludeDateChange = (moment, dateString) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let index = this.props.num;
	  let dateRule = fromJS(this.props.dateRule).toJS();

    if (dateRule.includeDates.indexOf(dateString) < 0) {
	    dateRule.includeDates.push(dateString);
	    dateExpressions = fromJS(dateExpressions).set(index, dateRule).toJS();
      this.props.handleCallBack({
        dateExpressions
      });
	  } else {
	    Message.error('您已选择了该日期', 3);
	  }
  }

  onExcludeDateChange = (moment, dateString) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let index = this.props.num;
	  let dateRule = fromJS(this.props.dateRule).toJS();

    if (dateRule.excludeDates.indexOf(dateString) < 0) {
	    dateRule.excludeDates.push(dateString);
	    dateExpressions = fromJS(dateExpressions).set(index, dateRule).toJS();
      this.props.handleCallBack({
        dateExpressions
      });
	  } else {
	    Message.error('您已选择了该日期', 3);
	  }
  }

  onCheckAllChange = () => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let dateRule = fromJS(this.props.dateRule).toJS();
	  dateRule.weekDays = dateRule.weekDays.length == 7 ? [] : [1 , 2 ,3 ,4 ,5 , 6, 7];
	  dateExpressions = fromJS(dateExpressions).set(this.props.num, dateRule).toJS();
    this.props.handleCallBack({
      dateExpressions
    });
  }

  onCheckboxChange = (weekDays) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  let dateRule = fromJS(this.props.dateRule).toJS();
	  dateRule.weekDays = weekDays;
	  dateExpressions = fromJS(dateExpressions).set(this.props.num, dateRule).toJS();
    this.props.handleCallBack({
      dateExpressions
    });
  }

  deleteDateList = (type, index) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  dateExpressions = fromJS(dateExpressions).deleteIn([this.props.num, type, index]).toJS();
    this.props.handleCallBack({
      dateExpressions
    });
  }

  deleteDateRule = (index) => {
	  let dateExpressions = fromJS(this.props.dateExpressions).toJS();
	  dateExpressions = fromJS(dateExpressions).delete(index).toJS();
    this.props.handleCallBack({
      dateExpressions
    });
  }

  render() {
	  const { dateRule } = this.props;
	  const checkAll = dateRule.weekDays && dateRule.weekDays.length == 7 ? true : false;
	  const startDate = dateRule.startDate ? moment(dateRule.startDate, 'YYYY-MM-DD') : null;
	  const endDate = dateRule.endDate ? moment(dateRule.endDate, 'YYYY-MM-DD') : null;

	  return (
	    <Form layout="inline" className={cx('item-rule')}>
	      <FormItem className={cx('item-rule-th')}>
	        <Badge count={this.props.num + 1} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset',marginRight:"10px" }} />
	        <Select disabled={ this.props.disabled || false } value={dateRule.type.toString()} style={{ width: '150px' }}  onChange={this.onTypeChange}>
	          <Option value="1">范围日期</Option>
	          <Option value="2">枚举日期</Option>
	          <Option value="3">排除日期</Option>
	        </Select>
	      </FormItem>
	      {
	        dateRule.type == 1 ?
	          (<FormItem>
	            <DatePicker
	              disabledDate={this.disabledStartDate}
	              value={startDate}
	              placeholder="开始时间"
	              onChange={(m,s)=>this.onRangeDateChange('startDate',s)}
	              onOpenChange={this.handleStartOpenChange}
	              style={{marginRight: 5}}
	              disabled={ this.props.disabled || false }
	            />
	            <DatePicker
	              disabledDate={this.disabledEndDate}
	              value={endDate}
	              placeholder="结束时间"
	              onChange={(m,s)=>this.onRangeDateChange('endDate',s)}
	              onOpenChange={this.handleEndOpenChange}
	              style={{marginRight: 10}}
	              open={this.state.endOpen}
	              disabled={ this.props.disabled || false }
	            />
	            <Checkbox  disabled={ this.props.disabled || false } indeterminate={!checkAll} onChange={this.onCheckAllChange} checked={checkAll} >全选</Checkbox>
	            <CheckboxGroup className={cx('ant-checkbox-group_')}  disabled={ this.props.disabled || false } options={ weekDays } value={dateRule.weekDays} onChange={this.onCheckboxChange}/>
	          </FormItem>)
	          : dateRule.type == 2 ?
	            (<FormItem className={cx('hide-date')}>
	              <DatePicker className={cx('ant-calendar-picker_')} showTime disabled={ this.props.disabled || false }  onChange={this.onIncludeDateChange} placeholder="" style={{width:'28px'}} allowClear={false}/>
	              <ul className={cx('date-ul')}>
	                {
	                  dateRule.includeDates && dateRule.includeDates.length ? dateRule.includeDates.map( ( value, index ) => (
	                    <li key={index}>
	                      <span>{value}</span>
	                      {
	                        this.props.disabled ? null : <Icon type="close" onClick={() => this.deleteDateList( 'includeDates', index )} />
	                      }
	                    </li>
	                  )) : null
	                }
	              </ul>
	            </FormItem>) :
	            (<FormItem className={cx('hide-date')}>
	              <DatePicker className={cx('ant-calendar-picker_')} showTime disabled={ this.props.disabled || false } onChange={this.onExcludeDateChange} placeholder="" style={{width:'28px'}} allowClear={false}/>
	              <ul className={cx('date-ul')}>
	                {
	                  dateRule.excludeDates && dateRule.excludeDates.length ? dateRule.excludeDates.map( ( value, index ) => (
	                    <li key={index}>
	                      <span>{value}</span>
	                      {
	                        this.props.disabled ? null : <Icon type="close" onClick={() => this.deleteDateList( 'excludeDates', index )} />
	                      }
	                    </li>

	                  )) : null
	                }
	              </ul>
	            </FormItem>)
	      }
	      {
	        this.props.total > 1 && !this.props.disabled ?
	          (<Popconfirm title="确定删除该条日期规则?" style={{width:'200px'}} onConfirm={ () => this.deleteDateRule( this.props.num ) }  okText="确认" cancelText="取消">
    						<Icon type="close" className={cx("close")}/>
  					</Popconfirm>) : null
	      }
	    </Form>
	  );
  }
}

const WoxDateRule = Form.create()(ItemRuleCom);

export default WoxDateRule;
