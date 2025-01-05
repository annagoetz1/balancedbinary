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
