const actions = require('../actions');

function depthFirst(callback, action) {
    const { forest, isArray } = this.self();
    const response = [];
    let found = false;

    const next = (element, depth) => {
        const keys = Object.keys(element);
        let hasChildren = false;
        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                for (let j = 0; j < prop.length; j++) {
                    if (this.isObject(prop[j])) {
                        !found && next(prop[j], depth + 1);
                        hasChildren = true;
                    }
                }
            }
            else if (this.isObject(prop)) {
                !found && next(prop, depth + 1);
                hasChildren = true;
            }
        }
        if (!hasChildren) {
            let value = callback(element, depth);
            if (action === actions.MAP) {
                response.push(value);
            }
            else if (action === actions.FIND && value) {
                found = value;
                response.push(element);
            }
            else if (action === actions.FILTER && value) {
                response.push(element);
            }
        }
    }

    if (isArray) {
        for (let i = 0; i < forest.length; i++) {
            if (this.isObject(forest[i])) {
                next(forest[i], 0);
            }
        }
    }
    else if (this.isObject(forest)) {
        next(forest, 0, callback);
    }

    return action === actions.MAP ? response
        : action === actions.FIND ? response[0]
            : action === actions.FILTER ? response
                : undefined;
}

module.exports = depthFirst;