/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  ignorePatterns: ['.eslintrc.cjs'],
  plugins: ['eslint-plugin-import', 'eslint-plugin-import-helpers', 'pug'],

  rules: {
    'indent': ['error', 4],
    'no-param-reassign': 0,
    'vue/no-setup-props-destructure': 'off',
    'vue/html-indent': ['error', 1, {
      'attribute': 1,
      'baseIndent': 0,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    'vue/require-explicit-emits': 'off',
    'import/prefer-default-export': 'off',
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'no-async-promise-executor': ['error'],
    'no-await-in-loop': ['error'],
    'no-template-curly-in-string': ['error'],
    'array-callback-return': ['off'],
    'block-scoped-var': ['error'],
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'dot-notation': ['error'],
    eqeqeq: ['error', 'always'],
    'guard-for-in': ['error'],
    'max-classes-per-file': ['error', 1],
    'no-alert': ['error'],
    'no-caller': ['error'],
    'no-console': ['error'],
    'no-constant-binary-expression': ['error'],
    'no-div-regex': ['error'],
    'no-else-return': ['error', { allowElseIf: true }],
    'no-eval': ['error'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-fallthrough': ['error'],
    'no-floating-decimal': ['error'],
    'no-implicit-coercion': ['error'],
    'no-implied-eval': ['error'],
    'no-invalid-this': ['error'],
    'no-iterator': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['error'],
    'no-multi-spaces': ['error'],
    'no-multi-str': ['error'],
    'no-new-func': ['error'],
    'no-new-native-nonconstructor': ['error'],
    'no-new-wrappers': ['error'],
    'no-octal-escape': ['error'],
    'no-proto': ['error'],
    'no-redeclare': ['off'],
    'no-return-assign': ['error', 'always'],
    'no-script-url': ['error'],
    'no-self-assign': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-throw-literal': ['error'],
    'no-underscore-dangle': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unused-expressions': ['off'],
    'no-unused-vars': ['off'],
    'no-useless-call': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-constructor': ['off'],
    'no-void': ['error'],
    'no-with': ['error'],
    radix: ['error', 'always'],
    'require-await': ['off'],
    'wrap-iife': ['error', 'inside'],
    yoda: ['error'],
    'no-label-var': ['error'],
    'no-shadow': ['off'],
    'no-shadow-restricted-names': ['error'],
    'no-use-before-define': ['off'],
    'no-path-concat': ['error'],

    /* Stylistic */
    'no-extra-parens': ['off'],
    'no-extra-semi': ['off'],

    /* ECMAScript 6 */
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-useless-computed-key': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'object-shorthand': ['error', 'always'],
    'prefer-const': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    'prefer-template': ['error'],
    'rest-spread-spacing': ['error', 'never'],
    'template-curly-spacing': ['error'],
    'yield-star-spacing': ['error', { before: true, after: false }],

    /* Imports */
    'import/no-empty-named-blocks': ['error'],
    'import/no-dynamic-require': ['error'],
    'import/no-webpack-loader-syntax': ['error'],
    'import/no-self-import': 'off',
    'import/no-cycle': ['error'],
    'import/no-useless-path-segments': ['error'],
    'import/no-unused-modules': ['error'],
    'import/no-named-as-default': ['error'],
    'import/no-named-as-default-member': ['error'],
    'import/no-mutable-exports': ['error'],
    'import/no-commonjs': ['off'],
    'import/first': ['error'],
    'import/no-duplicates': ['error'],
    'import/no-namespace': ['off'],
    'import/extensions': [
      'error',
      'never',
      {
        css: 'always',
        scss: 'always',
        jpg: 'always',
        png: 'always',
        json: 'always',
        svg: 'always',
        vue: 'ignorePackages'
      }
    ],
    'import/newline-after-import': ['error'],

    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          'module',

          '/types($|/)/',
          '/^@services($|/)/',
          '/^@helpers($|/)/',
          '/^@api($|/)/',
          '/^@hooks($|/)/',
          '/^@layouts($|/)/',
          '/^@ui($|/)/',
          '/^@components($|/)/',
          '/^@store($|/)/',
          '/^@assets($|/)/',

          ['parent', 'sibling', 'index'],
          '/\\.json/'
        ]
      }
    ]
  }
};
