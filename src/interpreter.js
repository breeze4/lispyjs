module.exports = {
    tokenize: function tokenize(input) {
        return input.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
            .split(/\s/g)
            .filter(function (elem) {
                return elem !== '';
            });
    }
};