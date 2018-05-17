'use strict';

exports.__esModule = true;

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('antd/lib/message/style');

require('antd/lib/upload/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dragger = _upload2.default.Dragger;

var WoxUploadFiles = function (_Component) {
  _inherits(WoxUploadFiles, _Component);

  function WoxUploadFiles(props) {
    _classCallCheck(this, WoxUploadFiles);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handlePicChange = function (e) {
      var list = e.fileList.map(function (val) {
        var req = val.response;

        if (req) {
          if (req.success) {
            val.url = req.results[0].fullUrl;
            val.name = req.results[0].originName;
          } else {
            _message3.default.error('上传文件出错', 3);
          }
        }
        return val;
      });

      if (e.file.status) {
        if (e.file.status === 'done') {
          list = list.filter(function (val) {
            return val.response ? val.response.success : true;
          });
          if (e.file.response.success) {
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

    _this.triggerChange = function (list) {
      var onChange = _this.props.onChange;

      if (onChange) {
        var max = _this.state.max;

        onChange(max > 1 ? list.map(function (val) {
          return {
            fileUrl: val.url,
            fileName: val.name
          };
        }) : list.length ? {
          fileUrl: list[list.length - 1].url,
          fileName: list[list.length - 1].name
        } : {});
      }
    };

    var value = _this.props.value || [];
    _this.state = {
      fileList: value instanceof Array ? value.map(function (item, i) {
        return {
          uid: -i,
          name: (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.fileName : '\u6587\u4EF6' + (i + 1),
          status: 'done',
          url: (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.fileUrl : item
        };
      }) : [{
        uid: -1,
        name: (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.fileName : '文件1',
        status: 'done',
        url: (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.fileUrl : value
      }],
      max: _this.props.max ? _this.props.max : 1
    };
    return _this;
  }

  WoxUploadFiles.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = nextProps.value || [];
      var fileList = this.state.fileList.map(function (val) {
        return val.url;
      });
      var max = this.state.max;
      var urlList = void 0;

      if (max > 1) {
        urlList = value.map(function (val) {
          return val.fileUrl;
        });
      } else {
        urlList = [value.fileUrl];
      }
      if (JSON.stringify(urlList) === JSON.stringify(fileList)) {
        return;
      }
      this.setState({
        fileList: value instanceof Array ? value.map(function (item, i) {
          return {
            uid: -i,
            name: (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.fileName : '\u6587\u4EF6' + (i + 1),
            status: 'done',
            url: (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.fileUrl : item
          };
        }) : [{
          uid: -1,
          name: (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.fileName : '文件1',
          status: 'done',
          url: (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.fileUrl : value
        }]
      });
    }
  };

  WoxUploadFiles.prototype.render = function render() {
    var fileList = this.state.fileList;
    var _props = this.props,
        action = _props.action,
        text = _props.text,
        data = _props.data,
        style = _props.style;


    return _react2.default.createElement(
      Dragger,
      {
        action: action,
        listType: 'text',
        fileList: fileList,
        onChange: this.handlePicChange,
        data: data,
        style: style
      },
      _react2.default.createElement(
        'p',
        null,
        text
      )
    );
  };

  return WoxUploadFiles;
}(_react.Component);

exports.default = WoxUploadFiles;
