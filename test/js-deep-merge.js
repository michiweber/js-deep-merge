/* External Requirements */
var sinon = require("sinon");

var chai = require('chai');
var should = chai.should();

/* Chai Plugins */
chai.use(require('chai-like'));
chai.use(require('sinon-chai'));

/* To test */
require('../src/js-deep-merge.js');

/* Mocks */
var simpleObject1 = { mock1: 'mock1' };
var simpleObject2 = { mock2: 'mock2' };
var simpleObject3 = { mock1: 'mock3', mock2: 'mock2' };

var complexObject1 = { mock1: { mock1a: 'mock1a' } };
var complexObject2 = { mock2: { mock2a: 'mock2a' } };
var complexObject3 = { mock1: { mock2a: 'mock2a' } };
var complexObject4 = { mock1: { mock1a: 'mock1b', mock2a: 'mock2a' } };
var complexObject5 = { mock1: { mock1a: { mock1a1: 'mock1a1' }, mock2a: { mock2a1: 'mock2a1' } } };
var complexObject6 = { mock1: { mock3a: { mock3a1: 'mock3a1' }, mock4a: { mock4a1: 'mock4a1' } } };
var complexObject7 = { mock1: { mock1a: { mock1b: { mock1c: { mock1d: true } } } } };
var complexObject8 = { mock1: { mock1a: { mock1b: { mock1c: { mock1d: false } } } } };

var simpleArray1 = [ 'mock1' ];
var simpleArray2 = [ 'mock2' ];

var complexArray1 = [ [ 'mock1' ], 'mock2' ];
var complexArray2 = [ [ 'mock3' ] ];
var complexArray3 = [ [ 'mock1' ], [ 'mock2', 'mock3' ] ];
var complexArray4 = [ [ 'mock4' ], [ 'mock5' ] ];

var arrayWithObject1 = [ { mock1 : 'mock1' } ];
var arrayWithObject2 = [ { mock2 : 'mock2' } ];
var arrayWithObject3 = [ { mock1 : 'mock1' }, { mock2 : 'mock2' }, { mock3 : 'mock3' } ];
var arrayWithObject4 = [ { mock4 : 'mock4' }, { mock5 : 'mock5' } ];
var arrayWithObject5 = [ { mock1 : 'mock1' } ];
var arrayWithObject6 = [ { mock1 : 'mock2' } ];
var arrayWithObject7 = [ { mock1 : 'mock1' }, 'mock2', [ 'mock3', 'mock4' ], undefined, true ];
var arrayWithObject8 = [ { mock5 : 'mock5' }, { mock6 : 'mock6' }, [ 'mock7' ], 'defined', false ];

var deepArray1 = [{ mock1: [{ mock2: 'mock2', mock3: 'mock3', mock4: 'mock4' }, { mock5: 'mock5', mock6: 'mock6', mock7: 'mock7' }], mock2: [{ mock8: 'mock8', mock9: 'mock9' }, { mock5: 'mock10' }], mock11: 'mock11', mock3: [[ 'mock12' ]]}, {mock4: [ { mock13: 'mock13' } ]}];
var deepArray2 = [{ mock1: [{ mock2: 'mock2a', mock3: 'mock3a' }, { mock5: 'mock5a', mock14: 'mock14' }], mock2: [{ mock8: 'mock8', mock9: 'mock9' }, { mock5: 'mock10' }], mock11: [[ 'mock15' ]], mock3: [[ 'mock12a' ]] }, 'mock16', { mock4: [ { mock13: 'mock13a' } ] }];
var deepObject1 = {mock1: { mock2: { mock3: [ 'mock4', { mock5: 'mock5', mock6: 'mock6' }, true ] } }, mock2: [ [ 'mock7' ], [ 'mock8' ], [ 'mock9' ], [ 'mock10' ] ]};
var deepObject2 = {mock1: { mock2: { mock3: [ 'mock4a', { mock5: 'mock5', mock11: 'mock11' }, false ] } }, mock2: [ [ 'mock7' ], 'mock8a', [ 'mock9' ], [ 'mock10a' ] ]};

var arrayWithUndefined1 = [ 'mock1', undefined, 'mock2' ];
var arrayWithUndefined2 = [ 'mock1a', 'mock3', 'mock2' ];
var arrayWithUndefined3 = [ undefined ];
var arrayWithUndefined4 = [ [ 'mock1' ] ];
var arrayWithUndefined5 = [ undefined ];
var arrayWithUndefined6 = [ { mock1: 'mock1' } ];
var arrayWithUndefined7 = [ 'mock1' ];
var arrayWithUndefined8 = [ undefined ];

