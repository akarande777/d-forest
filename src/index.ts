var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
const { isObject, shallowCopy } = require('./utils');

type Path = Array<string | number>;

type Callback<T> = (node: any, depth: number, path: Path) => T;

type Reducer<T> = (acc: T, node: any, depth: number, path: Path) => T;

class Forest {
    forEachLeaf = (data, callback: Callback<void>): void => {
        depthFirst(data, callback, Actions.FOR_EACH);
    };

    forEachNode = (data, callback: Callback<void>): void => {
        breadthFirst(data, callback, Actions.FOR_EACH);
    };

    findLeaf = <Type>(data, callback: Callback<boolean>): Type => {
        return depthFirst(data, callback, Actions.FIND);
    };

    findNode = <Type>(data, callback: Callback<boolean>): Type => {
        return breadthFirst(data, callback, Actions.FIND);
    };

    everyLeaf = (data, callback: Callback<boolean>): boolean => {
        return depthFirst(data, callback, Actions.EVERY);
    };

    everyNode = (data, callback: Callback<boolean>): boolean => {
        return breadthFirst(data, callback, Actions.EVERY);
    };

    findLeaves = <Type>(data, callback: Callback<boolean>): Type[] => {
        return depthFirst(data, callback, Actions.FIND_ALL);
    };

    findNodes = <Type>(data, callback: Callback<boolean>): Type[] => {
        return breadthFirst(data, callback, Actions.FIND_ALL);
    };

    mapLeaves = <Type>(data, callback: Callback<Type>, level: number = -1): Type[] => {
        return depthFirst(data, callback, Actions.MAP, { level });
    };

    minHeight = (data): number => {
        return depthFirst(data, () => {}, Actions.MIN_HEIGHT);
    };

    maxHeight = (data): number => {
        return depthFirst(data, () => {}, Actions.MAX_HEIGHT);
    };

    nodesByLevel = <Type>(data, level: number): Type[] => {
        if (level <= 0) return data;
        return breadthFirst(data, () => {}, Actions.BY_LEVEL, { level });
    };

    reduce = <Type>(data, callback: Reducer<Type>, initial: Type): Type[] => {
        return depthFirst(data, callback, Actions.REDUCE, { initial });
    };

    hierarchy = <Type>(data, callback: Callback<boolean>): Type[] => {
        var path = this.findPath(data, callback);
        var last = data;
        var nodes = path.map((key) => (last = last[key]));
        return [data, ...nodes].filter((el) => !Array.isArray(el));
    };

    findPath = (data, callback: Callback<boolean>): Path => {
        var response = [];
        this.findNode(data, (node, depth, path) => {
            var value = callback(node, depth, path);
            if (value) response = path;
            return value;
        });
        return response;
    };

    findByPath = <Type>(data, path: Path): Type => {
        return path.reduce((acc, key) => {
            if (isObject(acc)) return acc[key];
        }, data);
    };

    removeByPath = <Type>(data, path: Path): Type => {
        var root = shallowCopy(data);
        var parent = path.slice(0, -1).reduce((acc, key) => {
            acc[key] = shallowCopy(acc[key]);
            return acc[key];
        }, root);
        var key = path[path.length - 1];
        if (Array.isArray(parent)) {
            parent.splice(key as number, 1);
        } else {
            delete parent[key];
        }
        return root;
    };

    removeNodes = <Type>(data, callback: Callback<boolean>): Type => {
        var path = this.findPath(data, callback);
        var response = data;
        while (path.length) {
            response = this.removeByPath(response, path);
            path = this.findPath(response, callback);
        }
        return response;
    };
}

module.exports = new Forest();
