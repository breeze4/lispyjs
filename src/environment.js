var env = {};

function standardEnv() {
    env = {
        '+': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            if (arguments.length == 1) return arguments[0];
            var runSum = 0;
            for (var i = 0; i < arguments.length; i++) {
                runSum += arguments[i];
            }
            return runSum;
        },
        '-': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            if (arguments.length == 1) return -arguments[0];
            var runSum = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                runSum -= arguments[i];
            }
            return runSum;
        },
        '*': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            if (arguments.length == 1) return arguments[0];
            var runProduct = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                runProduct *= arguments[i];
            }
            return runProduct;
        },
        '/': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            if (arguments.length == 1) return 1 / arguments[0];
            var runQuotient = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                runQuotient /= arguments[i];
            }
            return runQuotient;
        },
        '=': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            var previous = arguments[0], current;
            for (var i = 1; i < arguments.length; i++) {
                current = arguments[i];
                if (current === previous) previous = current;
                else return false;
            }
            return true;
        },
        '<': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            var previous = arguments[0], current;
            for (var i = 1; i < arguments.length; i++) {
                current = arguments[i];
                if (current > previous) previous = current;
                else return false;
            }
            return true;
        },
        '>': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            var previous = arguments[0], current;
            for (var i = 1; i < arguments.length; i++) {
                current = arguments[i];
                if (current < previous) previous = current;
                else return false;
            }
            return true;
        },
        '<=': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            var previous = arguments[0], current;
            for (var i = 1; i < arguments.length; i++) {
                current = arguments[i];
                if (current >= previous) previous = current;
                else return false;
            }
            return true;
        },
        '>=': function () {
            if (!arguments || arguments.length == 0) throw new SyntaxError('invalid arity of args');
            var previous = arguments[0], current;
            for (var i = 1; i < arguments.length; i++) {
                current = arguments[i];
                if (current <= previous) previous = current;
                else return false;
            }
            return true;
        }
    };

    return env;
}

module.exports = standardEnv;