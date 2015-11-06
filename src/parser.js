function tokenize(input) {
    return input.replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .split(/\s/g)
        .filter(function (elem) {
            return elem !== '';
        });
}

function readFromTokens(tokens) {
    if (!tokens || tokens.length == 0)
        throw new SyntaxError('input cannot be null or blank');

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
        throw new SyntaxError('unexpected )');
    else
        return atom(tokens.shift());
}

function atom(token) {
    if (!isNaN(+token)) return +token;
    else if (isNaN(+token)) return token;
    else throw new SyntaxError('can not understand input, token is neither string nor number');
}

function parse(program) {

}

module.exports = {
    tokenize: tokenize,
    readFromTokens: readFromTokens,
    parse: parse
};