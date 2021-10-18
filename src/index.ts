var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');

type Path = Array<string | number>;

type Callback<T> = (node: any, depth: number, path: Path) => T;

type Reducer = (prev: any, curr: any, depth: number, path: Path) => any;

class Forest {
    forEachLeaf = (data, callback: Callback<void>) => {
        depthFirst(data, callback, Actions.FOR_EACH);
    };

    forEachNode = (data, callback: Callback<void>) => {
        breadthFirst(data, callback, Actions.FOR_EACH);
    };

    findLeaf = (data, callback: Callback<boolean>) => {
        return depthFirst(data, callback, Actions.FIND);
    };

    findNode = (data, callback: Callback<boolean>) => {
        return breadthFirst(data, callback, Actions.FIND);
    };

    everyLeaf = (data, callback: Callback<boolean>): boolean => {
        return depthFirst(data, callback, Actions.EVERY);
    };

    everyNode = (data, callback: Callback<boolean>): boolean => {
        return breadthFirst(data, callback, Actions.EVERY);
    };

    findLeaves = (data, callback: Callback<boolean>): any[] => {
        return depthFirst(data, callback, Actions.FIND_ALL);
    };

    findNodes = (data, callback: Callback<boolean>): any[] => {
        return breadthFirst(data, callback, Actions.FIND_ALL);
    };

    mapLeaves = (data, callback: Callback<any>): any[] => {
        return depthFirst(data, callback, Actions.MAP);
    };

    minHeight = (data): number => {
        return depthFirst(data, () => {}, Actions.MIN_HEIGHT);
    };

    maxHeight = (data): number => {
        return depthFirst(data, () => {}, Actions.MAX_HEIGHT);
    };

    nodesByLevel = (data, level: number): any[] => {
        if (level <= 0) return data;
        return breadthFirst(data, () => {}, Actions.BY_LEVEL, { level });
    };

    reduce = (data, callback: Reducer, initial: any): any[] => {
        return depthFirst(data, callback, Actions.REDUCE, { initial });
    };

    hierarchy = (data, callback: Callback<boolean>): any[] => {
        var path = this.findPath(data, callback);
        var last = data;
        var nodes = path.map((key) => (last = last[key]));
        return [data, ...nodes].filter((el) => !Array.isArray(el));
    };

    findPath = (data, callback: Callback<boolean>): Path => {
        var response = [];
        this.forEachNode(data, (node, depth, path) => {
            if (callback(node, depth, path)) {
                response = path;
            }
        });
        return response;
    };
}

module.exports = new Forest();
