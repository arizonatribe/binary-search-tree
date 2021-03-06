# Binary Search Tree

An implementation of a binary search tree API in JavaScript

# Install

```
npm install @vanillas/binary-search-tree
```

# Usage

Given a tree strucutre which looks like this:

```
  100
  / \
 20 500
 / \
10 30
    \
    40
```

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

This achieves a hierarchically layered tree which looks like this:

```javascript
rootNode.toList()

// [
//   [100],
//   [20, 500],
//   [10, 30],
//   [40]
// ]
```

Alternatively, you can utilize the optional 2nd param to the `.insert()` method to chain onto that new node you're inserting:

```javascript
const createNode = require("@vanillas/binary-search-tree")

const rootNode = createNode(100)
  .insert(20, n20 => n20
      .insert(10)
      .insert(30, n30 => n30.insert(40))
  )
  .insert(500)
```

And while you _can_ add nodes directly to the exact locations you want them, you can also allow them to be placed automatically.


```javascript
const rootNode = createNode(100)
    .insert(20)
    .insert(500)
    .insert(10)
    .insert(30)
    .insert(40)
```

Which achieves the same layering as the other two (manual) examples listed earlier:


```javascript
rootNode.toList()

// [
//   [100],
//   [20, 500],
//   [10, 30],
//   [40]
// ]
```

# TypeScript support

Also works with TypeScript:

```typescript
import { createNode } from "@vanillas/binary-search-tree"

const rootNode = createNode(100)
    .insert(20, n20 => n20
        .insert(10)
        .insert(30, n30 => n30.insert(40))
    )
    .insert(500)

const result = rootNode.search(40)
```
