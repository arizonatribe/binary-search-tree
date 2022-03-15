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

test("Should allow the 2nd arg to .insert() to be used on a newly inserted node", assert => {
    try {
        const rootNode = createNode(100)
          .insert(500)
          .insert(20, n20 => n20
              .insert(10)
              .insert(30, n30 => n30.insert(40))
          )

        let result = rootNode.search(20) || {}

        assert.equals(
            result.value,
            20,
            "Result matches the child node value (20)"
        )

        result = rootNode.search(40) || {}

        assert.equals(
            result.value,
            40,
            "Result matches the grandchild node value (40)"
        )
    } catch (err) {
        assert.fail(err)
    }

    assert.end()
})

test("Should be capable of automatically handling placement of nodes", assert => {
    const rootNode = createNode(100)
        .insert(20)
        .insert(500)
        .insert(10)
        .insert(30)
        .insert(40)

    assert.deepEquals(
        rootNode.toList(),
        [[100], [20, 500], [10, 30], [40]],
        "Root -> Child -> Grandchild"
    )

    let result = rootNode.search(40) || {}

    assert.equals(
        result.value,
        40,
        "Result matches the grandchild node value (40)"
    )

    assert.end()
})
