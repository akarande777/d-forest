const df = require('../index');
const { data, data2 } = require('./test-data');

test('find node', () => {
    expect(df(data).findNode(node => node.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findNode(node => node.name === 'category2')).toBe(data[1]);

    expect(df(data2).findNode(node => node.name === 'product31')).toStrictEqual(data[2].products[0]);
    expect(df(data2).findNode(node => node.name === 'category2')).toBe(data2.category2);
});

test('find nodes', () => {
    expect(df(data).findNodes(node => node.active))
        .toStrictEqual([data[1], data[2], data[1].products[1], data[2].products[1]]);
    const { category2, category3 } = data2;
    expect(df(data2).findNodes(node => node.active)).toStrictEqual(
        [category2, category3, category2.products.product22, category3.products.product32]
    );
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
    expect(df(data).nodesByLevel(1)).toStrictEqual([...data[1].products, ...data[2].products]);
    expect(df(data).nodesByLevel(0)).toStrictEqual([]);
    const { category1, category2, category3 } = data2;
    expect(df(data2).nodesByLevel(1)).toStrictEqual([category1, category2, category3]);
});

test('remove node', () => {
    const copy = JSON.parse(JSON.stringify(data));
    expect(df(copy).removeNode(node => node.name === 'product22')).toStrictEqual(data[1].products[1]);
    df(copy).removeNode(node => node.name === 'category2');
    expect(copy).toStrictEqual([data[0], data[2]]);

    const copy2 = JSON.parse(JSON.stringify(data2));
    expect(df(copy2).removeNode(node => node.name === 'product22')).toStrictEqual(data[1].products[1]);
    df(copy2).removeNode(node => node.name === 'category2');
    const { category1, category3 } = data2;
    expect(copy2).toStrictEqual({ name: 'categories', category1, category3 });
});
