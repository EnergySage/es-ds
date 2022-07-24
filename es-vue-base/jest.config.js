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
        '^.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2|webm|vtt|mp4)$': 'jest-transform-stub',
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.vue'],
    testEnvironment: 'jsdom',
};
