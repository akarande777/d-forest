var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
var { isObject, copyByPath } = require('./utils');

type Path = Array<string | number>;

type Callback<T> = (node: any, depth: number, path: Path) => T;

type Reducer<T> = (acc: T, node: any, depth: number, path: Path) => T;

type PureFn<T> = (value: any) => T;

class Forest {
    forEachLeaf = (data, callback: Callback<void>) => {
        depthFirst(data, callback, Actions.FOR_EACH);
    };

    forEachNode = (data, callback: Callback<void>) => {
        breadthFirst(data, callback, Actions.FOR_EACH);
    };

    findLeaf = <Type>(data, predicate: Callback<boolean>): Type => {
        return depthFirst(data, predicate, Actions.FIND);
    };

    findNode = <Type>(data, predicate: Callback<boolean>): Type => {
        return breadthFirst(data, predicate, Actions.FIND);
    };

    everyLeaf = (data, predicate: Callback<boolean>): boolean => {
        return depthFirst(data, predicate, Actions.EVERY);
    };

    everyNode = (data, predicate: Callback<boolean>): boolean => {
        return breadthFirst(data, predicate, Actions.EVERY);
    };

    findLeaves = <Type>(data, predicate: Callback<boolean>): Type[] => {
        return depthFirst(data, predicate, Actions.FIND_ALL);
    };

    findNodes = <Type>(data, predicate: Callback<boolean>): Type[] => {
        return breadthFirst(data, predicate, Actions.FIND_ALL);
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

    hierarchy = (data, predicate: Callback<boolean>) => {
        var path = this.findPath(data, predicate);
        var last = data;
        var nodes = path.map((key) => (last = last[key]));
        return [data].concat(nodes).filter((el) => !Array.isArray(el));
    };

    findPath = (data, predicate: Callback<boolean>): Path => {
        var response = [];
        this.findNode(data, (node, depth, path) => {
            var value = predicate(node, depth, path);
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

    removeByPath = (data, path: Path) => {
        var { root, parent, key } = copyByPath(data, path);
        if (Array.isArray(parent)) {
            parent.splice(key, 1);
        } else {
            delete parent[key];
        }
        return root;
    };

    updateByPath = <T>(data, path: Path, callback: PureFn<T>) => {
        var { root, parent, key } = copyByPath(data, path);
        parent[key] = callback(parent[key]);
        return root;
    };

    removeNode = (data, predicate: Callback<boolean>) => {
        var path = this.findPath(data, predicate);
        if (path.length) {
            return this.removeByPath(data, path);
        }
    };

    updateNode = <T>(data, predicate: Callback<boolean>, callback: PureFn<T>) => {
        var path = this.findPath(data, predicate);
        if (path.length) {
            return this.updateByPath(data, path, callback);
        }
    };
}

module.exports = new Forest();
