'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

var _braftEditor = require('braft-editor');

var _braftEditor2 = _interopRequireDefault(_braftEditor);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

require('braft-editor/dist/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);
var colors = ['#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130'];

/**
 * 组件名遵循 `Wox` 前缀的规范
 */

var WoxMediaEditor = function (_Component) {
  _inherits(WoxMediaEditor, _Component);

  function WoxMediaEditor(props) {
    _classCallCheck(this, WoxMediaEditor);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleEditorChange = function (editorState) {
      if (editorState.toHTML() !== '<p></p>' || !_this.state.comingData) {
        var _this$props$callback;

        if (_this.state.comingData) {
          _this.setState({
            comingData: false
          });
        }
        _this.setState({
          editorState: editorState
        });
        _this.props.callback((_this$props$callback = {}, _this$props$callback[_this.props.keyName || 'value'] = editorState.toHTML(), _this$props$callback));
      }
    };

    _this.myUploadFn = function (param) {
      var fd = new FormData();
      fd.append('file', param.file);

      (0, _axios2.default)({
        method: 'post',
        url: _this.props.url,
        data: fd
      }).then(function (response) {
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url: response.data.data.url
        });
      });
    };

    _this.state = {
      editorState: '',
      comingData: true // 当父级数据第一次到达前为 true
    };
    return _this;
  }

  WoxMediaEditor.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value;

    if (value && prevState.comingData) {
      return {
        editorState: _braftEditor.EditorState.createFrom(value),
        comingData: false
      };
    }
  };

  WoxMediaEditor.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: cx('woxMediaEditor') },
      _react2.default.createElement(_braftEditor2.default, {
        value: this.state.editorState,
        onChange: this.handleEditorChange,
        media: { uploadFn: this.myUploadFn },
        style: this.props.style,
        className: this.props.className,
        colors: colors
      })
    );
  };

  return WoxMediaEditor;
}(_react.Component);

WoxMediaEditor.propTypes = {
  callback: _propTypes2.default.func,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  keyName: _propTypes2.default.string,
  url: _propTypes2.default.string
};

exports.default = WoxMediaEditor;
