module.exports = {
    data: [
        { name: 'category1', active: false },
        {
            name: 'category2',
            active: true,
            products: [
                { name: 'product21', active: false },
                { name: 'product22', active: true },
                { name: 'product23', active: false },
            ],
        },
        {
            name: 'category3',
            active: true,
            products: [
                { name: 'product31', active: false },
                { name: 'product32', active: true },
            ],
        },
    ],

    data2: {
        c1: { name: 'category1', active: false },
        c2: {
            name: 'category2',
            active: true,
            products: {
                p1: { name: 'product21', active: false },
                p2: { name: 'product22', active: true },
                p3: { name: 'product23', active: false },
            },
        },
        c3: {
            name: 'category3',
            active: true,
            products: {
                p1: { name: 'product31', active: false },
                p2: { name: 'product32', active: true },
            },
        },
    },

    data3: [
        [
            { name: 'product21', active: false },
            { name: 'product22', active: true },
            { name: 'product23', active: false },
        ],
        [
            { name: 'product31', active: false },
            { name: 'product32', active: true },
        ],
    ],
};
