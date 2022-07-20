module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js',
    },
    moduleFileExtensions: ['js', 'vue', 'json'],
    modulePathIgnorePatterns: ['node_modules'],
    setupFilesAfterEnv: ['./tests/jest.setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.vue'],
    testEnvironment: 'jsdom',
};
