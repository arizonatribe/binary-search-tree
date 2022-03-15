const test = require("tape")
const createNode = require("../lib")

test("Three node layer binary search tree", assert => {
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

    const grandchild = rootNode.search(40)

    assert.equals(
        grandchild.value,
        40,
        "Find the grandchild node"
    )
    assert.equals(
        grandchild.left,
        undefined,
        "No left child"
    )
    assert.equals(
        grandchild.right,
        undefined,
        "No right child"
    )

    const child = rootNode.search(20)

    assert.equals(
        child.value,
        20,
        "Find the child node"
    )
    assert.notEquals(
        child.left,
        undefined,
        "Has a left child"
    )
    assert.notEquals(
        child.right,
        undefined,
        "Has a right child"
    )
    assert.equals(
        child.left.value,
        10,
        "Left child value"
    )
    assert.equals(
        child.right.value,
        30,
        "Right child value"
    )

    assert.end()
})
