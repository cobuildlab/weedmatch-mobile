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
        'sort-keys': 2,
    },
    settings: {
        react: {
            version: reactVersion,
        },
    },
    parser: 'babel-eslint',
};
