const df = require('../index');
const data = require('./test-data');

test('find leaf', () => {
    expect(df(data).findLeaf(leaf => leaf.name === 'product31')).toBe(data[2].products[0]);
    expect(df(data).findLeaf(leaf => leaf.name === 'category2')).toBe(undefined);
    expect(df(data).findLeaf(leaf => leaf.name === 'category1')).toBe(data[0]);
});

test('find leaves', () => {
    expect(df(data).findLeaves(leaf => leaf.active))
        .toStrictEqual([data[1].products[1], data[2].products[1]]);
});

test('map leaves', () => {
    expect(df(data).mapLeaves(leaf => leaf.name))
        .toStrictEqual([
            'category1',
            'product21', 'product22',
            'product23', 'product31', 'product32'
        ]);
});

test('remove leaf', () => {
    const copy = JSON.parse(JSON.stringify(data));
    expect(df(copy).removeNode(leaf => leaf.name === 'product22'))
        .toStrictEqual(data[1].products[1]);
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