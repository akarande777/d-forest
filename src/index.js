var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
var _a = require('./utils'), isObject = _a.isObject, copyByPath = _a.copyByPath;
var Forest = /** @class */ (function () {
    function Forest() {
        var _this = this;
        this.forEachLeaf = function (data, callback) {
            depthFirst(data, callback, Actions.FOR_EACH);
        };
        this.forEachNode = function (data, callback) {
            breadthFirst(data, callback, Actions.FOR_EACH);
        };
        this.findLeaf = function (data, predicate) {
            return depthFirst(data, predicate, Actions.FIND);
        };
        this.findNode = function (data, predicate) {
            return breadthFirst(data, predicate, Actions.FIND);
        };
        this.everyLeaf = function (data, predicate) {
            return depthFirst(data, predicate, Actions.EVERY);
        };
        this.everyNode = function (data, predicate) {
            return breadthFirst(data, predicate, Actions.EVERY);
        };
        this.findLeaves = function (data, predicate) {
            return depthFirst(data, predicate, Actions.FIND_ALL);
        };
        this.findNodes = function (data, predicate) {
            return breadthFirst(data, predicate, Actions.FIND_ALL);
        };
        this.mapLeaves = function (data, callback, level) {
            if (level === void 0) { level = -1; }
            return depthFirst(data, callback, Actions.MAP, { level: level });
        };
        this.minHeight = function (data) {
            return depthFirst(data, function () { }, Actions.MIN_HEIGHT);
        };
        this.maxHeight = function (data) {
            return depthFirst(data, function () { }, Actions.MAX_HEIGHT);
        };
        this.nodesByLevel = function (data, level) {
            if (level <= 0)
                return data;
            return breadthFirst(data, function (_a) {
                var node = _a.node;
                return node;
            }, Actions.BY_LEVEL, { level: level });
        };
        this.reduce = function (data, callback, initial) {
            return depthFirst(data, callback, Actions.REDUCE, { initial: initial });
        };
        this.hierarchy = function (data, predicate) {
            var path = _this.findPath(data, predicate);
            var last = data;
            var nodes = path.map(function (key) { return (last = last[key]); });
            return [data].concat(nodes).filter(function (el) { return !Array.isArray(el); });
        };
        this.findLevel = function (data, predicate) {
            var level = -1;
            _this.findNode(data, function (node, depth, path) {
                var value = predicate(node, depth, path);
                if (value)
                    level = depth;
                return value;
            });
            return level;
        };
        this.findPath = function (data, predicate) {
            var _path = [];
            _this.findNode(data, function (node, depth, path) {
                var value = predicate(node, depth, path);
                if (value)
                    _path = path;
                return value;
            });
            return _path;
        };
        this.findByPath = function (data, path) {
            return path.reduce(function (acc, key) {
                if (isObject(acc))
                    return acc[key];
            }, data);
        };
        this.removeByPath = function (data, path) {
            var _a = copyByPath(data, path), root = _a.root, parent = _a.parent, key = _a.key;
            Array.isArray(parent) ? parent.splice(key, 1) : delete parent[key];
            return root;
        };
        this.removeNodes = function (data, predicate) {
            var _paths = breadthFirst(data, predicate, Actions.FIND_PATH);
            var response = data;
            _paths.reverse().forEach(function (path) {
                response = _this.removeByPath(response, path);
            });
            return response;
        };
        this.removeLeaves = function (data, predicate) {
            var _paths = depthFirst(data, predicate, Actions.FIND_PATH);
            var response = data;
            _paths.reverse().forEach(function (path) {
                response = _this.removeByPath(response, path);
            });
            return response;
        };
        this.updateByPath = function (data, path, callback) {
            var _a = copyByPath(data, path), root = _a.root, parent = _a.parent, key = _a.key;
            parent[key] = callback(parent[key]);
            return root;
        };
        this.updateNodes = function (data, predicate, callback) {
            var _paths = breadthFirst(data, predicate, Actions.FIND_PATH);
            var response = data;
            _paths.reverse().forEach(function (path) {
                response = _this.updateByPath(response, path, callback);
            });
            return response;
        };
        this.updateLeaves = function (data, predicate, callback) {
            var _paths = depthFirst(data, predicate, Actions.FIND_PATH);
            var response = data;
            _paths.forEach(function (path) {
                response = _this.updateByPath(response, path, callback);
            });
            return response;
        };
        this.removeByLevel = function (data, level) {
            var callback = function (_a) {
                var path = _a.path;
                return path;
            };
            var _paths = breadthFirst(data, callback, Actions.BY_LEVEL, { level: level });
            var response = data;
            _paths.reverse().forEach(function (path) {
                response = _this.removeByPath(response, path);
            });
            return response;
        };
    }
    return Forest;
}());
module.exports = new Forest();
