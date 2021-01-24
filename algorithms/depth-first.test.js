const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('find leaf', () => {
    expect(df(data).findLeaf((leaf) => leaf.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findLeaf((leaf) => leaf.name === 'category2')).toBe(undefined);
    expect(df(data).findLeaf((leaf) => leaf.name === 'category1')).toBe(data[0]);
    // data2
    expect(df(data2).findLeaf((leaf) => leaf.name === 'product31')).toStrictEqual({
        name: 'product31',
        active: false,
    });
    expect(df(data2).findLeaf((leaf) => leaf.name === 'category2')).toBe(undefined);
    expect(df(data2).findLeaf((leaf) => leaf.name === 'category1')).toBe(data2.c1);
    // data3
    expect(df(data3).findLeaf((leaf) => leaf.name === 'product31')).toBe(data3[1][0]);
});

test('find leaves', () => {
    expect(df(data).findLeaves((leaf) => leaf.active)).toStrictEqual([
        data[1].products[1],
        data[2].products[1],
    ]);
    expect(df(data2).findLeaves((leaf) => leaf.active)).toStrictEqual([
        data[1].products[1],
        data[2].products[1],
    ]);
});

test('for-each leaf', () => {
    const expected = ['product21', 'product22', 'product23', 'product31', 'product32'];
    const products = [];
    df(data).forEachLeaf((leaf, depth) => depth === 1 && products.push(leaf.name));
    expect(products).toStrictEqual(expected);
    products.length = 0;
    df(data2).forEachLeaf((leaf, depth) => depth === 3 && products.push(leaf.name));
    expect(products).toStrictEqual(expected);
});

test('map leaves', () => {
    const res = ['category1', 'product21', 'product22', 'product23', 'product31', 'product32'];
    expect(df(data).mapLeaves((leaf) => leaf.name)).toStrictEqual(res);
    expect(df(data2).mapLeaves((leaf) => leaf.name)).toStrictEqual(res);
});

test('remove leaf', () => {
    const copy = JSON.parse(JSON.stringify(data));
    expect(df(copy).removeNode((leaf) => leaf.name === 'product22')).toStrictEqual(
        data[1].products[1]
    );
    expect(copy[1].products).toStrictEqual([data[1].products[0], data[1].products[2]]);
    // data2
    const copy2 = JSON.parse(JSON.stringify(data2));
    expect(df(copy2).removeNode((leaf) => leaf.name === 'product22')).toStrictEqual(
        data[1].products[1]
    );
    expect(copy2.c2.products).toStrictEqual({
        name: 'products',
        p1: { name: 'product21', active: false },
        p3: { name: 'product23', active: false },
    });
});

test('reduce', () => {
    expect(df(data).reduce((acc, cur) => acc + cur.name + '/', '')).toStrictEqual([
        'category1/',
        'category2/product21/',
        'category2/product22/',
        'category2/product23/',
        'category3/product31/',
        'category3/product32/',
    ]);
    expect(df(data2).reduce((acc, cur) => acc + cur.name + '/', '')).toStrictEqual([
        'categories/category1/',
        'categories/category2/products/product21/',
        'categories/category2/products/product22/',
        'categories/category2/products/product23/',
        'categories/category3/products/product31/',
        'categories/category3/products/product32/',
    ]);
});
