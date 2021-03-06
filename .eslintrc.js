const reactVersion = require('./package.json').dependencies.react;

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'eslint-config-prettier',
    ],
    plugins: ['react', 'react-native'],
    env: {
        'react-native/react-native': true,
    },
    rules: {
        'no-console': 0,
        'sort-keys': 0,
        'react/prop-types': 0,
        'react-native/no-inline-styles': 0
    },
    settings: {
        react: {
            version: reactVersion,
        },
    },
    parser: 'babel-eslint',
};
