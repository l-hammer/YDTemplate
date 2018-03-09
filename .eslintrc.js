module.exports = {
    extends: 'airbnb-base',
    parser: 'babel-eslint',
    rules: {
        "indent": ["error", 4],
        "no-var": 0,
        "no-new": 0,
        "object-shorthand": 0, // http://eslint.cn/docs/rules/object-shorthand
        "func-names": ["error", "never"],
        "no-console":0,
        "camelcase": 2, 
        "prefer-template": 0,
        "prefer-arrow-callback": 0,
        "prefer-rest-params": 0,
        "object-curly-newline": 0,
        "no-unused-expressions": 0,
        // "quotes": ["error", "single", { "avoidEscape": true }],
        "one-var": ["error", {"var": "always", "const": "never"}],
        "one-var-declaration-per-line": ["error", "initializations"],
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    ["+", "-"],
                    ["*", "/", "%", "**"],
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"]
                ],
                "allowSamePrecedence": true
            }
        ],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "no-alert": 0,
        "vars-on-top": 0,
        "max-len": [1, 129, {
            "ignoreComments": true
        }],
        "no-eval": ["error"],
        "no-param-reassign": ["error", { "props": false }],
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "no-underscore-dangle": 0,
        "no-sequences": 0,
        "no-restricted-properties": 0,
        "no-restricted-syntax": 0,
        "no-restricted-globals": 0,
        "wrap-iife": ["error", "inside"],
        "strict": ["error", "function"],
        "no-param-reassign": 0,
        "no-confusing-arrow": 0,
        "arrow-body-style": 0,
        "no-bitwise": ["error", { "allow": ["~"] }],
    },
    /* globals document */
    "globals": {
        "window": false,
        "document": true,
        "Image": true,
        "alert": true,
        "define": true
    }
};