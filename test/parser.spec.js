var assert = require('assert');
var parser = require('../src/parser');

describe('Parser', function () {
    describe('tokenize', function () {
        it('should format and output a multi-nested sequence as a list of individual tokens', function () {
            var input = '(begin (define r 10) (* pi (* r r)))';
            var expected = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi',
                '(', '*', 'r', 'r', ')', ')', ')'];
            var actual = parser.tokenize(input);
            assert.deepEqual(expected, actual);
        });
    });
    describe('read from tokens', function () {
        it('should convert basic sequence of tokens to literals and symbols', function () {
            var input = ['(', 'define', 'r', '10', ')'];
            var expected = ['define', 'r', 10];
            var actual = parser.readFromTokens(input);
            assert.deepEqual(expected, actual);
        });
        it('should convert nested sequence of tokens to nested arrays of literals and symbols', function () {
            var input = ['(', 'begin', '(', 'define', 'r', '10', ')', ')'];
            var expected = ['begin', ['define', 'r', 10]];
            var actual = parser.readFromTokens(input);
            assert.deepEqual(expected, actual);
        });
    });
});

function deepEquals(ar1, ar2) {
    var still_matches, _fail,
        _this = this;
    if (!((_.isArray(ar1) && _.isArray(ar2)) || (_.isObject(ar1) && _.isObject(ar2)))) {
        return false;
    }
    if (ar1.length !== ar2.length) {
        return false;
    }
    still_matches = true;
    _fail = function () {
        still_matches = false;
    };
    _.each(ar1, function (prop1, n) {
        var prop2;
        prop2 = ar2[n];
        if (prop1 !== prop2 && !_.deepEquals(prop1, prop2)) {
            _fail();
        }
    });
    return still_matches;
}