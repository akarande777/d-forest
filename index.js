const depthFirst = require('./algorithms/depth-first');
const breadthFirst = require('./algorithms/breadth-first');
const actions = require('./actions');

function Forest(forest) {
    this.self = () => ({
        forest: forest,
        isArray: Array.isArray(forest)
    });
}

Forest.prototype.isObject = function(element) {
    return typeof element === 'object' && element !== null;
};

Forest.prototype.forEachLeaf = function(callback) {
    depthFirst.call(this, callback);
};

Forest.prototype.forEachNode = function(callback) {
    breadthFirst.call(this, callback);
};

Forest.prototype.findLeaf = function(callback) {
    return depthFirst.call(this, callback, actions.FIND);
};

Forest.prototype.findNode = function(callback) {
    return breadthFirst.call(this, callback, actions.FIND);
};

Forest.prototype.findLeaves = function(callback) {
    return depthFirst.call(this, callback, actions.FIND_ALL);
};

Forest.prototype.findNodes = function(callback) {
    return breadthFirst.call(this, callback, actions.FIND_ALL);
};

Forest.prototype.mapLeaves = function(callback) {
    return depthFirst.call(this, callback, actions.MAP);
};

Forest.prototype.nodesByLevel = function(level) {
    if (level < 1) return [];
    return breadthFirst.call(this, () => level, actions.GET);
};

Forest.prototype.removeNode = function(callback) {
    return breadthFirst.call(this, callback, actions.REMOVE);
};

Forest.prototype.removeNodes = function(callback) {
    return breadthFirst.call(this, callback, actions.REMOVE_ALL);
};

Forest.prototype.removeLeaf = function(callback) {
    return depthFirst.call(this, callback, actions.REMOVE);
};

Forest.prototype.removeLeaves = function(callback) {
    return depthFirst.call(this, callback, actions.REMOVE_ALL);
};

module.exports = (forest) => new Forest(forest);