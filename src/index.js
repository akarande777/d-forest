var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
var _a = require('./utils'),
    isObject = _a.isObject,
    shallowCopy = _a.shallowCopy;
var Forest = /** @class */ (function () {
    function Forest() {
        var _this = this;
        this.forEachLeaf = function (data, callback) {
            depthFirst(data, callback, Actions.FOR_EACH);
        };
        this.forEachNode = function (data, callback) {
            breadthFirst(data, callback, Actions.FOR_EACH);
        };
        this.findLeaf = function (data, callback) {
            return depthFirst(data, callback, Actions.FIND);
        };
        this.findNode = function (data, callback) {
            return breadthFirst(data, callback, Actions.FIND);
        };
        this.everyLeaf = function (data, callback) {
            return depthFirst(data, callback, Actions.EVERY);
        };
        this.everyNode = function (data, callback) {
            return breadthFirst(data, callback, Actions.EVERY);
        };
        this.findLeaves = function (data, callback) {
            return depthFirst(data, callback, Actions.FIND_ALL);
        };
        this.findNodes = function (data, callback) {
            return breadthFirst(data, callback, Actions.FIND_ALL);
        };
        this.mapLeaves = function (data, callback, level) {
            if (level === void 0) {
                level = -1;
            }
            return depthFirst(data, callback, Actions.MAP, { level: level });
        };
        this.minHeight = function (data) {
            return depthFirst(data, function () {}, Actions.MIN_HEIGHT);
        };
        this.maxHeight = function (data) {
            return depthFirst(data, function () {}, Actions.MAX_HEIGHT);
        };
        this.nodesByLevel = function (data, level) {
            if (level <= 0) return data;
            return breadthFirst(data, function () {}, Actions.BY_LEVEL, { level: level });
        };
        this.reduce = function (data, callback, initial) {
            return depthFirst(data, callback, Actions.REDUCE, { initial: initial });
        };
        this.hierarchy = function (data, callback) {
            var path = _this.findPath(data, callback);
            var last = data;
            var nodes = path.map(function (key) {
                return (last = last[key]);
            });
            return [data].concat(nodes).filter(function (el) {
                return !Array.isArray(el);
            });
        };
        this.findPath = function (data, callback) {
            var response = [];
            _this.findNode(data, function (node, depth, path) {
                var value = callback(node, depth, path);
                if (value) response = path;
                return value;
            });
            return response;
        };
        this.findByPath = function (data, path) {
            return path.reduce(function (acc, key) {
                if (isObject(acc)) return acc[key];
            }, data);
        };
        this.removeByPath = function (data, path) {
            var root = shallowCopy(data);
            var parent = path.slice(0, -1).reduce(function (acc, key) {
                acc[key] = shallowCopy(acc[key]);
                return acc[key];
            }, root);
            var key = path[path.length - 1];
            if (Array.isArray(parent)) {
                parent.splice(key, 1);
            } else {
                delete parent[key];
            }
            return root;
        };
        this.removeNodes = function (data, callback) {
            var path = _this.findPath(data, callback);
            var response = data;
            while (path.length) {
                response = _this.removeByPath(response, path);
                path = _this.findPath(response, callback);
            }
            return response;
        };
    }
    return Forest;
})();
module.exports = new Forest();
