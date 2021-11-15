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

const results = [
    df.findPath(data, (node) => node.name === 'product22'),
    df.removeNode(data, (node) => node.name === 'product23'),
    df.updateNode(
        data,
        (node) => node.name === 'category1',
        (node) => ({ ...node, active: true })
    ),
];

results.forEach((el, i) => console.log(i, el));
