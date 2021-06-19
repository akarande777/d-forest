const actions = require('../actions');

function isObject(element) {
    return typeof element === 'object' && element !== null;
}

function depthFirst(callback, action, initial) {
    const response = [];
    let found = false;
    let next = () => null;

    const iterateArray = (array, depth, acc) => {
        let hasChildren = false;
        for (let i = 0; i < array.length; i++) {
            const el = array[i];
            if (Array.isArray(el)) {
                hasChildren = iterateArray(el, depth + 1, acc);
            } else if (isObject(el)) {
                const parent = { element: el, key: i };
                next(el, depth + 1, parent, acc);
                hasChildren = true;
            }
            if (found) break;
        }
        return hasChildren;
    };

    const iterate = (element, depth, acc) => {
        let hasChildren = false;
        for (let key of Object.keys(element)) {
            const prop = element[key];
            if (Array.isArray(prop)) {
                hasChildren = iterateArray(prop, depth, acc);
            } else if (isObject(prop)) {
                next(prop, depth + 1, { element, key }, acc);
                hasChildren = true;
            }
            if (found) break;
        }
        return hasChildren;
    };

    switch (action) {
        case actions.MAP:
            next = (node, depth, parent) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    let value = callback(node, depth, parent);
                    response.push(value);
                }
            };
            break;
        case actions.FIND:
            next = (node, depth, parent) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    let value = callback(node, depth, parent);
                    if (value) {
                        response.push(node);
                        found = true;
                    }
                }
            };
            break;
        case actions.FIND_ALL:
            next = (node, depth, parent) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    let value = callback(node, depth, parent);
                    if (value) {
                        response.push(node);
                    }
                }
            };
            break;
        case actions.EVERY:
            response.push(true);
            next = (node, depth, parent) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    let value = callback(node, depth, parent);
                    if (!value) {
                        response[0] = false;
                        found = true;
                    }
                }
            };
            break;
        case actions.MIN_HEIGHT:
            response.push(Infinity);
            next = (node, depth) => {
                if (depth < response[0]) {
                    let hasChildren = iterate(node, depth);
                    if (!hasChildren) {
                        response[0] = depth;
                    }
                }
            };
            break;
        case actions.MAX_HEIGHT:
            response.push(-1);
            next = (node, depth) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    if (depth > response[0]) {
                        response[0] = depth;
                    }
                }
            };
            break;
        case actions.REDUCE:
            next = (node, depth, parent, acc) => {
                let value = callback(acc, node, depth, parent);
                let hasChildren = iterate(node, depth, value);
                if (!hasChildren) {
                    response.push(value);
                }
            };
            break;
        default:
            next = (node, depth, parent) => {
                let hasChildren = iterate(node, depth);
                if (!hasChildren) {
                    callback(node, depth, parent);
                }
            };
    }

    if (Array.isArray(this.forest)) {
        iterateArray(this.forest, -1, initial);
    } else if (isObject(this.forest)) {
        next(this.forest, 0, {}, initial);
    }

    switch (action) {
        case actions.MAP:
            return response;
        case actions.FIND:
            return response[0];
        case actions.FIND_ALL:
            return response;
        case actions.EVERY:
            return response[0];
        case actions.MIN_HEIGHT:
            return response[0] + 1;
        case actions.MAX_HEIGHT:
            return response[0] + 1;
        case actions.REDUCE:
            return response;
        default:
            return undefined;
    }
}

module.exports = depthFirst;
