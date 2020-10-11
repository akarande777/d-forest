module.exports = {
    data: [
        { name: 'category1', active: false },
        {
            name: 'category2', active: true,
            products: [
                { name: 'product21', active: false },
                { name: 'product22', active: true },
                { name: 'product23', active: false },
            ],
        },
        {
            name: 'category3', active: true,
            products: [
                { name: 'product31', active: false },
                { name: 'product32', active: true },
            ],
        },
    ],

    data2: {
        name: 'categories',
        category1: { name: 'category1', active: false },
        category2: {
            name: 'category2', active: true,
            products: {
                name: 'products',
                product21: { name: 'product21', active: false },
                product22: { name: 'product22', active: true },
                product23: { name: 'product23', active: false },
            },
        },
        category3: {
            name: 'category3', active: true,
            products: {
                name: 'products',
                product31: { name: 'product31', active: false },
                product32: { name: 'product32', active: true },
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
        ]
    ],
};