var assert = require('assert');
var parser = require('../src/parser');

describe('Parser', function () {
    describe('tokenize', function () {
        it('should format and output a multi-nested sequence as a list of individual tokens', function () {
            var input = '(begin (define r 10) (* pi (* r r)))';
            var expected = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi',
                '(', '*', 'r', 'r', ')', ')', ')'];
            var actual = parser.tokenize(input);
            assert.deepStrictEqual(expected, actual);
        });
    });
    describe('read from tokens', function () {
        it('should convert basic sequence of tokens to literals and symbols', function () {
            var input = ['(', 'define', 'r', '10', ')'];
            var expected = ['define', 'r', 10];
            var actual = parser.readFromTokens(input);
            assert.deepStrictEqual(expected, actual);
        });
        it('should convert decimal numbers', function () {
            var input = ['(', 'define', 'r', '10.54', ')'];
            var expected = ['define', 'r', 10.54];
            var actual = parser.readFromTokens(input);
            assert.deepStrictEqual(expected, actual);
        });
        it('should convert nested sequence of tokens to nested arrays of literals and symbols', function () {
            var input = ['(', 'begin', '(', 'define', 'r', '10', ')', ')'];
            var expected = ['begin', ['define', 'r', 10]];
            var actual = parser.readFromTokens(input);
            assert.deepStrictEqual(expected, actual);
        });
    });
});