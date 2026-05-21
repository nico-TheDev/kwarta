const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: {
        '^stores/(.*)$': '<rootDir>/src/stores/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^constants/(.*)$': '<rootDir>/src/constants/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^theme$': '<rootDir>/src/theme/index.js',
        '^date-fns$': '<rootDir>/node_modules/date-fns/index.js',
        '^date-fns/(.*)$': '<rootDir>/node_modules/date-fns/$1',
    },
};

module.exports = createJestConfig(config);
