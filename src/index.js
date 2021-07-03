var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var Actions = require('./actions');
var Forest = /** @class */ (function () {
    function Forest(data) {
        var _this = this;
        this.data = data;
        this.forEachLeaf = function (callback) {
            depthFirst.call(_this, callback, Actions.FOR_EACH);
        };
        this.forEachNode = function (callback) {
            breadthFirst.call(_this, callback, Actions.FOR_EACH);
        };
        this.findLeaf = function (callback) {
            return depthFirst.call(_this, callback, Actions.FIND);
        };
        this.findNode = function (callback) {
            return breadthFirst.call(_this, callback, Actions.FIND);
        };
        this.everyLeaf = function (callback) {
            return depthFirst.call(_this, callback, Actions.EVERY);
        };
        this.everyNode = function (callback) {
            return breadthFirst.call(_this, callback, Actions.EVERY);
        };
        this.findLeaves = function (callback) {
            return depthFirst.call(_this, callback, Actions.FIND_ALL);
        };
        this.findNodes = function (callback) {
            return breadthFirst.call(_this, callback, Actions.FIND_ALL);
        };
        this.mapLeaves = function (callback) {
            return depthFirst.call(_this, callback, Actions.MAP);
        };
        this.minHeight = function () {
            return depthFirst.call(_this, function () { }, Actions.MIN_HEIGHT);
        };
        this.maxHeight = function () {
            return depthFirst.call(_this, function () { }, Actions.MAX_HEIGHT);
        };
        this.nodesByLevel = function (level) {
            if (level <= 0)
                return _this.data;
            return breadthFirst.call(_this, function () { }, Actions.BY_LEVEL, { level: level });
        };
        this.reduce = function (callback, initial) {
            return depthFirst.call(_this, callback, Actions.REDUCE, { initial: initial });
        };
    }
    return Forest;
}());
module.exports = function (data) { return new Forest(data); };
