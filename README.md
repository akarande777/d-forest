Find an object in a tree-like structure.

[![npm version](https://img.shields.io/npm/v/d-forest)](https://www.npmjs.com/package/d-forest)
[![build status](https://img.shields.io/travis/akarande777/d-forest)](https://travis-ci.com/github/akarande777/d-forest/builds)
[![code size](https://img.shields.io/github/languages/code-size/akarande777/d-forest)](https://github.com/akarande777/d-forest)
[![top language](https://img.shields.io/github/languages/top/akarande777/d-forest)](https://github.com/akarande777/d-forest)

## Install

`npm install d-forest`

## Usage

````javascript
const df = require('d-forest');

// data can be object or array of objects
const data = [
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
];

// "node" can be any object on the tree
const res1 = df(data).findNode(node => node.name === 'category3');
console.log(res1);
// {
//   name: 'category3', active: true,
//   products: [Object]
// }

// "leaf" can be any object which don't have children i.e. bottom nodes
// it has better performance over findNode as it skips unnecessary comparisons
const res2 = df(data).findLeaf(leaf => leaf.name === 'product22');
console.log(res2);
// { name: 'product22', active: false }

const res3 = df(data).nodesByLevel(1); // should be greater than 0
console.log(res3);
// [
//   { name: 'product21', active: false },
//   { name: 'product22', active: true },
//   ...
// ]

const res4 = df(data).objectify(node => node.name);
console.log(res4);
// {
//   category1: { name: 'category1', active: false },
//   category2: {
//     name: 'category2', active: true,
//     products: Object
//   },
//   ...
// }
````

## Methods

* findNode
* findNodes
* findLeaf
* findLeaves
* forEachNode
* forEachLeaf
* mapLeaves
* nodesByLevel
* removeNode
* removeNodes
* removeLeaf
* removeLeaves
* objectify