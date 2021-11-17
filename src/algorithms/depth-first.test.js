const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('for-each leaf', () => {
    let expected = ['category1', 'product21', 'product22', 'product23', 'product31', 'product32'];
    let products = [];
    df.forEachLeaf(data, (leaf) => products.push(leaf.name));
    expect(products).toStrictEqual(expected);
    products = [];
    df.forEachLeaf(data2, (leaf) => products.push(leaf.name));
    expect(products).toStrictEqual(expected);
    products = [];
    df.forEachLeaf(data3, (leaf) => products.push(leaf.name));
    expect(products).toStrictEqual(expected.slice(1));
});

test('find leaf', () => {
    expect(df.findLeaf(data, (leaf) => leaf.name === 'product21')).toBe(data[1].products[0]);
    expect(df.findLeaf(data, (leaf) => leaf.name === 'category2')).toBe();
    expect(df.findLeaf(data, (leaf) => leaf.name === 'category1')).toBe(data[0]);
    // data2
    expect(df.findLeaf(data2, (leaf) => leaf.name === 'product31')).toBe(data2.c3.products.p1);
    expect(df.findLeaf(data2, (leaf) => leaf.name === 'category3')).toBe();
    expect(df.findLeaf(data2, (leaf) => leaf.name === 'category1')).toBe(data2.c1);
    // data3
    expect(df.findLeaf(data3, (leaf) => leaf.name === 'product32')).toBe(data3[1][1]);
});

test('find leaves', () => {
    let expected = [data[1].products[1], data[2].products[1]];
    expect(df.findLeaves(data, (leaf) => leaf.active)).toStrictEqual(expected);
    expect(df.findLeaves(data2, (leaf) => leaf.active)).toStrictEqual(expected);
    expect(df.findLeaves(data3, (leaf) => leaf.active)).toStrictEqual(expected);
});

test('map leaves', () => {
    let expected = ['category1', 'product21', 'product22', 'product23', 'product31', 'product32'];
    expect(df.mapLeaves(data, (leaf) => leaf.name)).toStrictEqual(expected);
    let maxLevel = df.maxHeight(data) - 1;
    expect(df.mapLeaves(data, (leaf) => leaf.name, maxLevel)).toStrictEqual(expected.slice(1));
    expect(df.mapLeaves(data2, (leaf) => leaf.name)).toStrictEqual(expected);
    maxLevel = df.maxHeight(data2) - 1;
    expect(df.mapLeaves(data2, (leaf) => leaf.name, maxLevel)).toStrictEqual(expected.slice(1));
    expect(df.mapLeaves(data3, (leaf) => leaf.name)).toStrictEqual(expected.slice(1));
});

test('every leaf', () => {
    expect(df.everyLeaf(data, (_, depth) => depth === 1)).toBe(false);
    expect(df.everyLeaf(data2, (_, depth) => depth === 1)).toBe(false);
    expect(df.everyLeaf(data3, (_, depth) => depth === 1)).toBe(true);
});

test('min height', () => {
    expect(df.minHeight(data)).toBe(1);
    expect(df.minHeight(data2)).toBe(2);
    expect(df.minHeight(data3)).toBe(2);
});

test('max height', () => {
    expect(df.maxHeight(data)).toBe(2);
    expect(df.maxHeight(data2)).toBe(4);
    expect(df.maxHeight(data3)).toBe(2);
});

test('reduce', () => {
    expect(df.reduce(data, (acc, cur) => `${acc}/${cur.name}`, '')).toStrictEqual([
        '/category1',
        '/category2/product21',
        '/category2/product22',
        '/category2/product23',
        '/category3/product31',
        '/category3/product32',
    ]);
    let reducer = (acc, cur) => (cur.name ? `${acc}/${cur.name}` : acc);
    expect(df.reduce(data2, reducer, '')).toStrictEqual([
        '/category1',
        '/category2/product21',
        '/category2/product22',
        '/category2/product23',
        '/category3/product31',
        '/category3/product32',
    ]);
});

test('remove leaves', () => {
    let p22 = { name: 'product22', active: true };
    let p32 = { name: 'product32', active: true };
    let pred = (node) => node.active === false;
    expect(df.removeLeaves(data, pred)).toStrictEqual([
        { name: 'category2', active: true, products: [p22] },
        { name: 'category3', active: true, products: [p32] },
    ]);
    expect(df.removeLeaves(data2, pred)).toStrictEqual({
        c2: { name: 'category2', active: true, products: { p2: p22 } },
        c3: { name: 'category3', active: true, products: { p2: p32 } },
    });
    expect(df.removeLeaves(data3, pred)).toStrictEqual([[p22], [p32]]);
});

test('update leaves', () => {
    let receive = (data) =>
        df.updateLeaves(
            data,
            (node) => node.name === 'category1',
            (node) => ({ ...node, products: [] })
        );
    let c1 = { ...data[0], products: [] };
    expect(receive(data)).toStrictEqual([c1, ...data.slice(1)]);
    expect(receive(data2)).toStrictEqual({ ...data2, c1 });
});
