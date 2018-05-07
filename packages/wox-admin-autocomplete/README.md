# Autocomplete [![image](https://img.shields.io/npm/v/wox-admin-autocomplete.svg)](https://www.npmjs.com/package/wox-admin-autocomplete)

> 模糊搜索

## API

| 属性 | 是否必填 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| urlFn | 是 | 自定义请求URL `必填` | Function(value) |  |
| initData | 是 | 初始传入数据 | Array：[{key: xxx, label: xxx}] |  |
| keyName | 是 | 返回数据的key值，用户选择数据后 `{keyName: data}` 以这种形式返回选择的数据 `必填` | String | |
| disabled | 否 | 是否只读 | Boolean | false |
| singleType | 否 | 是否单选模式 | Boolean | false |
| callback | 是 | 用户选择数据后回调函数 | Function({keyName: value}) | |
| formatDataFn | 是 | 自定义组件渲染数据，数据格式为: [{key: xxx, label: xxx}] | Function(res.data, keyword) | |
| formatLabelFn | 否 | 自定义组件展示数据，数据格式为: [{key: xxx, label: xxx}] | Function(value) | |


### formatDataFn demo

```javascript

  // 自定义组件渲染数据
  formatDataFn: function(val, keyword) {
    let hotelsArr = val.map(v => ({ key: v.id, label: `${v.id} - ${v.nameCN}`}));
    return [
      ...hotelsArr, 
      {key: keyword, label: keyword},
      {key: '或同级', label: '或同级'}
    ];
  }

```

### formatLabelFn demo

```javascript

  // 自定义组件展示数据
  formatLabelFn: function(val) {
    return val.map(v => ({ key: v.id, label: `自定义展示LABEL: ${v.id} - ${v.name}`}));
  }

```

## Usage

```javascript

import WoxAutoComplete from 'wox-admin-autocomplete';

<WoxAutoComplete
  url={(v)=>`url?key=${v}`}
  callback={this.props.callback}
  initData={this.props.data.startLocationInfos}
  keyName='keyName'
  // singleType={true}
  // disabled={true}
  formatDataFn={(val, keyword)=>val.map(v=>({key: v.id, label: v.name}))}
  formatLabelFn={(val)=>val.map(v=>({key: v.id, label: `【${v.id}】v.name`}))}
  style={{width: 400}}
/>

```
