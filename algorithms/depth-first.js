const actions = require('../actions');

function depthFirst(callback, action, initial) {
    const { forest, isArray } = this.data();
    const response = [];
    let found = false;
    let next = () => null;

    const iterateArr = (arr, depth, acc) => {
        let hasChildren = false;
        for (let j = 0; j < arr.length; j++) {
            if (this.isObject(arr[j])) {
                next(arr[j], depth + 1, { element: arr, key: j }, acc);
                hasChildren = true;
            } else if (Array.isArray(arr[j])) {
                hasChildren = iterateArr(arr[j], depth + 1, acc);
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
                hasChildren = iterateArr(prop, depth, acc);
            } else if (this.isObject(prop)) {
                next(prop, depth + 1, { element, key }, acc);
                hasChildren = true;
            }
            if (found) break;
        }
        return hasChildren;
    };

    switch (action) {
        case actions.MAP:
            next = (el, depth, parent) => {
                let hasChildren = iterate(el, depth);
                if (!hasChildren) {
                    let value = callback(el, depth, parent);
                    response.push(value);
                }
            };
            break;
        case actions.FIND:
            next = (el, depth, parent) => {
                let hasChildren = iterate(el, depth);
                if (!hasChildren) {
                    let value = callback(el, depth, parent);
                    if (value) {
                        response.push(el);
                        found = true;
                    }
                }
            };
            break;
        case actions.FIND_ALL:
            next = (el, depth, parent) => {
                let hasChildren = iterate(el, depth);
                if (!hasChildren) {
                    let value = callback(el, depth, parent);
                    if (value) {
                        response.push(el);
                    }
                }
            };
            break;
        case actions.REMOVE:
            next = (el, depth, parent) => {
                let hasChildren = iterate(el, depth);
                if (!hasChildren) {
                    let value = callback(el, depth, parent);
                    if (value && parent.element) {
                        if (Array.isArray(parent.element)) {
                            response.push(parent.element[parent.key]);
                            parent.element.splice(parent.key, 1);
                        } else {
                            response.push({ ...parent.element[parent.key] });
                            delete parent.element[parent.key];
                        }
                        found = true;
                    }
                }
            };
            break;
        case actions.REDUCE:
            next = (el, depth, parent, acc) => {
                let value = callback(acc, el, depth, parent);
                let hasChildren = iterate(el, depth, value);
                if (!hasChildren) {
                    response.push(value);
                }
            };
            break;
        default:
            next = (el, depth, parent) => {
                let hasChildren = iterate(el, depth);
                if (!hasChildren) {
                    callback(el, depth, parent);
                }
            };
    }

    if (isArray) {
        iterateArr(forest, -1, initial);
    } else if (this.isObject(forest)) {
        next(forest, 0, {}, initial);
    }

    switch (action) {
        case actions.MAP:
            return response;
        case actions.FIND:
            return response[0];
        case actions.FIND_ALL:
            return response;
        case actions.REMOVE:
            return response[0];
        case actions.REDUCE:
            return response;
        default:
            return undefined;
    }
}

module.exports = depthFirst;
