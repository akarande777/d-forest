var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
var { isObject, copyByPath } = require('./utils');

type Path = Array<string | number>;

type Callback<T> = (node: any, depth: number, path: Path) => T;

type Reducer<T> = (acc: T, node: any, depth: number, path: Path) => T;

type PureFn<T> = (value: any) => T;

type NodeType = 'node' | 'leaf';

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

    mapLeaves = <Type>(data, callback: Callback<Type>, level = -1): Type[] => {
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

    findLevel = (data, predicate: Callback<boolean>): number => {
        var level = -1;
        this.findNode(data, (node, depth, path) => {
            var value = predicate(node, depth, path);
            if (value) level = depth;
            return value;
        });
        return level;
    };

    findPath = (data, predicate: Callback<boolean>, type?: NodeType): Path => {
        var _path = [];
        var findNode = type === 'leaf' ? this.findLeaf : this.findNode;
        findNode(data, (node, depth, path) => {
            var value = predicate(node, depth, path);
            if (value) _path = path;
            return value;
        });
        return _path;
    };

    findPathAll = (data, predicate: Callback<boolean>, type?: NodeType): Path[] => {
        var _paths = [];
        var findNodes = type === 'leaf' ? this.findLeaves : this.findNodes;
        findNodes(data, (node, depth, path) => {
            var value = predicate(node, depth, path);
            if (value) _paths.push(path);
            return value;
        });
        return _paths;
    };

    findByPath = <Type>(data, path: Path): Type => {
        return path.reduce((acc, key) => {
            if (isObject(acc)) return acc[key];
        }, data);
    };

    removeByPath = (data, path: Path) => {
        var { root, parent, key } = copyByPath(data, path);
        Array.isArray(parent) ? parent.splice(key, 1) : delete parent[key];
        return root;
    };

    removeNodes = (data, predicate: Callback<boolean>) => {
        var _paths = this.findPathAll(data, predicate, 'node');
        var response = data;
        _paths.reverse().forEach((path) => {
            response = this.removeByPath(response, path);
        });
        return response;
    };

    removeLeaves = (data, predicate: Callback<boolean>) => {
        var _paths = this.findPathAll(data, predicate, 'leaf');
        var response = data;
        _paths.reverse().forEach((path) => {
            response = this.removeByPath(response, path);
        });
        return response;
    };

    updateByPath = <T>(data, path: Path, callback: PureFn<T>) => {
        var { root, parent, key } = copyByPath(data, path);
        parent[key] = callback(parent[key]);
        return root;
    };

    updateNodes = <T>(data, predicate: Callback<boolean>, callback: PureFn<T>) => {
        var _paths = this.findPathAll(data, predicate, 'node');
        var response = data;
        _paths.reverse().forEach((path) => {
            response = this.updateByPath(response, path, callback);
        });
        return response;
    };

    updateLeaves = <T>(data, predicate: Callback<boolean>, callback: PureFn<T>) => {
        var _paths = this.findPathAll(data, predicate, 'leaf');
        var response = data;
        _paths.forEach((path) => {
            response = this.updateByPath(response, path, callback);
        });
        return response;
    };
}

module.exports = new Forest();
