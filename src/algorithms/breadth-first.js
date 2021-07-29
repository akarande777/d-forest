const Actions = require('../actions');

function isObject(element) {
    return typeof element === 'object' && element !== null;
}

function breadthFirst(callback, action, payload = {}) {
    let queue = [];
    let response = [];
    let found = false;
    let next = () => {};

    const iterateArray = (array, depth) => {
        array.forEach((el, i) => {
            if (Array.isArray(el)) {
                queue.push(() => iterateArray(el, depth + 1));
            } else if (isObject(el)) {
                const parent = { element: array, key: i };
                queue.push(() => next(el, depth + 1, parent));
            }
        });
    };

    const iterate = (element, depth) => {
        for (let key of Object.keys(element)) {
            const prop = element[key];
            if (Array.isArray(prop)) {
                iterateArray(prop, depth);
            } else if (isObject(prop)) {
                const parent = { element, key };
                queue.push(() => next(prop, depth + 1, parent));
            }
        }
        if (queue.length) queue.shift()();
    };

    switch (action) {
        case Actions.FIND:
            next = (node, depth, parent) => {
                let value = callback(node, depth, parent);
                if (value) {
                    response.push(node);
                    found = true;
                    return;
                }
                iterate(node, depth);
            };
            break;
        case Actions.FIND_ALL:
            next = (node, depth, parent) => {
                let value = callback(node, depth, parent);
                if (value) {
                    response.push(node);
                }
                iterate(node, depth);
            };
            break;
        case Actions.EVERY:
            response.push(true);
            next = (node, depth, parent) => {
                let value = callback(node, depth, parent);
                if (!value) {
                    response[0] = false;
                    found = true;
                    return;
                }
                iterate(node, depth);
            };
            break;
        case Actions.BY_LEVEL:
            next = (node, depth) => {
                if (payload['level'] === depth) {
                    response.push(node);
                    return;
                }
                iterate(node, depth);
            };
            break;
        default:
            next = (node, depth, parent) => {
                callback(node, depth, parent);
                iterate(node, depth);
            };
    }

    if (Array.isArray(this.data)) {
        iterateArray(this.data, -1);
    } else if (isObject(this.data)) {
        queue.push(() => next(this.data, 0, {}));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    switch (action) {
        case Actions.FIND:
            return response[0];
        case Actions.FIND_ALL:
            return response;
        case Actions.EVERY:
            return response[0];
        case Actions.BY_LEVEL:
            return response;
        default:
            return undefined;
    }
}

module.exports = breadthFirst;
