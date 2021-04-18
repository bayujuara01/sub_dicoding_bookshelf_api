const isEmpty = (val) => !val || val.length === 0;
const isUndefined = (val) => val === undefined;
const isNull = (val) => val === null;

module.exports = { isEmpty, isUndefined };
