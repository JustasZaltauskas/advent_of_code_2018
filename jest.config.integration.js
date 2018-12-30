var config = require('./jest.config');

module.exports = {
    ...config,
    testMatch: null,
    testRegex: '.+(.itest.ts)'
};
