import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message, Button, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const cx = classNames.bind(styles);

class WoxCropUpload extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || [];
    this.state = {
      fileList: value instanceof Array ? 
        value.map((v, i) => ({
          uid: -i, 
          name: 'logo', 
          status: 'done', 
          url: v
        })) 
        : [{ uid: -1, name: 'logo', status: 'done', url: value }],
      max: this.props.max ? this.props.max : 1,
      cropSrc: null,
      crop: this.props.crop,
      pixelCrop: '',
      uid: '',
      localImg: true
    };
  }

  handlePicChange = (e) => {
    let list = e.fileList.map((val) => {
      const req = val.response;

      if (req) {
        if (req.rs === 1) {
          val.url = val.response.data.url;
        } else {
          message.error(val.response.msg, 3);
        }
      }
      return val;
    });

    if (e.file.status) {
      if (e.file.status === 'done') {
        list = list.filter(val => val.response ? val.response.rs === 1 : true);
        if (e.file.response.rs === 1) {
          this.triggerChange(list);
        }
      } else if (e.file.status === 'removed') {
        this.triggerChange(list);
      }
      const { max } = this.state;
      this.setState({
        fileList: list.length ? (max > 1 ? list : list.splice(-1)) : []
      });
    }
  }

  beforeUpload = (file) => {
    const { imgType, imgSize } = this.props;
    const isInclude = (imgType).find(val => {
      return file.type.split('/')[1] === val;
    });

    if (!isInclude) {
      message.error(`You can only upload ${(imgType).join('/')} file!`, 3);
      return false;
    }
    const isLt10MB = file.size / 1024 < (imgSize);
    if (!isLt10MB) {
      message.error(`Image must smaller than ${imgSize}KB!`, 3);
      return false;
    }
    return isInclude && isLt10MB;
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) { 
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      const crop = nextProps.crop;

      const fileList = this.state.fileList.map(val => val.url);
      const max = this.state.max;

      if (JSON.stringify(max > 1 ? value : [value]) !== JSON.stringify(fileList)) {
        this.setState({
          fileList: value instanceof Array ? value.map((v, i) => ({
            uid: -i, name: 'logo', status: 'done', url: v
          })) : [{ uid: -1, name: 'logo', status: 'done', url: value }]
        });
      }
      
      if(crop !== this.state.crop) {
        this.setState({
          crop: {
            ...this.state.crop,
          }
        });
      }
    }
  }

  handlePreview = (file) => {
    this.setState({
      cropSrc: file.thumbUrl || file.url,
      uid: file.uid,
      localImg: file.thumbUrl ? true : false
    })
  }

  triggerChange = (list) => {
    const onChange = this.props.onChange;

    if (onChange) {
      const { max } = this.state;
      onChange(max > 1 ? list.map(val=> val.url) : (list.length ? list[list.length - 1].url : ''));
    }
  }

  getCroppedImg = () => {
    const { crop, pixelCrop, uid, fileList, max, localImg, cropSrc} = this.state;
    const { action, onChange, value } = this.props;
    const _this = this;
    if (this.imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      let image;
      if (localImg) {     
        image = this.imageRef;
        drawImage();
      } else {  // 如果图片不是base64， canvas 画布拿图片时会出现 跨域问题 设置 cros
        image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = cropSrc;
        image.onload = () => { 
          drawImage();
        }
      }
      function drawImage() {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height,
        );
        // 把裁剪的图片转为 blob 文件 上传到后台服务器
        canvas.toBlob(blob => {
          const formData = new FormData();
          formData.append('cropImg', blob);
          axios({
            data: formData,
            method: 'post',
            url: action,
            headers:{'Content-Type': 'multipart/form-data'},
          }).then(res => {
            const data = res.data;
            var list = max > 1 ? value : [value];
  
            if(data.rs == 1) {
              fileList.forEach((item, idx) => {
                if (item.uid == uid) {
                  list[idx] = data.data.url;
                }
              });
              _this.setState({
                fileList: fileList,
              });
              onChange(max > 1 ? list.map(val=> val) : (list.length ? list[list.length - 1] : ''));
              message.success('裁剪成功', 2);
            }else {
              message.success(`裁剪失败${data.msg}`, 2);
            }
            _this.setState({
              cropSrc: null,
              crop: _this.props.crop
            })
          });
        }, 'image/jpeg');
      }
    }
  }

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  }

  onCropChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  }

  colseLayer = () => {
    this.setState({ 
      cropSrc: null,
      crop: this.props.crop
    });
  }

  render() {
    const { fileList, max, cropSrc,  crop} = this.state;

    return(
      <div>
        <Upload
          multiple={true}
          action={this.props.action}
          listType="picture-card"
          beforeUpload={this.beforeUpload}
          fileList={fileList}
          onChange={this.handlePicChange}
          onPreview={this.handlePreview}
          className={max === 1 && fileList.length ? cx('wox-reset-upload') : cx('wox-upload')}
        >
          {
            max === 1 && fileList.length ? (
              <span><Icon type="cloud-upload" style={{fontSize: '18px'}} />重新上传</span>
            ) : (
              fileList.length < max ? (
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传</div>
                </div>
              ) : null
            )
          }
        </Upload>
        {cropSrc && (
          <div className={cx('layer')}>
            <div className={cx('cropImg')}>
              <ReactCrop
                src={cropSrc}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onChange={this.onCropChange}
              />
              <Row className={cx('btn-container')}>
                <Button 
                  type="primary"
                  style={{marginRight: 20}}
                  onClick={this.getCroppedImg}
                >
                  裁剪
                </Button>
                <Button type="danger" onClick={this.colseLayer}>取消</Button>
              </Row>
            </div>
          </div>
        )}
      </div>
    )
  }
}

WoxCropUpload.propTypes = {
  crop: PropTypes.object,
  action: PropTypes.string,
  onChange: PropTypes.func, 
  imgType: PropTypes.array,
  imgSize: PropTypes.number,
  max: PropTypes.number
};

WoxCropUpload.defaultProps = {
  imgSize: 10240,
  imgType: ['jpg', 'png', 'jpeg', 'gif'],
  crop: {
    aspect: 5/3,
    width: 100,
    x: 0,
    y: 0,
  }
};

export default WoxCropUpload;



