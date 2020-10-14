A lightweight JavaScript library for searching objects in a tree-like structure.

[![npm version](https://img.shields.io/npm/v/d-forest)](https://www.npmjs.com/package/d-forest)
[![Build Status](https://travis-ci.com/akarande777/d-forest.svg?branch=master)](https://travis-ci.com/akarande777/d-forest)
[![Coverage Status](https://coveralls.io/repos/github/akarande777/d-forest/badge.svg?branch=master)](
    https://coveralls.io/github/akarande777/d-forest?branch=master
)
[![Known Vulnerabilities](https://snyk.io/test/npm/d-forest/badge.svg)](https://snyk.io/test/npm/d-forest)
[![npm downloads/month](https://img.shields.io/npm/dm/d-forest)](https://www.npmjs.com/package/d-forest)

## Install

`npm install d-forest`

## Usage

````javascript
const df = require('d-forest');

// data can be object or array of objects
const data = {
    category1: { id: 'c1', active: false },
    category2: {
        id: 'c2', active: true,
        products: {
            product1: { id: 'p21', active: false },
            product2: { id: 'p22', active: true },
            product3: { id: 'p23', active: false },
        },
    },
    category3: {
        id: 'c3', active: true,
        products: {
            product1: { id: 'p31', active: false },
            product2: { id: 'p32', active: true },
        },
    },
};

// "node" can be any object on the tree
const res1 = df(data).findNode((node, depth, parent) => {
    const { element, key } = parent;
    return element && element.id === 'c3' && key === 'products';
});
console.log(res1);
// {
//   product1: { id: 'p31', active: false },
//   product2: { id: 'p32', active: true }
// }

// "leaf" can be any object which don't have children i.e. bottom nodes
// it has better performance over findNode as it skips unnecessary comparisons
const res2 = df(data).findLeaf(leaf => leaf.id === 'p22');
console.log(res2);
// { id: 'p22', active: true }
````

## Methods

* findNode
* findNodes
* findLeaf
* findLeaves
* forEachNode
* forEachLeaf
* mapLeaves
* removeNode
* removeLeaf
* **nodesByLevel**

````javascript
// returns an array containing all nodes at given level
const res3 = df(data).nodesByLevel(1); // should be greater than 0
console.log(res3);
// [
//   { id: 'c1', active: false },
//   { id: 'c2', active: true, products: [Object] },
//   { id: 'c3', active: true, products: [Object] }
// ]
````
* **reduce**

````javascript
// returns single output value for each path from top to bottom
const res = df(data).reduce(
    (acc, cur) => cur.id ? (acc + '/' + cur.id) : acc,
    '' // initial value must be provided
);
console.log(res);
// [ '/c1', '/c2/p21', '/c2/p22', '/c2/p23', '/c3/p31', '/c3/p32' ]