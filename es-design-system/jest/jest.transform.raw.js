// Pass the file's raw content
module.exports = {
    process: (content) => ({
        // eslint-disable-next-line prefer-template
        code: 'module.exports = ' + JSON.stringify(content),
    }),
};
