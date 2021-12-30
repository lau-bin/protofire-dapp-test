"use strict";
exports.__esModule = true;
exports.stringType = exports.assert = exports.unwrap = exports.hasValue = exports.isInteger = void 0;
function isInteger(obj) {
    if (obj % 1 > 0) {
        return false;
    }
    else {
        return true;
    }
}
exports.isInteger = isInteger;
function hasValue(obj) {
    if (obj == null) {
        return false;
    }
    else {
        return true;
    }
}
exports.hasValue = hasValue;
function unwrap(obj, message) {
    if (hasValue(obj)) {
        return obj;
    }
    else {
        throw new Error(message || "Value not present");
    }
}
exports.unwrap = unwrap;
function assert(bool, msg) {
    if (!bool)
        throw new Error(msg);
}
exports.assert = assert;
exports.stringType = "string";
