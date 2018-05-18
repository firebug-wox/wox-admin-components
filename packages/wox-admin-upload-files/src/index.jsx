import React, { Component } from 'react';
import { Upload, message } from 'antd';

const Dragger = Upload.Dragger;

class WoxUploadFiles extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || [];
    this.state = {
      fileList: value instanceof Array ? 
        value.map((item, i) => ({
          uid: -i,
          name: typeof item === 'object' ? item.fileName : `文件${i+1}`,
          status: 'done', 
          url: typeof item === 'object' ? item.fileUrl : item
        })) 
        : [{  
          uid: -1,
          name: typeof value === 'object' ? value.fileName : '文件1',
          status: 'done',
          url: typeof value === 'object' ? value.fileUrl : value,
        }],
      max: this.props.max ? this.props.max : 1
    };
  }

  handlePicChange = (e) => {
    let list = e.fileList.map((val) => {
      const req = val.response;

      if (req) {
        if (req.success) {
          val.url = req.results[0].fullUrl;
          val.name = req.results[0].originName;
        } else {
          message.error('上传文件出错', 3);
        }
      }
      return val;
    });

    if (e.file.status) {
      if (e.file.status === 'done') {
        list = list.filter(val => val.response ? val.response.success : true);
        if (e.file.response.success) {
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

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      const fileList = this.state.fileList.map(val => val.url);
      const max = this.state.max;
      let urlList;

      if (max > 1) {
        urlList = value.map(val => val.fileUrl);
      } else {
        urlList = [value.fileUrl];
      }
      if (JSON.stringify(urlList) === JSON.stringify(fileList)) {
        return;
      }
      this.setState({
        fileList: value instanceof Array ?
          value.map((item, i) => ({
            uid: -i,
            name: typeof item === 'object' ? item.fileName : `文件${i+1}`,
            status: 'done',
            url: typeof item === 'object' ? item.fileUrl : item
          })) 
          : [{ 
            uid: -1,
            name: typeof value === 'object' ? value.fileName : '文件1',
            status: 'done',
            url:  typeof value === 'object' ? value.fileUrl : value,
          }]
      });
    }
  }

  triggerChange = (list) => {
    const onChange = this.props.onChange;

    if (onChange) {
      const { max } = this.state;
      onChange(
        max > 1 ? 
        list.map(val=> ({
          fileUrl: val.url,
          fileName: val.name
        }))
        : (
          list.length ? {
            fileUrl: list[list.length - 1].url,
            fileName: list[list.length - 1].name
          } 
          : {}
        )
      );
    }
  }

  render() {
    const { fileList } = this.state;
    const {action, text, data, style} = this.props;

    return(
      <Dragger
        action={action}
        listType="text"
        fileList={fileList}
        onChange={this.handlePicChange}
        data={data}
        style={style}
      >
        <p>{text}</p>
      </Dragger>
    )
  }
}

export default WoxUploadFiles;
