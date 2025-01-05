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
}