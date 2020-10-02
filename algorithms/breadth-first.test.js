const df = require('../index');
const data = require('./test-data');

test('find node', () => {
    expect(df(data).findNode(node => node.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findNode(node => node.name === 'category2')).toBe(data[1]);
});

test('find nodes', () => {
    expect(df(data).findNodes(node => node.active))
        .toStrictEqual([data[1], data[2], data[1].products[1], data[2].products[1]]);
});

test('nodes by level', () => {
    expect(df(data).nodesByLevel(1))
        .toStrictEqual([...data[1].products, ...data[2].products]);
});

test('remove node', () => {
    const copy = JSON.parse(JSON.stringify(data));
    expect(df(copy).removeNode(node => node.name === 'product22'))
        .toStrictEqual(data[1].products[1]);
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