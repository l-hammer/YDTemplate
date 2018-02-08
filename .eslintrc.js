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
        "camelcase": 2, 
        "prefer-template": 0,
        "prefer-arrow-callback": 0,
        "object-curly-newline": 0,
        "no-unused-expressions": 0,
    }
};