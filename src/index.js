var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
        return to;
    };
var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
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
        this.mapLeaves = function (data, callback) {
            return depthFirst(data, callback, Actions.MAP);
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
            return __spreadArray([data], nodes).filter(function (el) {
                return !Array.isArray(el);
            });
        };
        this.findPath = function (data, callback) {
            var response = [];
            _this.forEachNode(data, function (node, depth, path) {
                if (callback(node, depth, path)) {
                    response = path;
                }
            });
            return response;
        };
    }
    return Forest;
})();
module.exports = new Forest();
