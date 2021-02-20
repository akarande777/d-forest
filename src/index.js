var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var actions = require('./actions');

function Forest(forest) {
    this.forest = forest;
}

Forest.prototype.forEachLeaf = function (callback) {
    depthFirst.call(this, callback, actions.FOR_EACH);
};

Forest.prototype.forEachNode = function (callback) {
    breadthFirst.call(this, callback, actions.FOR_EACH);
};

Forest.prototype.findLeaf = function (callback) {
    return depthFirst.call(this, callback, actions.FIND);
};

Forest.prototype.findNode = function (callback) {
    return breadthFirst.call(this, callback, actions.FIND);
};

Forest.prototype.everyLeaf = function (callback) {
    return depthFirst.call(this, callback, actions.EVERY);
};

Forest.prototype.everyNode = function (callback) {
    return breadthFirst.call(this, callback, actions.EVERY);
};

Forest.prototype.findLeaves = function (callback) {
    return depthFirst.call(this, callback, actions.FIND_ALL);
};

Forest.prototype.findNodes = function (callback) {
    return breadthFirst.call(this, callback, actions.FIND_ALL);
};

Forest.prototype.mapLeaves = function (callback) {
    return depthFirst.call(this, callback, actions.MAP);
};

Forest.prototype.minHeight = function () {
    return depthFirst.call(this, () => null, actions.MIN_HEIGHT);
};

Forest.prototype.maxHeight = function () {
    return depthFirst.call(this, () => null, actions.MAX_HEIGHT);
};

Forest.prototype.nodesByLevel = function (level) {
    if (level < 1) return [];
    return breadthFirst.call(this, () => level, actions.BY_LEVEL);
};

Forest.prototype.reduce = function (callback, initial) {
    return depthFirst.call(this, callback, actions.REDUCE, initial);
};

module.exports = (forest) => new Forest(forest);
