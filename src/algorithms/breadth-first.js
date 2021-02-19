const actions = require('../actions');

function breadthFirst(callback, action) {
    const queue = [];
    const response = [];
    let found = false;
    let next = () => null;

    const iterateArr = (arr, depth) => {
        for (let j = 0; j < arr.length; j++) {
            if (Array.isArray(arr[j])) {
                queue.push(() => iterateArr(arr[j], depth + 1));
            } else if (this.isObject(arr[j])) {
                queue.push(() => next(arr[j], depth + 1, { element: arr, key: j }));
            }
        }
    };

    const iterate = (element, depth) => {
        for (let key of Object.keys(element)) {
            const prop = element[key];
            if (Array.isArray(prop)) {
                iterateArr(prop, depth);
            } else if (this.isObject(prop)) {
                queue.push(() => next(prop, depth + 1, { element, key }));
            }
        }
        if (queue.length) queue.shift()();
    };

    switch (action) {
        case actions.FIND:
            next = (element, depth, parent) => {
                let value = callback(element, depth, parent);
                if (value) {
                    response.push(element);
                    found = true;
                    return;
                }
                iterate(element, depth);
            };
            break;
        case actions.FIND_ALL:
            next = (element, depth, parent) => {
                let value = callback(element, depth, parent);
                if (value) {
                    response.push(element);
                }
                iterate(element, depth);
            };
            break;
        case actions.EVERY:
            response.push(true);
            next = (element, depth, parent) => {
                let value = callback(element, depth, parent);
                if (!value) {
                    response[0] = false;
                    found = true;
                    return;
                }
                iterate(element, depth);
            };
            break;
        case actions.BY_LEVEL:
            next = (element, depth) => {
                let value = callback(); // () => level
                if (value === depth) {
                    response.push(element);
                    return;
                }
                iterate(element, depth);
            };
            break;
        default:
            next = (el, depth, parent) => {
                callback(el, depth, parent);
                iterate(el, depth);
            };
    }

    if (Array.isArray(this.forest)) {
        iterateArr(this.forest, -1);
    } else if (this.isObject(this.forest)) {
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
