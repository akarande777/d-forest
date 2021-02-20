A lightweight JavaScript library for searching object in a tree-like structure.

[![npm version](https://img.shields.io/npm/v/d-forest)](https://www.npmjs.com/package/d-forest)
[![Build Status](https://travis-ci.com/akarande777/d-forest.svg?branch=master)](https://travis-ci.com/akarande777/d-forest)
[![Coverage Status](https://coveralls.io/repos/github/akarande777/d-forest/badge.svg?branch=master)](https://coveralls.io/github/akarande777/d-forest?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/npm/d-forest/badge.svg)](https://snyk.io/test/npm/d-forest)
[![npm downloads/month](https://img.shields.io/npm/dm/d-forest)](https://www.npmjs.com/package/d-forest)

## Install

`npm install d-forest --save`

## Usage

```javascript
const df = require('d-forest');

// data can be object or array of objects
const data = {
    name: 'categories',
    c1: { name: 'category1', active: false },
    c2: {
        name: 'category2',
        active: true,
        products: {
            name: 'products',
            p1: { name: 'product21', active: false },
            p2: { name: 'product22', active: true },
            p3: { name: 'product23', active: false },
        },
    },
    c3: {
        name: 'category3',
        active: true,
        products: {
            name: 'products',
            p1: { name: 'product31', active: false },
            p2: { name: 'product32', active: true },
        },
    },
};

// "node" can be any object on the tree
const res1 = df(data).findNode((node) => node.name === 'category3');
console.log(res1);
// { name: 'category3', active: true, products: [Object] }

// "leaf" can be any object which don't have children i.e. bottom nodes
const res2 = df(data).findLeaf((leaf) => leaf.name === 'product22');
console.log(res2);
// { name: 'product22', active: true }

// it is useful when you know that the object you want to find is a leaf
// it has better performance over "findNode" as it skips unnecessary comparisons
// note that every leaf is a node but not every node is a leaf
```

## Methods

#### findNode / findLeaf

#### findNodes / findLeaves

#### forEachNode / forEachLeaf

#### mapLeaves

#### everyNode / everyLeaf

```javascript
const res1 = df(data).everyNode((node) => node.hasOwnProperty('active'));
console.log(res1); // false
const res2 = df(data).everyLeaf((leaf) => leaf.hasOwnProperty('active'));
console.log(res2); // true
```

#### minHeight / maxHeight

```javascript
console.log(df(data).minHeight()); // 2
console.log(df(data).maxHeight()); // 4
```

#### nodesByLevel

```javascript
// returns an array containing all nodes at given level
console.log(df(data).nodesByLevel(1)); // should be greater than 0
// [
//   { name: 'category1', active: false },
//   { name: 'category2', active: true, products: [Object] },
//   { name: 'category3', active: true, products: [Object] }
// ]
```

#### reduce

```javascript
// returns single output value for each path from top to bottom
// initial value must be provided
df(data).reduce((acc, cur) => acc + '/' + cur.name, '');
// [
//   '/categories/category1',
//   '/categories/category2/products/product21',
//   '/categories/category2/products/product22',
//   '/categories/category2/products/product23',
//   '/categories/category3/products/product31',
//   '/categories/category3/products/product32'
// ]
```
