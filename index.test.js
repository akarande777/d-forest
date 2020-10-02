const df = require('./index');

const data = [
    { name: 'category1', active: false },
    {
        name: 'category2', active: true,
        products: [
            { name: 'product21', active: false },
            { name: 'product22', active: true },
            { name: 'product23', active: false },
        ],
    },
    {
        name: 'category3', active: true,
        products: [
            { name: 'product31', active: false },
            { name: 'product32', active: true },
        ],
    },
];

test('find leaf', () => {
    expect(df(data).findLeaf(leaf => leaf.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findLeaf(leaf => leaf.name === 'category2')).toBe(undefined);
    expect(df(data).findLeaf(leaf => leaf.name === 'category1')).toBe(data[0]);
});

test('find node', () => {
    expect(df(data).findNode(node => node.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findNode(node => node.name === 'category2')).toBe(data[1]);
});

test('find leaves', () => {
    expect(df(data).findLeaves(leaf => leaf.active))
        .toStrictEqual([data[1].products[1], data[2].products[1]]);
});

test('find nodes', () => {
    expect(df(data).findNodes(node => node.active))
        .toStrictEqual([data[1], data[2], data[1].products[1], data[2].products[1]]);
});

test('map leaves', () => {
    expect(df(data).mapLeaves(leaf => leaf.name))
        .toStrictEqual([
            'category1',
            'product21', 'product22',
            'product23', 'product31', 'product32'
        ]);
});

test('nodes by level', () => {
    expect(df(data).nodesByLevel(1))
        .toStrictEqual([...data[1].products, ...data[2].products]);
});

test('objectify', () => {
    expect(df(data).objectify(node => node.name))
        .toStrictEqual({
            category1: { name: 'category1', active: false },
            category2: {
                name: 'category2', active: true,
                products: {
                    product21: { name: 'product21', active: false },
                    product22: { name: 'product22', active: true },
                    product23: { name: 'product23', active: false },
                },
            },
            category3: {
                name: 'category3', active: true,
                products: {
                    product31: { name: 'product31', active: false },
                    product32: { name: 'product32', active: true },
                },
            },
        });
});

test('reduce', () => {
    expect(df(data).reduce((acc, cur) => acc + cur.name + '/', ''))
        .toStrictEqual([
            "category1/",
            "category2/product21/",
            "category2/product22/",
            "category2/product23/",
            "category3/product31/",
            "category3/product32/",
        ]);
});