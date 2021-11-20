## d-forest

[![npm version](https://img.shields.io/npm/v/d-forest)](https://www.npmjs.com/package/d-forest)
[![Build Status](https://travis-ci.com/akarande777/d-forest.svg?branch=master)](https://travis-ci.com/akarande777/d-forest)
[![Coverage Status](https://coveralls.io/repos/github/akarande777/d-forest/badge.svg?branch=master)](https://coveralls.io/github/akarande777/d-forest?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/npm/d-forest/badge.svg)](https://snyk.io/test/npm/d-forest)
[![npm downloads/month](https://img.shields.io/npm/dm/d-forest)](https://www.npmjs.com/package/d-forest)

A lightweight JavaScript library for searching object in a tree-like structure.

## Install

`npm install d-forest --save`

## Usage

```javascript
const df = require('d-forest');

// data can have array of objects
const data = {
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
};

// "node" can be any object on the tree
df.findNode(data, (node) => node.name === 'category3');
// { name: 'category3', active: true, products: [Object] }

// "leaf" can be any object which don't have children i.e. bottom nodes
df.findLeaf(data, (leaf) => leaf.name === 'product22');
// { name: 'product22', active: true }

// this method is useful when you know that the object you want to find is a leaf
// note that every leaf is a node but not every node is a leaf
```

## Methods

-   #### findNode | findLeaf

-   #### findNodes | findLeaves

-   #### forEachNode | forEachLeaf

-   #### mapLeaves

```javascript
let level = df.maxHeight(data) - 1;
// level argument (optional) can be used to map leaves at specific level
df.mapLeaves(data, (leaf) => leaf.name, level);
// ['product21', 'product22', 'product23', 'product31', 'product32']
```

-   #### everyNode | everyLeaf

```javascript
df.everyNode(data, (node) => node.hasOwnProperty('active'));
// false
df.everyLeaf(data, (leaf) => leaf.hasOwnProperty('active'));
// true
```

-   #### minHeight | maxHeight

```javascript
df.minHeight(data); // 2
df.maxHeight(data); // 4
```

-   #### nodesByLevel

```javascript
// returns an array containing all nodes at given level
df.nodesByLevel(data, 1); // level >= 0
// [
//   { name: 'category1', active: false },
//   { name: 'category2', active: true, products: [Object] },
//   { name: 'category3', active: true, products: [Object] }
// ]
```

-   #### reduce

```javascript
// returns single output value for each path from top to bottom
// initial value must be provided
df.reduce(data, (acc, cur) => (cur.name ? `${acc}/${cur.name}` : acc), '');
// [
//    '/category1',
//    '/category2/product21',
//    '/category2/product22',
//    '/category2/product23',
//    '/category3/product31',
//    '/category3/product32'
// ]
```

-   #### hierarchy

```javascript
// returns object hierarchy from root
const nodes = df.hierarchy(data, (node) => node.name === 'product31');
nodes.map((node) => node.name).filter(Boolean);
// ['category3', 'product31']
```

-   #### findLevel

```javascript
df.findLevel(data, (node) => node.name === 'category2'); // 1
df.findLevel(data, (node) => node.name === 'product21'); // 3
```

-   #### findPath | findByPath

```javascript
df.findPath(data, (node) => node.name === 'product22');
// [ 'c2', 'products', 'p2' ]
df.findByPath(data, ['c2', 'products', 'p2']);
// { name: 'product22', active: true }
```

> Following methods don't mutate data, instead return new one with shared mutable state.

-   #### removeByPath

-   #### removeNodes | removeLeaves

```javascript
df.removeLeaves(data, (leaf) => leaf.active === false);
// {
//   c2: {
//     name: 'category2',
//     active: true,
//     products: { p2: [Object] }
//   },
//   c3: {
//     name: 'category3',
//     active: true,
//     products: { p2: [Object] }
//   }
// }
```

-   #### updateByPath

-   #### updateNodes | updateLeaves

```javascript
df.updateNodes(
    data,
    (node, depth) => depth === 1 && node.active,
    (node) => ({ ...node, products: null })
);
// {
//   c1: { name: 'category1', active: false },
//   c2: { name: 'category2', active: true, products: null },
//   c3: { name: 'category3', active: true, products: null }
// }
```

-   #### removeByLevel

```javascript
df.removeByLevel(data, 2);
// {
//   c1: { name: 'category1', active: false },
//   c2: { name: 'category2', active: true },
//   c3: { name: 'category3', active: true }
// }
```