var objectWithUndefined1 = { mock1: 'mock1', mock2: undefined, mock3: 'mock3' };
var objectWithUndefined2 = { mock1: 'mock1', mock2: 'mock2', mock3: 'mock3' };
var objectWithUndefined3 = { mock1: undefined };
var objectWithUndefined4 = { mock1: { mock2: 'mock2' } };
var objectWithUndefined5 = { mock1: undefined };
var objectWithUndefined6 = { mock1: [ 'mock1' ] };
var objectWithUndefined7 = { mock1: 'mock1' };
var objectWithUndefined8 = { mock1: undefined };

/* Expectations */
var simpleMergedObject1 = { mock1: 'mock1', mock2: 'mock2' };
var simpleMergedObject2 = { mock1: 'mock3', mock2: 'mock2' };

var complexMergedObject1 = { mock1: { mock1a: 'mock1a' }, mock2: { mock2a: 'mock2a' } };
var complexMergedObject2 = { mock1: { mock1a: 'mock1a', mock2a: 'mock2a' } };
var complexMergedObject3 = { mock1: { mock1a: 'mock1b', mock2a: 'mock2a' } };
var complexMergedObject4 = { mock1: { mock1a: { mock1a1: 'mock1a1' }, mock2a: { mock2a1: 'mock2a1' }, mock3a: { mock3a1: 'mock3a1' }, mock4a: { mock4a1: 'mock4a1' } } };

var simpleMergedArray1 = [ 'mock2' ];
var complexMergedArray1 = [ [ 'mock3' ], 'mock2' ];
var complexMergedArray2 = [ [ 'mock4' ], [ 'mock5', 'mock3' ] ];

var arrayWithObjectMerged1 = [ { mock1 : 'mock1', mock2 : 'mock2' } ];
var arrayWithObjectMerged2 = [ { mock1 : 'mock1', mock4 : 'mock4' }, { mock2 : 'mock2', mock5 : 'mock5' }, { mock3 : 'mock3' } ];
var arrayWithObjectMerged3 = [ { mock1 : 'mock2' } ];
var arrayWithObjectMerged4 = [ { mock1 : 'mock1', mock5 : 'mock5' }, { mock6 : 'mock6' }, [ 'mock7', 'mock4' ], 'defined', false ];

var deepMergedArray = [{ mock1: [{ mock2: 'mock2a', mock3: 'mock3a', mock4: 'mock4' }, { mock5: 'mock5a', mock14: 'mock14', mock6: 'mock6', mock7: 'mock7' }], mock2: [{ mock8: 'mock8', mock9: 'mock9' }, { mock5: 'mock10' }], mock11: [[ 'mock15' ]], mock3: [[ 'mock12a' ]]}, 'mock16', { mock4: [ { mock13: 'mock13a' } ] }];
var deepMergedObject = {mock1: { mock2: { mock3: [ 'mock4a', { mock5: 'mock5', mock11: 'mock11', mock6: 'mock6' }, false ] } }, mock2: [ [ 'mock7' ], 'mock8a', [ 'mock9' ], [ 'mock10a' ] ]};

var arrayWithUndefinedMerged1 = [ [ 'mock1' ] ];
var arrayWithUndefinedMerged2 = [ { mock1: 'mock1' } ];
var arrayWithUndefinedMerged3 = [ undefined ];

var objectWithUndefinedMerged1 = { mock1: 'mock1', mock2: 'mock2', mock3: 'mock3' };
var objectWithUndefinedMerged2 = { mock1: { mock2: 'mock2' } };
var objectWithUndefinedMerged3 = { mock1: [ 'mock1' ] };
var objectWithUndefinedMerged4 = { mock1: undefined };

    /* Test */
describe('Object merge', function(){
    it('should merge two simple objects', function() {
        var obj1 = Object.assign({}, simpleObject1);
        var obj2 = Object.assign({}, simpleObject2);

        obj1.deepMerge(obj2);
        obj1.should.be.like(simpleMergedObject1);
    });
    it('should merge two simple objects and replace one value', function() {
        var obj1 = Object.assign({}, simpleObject1);
        var obj2 = Object.assign({}, simpleObject3);

        obj1.deepMerge(obj2);
        obj1.should.be.like(simpleMergedObject2);
    });
    it('should merge two complex objects', function() {
        var obj1 = Object.assign({}, complexObject1);
        var obj2 = Object.assign({}, complexObject2);

        obj1.deepMerge(obj2);
        obj1.should.be.like(complexMergedObject1);
    });
    it('should merge two complex objects and deep merge', function() {
        var obj1 = Object.assign({}, complexObject1);
        var obj2 = Object.assign({}, complexObject3);

        obj1.deepMerge(obj2);
        obj1.should.be.like(complexMergedObject2);
    });
    it('should merge two complex objects, deep merge and replace deep', function() {
        var obj1 = Object.assign({}, complexObject1);
        var obj2 = Object.assign({}, complexObject4);

        obj1.deepMerge(obj2);
        obj1.should.be.like(complexMergedObject3);
    });
    it('should merge two more complex objects', function() {
        var obj1 = Object.assign({}, complexObject5);
        var obj2 = Object.assign({}, complexObject6);

        obj1.deepMerge(obj2);
        obj1.should.be.like(complexMergedObject4);
    });
    it('should merge two deep objects', function() {
        var obj1 = Object.assign({}, complexObject7);
        var obj2 = Object.assign({}, complexObject8);

        obj1.deepMerge(obj2);
        obj1.should.be.like(complexObject8);
    });
});

