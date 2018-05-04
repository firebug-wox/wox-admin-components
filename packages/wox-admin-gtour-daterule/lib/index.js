'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _popconfirm = require('antd/lib/popconfirm');

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _badge = require('antd/lib/badge');

var _badge2 = _interopRequireDefault(_badge);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/popconfirm/style');

require('antd/lib/icon/style');

require('antd/lib/date-picker/style');

require('antd/lib/badge/style');

require('antd/lib/message/style');

require('antd/lib/checkbox/style');

require('antd/lib/form/style');

require('antd/lib/select/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);
var Option = _select2.default.Option;
var FormItem = _form2.default.Item;
var CheckboxGroup = _checkbox2.default.Group;
var weekDays = [{
		label: '周一', value: 1
}, {
		label: '周二', value: 2
}, {
		label: '周三', value: 3
}, {
		label: '周四', value: 4
}, {
		label: '周五', value: 5
}, {
		label: '周六', value: 6
}, {
		label: '周日', value: 7
}];

/**
 * 组件名遵循 `Wox` 前缀的规范
 */

var ItemRuleCom = function (_Component) {
		_inherits(ItemRuleCom, _Component);

		function ItemRuleCom(props) {
				_classCallCheck(this, ItemRuleCom);

				var _this = _possibleConstructorReturn(this, (ItemRuleCom.__proto__ || Object.getPrototypeOf(ItemRuleCom)).call(this, props));

				_this.onTypeChange = function (type) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var index = _this.props.num;
						var dateRule = (0, _immutable.fromJS)(_this.props.dateRule).toJS();
						dateRule.type = type;

						switch (type) {
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
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).set(index, dateRule).toJS();
						_this.props.handleCallBack({ dateExpressions: dateExpressions });
				};

				_this.onRangeDateChange = function (key, dateString) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var index = _this.props.num;
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).setIn([index, key], dateString).toJS();
						_this.props.handleCallBack({ dateExpressions: dateExpressions });
				};

				_this.disabledStartDate = function (startValue) {
						var endValue = _this.props.dateRule.endDate;
						if (!startValue || !endValue) {
								return false;
						}
						return startValue.valueOf() > new Date(endValue).getTime();
				};

				_this.disabledEndDate = function (endValue) {
						var startValue = _this.props.dateRule.startDate;
						if (!endValue || !startValue) {
								return false;
						}
						return endValue.valueOf() <= new Date(startValue).getTime();
				};

				_this.handleStartOpenChange = function (status) {
						if (!status) {
								_this.setState({
										endOpen: true
								});
						}
				};

				_this.handleEndOpenChange = function (status) {
						_this.setState({
								endOpen: status
						});
				};

				_this.onIncludeDateChange = function (moment, dateString) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var index = _this.props.num;
						var dateRule = (0, _immutable.fromJS)(_this.props.dateRule).toJS();

						if (dateRule.includeDates.indexOf(dateString) < 0) {
								dateRule.includeDates.push(dateString);
								dateExpressions = (0, _immutable.fromJS)(dateExpressions).set(index, dateRule).toJS();
								_this.props.handleCallBack({
										dateExpressions: dateExpressions
								});
						} else {
								_message2.default.error('您已选择了该日期', 3);
						}
				};

				_this.onExcludeDateChange = function (moment, dateString) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var index = _this.props.num;
						var dateRule = (0, _immutable.fromJS)(_this.props.dateRule).toJS();

						if (dateRule.excludeDates.indexOf(dateString) < 0) {
								dateRule.excludeDates.push(dateString);
								dateExpressions = (0, _immutable.fromJS)(dateExpressions).set(index, dateRule).toJS();
								_this.props.handleCallBack({
										dateExpressions: dateExpressions
								});
						} else {
								_message2.default.error('您已选择了该日期', 3);
						}
				};

				_this.onCheckAllChange = function () {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var dateRule = (0, _immutable.fromJS)(_this.props.dateRule).toJS();
						dateRule.weekDays = dateRule.weekDays.length == 7 ? [] : [1, 2, 3, 4, 5, 6, 7];
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).set(_this.props.num, dateRule).toJS();
						_this.props.handleCallBack({
								dateExpressions: dateExpressions
						});
				};

				_this.onCheckboxChange = function (weekDays) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						var dateRule = (0, _immutable.fromJS)(_this.props.dateRule).toJS();
						dateRule.weekDays = weekDays;
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).set(_this.props.num, dateRule).toJS();
						_this.props.handleCallBack({
								dateExpressions: dateExpressions
						});
				};

				_this.deleteDateList = function (type, index) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).deleteIn([_this.props.num, type, index]).toJS();
						_this.props.handleCallBack({
								dateExpressions: dateExpressions
						});
				};

				_this.deleteDateRule = function (index) {
						var dateExpressions = (0, _immutable.fromJS)(_this.props.dateExpressions).toJS();
						dateExpressions = (0, _immutable.fromJS)(dateExpressions).delete(index).toJS();
						_this.props.handleCallBack({
								dateExpressions: dateExpressions
						});
				};

				_this.state = {
						endOpen: false
				};
				return _this;
		}

		_createClass(ItemRuleCom, [{
				key: 'render',
				value: function render() {
						var _this2 = this;

						var dateRule = this.props.dateRule;

						var checkAll = dateRule.weekDays && dateRule.weekDays.length == 7 ? true : false;
						var startDate = dateRule.startDate ? (0, _moment2.default)(dateRule.startDate, 'YYYY-MM-DD') : null;
						var endDate = dateRule.endDate ? (0, _moment2.default)(dateRule.endDate, 'YYYY-MM-DD') : null;

						return _react2.default.createElement(
								_form2.default,
								{ layout: 'inline', className: cx('item-rule') },
								_react2.default.createElement(
										FormItem,
										{ className: cx('item-rule-th') },
										_react2.default.createElement(_badge2.default, { count: this.props.num + 1, style: { backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', marginRight: "10px" } }),
										_react2.default.createElement(
												_select2.default,
												{ disabled: this.props.disabled || false, value: dateRule.type.toString(), style: { width: '150px' }, onChange: this.onTypeChange },
												_react2.default.createElement(
														Option,
														{ value: '1' },
														'\u8303\u56F4\u65E5\u671F'
												),
												_react2.default.createElement(
														Option,
														{ value: '2' },
														'\u679A\u4E3E\u65E5\u671F'
												),
												_react2.default.createElement(
														Option,
														{ value: '3' },
														'\u6392\u9664\u65E5\u671F'
												)
										)
								),
								dateRule.type == 1 ? _react2.default.createElement(
										FormItem,
										null,
										_react2.default.createElement(_datePicker2.default, {
												disabledDate: this.disabledStartDate,
												value: startDate,
												placeholder: '\u5F00\u59CB\u65F6\u95F4',
												onChange: function onChange(m, s) {
														return _this2.onRangeDateChange('startDate', s);
												},
												onOpenChange: this.handleStartOpenChange,
												style: { marginRight: 5 },
												disabled: this.props.disabled || false
										}),
										_react2.default.createElement(_datePicker2.default, {
												disabledDate: this.disabledEndDate,
												value: endDate,
												placeholder: '\u7ED3\u675F\u65F6\u95F4',
												onChange: function onChange(m, s) {
														return _this2.onRangeDateChange('endDate', s);
												},
												onOpenChange: this.handleEndOpenChange,
												style: { marginRight: 10 },
												open: this.state.endOpen,
												disabled: this.props.disabled || false
										}),
										_react2.default.createElement(
												_checkbox2.default,
												{ disabled: this.props.disabled || false, indeterminate: !checkAll, onChange: this.onCheckAllChange, checked: checkAll },
												'\u5168\u9009'
										),
										_react2.default.createElement(CheckboxGroup, { className: cx('ant-checkbox-group_'), disabled: this.props.disabled || false, options: weekDays, value: dateRule.weekDays, onChange: this.onCheckboxChange })
								) : dateRule.type == 2 ? _react2.default.createElement(
										FormItem,
										{ className: cx('hide-date') },
										_react2.default.createElement(_datePicker2.default, { className: cx('ant-calendar-picker_'), showTime: true, disabled: this.props.disabled || false, onChange: this.onIncludeDateChange, placeholder: '', style: { width: '28px' }, allowClear: false }),
										_react2.default.createElement(
												'ul',
												{ className: cx('date-ul') },
												dateRule.includeDates && dateRule.includeDates.length ? dateRule.includeDates.map(function (value, index) {
														return _react2.default.createElement(
																'li',
																{ key: index },
																_react2.default.createElement(
																		'span',
																		null,
																		value
																),
																_this2.props.disabled ? null : _react2.default.createElement(_icon2.default, { type: 'close', onClick: function onClick() {
																				return _this2.deleteDateList('includeDates', index);
																		} })
														);
												}) : null
										)
								) : _react2.default.createElement(
										FormItem,
										{ className: cx('hide-date') },
										_react2.default.createElement(_datePicker2.default, { className: cx('ant-calendar-picker_'), showTime: true, disabled: this.props.disabled || false, onChange: this.onExcludeDateChange, placeholder: '', style: { width: '28px' }, allowClear: false }),
										_react2.default.createElement(
												'ul',
												{ className: cx('date-ul') },
												dateRule.excludeDates && dateRule.excludeDates.length ? dateRule.excludeDates.map(function (value, index) {
														return _react2.default.createElement(
																'li',
																{ key: index },
																_react2.default.createElement(
																		'span',
																		null,
																		value
																),
																_this2.props.disabled ? null : _react2.default.createElement(_icon2.default, { type: 'close', onClick: function onClick() {
																				return _this2.deleteDateList('excludeDates', index);
																		} })
														);
												}) : null
										)
								),
								this.props.total > 1 && !this.props.disabled ? _react2.default.createElement(
										_popconfirm2.default,
										{ title: '\u786E\u5B9A\u5220\u9664\u8BE5\u6761\u65E5\u671F\u89C4\u5219?', style: { width: '200px' }, onConfirm: function onConfirm() {
														return _this2.deleteDateRule(_this2.props.num);
												}, okText: '\u786E\u8BA4', cancelText: '\u53D6\u6D88' },
										_react2.default.createElement(_icon2.default, { type: 'close', className: cx("close") })
								) : null
						);
				}
		}]);

		return ItemRuleCom;
}(_react.Component);

var WoxDateRule = _form2.default.create()(ItemRuleCom);

exports.default = WoxDateRule;
