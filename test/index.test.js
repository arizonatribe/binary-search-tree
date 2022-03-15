const test = require("tape")
const createNode = require("../lib")

function createTestNode() {
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

    return rootNode
}

test("Should list the hierarchical layering of nodes", assert => {
    const rootNode = createTestNode()

    assert.deepEquals(
        rootNode.toList(),
        [[100], [20, 500], [10, 30], [40]],
        "Root -> Child -> Grandchild"
    )

    assert.end()
})

test("Should print the hierarchical layering of nodes", assert => {
    const rootNode = createTestNode()

    assert.deepEquals(
        rootNode.print(),
        "",
        "Print the hierarchy"
    )

    assert.end()
})

test("Should find grandchild node from 3-layer binary search tree", assert => {
    const rootNode = createTestNode()

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

    assert.end()
})

test("Should find child node from 3-layer binary search tree", assert => {
    const rootNode = createTestNode()

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
