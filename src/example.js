const df = require('./index');

// data can have array of objects
const data = {
    c1: { name: 'category1', active: false },
    c2: {
        name: 'category2',
        active: true,
        products: {
            p1: { name: 'product21', active: false },
            p2: { name: 'product22', active: true },
            p3: { name: 'product23', active: false },
        },
    },
    c3: {
        name: 'category3',
        active: true,
        products: {
            p1: { name: 'product31', active: false },
            p2: { name: 'product32', active: true },
        },
    },
};

// "node" can be any object on the tree
const res1 = df.findNode(data, (node) => node.name === 'category3');
console.log(res1);
// { name: 'category3', active: true, products: [Object] }

// "leaf" can be any object which don't have children i.e. bottom nodes
const res2 = df.findLeaf(data, (leaf) => leaf.name === 'product22');
console.log(res2);
// { name: 'product22', active: true }

const res3 = df.findPath(data, (node) => node.name === 'product22');
console.log(res3);
// [ 'c2', 'products', 'p2' ]
