/**
 * Validates a string or numeric value for a search tree node
 *
 * @function
 * @name validateNodeValue
 * @throws {TypeError} When the value is missing or not a string/number
 * @throws {TypeError} When the value is a string but is blank
 * @throws {TypeError} When the value is a number but is not finite
 * @param {number|string} value The value to be validated for a search tree node
 * @returns {number|string} The validated node value
 */
function validateNodeValue(value) {
    if (value == null) {
        throw new TypeError("Missing a value for the node")
    }
    if (typeof value !== "string" && typeof value !== "number") {
        throw new TypeError("The node value should be either a string or numeric value")
    }
    if (typeof value === "string" && !value.trim()) {
        throw new TypeError("The node value should be a non-blank string value")
    }
    if (typeof value === "number" && !Number.isFinite(value)) {
        throw new TypeError(`Invalid numeric value for a node: ${value}`)
    }

    return value
}

/**
 * Validates a node to be in the proper format
 * Should contain an id/key/label/value at a minimum.
 * If it contains a `left` and/or `right` child node, those must be valid nodes
 *
 * @function
 * @name validateNode
 * @throws {TypeError} When the node is missing or not an object
 * @throws {TypeError} When the key/id/label/value is missing or is itself invalid
 * @throws {TypeError} When the (optional) child nodes are invalid nodes
 * @param {BasicNode} node The node to be validated
 * @returns {BasicNode} The validated node
 */
function validateNode(node) {
    if (node == null) {
        throw new TypeError("Missing a node to add")
    }
    if (typeof node !== "object") {
        throw new TypeError(`A node should be an object, but got: '${typeof node}'`)
    }
    if (node.id == null && node.key == null && node.label == null && node.value == null) {
        throw new TypeError("Missing a value for the node being added")
    }

    const value = validateNodeValue(
        node.value != null
            ? node.value
            : node.id != null
                ? node.id
                : node.key != null
                    ? node.key
                    : node.label != null
                        ? node.label
                        : null
    )

    const { left, right } = node

    if (left && left.value > value) {
        throw new Error(
            `Invalid left node: its value '${
                left.value
            }' should not be greater than this node's own value of '${
                value
            }'`
        )
    }

    if (right && right.value < value) {
        throw new Error(
            `Invalid right node: its value '${
                right.value
            }' should not be less than this node's own value of '${
                value
            }'`
        )
    }

    return {
        value,
        ...(left && { left: validateNode(left) }),
        ...(right && { right: validateNode(right) }),
    }
}

/**
 * Validates either a node or a node value, switching to the proper validator based on what is passed in
 *
 * @function
 * @name validateNodeOrValue
 * @param {BasicNode|string|number} nodeOrValue The node or node value to be validated
 * @returns {BasicNode} The validated node
 */
function validateNodeOrValue(nodeOrValue) {
    try {
        const value = validateNodeValue(nodeOrValue)

        return { value }
    } catch (_e) {
        return validateNode(nodeOrValue)
    }
}

/**
 * Serializes a search tree node as a list of numbers (all its child nodes contained therein)
 *
 * @function
 * @name toList
 * @param {Array<BasicNode>} nodes One or more nodes to serialize
 * @param {Array<string|number>} [nodeList] The running total of hierarchically nested node values
 * @returns {Array<Array<number|string>>} The hierarchically serialized node values
 */
function toList(nodes, nodeList = []) {
    const nextNodes = []
    const nextBatchOfValues = []

    for (let i = 0, len = nodes.length; i < len; i++) {
        const node = nodes[i]

        if (node.left) {
            nextNodes.push(node.left)
        }

        if (node.right) {
            nextNodes.push(node.right)
        }

        nextBatchOfValues.push(node.value)
    }

    if (nextBatchOfValues.length) {
        nodeList.push(nextBatchOfValues)
    }

    if (!nextNodes.length) {
        return nodeList
    }

    return toList(nextNodes, nodeList)
}

