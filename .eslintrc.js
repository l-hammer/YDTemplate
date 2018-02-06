module.exports = {
    extends: 'airbnb-base',
    parser: 'babel-eslint',
    rules: {
        "indent": ["error", 4],
        "no-var": 0,
        "no-new": 0,
        "object-shorthand": ["error", "never"], // http://eslint.cn/docs/rules/object-shorthand
        "func-names": ["error", "never"],
        "no-console":0,
    }
};