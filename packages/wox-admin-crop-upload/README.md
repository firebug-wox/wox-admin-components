# wox-react-component [![image](https://img.shields.io/npm/v/wox-react-component.svg)](https://www.npmjs.com/package/wox-react-component)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| imgType | 图片类型 | Array | ['jpg', 'png', 'jpeg', 'gif'] |
| imgSize | 图片大小，单位为 `KB` | Number | 10240 |
| action | 图片上传接口 | String | |
| max | 图片上传最大数，>1 为多图模式，默认为单图模式 | Number | 1 |
| onChange | callback(返回图片地址) | Func | |
| crop | 图片裁剪尺寸设置 | obj | { width: 100, aspect: 5/4, x:0, y:0} |
| value | 图片地址 | array | [] |


## Usage

```javascript
import WoxCropUpload from 'wox-admin-crop-upload';

 <WoxCropUpload
  max={10}
  action='//upload.quimg.com/wximg/gtravel/upload'
  onChange={this.uploadChange}
  value={['www.baidu.com/images/xxx.jpg']}
  crop={{
    width: 100,   //宽度100分比， 即100%
    aspect: 6/2,  // 宽高比
    x: 0,
    y: 0
  }}
/>
```
