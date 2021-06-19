const actions = require('../actions');

function isObject(element) {
    return typeof element === 'object' && element !== null;
}

function breadthFirst(callback, action) {
    const queue = [];
    const response = [];
    let found = false;
    let next = () => null;

    const iterateArray = (array, depth) => {
        array.forEach((el, i) => {
            if (Array.isArray(el)) {
                queue.push(() => iterateArray(el, depth + 1));
            } else if (isObject(el)) {
                const parent = { element: el, key: i };
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
        case actions.FIND:
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
        case actions.FIND_ALL:
            next = (node, depth, parent) => {
                let value = callback(node, depth, parent);
                if (value) {
                    response.push(node);
                }
                iterate(node, depth);
            };
            break;
        case actions.EVERY:
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
        case actions.BY_LEVEL:
            next = (node, depth) => {
                if (callback() === depth) {
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

    if (Array.isArray(this.forest)) {
        iterateArray(this.forest, -1);
    } else if (isObject(this.forest)) {
        queue.push(() => next(this.forest, 0, {}));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    switch (action) {
        case actions.FIND:
            return response[0];
        case actions.FIND_ALL:
            return response;
        case actions.EVERY:
            return response[0];
        case actions.BY_LEVEL:
            return response;
        default:
            return undefined;
    }
}

module.exports = breadthFirst;
