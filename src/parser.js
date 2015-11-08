function tokenize(input) {
    return input.replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .split(/\s/g)
        .filter(function (elem) {
            return elem !== '';
        });
}

function readFromTokens(tokens) {
    // returns Deeply nested array of the expressions
    if (!tokens || tokens.length == 0)
        throw new SyntaxError('input cannot be null or blank');

    // The input program will be tokenized in the order each symbol/number is encountered.
    // We can use shift() to remove the "leftmost element".
    // This means that we'd have to tokenize them backwards to use an array w/ pop().
    // Array.shift() does not perform as well as pop() (100x faster), but for this simplistic implementation,
    // it'll do. Makes it easier to debug the parsing while it's stored in a readable order.
    // Silly human brain limitations. Parsing tokens doesn't have to happen in the order its written,
    // so the whole thing could be backwards and we could use pop().
    var token = tokens[0];
    if (token === '(') {
        tokens.shift(); // drop the '('
        var subExpression = [];
        while (tokens[0] != ')') {
            var subexpr = readFromTokens(tokens);
            subExpression.push(subexpr);
        }
        tokens.shift(); // drop the trailing ')'
        return subExpression;
    } else if (token === ')')
    // ')' only occurs while reading tokens inside a subexpression and you reach the end
        throw new SyntaxError('unexpected )');
    else
        return atom(tokens.shift());
}

function atom(token) {
    // casting to a number by using '+' will result in either the number or NaN.
    // test NaN with language function isNaN
    var castToNumber = +token;
    if (!isNaN(castToNumber)) return castToNumber;
    else if (isNaN(castToNumber)) return token;
    else throw new SyntaxError('can not understand input, token is neither string nor number');
}

function parse(program) {
    // returns nested array of expressions and subexpressions from the program input
    return readFromTokens(tokenize(program));
}

module.exports = {
    tokenize: tokenize,
    readFromTokens: readFromTokens,
    parse: parse
};