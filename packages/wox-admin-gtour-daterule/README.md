# Gtour Daterule [![image](https://img.shields.io/npm/v/wox-admin-gtour-daterule.svg)](https://www.npmjs.com/package/wox-admin-gtour-daterule)

> 团队游后台日期规则组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| disabled | 是否禁用 | Boolean | false |
| total | 用于判断是否显示关闭按钮，当数据大于1条时显示 `必填` | number | 传入初始数据数组的长度即可 |
| num | 序号 `必填` | number | 用map遍历时传入index即可 |
| dateRule | 初始数据 `必填` | Object | 格式 `{endDate: String, startDate: String, excludeDates: Array, id: String, includeDates: Array, type: Number, weekDays: Array}` |
| dateExpressions | 初始数据数组 | Array | 格式 `[dateRule...]` |
| handleCallBack | 用户操作数据后回调函数 `必填` | Function(value) return 新的dateExpressions | |

## Usage

```javascript
import WoxDateRule from '@firebug-wox/wox-admin-gtour-daterule';

{
  this.state.dateExpressions && this.state.dateExpressions.length ? this.state.dateExpressions.map((value, index) => (
    <WoxDateRule
      total={this.state.dateExpressions && this.state.dateExpressions.length}
      key={index}
      num={index}
      dateRule={ value }
      dateExpressions={this.state.dateExpressions}
      handleCallBack={this.handleCallBack}
      disabled={true}
    />
  )) : <p style={{margin: '20px 20px 0'}}>无任何日期规则信息</p>
}
```
