class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function sortedArrayToBST(arr) {
    let n = arr.length;

    if (n === 0)
        return null;

    // Create the root node
    let mid = Math.floor((n - 1) / 2);
    let root = new Node(arr[mid]);

    let q = [{ node: root, range: [0, n - 1] }];
    let frontIndex = 0;

    while (frontIndex < q.length) {
        let front = q[frontIndex];          // Fetch the next item from the queue
        let curr = front.node;              // Get the current node to process
        let [s, e] = front.range;           // Deconstruct the range [s, e] for this node
        let index = s + Math.floor((e - s) / 2);  // Calculate the middle index

        // If left subtree exists
        if (s < index) {
            let midLeft = Math.floor((index - 1 + s) / 2); // Corrected midpoint formula
            let left = new Node(arr[midLeft]);
            curr.left = left;
            q.push({ node: left, range: [s, index - 1] });
        }

        // If right subtree exists
        if (e > index) { // check if right subtree exists
            let midRight = index + 1 + Math.floor((e - index - 1) / 2); // calculate right subtree root/middle
            let right = new Node(arr[midRight]);
            curr.right = right;
            q.push({ node: right, range: [index + 1, e] });
        }

        frontIndex++;
    }

    return root;
}
 // Insert a value into the BST
 insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
        this.root = newNode; // If the tree is empty
        return this;
    }

    let current = this.root;
    while (true) {
        if (value === current.value) return undefined; // Avoid duplicates

        if (value < current.value) {
            // Go left
            if (current.left === null) {
                current.left = newNode;
                return this;
            }
            current = current.left;
        } else {
            // Go right
            if (current.right === null) {
                current.right = newNode;
                return this;
            }
            current = current.right;
        }
    }
}

// Delete a value from the BST
deleteItem(value) {
    this.root = this._deleteNode(this.root, value);
}

_deleteNode(node, value) {
    if (node === null) {
        return null; // Base case: the value is not in the tree
    }

    if (value < node.value) {
        node.left = this._deleteNode(node.left, value); // Traverse left
    } else if (value > node.value) {
        node.right = this._deleteNode(node.right, value); // Traverse right
    } else {
        // Found the node to delete

        // Case 1: No children (leaf node)
        if (node.left === null && node.right === null) {
            return null;
        }

        // Case 2: One child
        if (node.left === null) {
            return node.right; // Replace node with its right child
        } else if (node.right === null) {
            return node.left; // Replace node with its left child
        }

        // Case 3: Two children
        // Find the in-order successor (smallest value in the right subtree)
        let minRight = this._findMin(node.right);
        node.value = minRight.value; // Replace node's value with the in-order successor
        node.right = this._deleteNode(node.right, minRight.value); // Remove the in-order successor
    }

    return node;
}


function findNode(root, value) {
    if (root === null) {
        return null; // Base case: the value is not in the tree
    }
    
    if (root.data === value) {
        return root; // Found the node
    } else if (value < root.data) {
        return findNode(root.left, value); // Search in the left subtree
    } else {
        return findNode(root.right, value); // Search in the right subtree
    }
}
    


function preOrder(root) { // console log data in preorder
    if (root === null)
        return;
    console.log(root.data + " ");
    preOrder(root.left);
    preOrder(root.right);
}

let arr = [1, 2, 3, 4];
let root = sortedArrayToBST(arr);
preOrder(root);


class BinaryTree {
    constructor() {
        this.root = null;
    }

        // Function to calculate the height of a given node
        height(node) {
            if (node === null) {
                return -1; // Base case: height of an empty node is -1
            }
    
            // Recursively calculate the height of left and right subtrees
            let leftHeight = this.height(node.left);
            let rightHeight = this.height(node.right);
    
            // The height of the current node is the max of its subtrees + 1
            return 1 + Math.max(leftHeight, rightHeight);
        }

            // Function to calculate the depth of a given node
    depth(node, current = this.root, currentDepth = 0) {
        if (current === null) {
            throw new Error("Node not found in the tree."); // Error if the node doesn't exist
        }

        // If we find the node, return the current depth
        if (current === node) {
            return currentDepth;
        }

        // Recursively search in the left subtree
        if (current.left) {
            let leftDepth = this.depth(node, current.left, currentDepth + 1);
            if (leftDepth !== -1) return leftDepth;
        }

        // Recursively search in the right subtree
        if (current.right) {
            let rightDepth = this.depth(node, current.right, currentDepth + 1);
            if (rightDepth !== -1) return rightDepth;
        }

        // If the node is not found in this subtree, return -1
        return -1;
    }

    // Function to check if the tree is balanced
    isBalanced(node = this.root) {
        // Helper function to calculate height and check balance
        const checkHeight = (current) => {
            if (current === null) {
                return 0; // Height of a null node is 0
            }

            // Recursively calculate the height of the left and right subtrees
            const leftHeight = checkHeight(current.left);
            if (leftHeight === -1) return -1; // Left subtree is unbalanced

            const rightHeight = checkHeight(current.right);
            if (rightHeight === -1) return -1; // Right subtree is unbalanced

            // Check if the current node is balanced
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1; // Current node is unbalanced
            }

            // Return the height of the current node
            return 1 + Math.max(leftHeight, rightHeight);
        };

        // Start the recursive check
        return checkHeight(node) !== -1;
    }

    inOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A valid callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left); // Visit left subtree
            callback(node);      // Process current node
            traverse(node.right); // Visit right subtree
        };

        traverse(this.root); // Start traversal from the root
    }


    // Build a balanced tree from a sorted array
    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid)); // Left half for left subtree
        root.right = this.buildTree(arr.slice(mid + 1)); // Right half for right subtree

        return root;
    }

    // Rebalance the tree
    rebalance() {
        if (this.root === null) return; // Tree is already empty, no need to rebalance

        // Get sorted array of values using in-order traversal
        const sortedValues = this.inOrder();

        // Build a new balanced tree and set it as the root
        this.root = this.buildTree(sortedValues);
    }
    // Post-Order Traversal
    postOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A valid callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left); // Visit left subtree
            traverse(node.right); // Visit right subtree
            callback(node);      // Process current node
        };

        traverse(this.root); // Start traversal from the root
    }


    // Pre-Order Traversal
    preOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A valid callback function is required.");
        }

        const traverse = (node) => {
            if (node === null) return;
            callback(node);      // Process current node
            traverse(node.left); // Visit left subtree
            traverse(node.right); // Visit right subtree
        };

        traverse(this.root); // Start traversal from the root
    }

    levelOrder(callback) {
        if (!callback || typeof callback !== "function") {
            throw new Error("A valid callback function is required.");
        }

        if (!this.root) {
            return; // Empty tree
        }

        // Queue to store nodes to process
        let queue = [this.root];

        while (queue.length > 0) {
            let currentNode = queue.shift(); // Remove the first node in the queue

            callback(currentNode); // Call the callback on the current node

            // Add left and right children (if any) to the queue
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }
}

// Driver Script

const tree = new BinaryTree();

// Step 1: Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomArray(10);
randomNumbers.forEach(num => tree.insert(num));

console.log("Initial Tree:");
tree.levelOrder(node => console.log(node.data));

// Step 2: Check if the tree is balanced
console.log("\nIs the tree balanced?", tree.isBalanced());


