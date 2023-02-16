module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    uni: 'readonly',
    my: 'readonly',
    getCurrentPages: 'readonly',
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-sequences': 0,
    'import/named': 0,
    'no-useless-concat': 0,
    'no-unreachable': 0,
    'no-case-declarations': 0,
    'no-continue': 0,
    'no-redeclare': 0,
    'block-scoped-var': 0,
    'operator-assignment': 0,
    'no-multi-assign': 0,
    'comma-dangle': 0,
    'prefer-const': 0,
    semi: 0,
    'eol-last': 0,
    'linebreak-style': 0,
    'no-unused-vars': 0,
    'no-useless-computed-key': 0,
    'default-case': 0,
    'prefer-destructuring': 0,
    'arrow-parens': 0,
    'no-var': 2, // 要求使用 let 或 const 而不是 var
    'comma-spacing': 0,
    'no-mixed-operators': 0,
    radix: 0,
    'prefer-promise-reject-errors': 0,
    'arrow-body-style': 0,
    'prefer-rest-params': 0,
    'no-restricted-syntax': 0,
    'vars-on-top': 0,
    'import/no-named-as-default': 0,
    'import/extensions': 0,
    'import/no-named-as-default-member': 0,
    'guard-for-in': 0,
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'no-nested-ternary': 0,
    'no-empty': 0,
    eqeqeq: 0,
    camelcase: 0,
    'prefer-template': 0,
    'dot-notation': 0,
    'prefer-arrow-callback': 0,
    'no-plusplus': 0,
    'no-else-return': 0,
    'one-var-declaration-per-line': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'max-len': 0,
    'no-lonely-if': 0,
    'array-callback-return': 0,
    'prefer-object-spread': 0,
    'import/order': 0,
    'import/newline-after-import': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-useless-escape': 0,
    'vue/multi-word-component-names': 'off',
  },
};
