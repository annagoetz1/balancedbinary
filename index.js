// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// BinaryTree class
class BinaryTree {
    constructor() {
        this.root = null;
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
            if (value === current.data) return undefined; // Avoid duplicates

            if (value < current.data) {
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

    // Function to calculate the height of a given node
    height(node) {
        if (node === null) {
            return -1; // Base case: height of an empty node is -1
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    // Function to check if the tree is balanced
    isBalanced(node = this.root) {
        const checkHeight = (current) => {
            if (current === null) {
                return 0;
            }

            const leftHeight = checkHeight(current.left);
            if (leftHeight === -1) return -1;

            const rightHeight = checkHeight(current.right);
            if (rightHeight === -1) return -1;

            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }

            return 1 + Math.max(leftHeight, rightHeight);
        };

        return checkHeight(node) !== -1;
    }

    // In-Order Traversal
    inOrder(callback) {
        const values = [];
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            values.push(node.data);
            traverse(node.right);
        };
        traverse(this.root);
        return values;
    }

    // Pre-Order Traversal
    preOrder(callback) {
        const traverse = (node) => {
            if (node === null) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
    }

    // Post-Order Traversal
    postOrder(callback) {
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        };
        traverse(this.root);
    }

    // Level Order Traversal
    levelOrder(callback) {
        if (this.root === null) return;

        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }

    // Build a balanced tree from a sorted array
    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1));

        return root;
    }

    // Rebalance the tree
    rebalance() {
        const sortedValues = this.inOrder();
        this.root = this.buildTree(sortedValues);
    }
}

// Helper function to generate a random array
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

// Driver Script
const tree = new BinaryTree();

// Step 1: Create a binary search tree from an array of random numbers < 100
const randomNumbers = generateRandomArray(10);
randomNumbers.forEach(num => tree.insert(num));

console.log("Initial Tree (Level Order):");
tree.levelOrder(node => console.log(node.data));

// Step 2: Check if the tree is balanced
console.log("\nIs the tree balanced?", tree.isBalanced());

// Step 3: Print traversals
console.log("\nLevel Order:");
tree.levelOrder(node => console.log(node.data));

console.log("\nPre Order:");
tree.preOrder(node => console.log(node.data));

console.log("\nPost Order:");
tree.postOrder(node => console.log(node.data));

console.log("\nIn Order:");
console.log(tree.inOrder());

// Step 4: Unbalance the tree by adding numbers > 100
tree.insert(200);
tree.insert(150);
tree.insert(250);
tree.insert(300);

console.log("\nAfter Unbalancing the Tree (Level Order):");
tree.levelOrder(node => console.log(node.data));
console.log("\nIs the tree balanced?", tree.isBalanced());

// Step 5: Balance the tree
tree.rebalance();
console.log("\nAfter Rebalancing the Tree (Level Order):");
tree.levelOrder(node => console.log(node.data));
console.log("\nIs the tree balanced?", tree.isBalanced());
