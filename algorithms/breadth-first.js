const actions = require('../actions');

function breadthFirst(callback, action) {
    let { forest, isArray } = this.self();
    const queue = [];
    const response = [];
    let found = false;
    let next = () => null;

    const objectify = (array, depth) => {
        const object = {};
        array.forEach((child, i) => {
            const key = callback(child, depth, array);
            object[key ? key : i] = child;
        });
        return object;
    }

    const iterate = (element, depth) => {
        const keys = Object.keys(element);

        for (let i = 0; i < keys.length; i++) {
            const prop = element[keys[i]];
            if (Array.isArray(prop)) {
                if (action === actions.OBJECTIFY) {
                    element[keys[i]] = objectify(prop, depth);
                    queue.push(() => iterate(element[keys[i]], depth + 1));
                }
                else {
                    for (let j = 0; j < prop.length; j++) {
                        if (this.isObject(prop[j])) {
                            queue.push(() => next(
                                prop[j], depth + 1, { element: prop, key: j }
                            ));
                        }
                    }
                }
            }
            else if (this.isObject(prop)) {
                action === actions.OBJECTIFY ?
                    queue.push(() => iterate(prop, depth + 1))
                    :
                    queue.push(() => next(
                        prop, depth + 1, { element, key: keys[i] }
                    ));
            }
        }

        if (queue.length) queue.shift()();
    }

    if (action === actions.FIND) {
        next = (element, depth, parent) => {
            let value = callback(element, depth, parent);
            if (value) {
                response.push(element);
                found = true;
                return;
            }
            iterate(element, depth);
        }
    }
    else if (action === actions.FIND_ALL) {
        next = (element, depth, parent) => {
            let value = callback(element, depth, parent);
            if (value) {
                response.push(element);
            }
            iterate(element, depth);
        }
    }
    else if (action === actions.BY_LEVEL) {
        next = (element, depth) => {
            let value = callback(); // () => level
            if (value === depth) {
                response.push(element);
                return;
            }
            iterate(element, depth);
        }
    }
    else if (action === actions.REMOVE) {
        next = (element, depth, parent) => {
            let value = callback(element, depth, parent);

            if (value && parent.element) {
                if (Array.isArray(parent.element)) {
                    response.push(parent.element[parent.key]);
                    parent.element.splice(parent.key, 1);
                }
                else {
                    response.push({ ...parent.element[parent.key] });
                    delete parent.element[parent.key];
                }
                found = true;
                return;
            }
            iterate(element, depth);
        }
    }
    else {
        next = (el, depth, parent) => {
            callback(el, depth, parent);
            iterate(el, depth);
        }
    }

    if (action === actions.OBJECTIFY) {
        forest = JSON.parse(JSON.stringify(forest));
    }

    if (isArray) {
        if (action === actions.OBJECTIFY) {
            forest = objectify(forest, 0);
            queue.push(() => iterate(forest, 0));
        }
        else {
            for (let i = 0; i < forest.length; i++) {
                if (this.isObject(forest[i])) {
                    queue.push(() => next(
                        forest[i], 0, { element: forest, key: i }
                    ));
                }
            }
        }
    }
    else if (this.isObject(forest)) {
        action === actions.OBJECTIFY ?
            queue.push(() => iterate(forest, 0))
            : queue.push(() => next(forest, 0, {}));
    }

    while (!found && queue.length) {
        queue.shift()();
    }

    return action === actions.FIND ? response[0]
        : action === actions.FIND_ALL ? response
            : action === actions.BY_LEVEL ? response
                : action === actions.REMOVE ? response[0]
                    : action === actions.OBJECTIFY ? forest
                        : undefined;
}

module.exports = breadthFirst;