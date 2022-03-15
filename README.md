# Binary Search Tree

An implementation of a binary search tree API in JavaScript

# Install

```
npm install @vanillas/binary-search-tree
```

# Usage

Create the root node and insert several child nodes:

```javascript

const createNode = require("@vanillas/binary-search-tree")

const rootNode = createNode(100)

rootNode
  .insert(20)
  .insert(500)

rootNode
  .left
  .insert(10)
  .insert(30)

rootNode
  .left
  .right
  .insert(40)
```

Now you can search easily:

```javascript
rootNode.search(40)

// {
//   value: 40,
//   left: undefined,
//   right: undefined
// }

rootNode.search(20)

// {
//   value: 20,
//   left: {
//     value: [Getter],
//     left: [Getter],
//     right: [Getter],
//     toList: [Function: toList],
//     isValid: [Function: isValid],
//     insert: [Function: insert],
//     search: [Function: search]
//   },
//   right: {
//     value: [Getter],
//     left: [Getter],
//     right: [Getter],
//     toList: [Function: toList],
//     isValid: [Function: isValid],
//     insert: [Function: insert],
//     search: [Function: search]
//   }
// }
```
