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
    });
});