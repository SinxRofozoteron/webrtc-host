const { resolve } = require('path');

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.{test,spec}.{js,jsx,tsxtsx}',
    '!<rootDir>/src/**/__tests__/**'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|less|sass|scss|json)$)': resolve(
      __dirname,
      'jestTransforms',
      'fileTransform.js'
    ),
    '^.+\\.(css|less|sass|scss)$': resolve(
      __dirname,
      'jestTransforms',
      'cssTransform.js'
    ),
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest'
  }
};

module.exports = createJestConfig(customJestConfig);
