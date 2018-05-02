/**
 * @type 0: 代码错误不提示，即关闭相应规则
 * @type 1: 代表警告提醒但不影响现有编译
 * @type 2: error会抛出错误
 */
module.exports = {
    extends: ['airbnb-base', 'plugin:vue/recommended'],
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    globals: {
        "window": false,
        "document": true,
        "Image": true,
        "alert": true,
        "define": true
    },
    plugins: ["vue"],
    rules: {
        // 0 = off, 1 = warn, 2 = error
        "indent": [2, 2, { "SwitchCase": 1 }],
        "no-var": 0,
        "no-new": 0,
        "object-shorthand": 0, // http://eslint.cn/docs/rules/object-shorthand
        "func-names": [2, "never"],
        "no-console":0,
        "camelcase": 2, 
        "prefer-template": 0,
        "prefer-arrow-callback": 0,
        "prefer-rest-params": 0,
        "object-curly-newline": 0,
        "no-unused-expressions": 0,
        // "quotes": [2, "single", { "avoidEscape": true }],
        "one-var": [2, {"var": "always", "const": "never"}],
        "one-var-declaration-per-line": [2, "initializations"],
        "no-mixed-operators": [
            2,
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
        "no-plusplus": [2, { "allowForLoopAfterthoughts": true }],
        "no-alert": 0,
        "vars-on-top": 0,
        "max-len": [1, 129, { "ignoreComments": true }],
        "no-eval": [2],
        "no-param-reassign": [2, { "props": false }],
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "no-underscore-dangle": 0,
        "no-sequences": 0,
        "no-restricted-properties": 0,
        "no-restricted-syntax": 0,
        "no-restricted-globals": 0,
        "wrap-iife": [2, "inside"],
        "strict": [2, "function"],
        "no-param-reassign": 0,
        "no-confusing-arrow": 0,
        "arrow-body-style": 0,
        "no-bitwise": [2, { "allow": ["~"] }],
        "no-cond-assign": 0,
        "generator-star-spacing": [2, {
            "before": true,
            "after": false
        }],
        // vue
        "vue/html-self-closing": ["error", {
          "html": {
            "void": "never",
            "normal": "never",
            "component": "never"
          },
          "svg": "never",
          "math": "never"
        }]
    },
};