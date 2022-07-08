module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js',
    },
    moduleFileExtensions: ['js', 'vue', 'json'],
    modulePathIgnorePatterns: ['node_modules'],
    setupFilesAfterEnv: ['./jest/jest.setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
        // Pass svg as raw html in our tests
        '^.+\\.svg$': './jest/jest.transform.raw.js',
        '^.+\\.scss$': 'jest-scss-transform',
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/components/**/*.vue', '<rootDir>/utils/*'],
    testEnvironment: 'jsdom',
};
