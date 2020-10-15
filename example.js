const df = require('./index');

// data can be object or array of objects
const data = {
    name: 'categories',
    c1: { name: 'category1', active: false },
    c2: {
        name: 'category2', active: true,
        products: {
            name: 'products',
            p1: { name: 'product21', active: false },
            p2: { name: 'product22', active: true },
            p3: { name: 'product23', active: false },
        },
    },
    c3: {
        name: 'category3', active: true,
        products: {
            name: 'products',
            p1: { name: 'product31', active: false },
            p2: { name: 'product32', active: true },
        },
    },
};

// "node" can be any object on the tree
const res1 = df(data).findNode(node => node.name === 'category3');
console.log(res1);
// { name: 'category3', active: true, products: [Object] }

// "leaf" can be any object which don't have children i.e. bottom nodes
// it has better performance over findNode as it skips unnecessary comparisons
const res2 = df(data).findLeaf(leaf => leaf.name === 'product22');
console.log(res2);
// { name: 'product22', active: true }

const res3 = df(data).nodesByLevel(1); // should be greater than 0
console.log(res3);

const res4 = df(data).reduce(
    (acc, cur) => (acc + '/' + cur.name), '' // initial value must be provided
);
console.log(res4);