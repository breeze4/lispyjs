var env = {};

function standardEnv() {
    env = {
        '+': function () {
            if (!arguments || arguments.length == 0) return null;
            if (arguments.length == 1) return arguments[0];
            var runSum = 0;
            for (var i = 0; i < arguments.length; i++) {
                runSum += arguments[i];
            }
            return runSum;
        },
        '*': function () {
            if (!arguments || arguments.length == 0) return null;
            if (arguments.length == 1) return arguments[0];
            var runProduct = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                runProduct *= arguments[i];
            }
            return runProduct;
        }
    };

    return env;
}

module.exports = standardEnv;