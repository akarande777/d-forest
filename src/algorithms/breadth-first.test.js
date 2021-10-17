const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('find node', () => {
    expect(df.findNode(data, (node) => node.name === 'product31')).toBe(data[2].products[0]);
    expect(df.findNode(data, (node) => node.name === 'category2')).toBe(data[1]);
    expect(df.findNode(data2, (node) => node.name === 'product31')).toBe(data2.c3.products.p1);
    expect(df.findNode(data2, (node) => node.name === 'category2')).toBe(data2.c2);
    expect(df.findNode(data3, (node) => node.name === 'product31')).toBe(data3[1][0]);
});

test('find nodes', () => {
    let expected = [data[1], data[2], data[1].products[1], data[2].products[1]];
    expect(df.findNodes(data, (node) => node.active)).toStrictEqual(expected);
    let { c2, c3 } = data2;
    expected = [c2, c3, c2.products.p2, c3.products.p2];
    expect(df.findNodes(data2, (node) => node.active)).toStrictEqual(expected);
});

test('for-each node', () => {
    let expected = ['category2', 'category3', 'product22', 'product32'];
    let products = [];
    df.forEachNode(data, (node) => node.active && products.push(node.name));
    expect(products).toStrictEqual(expected);
    products = [];
    df.forEachNode(data2, (node) => node.active && products.push(node.name));
    expect(products).toStrictEqual(expected);
});

test('every node', () => {
    expect(df.everyNode(data, (node) => node.hasOwnProperty('active'))).toBe(true);
    expect(df.everyNode(data2, (node) => node.hasOwnProperty('active'))).toBe(false);
    expect(df.everyNode(data3, (node) => node.hasOwnProperty('active'))).toBe(true);
});

test('nodes by level', () => {
    let expected = [...data[1].products, ...data[2].products];
    expect(df.nodesByLevel(data, 1)).toStrictEqual(expected);
    expect(df.nodesByLevel(data, 0)).toStrictEqual(data);
    let { c1, c2, c3 } = data2;
    expect(df.nodesByLevel(data2, 1)).toStrictEqual([c1, c2, c3]);
    expect(df.nodesByLevel(data2, 3)).toStrictEqual(expected);
    expect(df.nodesByLevel(data3, 1)).toStrictEqual(expected);
});

test('hierarchy', () => {
    let expected = [data[1], data[1].products[1]];
    expect(df.hierarchy(data, (node) => node.name === 'product22')).toStrictEqual(expected);
    let { products } = data2.c2;
    expected = [data2, data2.c2, products, products.p2];
    expect(df.hierarchy(data2, (node) => node.name === 'product22')).toStrictEqual(expected);
    expected = [data2, data2.c3];
    expect(df.hierarchy(data2, (node) => node.name === 'category3')).toStrictEqual(expected);
});
