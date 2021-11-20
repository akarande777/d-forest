const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('find node', () => {
    expect(df.findNode(data, (node) => node.name === 'product21')).toBe(data[1].products[0]);
    expect(df.findNode(data, (node) => node.name === 'category1')).toBe(data[0]);
    expect(df.findNode(data2, (node) => node.name === 'product31')).toBe(data2.c3.products.p1);
    expect(df.findNode(data2, (node) => node.name === 'category2')).toBe(data2.c2);
    expect(df.findNode(data3, (node) => node.name === 'product32')).toBe(data3[1][1]);
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
    let expected = [data[1], data[1].products[0]];
    expect(df.hierarchy(data, (node) => node.name === 'product21')).toStrictEqual(expected);
    let { products } = data2.c2;
    expected = [data2, data2.c2, products, products.p2];
    expect(df.hierarchy(data2, (node) => node.name === 'product22')).toStrictEqual(expected);
    expected = [data2, data2.c3];
    expect(df.hierarchy(data2, (node) => node.name === 'category3')).toStrictEqual(expected);
});

test('find level', () => {
    expect(df.findLevel(data, (node) => node.name === 'product21')).toBe(1);
    expect(df.findLevel(data2, (node) => node.name === 'category1')).toBe(1);
    expect(df.findLevel(data2, (node) => node.name === 'product31')).toBe(3);
    expect(df.findLevel(data3, (node) => node.name === 'product22')).toBe(1);
});

test('find by path', () => {
    expect(df.findByPath(data, [1, 'products', 0])).toStrictEqual(data[1].products[0]);
    expect(df.findByPath(data2, ['c2', 'products'])).toBe(data2.c2.products);
    expect(df.findByPath(data2, ['c3', 'products', 'p3'])).toBe();
    expect(df.findByPath(data3, [2, 1])).toBe(data[2][1]);
});

test('remove nodes', () => {
    let p22 = { name: 'product22', active: true };
    let p32 = { name: 'product32', active: true };
    let pred = (node) => node.active === false;
    expect(df.removeNodes(data, pred)).toStrictEqual([
        { name: 'category2', active: true, products: [p22] },
        { name: 'category3', active: true, products: [p32] },
    ]);
    expect(df.removeNodes(data2, pred)).toStrictEqual({
        c2: { name: 'category2', active: true, products: { p2: p22 } },
        c3: { name: 'category3', active: true, products: { p2: p32 } },
    });
    expect(df.removeNodes(data3, pred)).toStrictEqual([[p22], [p32]]);
});

test('update nodes', () => {
    let receive = (data) =>
        df.updateNodes(
            data,
            (node) => node.name === 'category1',
            (node) => ({ ...node, active: true })
        );
    let c1 = { name: 'category1', active: true };
    expect(receive(data)).toStrictEqual([c1, ...data.slice(1)]);
    expect(receive(data2)).toStrictEqual({ ...data2, c1 });
});

test('remove by level', () => {
    let c1 = { name: 'category1', active: false };
    let c2 = { name: 'category2', active: true, products: [] };
    let c3 = { name: 'category3', active: true, products: [] };
    expect(df.removeByLevel(data, 1)).toStrictEqual([c1, c2, c3]);
    delete c2.products;
    delete c3.products;
    expect(df.removeByLevel(data2, 2)).toStrictEqual({ c1, c2, c3 });
    expect(df.removeByLevel(data3, 1)).toStrictEqual([[], []]);
});
