const df = require('../index');
const { data, data2, data3 } = require('./test-data');

test('for-each leaf', () => {
    const expected = ['product21', 'product22', 'product23', 'product31', 'product32'];
    const products = [];
    let maxHeight = df(data).maxHeight();
    df(data).forEachLeaf((leaf, depth) => depth + 1 === maxHeight && products.push(leaf.name));
    expect(products).toStrictEqual(expected);
    products.length = 0;
    maxHeight = df(data2).maxHeight();
    df(data2).forEachLeaf((leaf, depth) => depth + 1 === maxHeight && products.push(leaf.name));
    expect(products).toStrictEqual(expected);
    products.length = 0;
    df(data3).forEachLeaf((leaf) => products.push(leaf.name));
    expect(products).toStrictEqual(expected);
});

test('find leaf', () => {
    expect(df(data).findLeaf((leaf) => leaf.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findLeaf((leaf) => leaf.name === 'category2')).toBe(undefined);
    expect(df(data).findLeaf((leaf) => leaf.name === 'category1')).toBe(data[0]);
    // data2
    expect(df(data2).findLeaf((leaf) => leaf.name === 'product31')).toBe(data2.c3.products.p1);
    expect(df(data2).findLeaf((leaf) => leaf.name === 'category2')).toBe(undefined);
    expect(df(data2).findLeaf((leaf) => leaf.name === 'category1')).toBe(data2.c1);
    // data3
    expect(df(data3).findLeaf((leaf) => leaf.name === 'product31')).toBe(data3[1][0]);
});

test('find leaves', () => {
    const expected = [data[1].products[1], data[2].products[1]];
    expect(df(data).findLeaves((leaf) => leaf.active)).toStrictEqual(expected);
    expect(df(data2).findLeaves((leaf) => leaf.active)).toStrictEqual(expected);
    expect(df(data3).findLeaves((leaf) => leaf.active)).toStrictEqual(expected);
});

test('map leaves', () => {
    const res = ['category1', 'product21', 'product22', 'product23', 'product31', 'product32'];
    expect(df(data).mapLeaves((leaf) => leaf.name)).toStrictEqual(res);
    expect(df(data2).mapLeaves((leaf) => leaf.name)).toStrictEqual(res);
    expect(df(data3).mapLeaves((leaf) => leaf.name)).toStrictEqual(res.slice(1));
});

test('every leaf', () => {
    expect(df(data).everyLeaf((leaf) => leaf.name?.includes('product'))).toBe(false);
    expect(df(data2).everyLeaf((leaf) => leaf.name?.includes('product'))).toBe(false);
    expect(df(data3).everyLeaf((leaf) => leaf.name?.includes('product'))).toBe(true);
});

test('min height', () => {
    expect(df(data).minHeight()).toBe(1);
    expect(df(data2).minHeight()).toBe(2);
    expect(df(data3).minHeight()).toBe(2);
});

test('max height', () => {
    expect(df(data).maxHeight()).toBe(2);
    expect(df(data2).maxHeight()).toBe(4);
    expect(df(data3).maxHeight()).toBe(2);
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
