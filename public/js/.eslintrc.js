module.exports = {
  // The linter base is the Airbnb style guide, located here:
  // https://github.com/airbnb/javascript
  // The actual ESLint config is located here:
  // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules
  extends: 'airbnb-typescript/base',

  env: {
    browser: true,
    jquery: true,
  },

  // We need to specify some additional settings in order to make the linter work with TypeScript:
  // https://medium.com/@myylow/how-to-keep-the-airbnb-eslint-config-when-moving-to-typescript-1abb26adb5c6
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [ '@typescript-eslint' ],
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts'],
      },
    },
  },

  // We modify the linting rules from the base for some specific things
  // (listed in alphabetical order)
  rules: {
    // This allows code to be structured in a more logical order
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js#L42
    '@typescript-eslint/no-use-before-define': ['off'],

    // The Hanabi codebase uses cyclical depedencies because
    // various objects are attached to the global variables object,
    // but methods of these objects also reference/change global variables
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L236
    'import/no-cycle': ['off'],

    // We want imports to be sorted alphabetically; this is not specified in the Airbnb config
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L148
    'import/order': ['error', {
      groups: [['builtin', 'external', 'internal']],
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],

    // Airbnb has "exceptAfterSingleLine" turned off by default
    // A list of single-line variable declarations at the top of a class is common in TypeScript
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L183
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // Airbnb has the multiline comment rule turned off by default,
    // even though it is specified in the guide to use docstring-style comments
    // This project does not use any tooling that would rely on or utilize docstrings,
    // so there are no docstring-style comments in the codebase
    // Instead, for "normal" multi-line comments, we prefer "separate-line" comments,
    // since it uses a lot of extra lines to have starred-block comments all over the place
    // This style is also used in React and Angular (at least when the comment is not a docstring)
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L240
    'multiline-comment-style': ['error', 'separate-lines'],

    // The client makes use of some tasteful alerts
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js#L59
    'no-alert': ['off'],

    // We need to output messages to the console for debugging
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js#L27
    'no-console': ['off'],

    // We make use of constant while loops where appropriate
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js#L30
    'no-constant-condition': ['off'],

    // Proper use of continues can reduce indentation for long blocks of code
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L279
    'no-continue': ['off'],

    // Airbnb disallows mixing * and /, which is fairly nonsensical
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L290
    'no-mixed-operators': ['error', { allowSamePrecedence: true }],

    // The Airbnb configuration allows 2 empty lines in a row, which is unneeded
    // Additionally, the Airbnb configuration is bugged and
    // allows a line at the beginning of the file
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L316
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

    // We make use of parameter reassigning where appropriate
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js#L190
    'no-param-reassign': ['off'],

    // Airbnb disallows these because it can lead to errors with minified code;
    // we don't have to worry about this in for loops though
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L330
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // Clean code can arise from for-of statements if used properly
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L334
    'no-restricted-syntax': ['off', 'ForOfStatement'],

    // KineticJS's API has functions that are prefixed with an underscore
    // (remove this once the code base is transitioned to Phaser)
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L371
    'no-underscore-dangle': ['off'],

    // Array destructuring can result in non-intuitive code
    // Object destructuring is disgustingly verbose in TypeScript
    // e.g. "const foo: string = bar.foo;" vs "const { foo }: { foo: string } = bar;"
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js#L114
    'prefer-destructuring': ['off'],

    // This allows for cleaner looking code as recommended here:
    // https://blog.javascripting.com/2015/09/07/fine-tuning-airbnbs-eslint-config/
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L448
    'quote-props': ['error', 'consistent-as-needed'],
  },
};
