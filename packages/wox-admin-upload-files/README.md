# wox-react-component [![image](https://img.shields.io/npm/v/wox-react-component.svg)](https://www.npmjs.com/package/wox-react-component)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| action | 图片上传接口 | String | 无 |
| data | 上传接口参数 | Object | 无 |
| style | 样式 | Object | 无 |
| max | 图片上传最大数，>1 为多图模式，默认为单图模式 | Number | 1 |
| text | 拖拽框文案描述 | String | 无 |
| onChange | 返回数据回调 | Function(value):Object | 无 |

## Usage

```
import WoxUploadFiles from 'wox-admin-upload-files';

render(
  <WoxUploadFiles 
    action={`//upload.woqu.com/upload`}
    text='将文件拖入框中'
    max='100'
    onChange={this.uploadChange}
    value={data.attachmentElemList}
    data={{
      type: 'xorder',
      role: 'admin'
    }}
  />,
  rootEle
);
```

#### 可以配合 getFieldDecorator 使用
```
import WoxUploadFiles from 'wox-admin-upload-files';

render(
  <FormItem {...formLayout} label={'上传供应商 Invoice：'}>
    {getFieldDecorator('invoiceUrl', {
      initialValue: '',
    })(
      <WoxUploadFiles 
        action={`//upload.woqu.com/upload`}
        text='将文件拖入框中,或点击选择文件，支持格式：PDF、JPG、PNG'
        data={{
          type: 'xorder',
          role: 'admin'
        }}
      />
    )}
  </FormItem>,
  rootEle
);
```
