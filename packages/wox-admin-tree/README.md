# Tree [![image](https://img.shields.io/npm/v/wox-admin-tree.svg)](https://www.npmjs.com/package/wox-admin-tree)


### 基于 `react-ui-tree`，针对拖拽做了一些限制

## Example

``` javascript
const tree = {
  module: 'tree',
  children: [
    {
      module: 'parentA',
      children: [
        {
          module: 'a1'
        },
        {
          module: 'a2'
        },
      ]
    },
    {
      module: 'b'
    }
  ]
};
// a1/a2 只能在parentA里面移动, b也不能移动到 parentA里面
```

### Installation

``` sh
npm install wox-react-tree
```

### Usage
``` javascript
<Tree
  paddingLeft={20}              // left padding for children nodes in pixels
  tree={this.state.tree}        // tree object
  onChange={this.handleChange}  // onChange(tree) tree object changed
  renderNode={this.renderNode}  // renderNode(node) return react element
/>

// a sample tree object
// node.children, node.collapsed, node.leaf properties are hardcoded
{
  "module": "react-ui-tree",
  "children": [{
    "collapsed": true,
    "module": "dist",
    "children": [{
      "module": "node.js"
    }]
  }]
}
```
> api请直接查看 [**react-ui-tree**](https://github.com/pqx/react-ui-tree)