function printTree(node) {
    const nodeList = toList([node])

    let maxWidth = 1
    let maxColumn = 1

    for (let i = 0, len = nodeList.length; i < len; i++) {
        maxWidth = Math.max(maxWidth, nodeList[i].length)
        maxColumn = `${Math.max(...nodeList[i])}`.length
    }

    const blankColumn = Array(maxColumn).fill(" ").join("")
    const blankLine = Array(maxWidth).fill(blankColumn).join("")
    const printIndexes = Array(nodeList.length).fill(blankLine)

    function recursivePrint(n, parentIdx, layerIndex) {
        if (n.left) {
            const arrLine = printIndexes[layerIndex].split("")
            arrLine[parentIdx - maxColumn] = n.left.value
            printIndexes[layerIndex] = arrLine.join("")
            recursivePrint(n.left, parentIdx - maxColumn, layerIndex + 1)
        }

        if (n.right) {
            const arrLine = printIndexes[layerIndex].split("")
            arrLine[parentIdx + maxColumn] = n.right.value
            printIndexes[layerIndex] = arrLine.join("")
            recursivePrint(n.right, parentIdx + maxColumn, layerIndex + 1)
        }
    }

    const paddingLength = Math.ceil((maxWidth * maxColumn) / 2)

    printIndexes[0] = blankLine
        .split("")
        .map((v, i) => (i === paddingLength ? node.value : v))
        .join("")

    recursivePrint(node, paddingLength, 1)

    return printIndexes.join(/\n/)
}

/**
 * A node's value and it's children (if there are any)
 *
 * @typedef {Object<string, string|number|BasicNode>} BasicNode
 * @property {string|number} value The node's actual value
 * @property {BasicNode} [left] A node's left child
 * @property {BasicNode} [right] A node's right child
 */

/**
 * Creates a new Node (which may be the root or a child node
 *
 * @function
 * @name createNode
 * @param {string|number|BasicNode} nodeOrValue The Node's value or a basic node itself
 * @returns {Node} An instance of a search tree node API
 */
function createNode(nodeOrValue) {
    let {
        value: val,
        left: leftNode,
        right: rightNode
    } = validateNodeOrValue(nodeOrValue)

    /**
     * A search tree node
     *
     * @class
     * @name Node
     */
    const api = {
        get value() {
            return val
        },

        get left() {
            return leftNode
        },

        get right() {
            return rightNode
        },

        print() {
            return printTree({ value: val, left: leftNode, right: rightNode })
        },

        /**
         * Converts the node (and its children) to a list of values
         *
         * @function
         * @name Node#toList
         * @returns {Array<Array<number|string>>} A list of values for each node
         */
        toList() {
            return toList([{ value: val, left: leftNode, right: rightNode }])
        },

        /**
         * Validates that a given node (and each of its children) are all valid
         *
         * @function
         * @name Node#isValid
         * @returns {boolean} Whether or not the node (and its children) are valid
         */
        isValid() {
            return (
                (leftNode == null && rightNode == null)
                || (leftNode != null && leftNode.isValid() && leftNode.value < val)
                || (rightNode != null && rightNode.isValid() && rightNode.value >= val)
            )
        },

        /**
         * Adds a child node to the current (parent) node
         *
         * @function
         * @name Node#insert
         * @param {string|number|BasicNode} node The node (or value) to be added to the current node
         * @returns {Node} The search tree node
         */
        insert(node) {
            if (leftNode && rightNode) {
                throw new Error(`Node ${val} already has left and right nodes`)
            }

            const n = validateNodeOrValue(node)

            if (n.value < val) {
                leftNode = createNode(n)
            } else if (n.value >= val) {
                rightNode = createNode(n)
            } else {
                throw new TypeError(`Invalid value for a node: ${n.value}`)
            }

            return api
        },

        /**
         * Retrieves a node - by its value - from the search tree
         *
         * @function
         * @name Node#search
         * @param {string|number} v The value by which to search for a node in the tree
         * @returns {BasicNode} The matched node from the search
         */
        search(v) {
            if (val < v) {
                return rightNode.search(v)
            } else if (val > v) {
                return leftNode.search(v)
            } else if (val === v) {
                return {
                    value: val,
                    left: leftNode,
                    right: rightNode
                }
            }
        }
    }

    return api
}

module.exports = createNode
module.exports.createNode = createNode
