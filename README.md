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
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
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
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
    },
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "bs": "synergize scalable supply-chains"
    }
}]

// "node" can be any object on tree
df(data).findNode(node => node.name === 'Deckow-Crist');
// {
//     name: 'Deckow-Crist',
//     bs: 'synergize scalable supply-chains'
// }

// "leaf" can be any object which don't have children
// this is useful when you know that the object you want to find has no children i.e. bottom nodes
// it has better performance over findNode as it skips the unnecessary comparisons
df(data).findLeaf(leaf => Number(leaf.lng) > 0);
// {
//     lat: '-37.3159',
//     lng: '81.1496'
// }
````