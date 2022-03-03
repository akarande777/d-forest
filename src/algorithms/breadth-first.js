const Actions = require('../actions');
const { isObject } = require('../utils');

function breadthFirst(data, callback, action, payload = {}) {
    let queue = [];
    let response;
    let found = false;
    let next = () => {};
    let visited = [];
    let isFresh = (obj) => visited.indexOf(obj) === -1;

    const iterateArray = (array, depth, path) => {
        return array.reduce((acc, el, i) => {
            const nextPath = [...path, i];
            if (Array.isArray(el)) {
                return [...acc, () => iterateArray(el, depth + 1, nextPath)];
            }
            if (isObject(el) && isFresh(el)) {
                visited.push(el);
                return [...acc, () => next(el, depth + 1, nextPath)];
            }
            return acc;
        }, []);
    };

    const iterate = (element, depth, path) => {
        const arrays = Object.entries(element).map(([key, value]) => {
            const nextPath = [...path, key];
            if (Array.isArray(value)) {
                return iterateArray(value, depth, nextPath);
            }
            if (isObject(value) && isFresh(value)) {
                visited.push(value)
                return () => next(value, depth + 1, nextPath);
            }
            return [];
        });
        return [].concat(...arrays);
    };

    switch (action) {
        case Actions.FIND:
            next = (node, depth, path) => {
                let value = callback(node, depth, path);
                if (value) {
                    response = node;
                    found = true;
                    return [];
                }
                return iterate(node, depth, path);
            };
            break;
        case Actions.FIND_ALL:
            response = [];
            next = (node, depth, path) => {
                let value = callback(node, depth, path);
                if (value) response.push(node);
                return iterate(node, depth, path);
            };
            break;
        case Actions.EVERY:
            response = true;
            next = (node, depth, path) => {
                let value = callback(node, depth, path);
                if (!value) {
                    response = false;
                    found = true;
                    return [];
                }
                return iterate(node, depth, path);
            };
            break;
        case Actions.BY_LEVEL:
            response = [];
            next = (node, depth, path) => {
                if (payload.level === depth) {
                    let value = callback({ node, path });
                    response.push(value);
                    return [];
                }
                return iterate(node, depth, path);
            };
            break;
        case Actions.FIND_PATH:
            response = [];
            next = (node, depth, path) => {
                let value = callback(node, depth, path);
                if (value) response.push(path);
                return iterate(node, depth, path);
            };
            break;
        default:
            next = (node, depth, path) => {
                callback(node, depth, path);
                return iterate(node, depth, path);
            };
    }

    if (Array.isArray(data)) {
        queue = iterateArray(data, -1, []);
    } else if (isObject(data)) {
        visited.push(data);
        queue = [() => next(data, 0, [])];
    }

    while (!found && queue.length) {
        const [first, ...rest] = queue;
        queue = [...rest, ...first()];
    }

    return response;
}

module.exports = breadthFirst;
