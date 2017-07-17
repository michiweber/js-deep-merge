# JS Deep Merge

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/michiweber/js-deep-merge.svg?branch=master)](https://travis-ci.org/michiweber/js-deep-merge)

```javascript
Object.deepMerge(target, source)
Array.deepMerge(target, source)
```

A tiny supportive script that enables deep JavaScript Object and Array merging.

#### Object

The script performs a complete deep merge and merges arrays with the Array merging script.

```javascript
var object1 = { key1: value1 };
var object2 = { key2: value2 };
Object.deepMerge(object1, object2); // { key1: value1, key2: value2 }
```

#### Array

The script handles Arrays as Associative Arrays so the index is taken as the index and therefore replaced if the array to merge has a same index. 

```javascript
var array1 = [ 'key1', 'key2' ];
var array2 = [ 'key3' ];
Array.deepMerge(array1, array2); // [ 'key3', 'key2' ]
```
