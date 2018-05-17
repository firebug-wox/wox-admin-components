import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

class WoxUpload extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || [];
    this.state = {
      fileList: value instanceof Array ? value.map((v, i) => ({
        uid: -i, name: 'logo', status: 'done', url: v
      })) : [{ uid: -1, name: 'logo', status: 'done', url: value }],
      max: this.props.max ? this.props.max : 1
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
    const defaultType = ['jpeg', 'png', 'jpg', 'gif'];
    const isInclude = (imgType || defaultType).find(val => {
      return file.type.split('/')[1] === val;
    });

    if (!isInclude) {
      message.error(`You can only upload ${(imgType || defaultType).join('/')} file!`, 3);
      return false;
    }
    const isLt1MB = file.size / 1024 < (imgSize || 1024);
    if (!isLt1MB) {
      message.error(`Image must smaller than ${imgSize || 1024}KB!`, 3);
      return false;
    }
    return isInclude && isLt1MB;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      const fileList = this.state.fileList.map(val => val.url);
      const max = this.state.max;

      if (JSON.stringify(max > 1 ? value : [value]) === JSON.stringify(fileList)) {
        return;
      }
      this.setState({
        fileList: value instanceof Array ? value.map((v, i) => ({
          uid: -i, name: 'logo', status: 'done', url: v
        })) : [{ uid: -1, name: 'logo', status: 'done', url: value }]
      });
    }
  }

  triggerChange = (list) => {
    const onChange = this.props.onChange;

    if (onChange) {
      const { max } = this.state;
      onChange(max > 1 ? list.map(val=> val.url) : (list.length ? list[list.length - 1].url : ''));
    }
  }

  render() {
    const { fileList, max } = this.state;

    return(
      <Upload
        action={this.props.action}
        listType="picture-card"
        beforeUpload={this.beforeUpload}
        fileList={fileList}
        onChange={this.handlePicChange}
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
    )
  }
}

export default WoxUpload;
