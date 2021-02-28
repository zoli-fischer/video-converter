/* eslint-disable no-template-curly-in-string */
module.exports = (api) => {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                    browsers: ['last 2 versions'],
                },
            },
        ]
    ];

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: {
                    src: './src',
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};