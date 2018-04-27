# FaIcon [![image](https://img.shields.io/npm/v/wox-admin-faicon.svg)](https://www.npmjs.com/package/wox-admin-faicon)

> 操作图标组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 图标类型 `必填` | String |  |
| title | hover 图标时显示的文案 | String | |
| style | 自定义样式 | Object | |

## Usage

```
import WoxFaIcon from 'wox-admin-faicon';

ReactDOM.render(<WoxFaIcon type="fa-pencil" title="编辑" style={{margin:'0 10px'}}/>, rootEle);
```
