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
    rules: {},
    settings: {
        react: {
            version: reactVersion,
        },
    },
    parser: 'babel-eslint',
};
