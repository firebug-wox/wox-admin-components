'use strict';

exports.__esModule = true;

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('antd/lib/message/style');

require('antd/lib/row/style');

require('antd/lib/button/style');

require('antd/lib/upload/style');

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

var _reactImageCrop = require('react-image-crop');

var _reactImageCrop2 = _interopRequireDefault(_reactImageCrop);

require('react-image-crop/dist/ReactCrop.css');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);

var WoxCropUpload = function (_Component) {
  _inherits(WoxCropUpload, _Component);

  function WoxCropUpload(props) {
    _classCallCheck(this, WoxCropUpload);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this2);

    var value = _this2.props.value || [];
    _this2.state = {
      fileList: value instanceof Array ? value.map(function (v, i) {
        return {
          uid: -i,
          name: 'logo',
          status: 'done',
          url: v
        };
      }) : [{ uid: -1, name: 'logo', status: 'done', url: value }],
      max: _this2.props.max ? _this2.props.max : 1,
      cropSrc: null,
      crop: _this2.props.crop,
      pixelCrop: '',
      uid: '',
      localImg: true,
      loading: false
    };
    return _this2;
  }

  WoxCropUpload.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if ('value' in nextProps) {
      var value = nextProps.value || [];
      var crop = nextProps.crop;

      var fileList = this.state.fileList.map(function (val) {
        return val.url;
      });
      var max = this.state.max;

      if (JSON.stringify(max > 1 ? value : [value]) !== JSON.stringify(fileList)) {
        this.setState({
          fileList: value instanceof Array ? value.map(function (v, i) {
            return {
              uid: -i, name: 'logo', status: 'done', url: v
            };
          }) : [{ uid: -1, name: 'logo', status: 'done', url: value }]
        });
      }

      if (crop !== this.state.crop) {
        this.setState({
          crop: _extends({}, this.state.crop)
        });
      }
    }
  };

  WoxCropUpload.prototype.render = function render() {
    var _state = this.state,
        fileList = _state.fileList,
        max = _state.max,
        cropSrc = _state.cropSrc,
        crop = _state.crop,
        loading = _state.loading;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _upload2.default,
        {
          multiple: true,
          action: this.props.action,
          listType: 'picture-card',
          beforeUpload: this.beforeUpload,
          fileList: fileList,
          onChange: this.handlePicChange,
          onPreview: this.handlePreview,
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
      ),
      cropSrc && _react2.default.createElement(
        'div',
        { className: cx('layer') },
        _react2.default.createElement(
          'div',
          { className: cx('cropImg') },
          _react2.default.createElement(_reactImageCrop2.default, {
            src: cropSrc,
            crop: crop,
            onImageLoaded: this.onImageLoaded,
            onChange: this.onCropChange
          }),
          _react2.default.createElement(
            _row2.default,
            { className: cx('btn-container') },
            _react2.default.createElement(
              _button2.default,
              {
                type: 'primary',
                style: { marginRight: 20 },
                onClick: this.getCroppedImg,
                loading: loading
              },
              '\u88C1\u526A'
            ),
            _react2.default.createElement(
              _button2.default,
              { type: 'danger', onClick: this.colseLayer },
              '\u53D6\u6D88'
            )
          )
        )
      )
    );
  };

  return WoxCropUpload;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handlePicChange = function (e) {
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
          _this3.triggerChange(list);
        }
      } else if (e.file.status === 'removed') {
        _this3.triggerChange(list);
      }
      var max = _this3.state.max;

      _this3.setState({
        fileList: list.length ? max > 1 ? list : list.splice(-1) : []
      });
    }
  };

  this.beforeUpload = function (file) {
    var _props = _this3.props,
        imgType = _props.imgType,
        imgSize = _props.imgSize;

    var isInclude = imgType.find(function (val) {
      return file.type.split('/')[1] === val;
    });

    if (!isInclude) {
      _message3.default.error('You can only upload ' + imgType.join('/') + ' file!', 3);
      return false;
    }
    var isLt10MB = file.size / 1024 < imgSize;
    if (!isLt10MB) {
      _message3.default.error('Image must smaller than ' + imgSize + 'KB!', 3);
      return false;
    }
    return isInclude && isLt10MB;
  };

  this.handlePreview = function (file) {
    _this3.setState({
      cropSrc: file.thumbUrl || file.url,
      uid: file.uid,
      localImg: file.thumbUrl ? true : false
    });
  };

  this.triggerChange = function (list) {
    var onChange = _this3.props.onChange;

    if (onChange) {
      var max = _this3.state.max;

      onChange(max > 1 ? list.map(function (val) {
        return val.url;
      }) : list.length ? list[list.length - 1].url : '');
    }
  };

  this.getCroppedImg = function () {
    _this3.setState({
      loading: true
    });
    var _state2 = _this3.state,
        crop = _state2.crop,
        pixelCrop = _state2.pixelCrop,
        uid = _state2.uid,
        fileList = _state2.fileList,
        max = _state2.max,
        localImg = _state2.localImg,
        cropSrc = _state2.cropSrc;
    var _props2 = _this3.props,
        action = _props2.action,
        onChange = _props2.onChange,
        value = _props2.value;

    var _this = _this3;
    if (_this3.imageRef && crop.width && crop.height) {
      var canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      var ctx = canvas.getContext('2d');
      var image = void 0;
      if (localImg) {
        image = _this3.imageRef;
        _drawImage();
      } else {
        // 如果图片不是base64， canvas 画布拿图片时会出现 跨域问题 设置 cros
        image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = cropSrc;
        image.onload = function () {
          _drawImage();
        };
      }
      function _drawImage() {
        ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
        // 把裁剪的图片转为 blob 文件 上传到后台服务器
        canvas.toBlob(function (blob) {
          var formData = new FormData();
          formData.append('cropImg', blob);
          (0, _axios2.default)({
            data: formData,
            method: 'post',
            url: action,
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(function (res) {
            var data = res.data;
            var list = max > 1 ? value : [value];

            if (data.rs == 1) {
              fileList.forEach(function (item, idx) {
                if (item.uid == uid) {
                  list[idx] = data.data.url;
                }
              });
              _this.setState({
                fileList: fileList
              });
              onChange(max > 1 ? list.map(function (val) {
                return val;
              }) : list.length ? list[list.length - 1] : '');
              _message3.default.success('裁剪成功', 2);
            } else {
              _message3.default.success('\u88C1\u526A\u5931\u8D25' + data.msg, 2);
            }
            _this.setState({
              cropSrc: null,
              crop: _this.props.crop,
              loading: false
            });
          });
        }, 'image/jpeg');
      }
    }
  };

  this.onImageLoaded = function (image, pixelCrop) {
    _this3.imageRef = image;
  };

  this.onCropChange = function (crop, pixelCrop) {
    _this3.setState({ crop: crop, pixelCrop: pixelCrop });
  };

  this.colseLayer = function () {
    _this3.setState({
      cropSrc: null,
      crop: _this3.props.crop
    });
  };
};

WoxCropUpload.propTypes = {
  crop: _propTypes2.default.object,
  action: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  imgType: _propTypes2.default.array,
  imgSize: _propTypes2.default.number,
  max: _propTypes2.default.number
};

WoxCropUpload.defaultProps = {
  imgSize: 10240,
  imgType: ['jpg', 'png', 'jpeg', 'gif'],
  crop: {
    aspect: 5 / 3,
    width: 100,
    x: 0,
    y: 0
  }
};

exports.default = WoxCropUpload;
