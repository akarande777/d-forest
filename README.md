Find an object in a tree-like structure.

## Install

`npm install d-forest`

## Usage

````javascript
const df = require('d-forest');

// data can be object or array of objects
const data = [{
    "id": 1,
    "name": "Leanne Graham",
    "address": {
        "street": "Kulas Light",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": { "lat": "-37.3159", "lng": "81.1496" }
    },
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "bs": "harness real-time e-markets"
    }
}, {
    "id": 2,
    "name": "Ervin Howell",
    "address": {
        "street": "Victor Plains",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": { "lat": "-43.9509", "lng": "-34.4618" }
    },
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "bs": "synergize scalable supply-chains"
    }
}]

// "node" can be any object on tree
const res1 = df(data).findNode(node => node.name === 'Deckow-Crist');
console.log(res1);
// {
//   name: 'Deckow-Crist',
//   bs: 'synergize scalable supply-chains'
// }

// "leaf" can be any object which don't have children
// this is useful when you know that the object you want to find has no children i.e. bottom nodes
// it has better performance over findNode as it skips the unnecessary comparisons
const res2 = df(data).findLeaf(leaf => Number(leaf.lng) > 0);
console.log(res2);
// { lat: '-37.3159', lng: '81.1496' }

const res3 = df(data).nodesByLevel(2); // should be greater than 0
console.log(res3);
// [
//   { lat: '-37.3159', lng: '81.1496' },
//   { lat: '-43.9509', lng: '-34.4618' }
// ]
````

## Methods

* findNode
* findNodes
* forEachNode
* findLeaf
* findLeaves
* forEachLeaf
* mapLeaves
* nodesByLevel