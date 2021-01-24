const actions = require('../actions');

function breadthFirst(callback, action) {
    let { forest, isArray } = this.data();
    const queue = [];
    const response = [];
    let found = false;
    let next = () => null;

    const iterateArr = (arr, depth) => {
        for (let j = 0; j < arr.length; j++) {
            if (this.isObject(arr[j])) {
                queue.push(() => next(arr[j], depth + 1, { element: arr, key: j }));
            } else if (Array.isArray(arr[j])) {
                queue.push(() => iterateArr(arr[j], depth + 1));
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
        case actions.REMOVE:
            next = (element, depth, parent) => {
                let value = callback(element, depth, parent);
                if (value && parent.element) {
                    if (Array.isArray(parent.element)) {
                        response.push(parent.element[parent.key]);
                        parent.element.splice(parent.key, 1);
                    } else {
                        response.push({ ...parent.element[parent.key] });
                        delete parent.element[parent.key];
                    }
                    found = true;
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

    if (isArray) {
        iterateArr(forest, -1);
    } else if (this.isObject(forest)) {
        queue.push(() => next(forest, 0, {}));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    switch (action) {
        case actions.FIND:
            return response[0];
        case actions.FIND_ALL:
            return response;
        case actions.BY_LEVEL:
            return response;
        case actions.REMOVE:
            return response[0];
        default:
            return undefined;
    }
}

module.exports = breadthFirst;
