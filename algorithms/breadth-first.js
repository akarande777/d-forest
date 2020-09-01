const actions = require('../actions');

function breadthFirst(callback, action) {
    const { forest, isArray } = this.self();
    const queue = [];
    const response = [];
    let found = false;
    let next = () => { };

    const iterate = (element, depth) => {
        const keys = Object.keys(element);

        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                for (let j = 0; j < prop.length; j++) {
                    if (this.isObject(prop[j])) {
                        queue.push(() => next(
                            prop[j], depth + 1, { element: prop, key: j }
                        ));
                    }
                }
            }
            else if (this.isObject(prop)) {
                queue.push(() => next(
                    prop, depth + 1, { element, key: keys[i] }
                ));
            }
        }

        if (queue.length) queue.shift()();
    }

    if (action === actions.FIND) {
        next = (element, depth, pos) => {
            let value = callback(element, depth, pos);
            if (value) {
                response.push(element);
                found = true;
                return;
            }
            iterate(element, depth)
        }
    }
    else if (action === actions.FILTER) {
        next = (element, depth, pos) => {
            let value = callback(element, depth, pos);
            if (value) {
                response.push(element);
            }
            iterate(element, depth)
        }
    }
    else if (action === actions.GET) {
        next = (element, depth) => {
            let value = callback(); // () => level
            if (value === depth) {
                response.push(element);
                return;
            }
            iterate(element, depth)
        }
    }
    else if (action === actions.REMOVE) {
        next = (element, depth, pos) => {
            let value = callback(element, depth, pos);
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
                return;
            }
            iterate(element, depth)
        }
    }
    else {
        next = (el, depth, pos) => {
            callback(el, depth, pos);
            iterate(el, depth);
        }
    }

    if (isArray) {
        for (let i = 0; i < forest.length; i++) {
            if (this.isObject(forest[i])) {
                queue.push(() => next(forest[i], 0, { element: forest, key: i }));
            }
        }
    }
    else if (this.isObject(forest)) {
        queue.push(() => next(forest, 0, {}));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    return action === actions.FIND ? response[0]
        : action === actions.FILTER ? response
            : action === actions.GET ? response
                : action === actions.REMOVE ? response[0]
                    : undefined;
}

module.exports = breadthFirst;