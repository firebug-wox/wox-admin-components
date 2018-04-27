# Fuzzypoi [![image](https://img.shields.io/npm/v/wox-admin-fuzzypoi.svg)](https://www.npmjs.com/package/wox-admin-fuzzypoi)

> POI 模糊匹配

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | 返回数据回调函数(数据显示处理) `必填` | Function |  |
| dataType | poi 查询类型参数, 例如：**'CITY,ISLAND,SCENIC,SIGHT_SPOT'** `必填` | String | |
| count | 显示条数参数 | String | 10 |
| initData | 初始化显示数据, 例如：**[{key: 'poi333', lable: '洛杉矶'}]** `必填`  | Array | |
| singleType | 是否单选模式  | Bool | false |
| disabled | 只读模式  | Bool | false |
| style | 样式模式, 例如：**{background: red}**  | Object | {width: '600px'} |
| placeholder |  占位符 | Object | 搜索 |
| host | 主机名,例如：**'//192.168.0.19:2001'** `必填` | String |  |
| keyName | 返回数据的key值 `必填` | String |  |


## Usage

```javascript
import WoxFuzzyPoi from 'wox-admin-fuzzypoi';

ReactDOM.render(
  <WoxFuzzyPoi
    callback={this.poiSearchCallBack}
    keyName={'poiInfo'}
    singleType={ true }
    dataType={'CITY,ISLAND,SCENIC,SIGHT_SPOT'}
    style={{width: '100%'}}
    disabled={false}
    placeholder={'搜索相关景点'}
    initData={{key: 123, label: '洛杉矶'}]}
    host={'//192.168.0.19:2001'}
  />,
  rootEle
);
```
