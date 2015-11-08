function eval(expression, env) {
    if (isArray(expression)) {
        // evaluate all the elements of the expression
        var evaluated = expression.map(function (elem) {
            return eval(elem, env);
        });
        // remove the procedure and then call it with the rest of the evaluated arguments
        var procedure = evaluated.shift();
        var result = procedure.apply(null, evaluated);
        return result;
    } else if(isString(expression)) {
        // looking up a procedure or reference
        return env[expression];
    } else if(!isArray(expression)) {
        // if it isn't an array or a string, it's a number and just needs to be returned
        return expression;
    }
}

function isString(x) {
    return Object.prototype.toString.call(x) == '[object String]';
}

function isNumber(x) {
    return Object.prototype.toString.call(x) == '[object Number]';
}

function isArray(x) {
    return Object.prototype.toString.call(x) == '[object Array]';
}

module.exports = {
    eval: eval
};