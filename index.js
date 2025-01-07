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
