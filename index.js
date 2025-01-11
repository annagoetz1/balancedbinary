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


