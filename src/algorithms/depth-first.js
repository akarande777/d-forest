const Actions = require('../actions');

function isObject(el) {
    return typeof el === 'object' && el !== null;
}

function depthFirst(data, callback, action, payload = {}) {
    let response;
    let found = false;
    let next = () => {};

    const iterateArray = (array, depth, path, acc) => {
        let hasChildren = false;
        array.some((el, i) => {
            const nextPath = [...path, i];
            if (Array.isArray(el)) {
                hasChildren = iterateArray(el, depth + 1, nextPath, acc) || hasChildren;
            } else if (isObject(el)) {
                next(el, depth + 1, nextPath, acc);
                hasChildren = true;
            }
            return found;
        });
        return hasChildren;
    };

    const iterate = (element, depth, path, acc) => {
        let hasChildren = false;
        Object.entries(element).some(([key, value]) => {
            const nextPath = [...path, key];
            if (Array.isArray(value)) {
                hasChildren = iterateArray(value, depth, nextPath, acc) || hasChildren;
            } else if (isObject(value)) {
                next(value, depth + 1, nextPath, acc);
                hasChildren = true;
            }
            return found;
        });
        return hasChildren;
    };

    switch (action) {
        case Actions.MAP:
            response = [];
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    if (payload.level > -1 ? payload.level === depth : true) {
                        let value = callback(node, depth, path);
                        response = [...response, value];
                    }
                }
            };
            break;
        case Actions.FIND:
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    let value = callback(node, depth, path);
                    if (value) {
                        response = node;
                        found = true;
                    }
                }
            };
            break;
        case Actions.FIND_ALL:
            response = [];
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    let value = callback(node, depth, path);
                    if (value) {
                        response = [...response, node];
                    }
                }
            };
            break;
        case Actions.EVERY:
            response = true;
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    let value = callback(node, depth, path);
                    if (!value) {
                        response = false;
                        found = true;
                    }
                }
            };
            break;
        case Actions.MIN_HEIGHT:
            response = Infinity;
            next = (node, depth, path) => {
                if (depth + 1 < response) {
                    let hasChildren = iterate(node, depth, path);
                    if (!hasChildren) {
                        response = depth + 1;
                    }
                }
            };
            break;
        case Actions.MAX_HEIGHT:
            response = -1;
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    if (depth + 1 > response) {
                        response = depth + 1;
                    }
                }
            };
            break;
        case Actions.REDUCE:
            response = [];
            next = (node, depth, path, acc) => {
                let value = callback(acc, node, depth, path);
                let hasChildren = iterate(node, depth, path, value);
                if (!hasChildren) {
                    response = [...response, value];
                }
            };
            break;
        default:
            next = (node, depth, path) => {
                let hasChildren = iterate(node, depth, path);
                if (!hasChildren) {
                    callback(node, depth, path);
                }
            };
    }

    if (Array.isArray(data)) {
        iterateArray(data, -1, [], payload.initial);
    } else if (isObject(data)) {
        next(data, 0, [], payload.initial);
    }

    return response;
}

module.exports = depthFirst;
