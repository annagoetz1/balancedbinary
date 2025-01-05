// JavaScript program to convert sorted
// array to BST.

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

    let q = [ {node : root, range : [ 0, n - 1 ]} ];
    let frontIndex = 0;

while (frontIndex < q.length) {
    let front = q[frontIndex];          // Fetch the next item from the queue
    let curr = front.node;              // Get the current node to process
    let [s, e] = front.range;           // Deconstruct the range [s, e] for this node
    let index = s + Math.floor((e - s) / 2);  // Calculate the middle index
}
}