# Menu [![image](https://img.shields.io/npm/v/wox-admin-menu.svg)](https://www.npmjs.com/package/wox-admin-menu)

> 菜单组件

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| theme| 主题颜色 | String：light dark | dark|
| mode| 菜单类型，现在支持垂直 `vertical`、水平 `horizontal`、和内嵌模式 `inline` 三种 | String | |
| menuDdata | 菜单数据，例如：**[{title: '菜单标题', key: 'title' , url: '菜单链接',child:'是否有子元素'}]** | Array | |
| current | 与 `menuData` 数据中的 `key` 值相对应，用于初始化选中的项 | Array |  |
| onClick | 点击 menuitem 调用此函数，参数为 {item, key, keyPath}| function |  |


## menuDdata.child （array）

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| group| 子级元素是否为一个组(组的标题) | String | 非必填|
| key| 如果子级元素是一个组，为组的key | String | 非必填|
|item| 子元素内容， 例如：**[{title: '子级菜单标题', key: 'keys' , url: '子级菜单链接',}]** | array ||

## Usage

```
import WoxMenu from 'wox-admin-menu';

const data = [
  {title: '批量维护', key: 'maintain', url: 'supplier/hotel/save.html?pid='},
  {title: '产品鉴证', key: 'product', url: 'supplier/hotel/save.html'},
  { 
    title: '库存管理',
    key: 'stockManage', 
    child:[
      {
        group : '男歌星',
        key: 'sing',
        item:[
          {
            title:'周杰伦',
            key:'jie',
            url:'www.baidu.com'
          },
          {
            title:'林俊杰',
            key:'jj',
            url:'www.baidu.com'
          }
        ]
      },
      {
        item:[{
          title: '动物世界',
          key:'zoology',
          url:'www.baidu.com'
        }]
      }
    ],
];

ReactDOM.render(<WoxMenu mode="horizontal" menuDdata={data} current={['maintain']} onClick={this.handleClick.bind(this)}/>, rootEle);
```
