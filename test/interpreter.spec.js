var assert = require('assert');
var standardEnv = require('../src/environment');
var interpreter = require('../src/interpreter');
var parser = require('../src/parser');

describe('Interpreter', function () {
    var env = standardEnv();
    describe('math operators', function () {
        describe('addition', function () {
            describe('directly called', function () {
                it('on pair of numbers', function () {
                    assert.equal(env['+'](2, 3), 5);
                });
                it('on list of numbers', function () {
                    assert.equal(env['+'].apply(null, [2, 3, 4]), 9);
                });
            });
            describe('called by eval', function () {
                it('on pair of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(+ 2 3)'), env), 5);
                    assert.equal(interpreter.eval(parser.parse('(+ 2 (+ 4 3))'), env), 9);
                    assert.equal(interpreter.eval(parser.parse('(+ (+ 2 5) (+ 4 3))'), env), 14);
                });
                it('on list of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(+ (+ 2 5 2) (+ 4 3 1) (+ 4 3 2))'), env), 26);
                });
            });
        });
        describe('multiplication', function () {
            describe('directly called', function () {
                it('on pair of numbers', function () {
                    assert.equal(env['*'](2, 3), 6);
                });
                it('on list of numbers', function () {
                    assert.equal(env['*'].apply(null, [2, 3, 4]), 24);
                });
            });
            describe('called by eval', function () {
                it('on pair of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(* 2 3)'), env), 6);
                    assert.equal(interpreter.eval(parser.parse('(* 2 (* 4 3))'), env), 24);
                    assert.equal(interpreter.eval(parser.parse('(* (* 2 5) (* 4 3))'), env), 120);
                });
                it('on list of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(* (* 2 5 2) (* 4 3 1) (* 4 3 2))'), env), 5760);
                });
            });
        });
        describe('subtract', function () {
            describe('directly called', function () {
                it('on pair of numbers', function () {
                    assert.equal(env['-'](2, 3), -1);
                });
                it('on list of numbers', function () {
                    assert.equal(env['-'].apply(null, [12, 3, 4]), 5);
                });
            });
            describe('called by eval', function () {
                it('on pair of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(- 2 3)'), env), -1);
                    assert.equal(interpreter.eval(parser.parse('(- 12 (- 4 -3))'), env), 5);
                    assert.equal(interpreter.eval(parser.parse('(- (- 12 5) (- 4 3))'), env), 6);
                });
                it('on list of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(- (- 120 5 2) (- 14 3 1) (- 14 3 2))'), env), 94);
                });
            });
        });
        describe('division', function () {
            describe('directly called', function () {
                it('on pair of numbers', function () {
                    assert.equal(env['/'](6, 3), 2);
                });
                it('on list of numbers', function () {
                    assert.equal(env['/'].apply(null, [12, 4, 3]), 1);
                });
            });
            describe('called by eval', function () {
                it('on pair of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(/ 6 -3)'), env), -2);
                    assert.equal(interpreter.eval(parser.parse('(/ 12 (/ 6 -3))'), env), -6);
                    assert.equal(interpreter.eval(parser.parse('(/ (/ 12 4) (/ 3 -3))'), env), -3);
                });
                it('on list of numbers', function () {
                    assert.equal(interpreter.eval(parser.parse('(/ (/ 120 6 2) (/ 14 7 1) (/ 12 3 2))'), env), 2.5);
                });
            });
        });
    });
    describe('comparison operators', function () {
        describe('less than', function () {
            it('should return true for strictly increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(< 5 13 16)'), env), true);
            });
            it('should return false for decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(< 5 4 3)'), env), false);
            });
            it('should return false for increasing and then decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(< 5 14 7)'), env), false);
            });
        });
        describe('greater than', function () {
            it('should return true for strictly decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(> 5 4 3)'), env), true);
            });
            it('should return false for increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(> 5 7 9)'), env), false);
            });
            it('should return false for decreasing and then increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(> 5 3 4)'), env), false);
            });
        });
        describe('less than or equal', function () {
            it('should return true for strictly increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(<= 5 5 13 16)'), env), true);
            });
            it('should return false for decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(<= 5 4 3)'), env), false);
            });
            it('should return false for increasing and then decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(<= 5 14 7)'), env), false);
            });
        });
        describe('greater than or equal', function () {
            it('should return true for strictly decreasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(>= 5 5 4 4 3)'), env), true);
            });
            it('should return false for increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(>= 5 5 7 9)'), env), false);
            });
            it('should return false for decreasing and then increasing numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(>= 5 5 3 4)'), env), false);
            });
        });
        describe('equals', function () {
            it('should return true for the same numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(= 5 5 5)'), env), true);
            });
            it('should return false for different numbers', function () {
                assert.equal(interpreter.eval(parser.parse('(= 5 5 3 5)'), env), false);
            });
        });
    });
});