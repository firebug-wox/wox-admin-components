# wox-react-component [![image](https://img.shields.io/npm/v/wox-react-component.svg)](https://www.npmjs.com/package/wox-react-component)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | 回调函数，返回 `{ keyName: 当前值 }` | Function | |
| keyName | 返回对象的属性名 | String | value |
| url | 服务器地址 | String |  |
| value | 富文本框值 | String | |
| className | 编辑器的样式名 | String | |
| style | 编辑器的内联样式 | Object | |

## Usage

```
import WoxMediaEditor from 'wox-admin-media-editor';

render(
  <WoxMediaEditor
    value='<p>啦啦啦，我是卖报的小行家</p>'
    callback={this.changeData}
    keyName='myData'
    url='//upload.quimg.com/wximg/operation/upload'
  />,
  rootEle
);
```

## Doc

#### [github]](https://github.com/margox/braft-editor)
#### [使用文档](https://www.yuque.com/margox/be) 
#### [在线演示](https://braft.margox.cn/demos/basic)

