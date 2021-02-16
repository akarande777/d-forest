var depthFirst = require('./algorithms/depth-first');
var breadthFirst = require('./algorithms/breadth-first');
var actions = require('./actions');

function Forest(forest) {
    this.forest = forest;
}

Forest.prototype.isObject = function (element) {
    return typeof element === 'object' && element !== null;
};

Forest.prototype.forEachLeaf = function (callback) {
    depthFirst.call(this, callback);
};

Forest.prototype.forEachNode = function (callback) {
    breadthFirst.call(this, callback);
};

Forest.prototype.findLeaf = function (callback) {
    return depthFirst.call(this, callback, actions.FIND);
};

Forest.prototype.findNode = function (callback) {
    return breadthFirst.call(this, callback, actions.FIND);
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

Forest.prototype.nodesByLevel = function (level) {
    if (level < 1) return [];
    return breadthFirst.call(this, () => level, actions.BY_LEVEL);
};

Forest.prototype.reduce = function (callback, initial) {
    return depthFirst.call(this, callback, actions.REDUCE, initial);
};

module.exports = (forest) => new Forest(forest);
