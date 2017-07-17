/*
 * JS Deep Merge
 *
 *
 * The MIT License
 *
 * Copyright 2016 Michael Weber <me@michiweber.de>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if (typeof (michiweber) === 'undefined') {
    michiweber = {};
}
if (typeof (michiweber['arrayToObject']) === 'undefined') {
    michiweber['arrayToObject'] = function(target) {
        if (typeof (target) !== 'object' && !(target instanceof Array)) { return target; }
        var obj = {};
        target.forEach(function(value, index) {
           obj[index] = value;
        });
        return obj;
    };
}
if (typeof (michiweber['objectToArray']) === 'undefined') {
    michiweber['objectToArray'] = function(target) {
        if (typeof (target) !== 'object' && !(target instanceof Object)) { return target; }
        var arr = [];
        Object.keys(target).forEach(function(key) {
            arr.push(target[key]);
        });
        return arr;
    };
}
if (typeof (michiweber['deepMerge']) === 'undefined') {
    michiweber['deepMerge'] = function(target, source) {
        if (typeof (target) !== 'object' || typeof (source) !== 'object') { return target; }
        Object.keys(source).forEach(function(key) {
            if (source[key] instanceof Array) {
                if (target[key] instanceof Array) {
                    target[key] = michiweber.arrayDeepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            } else if (source[key] instanceof Object) {
                if (typeof(target[key]) !== 'object') {
                    target[key] = source[key];
                }
                if (typeof(target[key]) === 'undefined') {
                    target[key] = {};
                }
                target[key] = michiweber.deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        });
        return target;
    };
}
if (typeof (michiweber['objectDeepMerge']) === 'undefined') {
    michiweber['objectDeepMerge'] = function(target, source) {
        return michiweber.deepMerge(target, source);
    };
}
if (typeof (michiweber['arrayDeepMerge']) === 'undefined') {
    michiweber['arrayDeepMerge'] = function(target, source) {
        var targetObject = michiweber.arrayToObject(target);
        var sourceObject = michiweber.arrayToObject(source);
        return michiweber.objectToArray(michiweber.deepMerge(targetObject, sourceObject));
    };
}

Object.deepMerge = michiweber.objectDeepMerge;
Object.toArray = michiweber.objectToArray;
Array.deepMerge = michiweber.arrayDeepMerge;
Array.toObject = michiweber.arrayToObject;