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

var JSDeepObjectMerge = function(toMerge) {
    var merge = function(obj1, obj2) {
        Object.keys(obj2).forEach(function(key) {
            if (obj2[key] instanceof Array) {
                if (obj1[key] instanceof Array) {
                    obj1[key].deepMerge(obj2[key]);
                } else {
                    obj1[key] = obj2[key];
                }
            } else if (obj2[key] instanceof Object) {
                if (typeof(obj1[key]) === 'undefined') {
                    obj1[key] = {};
                }
                merge(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        });
    };
    merge(this, toMerge);
};
var JSDeepArrayMerge = function(toMerge) {
    var merge = function(arr1, arr2) {
        arr2.forEach(function(element, index) {
            if (element instanceof Array) {
                if (typeof(arr1[index]) === 'undefined') {
                    arr1[index] = [];
                }
                merge(arr1[index], arr2[index]);
            } else if (element instanceof Object) {
                if (arr1[index] instanceof Object) {
                    arr1[index].deepMerge(element);
                } else {
                    arr1[index] = element;
                }
            } else {
                arr1[index] = element;
            }
        });
    };
    merge(this, toMerge);
};

Object.prototype.deepMerge = JSDeepObjectMerge;
Array.prototype.deepMerge = JSDeepArrayMerge;