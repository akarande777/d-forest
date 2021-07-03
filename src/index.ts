var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');

type Parent = {
    element: any | any[];
    key: string | number;
};

type Callback<T> = (node: any, depth: number, parent: Parent) => T;

type Reducer = (prev: any, curr: any, depth: number, parent: Parent) => any;

class Forest {
    constructor(private data) {}

    forEachLeaf = (callback: Callback<void>) => {
        depthFirst.call(this, callback, Actions.FOR_EACH);
    };

    forEachNode = (callback: Callback<void>) => {
        breadthFirst.call(this, callback, Actions.FOR_EACH);
    };

    findLeaf = (callback: Callback<boolean>) => {
        return depthFirst.call(this, callback, Actions.FIND);
    };

    findNode = (callback: Callback<boolean>) => {
        return breadthFirst.call(this, callback, Actions.FIND);
    };

    everyLeaf = (callback: Callback<boolean>): boolean => {
        return depthFirst.call(this, callback, Actions.EVERY);
    };

    everyNode = (callback: Callback<boolean>): boolean => {
        return breadthFirst.call(this, callback, Actions.EVERY);
    };

    findLeaves = (callback: Callback<boolean>): any[] => {
        return depthFirst.call(this, callback, Actions.FIND_ALL);
    };

    findNodes = (callback: Callback<boolean>): any[] => {
        return breadthFirst.call(this, callback, Actions.FIND_ALL);
    };

    mapLeaves = (callback: Callback<any>): any[] => {
        return depthFirst.call(this, callback, Actions.MAP);
    };

    minHeight = (): number => {
        return depthFirst.call(this, () => {}, Actions.MIN_HEIGHT);
    };

    maxHeight = (): number => {
        return depthFirst.call(this, () => {}, Actions.MAX_HEIGHT);
    };

    nodesByLevel = (level: number): any[] => {
        if (level <= 0) return this.data;
        return breadthFirst.call(this, () => {}, Actions.BY_LEVEL, { level });
    };

    reduce = (callback: Reducer, initial: any): any[] => {
        return depthFirst.call(this, callback, Actions.REDUCE, { initial });
    };
}

module.exports = (data) => new Forest(data);
