function isObject(el) {
    return typeof el === 'object' && el !== null;
}

function shallowCopy(el) {
    return Array.isArray(el) ? [...el] : isObject(el) ? { ...el } : el;
}

module.exports = { isObject, shallowCopy };
