'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/upload/style');

require('antd/lib/icon/style');

require('antd/lib/message/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);

var WoxUpload = function (_Component) {
  _inherits(WoxUpload, _Component);

  function WoxUpload(props) {
    _classCallCheck(this, WoxUpload);

    var _this = _possibleConstructorReturn(this, (WoxUpload.__proto__ || Object.getPrototypeOf(WoxUpload)).call(this, props));

    _this.handlePicChange = function (e) {
      var list = e.fileList.map(function (val) {
        var req = val.response;

        if (req) {
          if (req.rs === 1) {
            val.url = val.response.data.url;
          } else {
            _message3.default.error(val.response.msg, 3);
          }
        }
        return val;
      });

      if (e.file.status) {
        if (e.file.status === 'done') {
          list = list.filter(function (val) {
            return val.response ? val.response.rs === 1 : true;
          });
          if (e.file.response.rs === 1) {
            _this.triggerChange(list);
          }
        } else if (e.file.status === 'removed') {
          _this.triggerChange(list);
        }
        var max = _this.state.max;

        _this.setState({
          fileList: list.length ? max > 1 ? list : list.splice(-1) : []
        });
      }
    };

    _this.beforeUpload = function (file) {
      var _this$props = _this.props,
          imgType = _this$props.imgType,
          imgSize = _this$props.imgSize;

      var defaultType = ['jpeg', 'png', 'jpg', 'gif'];
      var isInclude = (imgType || defaultType).find(function (val) {
        return file.type.split('/')[1] === val;
      });

      if (!isInclude) {
        _message3.default.error('You can only upload ' + (imgType || defaultType).join('/') + ' file!', 3);
        return false;
      }
      var isLt1MB = file.size / 1024 < (imgSize || 1024);
      if (!isLt1MB) {
        _message3.default.error('Image must smaller than ' + (imgSize || 1024) + 'KB!', 3);
        return false;
      }
      return isInclude && isLt1MB;
    };

    _this.triggerChange = function (list) {
      var onChange = _this.props.onChange;

      if (onChange) {
        var max = _this.state.max;

        onChange(max > 1 ? list.map(function (val) {
          return val.url;
        }) : list.length ? list[list.length - 1].url : '');
      }
    };

    var value = _this.props.value || [];
    _this.state = {
      fileList: value instanceof Array ? value.map(function (v, i) {
        return {
          uid: -i, name: 'logo', status: 'done', url: v
        };
      }) : [{ uid: -1, name: 'logo', status: 'done', url: value }],
      max: _this.props.max ? _this.props.max : 1
    };
    return _this;
  }

  _createClass(WoxUpload, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = nextProps.value || [];
        var fileList = this.state.fileList.map(function (val) {
          return val.url;
        });
        var max = this.state.max;

        if (JSON.stringify(max > 1 ? value : [value]) === JSON.stringify(fileList)) {
          return;
        }
        this.setState({
          fileList: value instanceof Array ? value.map(function (v, i) {
            return {
              uid: -i, name: 'logo', status: 'done', url: v
            };
          }) : [{ uid: -1, name: 'logo', status: 'done', url: value }]
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          fileList = _state.fileList,
          max = _state.max;


      return _react2.default.createElement(
        _upload2.default,
        {
          action: this.props.action,
          listType: 'picture-card',
          beforeUpload: this.beforeUpload,
          fileList: fileList,
          onChange: this.handlePicChange,
          className: max === 1 && fileList.length ? cx('wox-reset-upload') : cx('wox-upload')
        },
        max === 1 && fileList.length ? _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_icon2.default, { type: 'cloud-upload', style: { fontSize: '18px' } }),
          '\u91CD\u65B0\u4E0A\u4F20'
        ) : fileList.length < max ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_icon2.default, { type: 'plus' }),
          _react2.default.createElement(
            'div',
            { className: 'ant-upload-text' },
            '\u4E0A\u4F20'
          )
        ) : null
      );
    }
  }]);

  return WoxUpload;
}(_react.Component);

exports.default = WoxUpload;
