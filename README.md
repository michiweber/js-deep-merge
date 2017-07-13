# JS Deep Merge

```javascript
Object.prototype.deepMerge(...sources)
Array.prototype.deepMerge(...sources)
```

A tiny supportive script that enables deep JavaScript Object and Array merging.

#### Object

The script performs a complete deep merge and merges arrays with the Array merging script.

```javascript
var object1 = { key1: value1 };
var object2 = { key2: value2 };
object1.deepMerge(object2); // { key1: value1, key2: value2 }
```

#### Array

The script handles Arrays as Associative Arrays so the index is taken as the index and therefore replaced if the array to merge has a same index. 

```javascript
var array1 = [ 'key1', 'key2' ];
var array2 = [ 'key3' ];
array1.deepMerge(array2); // [ 'key3', 'key2' ]
```