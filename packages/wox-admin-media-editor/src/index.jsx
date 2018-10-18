import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import BraftEditor, { EditorState } from 'braft-editor';
import axios from 'axios';
import 'braft-editor/dist/index.css';

const cx = classNames.bind(styles);
const colors = [
  '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff',
  '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79',
  '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47',
  '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130',
];

/**
 * 组件名遵循 `Wox` 前缀的规范
 */
class WoxMediaEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
      comingData: true, // 当父级数据第一次到达前为 true
    }
  }

  handleEditorChange = (editorState) => {
    if (editorState.toHTML() !== '<p></p>' || !this.state.comingData) {
      if (this.state.comingData) {
        this.setState({
          comingData: false
        })
      }
      this.setState({
        editorState: editorState
      });
      this.props.callback({
        [this.props.keyName || 'value']: editorState.toHTML()
      });
    }
  }
  
  myUploadFn = (param) => {
    const fd = new FormData();
    fd.append('file', param.file);

    axios({
      method: 'post',
      url: this.props.url,
      data: fd
    }).then(function (response) {
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: response.data.data.url
      })
    });
  }
  
  static getDerivedStateFromProps(nextProps, prevState) { 
    let value = nextProps.value;

    if (value && prevState.comingData) {
      return {
        editorState: EditorState.createFrom(value),
        comingData: false
      }
    }
  }

  render() {
    return(
      <div className={cx('woxMediaEditor')}>
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleEditorChange}
          media={{uploadFn: this.myUploadFn}}
          style={this.props.style}
          className={this.props.className}
          colors={colors}
        />
      </div>
    )
  }
}

WoxMediaEditor.propTypes = {
  callback: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  keyName: PropTypes.string,
  url: PropTypes.string
};


export default WoxMediaEditor;
