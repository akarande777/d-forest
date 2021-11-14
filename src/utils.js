function isObject(el) {
    return typeof el === 'object' && el !== null;
}

function shallowCopy(el) {
    if (Array.isArray(el)) return el.slice();
    if (isObject(el)) return { ...el };
    return el;
}

function copyByPath(data, path) {
    var root = shallowCopy(data);
    var parent = path.slice(0, -1).reduce((acc, key) => {
        acc[key] = shallowCopy(acc[key]);
        return acc[key];
    }, root);
    var key = path[path.length - 1];
    return { root, parent, key };
}

module.exports = { isObject, copyByPath };
