const df = require('./index');

// data can be object or array of objects
const data = {
    category1: { id: 'c1', active: false },
    category2: {
        id: 'c2', active: true,
        products: {
            product1: { id: 'p21', active: false },
            product2: { id: 'p22', active: true },
            product3: { id: 'p23', active: false },
        },
    },
    category3: {
        id: 'c3', active: true,
        products: {
            product1: { id: 'p31', active: false },
            product2: { id: 'p32', active: true },
        },
    },
};

// "node" can be any object on the tree
const res1 = df(data).findNode(node => node.id === 'c3');
console.log(res1);
// { id: 'c3', active: true, products: [Object] }

// "leaf" can be any object which don't have children i.e. bottom nodes
// it has better performance over findNode as it skips unnecessary comparisons
const res2 = df(data).findLeaf(leaf => leaf.id === 'p22');
console.log(res2);
// { id: 'p22', active: true }

const res3 = df(data).nodesByLevel(1); // should be greater than 0
console.log(res3);

const res4 = df(data).reduce(
    (acc, cur) => cur.id ? (acc + '/' + cur.id) : acc,
    '' // initial value must be provided
);
console.log(res4);