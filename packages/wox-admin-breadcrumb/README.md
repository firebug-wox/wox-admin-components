# Breadcrumb [![image](https://img.shields.io/npm/v/wox-admin-breadcrumb.svg)](https://www.npmjs.com/package/wox-admin-breadcrumb)

> 面包屑组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| items |面包屑数据，例如：**[{title: '详情页', herf: 'detail.html'}]** | Array | |


## Usage

```
import WoxBreadcrumb from 'wox-admin-breadcrumb';

const data = [
  { title: '签证系统', href: 'index.html' },
  { title: '查询鉴证' }
];

ReactDOM.render(<WoxBreadcrumb items={data} />, rootEle);
```
