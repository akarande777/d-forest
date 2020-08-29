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
}

Forest.prototype.forEachLeaf = function(callback) {
    depthFirst.call(this, callback);
}

Forest.prototype.forEachNode = function(callback) {
    breadthFirst.call(this, callback);
}

Forest.prototype.findLeaf = function(callback) {
    return depthFirst.call(this, callback, actions.FIND);
}

Forest.prototype.findNode = function(callback) {
    return breadthFirst.call(this, callback, actions.FIND);
}

Forest.prototype.findLeaves = function(callback) {
    return depthFirst.call(this, callback, actions.FILTER);
}

Forest.prototype.findNodes = function(callback) {
    return breadthFirst.call(this, callback, actions.FILTER);
}

Forest.prototype.mapLeaves = function(callback) {
    return depthFirst.call(this, callback, actions.MAP);
}

module.exports = (forest) => new Forest(forest);