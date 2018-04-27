# Gtour Autocomplete [![image](https://img.shields.io/npm/v/wox-admin-gtour-autocomplete.svg)](https://www.npmjs.com/package/wox-admin-gtour-autocomplete)

> 团队游模糊搜索

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| urlFn | 根据用户输入拼接URL函数 `必填` | Function(value) |  |
| initData | 初始传入数据 `必填` | Array `[{key: xxx, label: xxx}]` |  |
| keyName | 返回数据的key值，用户选择数据后 `{keyName: data}` 以这种形式返回选择的数据 `必填` | String | |
| disabled | 是否只读 | Boolean | false |
| singleType | 是否单选模式 | Boolean | false |
| callback | 用户选择数据后回调函数 | Function({keyName: value}) | |
| formatDataFn | 格式化获取数据函数，返回的数据格式必须为 `{key: xxx, label: xxx}` | Function(res.data, keyword) | |
| formatLabelFn | 格式化展示数据函数，返回的数据格式必须为 `{key: xxx, label: xxx}` | Function(value) | |

## Usage

```javascript

import WoxGtourAutoComplete from 'wox-admin-gtour-autocomplete';

<WoxGtourAutoComplete
  url={(v)=>`url?key=${v}`}
  callback={this.props.callback}
  initData={this.props.data.startLocationInfos}
  keyName='keyName'
  // singleType={true}
  // disabled={true}
  formatDataFn={(val)=>val.map(v=>({key: v.id, label: v.name}))}
  formatLabelFn={(val)=>val.map(v=>({key: v.id, label: `【${v.id}】v.name`}))}
  style={{width: 400}}
/>

```