describe('Array merge', function() {
    it('should merge two simple arrays', function() {
        var arr1 = Object.assign([], simpleArray1);
        var arr2 = Object.assign([], simpleArray2);

        arr1.deepMerge(arr2);
        arr1.should.be.like(simpleMergedArray1);
    });
    it('should merge two complex arrays', function() {
        var arr1 = Object.assign([], complexArray1);
        var arr2 = Object.assign([], complexArray2);

        arr1.deepMerge(arr2);
        arr1.should.be.like(complexMergedArray1);
    });
    it('should merge two more complex arrays', function() {
        var arr1 = Object.assign([], complexArray3);
        var arr2 = Object.assign([], complexArray4);

        arr1.deepMerge(arr2);
        arr1.should.be.like(complexMergedArray2);
    });
});

describe('Array and Object merge', function() {
    it('should merge two simple arrays with objects', function() {
        var arr1 = Object.assign([], arrayWithObject1);
        var arr2 = Object.assign([], arrayWithObject2);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithObjectMerged1);
    });
    it('should merge two complex arrays with objects', function() {
        var arr1 = Object.assign([], arrayWithObject3);
        var arr2 = Object.assign([], arrayWithObject4);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithObjectMerged2);
    });
    it('should merge two complex arrays with objects and replace one element in object', function() {
        var arr1 = Object.assign([], arrayWithObject5);
        var arr2 = Object.assign([], arrayWithObject6);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithObjectMerged3);
    });
    it('should merge two complex arrays with objects and other mixed attributes', function() {
        var arr1 = Object.assign([], arrayWithObject7);
        var arr2 = Object.assign([], arrayWithObject8);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithObjectMerged4);
    });
    it('should merge two deep arrays with objects, arrays and other mixed attributes', function() {
        var arr1 = Object.assign([], deepArray1);
        var arr2 = Object.assign([], deepArray2);

        arr1.deepMerge(arr2);
        arr1.should.be.like(deepMergedArray);
    });
    it('should merge two deep objects with objects, arrays and other mixed attributes', function() {
        var obj1 = Object.assign({}, deepObject1);
        var obj2 = Object.assign({}, deepObject2);

        obj1.deepMerge(obj2);
        obj1.should.be.like(deepMergedObject);
    });
});

describe('Undefined merge', function() {
    it('should merge two simple arrays with undefined elements', function() {
        var arr1 = Object.assign([], arrayWithUndefined1);
        var arr2 = Object.assign([], arrayWithUndefined2);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithUndefined2);
    });
    it('should merge two simple arrays with undefined elements', function() {
        var arr1 = Object.assign([], arrayWithUndefined3);
        var arr2 = Object.assign([], arrayWithUndefined4);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithUndefinedMerged1);
    });
    it('should merge two simple arrays with undefined elements', function() {
        var arr1 = Object.assign([], arrayWithUndefined5);
        var arr2 = Object.assign([], arrayWithUndefined6);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithUndefinedMerged2);
    });
    it('should merge two simple arrays with undefined elements', function() {
        var arr1 = Object.assign([], arrayWithUndefined7);
        var arr2 = Object.assign([], arrayWithUndefined8);

        arr1.deepMerge(arr2);
        arr1.should.be.like(arrayWithUndefinedMerged3);
    });
    it('should merge two simple objects with undefined elements', function() {
        var obj1 = Object.assign({}, objectWithUndefined1);
        var obj2 = Object.assign({}, objectWithUndefined2);

        obj1.deepMerge(obj2);
        obj1.should.be.like(objectWithUndefinedMerged1);
    });
    it('should merge two simple objects with undefined elements', function() {
        var obj1 = Object.assign({}, objectWithUndefined3);
        var obj2 = Object.assign({}, objectWithUndefined4);

        obj1.deepMerge(obj2);
        obj1.should.be.like(objectWithUndefinedMerged2);
    });
    it('should merge two simple objects with undefined elements', function() {
        var obj1 = Object.assign({}, objectWithUndefined5);
        var obj2 = Object.assign({}, objectWithUndefined6);

        obj1.deepMerge(obj2);
        obj1.should.be.like(objectWithUndefinedMerged3);
    });
    it('should merge two simple objects with undefined elements', function() {
        var obj1 = Object.assign({}, objectWithUndefined7);
        var obj2 = Object.assign({}, objectWithUndefined8);

        obj1.deepMerge(obj2);
        obj1.should.be.like(objectWithUndefinedMerged4);
    });
});
