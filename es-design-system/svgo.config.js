module.exports = {
    js2svg: {
        indent: 4,
        pretty: true,
    },
    plugins: [
        'preset-default',
        // Use viewbox instead of width / height
        'removeDimensions',
        {
            name: 'addCurrentColor',
            type: 'perItem',
            fn: (ast) => {
                /* eslint-disable no-param-reassign */
                // TODO: stroke?
                if (ast.attributes.fill === '#fff') {
                    ast.attributes.fill = 'none';
                } else if (ast.attributes.fill !== 'none') {
                    delete ast.attributes.fill;
                }
                // Add fill="currentColor" to base svg
                if (ast.name === 'svg') {
                    ast.attributes.fill = 'currentColor';
                }
                /* eslint-enable no-param-reassign */
            },
        },
    ],
};
