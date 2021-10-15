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
    function Forest() {}
    Forest.prototype.forEachLeaf = function (data, callback) {
        depthFirst(data, callback, Actions.FOR_EACH);
    };
    Forest.prototype.forEachNode = function (data, callback) {
        breadthFirst(data, callback, Actions.FOR_EACH);
    };
    Forest.prototype.findLeaf = function (data, callback) {
        return depthFirst(data, callback, Actions.FIND);
    };
    Forest.prototype.findNode = function (data, callback) {
        return breadthFirst(data, callback, Actions.FIND);
    };
    Forest.prototype.everyLeaf = function (data, callback) {
        return depthFirst(data, callback, Actions.EVERY);
    };
    Forest.prototype.everyNode = function (data, callback) {
        return breadthFirst(data, callback, Actions.EVERY);
    };
    Forest.prototype.findLeaves = function (data, callback) {
        return depthFirst(data, callback, Actions.FIND_ALL);
    };
    Forest.prototype.findNodes = function (data, callback) {
        return breadthFirst(data, callback, Actions.FIND_ALL);
    };
    Forest.prototype.mapLeaves = function (data, callback) {
        return depthFirst(data, callback, Actions.MAP);
    };
    Forest.prototype.minHeight = function (data) {
        return depthFirst(data, function () {}, Actions.MIN_HEIGHT);
    };
    Forest.prototype.maxHeight = function (data) {
        return depthFirst(data, function () {}, Actions.MAX_HEIGHT);
    };
    Forest.prototype.nodesByLevel = function (data, level) {
        if (level <= 0) return data;
        return breadthFirst(data, function () {}, Actions.BY_LEVEL, { level: level });
    };
    Forest.prototype.reduce = function (data, callback, initial) {
        return depthFirst(data, callback, Actions.REDUCE, { initial: initial });
    };
    Forest.prototype.hierarchy = function (data, callback) {
        var payload = { initial: [] };
        var path = depthFirst(data, callback, Actions.PATH, payload);
        var last = data;
        var nodes = path.map(function (key) {
            return (last = last[key]);
        });
        return __spreadArray([data], nodes).filter(function (el) {
            return !Array.isArray(el);
        });
    };
    Forest.prototype.findPath = function (data, callback) {
        var payload = { initial: [] };
        return depthFirst(data, callback, Actions.PATH, payload);
    };
    return Forest;
})();
module.exports = new Forest();
