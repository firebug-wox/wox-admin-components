# Title [![image](https://img.shields.io/npm/v/wox-admin-title.svg)](https://www.npmjs.com/package/wox-admin-title)

> 标题组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| title | `必填`。标题文字 | String | |
| children | `子组件`。直接写在父组件里面 | object 、array 。 例如： `<a />` 一个 HTMLCollection 对象 | 空数组 [ ] |
## Usage

```
import WoxTitle from 'wox-admin-title';

ReactDOM.render(
<Title title={ '产品列表' } >
  <a href="copyProduct.html" target='_blank'>+</a>
<Title>
, rootEle);

```
