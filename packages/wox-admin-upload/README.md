# Upload [![image](https://img.shields.io/npm/v/wox-admin-upload.svg)](https://www.npmjs.com/package/wox-admin-upload)

> 配合 ant-form getFieldDecorator 使用，initialValue值为 String(单图) 或 Array(多图)类型

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| imgType | 图片类型 | Array | ['jpg', 'png', 'jpeg', 'gif'] |
| imgSize | 图片大小，单位为 `KB` | Number | 1024 |
| action | 图片上传接口 | String | |
| max | 图片上传最大数，>1 为多图模式，默认为单图模式 | Number | 1 |
| data | 上传所需参数或返回上传参数的方法 | object|function(file) |  无 |

## Usage

```javascript
import WoxUpload from 'wox-admin-upload';

<FormItem>
  {getFieldDecorator('logoUrl', {
    rules: [{
      required: true, message: 'Please upload your logo'
    }],
    initialValue: curData.logoUrl || '',
  })(
    <WoxUpload
      max={1}
      imgType={['png']}
      imgSize={1024}
      action={`${Base.img}/wximg/dppLogo/upload`}
    />
    // 单图一般 <WoxUpload action={`${Base.img}/wximg/dppLogo/upload`}/> 即可
  )}
</FormItem>
```
