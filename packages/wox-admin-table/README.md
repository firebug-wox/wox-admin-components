# Table [![image](https://img.shields.io/npm/v/wox-admin-table.svg)](https://www.npmjs.com/package/wox-admin-table)

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| [官方 API](http://ant.design/components/table-cn/#API) | 支持所有官方 API | | |
| rowColorDifferent | 是否设置单双行背景颜色区分。**备注**：如果设置了 `rowClassName` ，`rowColorDifferent`将会失效 | boolean | false |

## Usage

```
import WoxTable from 'wox-admin-table';

render(
  <WoxTable
    columns={columns}
    dataSource={data}
    onChange={handleChange}
    pagination={pagination}

    {/* 增强 API */}
    rowColorDifferent={true}
  />,
  rootEle
);
```
