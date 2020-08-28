const actions = require('../actions');

function breadthFirst(callback, action) {
    const { forest, isArray } = this.self();
    const queue = [];
    const response = [];
    let found = false;

    const next = (element, depth) => {
        let value = callback(element, depth);

        if (action === actions.FIND && value) {
            response.push(element);
            found = true;
            return;
        }
        else if (action === actions.FILTER && value) {
            response.push(element);
        }

        const keys = Object.keys(element);

        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                for (let j = 0; j < prop.length; j++) {
                    if (this.isObject(prop[j])) {
                        queue.push(() => next(prop[j], depth + 1));
                    }
                }
            }
            else if (this.isObject(prop)) {
                queue.push(() => next(prop, depth + 1));
            }
        }

        if (queue.length) {
            queue.shift()();
        }
    }

    if (isArray) {
        for (let i = 0; i < forest.length; i++) {
            if (this.isObject(forest[i])) {
                queue.push(() => next(forest[i], 0));
            }
        }
    }
    else if (this.isObject(forest)) {
        queue.push(() => next(forest, 0));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    return action === actions.FIND ? response[0]
        : action === actions.FILTER ? response : undefined;
}

module.exports = breadthFirst;