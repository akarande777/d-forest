const actions = require('../actions');

function depthFirst(callback, action, initial) {
    const { forest, isArray } = this.self();
    const response = [];
    let found = false;
    let next = () => null;

    const iterate = (element, depth, acc) => {
        const keys = Object.keys(element);
        let hasChildren = false;

        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                for (let j = 0; j < prop.length; j++) {
                    if (this.isObject(prop[j])) {
                        next(prop[j], depth + 1, { element: prop, key: j }, acc);
                        hasChildren = true;
                    }
                    if (found) break;
                }
            }
            else if (this.isObject(prop)) {
                next(prop, depth + 1, { element, key: keys[i] }, acc);
                hasChildren = true;
            }
            if (found) break;
        }
        
        return hasChildren;
    }

    if (action === actions.MAP) {
        next = (el, depth, parent) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, parent);
                response.push(value);
            }
        }
    }
    else if (action === actions.FIND) {
        next = (el, depth, parent) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, parent);
                if (value) {
                    response.push(el);
                    found = true;
                }
            }
        }
    }
    else if (action === actions.FIND_ALL) {
        next = (el, depth, parent) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, parent);
                if (value) {
                    response.push(el);
                }
            }
        }
    }
    else if (action === actions.REMOVE || action === actions.REMOVE_ALL) {
        next = (el, depth, parent) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, parent);
                if (value && parent.element) {
                    if (Array.isArray(parent.element)) {
                        response.push(parent.element[parent.key]);
                        parent.element.splice(parent.key, 1);
                    }
                    else {
                        response.push({ ...parent.element[parent.key] });
                        delete parent.element[parent.key];
                    }
                    if (action === actions.REMOVE) {
                        found = true;
                    }
                }
            }
        }
    }
    else if (action === 'reduce') {
        next = (el, depth, parent, acc) => {
            let current = callback(acc, el, depth, parent);
            let hasChildren = iterate(el, depth, current);
            if (!hasChildren) {
                response.push(current);
            }
        }
    }
    else {
        next = (el, depth, parent) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                callback(el, depth, parent);
            }
        }
    }

    if (isArray) {
        for (let i = 0; i < forest.length; i++) {
            if (this.isObject(forest[i])) {
                next(forest[i], 0, { element: forest, key: i }, initial);
            }
        }
    }
    else if (this.isObject(forest)) {
        next(forest, 0, callback, {}, initial);
    }

    return action === actions.MAP ? response
        : action === actions.FIND ? response[0]
            : action === actions.FIND_ALL ? response
                : action === actions.REMOVE ? response[0]
                    : action === actions.REMOVE_ALL ? response
                        : action === actions.REDUCE ? response
                            : undefined;
}

module.exports = depthFirst;