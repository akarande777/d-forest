const actions = require('../actions');

function depthFirst(callback, action) {
    const { forest, isArray } = this.self();
    const response = [];
    let found = false;
    let next = () => {};

    const iterate = (element, depth) => {
        const keys = Object.keys(element);
        let hasChildren = false;

        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                for (let j = 0; j < prop.length; j++) {
                    if (this.isObject(prop[j])) {
                        next(prop[j], depth + 1, { element: prop, key: j });
                        hasChildren = true;
                    }
                    if (found) break;
                }
            }
            else if (this.isObject(prop)) {
                next(prop, depth + 1, { element, key: keys[i] });
                hasChildren = true;
            }
            if (found) break;
        }
        
        return hasChildren;
    }

    if (action === actions.MAP) {
        next = (el, depth, pos) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, pos);
                response.push(value);
            }
        }
    }
    else if (action === actions.FIND) {
        next = (el, depth, pos) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, pos);
                if (value) {
                    response.push(el);
                    found = true;
                }
            }
        }
    }
    else if (action === actions.FILTER) {
        next = (el, depth, pos) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, pos);
                if (value) {
                    response.push(el);
                }
            }
        }
    }
    else if (action === actions.REMOVE) {
        next = (el, depth, pos) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                let value = callback(el, depth, pos);
                if (value && pos.element) {
                    if (Array.isArray(pos.element)) {
                        response.push(pos.element[pos.key]);
                        pos.element.splice(pos.key, 1);
                    }
                    else {
                        response.push({ ...pos.element[pos.key] });
                        delete pos.element[pos.key];
                    }
                    found = true;
                }
            }
        }
    }
    else {
        next = (el, depth, pos) => {
            let hasChildren = iterate(el, depth);
            if (!hasChildren) {
                callback(el, depth, pos);
            }
        }
    }

    if (isArray) {
        for (let i = 0; i < forest.length; i++) {
            if (this.isObject(forest[i])) {
                next(forest[i], 0, { element: forest, key: i });
            }
        }
    }
    else if (this.isObject(forest)) {
        next(forest, 0, callback, {});
    }

    return action === actions.MAP ? response
        : action === actions.FIND ? response[0]
            : action === actions.FILTER ? response
                : action === actions.REMOVE ? response[0]
                    : undefined;
}

module.exports = depthFirst;