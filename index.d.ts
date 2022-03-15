/**
 * A node's value and it's children (if there are any)
 *
 * @interface
 * @typedef {Object<string, string|number|BasicNode>} BasicNode
 * @property {string|number} value The node's actual value
 * @property {BasicNode} [left] A node's left child
 * @property {BasicNode} [right] A node's right child
 */
export interface BasicNode {
  value: string | number
  left?: BasicNode
  right?: BasicNode
}

/**
 * A search tree node
 *
 * @class
 * @name SearchTreeNode
 */
export interface SearchTreeNode extends BasicNode {
    /**
     * Converts the node (and its children) to a list of values
     *
     * @function
     * @name SearchTreeNode#toList
     * @returns {Array<Array<number|string>>} A list of values for each node
     */
    toList(): number[][]

    /**
     * Retrieves a node - by its value - from the search tree
     *
     * @function
     * @name SearchTreeNode#search
     * @param {string|number} v The value by which to search for a node in the tree
     * @returns {BasicNode} The matched node from the search
     */
    search(v: string | number): BasicNode | undefined

    /**
     * Adds a child node to the current (parent) node
     *
     * @function
     * @name SearchTreeNode#insert
     * @throws {TypeError} When the new node callback IS provided but ISN'T a function
     * @param {string|number|BasicNode} node The node (or value) to be added to the current node
     * @param {Function} [newNodeCallback] An optional callback to chain onto the newly inserted node
     * @returns {SearchTreeNode} The search tree node
     */
    insert(
        v: string | number | BasicNode,
        newNodeCallback?: (n: SearchTreeNode) => SearchTreeNode
    ): SearchTreeNode

    /**
     * Validates that a given node (and each of its children) are all valid
     *
     * @function
     * @name SearchTreeNode#isValid
     * @returns {boolean} Whether or not the node (and its children) are valid
     */
    isValid(): boolean
}

/**
 * Creates a new Node (which may be the root or a child node
 *
 * @function
 * @name createNode
 * @param {string|number|BasicNode} nodeOrValue The Node's value or a basic node itself
 * @returns {Node} An instance of a search tree node API
 */
declare function createNode(nodeOrValue: BasicNode | string | number): SearchTreeNode

export { createNode }
export default createNode
