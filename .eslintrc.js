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
        "object-curly-newline": 0,
        "no-unused-expressions": 0,
        // "quotes": ["error", "single", { "avoidEscape": true }],
        "one-var": ["error", "always"],
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    ["+", "-", "*", "/", "%", "**"],
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
        "arrow-body-style": ["error", "always"],
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
    },
    /* globals document */
    "globals": {
        "window": false,
        "document": true,
        "Image": true,
        "alert": true
    }
};