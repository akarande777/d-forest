const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('find node', () => {
    expect(df(data).findNode(node => node.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findNode(node => node.name === 'category2')).toBe(data[1]);

    expect(df(data2).findNode(node => node.name === 'product31')).toStrictEqual(data[2].products[0]);
    expect(df(data2).findNode(node => node.name === 'category2')).toBe(data2.c2);
    expect(df(data3).findNode(node => node.name === 'product31')).toBe(data3[1][0]);
});

test('find nodes', () => {
    expect(df(data).findNodes(node => node.active))
        .toStrictEqual([data[1], data[2], data[1].products[1], data[2].products[1]]);
    const { c2, c3 } = data2;
    expect(df(data2).findNodes(node => node.active))
        .toStrictEqual([c2, c3, c2.products.p2, c3.products.p2]);
});

test('for-each node', () => {
    const expected = ['category2', 'category3', 'product22', 'product32'];
    const products = [];
    df(data).forEachNode(node => node.active && products.push(node.name));
    expect(products).toStrictEqual(expected);
    products.length = 0;
    df(data2).forEachNode(node => node.active && products.push(node.name));
    expect(products).toStrictEqual(expected);
});

test('nodes by level', () => {
    const expected = [...data[1].products, ...data[2].products];
    expect(df(data).nodesByLevel(1)).toStrictEqual(expected);
    expect(df(data).nodesByLevel(0)).toStrictEqual([]);
    const { c1, c2, c3 } = data2;
    expect(df(data2).nodesByLevel(1)).toStrictEqual([c1, c2, c3]);
    expect(df(data2).nodesByLevel(3)).toStrictEqual(expected);
    expect(df(data3).nodesByLevel(1)).toStrictEqual(expected);
});

test('remove node', () => {
    const copy = JSON.parse(JSON.stringify(data));
    expect(df(copy).removeNode(node => node.name === 'product22')).toStrictEqual(data[1].products[1]);
    df(copy).removeNode(node => node.name === 'category2');
    expect(copy).toStrictEqual([data[0], data[2]]);

    const copy2 = JSON.parse(JSON.stringify(data2));
    expect(df(copy2).removeNode(node => node.name === 'product22')).toStrictEqual(data[1].products[1]);
    df(copy2).removeNode(node => node.name === 'category2');
    const { c1, c3 } = data2;
    expect(copy2).toStrictEqual({ name: 'categories', c1, c3 });
});
