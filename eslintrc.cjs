module.exports = {
  root: true,
  env: { es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-constant-condition': ['error', { checkLoops: 'allExceptWhileTrue' }],

    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|set.*)',
      },
    ],

    '@typescript-eslint/no-explicit-any': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',

    'no-console': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^[A-Z_]',
      },
    ],
  },
};
