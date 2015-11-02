var assert = require('assert');
var interpreter = require('../src/interpreter');

describe('Parser', function() {
    describe('tokenizer', function () {
        it('should replace the braces with braces with spaces and then split', function () {
            var input = "(begin (define r 10) (* pi (* r r)))";
            var expected = ['(', 'begin', '(', 'define', 'r', '10', ')', '(', '*', 'pi', '(', '*', 'r', 'r', ')', ')', ')'];
            var actual = interpreter.tokenize(input);
            assert.deepEqual(expected, actual);
        });
    });
});